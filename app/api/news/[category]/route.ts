import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import News from '@/models/News';

export const revalidate = 60; // Cachear respuesta por 60 segs (ISR)

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  
  try {
    await connectDB();
    
    let query = {};
    const catLower = category.toLowerCase();

    // ESTRATEGIA DE FILTRADO ROBUSTA (Sin depender de índices de texto)
    
    if (catLower === 'all') {
      // 1. Traer todo
      query = {}; 
    } else if (['economia', 'politica', 'finanzas'].includes(catLower)) {
      // 2. Si es una categoría oficial, buscamos coincidencia exacta en el campo 'category'
      // Esto es más rápido y preciso.
      query = { category: catLower };
    } else {
      // 3. Búsqueda flexible (Keywords como "dolar", "financiero")
      // Usamos $regex (i = case insensitive) para buscar en título, descripción o searchableText.
      // Esto evita el error 500 si falta el índice de texto.
      query = {
        $or: [
          { title: { $regex: catLower, $options: 'i' } },
          { description: { $regex: catLower, $options: 'i' } },
          { searchableText: { $regex: catLower, $options: 'i' } } // Si el campo existe
        ]
      };
    }

    // Buscamos, ordenamos por fecha descendente, limitamos a 50
    const news = await News.find(query)
      .sort({ pubDate: -1 })
      .limit(50)
      .lean(); // .lean() devuelve objetos JS puros, mejor performance
    console.log(news.length)
    return NextResponse.json(news);

  } catch (error: any) {
    // Logueamos el error real en la consola del servidor para depurar
    console.error("❌ Error en API News Filter:", error);
    
    return NextResponse.json(
      { error: 'Database error', details: error.message }, 
      { status: 500 }
    );
  }
}