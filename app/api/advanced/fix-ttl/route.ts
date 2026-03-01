import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("No hay conexión activa a la base de datos.");
    }
    
    const collection = db.collection('news'); 
    const messages: string[] = [];

    // 1. LIMPIEZA PROFUNDA USANDO CREATED_AT
    // Calculamos la fecha límite de 7 días
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 7);

    // 🛑 CAMBIO CLAVE: Usamos 'createdAt' en lugar de 'pubDate' para la purga manual.
    // Esto garantiza que atrapará los 2900+ documentos viejos sin importar si 
    // su pubDate estaba corrupto como String.
    const deleteResult = await collection.deleteMany({ createdAt: { $lt: limitDate } });
    messages.push(`Limpieza Profunda: Se eliminaron ${deleteResult.deletedCount} noticias antiguas.`);

    // 2. RECONSTRUCCIÓN DEL ÍNDICE TTL (Por si acaso quedó a medias en el intento anterior)
    try {
      await collection.dropIndex('pubDate_1');
      messages.push('Índice anterior eliminado.');
    } catch (e) {
      // Ignoramos si no existe
    }

    await collection.createIndex(
      { pubDate: 1 },
      { expireAfterSeconds: 604800 } // 7 días
    );
    messages.push('Éxito: Nuevo índice TTL de 7 días asegurado en Atlas.');

    return NextResponse.json({
      success: true,
      messages: messages,
      nextSteps: "Revisa la base de datos. Deberías ver una caída drástica en la cantidad de documentos."
    });

  } catch (error: any) {
    console.error('Error crítico en fix-ttl:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}