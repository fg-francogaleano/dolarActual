// ---------------------
// Tipos base
// ---------------------
export interface Cotizacion {
  id: string;
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

export interface BlogPost {
  id: number;
  titulo: string;
  slug: string;
  contenido: string;
  fecha: string;
  categoria: string;
}

export interface FAQs {
  pregunta: string;
  respuesta: string;
}

// ---------------------
// Mock Cotizaciones
// ---------------------
export const mockCotizaciones: Cotizacion[] = [
  {
    id: "blue",
    compra: 1150,
    venta: 1170,
    variacion: 2.5,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
  {
    id: "oficial",
    compra: 950,
    venta: 990,
    variacion: 0.1,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
  {
    id: "mep",
    compra: 1080,
    venta: 1100,
    variacion: 1.2,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
  {
    id: "ccl",
    compra: 1095,
    venta: 1115,
    variacion: 1.5,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
  {
    id: "turista",
    compra: 0,
    venta: 1584,
    variacion: 0.2,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
  {
    id: "cripto",
    compra: 1105,
    venta: 1125,
    variacion: -0.8,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
];


// ---------------------
// Otras Cotizaciones
// ---------------------
export const mockOtrasCotizaciones: Cotizacion[] = [
   {
    id: "real",
    compra: 185,
    venta: 195,
    variacion: 0.5,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
   {
    id: "euro",
    compra: 1050,
    venta: 1090,
    variacion: 0.3,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
   {
    id: "oro",
    compra: 2650000,
    venta: 2680000,
    variacion: 1.1,
    fechaActualizacion: "2025-01-10T10:30:00Z",
  },
];

// ---------------------
// Criptomonedas
// ---------------------
export const mockCriptomonedas: Criptomoneda[] = [
   {
    id:"btc",
    precio: 94250.5,
    variacion: 3.5,
    simbolo: "BTC",
  },
   {
    id:"eth",
    precio: 3420.75,
    variacion: 2.1,
    simbolo: "ETH",
  },
  {
    id:"usdt",
    precio: 1.0,
    variacion: 0.0,
    simbolo: "USDT",
  },
];

// ---------------------
// Historial
// ---------------------
export const mockHistorial: Record<string, HistorialItem[]> = {
  "7d": [
    { fecha: "2025-01-04", valor: 1140 },
    { fecha: "2025-01-05", valor: 1145 },
    { fecha: "2025-01-06", valor: 1142 },
    { fecha: "2025-01-07", valor: 1148 },
    { fecha: "2025-01-08", valor: 1155 },
    { fecha: "2025-01-09", valor: 1160 },
    { fecha: "2025-01-10", valor: 1170 },
  ],
  "30d": [
    { fecha: "2024-12-11", valor: 1090 },
    { fecha: "2024-12-18", valor: 1105 },
    { fecha: "2024-12-25", valor: 1120 },
    { fecha: "2025-01-01", valor: 1135 },
    { fecha: "2025-01-08", valor: 1155 },
    { fecha: "2025-01-10", valor: 1170 },
  ],
  "1y": [
    { fecha: "2024-01", valor: 890 },
    { fecha: "2024-03", valor: 920 },
    { fecha: "2024-05", valor: 950 },
    { fecha: "2024-07", valor: 1000 },
    { fecha: "2024-09", valor: 1050 },
    { fecha: "2024-11", valor: 1120 },
    { fecha: "2025-01", valor: 1170 },
  ],
};

// ---------------------
// Noticias
// ---------------------
export const mockNoticias: Noticia[] = [
  {
    id: 1,
    titulo: "El dólar blue alcanzó un nuevo máximo histórico",
    descripcion:
      "La divisa informal registró su valor más alto del año en medio de la incertidumbre económica.",
    fuente: "Infobae",
    fecha: "2025-01-10T09:15:00Z",
    categoria: "Economía",
    url: "#",
    imagen:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: 2,
    titulo: "Nuevo plan del Banco Central para estabilizar el tipo de cambio",
    descripcion:
      "El BCRA anunció medidas para controlar la brecha cambiaria y fortalecer las reservas.",
    fuente: "Clarín",
    fecha: "2025-01-10T08:45:00Z",
    categoria: "Finanzas",
    url: "#",
    imagen:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
  },
  {
    id: 3,
    titulo:
      "Cómo impacta la devaluación en el poder adquisitivo de los argentinos",
    descripcion:
      "Análisis sobre las consecuencias de la política cambiaria en la economía familiar.",
    fuente: "La Nación",
    fecha: "2025-01-09T18:30:00Z",
    categoria: "Economía",
    url: "#",
    imagen:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
  {
    id: 4,
    titulo: "Mercados financieros: expectativas para el primer trimestre",
    descripcion:
      "Expertos analizan el panorama económico y las proyecciones para los próximos meses.",
    fuente: "Ámbito Financiero",
    fecha: "2025-01-09T16:00:00Z",
    categoria: "Finanzas",
    url: "#",
    imagen:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
  },
  {
    id: 5,
    titulo: "Inversiones: qué hacer con los ahorros en tiempos de inflación",
    descripcion:
      "Guía práctica para proteger el patrimonio ante la volatilidad económica.",
    fuente: "iProfesional",
    fecha: "2025-01-09T14:20:00Z",
    categoria: "Inversiones",
    url: "#",
    imagen:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
  },
];

// ---------------------
// Blog Posts
// ---------------------
export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    titulo: "¿Qué es el dólar blue y por qué existe?",
    slug: "que-es-dolar-blue",
    contenido: "El dólar blue es el tipo de cambio paralelo o informal...",
    fecha: "2025-01-05",
    categoria: "Educativo",
  },
  {
    id: 2,
    titulo: "Diferencias entre dólar MEP y CCL",
    slug: "diferencias-mep-ccl",
    contenido:
      "El MEP (Mercado Electrónico de Pagos) y el CCL (Contado con Liquidación)...",
    fecha: "2025-01-03",
    categoria: "Educativo",
  },
  {
    id: 3,
    titulo: "Guía para turistas: dónde cambiar dólares",
    slug: "guia-turistas-cambio",
    contenido:
      "Si vienes a Argentina, aquí te explicamos las mejores opciones...",
    fecha: "2024-12-28",
    categoria: "Turismo",
  },
  {
    id: 4,
    titulo: "Consejos para freelancers: cómo cobrar del exterior",
    slug: "freelancers-cobrar-exterior",
    contenido:
      "Para freelancers argentinos que trabajan con clientes extranjeros...",
    fecha: "2024-12-20",
    categoria: "Freelance",
  },
];

export const mockFAQs: FAQs[] = [
  {
    pregunta: "¿Qué es el dólar blue?",
    respuesta: "El dólar blue es el tipo de cambio paralelo o informal que se comercializa fuera del mercado oficial regulado. Se negocia en casas de cambio no autorizadas (cuevas) y su precio es determinado por la oferta y demanda del mercado informal."
  },
  {
    pregunta: "¿De dónde se obtiene la cotización?",
    respuesta: "Las cotizaciones son obtenidas en tiempo real desde fuentes oficiales y reconocidas del mercado financiero argentino, incluyendo bancos, casas de cambio autorizadas y medios especializados."
  },
  {
    pregunta: "¿Cómo funciona el conversor?",
    respuesta: "El conversor utiliza las cotizaciones en tiempo real para calcular equivalencias entre diferentes monedas. Selecciona la moneda de origen, la de destino, ingresa el monto y obtendrás el resultado instantáneamente."
  },
  {
    pregunta: "¿Qué es el dólar turista?",
    respuesta: "Es el tipo de cambio que se aplica a las compras con tarjeta de débito o crédito en el exterior, o compras online en moneda extranjera. Incluye el tipo de cambio oficial más impuestos (30% PAIS + 45% a cuenta de Ganancias)."
  },
  {
    pregunta: "¿Qué es el dólar MEP?",
    respuesta: "MEP significa Mercado Electrónico de Pagos. Es un tipo de dólar que se obtiene comprando bonos en pesos y vendiéndolos en dólares dentro del mercado local. Es legal y no tiene restricciones de monto."
  },
  {
    pregunta: "¿Qué es el dólar CCL?",
    respuesta: "CCL significa Contado con Liquidación. Similar al MEP, pero permite transferir los dólares al exterior. Se compran bonos en pesos en Argentina y se venden en dólares en el exterior."
  }
];
