import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // 1. BYPASS DE MONGOOSE: Usamos el driver nativo de MongoDB
    // Esto evita que Mongoose intente reconstruir los índices automáticamente mientras limpiamos
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("No hay conexión activa a la base de datos.");
    }
    
    // 'news' es el nombre real de tu colección en Atlas
    const collection = db.collection('news'); 
    const messages: string[] = [];

    // 2. LIMPIEZA MANUAL DE DATOS VIEJOS
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 7);

    const deleteResult = await collection.deleteMany({ pubDate: { $lt: limitDate } });
    messages.push(`Limpieza: Se eliminaron ${deleteResult.deletedCount} noticias más antiguas que 7 días.`);

    // 3. ELIMINACIÓN FORZADA DEL ÍNDICE CONFLICTIVO
    try {
      await collection.dropIndex('pubDate_1');
      messages.push('Éxito: Índice conflictivo pubDate_1 eliminado de Atlas.');
    } catch (indexError: any) {
      messages.push(`Nota (Índice): El índice viejo ya no existía o fue borrado previamente.`);
    }

    // 4. CREACIÓN DEL NUEVO ÍNDICE TTL DIRECTO EN ATLAS
    await collection.createIndex(
      { pubDate: 1 },
      { expireAfterSeconds: 604800 } // 7 días exactos
    );
    messages.push('Éxito: Nuevo índice TTL de 7 días creado y activado.');

    return NextResponse.json({
      success: true,
      messages: messages,
      nextSteps: "Todo resuelto. Ya puedes eliminar el archivo app/api/advanced/fix-ttl/route.ts por seguridad."
    });

  } catch (error: any) {
    console.error('Error crítico en fix-ttl:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}