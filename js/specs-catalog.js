// AutoFind Lab - Catálogo Local de Especificaciones y Consumo del Día a Día
// Proporciona datos de consumo homologado, capacidades de tanque/batería y tiempos de carga offline.

const VEHICLES_SPECS_CATALOG = [
  // =========================================================================
  // 1. VEHÍCULOS DE COMBUSTIÓN (GASOLINA / GAS / HÍBRIDOS)
  // =========================================================================
  {
    id: 'toyota_corolla',
    name: 'Toyota Corolla 2.0 / Hybrid',
    brand: 'Toyota',
    model: 'Corolla',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / Híbrido',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Toyota_Corolla_Hybrid_%28E210%29_IMG_4338.jpg/330px-Toyota_Corolla_Hybrid_%28E210%29_IMG_4338.jpg',
    engine: '2.0L 4 Cilindros Dual VVT-i (168 HP) / 1.8L Híbrido e-CVT',
    power: '140 - 168 HP',
    fuelType: 'Gasolina Regular (87+ Octanos) o Híbrido',
    consumption: {
      city: 15.2,
      hwy: 20.4,
      combined: 17.5,
      tankCapacityL: 50.0,
      estimatedRangeKm: 875,
      oilViscosity: '0W-16 / 0W-20 Full Synthetic',
      oilCapacityL: 4.2
    },
    co2Emissions: '102 - 128 g/km (Etiqueta ECO / C)',
    highlights: [
      'Uno de los sedanes más fiables y económicos en mantenimiento.',
      'Excelente consumo en ciclo mixto superando los 17 km/L reales.',
      'Cadena de distribución de por vida con cambios de aceite a tiempo.'
    ]
  },
  {
    id: 'nissan_versa',
    name: 'Nissan Versa 1.6L',
    brand: 'Nissan',
    model: 'Versa',
    yearRange: '2019 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/2011_Nissan_Versa_1.6_Sedan.jpg/330px-2011_Nissan_Versa_1.6_Sedan.jpg',
    engine: '1.6L 4 Cilindros DOHC HR16DE (118 HP)',
    power: '118 HP @ 6.000 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 14.0,
      hwy: 19.5,
      combined: 16.2,
      tankCapacityL: 41.0,
      estimatedRangeKm: 664,
      oilViscosity: '0W-20 / 5W-30 Sintético',
      oilCapacityL: 3.5
    },
    co2Emissions: '138 g/km (Etiqueta C)',
    highlights: [
      'El sedán subcompacto más vendido por su gran espacio interior y maletero.',
      'Depósito compacto de 41 L con costo de llenado muy asequible.',
      'Caja manual de 5 vel. o Xtronic CVT con modo Sport.'
    ]
  },
  {
    id: 'volkswagen_golf',
    name: 'Volkswagen Golf 1.5 TSI / 2.0 TDI',
    brand: 'Volkswagen',
    model: 'Golf',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / Diésel / eTSI',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg/330px-2020_Volkswagen_Golf_Style_1.5_Front.jpg',
    engine: '1.5L TSI EVO Turbo (130 / 150 HP) microhíbrido 48V',
    power: '130 - 150 HP',
    fuelType: 'Gasolina 95 Octanos / Diésel',
    consumption: {
      city: 14.8,
      hwy: 20.8,
      combined: 17.6,
      tankCapacityL: 50.0,
      estimatedRangeKm: 880,
      oilViscosity: 'VW 508.00 / 509.00 (0W-20 LongLife IV)',
      oilCapacityL: 4.3
    },
    co2Emissions: '122 g/km (Etiqueta ECO en versiones eTSI)',
    highlights: [
      'Referencia europea en dinámica de chasis e insonorización de cabina.',
      'Desconexión selectiva de cilindros (ACT) a velocidad de crucero para ahorrar.',
      'Gran autonomía en autopista que roza los 900 km por depósito.'
    ]
  },
  {
    id: 'volkswagen_jetta',
    name: 'Volkswagen Jetta 1.4 TSI',
    brand: 'Volkswagen',
    model: 'Jetta',
    yearRange: '2019 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Turbo',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/2019_Volkswagen_Jetta_1.4T_R-Line_in_Haba%C3%B1ero_Orange_Metallic%2C_front_right.jpg/330px-2019_Volkswagen_Jetta_1.4T_R-Line_in_Haba%C3%B1ero_Orange_Metallic%2C_front_right.jpg',
    engine: '1.4L TSI Turbo Intercooler 16V (150 HP)',
    power: '150 HP @ 5.000 RPM (250 Nm torque)',
    fuelType: 'Gasolina Regular / Premium',
    consumption: {
      city: 13.5,
      hwy: 19.2,
      combined: 15.8,
      tankCapacityL: 50.0,
      estimatedRangeKm: 790,
      oilViscosity: '5W-30 / 5W-40 Sintético (Norma VW 502.00)',
      oilCapacityL: 4.5
    },
    co2Emissions: '142 g/km (Etiqueta C)',
    highlights: [
      'Gran respuesta de aceleración desde bajas revoluciones gracias a sus 250 Nm.',
      'Amplio espacio para 5 pasajeros adultos y maletero de 510 litros.',
      'Transmisión Tiptronic de 8 velocidades con cambios suaves.'
    ]
  },
  {
    id: 'chevrolet_aveo',
    name: 'Chevrolet Aveo / Sail 1.5L',
    brand: 'Chevrolet',
    model: 'Aveo',
    yearRange: '2018 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/2012_Chevrolet_Aveo_LTZ_1.4_Front.jpg/330px-2012_Chevrolet_Aveo_LTZ_1.4_Front.jpg',
    engine: '1.5L 4 Cilindros DOHC 16V (98 HP)',
    power: '98 HP @ 5.800 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 14.5,
      hwy: 19.7,
      combined: 16.5,
      tankCapacityL: 45.0,
      estimatedRangeKm: 742,
      oilViscosity: '5W-30 dexos1 Gen 2 / Gen 3',
      oilCapacityL: 3.8
    },
    co2Emissions: '135 g/km (Etiqueta C)',
    highlights: [
      'Vehículo utilitario por excelencia con mantenimiento y recambios muy económicos.',
      'Rendimiento muy parejo tanto en ciudad como en carretera.',
      'Mecánica noble y comprobada de muy bajo costo de mano de obra.'
    ]
  },
  {
    id: 'seat_ibiza',
    name: 'SEAT Ibiza 1.0 TSI / MPI',
    brand: 'SEAT',
    model: 'Ibiza',
    yearRange: '2018 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / GNC Gas',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/2018_SEAT_Ibiza_SE_Technology_MPi_1.0_Front.jpg/330px-2018_SEAT_Ibiza_SE_Technology_MPi_1.0_Front.jpg',
    engine: '1.0L TSI 3 Cilindros Turbo (110 HP) / TGI Gas Natural',
    power: '80 - 110 HP',
    fuelType: 'Gasolina 95 / GNC (Gas Natural Vehicular)',
    consumption: {
      city: 15.6,
      hwy: 21.3,
      combined: 18.2,
      tankCapacityL: 40.0,
      estimatedRangeKm: 728,
      oilViscosity: '0W-20 / 5W-30 Full Synthetic',
      oilCapacityL: 4.0
    },
    co2Emissions: '118 g/km (Etiqueta ECO en versión GNC)',
    highlights: [
      'Comportamiento urbano ágil y gran facilidad de aparcamiento.',
      'Consumo mínimo que supera los 21 km/L en carretera.',
      'Disponible en variantes TGI que reducen el gasto por km en más de un 40%.'
    ]
  },
  {
    id: 'renault_duster',
    name: 'Renault Duster 1.3 Turbo / 1.6L',
    brand: 'Renault',
    model: 'Duster',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / GLP Gas',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Dacia_Duster_TCe_130_Extreme_%28III%29_%E2%80%93_f_13102024.jpg/330px-Dacia_Duster_TCe_130_Extreme_%28III%29_%E2%80%93_f_13102024.jpg',
    engine: '1.3L Turbo TCe (154 HP) desarrollado con Mercedes-Benz',
    power: '154 HP (250 Nm)',
    fuelType: 'Gasolina Regular / Adaptable a GLP',
    consumption: {
      city: 12.2,
      hwy: 16.8,
      combined: 14.1,
      tankCapacityL: 50.0,
      estimatedRangeKm: 705,
      oilViscosity: '5W-30 / 5W-40 RN0700 / RN0710',
      oilCapacityL: 4.8
    },
    co2Emissions: '156 g/km (Etiqueta C / ECO con GLP)',
    highlights: [
      'SUV todocamino robusto con excelente altura al suelo de 21 cm.',
      'Motor turbo moderno con gran par motor para adelantar con carga.',
      'Suspensión reforzada ideal para baches y caminos no asfaltados.'
    ]
  },
  {
    id: 'honda_civic',
    name: 'Honda Civic 2.0 e:HEV / 1.5 Turbo',
    brand: 'Honda',
    model: 'Civic',
    yearRange: '2021 - 2025',
    type: 'combustion',
    badgeText: 'Híbrido e:HEV / Gasolina',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Honda_Civic_e-HEV_Sport_%28XI%29_%E2%80%93_f_30062024.jpg/330px-Honda_Civic_e-HEV_Sport_%28XI%29_%E2%80%93_f_30062024.jpg',
    engine: '2.0L e:HEV Ciclo Atkinson con 2 Motores Eléctricos (184 HP)',
    power: '184 HP combinados',
    fuelType: 'Gasolina Regular / Híbrido Autorrecargable',
    consumption: {
      city: 20.8,
      hwy: 19.2,
      combined: 20.0,
      tankCapacityL: 40.0,
      estimatedRangeKm: 800,
      oilViscosity: '0W-20 Original Honda Genuine Oil',
      oilCapacityL: 3.7
    },
    co2Emissions: '108 g/km (Etiqueta ECO)',
    highlights: [
      'En ciudad rueda más del 70% del tiempo en modo eléctrico silencioso.',
      'Impresionante rendimiento de 20 km/L en entornos urbanos densos.',
      'Excelente valor de reventa y calidad de ensamblaje japonés.'
    ]
  },
  {
    id: 'mazda_3',
    name: 'Mazda 3 2.5L / e-Skyactiv G',
    brand: 'Mazda',
    model: 'Mazda 3',
    yearRange: '2019 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / Mild Hybrid',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Mazda3_SKYACTIV-G.jpg/330px-Mazda3_SKYACTIV-G.jpg',
    engine: '2.5L Skyactiv-G 4 Cilindros (186 HP) con microhibridación',
    power: '186 HP @ 6.000 RPM',
    fuelType: 'Gasolina Regular 87 Octanos',
    consumption: {
      city: 12.8,
      hwy: 18.1,
      combined: 14.9,
      tankCapacityL: 51.0,
      estimatedRangeKm: 760,
      oilViscosity: '0W-20 Skyactiv Technology',
      oilCapacityL: 4.5
    },
    co2Emissions: '145 g/km (Etiqueta ECO en versiones MHEV)',
    highlights: [
      'Acabados interiores prémium comparables con marcas de lujo alemanas.',
      'Motor atmosférico de respuesta lineal inmediata sin retardo de turbo.',
      'Afinación de chasis "Jinba Ittai" que conecta al conductor con el vehículo.'
    ]
  },
  {
    id: 'ford_ranger',
    name: 'Ford Ranger 2.0 / 2.3 EcoBoost',
    brand: 'Ford',
    model: 'Ranger',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Diésel / Gasolina Turbo',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Ford_Ranger_%28T6%2C_P703%29_Wildtrak_IMG_7320.jpg/330px-Ford_Ranger_%28T6%2C_P703%29_Wildtrak_IMG_7320.jpg',
    engine: '2.0L Bi-Turbo Diésel EcoBlue (210 HP) / 2.3L EcoBoost Gasolina',
    power: '170 - 270 HP',
    fuelType: 'Diésel con AdBlue / Gasolina Regular',
    consumption: {
      city: 9.8,
      hwy: 13.5,
      combined: 11.2,
      tankCapacityL: 80.0,
      estimatedRangeKm: 896,
      oilViscosity: '0W-30 / 5W-30 Motorcraft WSS-M2C950-A',
      oilCapacityL: 7.2
    },
    co2Emissions: '198 g/km (Etiqueta C)',
    highlights: [
      'Capacidad de carga superior a 1 tonelada y remolque de hasta 3.500 kg.',
      'Gran depósito de 80 L que permite travesías de larga distancia sin repostar.',
      'Tracción 4x4 conectable con reductora y bloqueo de diferencial trasero.'
    ]
  },
  {
    id: 'chevrolet_onix',
    name: 'Chevrolet Onix 1.0 Turbo',
    brand: 'Chevrolet',
    model: 'Onix',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Turbo',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/2022_Chevrolet_Onix_RS_1.0_Turbo.jpg/330px-2022_Chevrolet_Onix_RS_1.0_Turbo.jpg',
    engine: '1.0L Turbo 3 Cilindros DOHC (116 HP)',
    power: '116 HP (175 Nm)',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 16.2,
      hwy: 21.8,
      combined: 18.5,
      tankCapacityL: 44.0,
      estimatedRangeKm: 814,
      oilViscosity: '5W-30 dexos1 Gen 3',
      oilCapacityL: 3.5
    },
    co2Emissions: '118 g/km (Etiqueta C)',
    highlights: [
      'Motor turbo de 3 cilindros con excelente relación peso-potencia.',
      'Excelente consumo en carretera superando los 21 km/L reales.',
      '6 bolsas de aire y conectividad Wi-Fi OnStar.'
    ]
  },

  // =========================================================================
  // 2. VEHÍCULOS 100% ELÉCTRICOS (EV)
  // =========================================================================
  {
    id: 'tesla_model_3',
    name: 'Tesla Model 3 (Highland)',
    brand: 'Tesla',
    model: 'Model 3',
    yearRange: '2021 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (BEV)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg/330px-Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg',
    engine: 'Motor Eléctrico Trasero Síncrono de Imán Permanente (RWD) o Dual Motor AWD',
    power: '283 HP (RWD) / 498 HP (Long Range)',
    fuelType: '100% Eléctrico (Batería LFP 60 kWh o NCM 78 kWh)',
    consumption: {
      kwhPer100Km: 13.2,
      kmPerKwh: 7.57,
      batteryCapacityKwh: 60.0,
      estimatedRangeKm: 513,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 170.0,
      chargingTimes: {
        schuko23: '16 h (20% a 80% a 2.3 kW)',
        wallbox74: '4 h 50 min (20% a 80% a 7.4 kW)',
        fastChargeDc: '20 min (10% a 80% en Supercharger 170 kW)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'El sedán eléctrico más aerodinámico y eficiente del mercado (Cd 0.219).',
      'Acceso nativo a la red de Supercargadores con navegación predictiva de ruta.',
      'Consumo récord en autovía por debajo de 14 kWh cada 100 km.'
    ]
  },
  {
    id: 'tesla_model_y',
    name: 'Tesla Model Y',
    brand: 'Tesla',
    model: 'Model Y',
    yearRange: '2021 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (SUV)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Tesla_Model_Y_Premium_%28Facelift%29_%E2%80%93_f_05052026.jpg/330px-Tesla_Model_Y_Premium_%28Facelift%29_%E2%80%93_f_05052026.jpg',
    engine: 'Motor Eléctrico Trasero / Dual Motor Tracción Total (AWD)',
    power: '299 HP (RWD) / 514 HP (Long Range)',
    fuelType: '100% Eléctrico (Batería 60 kWh LFP / 78 kWh NCM)',
    consumption: {
      kwhPer100Km: 15.5,
      kmPerKwh: 6.45,
      batteryCapacityKwh: 75.0,
      estimatedRangeKm: 455,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 250.0,
      chargingTimes: {
        schuko23: '20 h (20% a 80% a 2.3 kW)',
        wallbox74: '6 h 10 min (20% a 80% a 7.4 kW)',
        fastChargeDc: '25 min (10% a 80% en Supercharger 250 kW)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'El coche más vendido del mundo en 2023 gracias a su polivalencia y habitabilidad.',
      'Maletero colosal de 854 L más maletero delantero (Frunk) de 117 L.',
      'Bomba de calor octovalve de ultra alta eficiencia en invierno.'
    ]
  },
  {
    id: 'byd_dolphin',
    name: 'BYD Dolphin EV',
    brand: 'BYD',
    model: 'Dolphin',
    yearRange: '2022 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (Urbano)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/2021_BYD_Dolphin_EV_%28front%29.jpg/330px-2021_BYD_Dolphin_EV_%28front%29.jpg',
    engine: 'Motor Síncrono de Imán Permanente Delantero (204 HP)',
    power: '204 HP (310 Nm)',
    fuelType: '100% Eléctrico (Batería Blade LFP 60.4 kWh)',
    consumption: {
      kwhPer100Km: 15.9,
      kmPerKwh: 6.28,
      batteryCapacityKwh: 60.4,
      estimatedRangeKm: 427,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 88.0,
      chargingTimes: {
        schuko23: '17 h (20% a 80% a 2.3 kW)',
        wallbox74: '5 h (20% a 80% a 7.4 kW)',
        fastChargeDc: '29 min (30% a 80% en toma DC 88 kW)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'Batería estructural Blade Battery (LFP) inmune a perforaciones térmicas.',
      'Excelente relación costo/autonomía superando los 420 km WLTP.',
      'Función de carga bidireccional V2L (Vehicle-to-Load) para alimentar electrodomésticos.'
    ]
  },
  {
    id: 'byd_seal',
    name: 'BYD Seal EV',
    brand: 'BYD',
    model: 'Seal',
    yearRange: '2023 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (Sedán Deportivo)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/2022_BYD_Seal.jpg/330px-2022_BYD_Seal.jpg',
    engine: 'Tracción Trasera (313 HP) o Tracción Total AWD (530 HP)',
    power: '313 - 530 HP',
    fuelType: '100% Eléctrico (Batería Blade CTB 82.5 kWh)',
    consumption: {
      kwhPer100Km: 16.6,
      kmPerKwh: 6.02,
      batteryCapacityKwh: 82.5,
      estimatedRangeKm: 570,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 150.0,
      chargingTimes: {
        schuko23: '22 h (20% a 80% a 2.3 kW)',
        wallbox74: '6 h 40 min (20% a 80% a 7.4 kW)',
        fastChargeDc: '26 min (30% a 80% en cargador 150 kW)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'Tecnología Cell-to-Body (CTB) donde la batería forma parte del chasis estructural.',
      'Aceleración de 0 a 100 km/h en 3.8 segundos en la versión Excellence AWD.',
      'Autonomía de 570 km WLTP ideal para viajes por autopista.'
    ]
  },
  {
    id: 'nissan_leaf',
    name: 'Nissan Leaf 40 / 62 kWh',
    brand: 'Nissan',
    model: 'Leaf',
    yearRange: '2018 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (Hatchback)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Leaf_%28ZE2%29_autoMOBIL_T%C3%BCbingen_2025_DSC_2752.jpg/330px-Nissan_Leaf_%28ZE2%29_autoMOBIL_T%C3%BCbingen_2025_DSC_2752.jpg',
    engine: 'Motor Eléctrico Delantero EM57 (150 HP / 217 HP en e+)',
    power: '150 - 217 HP',
    fuelType: '100% Eléctrico (Batería Iones de Litio 40 kWh / 62 kWh)',
    consumption: {
      kwhPer100Km: 17.1,
      kmPerKwh: 5.85,
      batteryCapacityKwh: 40.0,
      estimatedRangeKm: 270,
      maxChargeAcKw: 6.6,
      maxChargeDcKw: 50.0,
      chargingTimes: {
        schuko23: '11 h (20% a 80% a 2.3 kW)',
        wallbox74: '3 h 45 min (20% a 80% a 6.6 kW)',
        fastChargeDc: '40 min (20% a 80% en toma CHAdeMO 50 kW)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'Pionero mundial del coche eléctrico de gran volumen con mecánica superprobada.',
      'Sistema e-Pedal para conducir y frenar utilizando un solo pedal.',
      'Conector rápido CHAdeMO con soporte de energía bidireccional V2G (a la red).'
    ]
  },
  {
    id: 'hyundai_ioniq_5',
    name: 'Hyundai Ioniq 5',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    yearRange: '2021 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (Arquitectura 800V)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Hyundai_Ioniq_5_AWD_Techniq-Paket_%E2%80%93_f_31122024.jpg/330px-Hyundai_Ioniq_5_AWD_Techniq-Paket_%E2%80%93_f_31122024.jpg',
    engine: 'Motor Eléctrico Trasero (228 HP) o Tracción Total HTRAC (325 HP)',
    power: '228 - 325 HP',
    fuelType: '100% Eléctrico (Batería 77.4 kWh)',
    consumption: {
      kwhPer100Km: 17.0,
      kmPerKwh: 5.88,
      batteryCapacityKwh: 77.4,
      estimatedRangeKm: 507,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 240.0,
      chargingTimes: {
        schuko23: '21 h (20% a 80% a 2.3 kW)',
        wallbox74: '6 h 20 min (20% a 80% a 7.4 kW)',
        fastChargeDc: '18 min (10% a 80% en cargador ultrarrápido 800V)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'Arquitectura eléctrica de 800V que carga del 10% al 80% en solo 18 minutos.',
      'Diseño retrofuturista con luces paramétricas de píxeles y batalla de 3 metros.',
      'Consola central móvil Universal Island con asientos de relax gravedad cero.'
    ]
  },
  {
    id: 'mg_4_ev',
    name: 'MG 4 Electric',
    brand: 'MG',
    model: 'MG 4',
    yearRange: '2022 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (Compacto)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/MG4_Electric_%E2%80%93_f_21042025.jpg/330px-MG4_Electric_%E2%80%93_f_21042025.jpg',
    engine: 'Motor Eléctrico Trasero (170 HP / 204 HP) / XPOWER 435 HP AWD',
    power: '170 - 204 HP',
    fuelType: '100% Eléctrico (Batería 51 kWh LFP o 64 kWh Ternaria)',
    consumption: {
      kwhPer100Km: 16.0,
      kmPerKwh: 6.25,
      batteryCapacityKwh: 64.0,
      estimatedRangeKm: 450,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 135.0,
      chargingTimes: {
        schuko23: '18 h (20% a 80% a 2.3 kW)',
        wallbox74: '5 h 15 min (20% a 80% a 7.4 kW)',
        fastChargeDc: '26 min (10% a 80% en toma DC 135 kW)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'Batería ultradelgada "One Pack" de solo 11 cm de espesor en el suelo.',
      'Excelente dinamismo con tracción trasera y reparto de pesos 50:50.',
      'Uno de los coches eléctricos más asequibles de su segmento en Europa y América.'
    ]
  },
  {
    id: 'kia_ev6',
    name: 'Kia EV6',
    brand: 'Kia',
    model: 'EV6',
    yearRange: '2021 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico (Crossover)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/2021_Kia_EV6_GT-Line_S.jpg/330px-2021_Kia_EV6_GT-Line_S.jpg',
    engine: 'Motor Trasero (229 HP) o Dual Motor AWD (325 HP / 585 HP GT)',
    power: '229 - 325 HP',
    fuelType: '100% Eléctrico (Batería 77.4 kWh)',
    consumption: {
      kwhPer100Km: 16.5,
      kmPerKwh: 6.06,
      batteryCapacityKwh: 77.4,
      estimatedRangeKm: 528,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 240.0,
      chargingTimes: {
        schuko23: '21 h (20% a 80% a 2.3 kW)',
        wallbox74: '6 h 20 min (20% a 80% a 7.4 kW)',
        fastChargeDc: '18 min (10% a 80% a 240 kW DC)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO Emisiones)',
    highlights: [
      'Ganador del premio Coche del Año en Europa (Car of the Year 2022).',
      'Plataforma E-GMP con carga ultrarrápida 800V y autonomía que supera los 520 km.',
      'Capacidad de remolque homologada de hasta 1.600 kg con freno.'
    ]
  },

  // =========================================================================
  // 3. MOTOCICLETAS URBANAS Y DE USO DIARIO
  // =========================================================================
  {
    id: 'honda_cb125f',
    name: 'Honda CB125F (Twister / CBF)',
    brand: 'Honda',
    model: 'CB125F',
    yearRange: '2019 - 2025',
    type: 'moto',
    badgeText: 'Moto Urbana 125cc (4T)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Honda_CBF125_2009.jpg/330px-Honda_CBF125_2009.jpg',
    engine: 'Monocilíndrico 124cc 4T eSP e Inyección PGM-FI Refrigerado por Aire',
    power: '10.9 HP @ 7.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 55.0,
      hwy: 48.0,
      combined: 51.5,
      tankCapacityL: 11.0,
      estimatedRangeKm: 566,
      oilViscosity: '10W-30 / 10W-40 JASO MA (4 Tiempos)',
      oilCapacityL: 0.9
    },
    co2Emissions: '34 g/km (Norma Euro 5)',
    highlights: [
      'Récord de ahorro: rinde más de 50 km por cada litro en ciudad.',
      'Depósito de 11 L que permite recorrer más de 550 km con un solo tanque.',
      'Motor eSP con alternador inteligente ACG y mínimo peso de solo 117 kg.'
    ]
  },
  {
    id: 'honda_wave_110',
    name: 'Honda Wave 110i / S',
    brand: 'Honda',
    model: 'Wave 110',
    yearRange: '2018 - 2025',
    type: 'moto',
    badgeText: 'Moped / Cub 110cc',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Honda_Wave_125_S_2007.jpg/330px-Honda_Wave_125_S_2007.jpg',
    engine: 'Monocilíndrico 109cc 4T OHC con Cambio Semiautomático (4 vel.)',
    power: '8.5 HP @ 7.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 58.0,
      hwy: 50.0,
      combined: 54.0,
      tankCapacityL: 3.7,
      estimatedRangeKm: 200,
      oilViscosity: '10W-30 / 20W-50 JASO MA',
      oilCapacityL: 0.8
    },
    co2Emissions: '31 g/km',
    highlights: [
      'La moto de trabajo y reparto urbano más robusta y económica del planeta.',
      'Embrague centrífugo semiautomático: se cambian marchas sin maneta de embrague.',
      'Costo de llenado casi insignificante con tanque de 3.7 litros.'
    ]
  },
  {
    id: 'yamaha_ybr_125',
    name: 'Yamaha YBR 125 / YB125',
    brand: 'Yamaha',
    model: 'YBR 125',
    yearRange: '2016 - 2025',
    type: 'moto',
    badgeText: 'Moto Urbana 125cc (4T)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Yamaha_YBR125_%28Fuel_Injection_-_EU_Spec%29.JPG/330px-Yamaha_YBR125_%28Fuel_Injection_-_EU_Spec%29.JPG',
    engine: 'Monocilíndrico 124cc 4T SOHC 2 Válvulas con Eje de Equilibrado',
    power: '10.0 HP @ 7.800 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 44.0,
      hwy: 38.0,
      combined: 41.0,
      tankCapacityL: 13.0,
      estimatedRangeKm: 533,
      oilViscosity: '10W-40 / 20W-50 Yamalube 4T JASO MA2',
      oilCapacityL: 1.0
    },
    co2Emissions: '38 g/km',
    highlights: [
      'Eje de equilibrado interno que elimina casi por completo las vibraciones.',
      'Depósito grande de 13 L para un vehículo de 125cc (más de 500 km de autonomía).',
      'Fiabilidad mecánica legendaria utilizada tanto para uso personal como de flota.'
    ]
  },
  {
    id: 'yamaha_nmax_125',
    name: 'Yamaha NMAX 125 / 155',
    brand: 'Yamaha',
    model: 'NMAX',
    yearRange: '2020 - 2025',
    type: 'moto',
    badgeText: 'Scooter Urbano Premium',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Yamaha_nmax_cpd150_YCP.JPG/330px-Yamaha_nmax_cpd150_YCP.JPG',
    engine: 'Monocilíndrico 125cc Blue Core 4V con Distribución Variable (VVA) y CVT',
    power: '12.2 HP @ 8.000 RPM',
    fuelType: 'Gasolina Regular',
    consumption: {
      city: 43.5,
      hwy: 39.0,
      combined: 41.5,
      tankCapacityL: 7.1,
      estimatedRangeKm: 295,
      oilViscosity: '10W-40 Yamalube Scooter 4T JASO MB',
      oilCapacityL: 0.9
    },
    co2Emissions: '44 g/km (Euro 5)',
    highlights: [
      'Transmisión automática CVT: acelerar y frenar sin cambios de marcha.',
      'Control de tracción TCS, frenos ABS de doble canal y llave inteligente Smart Key.',
      'Maletero bajo el asiento con espacio para un casco integral.'
    ]
  },
  {
    id: 'yamaha_mt_03',
    name: 'Yamaha MT-03 (321cc)',
    brand: 'Yamaha',
    model: 'MT-03',
    yearRange: '2020 - 2025',
    type: 'moto',
    badgeText: 'Naked Deportiva (Bicilíndrica)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg/330px-Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg',
    engine: 'Bicilíndrico en Línea 321cc DOHC 8V Refrigerado por Líquido',
    power: '42.0 HP @ 10.750 RPM',
    fuelType: 'Gasolina Regular o Premium (91+ Octanos)',
    consumption: {
      city: 24.0,
      hwy: 29.5,
      combined: 26.5,
      tankCapacityL: 14.0,
      estimatedRangeKm: 371,
      oilViscosity: '10W-40 Sintético JASO MA2',
      oilCapacityL: 2.1
    },
    co2Emissions: '89 g/km',
    highlights: [
      'Motor bicilíndrico de altas revoluciones (corte a 12.500 RPM) muy emocionante.',
      'Horquilla delantera invertida KYB de 37 mm y postura de conducción erguida.',
      'Excelente tanto para traslados diarios rápidos como para escapadas de fin de semana.'
    ]
  },
  {
    id: 'bajaj_pulsar_ns200',
    name: 'Bajaj Pulsar NS 200 FI',
    brand: 'Bajaj',
    model: 'Pulsar NS 200',
    yearRange: '2019 - 2025',
    type: 'moto',
    badgeText: 'Naked Urbana (200cc)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Bajaj-NS400Z.jpg/330px-Bajaj-NS400Z.jpg',
    engine: 'Monocilíndrico 199.5cc 4T Triple Bujía (DTS-i) 4 Válvulas Refrigeración Líquida',
    power: '24.5 HP @ 9.750 RPM',
    fuelType: 'Gasolina Regular (87+ Octanos)',
    consumption: {
      city: 35.0,
      hwy: 40.0,
      combined: 37.0,
      tankCapacityL: 12.0,
      estimatedRangeKm: 444,
      oilViscosity: '20W-50 Semi-Sintético JASO MA2',
      oilCapacityL: 1.2
    },
    co2Emissions: '62 g/km',
    highlights: [
      'Tecnología DTS-i de triple bujía para una combustión completa y potente.',
      'Caja de 6 velocidades con embrague asistido antirrebote.',
      'Chasis perimetral de acero con monoamortiguador Nitrox con depósito de gas.'
    ]
  },
  {
    id: 'ktm_390_duke',
    name: 'KTM 390 Duke',
    brand: 'KTM',
    model: '390 Duke',
    yearRange: '2020 - 2025',
    type: 'moto',
    badgeText: 'Naked Deportiva (399cc)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Ktm_duke_390.jpg/330px-Ktm_duke_390.jpg',
    engine: 'Monocilíndrico 399cc 4T DOHC 4V Refrigeración Líquida (45 HP)',
    power: '45.0 HP @ 8.500 RPM',
    fuelType: 'Gasolina 95 Octanos',
    consumption: {
      city: 25.0,
      hwy: 31.0,
      combined: 27.5,
      tankCapacityL: 15.0,
      estimatedRangeKm: 412,
      oilViscosity: '15W-50 Full Synthetic Motorex JASO MA2',
      oilCapacityL: 1.7
    },
    co2Emissions: '79 g/km',
    highlights: [
      'La reina de la relación peso/potencia en su categoría (solo 165 kg con 45 HP).',
      'Electrónica avanzada con acelerador Ride-by-Wire y modos de conducción.',
      'Frenos ByBre con ABS en curva y modo Supermoto desconectable detrás.'
    ]
  },
  {
    id: 'honda_pcx_125',
    name: 'Honda PCX 125',
    brand: 'Honda',
    model: 'PCX',
    yearRange: '2021 - 2025',
    type: 'moto',
    badgeText: 'Scooter Urbano GT',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Honda_PCX125_2011_Front.JPG/330px-Honda_PCX125_2011_Front.JPG',
    engine: 'Monocilíndrico 125cc eSP+ 4 Válvulas con Sistema Idling Stop (Paro al ralentí)',
    power: '12.5 HP @ 8.750 RPM',
    fuelType: 'Gasolina Regular 87 Octanos',
    consumption: {
      city: 47.5,
      hwy: 42.0,
      combined: 45.0,
      tankCapacityL: 8.1,
      estimatedRangeKm: 364,
      oilViscosity: '10W-30 Honda 4T JASO MB',
      oilCapacityL: 0.9
    },
    co2Emissions: '47 g/km (Euro 5)',
    highlights: [
      'Sistema Idling Stop que apaga el motor en los semáforos ahorrando hasta un 5% extra.',
      'Hueco bajo el asiento ampliado a 30.4 litros para guardar casco y mochila.',
      'Toma de carga USB-C en la guantera para recargar el smartphone mientras conduces.'
    ]
  },
  {
    id: 'italika_ft150',
    name: 'Italika FT150 / Heavy Duty',
    brand: 'Italika',
    model: 'FT150',
    yearRange: '2018 - 2025',
    type: 'moto',
    badgeText: 'Moto de Trabajo 150cc',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Yamaha_YBR125_%28Fuel_Injection_-_EU_Spec%29.JPG/330px-Yamaha_YBR125_%28Fuel_Injection_-_EU_Spec%29.JPG',
    engine: 'Monocilíndrico 149cc 4T OHV con Enfriamiento por Aire Natural',
    power: '11.2 HP @ 8.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 35.0,
      hwy: 30.0,
      combined: 32.0,
      tankCapacityL: 12.5,
      estimatedRangeKm: 400,
      oilViscosity: '20W-50 Mineral / Semi-Sintético 4T',
      oilCapacityL: 1.0
    },
    co2Emissions: '48 g/km',
    highlights: [
      'La moto utilitaria más popular de México por su durabilidad y bajo costo de refacciones.',
      'Parrilla de carga trasera reforzada lista para trabajo rudo o reparto.',
      'Freno de tambor mecánico de fácil ajuste y mantenimiento muy económico.'
    ]
  }
];

// Módulo Exportable para el Navegador
window.SPECS_CATALOG = {
  vehicles: VEHICLES_SPECS_CATALOG,

  // Búsqueda inteligente por texto y categoría
  search(query = '', filterType = 'all') {
    const cleanQuery = query.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    return VEHICLES_SPECS_CATALOG.filter(v => {
      // Filtro por categoría
      if (filterType !== 'all' && v.type !== filterType) {
        return false;
      }
      if (!cleanQuery) return true;

      // Normalizar campos del vehículo para matching
      const targetText = `${v.name} ${v.brand} ${v.model} ${v.engine} ${v.fuelType} ${v.yearRange}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      return targetText.includes(cleanQuery);
    });
  },

  // Obtener por ID único
  getById(id) {
    return VEHICLES_SPECS_CATALOG.find(v => v.id === id);
  }
};
