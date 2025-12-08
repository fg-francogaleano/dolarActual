"use server";

import { OtraMoneda } from "@/types/otros";
import { DolarApiResponse } from "@/types/dolar"; 
import connectDB from '@/lib/db';
import RateHistory from '@/models/RateHistory';
import { getArgentinaDate } from '@/lib/date-utils'; 

const BASE_URL = "https://dolarapi.com/v1/cotizaciones";

const ID_MAPPING_OTRAS: Record<string, string> = {
  eur: "euro",
  brl: "real",
  clp: "chileno",
  uyu: "uruguayo"
};

export async function getOtherCurrencies(): Promise<OtraMoneda[]> {
  try {
    // 1. Fetch Cotizaciones EN VIVO
    const response = await fetch(BASE_URL, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 }
    });

    if (!response.ok) throw new Error("Error fetching Otras Monedas");
    const rawData: DolarApiResponse[] = await response.json();

    // 2. Fetch HISTORIAL (Cierre de Ayer) desde MongoDB
    let historyRates: any = null;
    try {
      await connectDB();
      const today = getArgentinaDate();
      
      const lastRecord = await RateHistory.findOne({ date: { $ne: today } })
        .sort({ date: -1 })
        .lean();

      if (lastRecord) {
        historyRates = lastRecord.rates;
      }
    } catch (dbError) {
      console.warn("⚠️ No se pudo leer el historial de DB para Otras Monedas.");
    }
    
    const otrasArray: OtraMoneda[] = [];

    rawData.forEach((item) => {
      const monedaKey = item.moneda.toLowerCase();
      const internalId = ID_MAPPING_OTRAS[monedaKey];

      if (!internalId) return;

      // 3. CÁLCULO DE VARIACIÓN
      let variacionCalculada = 0;
      if (historyRates && historyRates[internalId]) {
        const precioAyer = historyRates[internalId].venta;
        if (precioAyer > 0) {
          variacionCalculada = ((item.venta - precioAyer) / precioAyer) * 100;
        }
      }

      otrasArray.push({
        id: internalId,
        destacado: false,
        compra: item.compra,
        venta: item.venta,
        variacion: variacionCalculada, // Ahora usamos el valor calculado
        fechaActualizacion: item.fechaActualizacion,
        nombreDisplay: item.nombre
      });
    });
    return otrasArray;

  } catch (error) {
    console.error("Error en getOtherCurrencies:", error);
    return [];
  }
}

// VERSION ANTIGUA
// "use server";

// import { OtraMoneda } from "@/types/otros";
// import { DolarApiResponse } from "@/types/dolar"; // Reutilizamos la respuesta API cruda ya que es la misma fuente

// const BASE_URL = "https://dolarapi.com/v1/cotizaciones";

// const ID_MAPPING_OTRAS: Record<string, string> = {
//   eur: "euro",
//   brl: "real",
//   clp: "chileno",
//   uyu: "uruguayo"
// };

// export async function getOtherCurrencies(): Promise<OtraMoneda[]> {
//   try {
//     const response = await fetch(BASE_URL, {
//       headers: { "Content-Type": "application/json" },
//       next: { revalidate: 60 }
//     });

//     if (!response.ok) throw new Error("Error fetching Otras Monedas");
//     const rawData: DolarApiResponse[] = await response.json();
    
//     const otrasArray: OtraMoneda[] = [];

//     rawData.forEach((item) => {
//       const monedaKey = item.moneda.toLowerCase();
//       const internalId = ID_MAPPING_OTRAS[monedaKey];

//       if (!internalId) return;

//       otrasArray.push({
//         id: internalId,
//         destacado: false,
//         compra: item.compra,
//         venta: item.venta,
//         variacion: 0,
//         fechaActualizacion: item.fechaActualizacion,
//         nombreDisplay: item.nombre
//       });
//     });
//     return otrasArray;

//   } catch (error) {
//     console.error("Error en getOtherCurrencies:", error);
//     return [];
//   }
// }