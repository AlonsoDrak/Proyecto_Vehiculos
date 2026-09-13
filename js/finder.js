// AutoFind Lab - Módulo Buscador y Comparador de Especificaciones y Consumo
// Maneja la búsqueda predictiva, extracción de fotos (Wikipedia / Catálogo) y calculadora de costos diarios.

class VehicleSpecsFinder {
  constructor() {
    this.catalog = window.SPECS_CATALOG || { vehicles: [] };
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.selectedVehicle = null;
    this.wikiCache = {};

    // Parámetros por defecto de la calculadora interactiva
    this.calcParams = {
      fuelPrice: 24.50,    // Precio por litro de gasolina ($ / € configurable)
      kwhPrice: 2.80,      // Tarifa por kWh de electricidad
      dailyKm: 30          // Kilómetros diarios de recorrido habitual
    };

    this.dom = {};
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.render();
  }

  cacheDom() {
    this.dom = {
      viewContainer: document.getElementById('viewSpecsFinder'),
      searchInput: document.getElementById('specsSearchInput'),
      btnClearSearch: document.getElementById('btnClearSpecsSearch'),
      filterChips: document.querySelectorAll('.specs-filter-chip'),
      resultsGrid: document.getElementById('specsResultsGrid'),
      resultsCount: document.getElementById('specsResultsCount'),
      emptyState: document.getElementById('specsEmptyState'),
      btnWikiSearch: document.getElementById('btnSearchGlobalWiki'),
      
      // Modal Detalle
      modal: document.getElementById('modalSpecsDetail'),
      modalBackdrop: document.getElementById('modalSpecsBackdrop'),
      modalCloseBtn: document.getElementById('btnCloseSpecsModal'),
      modalContent: document.getElementById('modalSpecsBody')
    };
  }

  bindEvents() {
    if (!this.dom.searchInput) return;

    // Búsqueda en tiempo real (debounce ligero)
    let debounceTimer;
    this.dom.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchQuery = e.target.value.trim();
        if (this.dom.btnClearSearch) {
          this.dom.btnClearSearch.classList.toggle('hidden', !this.searchQuery);
        }
        this.render();
      }, 150);
    });

    // Búsqueda con tecla Enter: si no hay resultados locales, consulta la API global automáticamente
    this.dom.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const matches = this.catalog.search ? this.catalog.search(this.searchQuery, this.currentFilter) : [];
        if (matches.length === 0 && this.searchQuery) {
          this.searchGlobalWikipedia(this.searchQuery);
        }
      }
    });

    // Botón limpiar búsqueda
    if (this.dom.btnClearSearch) {
      this.dom.btnClearSearch.addEventListener('click', () => {
        this.dom.searchInput.value = '';
        this.searchQuery = '';
        this.dom.btnClearSearch.classList.add('hidden');
        this.dom.searchInput.focus();
        this.render();
      });
    }

    // Filtros por chips de categoría
    if (this.dom.filterChips) {
      this.dom.filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.dom.filterChips.forEach(c => {
            c.classList.remove('is-active', 'bg-cyan-500', 'text-slate-950', 'font-bold');
            c.classList.add('bg-slate-800/80', 'text-slate-400');
          });
          chip.classList.remove('bg-slate-800/80', 'text-slate-400');
          chip.classList.add('is-active', 'bg-cyan-500', 'text-slate-950', 'font-bold');

          this.currentFilter = chip.dataset.type || 'all';
          this.render();
        });
      });
    }

    // Botón de búsqueda en base global cuando no hay coincidencias locales
    if (this.dom.btnWikiSearch) {
      this.dom.btnWikiSearch.addEventListener('click', () => {
        this.searchGlobalWikipedia(this.searchQuery);
      });
    }

    // Cerrar modal
    if (this.dom.modalCloseBtn) {
      this.dom.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.dom.modalBackdrop) {
      this.dom.modalBackdrop.addEventListener('click', () => this.closeModal());
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.dom.modal && !this.dom.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  render() {
    if (!this.dom.resultsGrid) return;

    const matches = this.catalog.search ? this.catalog.search(this.searchQuery, this.currentFilter) : [];
    
    // Contador de resultados
    if (this.dom.resultsCount) {
      this.dom.resultsCount.textContent = `${matches.length} vehículo${matches.length === 1 ? '' : 's'} disponible${matches.length === 1 ? '' : 's'}`;
    }

    // Manejar estado vacío
    if (matches.length === 0) {
      this.dom.resultsGrid.innerHTML = '';
      if (this.dom.emptyState) {
        this.dom.emptyState.classList.remove('hidden');
        const queryTermSpan = document.getElementById('specsEmptyQuery');
        if (queryTermSpan) queryTermSpan.textContent = this.searchQuery ? `"${this.searchQuery}"` : 'la categoría seleccionada';
      }
      return;
    }

    if (this.dom.emptyState) {
      this.dom.emptyState.classList.add('hidden');
    }

    // Renderizar tarjetas
    this.dom.resultsGrid.innerHTML = matches.map(v => this.createVehicleCardHtml(v)).join('');

    // Asignar eventos de clic a las tarjetas
    this.dom.resultsGrid.querySelectorAll('.vehicle-spec-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        this.openDetailModal(id);
      });
    });
  }

  createVehicleCardHtml(v) {
    const isElectric = v.type === 'electric';
    const isMoto = v.type === 'moto';

    // Badge styling por tipo
    let badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    let typeIcon = '⛽';
    if (isElectric) {
      badgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      typeIcon = '⚡';
    } else if (isMoto) {
      badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      typeIcon = '🛵';
    }

    // Métricas rápidas según tipo
    let metric1Label = 'Consumo Mixto';
    let metric1Val = `${v.consumption.combined} km/L`;
    let metric2Label = 'Depósito';
    let metric2Val = `${v.consumption.tankCapacityL} L`;

    if (isElectric) {
      metric1Label = 'Consumo';
      metric1Val = `${v.consumption.kwhPer100Km} kWh/100km`;
      metric2Label = 'Batería Útil';
      metric2Val = `${v.consumption.batteryCapacityKwh} kWh`;
    }

    const rangeVal = `${v.consumption.estimatedRangeKm} km`;

    return `
      <article data-id="${v.id}" class="vehicle-spec-card group relative flex flex-col bg-slate-900/90 hover:bg-slate-800/90 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.99]">
        
        <!-- Contenedor Imagen con Aspect Ratio 16:9 y Badge -->
        <div class="relative w-full h-44 bg-slate-950 overflow-hidden border-b border-slate-800/80">
          <img 
            src="${v.imageUrl}" 
            alt="${v.name}" 
            loading="lazy"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'225\' viewBox=\'0 0 400 225\'><rect fill=\'%230f172a\' width=\'400\' height=\'225\'/><text fill=\'%2364748b\' font-size=\'32\' font-family=\'sans-serif\' x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\'>${encodeURIComponent(v.name)}</text></svg>';"
          />
          
          <!-- Badges superiores -->
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${badgeClass}">
              <span>${typeIcon}</span>
              <span>${v.badgeText}</span>
            </span>
          </div>

          <div class="absolute top-2.5 right-2.5">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${v.source === 'api' ? 'bg-sky-950/90 text-sky-300 border-sky-600/70' : 'bg-slate-950/80 text-slate-300 border-slate-700/60'} border backdrop-blur-sm">
              <span>${v.source === 'api' ? '🌐 API Global' : v.yearRange}</span>
            </span>
          </div>
        </div>

        <!-- Cuerpo de Información -->
        <div class="p-4 flex-1 flex flex-col justify-between gap-3">
          <div>
            <div class="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>${v.brand}</span>
              <span>•</span>
              <span class="text-cyan-400">${v.power}</span>
            </div>
            <h3 class="font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mt-0.5">
              ${v.name}
            </h3>
            <p class="text-xs text-slate-400 line-clamp-1 mt-1">
              ${v.engine}
            </p>
          </div>

          <!-- Píldoras de Métricas Clave -->
          <div class="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400 font-medium">${metric1Label}</span>
              <span class="text-xs font-bold text-slate-200 mt-0.5">${metric1Val}</span>
            </div>
            <div class="flex flex-col border-x border-slate-800/80 px-1">
              <span class="text-[10px] text-slate-400 font-medium">${metric2Label}</span>
              <span class="text-xs font-bold text-slate-200 mt-0.5">${metric2Val}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400 font-medium">Autonomía</span>
              <span class="text-xs font-bold text-emerald-400 mt-0.5">${rangeVal}</span>
            </div>
          </div>

          <!-- Botón de acción -->
          <div class="flex items-center justify-between text-xs text-cyan-400 font-semibold pt-1">
            <span>Ver ficha & simular costo</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>

        </div>
      </article>
    `;
  }

  openDetailModal(vehicleId) {
    const v = this.catalog.getById ? this.catalog.getById(vehicleId) : null;
    if (!v || !this.dom.modal || !this.dom.modalContent) return;

    this.selectedVehicle = v;
    this.dom.modalContent.innerHTML = this.buildModalDetailHtml(v);

    // Inicializar listeners de la calculadora interactiva dentro del modal
    this.bindCalculatorEvents(v);

    this.dom.modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  closeModal() {
    if (this.dom.modal) {
      this.dom.modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      this.selectedVehicle = null;
    }
  }

  buildModalDetailHtml(v) {
    const isEV = v.type === 'electric';
    const isMoto = v.type === 'moto';

    let badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    let typeIcon = '⛽';
    if (isEV) {
      badgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      typeIcon = '⚡';
    } else if (isMoto) {
      badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      typeIcon = '🛵';
    }

    // Cálculos preliminares para la calculadora
    const costFullTank = isEV 
      ? (v.consumption.batteryCapacityKwh * this.calcParams.kwhPrice).toFixed(2)
      : (v.consumption.tankCapacityL * this.calcParams.fuelPrice).toFixed(2);

    const costPer100Km = isEV
      ? (v.consumption.kwhPer100Km * this.calcParams.kwhPrice).toFixed(2)
      : ((100 / v.consumption.combined) * this.calcParams.fuelPrice).toFixed(2);

    const monthlyCost = isEV
      ? ((v.consumption.kwhPer100Km / 100) * this.calcParams.dailyKm * 30 * this.calcParams.kwhPrice).toFixed(0)
      : (((100 / v.consumption.combined) / 100) * this.calcParams.dailyKm * 30 * this.calcParams.fuelPrice).toFixed(0);

    return `
      <!-- HEADER HERO DEL MODAL -->
      <div class="relative w-full h-56 sm:h-72 bg-slate-950 overflow-hidden border-b border-slate-800">
        <img 
          src="${v.imageUrl}" 
          alt="${v.name}" 
          class="w-full h-full object-cover object-center"
          onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'400\' viewBox=\'0 0 800 400\'><rect fill=\'%230f172a\' width=\'800\' height=\'400\'/><text fill=\'%2364748b\' font-size=\'40\' font-family=\'sans-serif\' x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\'>${encodeURIComponent(v.name)}</text></svg>';"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div class="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${badgeClass}">
              <span>${typeIcon}</span>
              <span>${v.badgeText}</span>
            </span>
            <span class="text-xs text-slate-300 font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700">
              ${v.yearRange}
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">
            ${v.name}
          </h2>
          <p class="text-xs sm:text-sm text-slate-300">
            ${v.engine} • <span class="text-cyan-400 font-semibold">${v.power}</span>
          </p>
        </div>
      </div>

      <div class="p-4 sm:p-6 flex flex-col gap-6">

        <!-- 1. REJILLA DE ESPECIFICACIONES DIARIAS -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span>📊</span> Especificaciones Clave de Consumo y Depósito
          </h4>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            ${isEV ? `
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Consumo Homologado</div>
                <div class="text-base sm:text-lg font-black text-cyan-400 mt-1">${v.consumption.kwhPer100Km} <span class="text-xs font-normal">kWh/100km</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">(${v.consumption.kmPerKwh} km/kWh)</div>
              </div>
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Batería Neta Útil</div>
                <div class="text-base sm:text-lg font-black text-white mt-1">${v.consumption.batteryCapacityKwh} <span class="text-xs font-normal">kWh</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">Piso plano estructural</div>
              </div>
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Autonomía Real</div>
                <div class="text-base sm:text-lg font-black text-emerald-400 mt-1">${v.consumption.estimatedRangeKm} <span class="text-xs font-normal">km</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">Ciclo combinado</div>
              </div>
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Carga Rápida DC</div>
                <div class="text-base sm:text-lg font-black text-amber-400 mt-1">Hasta ${v.consumption.maxChargeDcKw} <span class="text-xs font-normal">kW</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">AC Máx: ${v.consumption.maxChargeAcKw} kW</div>
              </div>
            ` : `
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Consumo Ciudad</div>
                <div class="text-base sm:text-lg font-black text-slate-200 mt-1">${v.consumption.city} <span class="text-xs font-normal">km/L</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">Tráfico urbano</div>
              </div>
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Consumo Carretera</div>
                <div class="text-base sm:text-lg font-black text-slate-200 mt-1">${v.consumption.hwy} <span class="text-xs font-normal">km/L</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">Velocidad constante</div>
              </div>
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Capacidad Depósito</div>
                <div class="text-base sm:text-lg font-black text-white mt-1">${v.consumption.tankCapacityL} <span class="text-xs font-normal">Litros</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">${v.fuelType}</div>
              </div>
              <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                <div class="text-[11px] text-slate-400">Autonomía Estimada</div>
                <div class="text-base sm:text-lg font-black text-emerald-400 mt-1">${v.consumption.estimatedRangeKm} <span class="text-xs font-normal">km</span></div>
                <div class="text-[10px] text-slate-500 mt-0.5">Mixto: ${v.consumption.combined} km/L</div>
              </div>
            `}
          </div>
        </div>

        <!-- 2. CALCULADORA INTERACTIVA DE COSTOS DEL DÍA A DÍA -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-slate-800 flex flex-col gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 class="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>💰</span> Calculadora Interactiva de Gasto & Llenado
              </h4>
              <p class="text-xs text-slate-400">Mueve los controles para simular tu presupuesto de viaje y traslados.</p>
            </div>
            <span class="text-xs font-bold text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800/60 self-start sm:self-auto">
              Simulación en Vivo
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Controles / Sliders -->
            <div class="flex flex-col gap-4">
              ${isEV ? `
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-slate-300">Tarifa de Luz por kWh:</span>
                    <span id="labelKwhPrice" class="text-cyan-400 font-bold">${this.calcParams.kwhPrice.toFixed(2)} $/kWh</span>
                  </div>
                  <input id="sliderKwhPrice" type="range" min="1.0" max="6.0" step="0.10" value="${this.calcParams.kwhPrice}" class="w-full accent-cyan-400 cursor-pointer" />
                  <div class="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>1.00 (Tarifa Valle / Casa)</span>
                    <span>6.00 (Toma Pública)</span>
                  </div>
                </div>
              ` : `
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-slate-300">Precio del Litro de Combustible:</span>
                    <span id="labelFuelPrice" class="text-amber-400 font-bold">${this.calcParams.fuelPrice.toFixed(2)} $/L</span>
                  </div>
                  <input id="sliderFuelPrice" type="range" min="15.0" max="35.0" step="0.50" value="${this.calcParams.fuelPrice}" class="w-full accent-amber-400 cursor-pointer" />
                  <div class="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>$15.00 / L</span>
                    <span>$35.00 / L</span>
                  </div>
                </div>
              `}

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-slate-300">Recorrido Diario Promedio:</span>
                  <span id="labelDailyKm" class="text-emerald-400 font-bold">${this.calcParams.dailyKm} km / día</span>
                </div>
                <input id="sliderDailyKm" type="range" min="5" max="150" step="5" value="${this.calcParams.dailyKm}" class="w-full accent-emerald-400 cursor-pointer" />
                <div class="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>5 km (trayecto corto)</span>
                  <span>150 km (viajero diario)</span>
                </div>
              </div>
            </div>

            <!-- Cajas de Resultados -->
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span class="text-[11px] text-slate-400">${isEV ? 'Recarga Completa (100%)' : 'Llenar Tanque Completo'}</span>
                <span id="resCostFullTank" class="text-lg sm:text-xl font-black text-cyan-300 mt-1">$${costFullTank}</span>
                <span class="text-[10px] text-slate-500 mt-0.5">${isEV ? v.consumption.batteryCapacityKwh + ' kWh' : v.consumption.tankCapacityL + ' Litros'}</span>
              </div>

              <div class="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span class="text-[11px] text-slate-400">Costo por 100 km</span>
                <span id="resCost100Km" class="text-lg sm:text-xl font-black text-emerald-300 mt-1">$${costPer100Km}</span>
                <span class="text-[10px] text-slate-500 mt-0.5">Ciclo combinado</span>
              </div>

              <div class="col-span-2 p-3 bg-slate-950/90 rounded-xl border border-cyan-800/40 flex items-center justify-between">
                <div>
                  <div class="text-[11px] text-slate-400">Gasto Mensual Estimado (30 días)</div>
                  <div class="text-[10px] text-slate-500">Recorriendo <span id="resMonthlyKm">${this.calcParams.dailyKm * 30}</span> km al mes</div>
                </div>
                <span id="resMonthlyCost" class="text-xl sm:text-2xl font-black text-white">$${monthlyCost}</span>
              </div>
            </div>

          </div>
        </div>

        <!-- 3. TIEMPOS DE RECARGA (PARA EV) O MANTENIMIENTO Y ACEITE (PARA COMBUSTIÓN/MOTO) -->
        ${isEV ? `
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <span>⏱️</span> Tiempos de Carga por Tipo de Enchufe
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-200">Enchufe Doméstico (Schuko)</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">2.3 kW AC</span>
                </div>
                <div class="text-sm font-black text-white mt-1">${v.consumption.chargingTimes.schuko23}</div>
                <div class="text-[10px] text-slate-500">Enchufe estándar de casa para recarga nocturna.</div>
              </div>

              <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-200">Wallbox Casa / Trabajo</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400">7.4 - 11 kW AC</span>
                </div>
                <div class="text-sm font-black text-cyan-300 mt-1">${v.consumption.chargingTimes.wallbox74}</div>
                <div class="text-[10px] text-slate-500">Punto de recarga de pared óptimo para uso diario.</div>
              </div>

              <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-200">Cargador Rápido en Ruta</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400">50 - ${v.consumption.maxChargeDcKw} kW DC</span>
                </div>
                <div class="text-sm font-black text-emerald-300 mt-1">${v.consumption.chargingTimes.fastChargeDc}</div>
                <div class="text-[10px] text-slate-500">Paradas rápidas en autopista y electrolineras.</div>
              </div>
            </div>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">🛢️ Aceite de Motor Recomendado</span>
              <span class="text-sm font-black text-white mt-1">${v.consumption.oilViscosity}</span>
              <span class="text-xs text-slate-400 mt-0.5">Capacidad del cárter: <strong class="text-slate-200">${v.consumption.oilCapacityL} L</strong></span>
            </div>

            <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">🌱 Huella Ambiental & Emisiones</span>
              <span class="text-sm font-black text-white mt-1">${v.co2Emissions}</span>
              <span class="text-xs text-slate-400 mt-0.5">Tipo de combustible: <strong class="text-slate-200">${v.fuelType}</strong></span>
            </div>
          </div>
        `}

        <!-- 4. PUNTOS DESTACADOS DEL MODELO -->
        <div class="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
            <span>⭐</span> Lo que debes saber de este modelo
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-400">
            ${v.highlights.map(h => `
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-0.5 font-bold">✓</span>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>

      </div>
    `;
  }

  bindCalculatorEvents(v) {
    const isEV = v.type === 'electric';

    const updateCalc = () => {
      const fullCost = isEV
        ? (v.consumption.batteryCapacityKwh * this.calcParams.kwhPrice).toFixed(2)
        : (v.consumption.tankCapacityL * this.calcParams.fuelPrice).toFixed(2);

      const cost100 = isEV
        ? (v.consumption.kwhPer100Km * this.calcParams.kwhPrice).toFixed(2)
        : ((100 / v.consumption.combined) * this.calcParams.fuelPrice).toFixed(2);

      const monthly = isEV
        ? ((v.consumption.kwhPer100Km / 100) * this.calcParams.dailyKm * 30 * this.calcParams.kwhPrice).toFixed(0)
        : (((100 / v.consumption.combined) / 100) * this.calcParams.dailyKm * 30 * this.calcParams.fuelPrice).toFixed(0);

      const elFull = document.getElementById('resCostFullTank');
      const el100 = document.getElementById('resCost100Km');
      const elMonthly = document.getElementById('resMonthlyCost');
      const elMonthlyKm = document.getElementById('resMonthlyKm');

      if (elFull) elFull.textContent = `$${fullCost}`;
      if (el100) el100.textContent = `$${cost100}`;
      if (elMonthly) elMonthly.textContent = `$${monthly}`;
      if (elMonthlyKm) elMonthlyKm.textContent = this.calcParams.dailyKm * 30;
    };

    if (isEV) {
      const sliderKwh = document.getElementById('sliderKwhPrice');
      const labelKwh = document.getElementById('labelKwhPrice');
      if (sliderKwh) {
        sliderKwh.addEventListener('input', (e) => {
          this.calcParams.kwhPrice = parseFloat(e.target.value);
          if (labelKwh) labelKwh.textContent = `${this.calcParams.kwhPrice.toFixed(2)} $/kWh`;
          updateCalc();
        });
      }
    } else {
      const sliderFuel = document.getElementById('sliderFuelPrice');
      const labelFuel = document.getElementById('labelFuelPrice');
      if (sliderFuel) {
        sliderFuel.addEventListener('input', (e) => {
          this.calcParams.fuelPrice = parseFloat(e.target.value);
          if (labelFuel) labelFuel.textContent = `${this.calcParams.fuelPrice.toFixed(2)} $/L`;
          updateCalc();
        });
      }
    }

    const sliderKm = document.getElementById('sliderDailyKm');
    const labelKm = document.getElementById('labelDailyKm');
    if (sliderKm) {
      sliderKm.addEventListener('input', (e) => {
        this.calcParams.dailyKm = parseInt(e.target.value, 10);
        if (labelKm) labelKm.textContent = `${this.calcParams.dailyKm} km / día`;
        updateCalc();
      });
    }
  }

  async searchGlobalWikipedia(query) {
    if (!query) return;
    const btn = this.dom.btnWikiSearch;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳ Consultando API global...</span>';
    }

    try {
      let data = null;
      const cleanTerm = query.trim().replace(/\\s+/g, '_');
      
      // 1. Intentar resumen directo en Wikipedia
      let res = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(cleanTerm));
      if (res.ok) {
        data = await res.json();
      } else {
        // 2. Fallback de búsqueda aproximada (Opensearch API pública con CORS abierto)
        const opensearchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + encodeURIComponent(query.trim()) + '&limit=1&namespace=0&format=json&origin=*';
        const searchRes = await fetch(opensearchUrl);
        const searchData = await searchRes.json();
        if (searchData && searchData[1] && searchData[1][0]) {
          const candidateTitle = searchData[1][0].replace(/\\s+/g, '_');
          const candidateRes = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(candidateTitle));
          if (candidateRes.ok) {
            data = await candidateRes.json();
          }
        }
      }
      
      if (!data) throw new Error('No se encontró información en las bases públicas');

      const isMoto = query.toLowerCase().includes('moto') || 
                     (data.description && (data.description.toLowerCase().includes('motorcycle') || data.description.toLowerCase().includes('scooter')));
      const isElectric = query.toLowerCase().includes('electric') || query.toLowerCase().includes('ev') ||
                         (data.description && (data.description.toLowerCase().includes('electric') || data.description.toLowerCase().includes('bev')));

      const dynamicType = isMoto ? 'moto' : (isElectric ? 'electric' : 'combustion');

      // Crear un objeto estructurado para el catálogo
      const dynamicVehicle = {
        id: 'api_' + Date.now(),
        name: data.title,
        brand: query.split(' ')[0] || 'Vehículo',
        model: data.title,
        yearRange: 'Consulta Global Live',
        source: 'api',
        type: dynamicType,
        badgeText: isElectric ? '100% Eléctrico (API)' : (isMoto ? 'Motocicleta (API)' : 'Combustión (API)'),
        imageUrl: data.thumbnail?.source || '',
        engine: data.description || 'Motorización estándar de catálogo internacional',
        power: 'Datos de homologación',
        fuelType: isElectric ? '100% Eléctrico' : 'Gasolina / Diésel',
        consumption: {
          city: isMoto ? 42.0 : 13.8,
          hwy: isMoto ? 36.0 : 18.5,
          combined: isMoto ? 39.0 : 15.8,
          kwhPer100Km: 16.2,
          kmPerKwh: 6.17,
          tankCapacityL: isMoto ? 10.0 : 50.0,
          batteryCapacityKwh: 65.0,
          estimatedRangeKm: isMoto ? 390 : (isElectric ? 420 : 790),
          oilViscosity: isMoto ? '10W-40 4T JASO MA2' : '5W-30 Sintético',
          oilCapacityL: isMoto ? 1.0 : 4.2,
          maxChargeAcKw: 11.0,
          maxChargeDcKw: 100.0,
          chargingTimes: {
            schuko23: '18 h (2.3 kW)',
            wallbox74: '5 h 30 min (7.4 kW)',
            fastChargeDc: '30 min (DC)'
          }
        },
        co2Emissions: isElectric ? '0 g/km (CERO)' : (isMoto ? '45 g/km' : '135 g/km'),
        highlights: [
          data.extract ? data.extract.slice(0, 180) + '...' : 'Vehículo obtenido mediante consulta a API pública externa.',
          'Consumos y depósito calculados con las métricas promedio de homologación de su categoría.',
          'Puedes personalizar los precios de combustible o tarifa eléctrica con la calculadora interactiva.'
        ]
      };

      // Agregar a la lista en memoria y mostrar inmediatamente
      this.catalog.vehicles.unshift(dynamicVehicle);
      this.render();
      this.openDetailModal(dynamicVehicle.id);

    } catch (err) {
      alert('No pudimos localizar "' + query + '" en la base pública. Prueba buscando por marca y modelo principal (ej. "Mustang", "Corolla", "Civic", "NMAX").');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>🌐 Buscar en Base Global (Wikipedia)</span>';
      }
    }
  }
}

// Instancia global
window.VehicleFinder = new VehicleSpecsFinder();
