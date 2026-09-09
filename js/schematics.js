// Módulo de Renderizado de Esquemas Vectoriales Técnicos SVG Interactivos
// Proporciona gráficos enriquecidos para Coche de Combustión, Coche Eléctrico y Moto Diaria.

const Schematics = {
  // Renderizado dinámico del esquema según el tipo de vehículo
  render(containerId, vehicleKey, components, onSelectCallback, activeComponentId = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let svgHtml = '';
    if (vehicleKey === 'combustion') {
      svgHtml = this.getCombustionSvg(components, activeComponentId);
    } else if (vehicleKey === 'electric') {
      svgHtml = this.getElectricSvg(components, activeComponentId);
    } else if (vehicleKey === 'moto') {
      svgHtml = this.getMotoSvg(components, activeComponentId);
    }

    container.innerHTML = svgHtml;
    this.attachEventListeners(container, onSelectCallback);
  },

  // Generador de puntos calientes interactivos (Hotspots) con target táctil amplio
  generateHotspots(components, activeComponentId) {
    return components.map(comp => {
      const isActive = comp.id === activeComponentId;
      const activeClass = isActive ? 'is-active' : '';

      return `
        <g class="hotspot-group cursor-pointer ${activeClass}" 
           data-id="${comp.id}" 
           tabindex="0" 
           role="button" 
           aria-label="Abrir detalles de ${comp.name}"
           transform="translate(${comp.coords.x}, ${comp.coords.y})">
          
          <!-- Área de contacto táctil invisible optimizada para móviles (mínimo 64x64px) -->
          <circle r="32" class="fill-transparent" />

          <!-- Onda pulsante exterior -->
          <circle r="18" class="hotspot-ripple opacity-75" />

          <!-- Círculo base brillante con sombra -->
          <circle r="14" class="hotspot-core transition-transform duration-300" />

          <!-- Número identificador del componente -->
          <text y="4" text-anchor="middle" class="hotspot-label font-bold text-xs pointer-events-none select-none">
            ${comp.badgeNum}
          </text>

          <!-- Tooltip flotante emergente al hacer hover (Desktop) -->
          <g class="hotspot-tooltip opacity-0 pointer-events-none transition-all duration-200">
            <rect x="-80" y="-45" width="160" height="28" rx="6" class="tooltip-bg" />
            <polygon points="-6,-17 6,-17 0,-11" class="tooltip-arrow" />
            <text x="0" y="-27" text-anchor="middle" class="tooltip-text font-medium text-[11px] fill-slate-200">
              ${comp.name}
            </text>
          </g>
        </g>
      `;
    }).join('');
  },

  // Asignación de eventos de clic, touch y teclado
  attachEventListeners(container, onSelectCallback) {
    const hotspots = container.querySelectorAll('.hotspot-group');
    hotspots.forEach(hotspot => {
      const componentId = hotspot.getAttribute('data-id');

      const triggerSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Feedback visual inmediato
        hotspots.forEach(h => h.classList.remove('is-active'));
        hotspot.classList.add('is-active');

        if (typeof onSelectCallback === 'function') {
          onSelectCallback(componentId);
        }
      };

      hotspot.addEventListener('click', triggerSelect);
      hotspot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          triggerSelect(e);
        }
      });
    });
  },

  // 1. ESQUEMA COCHE DE COMBUSTIÓN / GAS
  getCombustionSvg(components, activeId) {
    const hotspotsHtml = this.generateHotspots(components, activeId);

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" class="w-full h-auto schematics-svg select-none">
        <defs>
          <linearGradient id="combCarBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#334155" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#1e293b" stop-opacity="0.9" />
          </linearGradient>
          <linearGradient id="combGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0.1" />
          </linearGradient>
          <linearGradient id="combExhaustGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f97316" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#cbd5e1" stop-opacity="0.7" />
            <stop offset="100%" stop-color="#64748b" stop-opacity="0.8" />
          </linearGradient>
          <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.7" stroke-dasharray="2 4" />
          </pattern>
        </defs>

        <!-- Cuadrícula técnica de fondo -->
        <rect width="1000" height="550" fill="url(#blueprintGrid)" />

        <!-- Suelo y sombras de rodadura -->
        <ellipse cx="500" cy="465" rx="420" ry="18" fill="#020617" opacity="0.8" />
        <ellipse cx="285" cy="445" rx="65" ry="10" fill="#000000" opacity="0.6" />
        <ellipse cx="715" cy="445" rx="65" ry="10" fill="#000000" opacity="0.6" />

        <!-- EJE DE CHÁSIS Y CARROCERÍA SILUETA -->
        <!-- Carrocería exterior (Corte de ingeniería sedán/coupé) -->
        <path d="M 120 370 
                 L 140 330 
                 C 155 280, 200 270, 270 270 
                 L 380 270 
                 C 430 220, 500 160, 580 160 
                 L 700 160 
                 C 780 160, 830 240, 870 290 
                 L 890 340 
                 L 880 380 
                 L 780 380 
                 C 780 330, 650 330, 650 380 
                 L 350 380 
                 C 350 330, 220 330, 220 380 
                 Z" 
              fill="url(#combCarBody)" 
              stroke="#475569" 
              stroke-width="2.5" 
              class="transition-colors duration-500" />

        <!-- Cristales / Habitáculo -->
        <path d="M 410 260 
                 C 450 215, 510 175, 575 175 
                 L 690 175 
                 C 750 175, 785 225, 815 260 
                 Z" 
              fill="url(#combGlass)" 
              stroke="#38bdf8" 
              stroke-width="1.5" />
        <!-- Pilar B -->
        <line x1="585" y1="175" x2="585" y2="260" stroke="#334155" stroke-width="6" />

        <!-- COMPONENTES MECÁNICOS EN CORTE TÉCNICO -->

        <!-- 1. Tubo de Escape y Silenciador (desde motor hasta cola trasera) -->
        <path d="M 340 320 L 450 360 L 600 360 L 720 340 L 780 340 L 880 370" 
              fill="none" 
              stroke="url(#combExhaustGrad)" 
              stroke-width="7" 
              stroke-linecap="round" />
        <!-- Catalizador / Silenciador -->
        <rect x="520" y="348" width="70" height="24" rx="8" fill="#475569" stroke="#f97316" stroke-width="1.5" />
        <rect x="740" y="328" width="80" height="26" rx="8" fill="#334155" stroke="#f97316" stroke-width="1.5" />
        <!-- Gases de escape sutiles -->
        <circle cx="895" cy="372" r="6" fill="#f97316" opacity="0.3" class="animate-ping" />

        <!-- 2. Depósito de Combustible / Gas posterior -->
        <rect x="585" y="270" width="85" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2" />
        <text x="627" y="300" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="bold">GAS / PETROL</text>

        <!-- 3. Radiador Frontal y Ventilador -->
        <rect x="175" y="255" width="28" height="65" rx="4" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2" />
        <!-- Aletas de refrigeración -->
        <line x1="182" y1="260" x2="182" y2="315" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />
        <line x1="189" y1="260" x2="189" y2="315" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />
        <line x1="196" y1="260" x2="196" y2="315" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />
        <!-- Manguitos de agua hacia motor -->
        <path d="M 203 268 C 240 268, 260 280, 285 280" fill="none" stroke="#0284c7" stroke-width="4" />
        <path d="M 203 310 C 240 310, 260 300, 285 300" fill="none" stroke="#0284c7" stroke-width="4" />

        <!-- 4. Bloque Motor Térmico (4 cilindros en línea) -->
        <rect x="280" y="250" width="75" height="75" rx="6" fill="#1e293b" stroke="#e2e8f0" stroke-width="2.5" />
        <!-- Cilindros y pistones estilizados -->
        <rect x="290" y="260" width="14" height="35" fill="#0f172a" stroke="#94a3b8" stroke-width="1" />
        <rect x="310" y="260" width="14" height="35" fill="#0f172a" stroke="#94a3b8" stroke-width="1" />
        <rect x="330" y="260" width="14" height="35" fill="#0f172a" stroke="#94a3b8" stroke-width="1" />
        <!-- Culata y tapa de balancines -->
        <path d="M 276 250 L 358 250 L 354 240 L 280 240 Z" fill="#475569" stroke="#cbd5e1" stroke-width="1.5" />

        <!-- 5. Batería de 12V en vano motor -->
        <rect x="245" y="205" width="34" height="30" rx="3" fill="#0f172a" stroke="#eab308" stroke-width="2" />
        <rect x="250" y="199" width="6" height="6" fill="#ef4444" />
        <rect x="267" y="199" width="6" height="6" fill="#38bdf8" />
        <text x="262" y="224" text-anchor="middle" fill="#eab308" font-size="10" font-weight="bold">12V</text>

        <!-- 6. Alternador eléctrico con polea -->
        <circle cx="330" cy="235" r="14" fill="#334155" stroke="#38bdf8" stroke-width="2" />
        <circle cx="330" cy="235" r="5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
        <!-- Correa de accesorios -->
        <path d="M 330 221 C 360 230, 360 270, 335 285" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="3 1" />

        <!-- 7. Caja de Cambios y Transmisión -->
        <path d="M 355 265 L 435 280 L 435 320 L 355 325 Z" fill="#334155" stroke="#94a3b8" stroke-width="2" />
        <!-- Palanca / Mecanismo -->
        <line x1="435" y1="300" x2="520" y2="300" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />

        <!-- 8. Sistema de Dirección (Cremallera frontal) -->
        <line x1="260" y1="345" x2="330" y2="345" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
        <circle cx="295" cy="345" r="6" fill="#0284c7" />

        <!-- 9. RUEDAS, FRENOS Y SUSPENSIÓN -->
        <!-- Rueda Delantera -->
        <g transform="translate(285, 395)">
          <!-- Neumático -->
          <circle r="52" fill="#090d16" stroke="#334155" stroke-width="6" />
          <circle r="36" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <!-- Disco de Freno perforado -->
          <circle r="25" fill="#475569" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 3" />
          <!-- Pinza de freno (Caliper roja) -->
          <path d="M -8 -26 C 6 -28, 20 -20, 24 -10 L 16 -5 C 13 -13, 3 -18, -7 -18 Z" fill="#ef4444" stroke="#f87171" stroke-width="1" />
          <!-- Muelle de suspensión y amortiguador -->
          <path d="M -10 -55 Q -18 -45 -10 -35 Q -2 -25 -10 -15" fill="none" stroke="#e2e8f0" stroke-width="3.5" />
          <line x1="-10" y1="-75" x2="-10" y2="-55" stroke="#38bdf8" stroke-width="4" />
        </g>

        <!-- Rueda Trasera -->
        <g transform="translate(715, 395)">
          <!-- Neumático -->
          <circle r="52" fill="#090d16" stroke="#334155" stroke-width="6" />
          <circle r="36" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <!-- Disco de freno trasero -->
          <circle r="22" fill="#475569" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 3" />
          <path d="M -6 -23 C 6 -25, 18 -18, 22 -8 L 14 -4 C 11 -11, 2 -16, -6 -16 Z" fill="#ef4444" />
          <!-- Suspensión trasera -->
          <path d="M -10 -55 Q -18 -45 -10 -35 Q -2 -25 -10 -15" fill="none" stroke="#e2e8f0" stroke-width="3.5" />
        </g>

        <!-- PUNTOS CALIENTES / HOTSPOTS INTERACTIVOS -->
        ${hotspotsHtml}
      </svg>
    `;
  },

  // 2. ESQUEMA COCHE ELÉCTRICO (EV)
  getElectricSvg(components, activeId) {
    const hotspotsHtml = this.generateHotspots(components, activeId);

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" class="w-full h-auto schematics-svg select-none">
        <defs>
          <linearGradient id="evBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f172a" stop-opacity="0.95" />
            <stop offset="50%" stop-color="#1e293b" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95" />
          </linearGradient>
          <linearGradient id="evBatteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="50%" stop-color="#06b6d4" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
          <linearGradient id="evGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#0891b2" stop-opacity="0.1" />
          </linearGradient>
          <filter id="cyanNeon" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Cuadrícula blueprint técnica -->
        <rect width="1000" height="550" fill="url(#blueprintGrid)" />

        <!-- Sombras de apoyo -->
        <ellipse cx="500" cy="465" rx="430" ry="18" fill="#020617" opacity="0.8" />
        <ellipse cx="270" cy="445" rx="65" ry="10" fill="#000000" opacity="0.6" />
        <ellipse cx="730" cy="445" rx="65" ry="10" fill="#000000" opacity="0.6" />

        <!-- SILUETA AERODINÁMICA EV (Corte transversal transparente) -->
        <path d="M 110 365 
                 C 130 310, 180 260, 260 255 
                 L 380 255 
                 C 435 200, 510 150, 600 150 
                 L 720 150 
                 C 810 150, 860 230, 895 285 
                 L 905 345 
                 L 890 380 
                 L 790 380 
                 C 790 330, 660 330, 660 380 
                 L 340 380 
                 C 340 330, 210 330, 210 380 
                 Z" 
              fill="url(#evBodyGrad)" 
              stroke="#0ea5e9" 
              stroke-width="2" 
              stroke-dasharray="600 2" />

        <!-- Cúpula de cristal aerodinámica -->
        <path d="M 400 250 
                 C 450 205, 520 165, 595 165 
                 L 710 165 
                 C 775 165, 810 215, 840 250 
                 Z" 
              fill="url(#evGlassGrad)" 
              stroke="#38bdf8" 
              stroke-width="1.5" />

        <!-- PLATAFORMA SKATEBOARD DE BATERÍAS (Suelo estructural) -->
        <!-- Carcasa blindada inferior -->
        <rect x="360" y="325" width="280" height="38" rx="6" fill="#090d16" stroke="#0284c7" stroke-width="2" />
        <!-- Módulos de celdas de alta tensión (Litio / LFP) -->
        <g transform="translate(368, 330)">
          ${Array.from({ length: 12 }).map((_, i) => `
            <rect x="${i * 22}" y="2" width="18" height="24" rx="3" fill="#082f49" stroke="#38bdf8" stroke-width="1.2" />
            <line x1="${i * 22 + 9}" y1="5" x2="${i * 22 + 9}" y2="23" stroke="#0284c7" stroke-width="1" />
          `).join('')}
        </g>
        <!-- Bucle de refrigeración líquida de la batería -->
        <path d="M 370 358 L 635 358" stroke="#06b6d4" stroke-width="3" stroke-dasharray="8 4" class="animate-pulse" />

        <!-- CABLES NARANJAS DE ALTA TENSIÓN (Conectando Batería - Inversor - Motor - Cargador) -->
        <!-- Línea alta tensión hacia inversor -->
        <path d="M 390 325 L 390 270 L 355 270" fill="none" stroke="#f97316" stroke-width="6" stroke-linecap="round" />
        <path d="M 400 325 L 400 280 L 355 280" fill="none" stroke="#ea580c" stroke-width="3" stroke-linecap="round" />
        <!-- Línea alta tensión hacia conector de carga trasero -->
        <path d="M 620 335 L 720 335 L 740 330" fill="none" stroke="#f97316" stroke-width="5" stroke-linecap="round" />

        <!-- INVERSOR Y ELECTRÓNICA DE POTENCIA -->
        <rect x="315" y="225" width="55" height="42" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
        <text x="342" y="248" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="bold">INVERTER</text>
        <path d="M 325 255 L 360 255" stroke="#f97316" stroke-width="2" stroke-dasharray="2 2" />

        <!-- MOTOR ELÉCTRICO DE TRACCIÓN (Frontal y/o Trasero) -->
        <g transform="translate(290, 275)">
          <!-- Carcasa del estator cilíndrico -->
          <circle cx="20" cy="20" r="28" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5" />
          <!-- Bobinados de cobre -->
          <circle cx="20" cy="20" r="20" fill="none" stroke="#d97706" stroke-width="3.5" stroke-dasharray="4 3" />
          <!-- Rotor con imanes de neodimio -->
          <circle cx="20" cy="20" r="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
          <circle cx="20" cy="20" r="4" fill="#38bdf8" />
        </g>

        <!-- CAJA REDUCTORA DIRECTA (1-Speed) -->
        <rect x="335" y="285" width="30" height="30" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="1.8" />
        <circle cx="350" cy="300" r="8" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="2 2" />

        <!-- RADIADOR Y CHILLER TÉRMICO FRONTAL -->
        <rect x="180" y="270" width="22" height="60" rx="4" fill="#082f49" stroke="#06b6d4" stroke-width="2" />
        <path d="M 202 285 C 240 285, 250 310, 360 335" fill="none" stroke="#06b6d4" stroke-width="3" stroke-dasharray="6 3" />

        <!-- BATERÍA AUXILIAR 12V Y DC-DC -->
        <rect x="245" y="205" width="32" height="28" rx="3" fill="#1e293b" stroke="#eab308" stroke-width="1.8" />
        <text x="261" y="222" text-anchor="middle" fill="#eab308" font-size="9" font-weight="bold">12V AUX</text>
        <!-- Convertidor DC-DC -->
        <rect x="245" y="236" width="32" height="12" rx="2" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />

        <!-- PUERTO DE CARGA CCS COMBO 2 (Trasero) -->
        <g transform="translate(735, 315)">
          <rect x="0" y="0" width="28" height="32" rx="4" fill="#0f172a" stroke="#22c55e" stroke-width="2" />
          <!-- Pines de carga rápida -->
          <circle cx="9" cy="9" r="3" fill="#22c55e" />
          <circle cx="19" cy="9" r="3" fill="#22c55e" />
          <circle cx="9" cy="22" r="4" fill="#f97316" />
          <circle cx="19" cy="22" r="4" fill="#f97316" />
          <!-- Rayo de carga indicativo -->
          <path d="M 15 -6 L 11 0 L 17 0 L 13 8" stroke="#22c55e" stroke-width="2" fill="none" class="animate-bounce" />
        </g>

        <!-- RUEDAS Y FRENOS REGENERATIVOS -->
        <!-- Rueda Delantera con Aura Regenerativa -->
        <g transform="translate(270, 395)">
          <circle r="52" fill="#090d16" stroke="#334155" stroke-width="6" />
          <circle r="36" fill="#1e293b" stroke="#0284c7" stroke-width="2" />
          <circle r="26" fill="#334155" stroke="#38bdf8" stroke-width="1.5" />
          <!-- Resplandor regenerativo cian -->
          <circle r="30" fill="none" stroke="#06b6d4" stroke-width="2" opacity="0.6" stroke-dasharray="8 4" class="animate-spin" style="animation-duration: 6s;" />
          <path d="M -8 -26 C 6 -28, 20 -20, 24 -10 L 16 -5 C 13 -13, 3 -18, -7 -18 Z" fill="#0284c7" />
          <!-- Suspensión reforzada -->
          <line x1="-10" y1="-75" x2="-10" y2="-45" stroke="#38bdf8" stroke-width="5" />
          <path d="M -10 -45 Q -20 -35 -10 -25 Q 0 -15 -10 -5" fill="none" stroke="#cbd5e1" stroke-width="4" />
        </g>

        <!-- Rueda Trasera -->
        <g transform="translate(730, 395)">
          <circle r="52" fill="#090d16" stroke="#334155" stroke-width="6" />
          <circle r="36" fill="#1e293b" stroke="#0284c7" stroke-width="2" />
          <circle r="26" fill="#334155" stroke="#38bdf8" stroke-width="1.5" />
          <!-- Suspensión multi-brazo reforzada -->
          <line x1="0" y1="-65" x2="-15" y2="-30" stroke="#64748b" stroke-width="5" />
          <line x1="0" y1="-65" x2="15" y2="-30" stroke="#64748b" stroke-width="5" />
        </g>

        <!-- PUNTOS CALIENTES / HOTSPOTS INTERACTIVOS -->
        ${hotspotsHtml}
      </svg>
    `;
  },

  // 3. ESQUEMA MOTO URBANA / DIARIA
  getMotoSvg(components, activeId) {
    const hotspotsHtml = this.generateHotspots(components, activeId);

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 550" class="w-full h-auto schematics-svg select-none">
        <defs>
          <linearGradient id="motoFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="50%" stop-color="#059669" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <linearGradient id="motoEngineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
        </defs>

        <!-- Cuadrícula blueprint técnica -->
        <rect width="1000" height="550" fill="url(#blueprintGrid)" />

        <!-- Sombras de apoyo -->
        <ellipse cx="500" cy="485" rx="380" ry="16" fill="#020617" opacity="0.8" />
        <ellipse cx="230" cy="465" rx="60" ry="9" fill="#000000" opacity="0.6" />
        <ellipse cx="770" cy="465" rx="60" ry="9" fill="#000000" opacity="0.6" />

        <!-- ESTRUCTURA DEL CHASIS Y SILUETA MOTO URBANA (Vista lateral despiezada) -->

        <!-- Chasis tubular diamante (Verde esmeralda técnico) -->
        <path d="M 690 220 
                 L 570 260 
                 L 430 260 
                 L 380 340 
                 L 490 410 
                 L 590 320 
                 L 690 220" 
              fill="none" 
              stroke="url(#motoFrameGrad)" 
              stroke-width="7" 
              stroke-linecap="round" 
              stroke-linejoin="round" />

        <!-- Depósito de Gasolina (Forma ergonómica superior) -->
        <path d="M 680 215 
                 C 640 180, 520 180, 480 215 
                 C 460 235, 480 260, 540 260 
                 L 670 255 
                 Z" 
              fill="#065f46" 
              stroke="#34d399" 
              stroke-width="2" />

        <!-- Asiento corrido para 2 plazas -->
        <path d="M 480 230 
                 C 420 230, 330 250, 310 270 
                 L 330 290 
                 C 370 280, 440 265, 490 265 
                 Z" 
              fill="#1e293b" 
              stroke="#475569" 
              stroke-width="2" />

        <!-- Colín y subchasis trasero -->
        <path d="M 430 265 L 290 285 L 340 330 L 400 310" fill="none" stroke="#334155" stroke-width="5" />

        <!-- MANILLAR Y PUESTO DE MANDO -->
        <path d="M 690 220 L 665 175 L 640 170" fill="none" stroke="#e2e8f0" stroke-width="5" stroke-linecap="round" />
        <circle cx="640" cy="170" r="5" fill="#10b981" />
        <!-- Cuadro de instrumentos / Faro -->
        <rect x="680" y="165" width="26" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
        <path d="M 706 175 L 735 180 L 735 205 L 700 200 Z" fill="#f8fafc" opacity="0.15" />

        <!-- HORQUILLA DELANTERA TELESCÓPICA -->
        <g transform="rotate(24, 700, 210)">
          <!-- Pipa de dirección y tijas -->
          <rect x="692" y="200" width="16" height="40" fill="#334155" />
          <!-- Barras cromadas superiores -->
          <rect x="694" y="240" width="6" height="90" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
          <rect x="702" y="240" width="6" height="90" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
          <!-- Botellas de aluminio inferiores -->
          <rect x="691" y="325" width="10" height="95" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
          <rect x="701" y="325" width="10" height="95" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
        </g>

        <!-- MOTOR MONOCILÍNDRICO 4 TIEMPOS -->
        <!-- Bloque y culata inclinada hacia adelante -->
        <g transform="translate(420, 290)">
          <!-- Cárter motor y embrague húmedo -->
          <circle cx="45" cy="70" r="38" fill="url(#motoEngineGrad)" stroke="#64748b" stroke-width="2.5" />
          <circle cx="45" cy="70" r="24" fill="#0f172a" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 2" />
          
          <!-- Cilindro inclinado con aletas de refrigeración -->
          <path d="M 55 45 L 85 10 L 115 25 L 85 60 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <!-- Aletas disipadoras -->
          <line x1="65" y1="36" x2="78" y2="44" stroke="#e2e8f0" stroke-width="2" />
          <line x1="73" y1="26" x2="88" y2="34" stroke="#e2e8f0" stroke-width="2" />
          <line x1="82" y1="16" x2="98" y2="24" stroke="#e2e8f0" stroke-width="2" />

          <!-- Tapa de balancines / Bujía -->
          <rect x="85" y="0" width="30" height="22" rx="4" fill="#334155" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 105 -5 L 105 4" stroke="#ef4444" stroke-width="3" />
        </g>

        <!-- ALIMENTACIÓN: INYECCIÓN / CUERPO MARIPOSA -->
        <rect x="475" y="280" width="30" height="25" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
        <!-- Filtro de aire bajo el asiento -->
        <path d="M 400 270 L 445 270 L 445 310 L 400 300 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" />
        <path d="M 445 290 L 475 290" stroke="#f59e0b" stroke-width="4" />

        <!-- RADIADOR DE AGUA FRONTAL COMPACTO -->
        <rect x="560" y="295" width="16" height="55" rx="3" fill="#0c4a6e" stroke="#0284c7" stroke-width="2" />
        <line x1="565" y1="300" x2="565" y2="345" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />
        <line x1="571" y1="300" x2="571" y2="345" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />

        <!-- BATERÍA DE GEL BAJO EL ASIENTO -->
        <rect x="425" y="235" width="28" height="22" rx="3" fill="#0f172a" stroke="#10b981" stroke-width="2" />
        <text x="439" y="250" text-anchor="middle" fill="#10b981" font-size="9" font-weight="bold">12V</text>

        <!-- ESCAPE COMPLETO CON COLECTOR Y SILENCIOSO -->
        <!-- Colector curvo desde culata -->
        <path d="M 530 310 
                 C 560 360, 500 440, 440 440 
                 L 330 440 
                 L 230 415" 
              fill="none" 
              stroke="#64748b" 
              stroke-width="5.5" 
              stroke-linecap="round" />
        <!-- Silenciador trasero homologado -->
        <path d="M 330 448 L 220 415 L 215 390 L 325 425 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
        <ellipse cx="217" cy="402" rx="4" ry="12" fill="#0f172a" stroke="#e2e8f0" stroke-width="1" />

        <!-- TRANSMISIÓN SECUNDARIA: BASCULANTE Y CADENA -->
        <!-- Brazo basculante oscilante -->
        <polygon points="450,370 230,415 235,425 450,385" fill="#334155" stroke="#475569" stroke-width="1.5" />
        <!-- Cadena con piñón y corona dentada -->
        <circle cx="230" cy="415" r="28" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="3 3" />
        <circle cx="450" cy="370" r="14" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="3 3" />
        <line x1="450" y1="356" x2="230" y2="387" stroke="#f59e0b" stroke-width="2.5" />
        <line x1="450" y1="384" x2="230" y2="443" stroke="#f59e0b" stroke-width="2.5" />

        <!-- MONOAMORTIGUADOR TRASERO CENTRAL -->
        <g transform="translate(410, 320) rotate(45)">
          <rect x="-6" y="-30" width="12" height="60" rx="3" fill="#0f172a" stroke="#64748b" stroke-width="1.5" />
          <path d="M -8 -20 Q -15 -10 -8 0 Q -1 10 -8 20" fill="none" stroke="#ef4444" stroke-width="4" />
        </g>

        <!-- RUEDAS DE MOTO Y FRENOS -->
        <!-- Rueda Delantera con Disco Perforado -->
        <g transform="translate(770, 415)">
          <!-- Neumático fino de moto -->
          <circle r="52" fill="#090d16" stroke="#334155" stroke-width="7" />
          <!-- Llanta de aleación con radios -->
          <circle r="36" fill="none" stroke="#10b981" stroke-width="2.5" />
          <line x1="-36" y1="0" x2="36" y2="0" stroke="#64748b" stroke-width="2.5" />
          <line x1="0" y1="-36" x2="0" y2="36" stroke="#64748b" stroke-width="2.5" />
          <!-- Disco de freno ventilado delantero (gran diámetro) -->
          <circle r="26" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 2" />
          <!-- Pinza de 2 pistones dorada/roja -->
          <path d="M 12 -22 C 22 -14, 26 -2, 24 10 L 16 8 C 18 -1, 15 -10, 8 -16 Z" fill="#eab308" stroke="#f59e0b" stroke-width="1" />
        </g>

        <!-- Rueda Trasera -->
        <g transform="translate(230, 415)">
          <!-- Neumático trasero más ancho -->
          <circle r="54" fill="#090d16" stroke="#334155" stroke-width="9" />
          <circle r="36" fill="none" stroke="#10b981" stroke-width="2.5" />
          <line x1="-36" y1="0" x2="36" y2="0" stroke="#64748b" stroke-width="2.5" />
          <line x1="0" y1="-36" x2="0" y2="36" stroke="#64748b" stroke-width="2.5" />
          <!-- Disco trasero compacto -->
          <circle r="20" fill="none" stroke="#e2e8f0" stroke-width="1.8" stroke-dasharray="3 2" />
        </g>

        <!-- PUNTOS CALIENTES / HOTSPOTS INTERACTIVOS -->
        ${hotspotsHtml}
      </svg>
    `;
  }
};
