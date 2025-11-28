import { CategoryType, KEYWORDS } from './rss-config';

/**
 * Limpia y normaliza el texto (quita HTML, scripts y espacios extra)
 */
export const cleanText = (text?: string): string => {
  if (!text) return "";
  let clean = text;
  
  // Quitar scripts y estilos
  clean = clean.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "");
  // Quitar tags HTML
  clean = clean.replace(/<[^>]+>/g, " ");
  // Cortar patrones de basura conocidos (iProfesional)
  const garbagePatterns = ["(function(", "var _comscore", "ga('create'", "window.onload", "var "];
  for (const pattern of garbagePatterns) {
    const index = clean.indexOf(pattern);
    if (index !== -1) clean = clean.substring(0, index);
  }
  // Normalizar espacios y decodificar entidades básicas
  clean = clean.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ");
  clean = clean.replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  
  return clean.trim();
};

/**
 * Extrae imagen según estrategia
 */
export const extractImage = (item: any, strategy: 'enclosure' | 'media'): string | null => {
  try {
    if (strategy === 'enclosure' && item.enclosure?.url) {
      return item.enclosure.url;
    }
    if (strategy === 'media') {
        const media = item.mediaContent; // rss-parser custom field
        if (Array.isArray(media)) return media[0]?.url || media[0]?.$?.url || null;
        if (media && media.$ && media.$.url) return media.$.url;
        if (media && media.url) return media.url;
    }
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * Estrategia LA NACION: Busca en los tags <category>
 */
export const determineCategoryByTags = (categories: any[]): CategoryType | null => {
  if (!categories || !Array.isArray(categories)) return null;
  
  // Convertimos a string y lower case para facilitar búsqueda
  const tagsString = categories.map(c => 
    (typeof c === 'string' ? c : JSON.stringify(c)).toLowerCase()
  ).join(' ');

  // Prioridad: Si tiene ambos, definimos cual gana. 
  // Política suele ser más general, Economía más específico.
  if (tagsString.includes('dolar') || tagsString.includes('dólar')) return 'finanzas';
  if (tagsString.includes('economia') || tagsString.includes('economía')) return 'economia';
  if (tagsString.includes('politica') || tagsString.includes('política')) return 'politica';
  
  return null; // Si es Deportes, Espectáculos, etc., devuelve null (será filtrado)
};

/**
 * Estrategia INFOBAE: Inferencia por Texto + Keywords
 */
export const determineCategoryByKeywords = (title: string, description: string): CategoryType | null => {
  const content = (cleanText(title) + " " + cleanText(description)).toLowerCase();
  
  // Función auxiliar de matcheo
  const matches = (list: string[]) => list.some(k => content.includes(k.toLowerCase()));

  // ORDEN DE PRIORIDAD: Finanzas > Economía > Política
  // (Finanzas es el nicho más específico, Política el más amplio)
  
  if (matches(KEYWORDS.FINANZAS)) return 'finanzas';
  if (matches(KEYWORDS.ECONOMIA)) return 'economia';
  if (matches(KEYWORDS.POLITICA)) return 'politica';

  return null; // Estrategia: Descartar si no matchea nada para evitar ruido en el feed
};