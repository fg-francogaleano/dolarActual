export type CategoryType = 'economia' | 'politica' | 'finanzas' | 'otras';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
  category: CategoryType; 
  source: string;
}

export interface RssSourceConfig {
  name: string;
  url: string;
  strategy: 'explicit' | 'tag_filter' | 'keyword_inference';
  // Para estrategia 'explicit': qué categoría asignar a todo el feed
  targetCategory?: CategoryType; 
  // Para estrategia 'tag_filter': qué tags buscar dentro del XML
  allowedTags?: string[];
  // Tipo de extracción de imagen
  imageStrategy: 'enclosure' | 'media';
}

// --- KEYWORDS PARA INFOBAE ---
export const KEYWORDS = {
  POLITICA: [
    "política argentina", "política internacional", "actualidad política", "elecciones", "candidatos", 
    "partidos políticos", "sistema electoral", "democracia", "participación ciudadana", "opinión pública", 
    "poder ejecutivo", "poder legislativo", "poder judicial", "congreso", "cámara de diputados", "senado", 
    "políticas públicas", "gestión de gobierno", "corrupción política", "reforma electoral", "derechos humanos", 
    "políticas sociales", "políticas económicas", "política exterior", "relaciones internacionales", 
    "geopolítica", "diplomacia", "gobierno", "presidente", "ministro", "milei"
  ],
  ECONOMIA: [
    "economía argentina", "macroeconomía", "microeconomía", "pbi", "inflación", "recesión", 
    "crecimiento económico", "balanza comercial", "exportaciones", "importaciones", "mercado cambiario", 
    "mercado financiero", "mercado de capitales", "mercado laboral", "empleo", "salario real", "productividad", 
    "política monetaria", "política fiscal", "déficit fiscal", "deuda pública", "emisión monetaria", 
    "tasas de interés", "subsidios", "presupuesto"
  ],
  FINANZAS: [
    "educación financiera", "inversiones", "ahorro", "cartera de inversión", "jubilación", "bonos", 
    "acciones", "dólar blue", "dólar mep", "dólar ccl", "criptomonedas", "bitcoin", "stablecoins", 
    "etfs", "commodities", "estados financieros", "análisis financiero", "banca digital", "fintech", 
    "préstamos", "créditos", "tarjetas de crédito", "homebanking", "merval", "wall street", "cedear"
  ]
};

// --- FUENTES RSS ---
export const RSS_SOURCES: RssSourceConfig[] = [
  // 1. FUENTES EXPLÍCITAS (Categoría por URL)
  { name: "Clarin", url: "https://www.clarin.com/rss/economia/", strategy: "explicit", targetCategory: "economia", imageStrategy: "enclosure" },
  { name: "Clarin", url: "https://www.clarin.com/rss/politica/", strategy: "explicit", targetCategory: "politica", imageStrategy: "enclosure" },
  { name: "Ambito", url: "https://www.ambito.com/rss/pages/economia.xml", strategy: "explicit", targetCategory: "economia", imageStrategy: "enclosure" },
  { name: "Ambito", url: "https://www.ambito.com/rss/pages/politica.xml", strategy: "explicit", targetCategory: "politica", imageStrategy: "enclosure" },
  { name: "Ambito", url: "https://www.ambito.com/rss/pages/finanzas.xml", strategy: "explicit", targetCategory: "finanzas", imageStrategy: "enclosure" },
  { name: "iProfesional", url: "https://www.iprofesional.com/rss/economia", strategy: "explicit", targetCategory: "economia", imageStrategy: "enclosure" },
  { name: "iProfesional", url: "https://www.iprofesional.com/rss/finanzas", strategy: "explicit", targetCategory: "finanzas", imageStrategy: "enclosure" },
  { name: "iProfesional", url: "https://www.iprofesional.com/rss/impuestos", strategy: "explicit", targetCategory: "economia", imageStrategy: "enclosure" }, // Mapeamos impuestos a economia

  // 2. LA NACION (Filtrado por Tags)
  { 
    name: "La Nacion", 
    url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml", 
    strategy: "tag_filter", 
    imageStrategy: "media" 
  },

  // 3. INFOBAE (Inferencia por Keywords)
  { 
    name: "Infobae", 
    url: "https://www.infobae.com/arc/outboundfeeds/rss/", 
    strategy: "keyword_inference", 
    imageStrategy: "media" 
  }
];



// // lib/rss-config.ts

// export interface NewsItem {
//   title: string;
//   link: string;
//   pubDate: string;
//   description: string;
//   creator: string;
//   image: string | null;
//   category?: string[]; // Útil para depuración interna
// }

// // Palabras clave para el filtro de Infobae
// export const INFOBAE_KEYWORDS = [
//   "economia", "economía", "finanzas", "financiero", "dolar", "dólar",
//   "euro", "moneda", "bolsa", "acciones", "inversión", "inversiones",
//   "banco", "bancos", "mercado", "reservas", "pbi", "inflación", "deuda",
//   "tasa", "tasas", "tipo de cambio", "fmi", "bcra", "cepo", "bonos",
//   "cripto", "criptomonedas", "merval", "wall street", "divisas", "fisco",
//   "negocios", "ganancias", "impuestos", "capital"
// ];

// // Categorías permitidas para La Nación
// export const LANACION_ALLOWED_CATS = ["Economía", "Política", "Dolar Hoy"];

// // Configuración de fuentes
// export const RSS_SOURCES = [
//   // CLARIN
//   { name: "Clarin", url: "https://www.clarin.com/rss/economia/", strategy: "enclosure" },
//   { name: "Clarin", url: "https://www.clarin.com/rss/politica/", strategy: "enclosure" },
  
//   // AMBITO
//   { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/economia.xml", strategy: "enclosure" },
//   { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/politica.xml", strategy: "enclosure" },
//   { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/finanzas.xml", strategy: "enclosure" },
//   { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/negocios.xml", strategy: "enclosure" },

//   // I PROFESIONAL
//   { name: "iProfesional", url: "https://www.iprofesional.com/rss/economia", strategy: "enclosure" },
//   { name: "iProfesional", url: "https://www.iprofesional.com/rss/impuestos", strategy: "enclosure" },
//   { name: "iProfesional", url: "https://www.iprofesional.com/rss/finanzas", strategy: "enclosure" },
//   { name: "iProfesional", url: "https://www.iprofesional.com/rss/negocios", strategy: "enclosure" },

//   // LA NACION (Estrategia especial de filtrado por categoría)
//   { name: "La Nacion", url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml", strategy: "media", filterType: "category" },

//   // INFOBAE (Estrategia especial de filtrado por título)
//   { name: "Infobae", url: "https://www.infobae.com/arc/outboundfeeds/rss/", strategy: "media", filterType: "keyword" },
// ];