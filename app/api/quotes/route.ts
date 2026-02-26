import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { getAllQuotesNormalized } from '@/lib/quote-utils';

// 1. FORZAR RUTA DINÁMICA: Le dice a Next.js que NUNCA cachee este archivo estáticamente
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

let localCache: any = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();
  
  // Mantenemos nuestro caché interno de memoria (30 seg) para proteger MongoDB
  if (localCache && (now - lastFetch < 30000)) {
    return NextResponse.json(localCache, {
      headers: { 
        'X-Cache': 'HIT',
        // Evitamos que el navegador o proxies intermedios guarden la respuesta
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  }

  try {
    await connectDB();
    const quotes = await getAllQuotesNormalized();
    
    localCache = quotes;
    lastFetch = now;

    return NextResponse.json(quotes, {
      headers: { 
        'X-Cache': 'MISS',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('API Quotes Error:', error);
    return NextResponse.json({ error: 'DB Error' }, { status: 500 });
  }
}


// VERSION 25/02
// import { NextResponse } from 'next/server';
// import { getAllQuotesNormalized } from '@/lib/quote-utils';

// export const dynamic = 'force-dynamic'; // Importante: No cachear esta respuesta

// export async function GET() {
//   try {
//     const quotes = await getAllQuotesNormalized();
//     return NextResponse.json(quotes);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error fetching quotes' }, { status: 500 });
//   }
// }