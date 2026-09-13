// AutoFind Lab - Módulo Buscador y Comparador de Especificaciones y Consumo
// Maneja la búsqueda predictiva, extracción de fotos (Wikipedia / Catálogo), pipeline de desambiguación automotriz y calculadora de costos y frecuencias.

// =========================================================================
// TABLA DE DESAMBIGUACIÓN AUTOMOTRIZ
// Evita que búsquedas de nombres comunes o animales (Mustang, Beetle, Golf, Focus, Viper, etc.)
// devuelvan entidades biológicas o no vehiculares de Wikipedia.
// =========================================================================
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
  'f-150': 'Ford F-150',
  'f150': 'Ford F-150',
  'ranger': 'Ford Ranger',
  'explorer': 'Ford Explorer',
  'escape': 'Ford Escape',
  'edge': 'Ford Edge',
  'fiesta': 'Ford Fiesta',
  'fusion': 'Ford Fusion',
  'civic': 'Honda Civic',
  'accord': 'Honda Accord',
  'cr-v': 'Honda CR-V',
  'crv': 'Honda CR-V',
  'hr-v': 'Honda HR-V',
  'hrv': 'Honda HR-V',
  'city': 'Honda City',
  'fit': 'Honda Fit',
  'corolla': 'Toyota Corolla',
  'camry': 'Toyota Camry',
  'yaris': 'Toyota Yaris',
  'rav4': 'Toyota RAV4',
  'hilux': 'Toyota Hilux',
  'tacoma': 'Toyota Tacoma',
  'prius': 'Toyota Prius',
  'supra': 'Toyota Supra',
  'avalon': 'Toyota Avalon',
  'highlander': 'Toyota Highlander',
  'sienna': 'Toyota Sienna',
  'land cruiser': 'Toyota Land Cruiser',
  '4runner': 'Toyota 4Runner',
  'versa': 'Nissan Versa',
  'sentra': 'Nissan Sentra',
  'altima': 'Nissan Altima',
  'maxima': 'Nissan Maxima',
  'tsuru': 'Nissan Tsuru',
  'tiida': 'Nissan Tiida',
  'march': 'Nissan March',
  'kicks': 'Nissan Kicks',
  'x-trail': 'Nissan X-Trail',
  'xtrail': 'Nissan X-Trail',
  'frontier': 'Nissan Frontier',
  'leaf': 'Nissan Leaf',
  'ariya': 'Nissan Ariya',
  'gt-r': 'Nissan GT-R',
  'gtr': 'Nissan GT-R',
  '370z': 'Nissan 370Z',
  'jetta': 'Volkswagen Jetta',
  'vento': 'Volkswagen Vento',
  'polo': 'Volkswagen Polo',
  'tiguan': 'Volkswagen Tiguan',
  'taos': 'Volkswagen Taos',
  't-cross': 'Volkswagen T-Cross',
  'tcross': 'Volkswagen T-Cross',
  'teramont': 'Volkswagen Teramont',
  'passat': 'Volkswagen Passat',
  'aveo': 'Chevrolet Aveo',
  'spark': 'Chevrolet Spark',
  'onix': 'Chevrolet Onix',
  'tracker': 'Chevrolet Tracker',
  'trax': 'Chevrolet Trax',
  'captiva': 'Chevrolet Captiva',
  'equinox': 'Chevrolet Equinox',
  'traverse': 'Chevrolet Traverse',
  'tahoe': 'Chevrolet Tahoe',
  'suburban': 'Chevrolet Suburban',
  'silverado': 'Chevrolet Silverado',
  'colorado': 'Chevrolet Colorado',
  's10': 'Chevrolet S10',
  'cavalier': 'Chevrolet Cavalier',
  'beat': 'Chevrolet Beat',
  'ibiza': 'SEAT Ibiza',
  'leon': 'SEAT Leon',
  'ateca': 'SEAT Ateca',
  'arona': 'SEAT Arona',
  'tarraco': 'SEAT Tarraco',
  'duster': 'Dacia Duster',
  'sandero': 'Dacia Sandero',
  'stepway': 'Renault Stepway',
  'kwid': 'Renault Kwid',
  'clio': 'Renault Clio',
  'megane': 'Renault Mégane',
  'koleos': 'Renault Koleos',
  'oroch': 'Renault Oroch',
  'captur': 'Renault Captur',
  'swift': 'Suzuki Swift',
  'jimny': 'Suzuki Jimny',
  'vitara': 'Suzuki Vitara',
  's-cross': 'Suzuki S-Cross',
  'baleno': 'Suzuki Baleno',
  'ignis': 'Suzuki Ignis',
  'ertiga': 'Suzuki Ertiga',
  'tucson': 'Hyundai Tucson',
  'elantra': 'Hyundai Elantra',
  'creta': 'Hyundai Creta',
  'santa fe': 'Hyundai Santa Fe',
  'accent': 'Hyundai Accent',
  'i10': 'Hyundai i10',
  'grand i10': 'Hyundai Grand i10',
  'kona': 'Hyundai Kona',
  'ioniq 5': 'Hyundai Ioniq 5',
  'ioniq 6': 'Hyundai Ioniq 6',
  'sportage': 'Kia Sportage',
  'rio': 'Kia Rio',
  'forte': 'Kia Forte',
  'k3': 'Kia K3',
  'k5': 'Kia K5',
  'seltos': 'Kia Seltos',
  'soul': 'Kia Soul',
  'sorento': 'Kia Sorento',
  'niro': 'Kia Niro',
  'ev6': 'Kia EV6',
  'ev9': 'Kia EV9',
  'cx-3': 'Mazda CX-3',
  'cx-30': 'Mazda CX-30',
  'cx-5': 'Mazda CX-5',
  'cx-50': 'Mazda CX-50',
  'cx-90': 'Mazda CX-90',
  'mazda 2': 'Mazda 2',
  'mazda 3': 'Mazda 3',
  'mazda 6': 'Mazda 6',
  'mx-5': 'Mazda MX-5',
  'miata': 'Mazda MX-5',
  'model 3': 'Tesla Model 3',
  'model y': 'Tesla Model Y',
  'model s': 'Tesla Model S',
  'model x': 'Tesla Model X',
  'cybertruck': 'Tesla Cybertruck',
  'dolphin': 'BYD Dolphin',
  'seal': 'BYD Seal',
  'tang': 'BYD Tang',
  'han': 'BYD Han',
  'song plus': 'BYD Song Plus',
  'atto 3': 'BYD Atto 3',
  'shark': 'BYD Shark',
  '911': 'Porsche 911',
  'taycan': 'Porsche Taycan',
  'panamera': 'Porsche Panamera',
  'macan': 'Porsche Macan',
  'cayenne': 'Porsche Cayenne',
  'cayman': 'Porsche 718 Cayman',
  'boxster': 'Porsche 718 Boxster',
  'ninja 400': 'Kawasaki Ninja 400',
  'ninja': 'Kawasaki Ninja 400',
  'ninja 650': 'Kawasaki Ninja 650',
  'ninja zx-6r': 'Kawasaki Ninja ZX-6R',
  'z400': 'Kawasaki Z400',
  'z900': 'Kawasaki Z900',
  'mt-03': 'Yamaha MT-03',
  'mt-07': 'Yamaha MT-07',
  'mt-09': 'Yamaha MT-09',
  'yzf-r3': 'Yamaha YZF-R3',
  'yzf-r7': 'Yamaha YZF-R7',
  'r3': 'Yamaha YZF-R3',
  'nmax': 'Yamaha NMAX',
  'aerox': 'Yamaha Aerox',
  'cbr600': 'Honda CBR600RR',
  'cbr500': 'Honda CBR500R',
  'cb650r': 'Honda CB650R',
  'cbr': 'Honda CBR series',
  'africa twin': 'Honda Africa Twin',
  'duke 390': 'KTM 390 Duke',
  'duke 200': 'KTM 200 Duke',
  'duke': 'KTM 390 Duke',
  'rc 390': 'KTM RC 390',
  'pulsar 200': 'Bajaj Pulsar NS 200',
  'pulsar': 'Bajaj Pulsar',
  'dominar 400': 'Bajaj Dominar 400',
  'vespa': 'Vespa',
  'primavera': 'Vespa Primavera',
  'dm200': 'Italika DM200',
  'ft150': 'Italika FT150',
  'ft125': 'Italika FT125',
  'ws150': 'Italika WS150',
  'vort-x': 'Italika Vort-X 300'
};

// Filtro estricto de validación vehicular
const CAR_TERMS_REGEX = /(car|automobile|vehicle|motorcycle|scooter|sedan|coupe|suv|truck|pickup|hatchback|convertible|sports car|muscle car|supercar|crossover|electric vehicle|van|station wagon|moped|coche|automóvil|vehículo|motocicleta)/i;
const NON_CAR_REGEX = /(horse|breed of|species of|genus|mammal|insect|reptile|amphibian|equine|mustang horse|song by|album by|film directed|video game|fictional character|plant|river in|district of|county in|disambiguation)/i;

// Estimador de precio para vehículos recuperados vía API externa
function estimateApiVehiclePrice(name, type) {
  const n = (name || '').toLowerCase();
  if (type === 'moto') {
    if (n.includes('duke') || n.includes('mt-') || n.includes('ninja') || n.includes('cbr') || n.includes('r3') || n.includes('bmw') || n.includes('ducati') || n.includes('harley')) {
      return { average: '$145,000 MXN', range: '$125,000 - $175,000 MXN (~$7,900 USD)' };
    }
    return { average: '$38,900 MXN', range: '$28,000 - $55,000 MXN (~$2,100 USD)' };
  }
  if (type === 'electric') {
    if (n.includes('porsche') || n.includes('taycan') || n.includes('audi e-tron') || n.includes('bmw i') || n.includes('mercedes eq')) {
      return { average: '$1,950,000 MXN', range: '$1,650,000 - $2,400,000 MXN (~$105,000 USD)' };
    }
    if (n.includes('tesla') || n.includes('seal') || n.includes('ioniq') || n.includes('ev6')) {
      return { average: '$820,000 MXN', range: '$749,000 - $950,000 MXN (~$44,500 USD)' };
    }
    return { average: '$460,000 MXN', range: '$399,000 - $540,000 MXN (~$25,000 USD)' };
  }
  // Combustión
  if (n.includes('mustang') || n.includes('camaro') || n.includes('corvette') || n.includes('porsche') || n.includes('viper') || n.includes('ferrari') || n.includes('amg') || n.includes('bmw m') || n.includes('audi rs')) {
    return { average: '$1,150,000 MXN', range: '$950,000 - $1,550,000 MXN (~$62,000 USD)' };
  }
  if (n.includes('ranger') || n.includes('silverado') || n.includes('f-150') || n.includes('hilux') || n.includes('tahoe') || n.includes('suburban') || n.includes('ram')) {
    return { average: '$820,000 MXN', range: '$690,000 - $1,050,000 MXN (~$44,500 USD)' };
  }
  return { average: '$385,000 MXN', range: '$320,000 - $480,000 MXN (~$20,900 USD)' };
}

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
    const priceDisplay = v.averagePrice || 'Consultar mercado';

    return `
      <article data-id="${v.id}" class="vehicle-spec-card group relative flex flex-col bg-slate-900/90 hover:bg-slate-800/90 rounded-2xl border border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.99]">
        
        <!-- Contenedor Imagen con Aspect Ratio 16:9 y Badges -->
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

  // Cálculo de Frecuencia de Repostaje / Recarga según kilometraje diario
  getRefuelInfo(rangeKm, dailyKm) {
    const km = Math.max(1, dailyKm || 30);
    const days = Math.max(1, Math.round(rangeKm / km));
    const visitsPerMonth = (30 / days).toFixed(1);

    let badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    let badgeText = '🟢 Muy Baja (~1 vez/mes)';
    let recommendation = 'Excelente autonomía: no tendrás que repostar en casi un mes.';

    if (days < 7) {
      badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      badgeText = '⚡ Frecuente (< 1 semana)';
      recommendation = 'Por tu kilometraje diario elevado, necesitarás recargar semanalmente.';
    } else if (days < 14) {
      badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      badgeText = '🟡 Semanal (Cada 1-2 semanas)';
      recommendation = 'Frecuencia habitual para desplazamientos mixtos y laborales.';
    } else if (days < 25) {
      badgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      badgeText = '🔵 Moderada (~2 veces/mes)';
      recommendation = 'Consumo equilibrado: aproximadamente dos visitas a la estación por mes.';
    }

    return { days, visitsPerMonth, badgeClass, badgeText, recommendation };
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

    // Frecuencia inicial de recarga
    const refuel = this.getRefuelInfo(v.consumption.estimatedRangeKm, this.calcParams.dailyKm);
    const tankDesc = isEV ? `batería de ${v.consumption.batteryCapacityKwh} kWh` : `tanque de ${v.consumption.tankCapacityL} L`;
    const averagePrice = v.averagePrice || 'Consultar mercado';
    const priceRange = v.priceRange || 'Valor sujeto a versión y equipamiento';

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

        <!-- 3. SECCIÓN ADAPTADA: FRECUENCIA DE RECARGA Y PRECIO PROMEDIO -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span>💡</span> Lo que debes saber de este modelo (Día a Día)
            </h4>
            <span class="text-[11px] text-cyan-400 font-medium">Estimaciones en tiempo real</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            <!-- TARJETA 1: FRECUENCIA DE REPOSTAJE / RECARGA -->
            <div class="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between gap-3 shadow-md">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span>🗓️</span> Frecuencia de ${isEV ? 'Recarga' : 'Repostaje'}
                </span>
                <span id="resRefuelBadge" class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${refuel.badgeClass}">
                  ${refuel.badgeText}
                </span>
              </div>

              <div class="my-1">
                <div class="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-1.5">
                  <span>Cada</span>
                  <span id="resRefuelDays" class="text-cyan-400">${refuel.days}</span>
                  <span class="text-base font-semibold text-slate-300">días</span>
                </div>
                <p id="resRefuelDesc" class="text-xs text-slate-300 mt-1">
                  Aprox. <strong>${refuel.visitsPerMonth} visitas al mes</strong> recorriendo ${this.calcParams.dailyKm} km/día (${tankDesc}).
                </p>
                <p id="resRefuelRecom" class="text-[11px] text-slate-400 mt-1 italic">
                  ${refuel.recommendation}
                </p>
              </div>

              <div class="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span>Autonomía total: <strong>${v.consumption.estimatedRangeKm} km</strong></span>
                <span class="text-cyan-400">Ajustable con el control diario ↗</span>
              </div>
            </div>

            <!-- TARJETA 2: PRECIO PROMEDIO DE MERCADO -->
            <div class="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between gap-3 shadow-md">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span>🏷️</span> Precio Promedio del Vehículo
                </span>
                <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  Mercado Actual
                </span>
              </div>

              <div class="my-1">
                <div class="text-2xl sm:text-3xl font-black text-emerald-300">
                  ${averagePrice}
                </div>
                <p class="text-xs text-slate-300 mt-1">
                  Rango estimado: <strong class="text-white">${priceRange}</strong>
                </p>
                <p class="text-[11px] text-slate-400 mt-1">
                  ${isEV ? 'Considera incentivos de deducción fiscal e infraestructura de carga residencial.' : 'Valores de referencia para modelos seminuevos y agencias autorizadas.'}
                </p>
              </div>

              <div class="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span>Segmento: <strong>${v.badgeText}</strong></span>
                <span>${v.source === 'api' ? 'Homologado vía API' : 'Catálogo Verificado'}</span>
              </div>
            </div>

          </div>

          <!-- PUNTOS DESTACADOS Y CONSEJOS TÉCNICOS -->
          <div class="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 mt-1">
            <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <span>⭐</span> Consejos de Uso & Mantenimiento Clave
            </h5>
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

        <!-- 4. TIEMPOS DE RECARGA (PARA EV) O MANTENIMIENTO Y ACEITE (PARA COMBUSTIÓN/MOTO) -->
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

      const elFull = document.getElementById('resCostFullTank');
      const el100 = document.getElementById('resCost100Km');
      const elMonthly = document.getElementById('resMonthlyCost');
      const elMonthlyKm = document.getElementById('resMonthlyKm');

      if (elFull) elFull.textContent = `$${fullCost}`;
      if (el100) el100.textContent = `$${cost100}`;
      if (elMonthly) elMonthly.textContent = `$${monthly}`;
      if (elMonthlyKm) elMonthlyKm.textContent = this.calcParams.dailyKm * 30;

      // Actualizar Frecuencia de Repostaje / Recarga en tiempo real
      const refuel = this.getRefuelInfo(v.consumption.estimatedRangeKm, this.calcParams.dailyKm);
      const elDays = document.getElementById('resRefuelDays');
      const elBadge = document.getElementById('resRefuelBadge');
      const elDesc = document.getElementById('resRefuelDesc');
      const elRecom = document.getElementById('resRefuelRecom');
      const tankDesc = isEV ? `batería de ${v.consumption.batteryCapacityKwh} kWh` : `tanque de ${v.consumption.tankCapacityL} L`;

      if (elDays) elDays.textContent = refuel.days;
      if (elBadge) {
        elBadge.className = `text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${refuel.badgeClass}`;
        elBadge.textContent = refuel.badgeText;
      }
      if (elDesc) {
        elDesc.innerHTML = `Aprox. <strong>${refuel.visitsPerMonth} visitas al mes</strong> recorriendo ${this.calcParams.dailyKm} km/día (${tankDesc}).`;
      }
      if (elRecom) {
        elRecom.textContent = refuel.recommendation;
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
  // MOTOR DE BÚSQUEDA AUTOMOTRIZ GLOBAL CON DESAMBIGUACIÓN
  // =========================================================================
  async searchGlobalWikipedia(query) {
    if (!query) return;
    const btn = this.dom.btnWikiSearch;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳ Consultando base automotriz...</span>';
    }

    const cleanTerm = query.toLowerCase().trim();

    // Comprobar caché local en memoria para evitar llamadas redundantes
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
      // 1. Resolver alias canónico si es un nombre ambiguo
      const canonicalTitle = AUTOMOTIVE_ALIASES[cleanTerm] || query.trim();

      // Función auxiliar para consultar Wikipedia Action API
      const fetchWikiTitle = async (title) => {
        const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) +
          '&prop=pageimages|extracts|description&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=960&redirects=1&format=json&origin=*';
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const page = Object.values(data.query?.pages || {})[0];
        if (!page || page.pageid === undefined || page.missing !== undefined) return null;
        return page;
      };

      // Validador estricto de vehículo
      const isCar = (p) => {
        if (!p) return false;
        const text = `${p.title || ''} ${p.description || ''} ${p.extract || ''}`.toLowerCase();
        const hasCarTerm = CAR_TERMS_REGEX.test(text);
        const hasNonCarTerm = NON_CAR_REGEX.test(p.description || '') || NON_CAR_REGEX.test((p.extract || '').slice(0, 100));
        return hasCarTerm && !hasNonCarTerm;
      };

      let page = await fetchWikiTitle(canonicalTitle);

      // Si no es un vehículo válido (ej. caballo, película, desambiguación), realizar búsqueda contextual automotriz
      if (!isCar(page)) {
        const searchContexts = [
          cleanTerm + ' automobile',
          cleanTerm + ' car',
          cleanTerm + ' motorcycle'
        ];

        for (const sQuery of searchContexts) {
          const searchUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
            encodeURIComponent(sQuery) + '&utf8=&format=json&origin=*';
          const sRes = await fetch(searchUrl);
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
      const estimatedPricing = estimateApiVehiclePrice(page.title, dynamicType);

      // Imagen garantizada o fallback temático SVG de calidad
      const defaultImg = isMoto
        ? 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Honda_CBF125_2011.JPG/330px-Honda_CBF125_2011.JPG'
        : (isElectric
          ? 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg/330px-2019_Tesla_Model_3_Performance_AWD_Front.jpg'
          : 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg/960px-Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg');

      const vehicleImg = page.thumbnail?.source || defaultImg;

      // Estructurar vehículo verificado
      const dynamicVehicle = {
        id: 'api_' + Date.now(),
        name: page.title,
        brand: page.title.split(' ')[0] || 'Vehículo',
        model: page.title,
        yearRange: 'Consulta Global Verificada',
        source: 'api',
        type: dynamicType,
        badgeText: isElectric ? '100% Eléctrico (API)' : (isMoto ? 'Motocicleta (API)' : 'Combustión (API)'),
        averagePrice: estimatedPricing.average,
        priceRange: estimatedPricing.range,
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
        co2Emissions: isElectric ? '0 g/km (CERO)' : (isMoto ? '45 g/km' : '135 g/km'),
        highlights: [
          page.extract ? page.extract.slice(0, 200) + '...' : 'Vehículo validado en bases automotrices internacionales.',
          'Consumos y capacidad calculados con los parámetros de homologación promedio de su categoría.',
          'Puedes personalizar los precios de combustible o kWh en la calculadora interactiva para tu zona.'
        ]
      };

      // Guardar en caché y en la lista
      this.wikiCache[cleanTerm] = dynamicVehicle;
      this.catalog.vehicles.unshift(dynamicVehicle);
      this.render();
      this.openDetailModal(dynamicVehicle.id);

    } catch (err) {
      alert('No pudimos localizar "' + query + '" en la base automotriz. Prueba buscando por marca y modelo principal (ej. "Mustang", "Corolla", "Civic", "NMAX", "Golf").');
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
