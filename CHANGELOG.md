# Registro de Cambios (Changelog) - AutoFind Lab

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [En desarrollo] (Rama: Mejoras)

### Añadido
- **Renombramiento de la Aplicación a AutoFind Lab**:
  - Cambio oficial del nombre e identidad de la aplicación de **AutoMeca** a **AutoFind** (nombre corto PWA: **AutoFind**, nombre completo: **AutoFind Lab**).
  - Actualización integral en `index.html`, `manifest.json`, `sw.js` (caché `autofind-v1.3.0-3d`), `server.js`, `styles.css`, `icons/icon.svg` y controlador principal `AutoFindApp` en `js/app.js`.
- **Modelo 3D Coche Eléctrico (EV) Rayos X Holográfico (`models/electric_xray.glb`)**:
  - Carrocería aerodinámica fastback eléctrico contemporáneo (4.65m largo, 1.84m ancho, 1.45m alto) con frontal ciego carenado, parabrisas inclinado, techo de caída fluida y luneta continua.
  - Paneles translúcidos de policarbonato con aristas CAD holográficas en cian/turquesa y centrado concéntrico perfecto en el eje $X = 0.000$.
  - 9 componentes mecánicos y electrónicos modelados individualmente con materiales PBR:
    1. Paquete de baterías de alta tensión (Traction Battery & BMS) en el piso plano con blindaje perimetral y módulos celulares.
    2. Motor eléctrico de tracción síncrono con estator y carcasa cilíndrica.
    3. Inversor y electrónica de potencia de carburo de silicio (SiC) con cables de alta tensión naranjas.
    4. Sistema de gestión térmica de batería (BMS Cooling) con radiador frontal e intercambiador.
    5. Freno regenerativo e hidráulico asistido (i-Booster) con discos en las 4 ruedas.
    6. Transmisión reductora de una sola velocidad (Single-Speed Gearbox) con engranajes helicoidales.
    7. Cargador a bordo (OBC) y puerto de carga exterior CCS Combo 2 con indicador LED de estado.
    8. Convertidor DC-DC y batería auxiliar de 12V para los sistemas de mando y seguridad.
    9. Suspensión reforzada adaptativa EV con 4 muelles helicoidales rojos en los bujes de rueda.
  - Integración total con navegación orbital 360°, desplazamiento suave de cámara y tarjeta flotante HUD previa.
- **Modelo 3D Moto Urbana de Uso Diario (4T) Rayos X Holográfico (`models/moto_xray.glb`)**:
  - Silueta deportiva estilo Naked / Streetfighter moderna (2.05m largo, 0.77m ancho de manillar, 1.15m alto) con depósito esculpido, asiento biplaza escalonado, quilla protectora inferior y colín afilado.
  - Paneles translúcidos esmeralda brillante con aristas holográficas y alineación concéntrica estricta en el eje $X = 0.000$.
  - 9 componentes técnicos modelados en 3D con materiales PBR:
    1. Propulsor monocilíndrico 4 tiempos (125cc a 300cc) con aletas de refrigeración en cilindro, culata y cárter de lubricación húmedo compartido.
    2. Transmisión secundaria por cadena de eslabones de acero y corona dentada trasera.
    3. Horquilla telescópica hidráulica frontal con barras cromadas y monoamortiguador trasero central con muelle en rojo vivo.
    4. Frenos de disco delantero y trasero con pinzas y sistema combinado (CBS / ABS).
    5. Sistema de refrigeración por radiador compacto frontal con rejilla protectora y electroventilador.
    6. Inyección electrónica (EFI) con cuerpo de mariposa y depósito superior ergonómico.
    7. Batería de gel/AGM compacta de 12V y regulador-rectificador con aletas disipadoras bajo el asiento.
    8. Sistema de escape con colector de bronce, catalizador central bajo el basculante y silenciador elevado deportivo de aluminio con protector térmico.
    9. Puesto de mando completo con manillar tubular ancho, manetas de freno/embrague, retrovisores angulares y cuadro de instrumentos digital TFT a color.
  - Ajuste de focos orbitales y coordenadas 3D para transiciones suaves hacia cada componente.
- **Soporte de Flota 3D Completa y Precaché PWA v1.2.0**:
  - Los 3 vehículos de la plataforma cuentan ahora con visor técnico interactivo de Rayos X de manera homogénea e intuitiva.
  - Actualización de `sw.js` a `automeca-v1.2.0-3d-complete` incorporando los modelos `electric_xray.glb` y `moto_xray.glb` al precaché offline.
- **Rediseño Estilístico a Coche Estándar (Sedán) Rayos X Holográfico**:
  - Sustitución del chasis preliminar por un perfil sedán aerodinámico realista en 3 volúmenes (4.60m largo, 1.82m ancho, 1.44m alto), con capó inclinado, cabina arqueada, pasos de rueda curvados y maletero.
  - Renderizado de aristas wireframe estilo CAD holográfico con líneas cian neón (`#00e5ff`) y paneles translúcidos de ingeniería.
  - 4 amortiguadores con muelles helicoidales rojos (`#ff2a2a`) de alta definición modelados paramétricamente en los cubos de rueda.
  - Habitáculo interior con salpicadero, túnel de transmisión y asientos visibles bajo efecto de rayos X.
  - Optimización del modelo GLB a 883 KB manteniendo alta fidelidad visual y 60 FPS estables.
- **Tarjeta Flotante HUD de Previsualización y Navegación Cinematográfica**:
  - Al pulsar una pieza en el "Desglose de Componentes" o en el panel de diagnóstico, la cámara 3D se desplaza suavemente hacia la pieza seleccionada.
  - La pantalla no se bloquea de golpe con el modal: se despliega una tarjeta HUD flotante semi-transparente en la esquina con el icono, nombre, categoría y función de la pieza.
  - Botón de acción `[ 📖 Ver Ficha Técnica Completa ]` para abrir el modal exhaustivo solo cuando el usuario lo desee (o mediante doble clic en el chip).
  - Indicador temporal animado "Enfocando pieza..." durante la transición de cámara.
  - Botón `[ 🔄 General ]` para restablecer la vista panorámica del vehículo.
- **Conmutador de Pines 3D Opcional (`btnTogglePins3D`)**:
  - Los botones 3D sobre la carrocería ahora están desactivados por defecto para una visualización holográfica limpia y sin saturación.
  - Botón `[ 🏷️ Pines ]` en la barra superior para activar o desactivar los pines flotantes a demanda.

### Corregido
- **Fijación de Centro y Bloqueo de Descuadre en Móviles (`disable-pan`)**:
  - Inclusión del atributo `disable-pan` en `<model-viewer>` para impedir que gestos de pellizco para zoom o contactos multitáctiles accidentales desplacen el centro de cámara (`camera-target`). El vehículo permanece perfectamente centrado en todo momento en teléfonos móviles, exactamente igual que en PC.
- **Aislamiento de Gestos Táctiles Verticales (`touch-action: none`)**:
  - Establecimiento de `touch-action="none"` y `overscroll-behavior: contain` en el lienzo 3D. Deslizar verticalmente con el dedo sobre el vehículo ahora inclina el modelo en 3D en lugar de hacer scroll accidental en la página web. El desplazamiento vertical de la página queda reservado para arrastrar fuera del visor (cabecera, pestañas, selector de piezas o márgenes).
- **Corrección Definitiva de Ruedas Estáticas en Coche Eléctrico (EV)**:
  - Eliminación total de líneas, aspas o marcas oscuras en las ruedas de `electric_xray.glb`: se instaló una configuración 100% de aluminio pulido estático (`#e2e8f0`) tanto en llantas como en los 5 radios y la tapa central de buje, idénticas a las del modelo de gas.
  - Implementación de invalidación de caché forzada con query string de versión (`?v=1.4.0`) en `js/data.js` para los 3 modelos 3D (`combustion_xray.glb`, `electric_xray.glb`, `moto_xray.glb`).
  - Estrategia *Network-First* en `sw.js` (versión `autofind-v1.4.0-clean`) exclusiva para archivos `.glb`, garantizando que dispositivos móviles y navegadores descarguen siempre la versión más reciente en línea mientras mantienen disponibilidad sin conexión.
  - Encabezados HTTP `Cache-Control: no-cache, no-store, must-revalidate` y `Pragma: no-cache` en `server.js` para servir los modelos 3D en tiempo real sin almacenamiento intermedio persistente.
- **Rediseño Iconográfico Minimalista 100% Simétrico de AutoFind**:
  - Creación de un nuevo diseño de logotipo de alta gama con perfecta simetría matemática axial ($X = 256$) en `icons/icon.svg`.
  - Silueta frontal hiperdeportiva aerodinámica con barra lumínica continua horizonte (Laser DRL Lightbar), ópticas Matrix LED, splitter inferior y retícula circular óptica HUD de calibración milimétrica con ticks ortogonales en los 4 ejes cardinales.
  - Renderizado en alta fidelidad para `icons/icon-192.png` y `icons/icon-512.png` sin asimetrías ni deformaciones ("chueco").
  - Integración del nuevo logotipo oficial como emblema de marca en la barra de navegación de `index.html`.
- **Alineación Concéntrica Carrocería vs Chasis (Efecto Rayos X)**:
  - Corrección en la orientación angular y centrado automático en el eje X para el capó, cabina y maletero extruidos.
  - Se eliminó el desfase lateral y angular que situaba la carrocería translúcida azul al costado derecho del chasis, logrando que la silueta holográfica envuelva de forma concéntrica y precisa (`Mid X: 0.000`) todos los componentes mecánicos, ruedas, suspensión y habitáculo interior.
- **Desbloqueo Total de Puntero (Arrastre 360° en Todo el Visor)**:
  - Eliminación de contenedor invisible superpuesto dentro de `<model-viewer>` que interceptaba clics y gestos táctiles.
  - Activación de `pointer-events: none` en las capas overlay HUD y cursor de agarre dinámico (`cursor: grab / grabbing`), permitiendo rotar 360° y hacer zoom desde cualquier coordenada del visor técnico.
- **Estados Activos Coordinados**:
  - Resaltado lumínico sincronizado (`.is-active`) en chips inferiores, tarjeta flotante y modelo 3D.

---

## [1.0.1] - 2026-09-12

### Añadido
- Soporte para ejecución en subdirectorios de GitHub Pages (`/Proyecto_Vehiculos/`) y servidor local.
- Iconos PWA responsivos (192x192, 512x512 y SVG) en modo `any` y `maskable`.
- Acceso directo rápido mediante PWA Shortcuts en el `manifest.json`.

### Modificado
- Optimización de rutas relativas en `sw.js` para precaché dinámico según el scope.
- Configuración de cabeceras HTTP anti-caché en `server.js` para actualizaciones fluidas de PWA.

---

## [1.0.0] - 2026-09-12

### Añadido
- Lanzamiento inicial de **AutoMeca Lab**.
- Base de datos técnica completa para 3 tipos de vehículos:
  - Coche de Combustión / Gas (10 componentes).
  - Coche Eléctrico EV (9 componentes).
  - Moto Urbana de Uso Diario 4T (9 componentes).
- Esquemas técnicos vectoriales SVG interactivos con puntos calientes táctiles (Hotspots de 64x64px).
- Panel de Diagnóstico Rápido de Averías por síntomas visibles del conductor.
- Ficha explicativa multimodal con sistema de 3 pestañas:
  - Función Técnica y principio de operación.
  - Averías frecuentes, indicadores perceptibles y nivel de severidad.
  - Rutinas de mantenimiento preventivo y consejos de oro.
- Bottom Sheet táctil deslizable (Swipe Down) para teléfonos móviles.
- Modo Offline completo mediante Service Worker con estrategia Cache-First / Stale-While-Revalidate.
- Servidor HTTP nativo en Node.js sin dependencias externas (`server.js`).
