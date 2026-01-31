// ---------------------
// Tipos base
// ---------------------
export interface Cotizacion {
  id: string;
  destacado: boolean,
  compra: number;
  venta: number;
  variacion: number;
  fechaActualizacion: string;
}

export interface Criptomoneda {
  id: string;
  precio: number;
  variacion: number;
  simbolo: string;
}

export interface HistorialItem {
  fecha: string;
  valor: number;
}

export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fuente: string;
  fecha: string;
  categoria: string;
  url: string;
  imagen: string;
}

// Para el Blog (Ahora tipo Acordeón)
export interface BlogPost {
  id: number;
  titulo: string; // Pregunta/Tema
  contenido: string; // Respuesta
}

// Para FAQ (Ahora Tipos de Dólar con página detalle)
export interface DollarTypeDefinition {
  id: string;
  slug: string;
  titulo: string;
  descripcionCorta: string; // Para la card
  contenidoCompleto: { // Para la página detalle
    titulo: string;
    texto: string;
  }[];
}

export interface CotizacionItem {
  id: string,
  destacado: boolean,
  compra: number;
  venta: number;
  variacion: number;
  fechaActualizacion: string;
}

export interface CotizacionesMap {
  [key: string]: CotizacionItem;
}

// ---------------------
// Mock Cotizaciones (Sin cambios)
// ---------------------
export const mockCotizacionesObj: CotizacionesMap = {
  blue: { id: "blue", destacado: true, compra: 1150, venta: 1170, variacion: 2.5, fechaActualizacion: "2025-01-10T10:30:00Z" },
  oficial: { id: "oficial", destacado: true, compra: 950, venta: 990, variacion: 0.1, fechaActualizacion: "2025-01-10T10:30:00Z" },
  mep: { id: "mep", destacado: false, compra: 1080, venta: 1100, variacion: 1.2, fechaActualizacion: "2025-01-10T10:30:00Z" },
  ccl: { id: "ccl", destacado: false, compra: 1095, venta: 1115, variacion: 1.5, fechaActualizacion: "2025-01-10T10:30:00Z" },
  turista: { id: "turista", destacado: false, compra: 0, venta: 1584, variacion: 0.2, fechaActualizacion: "2025-01-10T10:30:00Z" },
  cripto: { id: "cripto", destacado: false, compra: 1105, venta: 1125, variacion: -0.8, fechaActualizacion: "2025-01-10T10:30:00Z" },
};

export const mockCotizaciones: Cotizacion[] = Object.values(mockCotizacionesObj);

export const mockOtrasCotizaciones: Cotizacion[] = [
   { id: "real", destacado: false, compra: 185, venta: 195, variacion: 0.5, fechaActualizacion: "2025-01-10T10:30:00Z" },
   { id: "euro", destacado: false, compra: 1050, venta: 1090, variacion: 0.3, fechaActualizacion: "2025-01-10T10:30:00Z" },
   { id: "oro", destacado: false, compra: 2650000, venta: 2680000, variacion: 1.1, fechaActualizacion: "2025-01-10T10:30:00Z" },
];

export const mockCriptomonedas: Criptomoneda[] = [
   { id:"btc", precio: 94250.5, variacion: 3.5, simbolo: "BTC" },
   { id:"eth", precio: 3420.75, variacion: 2.1, simbolo: "ETH" },
   { id:"usdt", precio: 1.0, variacion: 0.0, simbolo: "USDT" },
];

export const mockHistorial: Record<string, HistorialItem[]> = {
  "7d": [
    { fecha: "2025-01-04", valor: 1140 }, { fecha: "2025-01-05", valor: 1145 }, { fecha: "2025-01-06", valor: 1142 },
    { fecha: "2025-01-07", valor: 1148 }, { fecha: "2025-01-08", valor: 1155 }, { fecha: "2025-01-09", valor: 1160 }, { fecha: "2025-01-10", valor: 1170 },
  ],
  "30d": [
    { fecha: "2024-12-11", valor: 1090 }, { fecha: "2024-12-18", valor: 1105 }, { fecha: "2024-12-25", valor: 1120 },
    { fecha: "2025-01-01", valor: 1135 }, { fecha: "2025-01-08", valor: 1155 }, { fecha: "2025-01-10", valor: 1170 },
  ],
  "1y": [
    { fecha: "2024-01", valor: 890 }, { fecha: "2024-03", valor: 920 }, { fecha: "2024-05", valor: 950 },
    { fecha: "2024-07", valor: 1000 }, { fecha: "2024-09", valor: 1050 }, { fecha: "2024-11", valor: 1120 }, { fecha: "2025-01", valor: 1170 },
  ],
};

export const mockNoticias: Noticia[] = [
  {
    id: 1,
    titulo: "El dólar blue alcanzó un nuevo máximo histórico",
    descripcion: "La divisa informal registró su valor más alto del año en medio de la incertidumbre económica.",
    fuente: "Infobae", fecha: "2025-01-10T09:15:00Z", categoria: "Economía", url: "#", imagen: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: 2,
    titulo: "Nuevo plan del Banco Central para estabilizar el tipo de cambio",
    descripcion: "El BCRA anunció medidas para controlar la brecha cambiaria y fortalecer las reservas.",
    fuente: "Clarín", fecha: "2025-01-10T08:45:00Z", categoria: "Finanzas", url: "#", imagen: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  },
];

// ---------------------
// Blog Posts (NUEVO: Formato Pregunta/Respuesta para Acordeón)
// ---------------------
export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    titulo: "Diferencias entre dólar MEP y CCL",
    contenido: "El Dólar MEP (Mercado Electrónico de Pagos) se opera con bonos dentro de Argentina y los dólares resultantes quedan en una cuenta local. El Dólar CCL (Contado con Liquidación) también se opera con bonos o acciones, pero permite transferir los dólares a una cuenta en el exterior. El CCL suele ser más caro por este beneficio de 'fuga' legal de capitales.",
  },
  {
    id: 2,
    titulo: "Guía para turistas: dónde cambiar dólares",
    contenido: "Los turistas extranjeros pueden acceder a un tipo de cambio preferencial similar al MEP pagando con tarjetas de crédito o débito extranjeras. Evita las casas de cambio oficiales con tasa baja y prefiere el uso de tarjeta o 'cuevas' de confianza si buscas efectivo, aunque esto último conlleva riesgos de seguridad.",
  },
  {
    id: 3,
    titulo: "Consejos para freelancers: cómo cobrar del exterior",
    contenido: "Los freelancers pueden ingresar hasta 12.000 USD anuales sin pesificar a través del régimen de Monotributo Tech. Para montos mayores o fuera de este régimen, se utilizan plataformas cripto (USDT) o cuentas en el exterior, aunque esto requiere asesoramiento contable para evitar problemas con ARCA.",
  },
  {
    id: 4,
    titulo: "¿Por qué hay tantos dólares en Argentina?",
    contenido: "Debido a la inestabilidad histórica del Peso Argentino y la inflación crónica, los argentinos utilizan el Dólar como reserva de valor. Existen múltiples tipos de cambio (Oficial, Blue, MEP, Tarjeta) debido a las restricciones (cepo) impuestas por el gobierno para evitar la fuga de reservas del Banco Central.",
  },
  {
    id: 5,
    titulo: "¿Qué es la brecha cambiaria y por qué importa?",
    contenido: "La brecha es la diferencia porcentual entre el dólar oficial y los dólares paralelos (Blue, MEP, CCL). Una brecha alta indica desconfianza en la economía y expectativas de devaluación. Importa porque distorsiona precios relativos y fomenta la subfacturación de exportaciones.",
  },
  {
    id: 6,
    titulo: "¿Qué dólar toman para Netflix y Spotify?",
    contenido: "Los servicios digitales se cobran al valor del 'Dólar Tarjeta'. Este se compone del Dólar Oficial minorista más impuestos (Impuesto PAIS + Percepción de Ganancias). Suele ser uno de los tipos de cambio más altos.",
  },
  {
    id: 7,
    titulo: "¿Se puede comprar dólar MEP sin banco?",
    contenido: "Sí, se puede operar Dólar MEP a través de Agentes de Liquidación y Compensación (ALyC) o brokers online (como IOL, Balanz, Bull Market). Necesitas transferir los pesos desde tu cuenta bancaria al broker, operar los bonos y luego transferir los dólares de vuelta a tu cuenta bancaria.",
  }
];

// ---------------------
// FAQ - Definiciones de Dólar (NUEVO: Formato Detallado para SEO)
// ---------------------
export const mockDollarTypes: DollarTypeDefinition[] = [
  {
    id: "mep",
    slug: "dolar_mep",
    titulo: "¿Qué es el Dólar MEP?",
    descripcionCorta: "Se conoce como Dólar MEP o Dólar Bolsa al procedimiento para comprar dólares de forma legal y sin límite a través de la bolsa.",
    contenidoCompleto: [
      {
        titulo: "¿Qué es el Dólar MEP?",
        texto: "El Dólar MEP (Mercado Electrónico de Pagos) es una operación bursátil que permite comprar dólares mediante la compra y venta de bonos. Es 100% legal y, a diferencia del dólar ahorro, no tiene cupo de 200 USD mensuales."
      },
      {
        titulo: "¿Qué necesito para operar Dólar MEP?",
        texto: "Necesitas una cuenta bancaria en pesos y otra en dólares (ambas a tu nombre), y una Cuenta Comitente en un broker o banco para operar bonos."
      },
      {
        titulo: "¿Cómo vinculo la cuenta comitente?",
        texto: "La vinculación se hace desde la plataforma del broker (CBU). Debes declarar tu CBU en pesos para ingresar fondos y tu CBU en dólares para retirar los dólares resultantes de la operación."
      },
      {
        titulo: "¿Con qué bonos puedo hacerlo?",
        texto: "Los bonos más utilizados son el GD30 y el AL30. Se compran en pesos (ej. AL30) y, tras un día de parking, se venden en su versión en dólares (ej. AL30D)."
      }
    ]
  },
  {
    id: "blue",
    slug: "dolar_blue",
    titulo: "¿Qué es el Dólar Blue?",
    descripcionCorta: "El Dólar Blue es el tipo de cambio informal que circula en el mercado paralelo, fuera del sistema bancario oficial.",
    contenidoCompleto: [
      {
        titulo: "Definición",
        texto: "Es el dólar físico que se negocia en 'cuevas' o entre particulares. Su precio varía según la oferta y demanda y suele ser la referencia para precios de la economía informal."
      },
      {
        titulo: "¿Es legal?",
        texto: "Técnicamente es un mercado no regulado. Sin embargo, su cotización es pública y ampliamente difundida por los medios."
      }
    ]
  },
  {
    id: "oficial",
    slug: "dolar_oficial",
    titulo: "¿Qué es el Dólar Oficial?",
    descripcionCorta: "Es el tipo de cambio regulado por el Banco Central. Sirve de base para importaciones y exportaciones.",
    contenidoCompleto: [
      {
        titulo: "Tipos de Oficial",
        texto: "Existe el oficial mayorista (para empresas y comercio exterior) y el minorista (referencia para la gente, aunque difícil de acceder sin impuestos)."
      }
    ]
  },
  {
    id: "cripto",
    slug: "dolar_cripto",
    titulo: "¿Qué es el Dólar Cripto?",
    descripcionCorta: "Se refiere a las stablecoins (monedas estables) atadas al valor del dólar, como USDT, USDC o DAI.",
    contenidoCompleto: [
      {
        titulo: "Ventajas",
        texto: "Opera 24/7, no depende de bancos y se puede comprar sin límites. Su cotización suele estar cerca del CCL o Blue."
      }
    ]
  },
  {
    id: "tarjeta",
    slug: "dolar_tarjeta",
    titulo: "¿Qué es el Dólar Tarjeta/Turista?",
    descripcionCorta: "Es el valor que pagás cuando usás tu tarjeta de crédito para compras en moneda extranjera.",
    contenidoCompleto: [
      {
        titulo: "Composición",
        texto: "Se calcula tomando el Dólar Oficial y sumándole impuestos (Impuesto PAIS + Percepción de Ganancias). Es el dólar más caro generalmente."
      }
    ]
  }
];