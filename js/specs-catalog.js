// AutoFind Lab - Catálogo Local de Especificaciones y Consumo del Día a Día
// Proporciona datos de consumo homologado, capacidades de tanque/batería, precios de mercado verificados y tiempos de carga offline.

const VEHICLES_SPECS_CATALOG = [
  // =========================================================================
  // 1. VEHÍCULOS DE COMBUSTIÓN (GASOLINA / GAS / HÍBRIDOS / MINIVANS / PICKUPS)
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Toyota_Corolla_Hybrid_%28E210%29_IMG_4338.jpg/960px-Toyota_Corolla_Hybrid_%28E210%29_IMG_4338.jpg',
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
    co2Emissions: '102 - 128 g/km (Etiqueta ECO / C)'
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
    co2Emissions: '270 g/km (Muscle Car V8)'
  },
  {
    id: 'kia_k3',
    name: 'Kia K3 1.6L / 2.0L GT-Line',
    brand: 'Kia',
    model: 'K3',
    yearRange: '2024 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Sedán / Hatchback',
    averagePrice: '$389,000 MXN',
    priceRange: '$322,400 - $461,900 MXN (~$17,500 - $25,100 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/2024_Kia_K3_Sedan_GT_Line_%28Colombia%29_front_view.jpg/960px-2024_Kia_K3_Sedan_GT_Line_%28Colombia%29_front_view.jpg',
    engine: '1.6L 4 Cilindros MPI (121 HP) o 2.0L MPI GT-Line (150 HP)',
    power: '121 - 150 HP',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 14.8,
      hwy: 20.2,
      combined: 16.9,
      tankCapacityL: 45.0,
      estimatedRangeKm: 760,
      oilViscosity: '0W-20 / 5W-30 Sintético',
      oilCapacityL: 3.6
    },
    co2Emissions: '124 g/km (Etiqueta C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/2011_Nissan_Versa_1.6_Sedan.jpg/960px-2011_Nissan_Versa_1.6_Sedan.jpg',
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
    co2Emissions: '138 g/km (Etiqueta C)'
  },
  {
    id: 'honda_odyssey',
    name: 'Honda Odyssey 3.5L V6 (Touring / Black Edition)',
    brand: 'Honda',
    model: 'Odyssey',
    yearRange: '2021 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Minivan V6',
    averagePrice: '$1,189,000 MXN',
    priceRange: '$1,159,900 - $1,219,900 MXN (~$63,000 - $66,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/2018_Honda_Odyssey_EX-L_3.5L%2C_front_8.23.19.jpg/960px-2018_Honda_Odyssey_EX-L_3.5L%2C_front_8.23.19.jpg',
    engine: '3.5L V6 24V i-VTEC con desconexión selectiva de cilindros VCM (280 HP)',
    power: '280 HP @ 6.000 RPM (355 Nm torque)',
    fuelType: 'Gasolina Regular o Premium',
    consumption: {
      city: 8.8,
      hwy: 14.2,
      combined: 11.2,
      tankCapacityL: 73.8,
      estimatedRangeKm: 826,
      oilViscosity: '0W-20 Full Synthetic (Norma Honda)',
      oilCapacityL: 5.4
    },
    co2Emissions: '215 g/km (Etiqueta C)'
  },
  {
    id: 'toyota_rav4',
    name: 'Toyota RAV4 2.5L / Hybrid',
    brand: 'Toyota',
    model: 'RAV4',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina SUV / Híbrido',
    averagePrice: '$589,000 MXN',
    priceRange: '$545,000 - $750,000 MXN (~$32,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/2024_Toyota_RAV4_Prime_XSE_Premium_in_Silver_Sky_with_Midnight_Black_roof%2C_front_left.jpg/960px-2024_Toyota_RAV4_Prime_XSE_Premium_in_Silver_Sky_with_Midnight_Black_roof%2C_front_left.jpg',
    engine: '2.5L Dynamic Force 4 Cilindros (204 HP) / Híbrido AWD (219 HP)',
    power: '204 - 219 HP',
    fuelType: 'Gasolina Regular o Híbrido',
    consumption: {
      city: 13.6,
      hwy: 18.5,
      combined: 15.6,
      tankCapacityL: 55.0,
      estimatedRangeKm: 858,
      oilViscosity: '0W-16 / 0W-20 Full Synthetic',
      oilCapacityL: 4.5
    },
    co2Emissions: '115 - 145 g/km (Etiqueta ECO / C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg/960px-2020_Volkswagen_Golf_Style_1.5_Front.jpg',
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
    co2Emissions: '122 g/km (Etiqueta ECO en versiones eTSI)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/2019_Volkswagen_Jetta_1.4T_R-Line_in_Haba%C3%B1ero_Orange_Metallic%2C_front_right.jpg/960px-2019_Volkswagen_Jetta_1.4T_R-Line_in_Haba%C3%B1ero_Orange_Metallic%2C_front_right.jpg',
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
    co2Emissions: '142 g/km (Etiqueta C)'
  },
  {
    id: 'volkswagen_taos',
    name: 'Volkswagen Taos 1.4 TSI',
    brand: 'Volkswagen',
    model: 'Taos',
    yearRange: '2021 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina SUV Turbo',
    averagePrice: '$525,000 MXN',
    priceRange: '$495,000 - $590,000 MXN (~$28,500 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Volkswagen_Taos_1X7A6750.jpg/960px-Volkswagen_Taos_1X7A6750.jpg',
    engine: '1.4L TSI Turbo 16V (150 HP / 250 Nm torque)',
    power: '150 HP @ 5.000 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 13.0,
      hwy: 18.0,
      combined: 15.1,
      tankCapacityL: 50.0,
      estimatedRangeKm: 755,
      oilViscosity: '5W-30 VW 504.00 / 508.00',
      oilCapacityL: 4.5
    },
    co2Emissions: '144 g/km (Etiqueta C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/2022_Honda_Civic_Touring_in_Lunar_Silver_Metallic%2C_Front_Left%2C_05-10-2022.jpg/960px-2022_Honda_Civic_Touring_in_Lunar_Silver_Metallic%2C_Front_Left%2C_05-10-2022.jpg',
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
    co2Emissions: '108 - 132 g/km (Etiqueta ECO / C)'
  },
  {
    id: 'nissan_sentra',
    name: 'Nissan Sentra 2.0L',
    brand: 'Nissan',
    model: 'Sentra',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Sedán',
    averagePrice: '$415,000 MXN',
    priceRange: '$390,000 - $535,000 MXN (~$22,500 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/2024_Nissan_Sentra_%28B18%29_DSC_3754.jpg/960px-2024_Nissan_Sentra_%28B18%29_DSC_3754.jpg',
    engine: '2.0L 4 Cilindros DOHC 16V MR20DD (149 HP)',
    power: '149 HP @ 6.400 RPM (197 Nm torque)',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 14.1,
      hwy: 19.8,
      combined: 16.5,
      tankCapacityL: 47.0,
      estimatedRangeKm: 775,
      oilViscosity: '0W-20 Sintético API SP',
      oilCapacityL: 3.8
    },
    co2Emissions: '135 g/km (Etiqueta C)'
  },
  {
    id: 'nissan_kicks',
    name: 'Nissan Kicks 1.6L / e-POWER',
    brand: 'Nissan',
    model: 'Kicks',
    yearRange: '2021 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina SUV / e-POWER',
    averagePrice: '$445,000 MXN',
    priceRange: '$410,000 - $515,000 MXN (~$24,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/2025_Nissan_Kicks_SV_AWD_in_Deep_Blue_Pearl%2C_front_right%2C_2024-10-06.jpg/960px-2025_Nissan_Kicks_SV_AWD_in_Deep_Blue_Pearl%2C_front_right%2C_2024-10-06.jpg',
    engine: '1.6L 4 Cilindros (118 HP) o Motor Eléctrico e-POWER (134 HP)',
    power: '118 - 134 HP',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 15.0,
      hwy: 19.5,
      combined: 16.8,
      tankCapacityL: 41.0,
      estimatedRangeKm: 688,
      oilViscosity: '0W-20 Sintético',
      oilCapacityL: 3.5
    },
    co2Emissions: '128 g/km (Etiqueta ECO en e-POWER)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Mazda3_SKYACTIV-G.jpg/960px-Mazda3_SKYACTIV-G.jpg',
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
    co2Emissions: '148 g/km (Etiqueta C)'
  },
  {
    id: 'mazda_cx5',
    name: 'Mazda CX-5 2.5L / Turbo',
    brand: 'Mazda',
    model: 'CX-5',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina SUV',
    averagePrice: '$599,000 MXN',
    priceRange: '$559,000 - $689,000 MXN (~$32,500 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/2024_Mazda_CX-5_2.5_S_Select_in_Platinum_Quartz_Metallic%2C_front_right.jpg/960px-2024_Mazda_CX-5_2.5_S_Select_in_Platinum_Quartz_Metallic%2C_front_right.jpg',
    engine: '2.5L Skyactiv-G 4 Cilindros (187 HP) o 2.5L Turbo AWD (228 HP)',
    power: '187 - 228 HP',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 11.5,
      hwy: 16.5,
      combined: 13.8,
      tankCapacityL: 58.0,
      estimatedRangeKm: 800,
      oilViscosity: '0W-20 / 5W-30 Sintético',
      oilCapacityL: 4.8
    },
    co2Emissions: '162 g/km (Etiqueta C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/2012_Chevrolet_Aveo_LTZ_1.4_Front.jpg/960px-2012_Chevrolet_Aveo_LTZ_1.4_Front.jpg',
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
    co2Emissions: '135 g/km (Etiqueta C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/2022_Chevrolet_Onix_RS_1.0_Turbo.jpg/960px-2022_Chevrolet_Onix_RS_1.0_Turbo.jpg',
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
    co2Emissions: '120 g/km (Etiqueta C)'
  },
  {
    id: 'chevrolet_tracker',
    name: 'Chevrolet Tracker 1.2 Turbo',
    brand: 'Chevrolet',
    model: 'Tracker',
    yearRange: '2021 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina SUV Turbo',
    averagePrice: '$425,000 MXN',
    priceRange: '$395,000 - $485,000 MXN (~$23,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Chevrolet_Tracker_2021_%28front%29.png/960px-Chevrolet_Tracker_2021_%28front%29.png',
    engine: '1.2L 3 Cilindros Turbo Ecotec (130 HP / 190 Nm torque)',
    power: '130 HP @ 5.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 13.8,
      hwy: 18.9,
      combined: 15.8,
      tankCapacityL: 44.0,
      estimatedRangeKm: 695,
      oilViscosity: '0W-20 dexos1 Gen 3',
      oilCapacityL: 3.8
    },
    co2Emissions: '136 g/km (Etiqueta C)'
  },
  {
    id: 'kia_seltos',
    name: 'Kia Seltos 1.5L / 1.4 Turbo',
    brand: 'Kia',
    model: 'Seltos',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina SUV',
    averagePrice: '$469,000 MXN',
    priceRange: '$439,000 - $549,000 MXN (~$25,500 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg/960px-Kia_Seltos_SP2_PE_Snow_White_Pearl_%2817%29_%28cropped%29.jpg',
    engine: '1.5L Smartstream 4 Cilindros (113 HP) o 1.4L Turbo (138 HP)',
    power: '113 - 138 HP',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 13.5,
      hwy: 18.2,
      combined: 15.3,
      tankCapacityL: 50.0,
      estimatedRangeKm: 765,
      oilViscosity: '0W-20 / 5W-30 Sintético',
      oilCapacityL: 4.0
    },
    co2Emissions: '142 g/km (Etiqueta C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/2018_SEAT_Ibiza_SE_Technology_MPi_1.0_Front.jpg/960px-2018_SEAT_Ibiza_SE_Technology_MPi_1.0_Front.jpg',
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
    co2Emissions: '118 g/km (Etiqueta C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Renault_Duster_Techroad%2C_Natal_%28DSC05979%29.jpg/960px-Renault_Duster_Techroad%2C_Natal_%28DSC05979%29.jpg',
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
    co2Emissions: '154 g/km (Etiqueta C)'
  },
  {
    id: 'renault_kwid',
    name: 'Renault Kwid 1.0L',
    brand: 'Renault',
    model: 'Kwid',
    yearRange: '2019 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina City Car',
    averagePrice: '$235,000 MXN',
    priceRange: '$218,000 - $265,000 MXN (~$12,800 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png/960px-2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png',
    engine: '1.0L 3 Cilindros 12V SCe (66 HP)',
    power: '66 HP @ 5.750 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 17.5,
      hwy: 24.2,
      combined: 19.8,
      tankCapacityL: 38.0,
      estimatedRangeKm: 752,
      oilViscosity: '5W-30 / 10W-40 Sintético',
      oilCapacityL: 3.0
    },
    co2Emissions: '112 g/km (Etiqueta C)'
  },
  {
    id: 'suzuki_swift',
    name: 'Suzuki Swift 1.2 Boostergreen / Sport',
    brand: 'Suzuki',
    model: 'Swift',
    yearRange: '2020 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina / Microhíbrido',
    averagePrice: '$325,000 MXN',
    priceRange: '$299,000 - $395,000 MXN (~$17,500 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Suzuki_Swift_%282024%29_hybrid_DSC_6076.jpg/960px-Suzuki_Swift_%282024%29_hybrid_DSC_6076.jpg',
    engine: '1.2L Dualjet 12V con sistema Boostergreen 12V (82 HP) / 1.4 Turbo Sport (138 HP)',
    power: '82 - 138 HP',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 18.0,
      hwy: 23.5,
      combined: 20.4,
      tankCapacityL: 37.0,
      estimatedRangeKm: 754,
      oilViscosity: '0W-16 / 0W-20 Full Synthetic',
      oilCapacityL: 3.2
    },
    co2Emissions: '105 g/km (Etiqueta ECO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Ford_Ranger_2.0_EcoBlue_4WD_Wildtrak_X_%28IV%29_%E2%80%93_f_12102024.jpg/960px-Ford_Ranger_2.0_EcoBlue_4WD_Wildtrak_X_%28IV%29_%E2%80%93_f_12102024.jpg',
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
    co2Emissions: '205 g/km (Etiqueta C)'
  },
  {
    id: 'ford_f150',
    name: 'Ford F-150 / Lobo 5.0L V8 / PowerBoost',
    brand: 'Ford',
    model: 'F-150',
    yearRange: '2021 - 2025',
    type: 'combustion',
    badgeText: 'Gasolina Pickup V8 / Híbrida',
    averagePrice: '$1,280,000 MXN',
    priceRange: '$1,050,000 - $1,650,000 MXN (~$70,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/2021_Ford_F-150_SuperCrew%2C_front_4.28.21.jpg/960px-2021_Ford_F-150_SuperCrew%2C_front_4.28.21.jpg',
    engine: '5.0L V8 Ti-VCT (400 HP) o 3.5L V6 PowerBoost Full Hybrid (430 HP)',
    power: '400 - 430 HP',
    fuelType: 'Gasolina Regular o Premium',
    consumption: {
      city: 8.2,
      hwy: 12.1,
      combined: 9.8,
      tankCapacityL: 98.0,
      estimatedRangeKm: 960,
      oilViscosity: '5W-20 / 5W-30 Motorcraft Synthetic',
      oilCapacityL: 7.7
    },
    co2Emissions: '245 g/km (Etiqueta C / ECO)'
  },

  // =========================================================================
  // 2. VEHÍCULOS 100% ELÉCTRICOS (EV / BEV / PICKUP)
  // =========================================================================
  {
    id: 'tesla_cybertruck',
    name: 'Tesla Cybertruck (AWD / Cyberbeast)',
    brand: 'Tesla',
    model: 'Cybertruck',
    yearRange: '2024 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico Pickup',
    averagePrice: '$2,199,000 MXN',
    priceRange: '$1,949,000 - $2,599,900 MXN (~$108,000 - $144,000 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg/960px-2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg',
    engine: 'Dual Motor AWD (600 HP) o Tri-Motor Cyberbeast (845 HP) con Steer-by-Wire',
    power: '600 - 845 HP (0-100 en 2.6s)',
    fuelType: '100% Eléctrico (Batería 4680 Structural Pack)',
    consumption: {
      kwhPer100Km: 24.0,
      kmPerKwh: 4.16,
      batteryCapacityKwh: 123.0,
      estimatedRangeKm: 512,
      maxChargeAcKw: 11.5,
      maxChargeDcKw: 250.0,
      chargingTimes: {
        schuko23: '53 h (enchufe doméstico 2.3 kW)',
        wallbox74: '17 h (Wallbox 7.4 kW)',
        fastChargeDc: '20 min (Supercharger V4 250 kW 15-80%)'
      }
    },
    co2Emissions: '0 g/km (Etiqueta CERO)'
  },
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg/960px-2019_Tesla_Model_3_Performance_AWD_Front.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Tesla_Model_Y_Premium_%28Facelift%29_%E2%80%93_f_05052026.jpg/960px-Tesla_Model_Y_Premium_%28Facelift%29_%E2%80%93_f_05052026.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/2021_BYD_Dolphin_EV_%28front%29.jpg/960px-2021_BYD_Dolphin_EV_%28front%29.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/2022_BYD_Seal.jpg/960px-2022_BYD_Seal.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Nissan_Leaf_%28ZE2%29_autoMOBIL_T%C3%BCbingen_2025_DSC_2752.jpg/960px-Nissan_Leaf_%28ZE2%29_autoMOBIL_T%C3%BCbingen_2025_DSC_2752.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
  },
  {
    id: 'hyundai_ioniq_5',
    name: 'Hyundai Ioniq 5 (800V)',
    brand: 'Hyundai',
    model: 'Ioniq 5',
    yearRange: '2022 - 2025',
    type: 'electric',
    badgeText: '100% Eléctrico 800V',
    averagePrice: '$945,000 MXN',
    priceRange: '$890,000 - $1,150,000 MXN (~$51,300 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Hyundai_Ioniq_5_AWD_Techniq-Paket_%E2%80%93_f_31122024.jpg/960px-Hyundai_Ioniq_5_AWD_Techniq-Paket_%E2%80%93_f_31122024.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/MG4_Electric_%E2%80%93_f_21042025.jpg/960px-MG4_Electric_%E2%80%93_f_21042025.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/2021_Kia_EV6_GT-Line_S.jpg/960px-2021_Kia_EV6_GT-Line_S.jpg',
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
    co2Emissions: '0 g/km (Etiqueta CERO)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Honda_CBF125_2009.jpg/960px-Honda_CBF125_2009.jpg',
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
    co2Emissions: '34 g/km (Etiqueta C)'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Honda_Wave_125_S_2007.jpg/960px-Honda_Wave_125_S_2007.jpg',
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
    co2Emissions: '38 g/km'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Honda_PCX125_2011_Front.JPG/960px-Honda_PCX125_2011_Front.JPG',
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
    co2Emissions: '47 g/km'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Yamaha_YBR125_%28Fuel_Injection_-_EU_Spec%29.JPG/960px-Yamaha_YBR125_%28Fuel_Injection_-_EU_Spec%29.JPG',
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
    co2Emissions: '44 g/km'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Yamaha_nmax_cpd150_YCP.JPG/960px-Yamaha_nmax_cpd150_YCP.JPG',
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
    co2Emissions: '45 g/km'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg/960px-Moscow%2C_Yamaha_MT-03%2C_June_2025_01.jpg',
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
    co2Emissions: '89 g/km'
  },
  {
    id: 'yamaha_yzf_r3',
    name: 'Yamaha YZF-R3 (321cc)',
    brand: 'Yamaha',
    model: 'YZF-R3',
    yearRange: '2020 - 2025',
    type: 'moto',
    badgeText: 'SuperSport Deportiva',
    averagePrice: '$169,999 MXN',
    priceRange: '$155,000 - $185,000 MXN (~$9,200 USD)',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/YZF-R3_2019_v3.jpg/960px-YZF-R3_2019_v3.jpg',
    engine: '321cc Bicilíndrico 4T DOHC 4 Válvulas por cilindro con refrigeración líquida',
    power: '42 HP @ 10.750 RPM',
    fuelType: 'Gasolina Premium (91+ Octanos)',
    consumption: {
      city: 22.8,
      hwy: 27.5,
      combined: 25.0,
      tankCapacityL: 14.0,
      estimatedRangeKm: 350,
      oilViscosity: '10W-40 Sintético Yamalube 4R',
      oilCapacityL: 2.1
    },
    co2Emissions: '90 g/km'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Bajaj-NS400Z.jpg/960px-Bajaj-NS400Z.jpg',
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
    co2Emissions: '62 g/km'
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
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Ktm_duke_390.jpg/960px-Ktm_duke_390.jpg',
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
    co2Emissions: '79 g/km'
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Italika.jpg',
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
    co2Emissions: '65 g/km'
  },
  {
    id: 'italika_dm200',
    name: 'Italika DM200 Enduro',
    brand: 'Italika',
    model: 'DM200',
    yearRange: '2020 - 2025',
    type: 'moto',
    badgeText: 'Doble Propósito / Enduro',
    averagePrice: '$34,999 MXN',
    priceRange: '$31,000 - $38,000 MXN (~$1,900 USD)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Italika.jpg',
    engine: '198cc 4 Tiempos Monocilíndrico SOHC refrigerado por aire',
    power: '15.5 HP @ 8.500 RPM',
    fuelType: 'Gasolina Regular (87 Octanos)',
    consumption: {
      city: 28.0,
      hwy: 32.0,
      combined: 30.0,
      tankCapacityL: 11.0,
      estimatedRangeKm: 330,
      oilViscosity: '20W-50 4T Mineral / Semisintético',
      oilCapacityL: 1.1
    },
    co2Emissions: '72 g/km'
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
