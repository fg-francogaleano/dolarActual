import Parser from 'rss-parser';
import { RSS_SOURCES, NewsItem, CategoryType } from './rss-config';
import { 
  cleanText, 
  extractImage, 
  determineCategoryByTags, 
  determineCategoryByKeywords 
} from './rss-helpers';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36',
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'], 
      ['enclosure', 'enclosure'],
      ['dc:creator', 'creator'],
      ['category', 'categories'] 
    ],
  },
  timeout: 10000,
});

export async function fetchAllNews(): Promise<NewsItem[]> {
  console.log("🔄 [RSS Service] Iniciando recolección de noticias...");

  const results = await Promise.allSettled(
    RSS_SOURCES.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url);
        
        if (!feed || !feed.items || !Array.isArray(feed.items)) {
             console.warn(`⚠️ [RSS Service] ${source.name} devolvió un feed inválido.`);
             return [];
        }

        const processedItems = feed.items.map((item: any) => {
          // --- 1. DETERMINAR CATEGORÍA ---
          let assignedCategory: CategoryType | null = null;

          if (source.strategy === 'explicit' && source.targetCategory) {
            assignedCategory = source.targetCategory;
          } 
          else if (source.strategy === 'tag_filter') {
            assignedCategory = determineCategoryByTags(item.categories);
          } 
          else if (source.strategy === 'keyword_inference') {
            assignedCategory = determineCategoryByKeywords(item.title, item.contentSnippet || item.description);
          }

          if (!assignedCategory) return null;

          // --- 2. NORMALIZACIÓN ---
          const normalized: NewsItem = {
            title: item.title ? item.title.trim() : 'Sin título',
            link: item.link || '#',
            pubDate: item.pubDate || new Date().toISOString(),
            description: cleanText(item.contentSnippet || item.description),
            creator: source.name,
            image: extractImage(item, source.imageStrategy),
            category: assignedCategory,
            source: source.name,
            favicon: source.favicon 
          };
          return normalized;
        });

        const validItems = processedItems.filter((i): i is NewsItem => i !== null);
        return validItems;

      } catch (error: any) {
        console.error(`❌ [RSS Service] Error en ${source.name} [${source.url}]: ${error.message}`);
        return []; 
      }
    })
  );

  const allNews = results
    .flatMap(r => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const uniqueNews = Array.from(new Map(allNews.map(item => [item.link, item])).values());

  console.log(`🚀 [RSS Service] Total final de noticias listas para ingestión: ${uniqueNews.length}`);
  return uniqueNews;
}



// import Parser from 'rss-parser';
// import { RSS_SOURCES, NewsItem, CategoryType } from './rss-config';
// import { 
//   cleanText, 
//   extractImage, 
//   determineCategoryByTags, 
//   determineCategoryByKeywords 
// } from './rss-helpers';

// // Configuración del Parser
// const parser = new Parser({
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36',
//   },
//   customFields: {
//     item: [
//       ['media:content', 'mediaContent'], 
//       ['enclosure', 'enclosure'],
//       ['dc:creator', 'creator'],
//       ['category', 'categories'] 
//     ],
//   },
//   timeout: 10000,
// });

// export async function fetchAllNews(): Promise<NewsItem[]> {
//   console.log("🔄 [RSS Service] Iniciando recolección de noticias...");

//   const results = await Promise.allSettled(
//     RSS_SOURCES.map(async (source) => {
//       try {
//         const feed = await parser.parseURL(source.url);
        
//         if (!feed || !feed.items || !Array.isArray(feed.items)) {
//              console.warn(`⚠️ [RSS Service] ${source.name} devolvió un feed inválido.`);
//              return [];
//         }

//         const processedItems = feed.items.map((item: any) => {
//           // --- 1. DETERMINAR CATEGORÍA ---
//           let assignedCategory: CategoryType | null = null;

//           if (source.strategy === 'explicit' && source.targetCategory) {
//             assignedCategory = source.targetCategory;
//           } 
//           else if (source.strategy === 'tag_filter') {
//             assignedCategory = determineCategoryByTags(item.categories);
//           } 
//           else if (source.strategy === 'keyword_inference') {
//             assignedCategory = determineCategoryByKeywords(item.title, item.contentSnippet || item.description);
//           }

//           if (!assignedCategory) return null;

//           // --- 2. NORMALIZACIÓN ---
//           const normalized: NewsItem = {
//             title: item.title ? item.title.trim() : 'Sin título',
//             link: item.link || '#',
//             pubDate: item.pubDate || new Date().toISOString(),
//             description: cleanText(item.contentSnippet || item.description),
//             creator: source.name,             
//             image: extractImage(item, source.imageStrategy),
//             category: assignedCategory,
//             source: source.name
//           };

//           return normalized;
//         });

//         const validItems = processedItems.filter((i): i is NewsItem => i !== null);
//         return validItems;

//       } catch (error: any) {
//         console.error(`❌ [RSS Service] Error en ${source.name} [${source.url}]: ${error.message}`);
//         return []; 
//       }
//     })
//   );

//   const allNews = results
//     .flatMap(r => (r.status === 'fulfilled' ? r.value : []))
//     .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

//   // Deduplicación por Link
//   const uniqueNews = Array.from(new Map(allNews.map(item => [item.link, item])).values());

//   console.log(`🚀 [RSS Service] Total final de noticias listas para ingestión: ${uniqueNews.length}`);
//   return uniqueNews;
// }