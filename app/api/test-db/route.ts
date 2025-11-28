import { NextResponse } from 'next/server';
import { ingestNews } from '@/lib/ingest-service';

// Forzamos que esta ruta sea dinámica para que Next.js no cachee la respuesta estáticamente
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("🟢 [API Test DB] Disparando ingesta manual...");
    
    // Llamamos al servicio de ingesta (ETL)
    // Esto conectará a la DB, bajará los RSS, limpiará los datos y los guardará/actualizará
    const result = await ingestNews();

    return NextResponse.json({
      success: true,
      message: 'Ingesta completada exitosamente',
      data: result
    });

  } catch (error: any) {
    console.error("🔴 [API Test DB] Error crítico:", error);
    
    return NextResponse.json({
      success: false,
      message: 'Falló el proceso de ingesta',
      error: error.message
    }, { status: 500 });
  }
}