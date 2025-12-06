import { NextResponse } from 'next/server';
import { saveDailyRates } from '@/lib/history-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verificación de seguridad
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await saveDailyRates();
    return NextResponse.json({ success: true, date: result.date });
  } catch (error: any) {
    console.error("❌ Error actualizando historial:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}