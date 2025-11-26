// lib/rss-service.ts
import Parser from 'rss-parser';
import { NewsItem, RSS_SOURCES, INFOBAE_KEYWORDS, LANACION_ALLOWED_CATS } from './rss-config';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'], 
      ['enclosure', 'enclosure'],
      ['dc:creator', 'creator'],
      ['category', 'categories'] 
    ],
  },
  timeout: 5000,
});

/**
 * FUNCIÓN DE LIMPIEZA PROFUNDA
 * Diseñada para eliminar HTML y cortar scripts inyectados (caso iProfesional)
 */
const cleanText = (text?: string) => {
  if (!text) return "";

  let clean = text;

  // 1. Eliminar explícitamente bloques de script/style y su contenido interno
  // (Por si el RSS parser no los eliminó y trajo el código crudo)
  clean = clean.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "");

  // 2. Eliminar etiquetas HTML remanentes (<br>, <p>, etc.)
  clean = clean.replace(/<[^>]+>/g, " ");

  // 3. HEURÍSTICA DE CORTE (La solución para iProfesional)
  // Buscamos patrones comunes de inicio de scripts de tracking que suelen ensuciar los RSS
  // Cortamos el string en la primera aparición de cualquiera de estos.
  const garbagePatterns = [
    "(function(",       // Inicio de IIFE común en analytics
    "var _comscore",     // Comscore
    "ga('create'",       // Google Analytics antiguo
    "window.onload",     
    "var ",              // Declaraciones de variables sueltas al final
    "{"                  // A veces inyectan JSON directo
  ];

  for (const pattern of garbagePatterns) {
    const index = clean.indexOf(pattern);
    if (index !== -1) {
      // Cortamos todo desde donde empieza la basura
      clean = clean.substring(0, index);
    }
  }

  // 4. Normalización de espacios
  // Reemplaza saltos de línea, tabs y espacios múltiples por un único espacio
  clean = clean.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ");

  // 5. Decodificación básica de entidades HTML comunes (opcional pero recomendado)
  clean = clean
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  return clean.trim();
};

const matchesKeywords = (title?: string): boolean => {
  if (!title) return false;
  const lowerTitle = title.toLowerCase();
  return INFOBAE_KEYWORDS.some(keyword => lowerTitle.includes(keyword.toLowerCase()));
};

const extractImage = (item: any, strategy: string): string | null => {
  try {
    if (strategy === 'enclosure' && item.enclosure?.url) {
      return item.enclosure.url;
    }
    if (strategy === 'media') {
        const media = item.mediaContent;
        if (Array.isArray(media)) {
             return media[0]?.url || media[0]?.$?.url || null;
        }
        if (media && media.$ && media.$.url) return media.$.url;
        if (media && media.url) return media.url;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export async function fetchAllNews(): Promise<NewsItem[]> {
  console.log("🔄 Iniciando fetch con limpieza avanzada...");

  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url);
        if (!feed || !feed.items || !Array.isArray(feed.items)) {
             return [];
        }

        const normalizedItems = feed.items.map((item: any) => {
          if (!item) return null;

          try {
            // Filtros
            if (source.filterType === 'category') {
                const itemCats = item.categories || [];
                const catsString = Array.isArray(itemCats) 
                    ? itemCats.map((c: any) => typeof c === 'string' ? c : JSON.stringify(c)).join(' ')
                    : '';
                const hasCategory = LANACION_ALLOWED_CATS.some(allowed => catsString.includes(allowed));
                if (!hasCategory) return null;
            }

            if (source.filterType === 'keyword') {
                if (!matchesKeywords(item.title)) return null;
            }

            // Normalización con limpieza de descripción
            return {
                title: item.title ? item.title.trim() : 'Sin título',
                link: item.link || '#',
                pubDate: item.pubDate || new Date().toISOString(),
                description: cleanText(item.contentSnippet || item.description), // APLICAMOS CLEAN TEXT AQUÍ
                creator: source.name, 
                image: extractImage(item, source.strategy)
            } as NewsItem;

          } catch (innerError) {
              return null;
          }
        });
        return normalizedItems.filter((i): i is NewsItem => i !== null);

      } catch (error: any) {
        console.error(`❌ Error en fuente ${source.name}: ${error.message}`);
        return []; 
      }
    })
  );

  const allNews = results
    .flatMap(r => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  console.log(`🚀 Total noticias limpias: ${allNews.length}`);
  return allNews;
}