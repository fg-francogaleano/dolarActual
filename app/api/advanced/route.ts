import { NextResponse } from 'next/server';
import { getNewsPaginated } from '@/lib/news-service';

export const dynamic = 'force-dynamic'; // Asegurar que lea searchParams en runtime

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') || 'todas';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 40;

    // Pasamos searchParams directamente para que procese los filtros (clarin, etc)
    const result = await getNewsPaginated({ 
      page, 
      limit, 
      section, 
      searchParams 
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}