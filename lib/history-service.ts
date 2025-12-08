import connectDB from '@/lib/db';
import RateHistory from '@/models/RateHistory';
import { getDolarRates } from '@/lib/dolar-service';
import { getOtherCurrencies } from '@/lib/otros-service';
import { getCryptoRates } from '@/lib/crypto-service';
import { getArgentinaDate } from '@/lib/date-utils'; // Recomendado para consistencia de fechas

export async function saveDailyRates() {
  await connectDB();
  console.log("📸 [History Service] Iniciando snapshot de TODAS las cotizaciones...");

  const ratesToSave: Record<string, any> = {};

  try {
    // 1. OBTENER DÓLARES
    // ----------------------------------------------------
    const dolarData = await getDolarRates();
    if (dolarData && dolarData.object) {
      Object.values(dolarData.object).forEach(cot => {
        ratesToSave[cot.id] = {
          compra: cot.compra,
          venta: cot.venta,
          nombre: cot.nombreDisplay
        };
      });
      console.log(`✅ Dólares procesados: ${dolarData.array.length}`);
    }

    // 2. OBTENER OTRAS MONEDAS (Euro, Real, etc.)
    // ----------------------------------------------------
    const otherData = await getOtherCurrencies();
    if (otherData && otherData.length > 0) {
      otherData.forEach(cot => {
        ratesToSave[cot.id] = {
          compra: cot.compra,
          venta: cot.venta,
          nombre: cot.nombreDisplay
        };
      });
      console.log(`✅ Otras monedas procesadas: ${otherData.length}`);
    }

    // 3. OBTENER CRIPTOMONEDAS
    // ----------------------------------------------------
    const cryptoData = await getCryptoRates();
    if (cryptoData && cryptoData.length > 0) {
      cryptoData.forEach(cot => {
        // En crypto usamos 'precio' (ask) como venta referencial
        ratesToSave[cot.id] = {
          compra: null, // Generalmente no guardamos bid en este modelo simplificado
          venta: cot.precio,
          nombre: cot.nombre
        };
      });
      console.log(`✅ Criptos procesadas: ${cryptoData.length}`);
    }

    // 4. GUARDAR EN BASE DE DATOS
    // ----------------------------------------------------
    // Usamos una función utilitaria para la fecha si existe, o generamos la fecha local de Arg
    // Si no tienes getArgentinaDate, usa: new Date().toISOString().split('T')[0];
    const today = getArgentinaDate 
      ? getArgentinaDate() 
      : new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });

    console.log(`💾 Guardando snapshot para la fecha: ${today}`);
    console.log("📊 Total de tasas a guardar:", Object.keys(ratesToSave).length);

    if (Object.keys(ratesToSave).length === 0) {
      throw new Error("No se obtuvieron datos de ninguna fuente.");
    }

    const result = await RateHistory.findOneAndUpdate(
      { date: today },
      { 
        $set: { 
          rates: ratesToSave,
          date: today,
          lastUpdated: new Date()
        } 
      },
      { upsert: true, new: true }
    );

    console.log(`🚀 [History Service] Snapshot guardado exitosamente.`);
    return result;

  } catch (error) {
    console.error("❌ Error fatal en saveDailyRates:", error);
    // Podrías lanzar el error de nuevo si quieres que el Cron Job sepa que falló
    throw error;
  }
}

// VERSION ANTIGUA
// import connectDB from '@/lib/db';
// import RateHistory from '@/models/RateHistory';
// import { getDolarRates } from '@/lib/dolar-service';

// export async function saveDailyRates() {
//   await connectDB();
//   console.log("📸 [History Service] Tomando snapshot de cotizaciones...");

//   // 1. Obtenemos cotizaciones en vivo (sin variación histórica aún)
//   const currentData = await getDolarRates();
  
//   if (!currentData || !currentData.object) {
//     throw new Error("No se pudieron obtener las cotizaciones actuales");
//   }

//   // 2. Preparamos el objeto para guardar
//   // Convertimos el mapa de cotizaciones a un formato limpio para DB
//   const ratesToSave: Record<string, any> = {};
  
//   Object.values(currentData.object).forEach(cot => {
//     ratesToSave[cot.id] = {
//       compra: cot.compra,
//       venta: cot.venta,
//       nombre: cot.nombreDisplay
//     };
//   });

//   // 3. Generamos la fecha clave (YYYY-MM-DD)
//   // Usamos fecha local Argentina o UTC según prefieras. Aquí UTC simplificado.
//   const today = new Date().toISOString().split('T')[0];

//   // 4. Guardamos o Actualizamos (Upsert)
//   console.log("ratesToSave",ratesToSave)
//   const result = await RateHistory.findOneAndUpdate(
//     { date: today },
//     { 
//       $set: { 
//         rates: ratesToSave,
//         date: today
//       } 
//     },
//     { upsert: true, new: true }
//   );

//   console.log(`✅ [History Service] Snapshot guardado para ${today}`, result);
//   return result;
// }