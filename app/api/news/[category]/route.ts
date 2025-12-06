import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import News from '@/models/News';

export const revalidate = 60;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  
  try {
    await connectDB();
    
    // 1. Decodificar la URL (convierte %20 a espacios, %22 a comillas, etc.)
    const decodedCategory = decodeURIComponent(category).trim();
    let query = {};

    // CASO A: Pedir todo
    if (decodedCategory.toLowerCase() === 'all') {
      query = {}; 
    } 
    // CASO B: Categorías Oficiales (Búsqueda exacta para máxima velocidad)
    else if (['economia', 'politica', 'finanzas', 'negocios'].includes(decodedCategory.toLowerCase())) {
      query = { category: decodedCategory.toLowerCase() };
    } 
    // CASO C: Búsqueda Dinámica Compleja (Frases entre comillas)
    // Detectamos si hay comillas en la petición
    else if (decodedCategory.includes('"')) {
      // Expresión regular para extraer texto dentro de comillas: "Frase 1" "Frase 2" -> ["Frase 1", "Frase 2"]
      const phrases = decodedCategory.match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) || [];
      
      if (phrases.length > 0) {
        // Construimos un array de condiciones OR.
        // Si la noticia cumple con CUALQUIERA de las frases en título, descripción o texto, se trae.
        const orConditions = phrases.flatMap(phrase => [
          { title: { $regex: phrase, $options: 'i' } },
          { description: { $regex: phrase, $options: 'i' } },
          { searchableText: { $regex: phrase, $options: 'i' } }
        ]);

        query = { $or: orConditions };
      } else {
        // Si falló el regex de comillas, buscamos el texto tal cual
        query = { title: { $regex: decodedCategory, $options: 'i' } };
      }
    }
    // CASO D: Búsqueda Simple (Una sola palabra o frase sin comillas)
    else {
      query = {
        $or: [
          { title: { $regex: decodedCategory, $options: 'i' } },
          { description: { $regex: decodedCategory, $options: 'i' } },
          { searchableText: { $regex: decodedCategory, $options: 'i' } }
        ]
      };
    }

    // Ejecutar consulta
    // Limitamos a 20 para el widget del día (no necesitamos 50)
    const news = await News.find(query)
      .sort({ pubDate: -1 })
      .limit(20) 
      .lean();

    return NextResponse.json(news);

  } catch (error: any) {
    console.error("❌ Error en API News Filter:", error);
    return NextResponse.json(
      { error: 'Database error', details: error.message }, 
      { status: 500 }
    );
  }
}


// VERSION MAS ANTIGUA
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import News from '@/models/News';

// export const revalidate = 60; // Cachear respuesta por 60 segs (ISR)

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ category: string }> }
// ) {
//   const { category } = await params;
  
//   try {
//     await connectDB();
    
//     let query = {};
//     const catLower = category.toLowerCase();

//     // ESTRATEGIA DE FILTRADO ROBUSTA (Sin depender de índices de texto)
    
//     if (catLower === 'all') {
//       // 1. Traer todo
//       query = {}; 
//     } else if (['economia', 'politica', 'finanzas'].includes(catLower)) {
//       // 2. Si es una categoría oficial, buscamos coincidencia exacta en el campo 'category'
//       // Esto es más rápido y preciso.
//       query = { category: catLower };
//     } else {
//       // 3. Búsqueda flexible (Keywords como "dolar", "financiero")
//       // Usamos $regex (i = case insensitive) para buscar en título, descripción o searchableText.
//       // Esto evita el error 500 si falta el índice de texto.
//       query = {
//         $or: [
//           { title: { $regex: catLower, $options: 'i' } },
//           { description: { $regex: catLower, $options: 'i' } },
//           { searchableText: { $regex: catLower, $options: 'i' } } // Si el campo existe
//         ]
//       };
//     }

//     // Buscamos, ordenamos por fecha descendente, limitamos a 50
//     const news = await News.find(query)
//       .sort({ pubDate: -1 })
//       .limit(50)
//       .lean(); // .lean() devuelve objetos JS puros, mejor performance
//     console.log(news.length)
//     return NextResponse.json(news);

//   } catch (error: any) {
//     // Logueamos el error real en la consola del servidor para depurar
//     console.error("❌ Error en API News Filter:", error);
    
//     return NextResponse.json(
//       { error: 'Database error', details: error.message }, 
//       { status: 500 }
//     );
//   }
// }