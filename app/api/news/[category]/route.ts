import { NextResponse } from 'next/server';
import { fetchAllNews } from '../../../lib/rss-service';

export const revalidate = 300;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> } // Next.js 15 params are promises
) {
  const { category } = await params; // "economia", "politica", etc.
  const allNews = await fetchAllNews();
  
  const categoryLower = category.toLowerCase();

  const filteredNews = allNews.filter(item => {
    // Lógica heurística de búsqueda
    // Buscamos si la palabra clave de la categoría solicitada aparece en 
    // el título o descripción.
    
    const content = (item.title + ' ' + item.description).toLowerCase();
    
    // Mapeos especiales si es necesario (ej: si piden "finanzas", buscamos también "bursatil")
    if (categoryLower === 'economia') {
        return content.includes('economia') || content.includes('economía') || content.includes('dolar');
    }
    
    return content.includes(categoryLower);
  });

  return NextResponse.json({ 
    category: category, 
    count: filteredNews.length, 
    data: filteredNews 
  });
}