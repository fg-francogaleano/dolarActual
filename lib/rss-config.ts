export type CategoryType =
  | "economia"
  | "politica"
  | "finanzas"
  | "negocios"
  | "otras";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
  category: CategoryType;
  source: string;
  favicon: string; // NUEVO CAMPO
}

export interface RssSourceConfig {
  name: string;
  url: string;
  strategy: "explicit" | "tag_filter" | "keyword_inference";
  targetCategory?: CategoryType;
  allowedTags?: string[];
  imageStrategy: "enclosure" | "media";
  favicon: string; // NUEVO CAMPO EN CONFIG
}

// --- URLs DE FAVICONS ---
const FAVICONS = {
  CLARIN: "https://res.cloudinary.com/dexm7t5ty/image/upload/v1764474163/DolarActual/Clarin_gascta.png",
  IPROFESIONAL: "https://res.cloudinary.com/dexm7t5ty/image/upload/v1764474163/DolarActual/iProfesional_y01upr.png",
  AMBITO: "https://res.cloudinary.com/dexm7t5ty/image/upload/v1764474163/DolarActual/Ambito_bk3r7b.png",
  INFOBAE: "https://res.cloudinary.com/dexm7t5ty/image/upload/v1764474163/DolarActual/Infobae_g4nesd.png",
  LANACION: "https://res.cloudinary.com/dexm7t5ty/image/upload/v1764474163/DolarActual/Lanacion_hcalbt.png"
};

// --- KEYWORDS (Se mantienen igual) ---
export const KEYWORDS = {
  POLITICA: [
    "política argentina", "política internacional", "actualidad política", "elecciones", "candidatos",
    "partidos políticos", "sistema electoral", "democracia", "participación ciudadana", "opinión pública",
    "poder ejecutivo", "poder legislativo", "poder judicial", "congreso", "cámara de diputados", "senado",
    "políticas públicas", "gestión de gobierno", "corrupción política", "reforma electoral", "derechos humanos",
    "políticas sociales", "políticas económicas", "política exterior", "relaciones internacionales",
    "geopolítica", "diplomacia", "gobierno", "presidente", "ministro", "milei",
  ],
  ECONOMIA: [
    "economía argentina", "macroeconomía", "microeconomía", "pbi", "inflación", "recesión",
    "crecimiento económico", "balanza comercial", "exportaciones", "importaciones", "mercado cambiario",
    "mercado financiero", "mercado de capitales", "mercado laboral", "empleo", "salario real",
    "productividad", "política monetaria", "política fiscal", "déficit fiscal", "deuda pública",
    "emisión monetaria", "tasas de interés", "subsidios", "presupuesto",
  ],
  FINANZAS: [
    "educación financiera", "inversiones", "ahorro", "cartera de inversión", "jubilación", "bonos",
    "acciones", "dólar blue", "dólar mep", "dólar ccl", "criptomonedas", "bitcoin", "stablecoins",
    "etfs", "commodities", "estados financieros", "análisis financiero", "banca digital", "fintech",
    "préstamos", "créditos", "tarjetas de crédito", "homebanking", "merval", "wall street", "cedear",
  ],
};

// --- FUENTES RSS (Actualizadas con favicon) ---
export const RSS_SOURCES: RssSourceConfig[] = [
  // 1. CLARIN
  {
    name: "Clarin",
    url: "https://www.clarin.com/rss/economia/",
    strategy: "explicit",
    targetCategory: "economia",
    imageStrategy: "enclosure",
    favicon: FAVICONS.CLARIN
  },
  {
    name: "Clarin",
    url: "https://www.clarin.com/rss/politica/",
    strategy: "explicit",
    targetCategory: "politica",
    imageStrategy: "enclosure",
    favicon: FAVICONS.CLARIN
  },

  // 2. AMBITO
  {
    name: "Ambito",
    url: "https://www.ambito.com/rss/pages/economia.xml",
    strategy: "explicit",
    targetCategory: "economia",
    imageStrategy: "enclosure",
    favicon: FAVICONS.AMBITO
  },
  {
    name: "Ambito",
    url: "https://www.ambito.com/rss/pages/politica.xml",
    strategy: "explicit",
    targetCategory: "politica",
    imageStrategy: "enclosure",
    favicon: FAVICONS.AMBITO
  },
  {
    name: "Ambito",
    url: "https://www.ambito.com/rss/pages/finanzas.xml",
    strategy: "explicit",
    targetCategory: "finanzas",
    imageStrategy: "enclosure",
    favicon: FAVICONS.AMBITO
  },

  // 3. IPROFESIONAL
  {
    name: "iProfesional",
    url: "https://www.iprofesional.com/rss/economia",
    strategy: "explicit",
    targetCategory: "economia",
    imageStrategy: "enclosure",
    favicon: FAVICONS.IPROFESIONAL
  },
  {
    name: "iProfesional",
    url: "https://www.iprofesional.com/rss/finanzas",
    strategy: "explicit",
    targetCategory: "finanzas",
    imageStrategy: "enclosure",
    favicon: FAVICONS.IPROFESIONAL
  },
  {
    name: "iProfesional",
    url: "https://www.iprofesional.com/rss/negocios",
    strategy: "explicit",
    targetCategory: "negocios",
    imageStrategy: "enclosure",
    favicon: FAVICONS.IPROFESIONAL
  },

  // 4. LA NACION
  {
    name: "La Nacion",
    url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml",
    strategy: "tag_filter",
    imageStrategy: "media",
    favicon: FAVICONS.LANACION
  },

  // 5. INFOBAE
  {
    name: "Infobae",
    url: "https://www.infobae.com/arc/outboundfeeds/rss/",
    strategy: "keyword_inference",
    imageStrategy: "media",
    favicon: FAVICONS.INFOBAE
  },
];

















// export type CategoryType =
//   | "economia"
//   | "politica"
//   | "finanzas"
//   | "negocios"
//   | "otras";

// export interface NewsItem {
//   title: string;
//   link: string;
//   pubDate: string;
//   description: string;
//   creator: string;
//   image: string | null;
//   category: CategoryType;
//   source: string;
// }

// export interface RssSourceConfig {
//   name: string;
//   url: string;
//   strategy: "explicit" | "tag_filter" | "keyword_inference";
//   // Para estrategia 'explicit': qué categoría asignar a todo el feed
//   targetCategory?: CategoryType;
//   // Para estrategia 'tag_filter': qué tags buscar dentro del XML
//   allowedTags?: string[];
//   // Tipo de extracción de imagen
//   imageStrategy: "enclosure" | "media";
// }

// // --- KEYWORDS PARA INFOBAE ---
// export const KEYWORDS = {
//   POLITICA: [
//     "política argentina",
//     "política internacional",
//     "actualidad política",
//     "elecciones",
//     "candidatos",
//     "partidos políticos",
//     "sistema electoral",
//     "democracia",
//     "participación ciudadana",
//     "opinión pública",
//     "poder ejecutivo",
//     "poder legislativo",
//     "poder judicial",
//     "congreso",
//     "cámara de diputados",
//     "senado",
//     "políticas públicas",
//     "gestión de gobierno",
//     "corrupción política",
//     "reforma electoral",
//     "derechos humanos",
//     "políticas sociales",
//     "políticas económicas",
//     "política exterior",
//     "relaciones internacionales",
//     "geopolítica",
//     "diplomacia",
//     "gobierno",
//     "presidente",
//     "ministro",
//     "milei",
//   ],
//   ECONOMIA: [
//     "economía argentina",
//     "macroeconomía",
//     "microeconomía",
//     "pbi",
//     "inflación",
//     "recesión",
//     "crecimiento económico",
//     "balanza comercial",
//     "exportaciones",
//     "importaciones",
//     "mercado cambiario",
//     "mercado financiero",
//     "mercado de capitales",
//     "mercado laboral",
//     "empleo",
//     "salario real",
//     "productividad",
//     "política monetaria",
//     "política fiscal",
//     "déficit fiscal",
//     "deuda pública",
//     "emisión monetaria",
//     "tasas de interés",
//     "subsidios",
//     "presupuesto",
//   ],
//   FINANZAS: [
//     "educación financiera",
//     "inversiones",
//     "ahorro",
//     "cartera de inversión",
//     "jubilación",
//     "bonos",
//     "acciones",
//     "dólar blue",
//     "dólar mep",
//     "dólar ccl",
//     "criptomonedas",
//     "bitcoin",
//     "stablecoins",
//     "etfs",
//     "commodities",
//     "estados financieros",
//     "análisis financiero",
//     "banca digital",
//     "fintech",
//     "préstamos",
//     "créditos",
//     "tarjetas de crédito",
//     "homebanking",
//     "merval",
//     "wall street",
//     "cedear",
//   ],
// };

// // --- FUENTES RSS ---
// export const RSS_SOURCES: RssSourceConfig[] = [
//   // 1. FUENTES EXPLÍCITAS (Categoría por URL)
//   {
//     name: "Clarin",
//     url: "https://www.clarin.com/rss/economia/",
//     strategy: "explicit",
//     targetCategory: "economia",
//     imageStrategy: "enclosure",
//   },
//   {
//     name: "Clarin",
//     url: "https://www.clarin.com/rss/politica/",
//     strategy: "explicit",
//     targetCategory: "politica",
//     imageStrategy: "enclosure",
//   },
//   {
//     name: "Ambito",
//     url: "https://www.ambito.com/rss/pages/economia.xml",
//     strategy: "explicit",
//     targetCategory: "economia",
//     imageStrategy: "enclosure",
//   },
//   {
//     name: "Ambito",
//     url: "https://www.ambito.com/rss/pages/politica.xml",
//     strategy: "explicit",
//     targetCategory: "politica",
//     imageStrategy: "enclosure",
//   },
//   {
//     name: "Ambito",
//     url: "https://www.ambito.com/rss/pages/finanzas.xml",
//     strategy: "explicit",
//     targetCategory: "finanzas",
//     imageStrategy: "enclosure",
//   },
//   {
//     name: "iProfesional",
//     url: "https://www.iprofesional.com/rss/economia",
//     strategy: "explicit",
//     targetCategory: "economia",
//     imageStrategy: "enclosure",
//   },
//   {
//     name: "iProfesional",
//     url: "https://www.iprofesional.com/rss/finanzas",
//     strategy: "explicit",
//     targetCategory: "finanzas",
//     imageStrategy: "enclosure",
//   },
//   {
//     name: "iProfesional",
//     url: "https://www.iprofesional.com/rss/negocios",
//     strategy: "explicit",
//     targetCategory: "negocios",
//     imageStrategy: "enclosure",
//   }, // Mapeamos impuestos a economia
//   // {
//   //   name: "El Economista",
//   //   url: "https://eleconomista.com.ar/economia/feed",
//   //   strategy: "explicit",
//   //   targetCategory: "economia",
//   //   imageStrategy: "enclosure",
//   // }, // Mapeamos impuestos a economia
//   // {
//   //   name: "El Economista",
//   //   url: "https://eleconomista.com.ar/politica/feed",
//   //   strategy: "explicit",
//   //   targetCategory: "politica",
//   //   imageStrategy: "enclosure",
//   // }, // Mapeamos impuestos a economia
//   // {
//   //   name: "El Economista",
//   //   url: "https://eleconomista.com.ar/finanzas/feed",
//   //   strategy: "explicit",
//   //   targetCategory: "finanzas",
//   //   imageStrategy: "enclosure",
//   // },
//   // {
//   //   name: "El Economista",
//   //   url: "https://eleconomista.com.ar/negocios/feed",
//   //   strategy: "explicit",
//   //   targetCategory: "negocios",
//   //   imageStrategy: "enclosure",
//   // }, // Mapeamos impuestos a economia

//   // 2. LA NACION (Filtrado por Tags)
//   {
//     name: "La Nacion",
//     url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml",
//     strategy: "tag_filter",
//     imageStrategy: "media",
//   },

//   // 3. INFOBAE (Inferencia por Keywords)
//   {
//     name: "Infobae",
//     url: "https://www.infobae.com/arc/outboundfeeds/rss/",
//     strategy: "keyword_inference",
//     imageStrategy: "media",
//   },
// ];

