// Controlador Principal de la Aplicación AutoFind Lab
// Gestión de estado, PWA, Service Worker, eventos táctiles y modales.

class AutoFindApp {
  constructor() {
    this.currentVehicle = 'combustion';
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.activeComponentId = null;
    this.deferredInstallPrompt = null;
    this.viewMode = '3d'; // '3d' o '2d'
    this.isRotating3D = true;
    this.showPins3D = false; // Desactivado por defecto para vista 3D limpia y despejada
    this.cameraFocusTimeout = null;

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

    // 5. Inicializar buscador de especificaciones si está presente
    if (window.VehicleFinder && typeof window.VehicleFinder.init === 'function') {
      window.VehicleFinder.init();
    }
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
      console.log('[PWA] AutoFind Lab instalada en el dispositivo');
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
    // Conmutador de Modo Principal: Rayos X 3D ⇄ Buscador de Especificaciones
    const navTab3D = document.getElementById('navTab3D');
    const navTabFinder = document.getElementById('navTabFinder');
    const view3DMode = document.getElementById('view3DMode');
    const viewSpecsFinder = document.getElementById('viewSpecsFinder');
    const btnToggleDiagnosis = document.getElementById('btnToggleDiagnosis');

    const switchMainAppMode = (mode) => {
      this.appMode = mode;
      if (mode === '3d') {
        if (navTab3D) {
          navTab3D.className = 'flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-colors active:scale-95 min-w-[90px] sm:min-w-[125px]';
        }
        if (navTabFinder) {
          navTabFinder.className = 'flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors active:scale-95 min-w-[100px] sm:min-w-[165px]';
        }
        if (view3DMode) view3DMode.classList.remove('hidden');
        if (viewSpecsFinder) viewSpecsFinder.classList.add('hidden');
        if (btnToggleDiagnosis) {
          btnToggleDiagnosis.classList.remove('invisible', 'pointer-events-none');
        }
      } else {
        if (navTabFinder) {
          navTabFinder.className = 'flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-colors active:scale-95 min-w-[100px] sm:min-w-[165px]';
        }
        if (navTab3D) {
          navTab3D.className = 'flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors active:scale-95 min-w-[90px] sm:min-w-[125px]';
        }
        if (view3DMode) view3DMode.classList.add('hidden');
        if (viewSpecsFinder) {
          viewSpecsFinder.classList.remove('hidden');
          if (window.VehicleFinder && typeof window.VehicleFinder.init === 'function') {
            window.VehicleFinder.init();
          }
        }
        if (btnToggleDiagnosis) {
          btnToggleDiagnosis.classList.add('invisible', 'pointer-events-none');
        }
      }
    };

    if (navTab3D) navTab3D.addEventListener('click', () => switchMainAppMode('3d'));
    if (navTabFinder) navTabFinder.addEventListener('click', () => switchMainAppMode('finder'));

    // Tabs de selección de vehículo
    document.querySelectorAll('.vehicle-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const vehicleKey = tab.getAttribute('data-vehicle');
        this.switchVehicle(vehicleKey);
      });
    });

    // Alternancia de visualización 3D Rayos X ⇄ Plano 2D
    const btnMode3D = document.getElementById('btnMode3D');
    const btnMode2D = document.getElementById('btnMode2D');
    if (btnMode3D) btnMode3D.addEventListener('click', () => this.switchViewMode('3d'));
    if (btnMode2D) btnMode2D.addEventListener('click', () => this.switchViewMode('2d'));

    // Controles de navegación 3D
    const btnResetCamera3D = document.getElementById('btnResetCamera3D');
    const btnToggleRotate3D = document.getElementById('btnToggleRotate3D');
    const btnTogglePins3D = document.getElementById('btnTogglePins3D');

    if (btnResetCamera3D) btnResetCamera3D.addEventListener('click', () => this.resetCamera3D());
    if (btnToggleRotate3D) btnToggleRotate3D.addEventListener('click', () => this.toggleAutoRotate3D());
    if (btnTogglePins3D) btnTogglePins3D.addEventListener('click', () => this.togglePins3D());

    // Acciones de la Tarjeta Flotante HUD de Previsualización 3D
    const btnFloatingCardDetails = document.getElementById('btnFloatingCardDetails');
    const btnFloatingCardReset = document.getElementById('btnFloatingCardReset');
    const btnCloseFloatingCard = document.getElementById('btnCloseFloatingCard');

    if (btnFloatingCardDetails) {
      btnFloatingCardDetails.addEventListener('click', () => {
        if (this.activeComponentId) {
          this.openModal(this.activeComponentId);
        }
      });
    }

    if (btnFloatingCardReset) {
      btnFloatingCardReset.addEventListener('click', () => {
        this.resetCamera3D();
      });
    }

    if (btnCloseFloatingCard) {
      btnCloseFloatingCard.addEventListener('click', () => {
        this.hideFloatingComponentCard();
      });
    }

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
    this.hideFloatingComponentCard();
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

    // Configurar disponibilidad de 3D según el vehículo
    const viewModeSelector = document.getElementById('viewModeSelector');
    const modelViewer = document.getElementById('mainModelViewer');

    if (data.model3d && modelViewer) {
      if (viewModeSelector) viewModeSelector.classList.remove('opacity-40', 'pointer-events-none');
      modelViewer.src = data.model3d;
      modelViewer.cameraOrbit = data.cameraDefaultOrbit || '45deg 72deg 4.6m';
      modelViewer.cameraTarget = data.cameraDefaultTarget || '0m 0.5m 0m';
      this.switchViewMode(this.viewMode || '3d');
    } else {
      // Si el vehículo aún no tiene modelo 3D (prototipo en combustión), cambiar a 2D
      if (viewModeSelector) viewModeSelector.classList.add('opacity-40', 'pointer-events-none');
      this.switchViewMode('2d');
    }

    // Renderizar chips de componentes inferiores
    this.renderComponentChips();

    // Renderizar chips del diagnóstico rápido
    this.renderDiagnosisSymptoms();
  }

  // ALTERNAR ENTRE MODO 3D RAYOS X Y PLANO 2D
  switchViewMode(mode) {
    const data = VEHICLES_DATA[this.currentVehicle];
    if (mode === '3d' && !data.model3d) return;

    this.viewMode = mode;
    const btn3d = document.getElementById('btnMode3D');
    const btn2d = document.getElementById('btnMode2D');
    const v3dContainer = document.getElementById('viewer3dContainer');
    const v2dContainer = document.getElementById('schematicContainer');
    const controls3D = document.getElementById('controls3D');

    if (mode === '3d') {
      btn3d?.classList.add('active', 'bg-gradient-to-r', 'from-sky-500/20', 'to-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40', 'font-bold');
      btn3d?.classList.remove('text-slate-400', 'font-medium');
      btn2d?.classList.remove('active', 'bg-gradient-to-r', 'from-sky-500/20', 'to-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40', 'font-bold');
      btn2d?.classList.add('text-slate-400', 'font-medium');

      v3dContainer?.classList.remove('hidden');
      v2dContainer?.classList.add('hidden');
      controls3D?.classList.remove('hidden');

      this.renderModelViewerHotspots();
    } else {
      btn2d?.classList.add('active', 'bg-gradient-to-r', 'from-sky-500/20', 'to-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40', 'font-bold');
      btn2d?.classList.remove('text-slate-400', 'font-medium');
      btn3d?.classList.remove('active', 'bg-gradient-to-r', 'from-sky-500/20', 'to-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40', 'font-bold');
      btn3d?.classList.add('text-slate-400', 'font-medium');

      v3dContainer?.classList.add('hidden');
      v2dContainer?.classList.remove('hidden');
      controls3D?.classList.add('hidden');

      this.renderSchematic();
    }
  }

  // RENDERIZADO DE HOTSPOTS 3D EN GOOGLE MODEL-VIEWER
  renderModelViewerHotspots() {
    const modelViewer = document.getElementById('mainModelViewer');
    if (!modelViewer) return;

    // Limpiar pines anteriores directamente en model-viewer
    modelViewer.querySelectorAll('.hotspot-3d').forEach(el => el.remove());

    const data = VEHICLES_DATA[this.currentVehicle];
    if (!data.model3d) return;

    const filteredComponents = this.getFilteredComponents();

    const hotspotsCount = document.getElementById('hotspotsVisibleCount');
    if (hotspotsCount) {
      hotspotsCount.textContent = `${filteredComponents.length} de ${data.components.length}`;
    }

    // Si los pines 3D no están activados por el usuario, mantener la vista 100% limpia
    if (!this.showPins3D) return;

    filteredComponents
      .filter(c => c.hotspot3d)
      .forEach(comp => {
        const btn = document.createElement('button');
        btn.className = `hotspot-3d ${comp.id === this.activeComponentId ? 'is-active' : ''}`;
        btn.slot = `hotspot-${comp.id}`;
        btn.setAttribute('data-id', comp.id);
        btn.setAttribute('data-position', comp.hotspot3d.position);
        btn.setAttribute('data-normal', comp.hotspot3d.normal);
        btn.setAttribute('aria-label', `Ver detalles de ${comp.name}`);
        btn.innerHTML = `<span>${comp.badgeNum}</span><div class="hotspot-3d-tooltip">${comp.name}</div>`;

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectComponent(comp.id);
        });

        modelViewer.appendChild(btn);
      });
  }

  // ALTERNAR VISIBILIDAD DE PINES 3D FLOTANTES
  togglePins3D() {
    this.showPins3D = !this.showPins3D;
    const btnPins = document.getElementById('btnTogglePins3D');
    const textPins = document.getElementById('textPins3D');

    if (btnPins) {
      if (this.showPins3D) {
        btnPins.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        btnPins.classList.remove('text-slate-400');
        if (textPins) textPins.textContent = 'Pines ON';
      } else {
        btnPins.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        btnPins.classList.add('text-slate-400');
        if (textPins) textPins.textContent = 'Pines';
      }
    }

    this.renderModelViewerHotspots();
  }

  // SELECCIÓN DE COMPONENTE CON DESPLAZAMIENTO SUAVE Y TARJETA PREVIA
  selectComponent(componentId, directModal = false, initialTab = 'function') {
    const data = VEHICLES_DATA[this.currentVehicle];
    const comp = data.components.find(c => c.id === componentId);
    if (!comp) return;

    this.activeComponentId = componentId;

    if (this.viewMode === '3d' && data.model3d) {
      if (directModal) {
        this.focusComponent3D(componentId);
        this.openModal(componentId, initialTab);
        return;
      }

      // 1. Enfocar suavemente la cámara 3D hacia la pieza
      this.focusComponent3D(componentId);

      // 2. Mostrar tarjeta HUD flotante de previsualización sin tapar la pantalla
      this.showFloatingComponentCard(componentId);

      // 3. Resaltar chip activo en la barra inferior
      this.highlightActiveComponent(componentId);
    } else {
      // En modo 2D o vehículos sin 3D, abrir ficha modal directamente
      this.openModal(componentId, initialTab);
    }
  }

  // MOSTRAR TARJETA FLOTANTE HUD CON DETALLES PREVIOS
  showFloatingComponentCard(componentId) {
    const data = VEHICLES_DATA[this.currentVehicle];
    const comp = data.components.find(c => c.id === componentId);
    if (!comp) return;

    const card = document.getElementById('floatingComponentCard');
    const iconEl = document.getElementById('floatingCardIcon');
    const badgeEl = document.getElementById('floatingCardBadge');
    const titleEl = document.getElementById('floatingCardTitle');
    const catEl = document.getElementById('floatingCardCategory');
    const descEl = document.getElementById('floatingCardDesc');
    const focusStatus = document.getElementById('cameraFocusStatus');
    const focusText = document.getElementById('cameraFocusText');

    if (iconEl) iconEl.textContent = comp.icon;
    if (badgeEl) badgeEl.textContent = `#${comp.badgeNum}`;
    if (titleEl) titleEl.textContent = comp.name;
    if (catEl) catEl.textContent = comp.categoryName;
    if (descEl) descEl.textContent = comp.shortDesc;

    if (card) {
      card.classList.remove('hidden');
      requestAnimationFrame(() => {
        card.classList.add('is-visible');
      });
    }

    if (focusStatus && focusText) {
      focusText.textContent = `Enfocando ${comp.name}...`;
      focusStatus.classList.remove('hidden');
      clearTimeout(this.cameraFocusTimeout);
      this.cameraFocusTimeout = setTimeout(() => {
        focusStatus.classList.add('hidden');
      }, 2200);
    }
  }

  // OCULTAR TARJETA FLOTANTE HUD Y DESMARCAR
  hideFloatingComponentCard() {
    const card = document.getElementById('floatingComponentCard');
    const focusStatus = document.getElementById('cameraFocusStatus');
    if (focusStatus) focusStatus.classList.add('hidden');
    if (card) {
      card.classList.remove('is-visible');
      setTimeout(() => {
        card.classList.add('hidden');
      }, 300);
    }
    this.activeComponentId = null;
    this.highlightActiveComponent(null);
  }

  // RESALTAR COMPONENTE ACTIVO EN TODOS LOS NIVELES
  highlightActiveComponent(componentId) {
    // 1. Chips de navegación inferior
    document.querySelectorAll('.component-chip').forEach(chip => {
      if (componentId && chip.getAttribute('data-id') === componentId) {
        chip.classList.add('is-active');
        chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        chip.classList.remove('is-active');
      }
    });

    // 2. Pines 3D si están visibles en model-viewer
    const mv = document.getElementById('mainModelViewer');
    if (mv) {
      mv.querySelectorAll('.hotspot-3d').forEach(pin => {
        if (componentId && pin.getAttribute('data-id') === componentId) {
          pin.classList.add('is-active');
        } else {
          pin.classList.remove('is-active');
        }
      });
    }

    // 3. Hotspots en SVG (Modo 2D)
    const svg = document.querySelector('.schematics-svg');
    if (svg) {
      svg.querySelectorAll('.hotspot-group').forEach(h => {
        if (componentId && h.getAttribute('data-id') === componentId) {
          h.classList.add('is-active');
        } else {
          h.classList.remove('is-active');
        }
      });
    }
  }

  // ENFOQUE CINEMATOGRÁFICO DE CÁMARA 3D HACIA EL COMPONENTE
  focusComponent3D(componentId) {
    const modelViewer = document.getElementById('mainModelViewer');
    if (!modelViewer) return;

    const data = VEHICLES_DATA[this.currentVehicle];
    const comp = data.components.find(c => c.id === componentId);
    if (comp && comp.hotspot3d) {
      if (comp.hotspot3d.cameraTarget) {
        modelViewer.cameraTarget = comp.hotspot3d.cameraTarget;
      }
      if (comp.hotspot3d.cameraOrbit) {
        modelViewer.cameraOrbit = comp.hotspot3d.cameraOrbit;
      }
    }
  }

  // RESTABLECER CÁMARA 3D A POSICIÓN INICIAL
  resetCamera3D() {
    const modelViewer = document.getElementById('mainModelViewer');
    const data = VEHICLES_DATA[this.currentVehicle];
    if (modelViewer && data) {
      modelViewer.cameraTarget = data.cameraDefaultTarget || '0m 0.5m 0m';
      modelViewer.cameraOrbit = data.cameraDefaultOrbit || '45deg 72deg 4.6m';
    }
    this.hideFloatingComponentCard();
  }

  // ACTIVAR / PAUSAR ROTACIÓN AUTOMÁTICA 360°
  toggleAutoRotate3D() {
    const modelViewer = document.getElementById('mainModelViewer');
    const textRotate = document.getElementById('textRotate3D');
    const iconRotate = document.getElementById('iconRotate3D');
    if (!modelViewer) return;

    this.isRotating3D = !this.isRotating3D;
    modelViewer.autoRotate = this.isRotating3D;

    if (textRotate) {
      textRotate.textContent = this.isRotating3D ? 'Giro 360°' : 'Pausado';
    }
    if (iconRotate) {
      iconRotate.textContent = this.isRotating3D ? '🌐' : '⏸️';
    }
  }

  // RENDERIZADO DEL ESQUEMA VECTORIAL (2D)
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
    if (this.viewMode === '3d') {
      this.renderModelViewerHotspots();
    } else {
      this.renderSchematic();
    }
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
        class="component-chip ${comp.id === this.activeComponentId ? 'is-active' : ''} px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all active:scale-95">
        <span class="w-4 h-4 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-[10px] font-mono text-cyan-400 font-bold">${comp.badgeNum}</span>
        <span>${comp.name}</span>
      </button>
    `).join('');

    container.querySelectorAll('.component-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-id');
        this.selectComponent(id);
      });
      // Doble clic o doble toque para abrir ficha técnica directa si se desea
      chip.addEventListener('dblclick', () => {
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
        if (this.viewMode === '3d') {
          this.selectComponent(compId);
        } else {
          this.openModal(compId, 'symptoms');
        }
      });
    });
  }

  // ABRIR MODAL EXPLICATIVO (O BOTTOM SHEET MÓVIL)
  openModal(componentId, initialTab = 'function') {
    const data = VEHICLES_DATA[this.currentVehicle];
    const component = data.components.find(c => c.id === componentId);
    if (!component) return;

    this.activeComponentId = componentId;
    this.highlightActiveComponent(componentId);

    if (this.viewMode === '3d') {
      this.focusComponent3D(componentId);
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
      modal.classList.remove('hidden');
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
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
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
  window.autoFindApp = new AutoFindApp();
  window.autoMecaApp = window.autoFindApp;
});
