// AutoFind Lab - Módulo Buscador y Comparador de Especificaciones y Consumo
// Maneja la búsqueda predictiva, extracción de fotos, pipeline de desambiguación automotriz y calculadora interactiva.

// Generador de Siluetas y Fallbacks SVG elegantes para vehículos sin imagen
function getVehicleSvgFallback(name, type, brand) {
  const isEV = type === 'electric';
  const isMoto = type === 'moto';

  const accentColor = isEV ? '#06b6d4' : (isMoto ? '#10b981' : '#f59e0b');
  const typeLabel = isEV ? '100% ELÉCTRICO' : (isMoto ? 'MOTOCICLETA' : 'COMBUSTIÓN');
  const icon = isEV ? '⚡' : (isMoto ? '🛵' : '⛽');

  // Silueta vectorial esquemática según categoría
  let silhouette = '';
  if (isMoto) {
    silhouette = `<circle cx="130" cy="115" r="28" stroke="${accentColor}" stroke-width="4" fill="none" opacity="0.6"/>
      <circle cx="270" cy="115" r="28" stroke="${accentColor}" stroke-width="4" fill="none" opacity="0.6"/>
      <path d="M 130 115 L 180 80 L 220 80 L 270 115 L 205 115 L 175 90 Z" stroke="${accentColor}" stroke-width="3.5" fill="none" stroke-linejoin="round" opacity="0.8"/>
      <path d="M 220 80 L 235 60 L 250 60" stroke="${accentColor}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="185" cy="72" r="6" fill="${accentColor}" opacity="0.9"/>`;
  } else {
    silhouette = `<circle cx="115" cy="122" r="22" stroke="${accentColor}" stroke-width="4" fill="none" opacity="0.6"/>
      <circle cx="285" cy="122" r="22" stroke="${accentColor}" stroke-width="4" fill="none" opacity="0.6"/>
      <path d="M 70 122 L 93 122 M 137 122 L 263 122 M 307 122 L 330 122" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
      <path d="M 75 118 L 85 92 L 135 90 L 175 60 L 260 60 L 305 90 L 328 98 L 330 118 Z" stroke="${accentColor}" stroke-width="3.5" fill="none" stroke-linejoin="round" opacity="0.85"/>
      <path d="M 175 65 L 170 90 L 255 90 L 255 65 Z" stroke="${accentColor}" stroke-width="2" fill="none" opacity="0.5"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090d16"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#050811"/>
      </linearGradient>
    </defs>
    <rect width="400" height="180" fill="url(#bgGrad)"/>
    <g transform="translate(0, 5)">
      ${silhouette}
    </g>
    <rect x="15" y="15" width="120" height="22" rx="6" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-opacity="0.4"/>
    <text x="25" y="30" font-family="sans-serif" font-size="10" font-weight="bold" fill="${accentColor}">${icon} ${typeLabel}</text>
    <text x="200" y="160" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#e2e8f0">${encodeURIComponent(name).replace(/%20/g, ' ')}</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Diccionario de Alias Automotrices Canónicos
const AUTOMOTIVE_ALIASES = {
  'mustang': 'Ford Mustang',
  'beetle': 'Volkswagen Beetle',
  'vocho': 'Volkswagen Beetle',
  'golf': 'Volkswagen Golf',
  'focus': 'Ford Focus',
  'camaro': 'Chevrolet Camaro',
  'corvette': 'Chevrolet Corvette',
  'viper': 'Dodge Viper',
  'dodge viper': 'Dodge Viper',
  'challenger': 'Dodge Challenger',
  'charger': 'Dodge Charger',
  'bronco': 'Ford Bronco',
  'ram': 'Ram 1500',
  'ram 1500': 'Ram 1500',
  'cybertruck': 'Tesla Cybertruck',
  'k3': 'Kia K3',
  'kia k3': 'Kia K3 (BL7)',
  'odyssey': 'Honda Odyssey (North America)',
  'honda odyssey': 'Honda Odyssey (North America)',
  'rav4': 'Toyota RAV4',
  'toyota rav4': 'Toyota RAV4',
  'sentra': 'Nissan Sentra',
  'nissan sentra': 'Nissan Sentra',
  'f-150': 'Ford F-150',
  'f150': 'Ford F-150',
  'lobo': 'Ford F-150',
  'tracker': 'Chevrolet Tracker',
  'seltos': 'Kia Seltos',
  'taos': 'Volkswagen Taos',
  'kicks': 'Nissan Kicks',
  'swift': 'Suzuki Swift',
  'kwid': 'Renault Kwid',
  'civic': 'Honda Civic',
  'corolla': 'Toyota Corolla',
  'versa': 'Nissan Versa',
  'aveo': 'Chevrolet Aveo',
  'onix': 'Chevrolet Onix',
  'ranger': 'Ford Ranger',
  'duster': 'Dacia Duster',
  'ibiza': 'SEAT Ibiza',
  'ninja': 'Kawasaki Ninja 400',
  'ninja 400': 'Kawasaki Ninja 400',
  'r3': 'Yamaha YZF-R3',
  'yzf-r3': 'Yamaha YZF-R3',
  'dm200': 'Italika DM200',
  'ft150': 'Italika FT150',
  'nmax': 'Yamaha NMAX',
  'mt-03': 'Yamaha MT-03',
  'duke': 'KTM 390 Duke',
  'duke 390': 'KTM 390 Duke',
  'pulsar': 'Bajaj Pulsar'
};

// Expresiones regulares de validación automotriz
const CAR_TERMS_REGEX = /(car|automobile|vehicle|motorcycle|scooter|sedan|coupe|suv|truck|pickup|hatchback|convertible|sports car|muscle car|supercar|crossover|electric vehicle|van|minivan|moped|coche|automóvil|vehículo|motocicleta)/i;
const NON_CAR_REGEX = /(disambiguation|index of articles|horse|breed of|species of|genus|mammal|insect|reptile|amphibian|equine|song by|album by|film directed|video game|fictional character|plant|river in|district of|county in)/i;

class VehicleSpecsFinder {
  constructor() {
    this.catalog = window.SPECS_CATALOG || { vehicles: [] };
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.selectedVehicle = null;
    this.wikiCache = {};

    // Parámetros por defecto de la calculadora interactiva
    this.calcParams = {
      fuelPrice: 24.50,    // Precio por litro de combustible ($ MXN configurable)
      kwhPrice: 2.80,      // Tarifa por kWh de electricidad
      dailyKm: 30          // Kilómetros diarios habituales
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

    // Búsqueda en tiempo real
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

    // Tecla Enter
    this.dom.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const matches = this.catalog.search ? this.catalog.search(this.searchQuery, this.currentFilter) : [];
        if (matches.length === 0 && this.searchQuery) {
          this.searchGlobalWikipedia(this.searchQuery);
        }
      }
    });

    // Botón limpiar
    if (this.dom.btnClearSearch) {
      this.dom.btnClearSearch.addEventListener('click', () => {
        this.dom.searchInput.value = '';
        this.searchQuery = '';
        this.dom.btnClearSearch.classList.add('hidden');
        this.dom.searchInput.focus();
        this.render();
      });
    }

    // Filtros por chips
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

    // Botón de búsqueda en base global
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

    // Eventos de clic a tarjetas
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

    // Métricas rápidas
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
    const priceDisplay = v.averagePrice || 'Consultar agencia';
    const fallbackSvg = getVehicleSvgFallback(v.name, v.type, v.brand);

    return `
      <article data-id="${v.id}" class="vehicle-spec-card group relative flex flex-col bg-slate-900/90 hover:bg-slate-800/90 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.99]">
        
        <!-- Contenedor Imagen con Aspect Ratio 16:9 y Badges -->
        <div class="relative w-full h-44 bg-slate-950 overflow-hidden border-b border-slate-800/80">
          <img 
            src="${v.imageUrl}" 
            alt="${v.name}" 
            loading="lazy"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onerror="this.onerror=null; this.src='${fallbackSvg}';"
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
              <span>${v.source === 'api' ? '🌐 API Externa' : v.yearRange}</span>
            </span>
          </div>
        </div>

        <!-- Cuerpo de Información -->
        <div class="p-4 flex-1 flex flex-col justify-between gap-3">
          <div>
            <div class="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <span>${v.brand}</span>
              <span>•</span>
              <span class="text-cyan-400">${v.power || 'Homologado'}</span>
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

          <!-- Footer con Precio Promedio y Botón de Acción -->
          <div class="flex items-center justify-between text-xs pt-1">
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400 font-medium">Precio promedio:</span>
              <span class="font-bold text-emerald-300 text-xs sm:text-sm">${priceDisplay}</span>
            </div>
            <div class="flex items-center gap-1 text-xs text-cyan-400 font-semibold group-hover:text-cyan-300">
              <span>Ver ficha</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </div>
      </article>
    `;
  }

  // Cálculo de Frecuencia de Repostaje / Recarga
  getRefuelInfo(rangeKm, dailyKm) {
    const km = Math.max(1, dailyKm || 30);
    const days = Math.max(1, Math.round(rangeKm / km));
    const visitsPerMonth = (30 / days).toFixed(1);

    let badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    let badgeText = '🟢 Muy Baja (~1 vez/mes)';

    if (days < 7) {
      badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      badgeText = '⚡ Frecuente (< 1 semana)';
    } else if (days < 14) {
      badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      badgeText = '🟡 Semanal (Cada 1-2 semanas)';
    } else if (days < 25) {
      badgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      badgeText = '🔵 Moderada (~2 veces/mes)';
    }

    return { days, visitsPerMonth, badgeClass, badgeText };
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

    // Cálculos preliminares para la calculadora y la respuesta al usuario
    const costFullTank = isEV 
      ? (v.consumption.batteryCapacityKwh * this.calcParams.kwhPrice).toFixed(2)
      : (v.consumption.tankCapacityL * this.calcParams.fuelPrice).toFixed(2);

    const costPer100Km = isEV
      ? (v.consumption.kwhPer100Km * this.calcParams.kwhPrice).toFixed(2)
      : ((100 / v.consumption.combined) * this.calcParams.fuelPrice).toFixed(2);

    const monthlyCost = isEV
      ? ((v.consumption.kwhPer100Km / 100) * this.calcParams.dailyKm * 30 * this.calcParams.kwhPrice).toFixed(0)
      : (((100 / v.consumption.combined) / 100) * this.calcParams.dailyKm * 30 * this.calcParams.fuelPrice).toFixed(0);

    const weeklyCost = isEV
      ? ((v.consumption.kwhPer100Km / 100) * this.calcParams.dailyKm * 7 * this.calcParams.kwhPrice).toFixed(2)
      : (((100 / v.consumption.combined) / 100) * this.calcParams.dailyKm * 7 * this.calcParams.fuelPrice).toFixed(2);

    const dailyCost = isEV
      ? ((v.consumption.kwhPer100Km / 100) * this.calcParams.dailyKm * this.calcParams.kwhPrice).toFixed(2)
      : (((100 / v.consumption.combined) / 100) * this.calcParams.dailyKm * this.calcParams.fuelPrice).toFixed(2);

    // Frecuencia inicial de recarga
    const refuel = this.getRefuelInfo(v.consumption.estimatedRangeKm, this.calcParams.dailyKm);
    const tankCapacityText = isEV ? `${v.consumption.batteryCapacityKwh} kWh` : `${v.consumption.tankCapacityL} L`;
    const averagePrice = v.averagePrice || 'Consultar mercado oficial';
    const priceRange = v.priceRange || 'Sujeto a versión y condiciones de seminuevo';
    const fallbackSvg = getVehicleSvgFallback(v.name, v.type, v.brand);

    return `
      <!-- HEADER HERO DEL MODAL -->
      <div class="relative w-full h-56 sm:h-72 bg-slate-950 overflow-hidden border-b border-slate-800">
        <img 
          src="${v.imageUrl}" 
          alt="${v.name}" 
          class="w-full h-full object-cover object-center"
          onerror="this.onerror=null; this.src='${fallbackSvg}';"
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

        <!-- 1. RESUMEN COMERCIAL & FRECUENCIA DE RECARGA (2 TARJETAS SUPERIORES) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          
          <!-- TARJETA A: PRECIO PROMEDIO DE MERCADO -->
          <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between gap-3 shadow-md">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>🏷️</span> Precio Promedio del Vehículo
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                Mercado Verificado
              </span>
            </div>

            <div>
              <div class="text-2xl sm:text-3xl font-black text-emerald-300">
                ${averagePrice}
              </div>
              <p class="text-xs text-slate-300 mt-1">
                Rango comercial: <strong class="text-white">${priceRange}</strong>
              </p>
            </div>

            <div class="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Segmento: <strong>${v.badgeText}</strong></span>
              <span>${v.source === 'api' ? 'Datos de API' : 'Catálogo Verificado'}</span>
            </div>
          </div>

          <!-- TARJETA B: FRECUENCIA DE REPOSTAJE / RECARGA -->
          <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between gap-3 shadow-md">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>🗓️</span> Frecuencia de ${isEV ? 'Recarga' : 'Repostaje'}
              </span>
              <span id="resRefuelBadge" class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${refuel.badgeClass}">
                ${refuel.badgeText}
              </span>
            </div>

            <div>
              <div class="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1.5">
                <span>Cada</span>
                <span id="resRefuelDays" class="text-cyan-400">${refuel.days}</span>
                <span class="text-base font-semibold text-slate-300">días</span>
              </div>
              <p id="resRefuelDesc" class="text-xs text-slate-300 mt-1">
                Aprox. <strong>${refuel.visitsPerMonth} visitas al mes</strong> recorriendo ${this.calcParams.dailyKm} km/día (${tankCapacityText}).
              </p>
            </div>

            <div class="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span>Autonomía total: <strong>${v.consumption.estimatedRangeKm} km</strong></span>
              <span class="text-cyan-400">Ajustable con slider ↗</span>
            </div>
          </div>

        </div>

        <!-- 2. CALCULADORA INTERACTIVA DE COSTOS DEL DÍA A DÍA -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-slate-800 flex flex-col gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 class="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>💰</span> Calculadora Interactiva de Gasto & Presupuesto
              </h4>
              <p class="text-xs text-slate-400">Mueve los controles para simular según tus precios locales y kilometraje real.</p>
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
                  <input id="sliderKwhPrice" type="range" min="1.0" max="7.0" step="0.10" value="${this.calcParams.kwhPrice}" class="w-full accent-cyan-400 cursor-pointer" />
                  <div class="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>1.00 (Tarifa Casa / Valle)</span>
                    <span>7.00 (Cargador Rápido Público)</span>
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

            <!-- Cajas de Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span class="text-[11px] text-slate-400">${isEV ? 'Recarga Completa (100%)' : 'Llenar Tanque Completo'}</span>
                <span id="resCostFullTank" class="text-lg sm:text-xl font-black text-cyan-300 mt-1">$${costFullTank}</span>
                <span class="text-[10px] text-slate-500 mt-0.5">${tankCapacityText}</span>
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

        <!-- 3. RESPUESTA CLARA: ¿CUÁNTO PAGARÉ CUANDO VISITE A RECARGAR? -->
        <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 border border-emerald-500/30 shadow-xl flex flex-col gap-4">
          
          <div class="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-lg shrink-0">
                ${typeIcon}
              </div>
              <div>
                <h4 class="font-bold text-sm sm:text-base text-white">
                  ¿Cuánto pagaré al visitar para ${isEV ? 'recargar energía' : 'cargar gasolina'}?
                </h4>
                <p class="text-xs text-slate-400">
                  Respuesta directa a tu pregunta según los parámetros seleccionados en la calculadora:
                </p>
              </div>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50 hidden sm:inline-block">
              Desglose en Vivo
            </span>
          </div>

          <!-- 3 Opciones de Pago / Escenarios Reales -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            <!-- Opción 1: Llenado Total (0 a 100%) -->
            <div class="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/90 flex flex-col justify-between gap-2">
              <div class="flex items-center justify-between text-xs text-slate-400">
                <span class="font-semibold text-slate-300">1. Llenado Total (100%)</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Tanque vacío</span>
              </div>
              <div class="my-0.5">
                <div id="resPayFullTank" class="text-xl sm:text-2xl font-black text-emerald-300">
                  $${costFullTank}
                </div>
                <p class="text-[11px] text-slate-400 mt-1">
                  Pagas esto al llegar en reserva y llenar los <strong>${tankCapacityText}</strong> completos.
                </p>
              </div>
              <div class="text-[10px] text-slate-500 border-t border-slate-800/60 pt-1.5 flex items-center gap-1">
                <span>🗓️ Te durará:</span>
                <strong id="resPayFullFreq" class="text-slate-300">${refuel.days} días (${v.consumption.estimatedRangeKm} km)</strong>
              </div>
            </div>

            <!-- Opción 2: Recarga Semanal (7 días) -->
            <div class="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/90 flex flex-col justify-between gap-2">
              <div class="flex items-center justify-between text-xs text-slate-400">
                <span class="font-semibold text-slate-300">2. Ticket Semanal Habitual</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">7 días de uso</span>
              </div>
              <div class="my-0.5">
                <div id="resPayWeekly" class="text-xl sm:text-2xl font-black text-cyan-300">
                  $${weeklyCost}
                </div>
                <p class="text-[11px] text-slate-400 mt-1">
                  Si visitas la estación cada semana para reponer los <strong id="resWeeklyKmDesc">${this.calcParams.dailyKm * 7} km</strong> de tus traslados.
                </p>
              </div>
              <div class="text-[10px] text-slate-500 border-t border-slate-800/60 pt-1.5 flex items-center gap-1">
                <span>🔄 Frecuencia:</span>
                <strong class="text-slate-300">1 visita cada 7 días</strong>
              </div>
            </div>

            <!-- Opción 3: Gasto Diario Real -->
            <div class="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/90 flex flex-col justify-between gap-2">
              <div class="flex items-center justify-between text-xs text-slate-400">
                <span class="font-semibold text-slate-300">3. Gasto Diario Neto</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/40">Por jornada</span>
              </div>
              <div class="my-0.5">
                <div id="resPayDaily" class="text-xl sm:text-2xl font-black text-amber-300">
                  $${dailyCost}
                </div>
                <p class="text-[11px] text-slate-400 mt-1">
                  Costo neto por cada día que recorres <strong id="resDailyKmDesc">${this.calcParams.dailyKm} km</strong> de trayecto habitual.
                </p>
              </div>
              <div class="text-[10px] text-slate-500 border-t border-slate-800/60 pt-1.5 flex items-center gap-1">
                <span>📅 Al mes (30d):</span>
                <strong id="resPayMonthlySummary" class="text-slate-300">$${monthlyCost}</strong>
              </div>
            </div>

          </div>

          <!-- Conclusión en Lenguaje Natural -->
          <div class="p-3 bg-slate-950/50 rounded-xl border border-slate-800/70 text-xs text-slate-300 flex items-start gap-2.5">
            <span class="text-emerald-400 text-base leading-none mt-0.5">💡</span>
            <p id="resPayExplanation" class="leading-relaxed text-slate-400">
              En conclusión: si vas a la estación cuando se encienda la reserva, pagarás exactamente <strong class="text-emerald-400 font-bold">$${costFullTank}</strong> y no tendrás que volver en <strong class="text-cyan-400 font-bold">${refuel.days} días</strong>. Si prefieres un ticket semanal fijo, pagarás <strong class="text-cyan-300 font-bold">$${weeklyCost}</strong> cada 7 días.
            </p>
          </div>

        </div>

        <!-- 4. REJILLA DE ESPECIFICACIONES CLAVE DE RENDIMIENTO -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span>📊</span> Especificaciones Técnicas Homologadas
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

        <!-- 5. TIEMPOS DE RECARGA (EV) O ACEITE & EMISIONES (COMBUSTIÓN/MOTO) -->
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

      const weekly = isEV
        ? ((v.consumption.kwhPer100Km / 100) * this.calcParams.dailyKm * 7 * this.calcParams.kwhPrice).toFixed(2)
        : (((100 / v.consumption.combined) / 100) * this.calcParams.dailyKm * 7 * this.calcParams.fuelPrice).toFixed(2);

      const daily = isEV
        ? ((v.consumption.kwhPer100Km / 100) * this.calcParams.dailyKm * this.calcParams.kwhPrice).toFixed(2)
        : (((100 / v.consumption.combined) / 100) * this.calcParams.dailyKm * this.calcParams.fuelPrice).toFixed(2);

      // Elementos de la calculadora
      const elFull = document.getElementById('resCostFullTank');
      const el100 = document.getElementById('resCost100Km');
      const elMonthly = document.getElementById('resMonthlyCost');
      const elMonthlyKm = document.getElementById('resMonthlyKm');

      if (elFull) elFull.textContent = `$${fullCost}`;
      if (el100) el100.textContent = `$${cost100}`;
      if (elMonthly) elMonthly.textContent = `$${monthly}`;
      if (elMonthlyKm) elMonthlyKm.textContent = this.calcParams.dailyKm * 30;

      // Frecuencia de Repostaje
      const refuel = this.getRefuelInfo(v.consumption.estimatedRangeKm, this.calcParams.dailyKm);
      const elDays = document.getElementById('resRefuelDays');
      const elBadge = document.getElementById('resRefuelBadge');
      const elDesc = document.getElementById('resRefuelDesc');
      const tankCapacityText = isEV ? `${v.consumption.batteryCapacityKwh} kWh` : `${v.consumption.tankCapacityL} L`;

      if (elDays) elDays.textContent = refuel.days;
      if (elBadge) {
        elBadge.className = `text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${refuel.badgeClass}`;
        elBadge.textContent = refuel.badgeText;
      }
      if (elDesc) {
        elDesc.innerHTML = `Aprox. <strong>${refuel.visitsPerMonth} visitas al mes</strong> recorriendo ${this.calcParams.dailyKm} km/día (${tankCapacityText}).`;
      }

      // Desglose de Pago "¿Cuánto pagaré al visitar?"
      const elPayFull = document.getElementById('resPayFullTank');
      const elPayWeekly = document.getElementById('resPayWeekly');
      const elPayDaily = document.getElementById('resPayDaily');
      const elPayFullFreq = document.getElementById('resPayFullFreq');
      const elWeeklyKmDesc = document.getElementById('resWeeklyKmDesc');
      const elDailyKmDesc = document.getElementById('resDailyKmDesc');
      const elPayMonthlySummary = document.getElementById('resPayMonthlySummary');
      const elPayExplanation = document.getElementById('resPayExplanation');

      if (elPayFull) elPayFull.textContent = `$${fullCost}`;
      if (elPayWeekly) elPayWeekly.textContent = `$${weekly}`;
      if (elPayDaily) elPayDaily.textContent = `$${daily}`;
      if (elPayFullFreq) elPayFullFreq.textContent = `${refuel.days} días (${v.consumption.estimatedRangeKm} km)`;
      if (elWeeklyKmDesc) elWeeklyKmDesc.textContent = `${this.calcParams.dailyKm * 7} km`;
      if (elDailyKmDesc) elDailyKmDesc.textContent = `${this.calcParams.dailyKm} km`;
      if (elPayMonthlySummary) elPayMonthlySummary.textContent = `$${monthly}`;

      if (elPayExplanation) {
        elPayExplanation.innerHTML = `En conclusión: si vas a la estación cuando se encienda la reserva, pagarás exactamente <strong class="text-emerald-400 font-bold">$${fullCost}</strong> y no tendrás que volver en <strong class="text-cyan-400 font-bold">${refuel.days} días</strong>. Si prefieres un ticket semanal fijo, pagarás <strong class="text-cyan-300 font-bold">$${weekly}</strong> cada 7 días.`;
      }
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

  // =========================================================================
  // MOTOR DE BÚSQUEDA AUTOMOTRIZ GLOBAL CON DESAMBIGUACIÓN AVANZADA
  // =========================================================================
  async searchGlobalWikipedia(query) {
    if (!query) return;
    const btn = this.dom.btnWikiSearch;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳ Consultando base automotriz...</span>';
    }

    const cleanTerm = query.toLowerCase().trim();

    // 1. Verificar si ya existe en catálogo para evitar duplicados
    const existingInCatalog = this.catalog.vehicles.find(v => 
      v.name.toLowerCase().includes(cleanTerm) || v.model.toLowerCase().includes(cleanTerm)
    );
    if (existingInCatalog) {
      this.openDetailModal(existingInCatalog.id);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>🌐 Buscar en Base Global</span>';
      }
      return;
    }

    // 2. Comprobar caché local en memoria
    if (this.wikiCache[cleanTerm]) {
      const cached = this.wikiCache[cleanTerm];
      this.openDetailModal(cached.id);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>🌐 Buscar en Base Global</span>';
      }
      return;
    }

    try {
      // 3. Resolver alias canónico
      const canonicalTitle = AUTOMOTIVE_ALIASES[cleanTerm] || query.trim();

      const fetchWikiTitle = async (title) => {
        const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) +
          '&prop=pageimages|extracts|description&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=960&redirects=1&format=json&origin=*';
        const res = await fetch(url, { headers: { 'User-Agent': 'AutoFindLab/1.0 (contact@autofind.app)' } });
        if (!res.ok) return null;
        const data = await res.json();
        const page = Object.values(data.query?.pages || {})[0];
        if (!page || page.pageid === undefined || page.missing !== undefined) return null;
        return page;
      };

      const isCar = (p) => {
        if (!p) return false;
        const text = `${p.title || ''} ${p.description || ''} ${p.extract || ''}`.toLowerCase();
        const hasCarTerm = CAR_TERMS_REGEX.test(text);
        const hasNonCarTerm = NON_CAR_REGEX.test(p.description || '') || NON_CAR_REGEX.test((p.extract || '').slice(0, 80));
        return hasCarTerm && !hasNonCarTerm;
      };

      let page = await fetchWikiTitle(canonicalTitle);

      // Si es una página de desambiguación o no es un vehículo válido, buscar contexto automotriz específico
      if (!isCar(page)) {
        const searchContexts = [
          cleanTerm + ' automobile',
          cleanTerm + ' car',
          cleanTerm + ' motorcycle'
        ];

        for (const sQuery of searchContexts) {
          const searchUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
            encodeURIComponent(sQuery) + '&utf8=&format=json&origin=*';
          const sRes = await fetch(searchUrl, { headers: { 'User-Agent': 'AutoFindLab/1.0 (contact@autofind.app)' } });
          if (sRes.ok) {
            const sData = await sRes.json();
            const hits = sData.query?.search || [];
            for (const hit of hits.slice(0, 4)) {
              const candidate = await fetchWikiTitle(hit.title);
              if (isCar(candidate)) {
                page = candidate;
                break;
              }
            }
          }
          if (isCar(page)) break;
        }
      }

      if (!page || !isCar(page)) {
        throw new Error('No se localizó un vehículo correspondiente a este término.');
      }

      const isMoto = cleanTerm.includes('moto') || 
                     (page.description && (page.description.toLowerCase().includes('motorcycle') || page.description.toLowerCase().includes('scooter')));
      const isElectric = cleanTerm.includes('electric') || cleanTerm.includes('ev') ||
                         (page.description && (page.description.toLowerCase().includes('electric') || page.description.toLowerCase().includes('bev')));

      const dynamicType = isMoto ? 'moto' : (isElectric ? 'electric' : 'combustion');

      // Imagen garantizada: Foto oficial o Fallback SVG temático (NUNCA un Mustang aleatorio)
      const fallbackSvg = getVehicleSvgFallback(page.title, dynamicType, page.title.split(' ')[0]);
      const vehicleImg = page.thumbnail?.source || fallbackSvg;

      // Estructurar vehículo
      const dynamicVehicle = {
        id: 'api_' + Date.now(),
        name: page.title,
        brand: page.title.split(' ')[0] || 'Vehículo',
        model: page.title,
        yearRange: 'Consulta Global',
        source: 'api',
        type: dynamicType,
        badgeText: isElectric ? '100% Eléctrico (API)' : (isMoto ? 'Motocicleta (API)' : 'Combustión (API)'),
        averagePrice: 'Consultar agencia oficial',
        priceRange: 'Variable según versión y equipamiento',
        imageUrl: vehicleImg,
        engine: page.description || 'Motorización homologada internacionalmente',
        power: isMoto ? '15 - 45 HP' : (isElectric ? '200 - 450 HP' : '120 - 350 HP'),
        fuelType: isElectric ? '100% Eléctrico' : 'Gasolina / Diésel',
        consumption: {
          city: isMoto ? 42.0 : 13.5,
          hwy: isMoto ? 36.0 : 18.2,
          combined: isMoto ? 39.0 : 15.4,
          kwhPer100Km: 16.2,
          kmPerKwh: 6.17,
          tankCapacityL: isMoto ? 10.0 : 52.0,
          batteryCapacityKwh: 65.0,
          estimatedRangeKm: isMoto ? 390 : (isElectric ? 420 : 800),
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
        co2Emissions: isElectric ? '0 g/km (CERO)' : (isMoto ? '45 g/km' : '135 g/km')
      };

      // Evitar duplicados en memoria
      const alreadyExists = this.catalog.vehicles.some(v => v.name.toLowerCase() === dynamicVehicle.name.toLowerCase());
      if (!alreadyExists) {
        this.wikiCache[cleanTerm] = dynamicVehicle;
        this.catalog.vehicles.unshift(dynamicVehicle);
      }

      this.render();
      this.openDetailModal(dynamicVehicle.id);

    } catch (err) {
      alert('No pudimos localizar "' + query + '" en la base automotriz. Prueba buscando por marca y modelo principal (ej. "Mustang", "Corolla", "Civic", "NMAX", "K3", "Cybertruck").');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>🌐 Buscar en Base Global</span>';
      }
    }
  }
}

// Instancia global
window.VehicleFinder = new VehicleSpecsFinder();
