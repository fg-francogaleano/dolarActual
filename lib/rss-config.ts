// lib/rss-config.ts

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
  category?: string[]; // Útil para depuración interna
}

// Palabras clave para el filtro de Infobae
export const INFOBAE_KEYWORDS = [
  "economia", "economía", "finanzas", "financiero", "dolar", "dólar",
  "euro", "moneda", "bolsa", "acciones", "inversión", "inversiones",
  "banco", "bancos", "mercado", "reservas", "pbi", "inflación", "deuda",
  "tasa", "tasas", "tipo de cambio", "fmi", "bcra", "cepo", "bonos",
  "cripto", "criptomonedas", "merval", "wall street", "divisas", "fisco",
  "negocios", "ganancias", "impuestos", "capital"
];

// Categorías permitidas para La Nación
export const LANACION_ALLOWED_CATS = ["Economía", "Política", "Dolar Hoy"];

// Configuración de fuentes
export const RSS_SOURCES = [
  // CLARIN
  { name: "Clarin", url: "https://www.clarin.com/rss/economia/", strategy: "enclosure" },
  { name: "Clarin", url: "https://www.clarin.com/rss/politica/", strategy: "enclosure" },
  
  // AMBITO
  { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/economia.xml", strategy: "enclosure" },
  { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/politica.xml", strategy: "enclosure" },
  { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/finanzas.xml", strategy: "enclosure" },
  { name: "Ambito Financiero", url: "https://www.ambito.com/rss/pages/negocios.xml", strategy: "enclosure" },

  // I PROFESIONAL
  { name: "iProfesional", url: "https://www.iprofesional.com/rss/economia", strategy: "enclosure" },
  { name: "iProfesional", url: "https://www.iprofesional.com/rss/impuestos", strategy: "enclosure" },
  { name: "iProfesional", url: "https://www.iprofesional.com/rss/finanzas", strategy: "enclosure" },
  { name: "iProfesional", url: "https://www.iprofesional.com/rss/negocios", strategy: "enclosure" },

  // LA NACION (Estrategia especial de filtrado por categoría)
  { name: "La Nacion", url: "https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml", strategy: "media", filterType: "category" },

  // INFOBAE (Estrategia especial de filtrado por título)
  { name: "Infobae", url: "https://www.infobae.com/arc/outboundfeeds/rss/", strategy: "media", filterType: "keyword" },
];