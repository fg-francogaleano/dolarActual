import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import News from '@/models/News';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const messages: string[] = [];

    // 1. LIMPIEZA MANUAL DE DATOS VIEJOS
    // Calculamos la fecha límite: hace exactamente 7 días
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 7);

    // Borramos documentos viejos (esto liberará el espacio de los 3 meses de noticias)
    const deleteResult = await News.deleteMany({
      pubDate: { $lt: limitDate }
    });
    messages.push(`Se eliminaron ${deleteResult.deletedCount} noticias más antiguas que 7 días.`);

    // 2. ELIMINACIÓN DEL ÍNDICE DEFECTUOSO
    // Intentamos borrar el índice anterior de la base de datos de Atlas.
    try {
      await News.collection.dropIndex('pubDate_1');
      messages.push('Índice anterior pubDate_1 eliminado correctamente en MongoDB Atlas.');
    } catch (indexError: any) {
      // Ignoramos el error si el índice ya no existía
      messages.push(`Nota de Índice: ${indexError.message}`);
    }

    // 3. RECONSTRUCCIÓN (SYNC) DEL NUEVO ÍNDICE
    // Mongoose leerá tu modelo actualizado y creará el nuevo índice de 604800 segundos
    await News.syncIndexes();
    messages.push('Nuevos índices sincronizados exitosamente (TTL configurado a 7 días).');

    return NextResponse.json({
      success: true,
      messages: messages,
      nextSteps: "Ya puedes eliminar este archivo (app/api/advanced/fix-ttl/route.ts) por seguridad."
    });

  } catch (error: any) {
    console.error('Error en mantenimiento TTL:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}