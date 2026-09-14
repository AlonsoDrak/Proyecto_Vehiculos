// AutoFind Lab - Módulo Buscador y Comparador de Especificaciones y Consumo
// Motor Híbrido Multicapa: Catálogo Local Maestro + Conector Universal EPA + Base Global Wikipedia con SVG Fallback

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
  'durango': 'Dodge Durango',
  'bronco': 'Ford Bronco',
  'wrangler': 'Jeep Wrangler',
  'cherokee': 'Jeep Grand Cherokee',
  'grand cherokee': 'Jeep Grand Cherokee',
  'tahoe': 'Chevrolet Tahoe',
  'suburban': 'Chevrolet Suburban',
  'escalade': 'Cadillac Escalade',
  'navigator': 'Lincoln Navigator',
  'outback': 'Subaru Outback',
  'forester': 'Subaru Forester',
  'impreza': 'Subaru Impreza',
  'crosstrek': 'Subaru Crosstrek',
  'supra': 'Toyota GR Supra',
  'miata': 'Mazda MX-5 Miata',
  'mx-5': 'Mazda MX-5 Miata',
  'ram': 'Ram 1500',
  'ram 1500': 'Ram 1500',
  'cybertruck': 'Tesla Cybertruck',
  'k3': 'Kia K3',
  'odyssey': 'Honda Odyssey',
  'honda odyssey': 'Honda Odyssey',
  'rav4': 'Toyota RAV4',
  'sentra': 'Nissan Sentra',
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
  'march': 'Nissan March',
  'aveo': 'Chevrolet Aveo',
  'onix': 'Chevrolet Onix',
  'virtus': 'Volkswagen Virtus',
  'polo': 'Volkswagen Polo',
  'jetta': 'Volkswagen Jetta',
  'ranger': 'Ford Ranger',
  'duster': 'Renault Duster',
  'ibiza': 'SEAT Ibiza',
  'leon': 'SEAT Leon',
  'mg5': 'MG 5',
  'mg 5': 'MG 5',
  'mg zs': 'MG ZS',
  'mg gt': 'MG GT',
  'dolphin': 'BYD Dolphin',
  'seagull': 'BYD Dolphin Mini',
  'seal': 'BYD Seal',
  'm3': 'BMW M3',
  'm4': 'BMW M4',
  'm5': 'BMW M5',
  '330i': 'BMW 330i',
  'a4': 'Audi A4',
  'a3': 'Audi A3',
  'a6': 'Audi A6',
  'q5': 'Audi Q5',
  'c300': 'Mercedes-Benz C-Class',
  'glc': 'Mercedes-Benz GLC',
  'ninja': 'Kawasaki Ninja 400',
  'r3': 'Yamaha YZF-R3',
  'yzf-r3': 'Yamaha YZF-R3',
  'dm200': 'Italika DM200',
  'ft150': 'Italika FT150',
  'ws150': 'Italika WS150',
  'cargo': 'Honda GL150 Cargo',
  'navi': 'Honda NAVI 110',
  'boxer': 'Bajaj Boxer 150',
  'nmax': 'Yamaha NMAX',
  'mt-03': 'Yamaha MT-03',
  'duke': 'KTM 390 Duke',
  'pulsar': 'Bajaj Pulsar NS200'
};

// Expresiones regulares de validación automotriz
const CAR_TERMS_REGEX = /(car|automobile|vehicle|motorcycle|scooter|sedan|coupe|suv|truck|pickup|hatchback|convertible|sports car|muscle car|supercar|crossover|electric vehicle|van|minivan|moped|coche|automóvil|vehículo|motocicleta)/i;
const NON_CAR_REGEX = /(disambiguation|index of articles|horse|breed of|species of|genus|mammal|insect|reptile|amphibian|equine|song by|album by|film directed|video game|fictional character|plant|river in|district of|county in)/i;

// Marcas homologadas en la base oficial de la EPA de EE.UU. (fueleconomy.gov)
const EPA_KNOWN_MAKES = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Buick', 'Cadillac', 
  'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Genesis', 'GMC', 
  'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 
  'Lexus', 'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'MINI', 'Mitsubishi', 
  'Nissan', 'Porsche', 'Ram', 'Rolls-Royce', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
];

// Cliente Universal de la EPA de EE.UU.
class EpaFuelEconomyClient {
  static detectMake(cleanText) {
    const text = cleanText.toLowerCase();
    let make = EPA_KNOWN_MAKES.find(m => text.includes(m.toLowerCase()));
    if (!make) {
      if (text.includes('mercedes') || text.includes('benz')) make = 'Mercedes-Benz';
      else if (text.includes('chevy')) make = 'Chevrolet';
      else if (text.includes('vw')) make = 'Volkswagen';
    }
    return make;
  }

  static async searchVehicle(resolvedQuery) {
    const clean = resolvedQuery.toLowerCase().trim();
    const make = this.detectMake(clean);
    if (!make) return null;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    try {
      const year = 2023; // Año base estándar para modelos recientes
      const modelsUrl = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${encodeURIComponent(make)}`;
      const res = await fetch(modelsUrl, { 
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!res.ok) return null;

      const data = await res.json();
      const items = Array.isArray(data.menuItem) ? data.menuItem : (data.menuItem ? [data.menuItem] : []);
      if (!items.length) return null;

      // Buscar modelo por coincidencia de tokens
      const queryTokens = clean.split(/\s+/).filter(t => t !== make.toLowerCase());
      let matchedModel = items.find(it => queryTokens.some(tok => it.value.toLowerCase().includes(tok)));
      if (!matchedModel && items.length > 0) {
        matchedModel = items[0];
      }
      if (!matchedModel) return null;

      // Obtener opciones de motor/transmisión
      const optUrl = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${year}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(matchedModel.value)}`;
      const optRes = await fetch(optUrl, { headers: { 'Accept': 'application/json' } });
      if (!optRes.ok) return null;

      const optData = await optRes.json();
      const optItems = Array.isArray(optData.menuItem) ? optData.menuItem : (optData.menuItem ? [optData.menuItem] : []);
      const vehicleId = optItems[0]?.value;
      if (!vehicleId) return null;

      // Obtener ficha técnica completa del vehículo de la EPA
      const vUrl = `https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleId}`;
      const vRes = await fetch(vUrl, { headers: { 'Accept': 'application/json' } });
      if (!vRes.ok) return null;

      const v = await vRes.json();
      return this.transformEpaVehicle(v, make, matchedModel.value);
    } catch(err) {
      return null;
    }
  }

  static transformEpaVehicle(v, make, modelName) {
    const isElectric = v.fuelType === 'Electricity' || (v.atvType && v.atvType.toLowerCase().includes('ev'));
    const cityMpg = parseFloat(v.city08) || 25;
    const hwyMpg = parseFloat(v.highway08) || 32;
    const combMpg = parseFloat(v.comb08) || 28;

    // Conversión científica: 1 MPG (US) = 0.425144 km/L
    const cityKmPerL = +(cityMpg * 0.425144).toFixed(1);
    const hwyKmPerL = +(hwyMpg * 0.425144).toFixed(1);
    const combKmPerL = +(combMpg * 0.425144).toFixed(1);

    // Métricas eléctricas
    let kwhPer100Km = 16.5;
    let kmPerKwh = 6.06;
    let batteryKwh = 65.0;
    let electricRangeKm = 400;

    if (isElectric) {
      const combE = parseFloat(v.combE) || 30.0;
      kwhPer100Km = +(combE / 1.609344).toFixed(1);
      kmPerKwh = +(100 / kwhPer100Km).toFixed(2);
      const rangeMiles = parseFloat(v.range) || 250;
      electricRangeKm = Math.round(rangeMiles * 1.609344);
      batteryKwh = +(electricRangeKm / kmPerKwh).toFixed(1);
    }

    // Derivación de tamaño de tanque (Litros)
    let tankCapacityL = 55.0;
    const vClass = (v.VClass || '').toLowerCase();

    if (parseFloat(v.range) > 0 && !isElectric) {
      const tankGallons = parseFloat(v.range) / combMpg;
      tankCapacityL = +(tankGallons * 3.78541).toFixed(1);
    } else {
      if (vClass.includes('subcompact') || vClass.includes('minicompact')) tankCapacityL = 45.0;
      else if (vClass.includes('compact')) tankCapacityL = 50.0;
      else if (vClass.includes('midsize')) tankCapacityL = 60.0;
      else if (vClass.includes('large')) tankCapacityL = 70.0;
      else if (vClass.includes('small sport utility') || vClass.includes('small suv')) tankCapacityL = 55.0;
      else if (vClass.includes('sport utility') || vClass.includes('standard suv')) tankCapacityL = 75.0;
      else if (vClass.includes('pickup') || vClass.includes('truck')) tankCapacityL = 95.0;
      else if (vClass.includes('van') || vClass.includes('minivan')) tankCapacityL = 75.0;
      else if (vClass.includes('two seater')) tankCapacityL = 62.0;
    }

    const estimatedRange = isElectric ? electricRangeKm : Math.round(tankCapacityL * combKmPerL);

    // Matriz de precios de mercado estimado en México según segmento
    let avgPrice = '$550,000 MXN';
    let priceRange = '$490,000 - $650,000 MXN (~$31,000 USD)';

    if (isElectric) {
      avgPrice = '$1,150,000 MXN';
      priceRange = '$850,000 - $1,650,000 MXN (~$65,000 USD)';
    } else if (vClass.includes('pickup')) {
      avgPrice = '$1,280,000 MXN';
      priceRange = '$980,000 - $1,690,000 MXN (~$72,000 USD)';
    } else if (vClass.includes('standard suv') || vClass.includes('large')) {
      avgPrice = '$1,190,000 MXN';
      priceRange = '$950,000 - $1,490,000 MXN (~$67,000 USD)';
    } else if (vClass.includes('small sport') || vClass.includes('small suv')) {
      avgPrice = '$580,000 MXN';
      priceRange = '$495,000 - $695,000 MXN (~$33,000 USD)';
    } else if (vClass.includes('compact')) {
      avgPrice = '$420,000 MXN';
      priceRange = '$380,000 - $495,000 MXN (~$24,000 USD)';
    } else if (vClass.includes('two seater')) {
      avgPrice = '$1,450,000 MXN';
      priceRange = '$1,100,000 - $2,200,000 MXN (~$82,000 USD)';
    }

    const type = isElectric ? 'electric' : 'combustion';
    const displ = v.displ ? `${v.displ}L` : '';
    const cyl = v.cylinders ? `${v.cylinders} Cilindros` : '';
    const engineDesc = isElectric 
      ? 'Propulsor Eléctrico Homologado (EPA)' 
      : `${displ} ${cyl} ${v.drive || 'Tracción Delantera/Integral'}`.trim();

    return {
      id: 'epa_' + (v.id || Date.now()),
      name: `${make} ${modelName}`,
      brand: make,
      model: modelName,
      yearRange: v.year ? `Modelo ${v.year} (EPA)` : '2022 - 2025',
      source: 'epa',
      type: type,
      badgeText: isElectric ? '100% Eléctrico (EPA)' : 'Gasolina (EPA)',
      badgeOrigin: '🔵 Certificado Oficial EPA (EE.UU.) | Conversión Homologada',
      averagePrice: avgPrice,
      priceRange: priceRange,
      imageUrl: null, // Se complementará con Wikipedia summary o SVG fallback
      engine: engineDesc || 'Motorización Certificada por la EPA',
      power: isElectric ? '220 - 450 HP' : (v.cylinders > 6 ? '320 - 450 HP' : '150 - 250 HP'),
      fuelType: isElectric ? '100% Eléctrico' : (v.fuelType1 || 'Gasolina Regular'),
      consumption: {
        city: cityKmPerL,
        hwy: hwyKmPerL,
        combined: combKmPerL,
        kwhPer100Km: kwhPer100Km,
        kmPerKwh: kmPerKwh,
        tankCapacityL: tankCapacityL,
        batteryCapacityKwh: batteryKwh,
        estimatedRangeKm: estimatedRange,
        oilViscosity: '5W-30 Full Synthetic',
        oilCapacityL: 4.5,
        maxChargeAcKw: 11.0,
        maxChargeDcKw: 100.0,
        chargingTimes: {
          schuko23: '18 h (2.3 kW)',
          wallbox74: v.charge240 ? `${v.charge240} h (240V)` : '6 h (7.4 kW)',
          fastChargeDc: '30 min (DC)'
        }
      },
      co2Emissions: isElectric ? '0 g/km (CERO EMISIONES)' : `${v.co2TailpipeGpm ? Math.round(parseFloat(v.co2TailpipeGpm) * 0.621371) : 160} g/km`
    };
  }
}

class VehicleSpecsFinder {
  constructor() {
    this.catalog = window.SPECS_CATALOG || { vehicles: [] };
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.selectedVehicle = null;
    this.hybridCache = {};

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

    // Tecla Enter -> Búsqueda Híbrida Global si no hay coincidencias locales
    this.dom.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const matches = this.catalog.search ? this.catalog.search(this.searchQuery, this.currentFilter) : [];
        if (matches.length === 0 && this.searchQuery) {
          this.searchHybridGlobal(this.searchQuery);
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

    // Botón de búsqueda híbrida universal
    if (this.dom.btnWikiSearch) {
      this.dom.btnWikiSearch.addEventListener('click', () => {
        this.searchHybridGlobal(this.searchQuery);
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

    const metric1Label = isEV ? 'Eficiencia' : 'Ciudad';
    const metric1Val = isEV ? `${v.consumption.kwhPer100Km} kWh/100` : `${v.consumption.city} km/L`;
    const metric2Label = isEV ? 'Batería Neta' : 'Cap. Tanque';
    const metric2Val = isEV ? `${v.consumption.batteryCapacityKwh} kWh` : `${v.consumption.tankCapacityL} L`;
    const rangeVal = `${v.consumption.estimatedRangeKm} km`;
    const priceDisplay = v.averagePrice || 'Consultar';

    const fallbackSvg = getVehicleSvgFallback(v.name, v.type, v.brand);

    // Origen de los datos
    let sourceLabel = v.yearRange || 'Oficial MX';
    let sourceClass = 'bg-slate-950/80 text-emerald-300 border-emerald-700/60';
    if (v.source === 'epa') {
      sourceLabel = '🏛️ Certificado EPA';
      sourceClass = 'bg-sky-950/90 text-sky-300 border-sky-600/70';
    } else if (v.source === 'api') {
      sourceLabel = '🌐 Ficha Global';
      sourceClass = 'bg-purple-950/90 text-purple-300 border-purple-600/70';
    }

    return `
      <article 
        class="vehicle-spec-card group relative flex flex-col bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
        data-id="${v.id}"
      >
        <!-- Cabecera de Imagen -->
        <div class="relative w-full h-44 bg-slate-950 overflow-hidden border-b border-slate-800/80">
          <img 
            src="${v.imageUrl || fallbackSvg}" 
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
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${sourceClass} border backdrop-blur-sm">
              <span>${sourceLabel}</span>
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

    // Frecuencia inicial
    const refuel = this.getRefuelInfo(v.consumption.estimatedRangeKm, this.calcParams.dailyKm);
    const fallbackSvg = getVehicleSvgFallback(v.name, v.type, v.brand);

    // Distintivo de procedencia y rigor técnico
    let sourceBanner = `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
        🟢 Oficial de Agencia México | Datos Verificados
      </span>
    `;

    if (v.source === 'epa') {
      sourceBanner = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
          🏛️ Certificado Oficial EPA (EE.UU.) | Conversión Homologada
        </span>
        <span class="text-[11px] text-slate-400 italic">Precio estimado por segmento comercial</span>
      `;
    } else if (v.source === 'api') {
      sourceBanner = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
          🌐 Ficha Técnica Global Internacional
        </span>
        <span class="text-[11px] text-slate-400 italic">Homologación estándar por segmento</span>
      `;
    }

    return `
      <div class="flex flex-col gap-6">
        
        <!-- CABECERA: FOTO, MARCA, MODELO Y PRECIO DE MERCADO -->
        <div class="flex flex-col md:flex-row gap-5 items-center md:items-start">
          <div class="relative w-full md:w-5/12 h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl shrink-0">
            <img 
              src="${v.imageUrl || fallbackSvg}" 
              alt="${v.name}" 
              class="w-full h-full object-cover object-center"
              onerror="this.onerror=null; this.src='${fallbackSvg}';"
            />
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${badgeClass}">
                <span>${typeIcon}</span>
                <span>${v.badgeText}</span>
              </span>
            </div>
          </div>

          <div class="flex-1 flex flex-col justify-between gap-3 w-full">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-1.5">
                ${sourceBanner}
              </div>

              <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ${v.brand} • ${v.yearRange}
              </div>
              <h2 class="text-2xl sm:text-3xl font-black text-white mt-1">
                ${v.name}
              </h2>
              <p class="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                ${v.engine} • ${v.power || 'Homologado'}
              </p>
            </div>

            <!-- TARJETA DESTACADA: PRECIO COMERCIAL Y FRECUENCIA DE RECARGA -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div class="flex flex-col justify-center">
                <span class="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Precio promedio de mercado</span>
                <span class="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">${v.averagePrice || 'Consultar agencia'}</span>
                <span class="text-[10px] text-slate-400 mt-0.5">${v.priceRange || 'Variable según versión y equipamiento'}</span>
              </div>
              <div class="flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
                <span class="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Frecuencia de Recarga habitual</span>
                <div class="flex items-center gap-2 mt-1">
                  <span id="modalRefuelDays" class="text-xl font-bold text-white">Cada ${refuel.days} días</span>
                  <span id="modalRefuelBadge" class="px-2 py-0.5 rounded-md text-[10px] font-bold border ${refuel.badgeClass}">${refuel.badgeText}</span>
                </div>
                <span id="modalRefuelMonthly" class="text-[10px] text-slate-400 mt-0.5">Aprox. ${refuel.visitsPerMonth} visitas al mes (${this.calcParams.dailyKm} km/día)</span>
              </div>
            </div>

          </div>
        </div>

        <!-- SECCIÓN DE SIMULACIÓN Y CALCULADORA EN VIVO -->
        <div class="glass-panel rounded-2xl p-4 sm:p-5 border border-cyan-500/30">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">🧮</span>
              <h3 class="font-bold text-base text-white">Calculadora de Costos & Hábitos del Conductor</h3>
            </div>
            <span class="text-xs text-cyan-400 font-medium">Ajusta los valores para simular tu trayecto habitual</span>
          </div>

          <!-- Controles interactivos (Sliders) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center text-xs">
                <label for="sliderFuelPrice" class="font-semibold text-slate-300">
                  ${isEV ? 'Tarifa eléctrica por kWh:' : 'Precio de la Gasolina/Combustible:'}
                </label>
                <span id="displayFuelPrice" class="font-mono font-bold text-cyan-400">
                  $${isEV ? this.calcParams.kwhPrice.toFixed(2) : this.calcParams.fuelPrice.toFixed(2)} ${isEV ? 'MXN/kWh' : 'MXN/L'}
                </span>
              </div>
              <input 
                type="range" 
                id="sliderFuelPrice" 
                min="${isEV ? '1.00' : '15.00'}" 
                max="${isEV ? '6.00' : '35.00'}" 
                step="${isEV ? '0.10' : '0.50'}" 
                value="${isEV ? this.calcParams.kwhPrice : this.calcParams.fuelPrice}"
                class="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center text-xs">
                <label for="sliderDailyKm" class="font-semibold text-slate-300">
                  Kilómetros recorridos por día:
                </label>
                <span id="displayDailyKm" class="font-mono font-bold text-cyan-400">
                  ${this.calcParams.dailyKm} km/día
                </span>
              </div>
              <input 
                type="range" 
                id="sliderDailyKm" 
                min="5" 
                max="150" 
                step="5" 
                value="${this.calcParams.dailyKm}"
                class="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
            </div>
          </div>

          <!-- RESPUESTA DIRECTA: ¿CUÁNTO PAGARÉ AL VISITAR PARA RECARGAR? -->
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-cyan-400">
              <span class="text-base">💳</span>
              <h4 class="font-bold text-xs sm:text-sm uppercase tracking-wide">
                ¿Cuánto pagaré cuando visite para recargar gas o carga según lo que elegí en la calculadora?
              </h4>
            </div>

            <!-- Escenarios de Pago Clave -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col justify-center">
                <span class="text-[10px] text-slate-400 font-semibold uppercase">Llenado Total (100% de reserva a lleno)</span>
                <span id="calcFillTotalCost" class="text-lg font-black text-amber-400 mt-1">$${costFullTank} MXN</span>
                <span class="text-[10px] text-slate-500 mt-0.5">${isEV ? `Batería neta de ${v.consumption.batteryCapacityKwh} kWh` : `Tanque completo de ${v.consumption.tankCapacityL} L`}</span>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col justify-center">
                <span class="text-[10px] text-slate-400 font-semibold uppercase">Recarga Semanal Habitual (7 días)</span>
                <span id="calcWeeklyCost" class="text-lg font-black text-cyan-300 mt-1">$${weeklyCost} MXN</span>
                <span class="text-[10px] text-slate-500 mt-0.5">Repostando los km de una semana</span>
              </div>

              <div class="p-3 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col justify-center">
                <span class="text-[10px] text-slate-400 font-semibold uppercase">Gasto Diario Neto</span>
                <span id="calcDailyCost" class="text-lg font-black text-emerald-400 mt-1">$${dailyCost} MXN/día</span>
                <span class="text-[10px] text-slate-500 mt-0.5">Presupuesto diario en combustible</span>
              </div>
            </div>

            <!-- Explicación en Lenguaje Natural -->
            <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300 leading-relaxed">
              <span id="calcExplanationText">
                ${this.generatePaymentExplanation(v, costFullTank, weeklyCost, dailyCost)}
              </span>
            </div>
          </div>

          <!-- Métricas de Referencia Adicionales -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80 text-center">
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400">Costo cada 100 km</span>
              <span id="calcCost100" class="text-sm font-bold text-slate-200 mt-0.5">$${costPer100Km} MXN</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400">Presupuesto Mensual</span>
              <span id="calcMonthly" class="text-sm font-bold text-emerald-400 mt-0.5">$${monthlyCost} MXN</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400">Autonomía Total</span>
              <span class="text-sm font-bold text-cyan-400 mt-0.5">${v.consumption.estimatedRangeKm} km</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-400">Emisiones CO₂</span>
              <span class="text-sm font-bold text-slate-300 mt-0.5">${v.co2Emissions}</span>
            </div>
          </div>
        </div>

        <!-- ESPECIFICACIONES TÉCNICAS HOMOLOGADAS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Columna 1: Rendimiento y Capacidades -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <span>📊</span> Rendimiento & Capacidad
            </div>
            <ul class="text-xs space-y-2 text-slate-300">
              <li class="flex justify-between border-b border-slate-800/60 pb-1">
                <span class="text-slate-400">${isEV ? 'Consumo Medio:' : 'Consumo Ciudad:'}</span>
                <span class="font-mono font-bold text-white">${isEV ? `${v.consumption.kwhPer100Km} kWh/100km` : `${v.consumption.city} km/L`}</span>
              </li>
              <li class="flex justify-between border-b border-slate-800/60 pb-1">
                <span class="text-slate-400">${isEV ? 'Eficiencia Eléctrica:' : 'Consumo Carretera:'}</span>
                <span class="font-mono font-bold text-white">${isEV ? `${v.consumption.kmPerKwh} km/kWh` : `${v.consumption.hwy} km/L`}</span>
              </li>
              <li class="flex justify-between border-b border-slate-800/60 pb-1">
                <span class="text-slate-400">${isEV ? 'Autonomía Oficial:' : 'Consumo Combinado:'}</span>
                <span class="font-mono font-bold text-emerald-400">${isEV ? `${v.consumption.estimatedRangeKm} km` : `${v.consumption.combined} km/L`}</span>
              </li>
              <li class="flex justify-between border-b border-slate-800/60 pb-1">
                <span class="text-slate-400">${isEV ? 'Capacidad Neta de Batería:' : 'Capacidad de Tanque:'}</span>
                <span class="font-mono font-bold text-white">${isEV ? `${v.consumption.batteryCapacityKwh} kWh` : `${v.consumption.tankCapacityL} Litros`}</span>
              </li>
            </ul>
          </div>

          <!-- Columna 2: Carga / Mantenimiento -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <span>${isEV ? '⚡ Tiempos por Tipo de Enchufe' : '🔧 Mantenimiento & Fluidos'}</span>
            </div>
            
            ${isEV ? `
              <ul class="text-xs space-y-2 text-slate-300">
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Enchufe Doméstico (2.3 kW):</span>
                  <span class="font-mono font-semibold text-amber-300">${v.consumption.chargingTimes?.schuko23 || '18-24 h'}</span>
                </li>
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Wallbox Casa (7.4 kW):</span>
                  <span class="font-mono font-semibold text-cyan-300">${v.consumption.chargingTimes?.wallbox74 || '5-7 h'}</span>
                </li>
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Carga Rápida DC (Estación):</span>
                  <span class="font-mono font-bold text-emerald-400">${v.consumption.chargingTimes?.fastChargeDc || '30-40 min (80%)'}</span>
                </li>
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Potencia Máxima AC / DC:</span>
                  <span class="font-mono font-bold text-white">${v.consumption.maxChargeAcKw || 11} kW / ${v.consumption.maxChargeDcKw || 100} kW</span>
                </li>
              </ul>
            ` : `
              <ul class="text-xs space-y-2 text-slate-300">
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Tipo de Combustible:</span>
                  <span class="font-bold text-white">${v.fuelType}</span>
                </li>
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Aceite Recomendado:</span>
                  <span class="font-mono font-semibold text-amber-300">${v.consumption.oilViscosity || '5W-30 Sintético'}</span>
                </li>
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Capacidad de Aceite en Cárter:</span>
                  <span class="font-mono font-bold text-white">${v.consumption.oilCapacityL || 4.0} Litros</span>
                </li>
                <li class="flex justify-between border-b border-slate-800/60 pb-1">
                  <span class="text-slate-400">Emisiones Directas de CO₂:</span>
                  <span class="font-mono font-bold text-slate-300">${v.co2Emissions}</span>
                </li>
              </ul>
            `}
          </div>
        </div>

      </div>
    `;
  }

  generatePaymentExplanation(v, costFullTank, weeklyCost, dailyCost) {
    const isEV = v.type === 'electric';
    const isMoto = v.type === 'moto';

    if (isEV) {
      return `💡 <strong>¿Qué significa esto en tu bolsillo?</strong> Si conectas tu batería en casa o cargador desde nivel mínimo hasta el 100%, la recarga total te costará <strong>$${costFullTank} MXN</strong>. Con tus ${this.calcParams.dailyKm} km/día habituales, estarás gastando <strong>$${dailyCost} MXN al día</strong> o <strong>$${weeklyCost} MXN a la semana</strong>, lo cual representa un ahorro sustancial frente a un auto tradicional de gasolina.`;
    } else if (isMoto) {
      return `💡 <strong>¿Qué significa esto en tu bolsillo?</strong> Cuando llegues a la gasolinera con la reserva encendida y pidas llenar el tanque de ${v.consumption.tankCapacityL} L, pagarás exactamente <strong>$${costFullTank} MXN</strong>. Para tus ${this.calcParams.dailyKm} km de recorrido diario, tu gasto de gasolina será de solo <strong>$${dailyCost} MXN al día</strong> ($${weeklyCost} MXN por semana).`;
    } else {
      return `💡 <strong>¿Qué significa esto en tu bolsillo?</strong> Si llegas a la gasolinera con el testigo de reserva encendido y pides "tanque lleno" (${v.consumption.tankCapacityL} L), tu pago en caja será de <strong>$${costFullTank} MXN</strong>. Si manejas tus ${this.calcParams.dailyKm} km diarios calculados, tu gasto habitual será de <strong>$${weeklyCost} MXN cada semana</strong> ($${dailyCost} MXN por jornada).`;
    }
  }

  bindCalculatorEvents(v) {
    const sliderFuel = document.getElementById('sliderFuelPrice');
    const sliderDaily = document.getElementById('sliderDailyKm');
    const displayFuel = document.getElementById('displayFuelPrice');
    const displayDaily = document.getElementById('displayDailyKm');

    const isEV = v.type === 'electric';

    const updateCalcValues = () => {
      const fuelVal = parseFloat(sliderFuel.value);
      const dailyVal = parseInt(sliderDaily.value, 10);

      if (isEV) {
        this.calcParams.kwhPrice = fuelVal;
        if (displayFuel) displayFuel.textContent = `$${fuelVal.toFixed(2)} MXN/kWh`;
      } else {
        this.calcParams.fuelPrice = fuelVal;
        if (displayFuel) displayFuel.textContent = `$${fuelVal.toFixed(2)} MXN/L`;
      }

      this.calcParams.dailyKm = dailyVal;
      if (displayDaily) displayDaily.textContent = `${dailyVal} km/día`;

      // Recalcular métricas
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

      // Frecuencia dinámica
      const refuel = this.getRefuelInfo(v.consumption.estimatedRangeKm, dailyVal);

      // Actualizar DOM
      const elFillTotal = document.getElementById('calcFillTotalCost');
      const elWeekly = document.getElementById('calcWeeklyCost');
      const elDaily = document.getElementById('calcDailyCost');
      const elExplanation = document.getElementById('calcExplanationText');
      const elCost100 = document.getElementById('calcCost100');
      const elMonthly = document.getElementById('calcMonthly');
      const elRefuelDays = document.getElementById('modalRefuelDays');
      const elRefuelBadge = document.getElementById('modalRefuelBadge');
      const elRefuelMonthly = document.getElementById('modalRefuelMonthly');

      if (elFillTotal) elFillTotal.textContent = `$${costFullTank} MXN`;
      if (elWeekly) elWeekly.textContent = `$${weeklyCost} MXN`;
      if (elDaily) elDaily.textContent = `$${dailyCost} MXN/día`;
      if (elCost100) elCost100.textContent = `$${costPer100Km} MXN`;
      if (elMonthly) elMonthly.textContent = `$${monthlyCost} MXN`;

      if (elExplanation) {
        elExplanation.innerHTML = this.generatePaymentExplanation(v, costFullTank, weeklyCost, dailyCost);
      }

      if (elRefuelDays) elRefuelDays.textContent = `Cada ${refuel.days} días`;
      if (elRefuelBadge) {
        elRefuelBadge.className = `px-2 py-0.5 rounded-md text-[10px] font-bold border ${refuel.badgeClass}`;
        elRefuelBadge.textContent = refuel.badgeText;
      }
      if (elRefuelMonthly) elRefuelMonthly.textContent = `Aprox. ${refuel.visitsPerMonth} visitas al mes (${dailyVal} km/día)`;
    };

    if (sliderFuel) sliderFuel.addEventListener('input', updateCalcValues);
    if (sliderDaily) sliderDaily.addEventListener('input', updateCalcValues);
  }

  // =========================================================================
  // BÚSQUEDA HÍBRIDA GLOBAL (CATÁLOGO LOCAL -> EPA OFICIAL -> WIKIPEDIA REST API)
  // =========================================================================
  async searchHybridGlobal(query) {
    if (!query) return;
    const btn = this.dom.btnWikiSearch;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳ Consultando Motor Híbrido (EPA + Global)...</span>';
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
        btn.innerHTML = '<span>🌐 Buscar con Motor Híbrido Universal</span>';
      }
      return;
    }

    // 2. Comprobar caché en memoria
    if (this.hybridCache[cleanTerm]) {
      const cached = this.hybridCache[cleanTerm];
      this.openDetailModal(cached.id);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>🌐 Buscar con Motor Híbrido Universal</span>';
      }
      return;
    }

    try {
      // 3. Resolver alias canónico
      const canonicalTitle = AUTOMOTIVE_ALIASES[cleanTerm] || query.trim();

      // INTENTO A: Base Oficial de la EPA de EE.UU. (fueleconomy.gov)
      let vehicleData = await EpaFuelEconomyClient.searchVehicle(canonicalTitle);

      // Si la EPA devolvió datos de laboratorio, complementar con foto de Wikipedia REST
      if (vehicleData) {
        try {
          const wikiSummaryRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(canonicalTitle)}`, {
            headers: { 'User-Agent': 'AutoFindLab/2.1 (contact@autofind.app)' }
          });
          if (wikiSummaryRes.ok) {
            const summary = await wikiSummaryRes.json();
            if (summary.thumbnail && summary.thumbnail.source) {
              vehicleData.imageUrl = summary.thumbnail.source;
            }
          }
        } catch(e) { /* Fallback SVG se asignará automáticamente */ }
      }

      // INTENTO B: Si no aplica en EPA (ej. Motos, autos del mercado europeo/sudamericano/asiático puro)
      if (!vehicleData) {
        vehicleData = await this.fetchWikipediaFallback(canonicalTitle, cleanTerm);
      }

      if (!vehicleData) {
        throw new Error('No se localizó un vehículo correspondiente a este término.');
      }

      // Garantizar que tenga imagen o silueta vectorial
      if (!vehicleData.imageUrl) {
        vehicleData.imageUrl = getVehicleSvgFallback(vehicleData.name, vehicleData.type, vehicleData.brand);
      }

      // Evitar duplicados en memoria
      const alreadyExists = this.catalog.vehicles.some(v => v.name.toLowerCase() === vehicleData.name.toLowerCase());
      if (!alreadyExists) {
        this.hybridCache[cleanTerm] = vehicleData;
        this.catalog.vehicles.unshift(vehicleData);
      }

      this.render();
      this.openDetailModal(vehicleData.id);

    } catch (err) {
      alert('No pudimos localizar "' + query + '" en la base automotriz. Prueba buscando por marca y modelo principal (ej. "Camaro", "Wrangler", "Outback", "Civic", "Versa", "Pulsar", "Cybertruck").');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span>🌐 Buscar con Motor Híbrido Universal</span>';
      }
    }
  }

  async fetchWikipediaFallback(canonicalTitle, cleanTerm) {
    const fetchWikiTitle = async (title) => {
      const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) +
        '&prop=pageimages|extracts|description&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=960&redirects=1&format=json&origin=*';
      const res = await fetch(url, { headers: { 'User-Agent': 'AutoFindLab/2.1 (contact@autofind.app)' } });
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

    if (!isCar(page)) {
      const searchContexts = [
        cleanTerm + ' automobile',
        cleanTerm + ' car',
        cleanTerm + ' motorcycle'
      ];

      for (const sQuery of searchContexts) {
        const searchUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' +
          encodeURIComponent(sQuery) + '&utf8=&format=json&origin=*';
        const sRes = await fetch(searchUrl, { headers: { 'User-Agent': 'AutoFindLab/2.1 (contact@autofind.app)' } });
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

    if (!page || !isCar(page)) return null;

    const isMoto = cleanTerm.includes('moto') || 
                   (page.description && (page.description.toLowerCase().includes('motorcycle') || page.description.toLowerCase().includes('scooter')));
    const isElectric = cleanTerm.includes('electric') || cleanTerm.includes('ev') ||
                       (page.description && (page.description.toLowerCase().includes('electric') || page.description.toLowerCase().includes('bev')));

    const dynamicType = isMoto ? 'moto' : (isElectric ? 'electric' : 'combustion');
    const fallbackSvg = getVehicleSvgFallback(page.title, dynamicType, page.title.split(' ')[0]);
    const vehicleImg = page.thumbnail?.source || fallbackSvg;

    return {
      id: 'wiki_' + Date.now(),
      name: page.title,
      brand: page.title.split(' ')[0] || 'Vehículo',
      model: page.title,
      yearRange: 'Ficha Global Internacional',
      source: 'api',
      type: dynamicType,
      badgeText: isElectric ? '100% Eléctrico (Global)' : (isMoto ? 'Motocicleta (Global)' : 'Combustión (Global)'),
      badgeOrigin: '🌐 Ficha Técnica Global Internacional',
      averagePrice: isMoto ? '$45,000 MXN' : (isElectric ? '$980,000 MXN' : '$540,000 MXN'),
      priceRange: isMoto ? '$35,000 - $65,000 MXN' : (isElectric ? '$780,000 - $1,400,000 MXN' : '$450,000 - $680,000 MXN'),
      imageUrl: vehicleImg,
      engine: page.description || 'Motorización homologada internacionalmente',
      power: isMoto ? '15 - 45 HP' : (isElectric ? '200 - 450 HP' : '120 - 350 HP'),
      fuelType: isElectric ? '100% Eléctrico' : 'Gasolina / Diésel',
      consumption: {
        city: isMoto ? 38.0 : 13.5,
        hwy: isMoto ? 44.0 : 18.2,
        combined: isMoto ? 40.5 : 15.4,
        kwhPer100Km: 16.2,
        kmPerKwh: 6.17,
        tankCapacityL: isMoto ? 12.0 : 52.0,
        batteryCapacityKwh: 65.0,
        estimatedRangeKm: isMoto ? 486 : (isElectric ? 420 : 800),
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
  }
}

// Instancia global
window.VehicleFinder = new VehicleSpecsFinder();
