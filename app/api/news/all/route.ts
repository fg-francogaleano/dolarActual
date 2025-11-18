import { NextResponse } from 'next/server';
import { fetchAllNews } from '../../../lib/rss-service';

// Revalidar cada 5 minutos (300 segundos) para no saturar la fuente original y mejorar performance
export const revalidate = 300; 

export async function GET() {
  const news = await fetchAllNews();
  return NextResponse.json({ count: news.length, data: news });
}