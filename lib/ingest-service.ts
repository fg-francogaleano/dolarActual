import { fetchAllNews } from '@/lib/rss-service';
import connectDB from '@/lib/db'; 
import News from '@/models/News';

export async function ingestNews() {
  await connectDB();
  console.log("🚀 [Ingest Service] Iniciando proceso de ingesta...");

  const rawNews = await fetchAllNews();
  if (!rawNews.length) return { status: 'Warning', message: 'No news fetched' };

  const operations = rawNews.map(item => ({
    updateOne: {
      filter: { link: item.link },
      update: {
        $set: {
          title: item.title,
          pubDate: new Date(item.pubDate),
          description: item.description,
          creator: item.creator,
          image: item.image,
          category: item.category,
          source: item.source,
          favicon: item.favicon, 
          searchableText: `${item.title} ${item.description} ${item.category || ''} ${item.creator}`
        }
      },
      upsert: true
    }
  }));

  try {
    // console.log(operations)
    const result = await News.bulkWrite(operations);
    console.log(`✅ [Ingest Service] Completado. Insertados: ${result.upsertedCount}, Modificados: ${result.modifiedCount}`);
    return result;
  } catch (error) {
    console.error("❌ [Ingest Service] Error guardando en DB:", error);
    throw error;
  }
}



// import { fetchAllNews } from '@/lib/rss-service';
// import connectDB from '@/lib/db'; 
// import News from '@/models/News';

// export async function ingestNews() {
//   // 1. Conectar a la base de datos (Local o Atlas según tu .env)
//   await connectDB();
//   console.log("🚀 [Ingest Service] Iniciando proceso de ingesta...");

//   // 2. Obtener noticias limpias y categorizadas
//   const rawNews = await fetchAllNews();

//   if (!rawNews.length) return { status: 'Warning', message: 'No news fetched' };

//   // 3. Preparar Bulk Operations
//   // Usamos upsert para no duplicar: Si el link existe, actualizamos.
//   const operations = rawNews.map(item => ({
//     updateOne: {
//       filter: { link: item.link },
//       update: {
//         $set: {
//           title: item.title,
//           pubDate: new Date(item.pubDate),
//           description: item.description,
//           creator: item.creator,
//           image: item.image,
//           category: item.category, // IMPORTANTE: Guardamos la categoría calculada
//           source: item.source,     // IMPORTANTE: Guardamos la fuente (ej: Clarin)
//           // Campo combinado para búsqueda de texto
//           searchableText: `${item.title} ${item.description} ${item.category || ''} ${item.creator}`
//         }
//       },
//       upsert: true
//     }
//   }));

//   // 4. Ejecutar en MongoDB
//   try {
//     const result = await News.bulkWrite(operations);
//     console.log(`✅ [Ingest Service] Completado. Insertados: ${result.upsertedCount}, Modificados: ${result.modifiedCount}`);
//     return result;
//   } catch (error) {
//     console.error("❌ [Ingest Service] Error guardando en DB:", error);
//     throw error;
//   }
// }