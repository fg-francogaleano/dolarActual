import { NextResponse } from 'next/server';
import { getAllQuotesNormalized } from '@/lib/quote-utils';

export const dynamic = 'force-dynamic'; // Importante: No cachear esta respuesta

export async function GET() {
  try {
    const quotes = await getAllQuotesNormalized();
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching quotes' }, { status: 500 });
  }
}