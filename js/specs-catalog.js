// AutoFind Lab - Catálogo Local de Especificaciones y Consumo del Día a Día
// Proporciona datos de consumo homologado, capacidades de tanque/batería, precios promedio y tiempos de carga offline.

const VEHICLES_SPECS_CATALOG = [
  // =========================================================================
  // 1. VEHÍCULOS DE COMBUSTIÓN (GASOLINA / GAS / HÍBRIDOS / MUSCLE)
  // =========================================================================
  {
    id: 'toyota_corolla',
    name: 'Toyota Corolla 2.0 / Hybrid',
    brand: 'Toyota',
    model: 'Corolla',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / Híbrido',
    averagePrice: '$419,900 MXN',
    priceRange: '$385,000 - $520,000 MXN (~$22,800 USD)',
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
    id: 'ford_mustang',
    name: 'Ford Mustang 2.3 EcoBoost / 5.0 V8 GT',
    brand: 'Ford',
    model: 'Mustang',
    yearRange: '2018 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / V8 Muscle',
    averagePrice: '$1,050,000 MXN',
    priceRange: '$890,000 - $1,190,000 MXN (~$57,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg/960px-Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg',
    engine: '2.3L EcoBoost Turbo (315 HP) o 5.0L Coyote V8 (486 HP)',
    power: '315 - 486 HP',
    fuelType: 'Gasolina Premium (91+ Octanos)',
    consumption: {
      city: 7.8,
      hwy: 13.5,
      combined: 9.8,
      tankCapacityL: 61.0,
      estimatedRangeKm: 598,
      oilViscosity: '5W-50 Synthetic (V8) / 5W-30 (EcoBoost)',
      oilCapacityL: 9.5
    },
    co2Emissions: '270 g/km (Muscle Car V8)',
    highlights: [
      'Ícono deportivo americano con sonido y potencia inconfundible del motor Coyote V8.',
      'Depósito de 61 Litros con autonomía carretera de hasta 820 km en crucero.',
      'Frenos Brembo de 6 pistones y modos de conducción Track / Drag / Sport.'
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
    averagePrice: '$334,900 MXN',
    priceRange: '$295,000 - $379,000 MXN (~$18,200 USD)',
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
    averagePrice: '$465,000 MXN',
    priceRange: '$420,000 - $560,000 MXN (~$25,200 USD)',
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
    averagePrice: '$399,900 MXN',
    priceRange: '$365,000 - $475,000 MXN (~$21,700 USD)',
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
    averagePrice: '$285,000 MXN',
    priceRange: '$255,000 - $315,000 MXN (~$15,500 USD)',
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
    yearRange: '2019 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Turbo',
    averagePrice: '$345,900 MXN',
    priceRange: '$310,000 - $385,000 MXN (~$18,800 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/2018_SEAT_Ibiza_SE_Technology_1.0_Front.jpg/330px-2018_SEAT_Ibiza_SE_Technology_1.0_Front.jpg',
    engine: '1.0L 3 Cilindros TSI Turbo (110 HP / 115 HP)',
    power: '110 - 115 HP',
    fuelType: 'Gasolina 95 Octanos',
    consumption: {
      city: 15.6,
      hwy: 21.3,
      combined: 18.2,
      tankCapacityL: 40.0,
      estimatedRangeKm: 728,
      oilViscosity: '0W-20 / 5W-30 (Norma VW 504.00 / 508.00)',
      oilCapacityL: 4.0
    },
    co2Emissions: '118 g/km (Etiqueta C)',
    highlights: [
      'Excelente agilidad en ciudad y curvas gracias a la plataforma MQB-A0.',
      'Consumo extraordinario en carretera con más de 21 km por litro.',
      'Diseño juvenil y moderno con conectividad Full Link.'
    ]
  },
  {
    id: 'renault_duster',
    name: 'Renault Duster 1.3 Turbo / 1.6L',
    brand: 'Renault',
    model: 'Duster',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina SUV',
    averagePrice: '$369,900 MXN',
    priceRange: '$335,000 - $425,000 MXN (~$20,100 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/2018_Dacia_Duster_Comfort_1.6_Front.jpg/330px-2018_Dacia_Duster_Comfort_1.6_Front.jpg',
    engine: '1.3L Turbo TCe (154 HP) desarrollado con Mercedes-Benz',
    power: '154 HP @ 5.250 RPM',
    fuelType: 'Gasolina Regular o Premium',
    consumption: {
      city: 12.8,
      hwy: 17.5,
      combined: 14.7,
      tankCapacityL: 50.0,
      estimatedRangeKm: 735,
      oilViscosity: '5W-40 / 5W-30 (Norma Renault RN0710 / RN17)',
      oilCapacityL: 4.8
    },
    co2Emissions: '154 g/km (Etiqueta C)',
    highlights: [
      'Altura libre al suelo de 21 cm para superar baches y caminos irregulares.',
      'Motor 1.3 Turbo potente con 250 Nm de torque inmediato.',
      'Suspensión robusta de largo recorrido muy resistente.'
    ]
  },
  {
    id: 'honda_civic',
    name: 'Honda Civic 2.0 e:HEV / 1.5 Turbo',
    brand: 'Honda',
    model: 'Civic',
    yearRange: '2022 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Turbo / Híbrido',
    averagePrice: '$545,900 MXN',
    priceRange: '$510,000 - $610,000 MXN (~$29,600 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/2022_Honda_Civic_EX_%2811th_generation%29%2C_front_left.jpg/330px-2022_Honda_Civic_EX_%2811th_generation%29%2C_front_left.jpg',
    engine: '1.5L VTEC Turbo (176 HP) / 2.0L Híbrido e:HEV (181 HP)',
    power: '176 - 181 HP',
    fuelType: 'Gasolina Regular o Premium',
    consumption: {
      city: 15.1,
      hwy: 20.6,
      combined: 17.4,
      tankCapacityL: 47.0,
      estimatedRangeKm: 817,
      oilViscosity: '0W-20 Honda Genuine / API SP Full Synthetic',
      oilCapacityL: 3.7
    },
    co2Emissions: '108 - 132 g/km (Etiqueta ECO / C)',
    highlights: [
      'Interior de alta gama con sistema de rejilla panal de abeja.',
      'Excelente retención de valor en el mercado de reventa.',
      'Paquete completo de seguridad activa Honda Sensing de serie.'
    ]
  },
  {
    id: 'mazda_3',
    name: 'Mazda 3 2.5L / e-Skyactiv G',
    brand: 'Mazda',
    model: '3',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / M-Hybrid',
    averagePrice: '$392,900 MXN',
    priceRange: '$360,000 - $480,000 MXN (~$21,300 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/2019_Mazda3_SE-L_2.0_Front.jpg/330px-2019_Mazda3_SE-L_2.0_Front.jpg',
    engine: '2.5L Skyactiv-G 4 Cilindros (186 HP) o Turbo AWD (227 HP)',
    power: '186 - 227 HP',
    fuelType: 'Gasolina Regular (87) o Premium',
    consumption: {
      city: 12.9,
      hwy: 18.2,
      combined: 15.0,
      tankCapacityL: 51.0,
      estimatedRangeKm: 765,
      oilViscosity: '0W-20 Mazda Supra Full Synthetic',
      oilCapacityL: 4.5
    },
    co2Emissions: '148 g/km (Etiqueta C)',
    highlights: [
      'Acabados interiores que compiten con marcas premium de lujo.',
      'Respuesta de aceleración lineal sin retardo turbo gracias a sus 2.5 L.',
      'Excelente insonorización y tacto de dirección preciso Jinba Ittai.'
    ]
  },
  {
    id: 'ford_ranger',
    name: 'Ford Ranger 2.0 / 2.3 EcoBoost',
    brand: 'Ford',
    model: 'Ranger',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Diésel / Gasolina Pickup',
    averagePrice: '$785,000 MXN',
    priceRange: '$690,000 - $980,000 MXN (~$42,500 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/2019_Ford_Ranger_Wildtrak_4X4_2.0_Front.jpg/330px-2019_Ford_Ranger_Wildtrak_4X4_2.0_Front.jpg',
    engine: '2.0L Bi-Turbo Diésel Panther (210 HP) / 2.3 EcoBoost (270 HP)',
    power: '210 - 270 HP',
    fuelType: 'Diésel Ultra Bajo Azufre / Gasolina',
    consumption: {
      city: 9.8,
      hwy: 14.2,
      combined: 11.9,
      tankCapacityL: 80.0,
      estimatedRangeKm: 952,
      oilViscosity: '0W-30 / 5W-30 Ford WSS-M2C950-A',
      oilCapacityL: 7.2
    },
    co2Emissions: '205 g/km (Etiqueta C)',
    highlights: [
      'Depósito enorme de 80 Litros ideal para travesías y trabajo pesado.',
      'Capacidad de remolque de hasta 3.500 kg con control de balanceo.',
      'Tracción 4x4 con reductora y bloqueo de diferencial trasero.'
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
    averagePrice: '$318,000 MXN',
    priceRange: '$285,000 - $355,000 MXN (~$17,300 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/2020_Chevrolet_Onix_Premier_Plus%2C_front_3.24.20.jpg/330px-2020_Chevrolet_Onix_Premier_Plus%2C_front_3.24.20.jpg',
    engine: '1.0L Turbo 3 Cilindros Ecotec (114 HP)',
    power: '114 HP @ 5.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 15.8,
      hwy: 21.5,
      combined: 18.1,
      tankCapacityL: 44.0,
      estimatedRangeKm: 796,
      oilViscosity: '0W-20 dexos1 Gen 3',
      oilCapacityL: 3.5
    },
    co2Emissions: '120 g/km (Etiqueta C)',
    highlights: [
      'Excelente eficiencia de combustible superando los 21 km/L en autopista.',
      'Equipamiento de seguridad completo con 6 bolsas de aire de serie.',
      'Conectividad OnStar con punto de acceso Wi-Fi 4G LTE.'
    ]
  },

  // =========================================================================
  // 2. VEHÍCULOS 100% ELÉCTRICOS (EV / BEV)
  // =========================================================================
  {
    id: 'tesla_model_3',
    name: 'Tesla Model 3 (Highland)',
    brand: 'Tesla',
    model: 'Model 3',
    yearRange: '2021 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico',
    averagePrice: '$799,000 MXN',
    priceRange: '$749,000 - $920,000 MXN (~$43,500 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg/330px-2019_Tesla_Model_3_Performance_AWD_Front.jpg',
    engine: 'Motor Trasero RWD o Dual Motor AWD sincrónico de imanes permanentes',
    power: '283 - 498 HP',
    fuelType: '100% Eléctrico (Batería LFP o NCM)',
    consumption: {
      kwhPer100Km: 14.0,
      kmPerKwh: 7.14,
      batteryCapacityKwh: 60.0,
      estimatedRangeKm: 513,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 170.0,
      chargingTimes: {
        schuko23: '26 h (enchufe común 2.3 kW)',
        wallbox74: '8 h 15 min (Wallbox 7.4 kW)',
        fastChargeDc: '25 min (Supercharger V3 / V4 10-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'El sedán eléctrico más eficiente del mercado con solo 14 kWh/100km.',
      'Acceso nativo a la red de Supercargadores de alta velocidad de Tesla.',
      'Excelente aerodinámica (Cx 0.219) y tecnología de conducción asistida.'
    ]
  },
  {
    id: 'tesla_model_y',
    name: 'Tesla Model Y',
    brand: 'Tesla',
    model: 'Model Y',
    yearRange: '2021 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico SUV',
    averagePrice: '$869,000 MXN',
    priceRange: '$829,000 - $1,050,000 MXN (~$47,200 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Tesla_Model_Y_front_right_view_%28cropped%29.jpg/330px-Tesla_Model_Y_front_right_view_%28cropped%29.jpg',
    engine: 'Dual Motor AWD (Long Range) o RWD',
    power: '299 - 456 HP',
    fuelType: '100% Eléctrico',
    consumption: {
      kwhPer100Km: 16.5,
      kmPerKwh: 6.06,
      batteryCapacityKwh: 75.0,
      estimatedRangeKm: 533,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 250.0,
      chargingTimes: {
        schuko23: '32 h (enchufe doméstico 2.3 kW)',
        wallbox74: '10 h 30 min (Wallbox 7.4 kW)',
        fastChargeDc: '27 min (Supercharger 10-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'El SUV más vendido a nivel mundial con espacio inmenso y maletero delantero.',
      'Potencia de recarga ultrarrápida de hasta 250 kW en corriente directa.',
      'Bomba de calor de alta eficiencia que preserva la autonomía en invierno.'
    ]
  },
  {
    id: 'byd_dolphin',
    name: 'BYD Dolphin EV',
    brand: 'BYD',
    model: 'Dolphin',
    yearRange: '2023 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico',
    averagePrice: '$409,900 MXN',
    priceRange: '$389,000 - $449,000 MXN (~$22,300 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/BYD_Dolphin_001.jpg/330px-BYD_Dolphin_001.jpg',
    engine: 'Motor Eléctrico Delantero (95 HP / 204 HP)',
    power: '95 - 204 HP',
    fuelType: '100% Eléctrico (Batería Blade LFP)',
    consumption: {
      kwhPer100Km: 13.5,
      kmPerKwh: 7.40,
      batteryCapacityKwh: 44.9,
      estimatedRangeKm: 405,
      maxChargeAcKw: 7.0,
      maxChargeDcKw: 60.0,
      chargingTimes: {
        schuko23: '19 h (enchufe 2.3 kW)',
        wallbox74: '6 h 30 min (Wallbox 7 kW)',
        fastChargeDc: '38 min (DC 10-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'Equipa la célebre Batería Blade de fosfato de hierro y litio ultra-segura.',
      'Consumo muy bajo en ciclo urbano gracias a su peso contenido y e-Platform 3.0.',
      'Pantalla central giratoria de 12.8 pulgadas con asistente de voz en español.'
    ]
  },
  {
    id: 'byd_seal',
    name: 'BYD Seal EV',
    brand: 'BYD',
    model: 'Seal',
    yearRange: '2023 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico Deportivo',
    averagePrice: '$778,800 MXN',
    priceRange: '$750,000 - $888,000 MXN (~$42,300 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/BYD_Seal_001.jpg/330px-BYD_Seal_001.jpg',
    engine: 'Single Motor RWD (313 HP) o Dual Motor AWD (530 HP)',
    power: '313 - 530 HP (0-100 en 3.8s)',
    fuelType: '100% Eléctrico (Blade Cell-to-Body)',
    consumption: {
      kwhPer100Km: 16.8,
      kmPerKwh: 5.95,
      batteryCapacityKwh: 82.5,
      estimatedRangeKm: 570,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 150.0,
      chargingTimes: {
        schuko23: '36 h (enchufe 2.3 kW)',
        wallbox74: '11 h 30 min (Wallbox 7.4 kW)',
        fastChargeDc: '26 min (DC 150 kW 30-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'Arquitectura Cell-to-Body (CTB) con una rigidez torsional de 40.500 Nm/grado.',
      'Aceleración explosiva de 0 a 100 km/h en apenas 3.8 segundos.',
      'Gran batería de 82.5 kWh que supera los 550 km en ciclo combinado.'
    ]
  },
  {
    id: 'nissan_leaf',
    name: 'Nissan Leaf 40 / 62 kWh',
    brand: 'Nissan',
    model: 'Leaf',
    yearRange: '2018 - 2024',
    type: 'electric',
    badgeText: '100% Eléctrico',
    averagePrice: '$695,000 MXN',
    priceRange: '$630,000 - $780,000 MXN (~$37,800 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Nissan_Leaf_2018_Gen_2_Front.jpg/330px-Nissan_Leaf_2018_Gen_2_Front.jpg',
    engine: 'Motor Síncrono de CA EM57 (150 HP / 217 HP e+)',
    power: '150 - 217 HP',
    fuelType: '100% Eléctrico',
    consumption: {
      kwhPer100Km: 17.1,
      kmPerKwh: 5.85,
      batteryCapacityKwh: 40.0,
      estimatedRangeKm: 270,
      maxChargeAcKw: 6.6,
      maxChargeDcKw: 50.0,
      chargingTimes: {
        schuko23: '17 h (enchufe doméstico 2.3 kW)',
        wallbox74: '6 h (Wallbox 6.6 kW)',
        fastChargeDc: '45 min (conector CHAdeMO 50 kW)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'Pionero mundial de los vehículos eléctricos con fiabilidad mecánica comprobada.',
      'Sistema e-Pedal para conducir y frenar utilizando un solo pedal.',
      'Batería sin refrigeración activa ideal para climas templados y trayectos urbanos.'
    ]
  },
  {
    id: 'hyundai_ioniq_5',
    name: 'Hyundai Ioniq 5',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    yearRange: '2022 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico 800V',
    averagePrice: '$945,000 MXN',
    priceRange: '$890,000 - $1,150,000 MXN (~$51,300 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Hyundai_Ioniq_5_Auto_Zuerich_2021_IMG_0546.jpg/330px-Hyundai_Ioniq_5_Auto_Zuerich_2021_IMG_0546.jpg',
    engine: 'Arquitectura E-GMP 800V RWD o AWD (228 - 325 HP)',
    power: '228 - 325 HP',
    fuelType: '100% Eléctrico',
    consumption: {
      kwhPer100Km: 17.5,
      kmPerKwh: 5.71,
      batteryCapacityKwh: 77.4,
      estimatedRangeKm: 507,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 240.0,
      chargingTimes: {
        schuko23: '33 h (enchufe 2.3 kW)',
        wallbox74: '10 h 45 min (Wallbox 7.4 kW)',
        fastChargeDc: '18 min (Carga ultrarrápida 800V 10-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'Arquitectura de 800 Voltios: pasa del 10% al 80% en tan solo 18 minutos.',
      'Tecnología V2L (Vehicle-to-Load) que permite alimentar electrodomésticos externos.',
      'Distancia entre ejes de 3.0 metros que ofrece un habitáculo excepcionalmente amplio.'
    ]
  },
  {
    id: 'mg_4_ev',
    name: 'MG 4 Electric',
    brand: 'MG',
    model: 'MG4',
    yearRange: '2023 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico RWD',
    averagePrice: '$459,000 MXN',
    priceRange: '$425,000 - $530,000 MXN (~$25,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/2022_MG4_EV_SE_Long_Range_Front.jpg/330px-2022_MG4_EV_SE_Long_Range_Front.jpg',
    engine: 'Motor Trasero RWD (170 HP o 204 HP Long Range)',
    power: '170 - 204 HP',
    fuelType: '100% Eléctrico (Batería One Pack 110 mm)',
    consumption: {
      kwhPer100Km: 16.0,
      kmPerKwh: 6.25,
      batteryCapacityKwh: 64.0,
      estimatedRangeKm: 450,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 135.0,
      chargingTimes: {
        schuko23: '27 h (enchufe 2.3 kW)',
        wallbox74: '8 h 50 min (Wallbox 7.4 kW)',
        fastChargeDc: '32 min (DC 135 kW 10-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'Tracción trasera con reparto de pesos 50:50 para un manejo deportivo.',
      'Batería ultrafina de 110 mm que maximiza la habitabilidad interior.',
      'Excelente relación precio-autonomía en el segmento de compactos eléctricos.'
    ]
  },
  {
    id: 'kia_ev6',
    name: 'Kia EV6',
    brand: 'Kia',
    model: 'EV6',
    yearRange: '2022 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico Crossover',
    averagePrice: '$990,000 MXN',
    priceRange: '$920,000 - $1,250,000 MXN (~$53,800 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Kia_EV6_IMG_5419.jpg/330px-Kia_EV6_IMG_5419.jpg',
    engine: 'Tracción RWD (229 HP) o Dual Motor AWD (325 HP / GT 585 HP)',
    power: '229 - 585 HP',
    fuelType: '100% Eléctrico 800V',
    consumption: {
      kwhPer100Km: 16.8,
      kmPerKwh: 5.95,
      batteryCapacityKwh: 77.4,
      estimatedRangeKm: 528,
      maxChargeAcKw: 11.0,
      maxChargeDcKw: 233.0,
      chargingTimes: {
        schuko23: '33 h (enchufe 2.3 kW)',
        wallbox74: '10 h 45 min (Wallbox 7.4 kW)',
        fastChargeDc: '18 min (Supercargador 800V 10-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)',
    highlights: [
      'Elegido Coche del Año en Europa por su diseño vanguardista y prestaciones.',
      'Recarga ultra-veloz de 800V con soporte bidireccional V2L.',
      'Dirección ágil y dinámica de chasis superior para viajes largos por autopista.'
    ]
  },

  // =========================================================================
  // 3. MOTOCICLETAS Y SCOOTERS URBANOS / DEPORTIVOS
  // =========================================================================
  {
    id: 'honda_cb125f',
    name: 'Honda CB125F (Twister / CBF)',
    brand: 'Honda',
    model: 'CB125F',
    yearRange: '2021 - 2025',
    type: 'moto',
    badgeText: 'Motocicleta Urbana',
    averagePrice: '$36,900 MXN',
    priceRange: '$34,000 - $39,500 MXN (~$2,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Honda_CBF125_2011.JPG/330px-Honda_CBF125_2011.JPG',
    engine: '124.8cc Monocilíndrico 4T eSP Inyección PGM-FI refrigerado por aire',
    power: '11 HP @ 7.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 65.0,
      hwy: 55.0,
      combined: 60.0,
      tankCapacityL: 11.0,
      estimatedRangeKm: 660,
      oilViscosity: '10W-30 4T JASO MA (Norma Honda)',
      oilCapacityL: 0.9
    },
    co2Emissions: '34 g/km (Etiqueta C)',
    highlights: [
      'Rendimiento legendario de 60 km por litro con tecnología eSP de baja fricción.',
      'Un solo tanque de 11 litros rinde más de 650 km de autonomía real.',
      'Frenada combinada CBS y arranque silencioso ACG sin motor de arranque convencional.'
    ]
  },
  {
    id: 'honda_wave_110',
    name: 'Honda Wave 110i / S',
    brand: 'Honda',
    model: 'Wave 110',
    yearRange: '2020 - 2025',
    type: 'moto',
    badgeText: 'Moped / Cub',
    averagePrice: '$32,900 MXN',
    priceRange: '$30,000 - $35,500 MXN (~$1,790 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Honda_Wave_110i_%28cropped%29.jpg/330px-Honda_Wave_110i_%28cropped%29.jpg',
    engine: '109cc 4 Tiempos OHC con embrague centrífugo semiautomático',
    power: '8.5 HP @ 7.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 58.0,
      hwy: 50.0,
      combined: 54.0,
      tankCapacityL: 3.7,
      estimatedRangeKm: 200,
      oilViscosity: '10W-30 / 20W-50 4T',
      oilCapacityL: 0.8
    },
    co2Emissions: '38 g/km',
    highlights: [
      'La moto de reparto más económica y resistente de América Latina.',
      'Caja de 4 velocidades rotativa sin maneta de embrague muy fácil de usar.',
      'Costo de refacciones y mantenimiento mínimo accesible para cualquier taller.'
    ]
  },
  {
    id: 'yamaha_ybr_125',
    name: 'Yamaha YBR 125 / YB125',
    brand: 'Yamaha',
    model: 'YBR 125',
    yearRange: '2019 - 2025',
    type: 'moto',
    badgeText: 'Motocicleta de Trabajo',
    averagePrice: '$41,999 MXN',
    priceRange: '$38,000 - $45,000 MXN (~$2,280 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Yamaha_YBR125_Custom_2008.jpg/330px-Yamaha_YBR125_Custom_2008.jpg',
    engine: '124cc 4T SOHC 2 Válvulas refrigerado por aire',
    power: '10 HP @ 7.800 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 45.0,
      hwy: 40.0,
      combined: 42.0,
      tankCapacityL: 13.0,
      estimatedRangeKm: 546,
      oilViscosity: '20W-50 / 10W-40 Yamalube 4T',
      oilCapacityL: 1.0
    },
    co2Emissions: '44 g/km',
    highlights: [
      'Tanque amplio de 13 litros que permite olvidarse de repostar durante semanas.',
      'Mecánica extremadamente duradera con repuestos disponibles en todo el país.',
      'Posición de manejo muy erguida y asiento acolchado para jornadas de 8 horas.'
    ]
  },
  {
    id: 'yamaha_nmax_125',
    name: 'Yamaha NMAX 125 / 155',
    brand: 'Yamaha',
    model: 'NMAX',
    yearRange: '2021 - 2025',
    type: 'moto',
    badgeText: 'Maxi-Scooter',
    averagePrice: '$89,999 MXN',
    priceRange: '$82,000 - $97,000 MXN (~$4,890 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Yamaha_NMAX_155_in_Chiang_Mai.jpg/330px-Yamaha_NMAX_155_in_Chiang_Mai.jpg',
    engine: '125cc / 155cc Blue Core 4V con distribución variable VVA',
    power: '12.2 - 15.1 HP',
    fuelType: 'Gasolina Regular',
    consumption: {
      city: 46.0,
      hwy: 40.0,
      combined: 43.5,
      tankCapacityL: 7.1,
      estimatedRangeKm: 308,
      oilViscosity: '10W-40 Yamalube 4-S Scooter',
      oilCapacityL: 0.9
    },
    co2Emissions: '45 g/km',
    highlights: [
      'Motor con válvula variable VVA que ofrece empuje vigoroso a altas revoluciones.',
      'Control de tracción TCS y frenos ABS en ambas ruedas para pavimento mojado.',
      'Espacio bajo el asiento para un casco integral y arranque Smart Key sin llave.'
    ]
  },
  {
    id: 'yamaha_mt_03',
    name: 'Yamaha MT-03 (321cc)',
    brand: 'Yamaha',
    model: 'MT-03',
    yearRange: '2020 - 2025',
    type: 'moto',
    badgeText: 'Naked Deportiva',
    averagePrice: '$154,999 MXN',
    priceRange: '$145,000 - $168,000 MXN (~$8,420 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Yamaha_MT-03_at_Tokyo_Motor_Show_2019.jpg/330px-Yamaha_MT-03_at_Tokyo_Motor_Show_2019.jpg',
    engine: '321cc Bicilíndrico en línea DOHC 8V refrigeración líquida',
    power: '42 HP @ 10.750 RPM',
    fuelType: 'Gasolina Premium (91+ Octanos)',
    consumption: {
      city: 23.5,
      hwy: 28.0,
      combined: 25.5,
      tankCapacityL: 14.0,
      estimatedRangeKm: 357,
      oilViscosity: '10W-40 Sintético Yamalube 4R',
      oilCapacityL: 2.1
    },
    co2Emissions: '89 g/km',
    highlights: [
      'Motor bicilíndrico alegre y progresivo capaz de alcanzar 180 km/h.',
      'Horquilla invertida KYB delantera de 37 mm con gran aplomo en curvas.',
      'Diseño agresivo de la saga Hyper Naked Dark Side of Japan con faros LED.'
    ]
  },
  {
    id: 'bajaj_pulsar_ns200',
    name: 'Bajaj Pulsar NS 200 FI',
    brand: 'Bajaj',
    model: 'Pulsar NS 200',
    yearRange: '2019 - 2025',
    type: 'moto',
    badgeText: 'Street Naked',
    averagePrice: '$61,999 MXN',
    priceRange: '$56,000 - $67,000 MXN (~$3,370 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Bajaj_Pulsar_200_NS_right_view.jpg/330px-Bajaj_Pulsar_200_NS_right_view.jpg',
    engine: '199.5cc 4V Triple Bujía DTS-i refrigeración líquida',
    power: '24.1 HP @ 9.750 RPM',
    fuelType: 'Gasolina Regular o Premium',
    consumption: {
      city: 35.0,
      hwy: 40.0,
      combined: 37.0,
      tankCapacityL: 12.0,
      estimatedRangeKm: 444,
      oilViscosity: '20W-50 Bajaj DTS-i Premium Oil',
      oilCapacityL: 1.2
    },
    co2Emissions: '62 g/km',
    highlights: [
      'Chasis perimetral de acero prensado para máxima rigidez y maniobrabilidad.',
      'Tecnología DTS-i de triple bujía que optimiza la quema de combustible.',
      'La 200cc con mejor relación potencia-precio del mercado latinoamericano.'
    ]
  },
  {
    id: 'ktm_390_duke',
    name: 'KTM 390 Duke',
    brand: 'KTM',
    model: '390 Duke',
    yearRange: '2021 - 2025',
    type: 'moto',
    badgeText: 'Naked Corner Rocket',
    averagePrice: '$149,900 MXN',
    priceRange: '$139,000 - $162,000 MXN (~$8,150 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/KTM_390_Duke_2017_right.jpg/330px-KTM_390_Duke_2017_right.jpg',
    engine: '373cc / 399cc Monocilíndrico 4T DOHC 4V refrigeración líquida',
    power: '44 HP @ 9.000 RPM (37 Nm torque)',
    fuelType: 'Gasolina 95+ Octanos',
    consumption: {
      city: 25.0,
      hwy: 30.0,
      combined: 27.5,
      tankCapacityL: 13.4,
      estimatedRangeKm: 368,
      oilViscosity: '15W-50 Motorex Formula 4T Full Synthetic',
      oilCapacityL: 1.7
    },
    co2Emissions: '79 g/km',
    highlights: [
      'Potencia descomunal para un monocilíndrico con aceleración de referencia.',
      'Suspensiones WP APEX ajustables y frenos radiales ByBre de 4 pistones.',
      'Modo Supermoto ABS y pantalla TFT a color con conectividad smartphone.'
    ]
  },
  {
    id: 'honda_pcx_125',
    name: 'Honda PCX 125',
    brand: 'Honda',
    model: 'PCX 125',
    yearRange: '2021 - 2025',
    type: 'moto',
    badgeText: 'Scooter Premium',
    averagePrice: '$79,900 MXN',
    priceRange: '$73,000 - $86,000 MXN (~$4,340 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Honda_PCX125_2018.jpg/330px-Honda_PCX125_2018.jpg',
    engine: '125cc eSP+ 4 Válvulas con parada automática Idling Stop',
    power: '12.5 HP @ 8.750 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 47.6,
      hwy: 44.0,
      combined: 46.0,
      tankCapacityL: 8.1,
      estimatedRangeKm: 372,
      oilViscosity: '10W-30 4T JASO MB',
      oilCapacityL: 0.9
    },
    co2Emissions: '47 g/km',
    highlights: [
      'Sistema Idling Stop apaga el motor en semáforos ahorrando hasta un 7% extra.',
      'Control de par seleccionable Honda HSTC para evitar derrapes en pasos peatonales.',
      'Maletero de 30.4 litros bajo el asiento con toma de carga USB-C en la guantera.'
    ]
  },
  {
    id: 'italika_ft150',
    name: 'Italika FT150 / Heavy Duty',
    brand: 'Italika',
    model: 'FT150',
    yearRange: '2019 - 2025',
    type: 'moto',
    badgeText: 'Motocicleta Utilitaria',
    averagePrice: '$23,499 MXN',
    priceRange: '$20,000 - $26,999 MXN (~$1,280 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Italika_FT150_GTS.jpg/330px-Italika_FT150_GTS.jpg',
    engine: '149cc 4 Tiempos Monocilíndrico Varillero (OHV)',
    power: '14.4 HP @ 8.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 32.0,
      hwy: 36.0,
      combined: 34.0,
      tankCapacityL: 14.0,
      estimatedRangeKm: 476,
      oilViscosity: '20W-50 4T Mineral / Semisintético',
      oilCapacityL: 1.0
    },
    co2Emissions: '65 g/km',
    highlights: [
      'La moto utilitaria más popular de México por su inmejorable costo de adquisición.',
      'Motor varillero de mecánica elemental que cualquier mecánico repara al instante.',
      'Parrilla de carga reforzada lista para cajas de delivery y carga pesada.'
    ]
  }
];

// Módulo de exportación global para el navegador y soporte en Worker/ESM
if (typeof window !== 'undefined') {
  window.SPECS_CATALOG = {
    vehicles: VEHICLES_SPECS_CATALOG,
    search(query = '', filterType = 'all') {
      const cleanQuery = query.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return VEHICLES_SPECS_CATALOG.filter(v => {
        if (filterType !== 'all' && v.type !== filterType) {
          return false;
        }
        if (!cleanQuery) return true;
        const targetText = `${v.name} ${v.brand} ${v.model} ${v.engine} ${v.fuelType} ${v.yearRange}`
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return targetText.includes(cleanQuery);
      });
    },
    getById(id) {
      return VEHICLES_SPECS_CATALOG.find(v => v.id === id);
    }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VEHICLES_SPECS_CATALOG };
}
