import { NextResponse } from 'next/server';
import { ingestNews } from '@/lib/ingest-service';

export const dynamic = 'force-dynamic'; // Evitar cache estático aquí

export async function GET(request: Request) {
  // Seguridad simple: Verificar un token secreto
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await ingestNews();
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}