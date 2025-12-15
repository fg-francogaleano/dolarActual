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
  const isAll = section === 'todas';
  
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