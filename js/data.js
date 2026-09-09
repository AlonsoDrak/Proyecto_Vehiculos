// Base de Datos Educativa de Componentes Automotrices y Motocicletas
// Contiene la información técnica, síntomas de avería y pautas de mantenimiento.

const VEHICLES_DATA = {
  combustion: {
    id: 'combustion',
    name: 'Coche de Combustión / Gas',
    subtitle: 'Motor Térmico, Inyección, Refrigeración y Transmisión Mecánica',
    icon: '⛽',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Los vehículos de combustión interna (gasolina, diésel o adaptados a gas GLP/GNC) transforman la energía química del carburante en energía mecánica mediante explosiones controladas en los cilindros.',
    components: [
      {
        id: 'comb_engine',
        name: 'Motor Térmico de Combustión',
        category: 'motor',
        categoryName: 'Motor y Potencia',
        icon: '⚙️',
        coords: { x: 310, y: 285 },
        badgeNum: 1,
        severity: 'critico',
        shortDesc: 'Corazón mecánico que convierte el combustible en energía de tracción.',
        function: 'El motor de cuatro tiempos (admisión, compresión, combustión y escape) quema la mezcla de aire y combustible dentro de los cilindros. La expansión de los gases empuja los pistones hacia abajo, los cuales hacen girar el cigüeñal para convertir el movimiento rectilíneo en movimiento rotativo continuo hacia las ruedas.',
        symptoms: [
          {
            title: 'Humo azul o blanco denso por el escape',
            desc: 'Indica paso de aceite a las cámaras de combustión (aros de pistón o retenes de válvula gastados) o filtración de líquido refrigerante (junta de culata quemada).',
            type: 'warning'
          },
          {
            title: 'Traqueteo o golpeteo metálico (bielas/taqués)',
            desc: 'Ruido rítmico que aumenta con las RPM; suele señalar falta de lubricación adecuada, holgura de cojinetes de biela o taqués hidráulicos descebados.',
            type: 'danger'
          },
          {
            title: 'Pérdida súbita de potencia y tirones',
            desc: 'Posible fallo de compresión, bujías o bobinas de encendido deterioradas, o problemas en la alimentación de inyección.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Cambio de aceite y filtro de aceite', interval: 'Cada 10.000 - 15.000 km o 1 año', tip: 'Usa siempre la viscosidad recomendada por el fabricante (ej. 5W-30 Full Synthetic).' },
          { action: 'Sustitución de bujías de encendido', interval: 'Cada 40.000 - 60.000 km (Iridio hasta 100.000 km)', tip: 'Revisa que los electrodos no tengan carbonilla ni aceite.' },
          { action: 'Inspección de correa o cadena de distribución', interval: 'Correa: 80.000 - 120.000 km / Cadena: revisión de tensor', tip: 'Si la correa se rompe en marcha, los pistones doblarán las válvulas causando una avería catastrófica.' }
        ],
        comparison: 'A diferencia de los motores eléctricos con una sola pieza móvil principal (el rotor), el motor térmico cuenta con más de 200 piezas móviles sujetas a fricción constante, calor extremo y desgaste.'
      },
      {
        id: 'comb_radiator',
        name: 'Radiador y Sistema de Refrigeración',
        category: 'refrigeracion',
        categoryName: 'Refrigeración y Climatización',
        icon: '❄️',
        coords: { x: 190, y: 285 },
        badgeNum: 2,
        severity: 'critico',
        shortDesc: 'Disipa el calor extremo generado por la combustión para evitar el gripado.',
        function: 'El radiador es un intercambiador de calor de tubos finos y aletas de aluminio ubicado al frente del coche. Una bomba de agua impulsa el líquido anticongelante/refrigerante a través de las galerías del motor caliente. Al llegar al radiador, el flujo de aire exterior enfría el líquido antes de retornar al bloque.',
        symptoms: [
          {
            title: 'Aguja de temperatura en zona roja o testigo de motor caliente',
            desc: 'Falta de refrigerante, termostato atascado en posición cerrada, o electroventilador que no se activa.',
            type: 'danger'
          },
          {
            title: 'Charco de líquido dulce y coloreado bajo el coche',
            desc: 'Fugas en los manguitos agrietados, abrazaderas sueltas o fisura en el panel del radiador.',
            type: 'warning'
          },
          {
            title: 'Olor a dulce y vaho en el parabrisas',
            desc: 'Posible fuga en el radiador interior de la calefacción de la cabina.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Comprobación del nivel de anticongelante', interval: 'Una vez al mes en frío', tip: '¡NUNCA abras el tapón del vaso de expansión con el motor caliente, el vapor a presión causa quemaduras graves!' },
          { action: 'Sustitución completa del líquido refrigerante', interval: 'Cada 2 a 4 años (u orgánico cada 5 años)', tip: 'Con el tiempo el refrigerante pierde sus aditivos anticorrosivos y se vuelve ácido, dañando la culata.' }
        ],
        comparison: 'En coches eléctricos también hay radiadores frontales, pero operan a temperaturas mucho menores (40-60°C para la batería) comparado con los 90-105°C de un motor de gasolina.'
      },
      {
        id: 'comb_alternator',
        name: 'Alternador Eléctrico',
        category: 'electrico',
        categoryName: 'Sistema Eléctrico',
        icon: '⚡',
        coords: { x: 330, y: 235 },
        badgeNum: 3,
        severity: 'alto',
        shortDesc: 'Genera electricidad mientras el motor gira y recarga la batería de 12V.',
        function: 'Es un generador accionado por la correa de accesorios (poly-V) conectada al cigüeñal. Transforma la energía mecánica rotativa en corriente alterna (AC), que un puente de diodos integrado rectifica a corriente continua (DC de ~14.2V) para alimentar todos los sistemas eléctricos del coche en marcha y mantener cargada la batería de arranque.',
        symptoms: [
          {
            title: 'Testigo rojo de batería encendido en el cuadro',
            desc: 'El alternador no está suministrando la tensión adecuada (menor a 13.5V); el coche está consumiendo exclusivamente la reserva de la batería.',
            type: 'danger'
          },
          {
            title: 'Luces tenues que parpadean al acelerar o ralentí inestable',
            desc: 'Regulador de tensión defectuoso o diodos rectificadores quemados.',
            type: 'warning'
          },
          {
            title: 'Chillido agudo al arrancar o al encender el aire acondicionado',
            desc: 'Correa de accesorios desgastada, floja o cristalizada patinando sobre la polea.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Comprobación de tensión de carga con multímetro', interval: 'En cada revisión anual (debe medir 13.8V a 14.4V en ralentí)', tip: 'Si mide menos de 13V o más de 15V, el alternador o regulador requieren reparación.' },
          { action: 'Revisión y cambio de correa de accesorios', interval: 'Cada 60.000 km o 4 años', tip: 'Reemplaza también el rodillo tensor y la polea libre del alternador.' }
        ],
        comparison: 'Los coches eléctricos no tienen alternador convencional ni correa; utilizan un convertidor electrónico de estado sólido (DC-DC) para alimentar el circuito de 12V.'
      },
      {
        id: 'comb_battery',
        name: 'Batería de Arranque (12V)',
        category: 'electrico',
        categoryName: 'Sistema Eléctrico',
        icon: '🔋',
        coords: { x: 260, y: 220 },
        badgeNum: 4,
        severity: 'alto',
        shortDesc: 'Proporciona el pico de corriente necesario para accionar el motor de arranque.',
        function: 'Almacena energía electroquímica a 12 voltios (generalmente plomo-ácido, EFB o AGM para sistemas Start-Stop). Su misión crítica es entregar una enorme intensidad instantánea (entre 300 y 700 Amperios de arranque en frío CCA) al motor de arranque durante 2-3 segundos para poner en marcha el motor de combustión.',
        symptoms: [
          {
            title: 'El motor gira muy lento o suena un "clac-clac-clac" rápido al dar contacto',
            desc: 'Carga insuficiente para mover el motor de arranque; voltaje en reposo menor a 11.8V.',
            type: 'danger'
          },
          {
            title: 'Reseteo del reloj, radio o testigos parpadeando al intentar encender',
            desc: 'Caída profunda de tensión por sulfatación interna de las placas de plomo.',
            type: 'warning'
          },
          {
            title: 'Polvo blanquecino/azulado en los bornes',
            desc: 'Sulfatación por vapores de ácido que incrementa la resistencia de contacto.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Comprobación de voltaje en reposo', interval: 'Cada 6 meses (óptimo: 12.6V a 12.8V)', tip: 'Si el coche va a estar parado más de 3 semanas, desconecta el borne negativo o usa un mantenedor de batería inteligente.' },
          { action: 'Limpieza e hidratación de bornes con vaselina dieléctrica', interval: 'Anualmente', tip: 'Retira el óxido con un cepillo de cerdas metálicas y agua tibia con bicarbonato.' }
        ],
        comparison: 'En un coche eléctrico sigue existiendo una batería de 12V idéntica a esta para alimentar la electrónica y los relés de seguridad que conectan la batería principal de alta tensión.'
      },
      {
        id: 'comb_brakes',
        name: 'Sistema de Frenos de Disco y ABS',
        category: 'frenos',
        categoryName: 'Frenado y Seguridad Activa',
        icon: '🛑',
        coords: { x: 300, y: 395 },
        badgeNum: 5,
        severity: 'critico',
        shortDesc: 'Detiene el vehículo mediante fricción hidráulica asistida.',
        function: 'Al pisar el pedal, el servofreno multiplica la fuerza humana y la bomba envía presión hidráulica a través del líquido de frenos hasta las pinzas (calipers). Los pistones empujan las pastillas de fricción contra los discos giratorios de acero, disipando la energía cinética del coche en calor extremo.',
        symptoms: [
          {
            title: 'Chirrido metálico agudo al pisar suavemente el freno',
            desc: 'El avisador acústico de desgaste de la pastilla está rozando contra el disco; quedan menos de 2 mm de material de fricción.',
            type: 'warning'
          },
          {
            title: 'Pedal esponjoso que se hunde casi hasta el suelo',
            desc: 'Presencia de burbujas de aire en las líneas hidráulicas o líquido de frenos degradado por absorción de humedad (ebullición por vapor lock).',
            type: 'danger'
          },
          {
            title: 'Vibración perceptible en el volante al frenar a alta velocidad',
            desc: 'Discos de freno alabados o deformados por sobrecalentamiento súbito.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Revisión visual de grosor de pastillas y discos', interval: 'Cada 15.000 km o en cambio de neumáticos', tip: 'Cambia las pastillas antes de que toquen el soporte metálico para no destruir el disco.' },
          { action: 'Purga y sustitución del líquido de frenos (DOT 4 / DOT 5.1)', interval: 'Cada 2 años sin excepción', tip: 'El líquido es higroscópico (absorbe agua del ambiente), lo que baja su punto de ebullición y oxida los pistones de la pinza.' }
        ],
        comparison: 'En los coches de combustión, las pastillas se desgastan el doble de rápido que en los eléctricos, ya que estos últimos usan el freno motor regenerativo para el 80% de las deceleraciones.'
      },
      {
        id: 'comb_suspension',
        name: 'Suspensión y Amortiguadores',
        category: 'chasis',
        categoryName: 'Chasis y Suspensión',
        icon: '🛞',
        coords: { x: 275, y: 335 },
        badgeNum: 6,
        severity: 'alto',
        shortDesc: 'Garantiza el contacto constante de los neumáticos con el asfalto y el confort.',
        function: 'Compuesto por muelles helicoidales que soportan el peso de la carrocería y amortiguadores hidráulicos/gas que frenan las oscilaciones incontroladas del muelle. Mantiene las ruedas pegadas al firme en curvas, baches y frenadas de emergencia, evitando pérdidas de trayectoria.',
        symptoms: [
          {
            title: 'El coche rebota repetidamente al pasar por un badén o resalto',
            desc: 'El amortiguador ha perdido su fluido hidráulico interno o gas y ya no absorbe la energía del muelle.',
            type: 'warning'
          },
          {
            title: 'Manchas de aceite brillantes escurriendo por el cuerpo del amortiguador',
            desc: 'Retén de estanqueidad roto; el amortiguador ha perdido efectividad y debe reemplazarse por parejas.',
            type: 'danger'
          },
          {
            title: 'Golpes secos metálicos ("clonk") en terreno irregular',
            desc: 'Silentblocks de goma agrietados, bieletas de la barra estabilizadora o copelas de apoyo dañadas.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Inspección visual de fugas y holguras de rótulas', interval: 'Cada 20.000 km', tip: 'Reemplaza siempre los amortiguadores de 2 en 2 por eje para mantener la estabilidad equilibrada.' },
          { action: 'Sustitución recomendada de amortiguadores', interval: 'Entre 60.000 y 90.000 km', tip: 'Unos amortiguadores gastados alargan la distancia de frenado hasta un 25% y engañan al sistema ABS/ESP.' }
        ],
        comparison: 'En motos, la suspensión delantera se confía a una horquilla telescópica hidráulica que además debe soportar las fuerzas de torsión directas de la dirección.'
      },
      {
        id: 'comb_transmission',
        name: 'Transmisión y Caja de Cambios',
        category: 'transmision',
        categoryName: 'Transmisión y Embrague',
        icon: '🕹️',
        coords: { x: 440, y: 285 },
        badgeNum: 7,
        severity: 'critico',
        shortDesc: 'Adapta la velocidad de giro del motor a la velocidad deseada de las ruedas.',
        function: 'Multiplica o desmultiplica el par motor mediante diferentes relaciones de engranajes (5 a 8 marchas manuales o automáticas). En cajas manuales, el embrague conecta y desconecta el motor del cambio para permitir engranar las marchas suavemente. El diferencial reparte el par entre las dos ruedas del eje permitiendo que giren a distinta velocidad en curvas.',
        symptoms: [
          {
            title: 'El motor se acelera de golpe al pisar a fondo pero el coche no gana velocidad ("patina")',
            desc: 'Disco de embrague desgastado que patina contra el volante de inercia bimasa.',
            type: 'danger'
          },
          {
            title: 'Dificultad o "rascado" al meter marcha (especialmente marcha atrás o segunda)',
            desc: 'Anillos sincronizadores gastados o nivel de valvulina bajo en la caja.',
            type: 'warning'
          },
          {
            title: 'Zumbido continuo que aumenta con la velocidad del vehículo',
            desc: 'Rodamientos internos de la caja o del diferencial con desgaste prematuro.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Sustitución de aceite de la transmisión (valvulina o ATF)', interval: 'Manual: 80.000 - 120.000 km / Automática: 60.000 km con dializador', tip: 'El mito de que la valvulina es "de por vida" causa costosas roturas de cajas automáticas.' },
          { action: 'Evitar reposar el pie sobre el pedal de embrague en semáforos', interval: 'Hábito diario', tip: 'Acelera el desgaste del cojinete de empuje y fatiga el muelle diafragma.' }
        ],
        comparison: 'Los coches eléctricos carecen de caja de cambios de múltiples marchas y embrague: utilizan una reductora directa fija de una sola velocidad gracias al amplio rango de RPM del motor eléctrico (0 a 18.000 RPM).'
      },
      {
        id: 'comb_exhaust',
        name: 'Sistema de Escape y Catalizador',
        category: 'escape',
        categoryName: 'Escape y Emisiones',
        icon: '💨',
        coords: { x: 740, y: 285 },
        badgeNum: 8,
        severity: 'moderado',
        shortDesc: 'Evacua los gases quemados, reduce el ruido y filtra contaminantes nocivos.',
        function: 'Conduce los gases de escape desde la culata hasta la parte trasera. Integra el catalizador (con metales preciosos como platino, paladio y rodio) que transforma gases letales (monóxido de carbono, hidrocarburos sin quemar y óxidos de nitrógeno NOx) en vapor de agua, CO2 y nitrógeno. En diésel/gasolina modernos incluye filtro de partículas (DPF/GPF) y silenciadores acústicos.',
        symptoms: [
          {
            title: 'Sonido ronco ensordecedor estilo "escape libre" bajo el habitáculo',
            desc: 'Fisura, picadura por óxido en el tubo flexible o rotura de junta de escape.',
            type: 'warning'
          },
          {
            title: 'Olor acre a azufre ("huevos podridos") por la cola de escape',
            desc: 'Catalizador degradado incapaz de oxidar los sulfuros del combustible.',
            type: 'alert'
          },
          {
            title: 'Testigo "Check Engine" por fallo de Sonda Lambda o filtro DPF obstruido',
            desc: 'Lecturas de mezcla estequiométrica incorrectas o exceso de hollín por trayectos cortos en ciudad.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Conducción en autopista a régimen medio-alto (descarbonización DPF)', interval: 'Cada 500 - 1.000 km en coches diésel', tip: 'Permite alcanzar los 600°C necesarios para quemar el hollín atrapado en el filtro de partículas.' },
          { action: 'Inspección de silentblocks de goma que sujetan el escape', interval: 'En cada cambio de aceite', tip: 'Si se rompe una goma, el escape vibrará y terminará partiendo el colector.' }
        ],
        comparison: 'Inexistente en vehículos 100% eléctricos (cero emisiones locales y sin gases de escape).'
      },
      {
        id: 'comb_fuel_system',
        name: 'Alimentación e Inyección / Sistema de Gas',
        category: 'motor',
        categoryName: 'Motor y Potencia',
        icon: '⛽',
        coords: { x: 620, y: 285 },
        badgeNum: 9,
        severity: 'alto',
        shortDesc: 'Dosifica con precisión micrométrica el combustible o gas hacia las cámaras.',
        function: 'En coches de gasolina consta de depósito, bomba sumergida, filtro e inyectores de alta presión (Common Rail directa hasta 350 bar). En coches bi-fuel o transformados a Gas (GLP / GNC) se añade un depósito toroidal presurizado, un reductor/vaporizador que convierte el gas líquido en vapor y una rampa de inyectores específicos para gas coordinados con la ECU.',
        symptoms: [
          {
            title: 'Fuerte olor a gasolina o gas en el vano motor o habitáculo',
            desc: 'Tubería agrietada, junta de inyector tórica reseca o fuga en la válvula de llenado de gas. ¡Peligro de incendio inminente!',
            type: 'danger'
          },
          {
            title: 'Arranque dificultoso en frío y ralentí muy inestable',
            desc: 'Inyectores sucios o goteando que ahogan la cámara, o filtro de combustible colmatado.',
            type: 'warning'
          },
          {
            title: 'Tirones específicos solo al pasar el vehículo a modo Gas',
            desc: 'Filtro de fase gaseosa de GLP obturado o presión insuficiente del reductor.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Sustitución del filtro de combustible / filtros de gas (líquido y gaseoso)', interval: 'Cada 30.000 - 45.000 km', tip: 'Evita apurar el depósito en reserva para no aspirar los posos e impurezas del fondo.' },
          { action: 'Revisión estanqueidad del circuito de Gas y prueba de presión', interval: 'Anual o en cada revisión técnica obligatoria', tip: 'Los depósitos de GNC tienen caducidad estricta y deben ser retimados periódicamente.' }
        ],
        comparison: 'En motos pequeñas se usaban carburadores por depresión; hoy en día las motos de uso diario adoptan inyección electrónica compacta de circuito cerrado con sensor de oxígeno.'
      },
      {
        id: 'comb_steering',
        name: 'Dirección Asistida y Rótulas',
        category: 'chasis',
        categoryName: 'Chasis y Suspensión',
        icon: '🧭',
        coords: { x: 310, y: 345 },
        badgeNum: 10,
        severity: 'critico',
        shortDesc: 'Transmite el giro del volante a las ruedas directrices con mínimo esfuerzo.',
        function: 'La columna de dirección transmite el movimiento del conductor a una cremallera dentada. Un motor eléctrico (asistencia EPS) o una bomba hidráulica asistida por correa reduce drásticamente el esfuerzo necesario para maniobrar. Las rótulas axiales y terminales articulan el movimiento permitiendo que las ruedas oscilen verticalmente con la suspensión.',
        symptoms: [
          {
            title: 'Volante extremadamente duro de girar o testigo de volante con exclamación',
            desc: 'Fallo de la servodirección eléctrica (motor EPS o sensor de par) o correa/líquido hidráulico agotado.',
            type: 'danger'
          },
          {
            title: 'Holgura en el volante y el coche se desvía hacia un lado al soltarlo',
            desc: 'Rótula de dirección desgastada con juego mecánico o desalineación de cotas de geometría (paralelo).',
            type: 'warning'
          },
          {
            title: 'Chasquido "clac" al girar la dirección en parado',
            desc: 'Copela superior de suspensión gripada o junta homocinética de transmisión dañada.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Alineación de dirección (paralelo y caídas)', interval: 'Al cambiar neumáticos o tras golpear un bordillo con fuerza', tip: 'Una dirección desalineada desgasta los neumáticos irregularmente en menos de 5.000 km.' },
          { action: 'Inspección de guardapolvos de goma de la cremallera y rótulas', interval: 'En cada revisión anual', tip: 'Si un fuelle se raja, entra tierra y agua destruyendo la rótula en pocos días.' }
        ],
        comparison: 'En motocicletas no existe caja ni asistencia de dirección: la dirección es directa a través de la tija y los rodamientos de la pipa de dirección del chasis.'
      }
    ]
  },

  electric: {
    id: 'electric',
    name: 'Coche Eléctrico (EV)',
    subtitle: 'Batería de Alto Voltaje, Motor Eléctrico, Inversor y Freno Regenerativo',
    icon: '🔋',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'Los coches eléctricos puros (BEV) sustituyen el motor térmico por motores eléctricos de alto rendimiento, propulsados por una gran batería de iones de litio y gestionados por electrónica de potencia de alta eficiencia.',
    components: [
      {
        id: 'ev_battery_pack',
        name: 'Batería de Alta Tensión (Traction Battery & BMS)',
        category: 'electrico',
        categoryName: 'Propulsión y Energía Eléctrica',
        icon: '🔋',
        coords: { x: 500, y: 300 },
        badgeNum: 1,
        severity: 'critico',
        shortDesc: 'Almacén energético principal de 400V a 800V que alimenta todo el vehículo.',
        function: 'Es un paquete compuesto por cientos o miles de celdas electroquímicas (NMC o LFP) encapsuladas bajo el suelo del chasis en una carcasa blindada. El BMS (Battery Management System) es su "cerebro": monitoriza milivoltio a milivoltio la tensión, temperatura y resistencia interna de cada módulo de celdas para evitar sobrecargas, descargas profundas y sobrecalentamientos.',
        symptoms: [
          {
            title: 'Disminución drástica e inesperada de la autonomía estimada (SoH bajo)',
            desc: 'Degradación excesiva de celdas o desbalance de voltaje entre los módulos del pack.',
            type: 'warning'
          },
          {
            title: 'Corte de potencia ("Modo Tortuga") en fuertes aceleraciones',
            desc: 'La temperatura del pack se ha elevado por encima del límite de seguridad o la tensión mínima de una celda se desploma.',
            type: 'danger'
          },
          {
            title: 'El vehículo rechaza iniciar la carga rápida en corriente continua (DC)',
            desc: 'Fallo de aislamiento de alto voltaje, contactores principales soldados o fallo del BMS.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Gestión de recarga diaria entre el 20% y el 80%', interval: 'Práctica cotidiana recomendada (química NMC)', tip: 'Cargar al 100% solo antes de viajes largos reduce drásticamente el estrés celular y prolonga su vida útil por encima de los 300.000 km.' },
          { action: 'Evitar dejar el vehículo estacionado semanas al 0% o al 100%', interval: 'Almacenamiento prolongado', tip: 'En paradas largas mantén la batería en torno al 50% en un lugar templado.' }
        ],
        comparison: 'Aporta entre el 20% y el 35% del peso total del vehículo y baja radicalmente el centro de gravedad del coche respecto a uno de combustión, mejorando el aplomo en curvas.'
      },
      {
        id: 'ev_motor',
        name: 'Motor Eléctrico de Tracción',
        category: 'motor',
        categoryName: 'Propulsión y Energía Eléctrica',
        icon: '⚡',
        coords: { x: 300, y: 300 },
        badgeNum: 2,
        severity: 'critico',
        shortDesc: 'Convierte la energía eléctrica en movimiento con par instantáneo y >90% de eficiencia.',
        function: 'Generalmente un motor síncrono de imanes permanentes (PMSM) o de inducción asíncrono. Cuando el inversor introduce corriente alterna trifásica en los bobinados del estator, se genera un campo magnético giratorio que arrastra el rotor. No necesita ralentí, entrega su par motor máximo desde cero revoluciones por minuto y alcanza hasta 18.000 RPM.',
        symptoms: [
          {
            title: 'Silbido o zumbido agudo inusual en aceleración o retención',
            desc: 'Desgaste en los rodamientos cerámicos de alta velocidad del rotor o interferencia electromagnética por bobinado.',
            type: 'warning'
          },
          {
            title: 'Tirones o desconexión momentánea de tracción',
            desc: 'Fallo en el resolver (sensor de ángulo de rotor) que descoordina la sincronización de fases del inversor.',
            type: 'danger'
          },
          {
            title: 'Alerta de sobrecalentamiento del tren motriz eléctrico',
            desc: 'Caudal insuficiente en el circuito de refrigeración de la carcasa del estator.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Comprobación de estanqueidad y refrigerante dieléctrico', interval: 'Cada 40.000 - 60.000 km', tip: 'Prácticamente no requiere mantenimiento mecánico rutinario: no tiene bujías, correas ni filtros de aceite.' },
          { action: 'Revisión de aislamiento de bobinados mediante diagnóstico OBD-EV', interval: 'En cada revisión oficial', tip: 'Verifica que la resistencia de aislamiento entre el estator y masa supere los megaohmios reglamentarios.' }
        ],
        comparison: 'Frente a los motores térmicos que pierden el 70% de su energía en forma de calor residual, el motor eléctrico aprovecha más del 92% de la electricidad consumida.'
      },
      {
        id: 'ev_inverter',
        name: 'Inversor y Electrónica de Potencia',
        category: 'electrico',
        categoryName: 'Propulsión y Energía Eléctrica',
        icon: '🎛️',
        coords: { x: 340, y: 240 },
        badgeNum: 3,
        severity: 'critico',
        shortDesc: 'Transforma la corriente continua de la batería en corriente alterna trifásica para el motor.',
        function: 'Utiliza transistores de conmutación ultra-rápida de carburo de silicio (SiC) o IGBTs para modular la corriente continua (DC) de la batería en pulsos de corriente alterna (AC trifásica) con frecuencia y amplitud variables. En frenadas regenerativas, invierte el flujo: transforma la AC del motor en DC para recargar la batería.',
        symptoms: [
          {
            title: 'Aviso de "Sistema Eléctrico de Alta Tensión - Detenga el vehículo"',
            desc: 'Fallo en la conmutación de un módulo de transistores SiC/IGBT o cortocircuito de fase.',
            type: 'danger'
          },
          {
            title: 'El vehículo no acelera a pesar de estar en posición "Drive"',
            desc: 'Pérdida de comunicación vía bus CAN/Ethernet automotriz entre la ECU central y el controlador del inversor.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Inspección de conexiones de cables naranjas de alto voltaje', interval: 'En cada mantenimiento programado', tip: '¡ADVERTENCIA! Los cables naranjas transportan tensiones letales (>400V). Solo personal certificado con guantes aislantes clase 0 puede manipularlos.' }
        ],
        comparison: 'Equivale a la combinación del carburador/inyección y la distribución de un coche de gasolina, pero operando a la velocidad de la luz mediante microchips.'
      },
      {
        id: 'ev_thermal_sys',
        name: 'Sistema de Gestión Térmica de Batería (BMS Cooling)',
        category: 'refrigeracion',
        categoryName: 'Refrigeración y Climatización',
        icon: '❄️',
        coords: { x: 230, y: 300 },
        badgeNum: 4,
        severity: 'alto',
        shortDesc: 'Mantiene la batería en su rango ideal de temperatura (20°C a 35°C).',
        function: 'Consiste en un circuito cerrado con bomba eléctrica, líquido refrigerante especial de baja conductividad (agua glicolada o dieléctrica) y placas de refrigeración intercaladas entre las celdas. En invierno calienta la batería mediante calefactores resistivos PTC o bomba de calor; en verano la enfría mediante un intercambiador acoplado al aire acondicionado.',
        symptoms: [
          {
            title: 'Velocidad de carga en punto rápido (DC) muy lenta ("Coldgate" o "Rapidgate")',
            desc: 'La batería está demasiado fría o demasiado caliente y el sistema limita los kilovatios de carga para proteger las celdas de dendritas de litio.',
            type: 'warning'
          },
          {
            title: 'Fuga de líquido refrigerante azul/rosa bajo la plataforma central',
            desc: 'Daño en los conectores de las placas térmicas por impacto de piedras en los bajos.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Cambio de líquido refrigerante específico de baja conductividad', interval: 'Cada 4 a 6 años (según fabricante, ej. Hyundai Blue Coolant)', tip: 'Utiliza únicamente fluidos con propiedades no conductoras para evitar riesgos en caso de filtración interna en el pack.' }
        ],
        comparison: 'A diferencia de un coche térmico cuyo radiador solo enfría, el circuito térmico del coche eléctrico es bidireccional: calienta la batería en climas bajo cero y la refrigera en recargas ultrarrápidas.'
      },
      {
        id: 'ev_regen_brakes',
        name: 'Freno Regenerativo e Hidráulico (i-Booster)',
        category: 'frenos',
        categoryName: 'Frenado y Seguridad Activa',
        icon: '🛑',
        coords: { x: 270, y: 400 },
        badgeNum: 5,
        severity: 'critico',
        shortDesc: 'Frena el coche transformando la inercia en electricidad limpia.',
        function: 'Al levantar el pie del acelerador o pisar suavemente el freno, el motor eléctrico cambia a modo generador, oponiendo resistencia electromagnética y recuperando hasta un 30% de la energía gastada. Si se requiere una frenada de pánico, un servofreno electromecánico (i-Booster) acopla sin saltos las pinzas y discos hidráulicos convencionales.',
        symptoms: [
          {
            title: 'Óxido visible y ruidos de rozamiento en los discos tras semanas de uso',
            desc: 'Al usar casi exclusivamente el freno regenerativo, los discos de fricción no se limpian solos.',
            type: 'alert'
          },
          {
            title: 'Sensación extraña de tacto en el pedal durante la transición de regenerativo a hidráulico',
            desc: 'Calibración deficiente del software del simulador de pedal de freno (Brake-by-Wire).',
            type: 'warning'
          }
        ],
        maintenance: [
          { action: 'Realizar frenadas fuertes controladas periódicamente', interval: 'Una vez cada 2 semanas en zona segura', tip: 'Obliga al sistema a usar los frenos hidráulicos, limpiando el óxido de las pistas de los discos.' },
          { action: 'Cambio de líquido de frenos DOT 4 LV (baja viscosidad para ESP)', interval: 'Cada 2 años', tip: 'Crucial para el correcto funcionamiento de las válvulas de alta frecuencia del ABS/ESP.' }
        ],
        comparison: 'En un coche eléctrico las pastillas de freno pueden durar fácilmente más de 120.000 a 150.000 km gracias a la regeneración motriz.'
      },
      {
        id: 'ev_transmission',
        name: 'Reductora de 1 Velocidad (Single-Speed Gearbox)',
        category: 'transmision',
        categoryName: 'Transmisión y Embrague',
        icon: '⚙️',
        coords: { x: 420, y: 300 },
        badgeNum: 6,
        severity: 'moderado',
        shortDesc: 'Reduce las altas revoluciones del motor a la velocidad de giro de las ruedas.',
        function: 'Una caja de engranajes helicoidales fijos con una relación aproximada de 8:1 a 10:1 (por cada 10 vueltas del motor eléctrico, las ruedas dan una vuelta). Incluye un diferencial abierto o autoblocante y un mecanismo de trinquete de bloqueo de estacionamiento (Parking Pawl). No requiere embrague ni cambios de marchas.',
        symptoms: [
          {
            title: 'Zumbido o traqueteo constante al rodar a baja velocidad',
            desc: 'Degradación del aceite lubricante sintético de la reductora o desgaste en los dientes de los piñones helicoidales.',
            type: 'warning'
          },
          {
            title: 'El coche no enclava la posición "P" en pendientes',
            desc: 'Actuador solenoide del trinquete de parking atascado o roto.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Cambio de aceite de la transmisión reductora', interval: 'Cada 80.000 - 100.000 km', tip: 'Aunque algunos fabricantes digan "sealed for life", sustituir el litro de aceite sintético prolonga la suavidad y vida de los engranajes.' }
        ],
        comparison: 'Al no tener marchas, la aceleración de un coche eléctrico es completamente continua, suave y sin interrupción de par (*torque dip*).'
      },
      {
        id: 'ev_charger',
        name: 'Cargador a Bordo (OBC) y Puerto de Carga',
        category: 'electrico',
        categoryName: 'Propulsión y Energía Eléctrica',
        icon: '🔌',
        coords: { x: 740, y: 330 },
        badgeNum: 7,
        severity: 'alto',
        shortDesc: 'Permite conectar el coche a la red eléctrica doméstica o pública.',
        function: 'El conector (ej. CCS Combo 2) recibe corriente alterna (AC de la pared/Wallbox) o continua (DC de cargador rápido). Si es AC, el cargador embarcado (OBC de 7.4 kW u 11 kW) rectifica la corriente de 230V a la tensión de la batería. Si es DC rápida, los contactores conectan directamente el cargador exterior con la batería de alta tensión sin pasar por el OBC.',
        symptoms: [
          {
            title: 'El puerto parpadea en rojo y la manguera de carga queda bloqueada',
            desc: 'Fallo en el pin de comunicación piloto (CP) o bloqueo mecánico del actuador del conector.',
            type: 'warning'
          },
          {
            title: 'Disparo constante del diferencial del cuadro eléctrico de la casa al enchufar',
            desc: 'Fuga de corriente a tierra en el cargador a bordo (OBC) del vehículo o en el cable Mennekes.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Inspección visual de pines del puerto de carga', interval: 'Periódicamente', tip: 'Mantén la tapa del conector siempre cerrada cuando no cargues; la humedad o suciedad en los pines causa fallos de comunicación.' }
        ],
        comparison: 'Sustituye a la boca del depósito de combustible de los coches térmicos.'
      },
      {
        id: 'ev_dcdc_aux',
        name: 'Convertidor DC-DC y Batería Auxiliar 12V',
        category: 'electrico',
        categoryName: 'Sistema Eléctrico',
        icon: '⚡',
        coords: { x: 260, y: 220 },
        badgeNum: 8,
        severity: 'alto',
        shortDesc: 'Alimenta los ordenadores, faros, airbags y relés de seguridad a 12V.',
        function: 'El convertidor DC-DC reduce la alta tensión (400V) a una tensión segura de 12V-14V para cargar una batería pequeña de 12V y alimentar los componentes estándar del automóvil: dirección asistida, centralitas ECU, pantallas, faros LED y el sistema de emergencia eCall.',
        symptoms: [
          {
            title: 'El coche no abre con el mando a distancia ni arranca, a pesar de tener la batería principal al 80%',
            desc: 'La batería auxiliar de 12V se ha descargado completamente, impidiendo cerrar los relés principales de alta tensión.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Sustitución preventiva de la batería de 12V', interval: 'Cada 3 a 4 años', tip: 'La causa número 1 de llamadas a grúa en coches eléctricos es la batería auxiliar de 12V descargada.' }
        ],
        comparison: 'Hace el trabajo que en el coche de gasolina hacía el alternador mecánico accionado por correa.'
      },
      {
        id: 'ev_suspension',
        name: 'Suspensión Reforzada para Vehículo Eléctrico',
        category: 'chasis',
        categoryName: 'Chasis y Suspensión',
        icon: '🛞',
        coords: { x: 700, y: 400 },
        badgeNum: 9,
        severity: 'alto',
        shortDesc: 'Absorbe el impacto de un vehículo sensiblemente más pesado con calibración adaptativa.',
        function: 'Debido al peso del paquete de baterías (que añade entre 300 kg y 600 kg extra respecto a un coche térmico similar), los brazos de suspensión, muelles, copelas y silentblocks están sobredimensionados y reforzados. Con frecuencia incorpora amortiguación neumática o adaptativa electrónica para controlar las inercias dinámicas en curvas.',
        symptoms: [
          {
            title: 'Desgaste acelerado o "diente de sierra" en la banda interior de los neumáticos',
            desc: 'La masa del coche y el tremendo par motor instantáneo desgastan las gomas hasta un 30% más rápido si la alineación no es perfecta.',
            type: 'warning'
          },
          {
            title: 'Crujidos secos en badenes',
            desc: 'Fatiga prematura en silentblocks de los brazos inferiores por sobrecarga.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Rotación periódica de neumáticos de eje', interval: 'Cada 10.000 - 12.000 km', tip: 'Utiliza neumáticos con homologación "EV" (con flancos reforzados y espuma acústica interna).' }
        ],
        comparison: 'Requiere calibración específica para soportar transferencias de masa violentas sin comprometer la seguridad de la carcasa inferior de las baterías.'
      }
    ]
  },

  moto: {
    id: 'moto',
    name: 'Moto Urbana / de Uso Diario',
    subtitle: 'Motor Monocilíndrico 4T, Inyección/Carburador, Transmisión por Cadena/CVT y Frenado Ligero',
    icon: '🛵',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Las motocicletas y scooters de uso diario (125cc a 300cc) combinan agilidad, ligereza y eficiencia para el transporte urbano, con componentes mecánicos expuestos que requieren inspección visual frecuente.',
    components: [
      {
        id: 'moto_engine',
        name: 'Motor Monocilíndrico 4 Tiempos (125cc - 300cc)',
        category: 'motor',
        categoryName: 'Motor y Potencia',
        icon: '⚙️',
        coords: { x: 450, y: 350 },
        badgeNum: 1,
        severity: 'critico',
        shortDesc: 'Propulsor compacto de alta eficiencia con cárter compartido de lubricación.',
        function: 'Un único cilindro con pistón de carrera corta y culata de 2 o 4 válvulas movidas por árbol de levas en cabeza (SOHC). En casi todas las motos con cambio manual, el mismo aceite del motor baña también la caja de cambios y los discos de embrague (cárter húmedo compartido). Opera a regímenes altos (entre 6.000 y 10.000 RPM).',
        symptoms: [
          {
            title: 'Humo blanco con olor a aceite quemado en retenciones',
            desc: 'Guías de válvula gastadas o aros de compresión/fuego con exceso de tolerancia.',
            type: 'warning'
          },
          {
            title: 'Ruido metálico tipo "máquina de coser" en la parte alta de la culata',
            desc: 'Holgura excesiva de válvulas; requiere reglaje de taqués con galga de espesores.',
            type: 'alert'
          },
          {
            title: 'El embrague patina al acelerar con fuerza en marchas altas',
            desc: 'Uso erróneo de aceite de coche con aditivos antifricción en lugar de aceite específico para moto con certificación JASO MA2.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Cambio de aceite de motor específico JASO MA2', interval: 'Cada 3.000 - 5.000 km (en scooters cada 4.000 km)', tip: 'Las motos urbanas llevan muy poco aceite (apenas 0.9L a 1.2L); vigilar el nivel por el ojo de buey es vital.' },
          { action: 'Reglaje de holgura de válvulas', interval: 'Cada 10.000 - 15.000 km', tip: 'Válvulas pisadas provocan pérdidas de compresión, dificultad de arranque en frío y válvulas quemadas.' }
        ],
        comparison: 'A diferencia de los coches, el cárter de la moto lubrica tanto el motor térmico como los discos sumergidos del embrague.'
      },
      {
        id: 'moto_transmission',
        name: 'Transmisión Secundaria (Cadena o Variador CVT)',
        category: 'transmision',
        categoryName: 'Transmisión y Embrague',
        icon: '⛓️',
        coords: { x: 370, y: 410 },
        badgeNum: 2,
        severity: 'alto',
        shortDesc: 'Transfiere la fuerza del motor a la rueda trasera.',
        function: 'En motos de marchas: conjunto de piñón de ataque, cadena de eslabones con retenes de estanqueidad (O-Ring / X-Ring) y corona dentada trasera. En scooters: variador continuo (CVT) con poleas cónicas, rodillos centrífugos, embrague centrífugo seco y correa trapezoidal reforzada de aramida.',
        symptoms: [
          {
            title: 'Tirones bruscos al abrir gas o golpes en la tapa del basculante',
            desc: 'Cadena con holgura excesiva (destensada) o eslabones agarrotados por falta de grasa.',
            type: 'warning'
          },
          {
            title: 'Dientes de la corona curvados con forma de "aleta de tiburón"',
            desc: 'Kit de arrastre desgastado al límite de su vida útil; peligro de salida o rotura de cadena.',
            type: 'danger'
          },
          {
            title: 'En scooter: vibraciones fuertes y pérdidas de aceleración punta',
            desc: 'Rodillos del variador "aplanados" o correa de transmisión desgastada.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Limpieza, lubricación y ajuste de tensión de la cadena', interval: 'Cada 500 - 1.000 km (o tras circular bajo lluvia intensa)', tip: 'Mantén una flecha de holgura de entre 2.5 cm y 3.5 cm medida en el punto medio del basculante.' },
          { action: 'Sustitución de correa y rodillos en scooters', interval: 'Cada 10.000 - 15.000 km', tip: 'Si la correa se parte en marcha, la moto se queda sin tracción instantáneamente.' }
        ],
        comparison: 'La cadena de moto trabaja a la intemperie expuesta a agua, barro y salinidad, exigiendo mucho más cuidado manual que la transmisión sellada de un automóvil.'
      },
      {
        id: 'moto_forks',
        name: 'Horquilla Telescópica y Monoamortiguador',
        category: 'chasis',
        categoryName: 'Chasis y Suspensión',
        icon: '🏍️',
        coords: { x: 740, y: 350 },
        badgeNum: 3,
        severity: 'critico',
        shortDesc: 'Determina la estabilidad, el paso por curva y el control de la dirección.',
        function: 'Delante: dos barras de acero cromado que se deslizan dentro de botellas de aluminio que albergan muelles y aceite hidráulico de amortiguación (fork oil). Detrás: basculante oscilante soportado por un monoamortiguador hidráulico central (o dos amortiguadores laterales en scooters) con ajuste de precarga.',
        symptoms: [
          {
            title: 'Anillo de aceite húmedo y suciedad acumulada en las barras de la horquilla',
            desc: 'Retenes de horquilla agrietados o barra rayada por impacto de gravilla; el aceite puede escurrir hasta las pastillas de freno, dejándote sin frenos.',
            type: 'danger'
          },
          {
            title: 'La moto "flanea" o se muestra inestable en curvas rápidas',
            desc: 'Pérdida de amortiguación hidráulica trasera o presión de neumáticos incorrecta.',
            type: 'warning'
          }
        ],
        maintenance: [
          { action: 'Limpieza de las barras de horquilla con paño suave', interval: 'Tras cada lavado o ruta', tip: 'Elimina mosquitos e impurezas secas antes de que desgarren el labio de goma del retén.' },
          { action: 'Sustitución de retenes, guardapolvos y aceite de horquilla', interval: 'Cada 20.000 - 30.000 km o cada 2-3 años', tip: 'Usa la densidad correcta (ej. SAE 10W) para conservar la dureza original de fábrica.' }
        ],
        comparison: 'En una moto, las horquillas hacen tanto la función de suspensión como de columna de dirección a través de la pipa del chasis.'
      },
      {
        id: 'moto_brakes',
        name: 'Frenos de Disco y Sistema Combinado (CBS / ABS)',
        category: 'frenos',
        categoryName: 'Frenado y Seguridad Activa',
        icon: '🛑',
        coords: { x: 780, y: 440 },
        badgeNum: 4,
        severity: 'critico',
        shortDesc: 'Detiene la motocicleta de forma controlada sin bloquear la rueda delantera.',
        function: 'La maneta derecha acciona la bomba delantera y el pistón aprieta las pastillas contra el disco perforado de la rueda delantera (responsable del 70% de la potencia de frenado). En motos de 125cc urbanas, la normativa exige CBS (frenada combinada que reparte presión a ambos ejes al tocar el freno trasero) o ABS antibloqueo monocanal/doble canal.',
        symptoms: [
          {
            title: 'Tacto esponjoso en la maneta que toca el puño del acelerador',
            desc: 'Burbujas de aire en el latiguillo de freno o fuga en los retenes de la bomba.',
            type: 'danger'
          },
          {
            title: 'Chirrido penetrante al detenerse en semáforos',
            desc: 'Pastillas cristalizadas por calor o ferodo gastado al límite.',
            type: 'warning'
          },
          {
            title: 'Vibración rítmica en la maneta al frenar suavemente',
            desc: 'Disco de freno alabado por un bloqueo de pinza o por arrancar con el candado de disco puesto.',
            type: 'alert'
          }
        ],
        maintenance: [
          { action: 'Inspección de espesor de pastillas de freno', interval: 'Cada 3.000 km', tip: 'En motos las pastillas son pequeñas y se desgastan en apenas 6.000 - 12.000 km de tráfico urbano intenso.' },
          { action: 'Sustitución de líquido de frenos DOT 4', interval: 'Cada 2 años', tip: 'El reducido volumen del depósito de maneta hace que se degrade con gran rapidez.' }
        ],
        comparison: 'Un bloqueo de rueda delantera en moto por falta de ABS suele provocar una caída instantánea, a diferencia de un derrape en coche.'
      },
      {
        id: 'moto_cooling',
        name: 'Refrigeración (Líquida o Aire Forzado)',
        category: 'refrigeracion',
        categoryName: 'Refrigeración y Climatización',
        icon: '❄️',
        coords: { x: 570, y: 340 },
        badgeNum: 5,
        severity: 'alto',
        shortDesc: 'Controla la temperatura térmica del cilindro en atascos y semáforos.',
        function: 'En motos de aire: aletas exteriores en el cilindro y culata para evacuar calor (con ventilador en scooters). En motos de agua: radiador frontal compacto protegido con rejilla, termostato, electroventilador miniatura y circuito de líquido anticongelante.',
        symptoms: [
          {
            title: 'Testigo rojo de temperatura parpadeando en el cuadro digital',
            desc: 'Nivel bajo en el vaso de expansión, termostato atascado o electroventilador quemado.',
            type: 'danger'
          },
          {
            title: 'Goteo verde/rosa en la parte baja del motor',
            desc: 'Fallo del retén cerámico de la bomba de agua.',
            type: 'warning'
          }
        ],
        maintenance: [
          { action: 'Limpiar insectos y piedras atrapados en las aletas del radiador', interval: 'En cada lavado', tip: 'Usa agua a baja presión; nunca apuntes con hidrolavadoras a presión directa a las delicadas aletas de aluminio.' },
          { action: 'Reemplazo del anticongelante', interval: 'Cada 2 años', tip: 'Previene la cavitación de la bomba y la corrosión de la camisa del cilindro.' }
        ],
        comparison: 'En motos urbanas de aire, estar parado 15 minutos en un atasco veraniego eleva peligrosamente la temperatura del aceite al no haber corriente de aire.'
      },
      {
        id: 'moto_fuel',
        name: 'Inyección Electrónica (EFI) o Carburador',
        category: 'motor',
        categoryName: 'Motor y Potencia',
        icon: '⛽',
        coords: { x: 490, y: 300 },
        badgeNum: 6,
        severity: 'alto',
        shortDesc: 'Pulveriza la mezcla óptima de aire y gasolina para el monocilíndrico.',
        function: 'En modelos modernos (Euro 4 y Euro 5), una centralita ECU lee sensores de temperatura de motor, posición del acelerador (TPS) y sonda lambda para inyectar la dosis exacta de gasolina a través de un cuerpo de mariposa. En motos clásicas, un carburador mecánico atomiza la gasolina por efecto Venturi.',
        symptoms: [
          {
            title: 'La moto se cala al ralentí en los semáforos o ahoga al acelerar',
            desc: 'Cuerpo de inyección o válvula de ralentí (IACV) con carbonilla, o chiclé de baja sucio en carburador.',
            type: 'warning'
          },
          {
            title: 'Huele fuertemente a gasolina con la moto parada en garaje',
            desc: 'Aguja de flotador del carburador trabada o tubo de sobrante de gasolina goteando.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Limpieza y soplado del filtro de aire de admisión', interval: 'Cada 4.000 - 6.000 km', tip: 'Un filtro de aire tupido de polución urbana asfixia el motor y dispara el consumo de combustible.' },
          { action: 'No dejar gasolina vieja en la cuba si la moto estará parada meses', interval: 'Antes del invierno', tip: 'La gasolina con etanol se descompone y crea un barniz verdoso que tapona los conductos finos.' }
        ],
        comparison: 'El filtro de aire de moto está muy expuesto a la suciedad levantada por el tráfico urbano respecto a las cajas de filtro estancas de los coches.'
      },
      {
        id: 'moto_battery',
        name: 'Batería de Gel / AGM y Regulador-Rectificador',
        category: 'electrico',
        categoryName: 'Sistema Eléctrico',
        icon: '🔋',
        coords: { x: 440, y: 250 },
        badgeNum: 7,
        severity: 'alto',
        shortDesc: 'Suministra energía al motor de arranque y estabiliza el voltaje.',
        function: 'Batería compacta de 12V y baja capacidad (4Ah a 9Ah). Un alternador trifásico de volante magnético genera corriente con las revoluciones del motor, y el regulador-rectificador con aletas de disipación convierte esa corriente en continua (~14.2V) recortando los picos de tensión.',
        symptoms: [
          {
            title: 'El cuadro se apaga por completo al pulsar el botón de arranque "Start"',
            desc: 'Batería agotada por inactividad o consumo parásito de una alarma o localizador GPS.',
            type: 'warning'
          },
          {
            title: 'Las bombillas se funden con frecuencia y la batería hierve o se hincha',
            desc: 'Regulador-rectificador averiado que envía más de 16V al circuito por fallo de los diodos zener.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Conectar un mantenedor de batería inteligente si no se usa a diario', interval: 'Paradas de más de 10 días', tip: 'Las baterías de moto tienen muy pocos amperios-hora y se descargan en pocas semanas de inactividad.' }
        ],
        comparison: 'Mucho más propensa a descargarse por inactividad que la de un coche debido a su diminuto tamaño.'
      },
      {
        id: 'moto_exhaust',
        name: 'Tubo de Escape y Silenciador Catalizado',
        category: 'escape',
        categoryName: 'Escape y Emisiones',
        icon: '💨',
        coords: { x: 260, y: 440 },
        badgeNum: 8,
        severity: 'moderado',
        shortDesc: 'Canaliza los gases tóxicos, atenúa el sonido y protege de quemaduras.',
        function: 'Colector de acero inoxidable fijado a la salida de culata con una junta de cobre. Integra la sonda lambda para regular la inyección, un catalizador cerámico y el silencioso con laberinto de cámaras y fibra fonoabsorbente. Dispone de protectores antitérmicos para evitar quemaduras al piloto o acompañante.',
        symptoms: [
          {
            title: 'Petardeos fuertes al cortar gas o retener en bajadas',
            desc: 'Toma de aire parásito en la junta de escape con la culata o mezcla excesivamente pobre.',
            type: 'alert'
          },
          {
            title: 'Sonido metálico tintineante dentro del silencioso',
            desc: 'Celdas del catalizador desprendidas o tabique interno desoldado.',
            type: 'warning'
          }
        ],
        maintenance: [
          { action: 'Inspeccionar apriete de las tuercas del colector en la culata', interval: 'En cada revisión', tip: 'Comprueba el estado de la chapa anticalórica para no quemar pantalones ni el calzado.' }
        ],
        comparison: 'En la moto el escape está totalmente expuesto al alcance de las piernas y las salpicaduras de agua directa.'
      },
      {
        id: 'moto_controls',
        name: 'Puesto de Mando, Manillar y Cables',
        category: 'chasis',
        categoryName: 'Chasis y Suspensión',
        icon: '🧭',
        coords: { x: 670, y: 190 },
        badgeNum: 9,
        severity: 'critico',
        shortDesc: 'Interfaz táctil del piloto para dirigir, acelerar, embragar e iluminar.',
        function: 'Estructura tubular con torretas sujeta a la tija superior. Alberga el puño del acelerador con cables de tiro y retorno (o acelerador electrónico Ride-by-Wire), manetas ergonómicas, piñas de mandos conmutadores y cuadro de instrumentos digital con velocímetro y testigos de avería.',
        symptoms: [
          {
            title: 'El acelerador no retorna instantáneamente al soltarlo (se queda trabado)',
            desc: 'Cable de acelerador deshilachado, suciedad en la caña del manillar o muelle de mariposa vencido. ¡Riesgo grave de accidente!',
            type: 'danger'
          },
          {
            title: 'Dirección con un "punto muerto" o encallamiento al pasar por el centro',
            desc: 'Rodamientos cónicos de la pista de dirección marcados o apretados en exceso.',
            type: 'danger'
          }
        ],
        maintenance: [
          { action: 'Lubricación de cables con aceite fino de silicona', interval: 'Cada 6 meses', tip: 'Revisa siempre el juego libre del embrague (2-3 mm de holgura en la maneta).' },
          { action: 'Ajuste del ángulo de manetas y espejos retrovisores', interval: 'Antes de rodar', tip: 'Las manetas deben quedar en línea recta con los antebrazos para no fatigar las muñecas.' }
        ],
        comparison: 'A diferencia del volante del coche con dirección asistida, en la moto el control del piloto es directo, físico y determinante para el equilibrio dinámico.'
      }
    ]
  }
};
