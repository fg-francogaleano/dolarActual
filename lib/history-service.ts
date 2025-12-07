import connectDB from '@/lib/db';
import RateHistory from '@/models/RateHistory';
import { getDolarRates } from '@/lib/dolar-service';

export async function saveDailyRates() {
  await connectDB();
  console.log("📸 [History Service] Tomando snapshot de cotizaciones...");

  // 1. Obtenemos cotizaciones en vivo (sin variación histórica aún)
  const currentData = await getDolarRates();
  
  if (!currentData || !currentData.object) {
    throw new Error("No se pudieron obtener las cotizaciones actuales");
  }

  // 2. Preparamos el objeto para guardar
  // Convertimos el mapa de cotizaciones a un formato limpio para DB
  const ratesToSave: Record<string, any> = {};
  
  Object.values(currentData.object).forEach(cot => {
    ratesToSave[cot.id] = {
      compra: cot.compra,
      venta: cot.venta,
      nombre: cot.nombreDisplay
    };
  });

  // 3. Generamos la fecha clave (YYYY-MM-DD)
  // Usamos fecha local Argentina o UTC según prefieras. Aquí UTC simplificado.
  const today = new Date().toISOString().split('T')[0];

  // 4. Guardamos o Actualizamos (Upsert)
  console.log("ratesToSave",ratesToSave)
  const result = await RateHistory.findOneAndUpdate(
    { date: today },
    { 
      $set: { 
        rates: ratesToSave,
        date: today
      } 
    },
    { upsert: true, new: true }
  );

  console.log(`✅ [History Service] Snapshot guardado para ${today}`, result);
  return result;
}