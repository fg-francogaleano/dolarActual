import connectDB from '@/lib/db';
import News from '@/models/News';

export interface NewsFilterParams {
  page?: number;
  limit?: number;
  section?: string; // Slug principal (ej: 'economia', 'todas')
  searchParams?: URLSearchParams | any; // Para filtros complejos (?clarin&ambito&politica)
}

export async function getNewsPaginated({ page = 1, limit = 40, section, searchParams }: NewsFilterParams) {
  await connectDB();

  const skip = (page - 1) * limit;
  let query: any = {};

  // 1. Lógica de Sección Principal
  // Si la sección es específica (no "todas"), forzamos ese filtro base
  const isAll = section === 'noticias';
  
  if (!isAll && section) {
    query.category = section.toLowerCase();
  }

  // 2. Filtros Avanzados desde URL (Query Strings)
  // Ejemplo URL: /todas?clarin&ambito&economia
  // Detectamos keys sin valor o con valor 'true' que coincidan con nuestros criterios
  
  const knownCategories = ['economia', 'finanzas', 'politica', 'negocios'];
  const knownMedia = ['clarin', 'la nacion', 'ambito', 'iprofesional', 'infobae', 'cronista']; // Agrega tus medios

  const activeCategories: string[] = [];
  const activeMedia: string[] = [];

  // Parseamos los searchParams
  // Manejo robusto tanto si viene de Next.js object como de URLSearchParams
  const paramsKeys = searchParams instanceof URLSearchParams 
    ? Array.from(searchParams.keys()) 
    : Object.keys(searchParams || {});

  paramsKeys.forEach(key => {
    const k = key.toLowerCase();
    if (knownCategories.includes(k)) activeCategories.push(k);
    
    // Búsqueda parcial para medios (ej: "clarin" matchea "Diario Clarín")
    const foundMedia = knownMedia.find(m => k.includes(m) || m.includes(k));
    if (foundMedia) activeMedia.push(foundMedia);
  });

  // 3. Construcción de Query MongoDB (Combinación de Filtros)
  
  // Si estamos en /todas y hay filtros de categoría seleccionados, aplicamos $in
  if (isAll && activeCategories.length > 0) {
    query.category = { $in: activeCategories };
  }

  // Filtro de Medios (Creator)
  if (activeMedia.length > 0) {
    // Usamos regex para ser flexibles con los nombres de los medios
    const mediaRegex = activeMedia.map(m => new RegExp(m, 'i'));
    query.creator = { $in: mediaRegex };
  }

  // 4. Ejecución
  const [news, totalDocs] = await Promise.all([
    News.find(query)
      .sort({ pubDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    News.countDocuments(query)
  ]);

  return {
    news: JSON.parse(JSON.stringify(news)), // Serializar para Next.js
    pagination: {
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
      currentPage: page,
      hasNextPage: page * limit < totalDocs,
      hasPrevPage: page > 1
    }
  };
}

export async function getRecentNewsPool(limit: number = 100) {
  try {
    await connectDB();
    
    // Obtenemos las últimas 100 (o el límite que sea) ordenadas por fecha
    // .lean() es crucial para rendimiento
    const news = await News.find({})
      .sort({ pubDate: -1 })
      .limit(limit)
      .lean();

    // Serializamos para evitar problemas de Next.js con objetos Date/ObjectId
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("Error obteniendo pool de noticias:", error);
    return [];
  }
}

export async function getDollarNews(limit: number = 4) {
  await connectDB();

  // 1. DEFINICIÓN TEMPORAL: "Hoy" (Start of Day Argentina aprox)
  // Calculamos el inicio del día para filtrar noticias viejas (ayer)
  const now = new Date();
  // Ajuste manual a zona horaria aprox Argentina (UTC-3) para determinar el inicio del día
  // Si son las 01:00 UTC (22:00 Arg ayer), startOfDay debe ser ayer.
  const argOffset = 3 * 60 * 60 * 1000; 
  const startOfDay = new Date(now.getTime() - argOffset);
  startOfDay.setUTCHours(0, 0, 0, 0); // Inicio del día actual

  // 2. REGEX DE PRIORIDAD (Case Insensitive)
  
  // P1: Titulares "Hard" (Empiezan con Dólar hoy / Precio...)
  // Regex anclada al inicio (^) o frases exactas muy fuertes
  const p1_regex = /^(dolar hoy|dólar hoy|precio del d|cotizaci.n del d|dolar blue|dólar blue)/i;
  // Refuerzo P1: Frases de "Minuto a minuto" o "En vivo"
  const p1_live_regex = /(minuto a minuto|en vivo|al instante)/i;

  // P2: Variantes específicas (MEP, CCL, Tarjeta, Oficial)
  const p2_regex = /d.lar (ccl|mep|tarjeta|oficial|turista|mayorista)/i;

  // P3: Contexto financiero (Brecha, suba, baja, city) PERO debe mencionar dolar
  const p3_regex = /(brecha|sub. el d|baj. el d|la city|bcra|reservas)/i;

  // EXCLUSIONES (Blacklist)
  // Fundamental para eliminar ruido (Euro, Real, Noticias generales)
  const exclusion_regex = /(euro|real |yen|libra|uruguayo|chileno|petr.leo|soja|granos|merval|wall street|acciones|bonos|plazo fijo|tasas)/i;

  try {
    const news = await News.aggregate([
      {
        $match: {
          // 1. FILTRO DURO DE FECHA: Solo noticias desde el inicio del día
          pubDate: { $gte: startOfDay },
          // 2. FILTRO DURO DE CONTENIDO: Debe mencionar "dolar" o "dólar" obligatoriamente
          // y NO debe contener palabras prohibidas.
          $and: [
            { 
              $or: [
                { title: { $regex: /dolar|dólar/i } }, // Debe decir dolar
                { searchableText: { $regex: /dolar|dólar/i } } 
              ]
            },
            { title: { $not: exclusion_regex } } // No debe ser de otras monedas
          ]
        }
      },
      {
        $addFields: {
          // CALCULO DE PRIORIDAD (Score: 1 es mejor, 3 es peor)
          priorityScore: {
            $switch: {
              branches: [
                // PRIORIDAD 1: Titulares exactos o En Vivo
                { 
                  case: { 
                    $or: [
                      { $regexMatch: { input: "$title", regex: p1_regex } },
                      { $regexMatch: { input: "$title", regex: p1_live_regex } }
                    ]
                  }, 
                  then: 1 
                },
                // PRIORIDAD 2: Variantes Técnicas (MEP, CCL, etc)
                { 
                  case: { $regexMatch: { input: "$title", regex: p2_regex } }, 
                  then: 2 
                },
                // PRIORIDAD 3: Contexto / Indirectas (siempre que mencionen dólar por el $match inicial)
                { 
                  case: { $regexMatch: { input: "$title", regex: p3_regex } }, 
                  then: 3 
                }
              ],
              default: 4 // Resto de noticias que mencionan dólar pero no encajan en patrones fuertes
            }
          }
        }
      },
      // FILTRO FINAL DE CALIDAD
      // Solo aceptamos prioridades 1, 2 y 3. Descartamos el resto (4) para evitar ruido.
      {
        $match: { priorityScore: { $lt: 4 } }
      },
      // DEDUPLICACIÓN POR LINK
      {
        $group: {
          _id: "$link",
          doc: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$doc" }
      },
      // ORDENAMIENTO DETERMINISTA
      {
        $sort: {
          priorityScore: 1, // Primero las P1, luego P2...
          pubDate: -1       // Dentro de la misma prioridad, la más nueva primero
        }
      },
      { $limit: limit }
    ]);

    // Serialización para Next.js
    return JSON.parse(JSON.stringify(news));

  } catch (error) {
    console.error("Error crítico en getDollarNews:", error);
    // Fallback silencioso: array vacío para no romper la UI
    return [];
  }
}