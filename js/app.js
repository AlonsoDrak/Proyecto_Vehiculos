// Controlador Principal de la Aplicación AutoMeca Lab
// Gestión de estado, PWA, Service Worker, eventos táctiles y modales.

class AutoMecaApp {
  constructor() {
    this.currentVehicle = 'combustion';
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.activeComponentId = null;
    this.deferredInstallPrompt = null;

    this.init();
  }

  init() {
    // 1. Registro de PWA Service Worker y captura del evento de instalación
    this.setupPwa();

    // 2. Comprobar parámetros de URL (soporte para PWA Shortcuts)
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleParam = urlParams.get('vehicle');
    if (vehicleParam && VEHICLES_DATA[vehicleParam]) {
      this.currentVehicle = vehicleParam;
    }

    // 3. Vincular listeners del DOM
    this.bindEvents();

    // 4. Renderizar estado inicial
    this.switchVehicle(this.currentVehicle);
  }

  // CONFIGURACIÓN PWA Y SERVICE WORKER
  setupPwa() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
          .then((registration) => {
            console.log('[PWA] Service Worker registrado exitosamente con alcance:', registration.scope);
          })
          .catch((error) => {
            console.warn('[PWA] Error al registrar Service Worker:', error);
          });
      });
    }

    // Capturar evento nativo para botón de instalación
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      const btnInstall = document.getElementById('btnInstallPwa');
      if (btnInstall) {
        btnInstall.classList.remove('hidden');
      }
    });

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] AutoMeca Lab instalada en el dispositivo');
      const btnInstall = document.getElementById('btnInstallPwa');
      if (btnInstall) btnInstall.classList.add('hidden');
      this.deferredInstallPrompt = null;
    });

    // Acción del botón de instalar
    const btnInstall = document.getElementById('btnInstallPwa');
    if (btnInstall) {
      btnInstall.addEventListener('click', async () => {
        if (!this.deferredInstallPrompt) return;
        this.deferredInstallPrompt.prompt();
        const { outcome } = await this.deferredInstallPrompt.userChoice;
        console.log('[PWA] Resultado de instalación:', outcome);
        this.deferredInstallPrompt = null;
        btnInstall.classList.add('hidden');
      });
    }
  }

  // VINCULACIÓN DE EVENTOS DEL USUARIO
  bindEvents() {
    // Tabs de selección de vehículo
    document.querySelectorAll('.vehicle-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const vehicleKey = tab.getAttribute('data-vehicle');
        this.switchVehicle(vehicleKey);
      });
    });

    // Filtros de categorías
    const catContainer = document.getElementById('categoryFilters');
    if (catContainer) {
      catContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.cat-pill');
        if (!pill) return;

        catContainer.querySelectorAll('.cat-pill').forEach(p => {
          p.classList.remove('active', 'bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
          p.classList.add('bg-slate-900', 'text-slate-400', 'border-slate-800');
        });

        pill.classList.add('active', 'bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        pill.classList.remove('bg-slate-900', 'text-slate-400', 'border-slate-800');

        this.currentCategory = pill.getAttribute('data-cat');
        this.applyFilters();
      });
    }

    // Buscador interactivo
    const searchInput = document.getElementById('searchInput');
    const btnClearSearch = document.getElementById('btnClearSearch');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.searchQuery.length > 0) {
          btnClearSearch?.classList.remove('hidden');
        } else {
          btnClearSearch?.classList.add('hidden');
        }
        this.applyFilters();
      });
    }

    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          this.searchQuery = '';
          btnClearSearch.classList.add('hidden');
          this.applyFilters();
        }
      });
    }

    // Asistente de diagnóstico de averías
    const btnToggleDiagnosis = document.getElementById('btnToggleDiagnosis');
    const btnCloseDiagnosis = document.getElementById('btnCloseDiagnosis');
    const diagnosisPanel = document.getElementById('diagnosisPanel');

    if (btnToggleDiagnosis && diagnosisPanel) {
      btnToggleDiagnosis.addEventListener('click', () => {
        diagnosisPanel.classList.toggle('hidden');
        if (!diagnosisPanel.classList.contains('hidden')) {
          diagnosisPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    if (btnCloseDiagnosis && diagnosisPanel) {
      btnCloseDiagnosis.addEventListener('click', () => {
        diagnosisPanel.classList.add('hidden');
      });
    }

    // Modal y Bottom Sheet controles
    const modal = document.getElementById('componentModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnFooterClose = document.getElementById('btnFooterClose');

    if (btnCloseModal) btnCloseModal.addEventListener('click', () => this.closeModal());
    if (btnFooterClose) btnFooterClose.addEventListener('click', () => this.closeModal());

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-container')) {
          this.closeModal();
        }
      });
    }

    // Tecla ESC para cerrar modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });

    // Pestañas internas del Modal
    const tabFunction = document.getElementById('tabModalFunction');
    const tabSymptoms = document.getElementById('tabModalSymptoms');
    const tabMaintenance = document.getElementById('tabModalMaintenance');

    if (tabFunction) tabFunction.addEventListener('click', () => this.switchModalTab('function'));
    if (tabSymptoms) tabSymptoms.addEventListener('click', () => this.switchModalTab('symptoms'));
    if (tabMaintenance) tabMaintenance.addEventListener('click', () => this.switchModalTab('maintenance'));

    // Gesto táctil Swipe Down para cerrar Bottom Sheet en pantallas móviles
    this.setupMobileSwipeToDismiss();
  }

  // CAMBIO DE VEHÍCULO
  switchVehicle(vehicleKey) {
    if (!VEHICLES_DATA[vehicleKey]) return;
    this.currentVehicle = vehicleKey;
    const data = VEHICLES_DATA[vehicleKey];

    // Actualizar clases de tema en body para animaciones CSS
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim() + ` theme-${vehicleKey}`;

    // Actualizar estilo visual de los tabs
    document.querySelectorAll('.vehicle-tab').forEach(tab => {
      const isSelected = tab.getAttribute('data-vehicle') === vehicleKey;
      const tabTitle = tab.querySelector('.tab-title');

      if (isSelected) {
        tab.className = `vehicle-tab group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all duration-300 border ${data.badgeClass}`;
        if (tabTitle) tabTitle.className = 'tab-title text-white font-bold';
      } else {
        tab.className = 'vehicle-tab group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-2.5 px-2 rounded-xl font-medium text-xs sm:text-sm hover:bg-slate-800/80 transition-all duration-300 border border-transparent';
        if (tabTitle) tabTitle.className = 'tab-title text-slate-400';
      }
    });

    // Actualizar Banner
    const vehicleIcon = document.getElementById('vehicleIcon');
    const vehicleTitle = document.getElementById('vehicleTitle');
    const vehicleDesc = document.getElementById('vehicleDesc');
    const vehicleCountBadge = document.getElementById('vehicleCountBadge');
    const vehicleBanner = document.getElementById('vehicleBanner');

    if (vehicleIcon) vehicleIcon.textContent = data.icon;
    if (vehicleTitle) vehicleTitle.textContent = data.name;
    if (vehicleDesc) vehicleDesc.textContent = data.description;
    if (vehicleCountBadge) vehicleCountBadge.textContent = `${data.components.length} piezas`;

    if (vehicleBanner) {
      vehicleBanner.style.borderLeftColor = 
        vehicleKey === 'combustion' ? '#f59e0b' : 
        vehicleKey === 'electric' ? '#06b6d4' : '#10b981';
    }

    // Resetear búsquedas y filtros
    this.currentCategory = 'all';
    this.searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    // Renderizar gráfico vectorial SVG con hotspots
    this.renderSchematic();

    // Renderizar chips de componentes inferiores
    this.renderComponentChips();

    // Renderizar chips del diagnóstico rápido
    this.renderDiagnosisSymptoms();
  }

  // RENDERIZADO DEL ESQUEMA VECTORIAL
  renderSchematic() {
    const data = VEHICLES_DATA[this.currentVehicle];
    const filteredComponents = this.getFilteredComponents();

    const hotspotsCount = document.getElementById('hotspotsVisibleCount');
    if (hotspotsCount) {
      hotspotsCount.textContent = `${filteredComponents.length} de ${data.components.length}`;
    }

    Schematics.render(
      'schematicContainer',
      this.currentVehicle,
      filteredComponents,
      (componentId) => this.openModal(componentId),
      this.activeComponentId
    );
  }

  // OBTENER COMPONENTES FILTRADOS
  getFilteredComponents() {
    const data = VEHICLES_DATA[this.currentVehicle];
    return data.components.filter(comp => {
      const matchesCategory = this.currentCategory === 'all' || comp.category === this.currentCategory;
      if (!matchesCategory) return false;

      if (!this.searchQuery) return true;

      const q = this.searchQuery;
      const inName = comp.name.toLowerCase().includes(q);
      const inDesc = comp.shortDesc.toLowerCase().includes(q) || comp.function.toLowerCase().includes(q);
      const inSymptoms = comp.symptoms.some(s => s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));

      return inName || inDesc || inSymptoms;
    });
  }

  // APLICAR FILTROS Y BÚSQUEDAS
  applyFilters() {
    this.renderSchematic();
    this.renderComponentChips();
  }

  // RENDERIZAR CHIPS INFERIORES DE COMPONENTES
  renderComponentChips() {
    const container = document.getElementById('componentChipsList');
    if (!container) return;

    const components = this.getFilteredComponents();

    if (components.length === 0) {
      container.innerHTML = `<span class="text-xs text-slate-500 italic py-1">No se encontraron componentes para el filtro seleccionado.</span>`;
      return;
    }

    container.innerHTML = components.map(comp => `
      <button 
        data-id="${comp.id}" 
        class="component-chip px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all active:scale-95">
        <span class="w-4 h-4 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-cyan-400 font-bold">${comp.badgeNum}</span>
        <span>${comp.name}</span>
      </button>
    `).join('');

    container.querySelectorAll('.component-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-id');
        this.openModal(id);
      });
    });
  }

  // RENDERIZAR SÍNTOMAS PARA DIAGNÓSTICO RÁPIDO
  renderDiagnosisSymptoms() {
    const container = document.getElementById('symptomChipsContainer');
    if (!container) return;

    const data = VEHICLES_DATA[this.currentVehicle];
    const symptomsList = [];

    data.components.forEach(comp => {
      comp.symptoms.forEach(sym => {
        symptomsList.push({
          componentId: comp.id,
          componentName: comp.name,
          title: sym.title,
          type: sym.type
        });
      });
    });

    container.innerHTML = symptomsList.slice(0, 8).map(item => `
      <button 
        data-component="${item.componentId}"
        class="diagnosis-symptom-chip text-left px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-xs text-slate-300 hover:text-amber-300 flex items-center gap-2 transition-all active:scale-95 group">
        <span class="w-2 h-2 rounded-full ${item.type === 'danger' ? 'bg-rose-500' : 'bg-amber-400'} shrink-0 group-hover:animate-ping"></span>
        <span class="line-clamp-1">${item.title}</span>
      </button>
    `).join('');

    container.querySelectorAll('.diagnosis-symptom-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const compId = btn.getAttribute('data-component');
        // Abrir modal directamente en la pestaña de síntomas
        this.openModal(compId, 'symptoms');
      });
    });
  }

  // ABRIR MODAL EXPLICATIVO (O BOTTOM SHEET MÓVIL)
  openModal(componentId, initialTab = 'function') {
    const data = VEHICLES_DATA[this.currentVehicle];
    const component = data.components.find(c => c.id === componentId);
    if (!component) return;

    this.activeComponentId = componentId;

    // Resaltar en el SVG
    const svg = document.querySelector('.schematics-svg');
    if (svg) {
      svg.querySelectorAll('.hotspot-group').forEach(h => {
        if (h.getAttribute('data-id') === componentId) {
          h.classList.add('is-active');
        } else {
          h.classList.remove('is-active');
        }
      });
    }

    // Poblar datos del modal
    document.getElementById('modalIcon').textContent = component.icon;
    document.getElementById('modalTitle').textContent = component.name;
    document.getElementById('modalShortDesc').textContent = component.shortDesc;
    document.getElementById('modalCategoryBadge').textContent = component.categoryName;

    // Severidad Badge
    const severityBadge = document.getElementById('modalSeverityBadge');
    if (severityBadge) {
      const sevMap = {
        critico: { label: 'Crítico para la marcha', class: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
        alto: { label: 'Severidad Alta', class: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        moderado: { label: 'Severidad Moderada', class: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
        preventivo: { label: 'Mantenimiento Preventivo', class: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' }
      };
      const sev = sevMap[component.severity] || sevMap.moderado;
      severityBadge.textContent = sev.label;
      severityBadge.className = `text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${sev.class}`;
    }

    // Pestaña 1: Función
    document.getElementById('modalFunctionText').textContent = component.function;
    document.getElementById('modalComparisonText').textContent = component.comparison;

    // Pestaña 2: Síntomas de Avería
    const symptomsListContainer = document.getElementById('modalSymptomsList');
    if (symptomsListContainer) {
      symptomsListContainer.innerHTML = component.symptoms.map(s => {
        const borderClass = s.type === 'danger' ? 'border-rose-500/40 bg-rose-950/20' : 'border-amber-500/40 bg-amber-950/20';
        const textClass = s.type === 'danger' ? 'text-rose-400' : 'text-amber-300';

        return `
          <div class="p-3 rounded-xl border ${borderClass} space-y-1">
            <div class="flex items-center gap-2 font-bold text-xs sm:text-sm ${textClass}">
              <span>${s.type === 'danger' ? '🚨' : '⚠️'}</span>
              <span>${s.title}</span>
            </div>
            <p class="text-xs text-slate-300 pl-6 leading-relaxed">
              ${s.desc}
            </p>
          </div>
        `;
      }).join('');
    }

    // Pestaña 3: Mantenimiento
    const maintenanceListContainer = document.getElementById('modalMaintenanceList');
    if (maintenanceListContainer) {
      maintenanceListContainer.innerHTML = component.maintenance.map(m => `
        <div class="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/15 space-y-1.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span class="font-bold text-xs sm:text-sm text-emerald-300">🔧 ${m.action}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200 border border-emerald-700/50">${m.interval}</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            <strong class="text-slate-200">Consejo de oro:</strong> ${m.tip}
          </p>
        </div>
      `).join('');
    }

    // Activar pestaña inicial
    this.switchModalTab(initialTab);

    // Mostrar modal con animación
    const modal = document.getElementById('componentModal');
    if (modal) {
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
    }
  }

  // CAMBIAR PESTAÑA INTERNA DEL MODAL
  switchModalTab(tabKey) {
    const tabs = {
      function: { btn: 'tabModalFunction', content: 'modalTabContentFunction' },
      symptoms: { btn: 'tabModalSymptoms', content: 'modalTabContentSymptoms' },
      maintenance: { btn: 'tabModalMaintenance', content: 'modalTabContentMaintenance' }
    };

    Object.keys(tabs).forEach(k => {
      const btn = document.getElementById(tabs[k].btn);
      const content = document.getElementById(tabs[k].content);

      if (k === tabKey) {
        btn?.classList.add('active', 'border-cyan-400', 'text-cyan-400');
        btn?.classList.remove('border-transparent', 'text-slate-400');
        content?.classList.remove('hidden');
      } else {
        btn?.classList.remove('active', 'border-cyan-400', 'text-cyan-400');
        btn?.classList.add('border-transparent', 'text-slate-400');
        content?.classList.add('hidden');
      }
    });
  }

  // CERRAR MODAL
  closeModal() {
    const modal = document.getElementById('componentModal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // Quitar active del SVG si se desea
    const svg = document.querySelector('.schematics-svg');
    if (svg) {
      svg.querySelectorAll('.hotspot-group').forEach(h => h.classList.remove('is-active'));
    }
    this.activeComponentId = null;
  }

  // GESTO TÁCTIL SWIPE-DOWN PARA CERRAR BOTTOM SHEET EN MÓVILES
  setupMobileSwipeToDismiss() {
    const handle = document.getElementById('bottomSheetHandle');
    const modalContent = document.querySelector('.modal-content');
    if (!handle || !modalContent) return;

    let startY = 0;
    let currentY = 0;
    let isSwiping = false;

    handle.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isSwiping = true;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentY = e.touches[0].clientY;
      const diffY = currentY - startY;

      if (diffY > 0) {
        modalContent.style.transform = `translateY(${diffY}px)`;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffY = currentY - startY;

      if (diffY > 120) {
        this.closeModal();
      }
      modalContent.style.transform = '';
    });
  }
}

// Inicialización de la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.autoMecaApp = new AutoMecaApp();
});
