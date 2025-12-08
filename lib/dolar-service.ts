"use server";

import { DolarApiResponse, Cotizacion, CotizacionesMap, DolarData } from "@/types/dolar";
import connectDB from '@/lib/db';
import RateHistory from '@/models/RateHistory';
import { getArgentinaDate } from '@/lib/date-utils'; // <--- IMPORTA ESTO

const API_URL = "https://dolarapi.com/v1/dolares";

// Diccionario de mapeo: "Nombre API (DolarApi)" -> "Tu ID interno"
const ID_MAPPING: Record<string, string> = {
  oficial: "oficial",
  blue: "blue",
  bolsa: "mep",              // API usa "bolsa", tu app usa "mep"
  contadoconliqui: "ccl",    // API usa "contadoconliqui", tu app usa "ccl"
  tarjeta: "turista",        // API usa "tarjeta", tu app usa "turista"
  cripto: "cripto",
  mayorista: "mayorista"
};

// IDs que quieres destacar en la UI
const DESTACADOS = ["blue", "oficial"];

export async function getDolarRates(): Promise<DolarData> {
  try {
    // 1. Fetch Cotizaciones EN VIVO desde DolarApi
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 } // Cache de 60 segundos
    });

    if (!response.ok) {
      throw new Error(`Error fetching DolarApi: ${response.statusText}`);
    }

    const rawData: DolarApiResponse[] = await response.json();

    // 2. Fetch HISTORIAL (Cierre de Ayer) desde MongoDB
    let historyRates: any = null;
    try {
      await connectDB();
      // Buscamos el último registro que NO sea el de hoy
      const today = getArgentinaDate()
      
      const lastRecord = await RateHistory.findOne({ date: { $ne: today } })
        .sort({ date: -1 }) // El más reciente anterior a hoy
        .lean();
      if (lastRecord) {
        console.log(lastRecord)
        historyRates = lastRecord.rates;
      }
      console.log("[historyRates]",historyRates)
    } catch (dbError) {
      console.warn("⚠️ No se pudo leer el historial de DB, las variaciones se mostrarán en 0.");
    }

    // 3. Procesamiento y Cálculo
    const cotizacionesMap: CotizacionesMap = {};
    const cotizacionesArray: Cotizacion[] = [];

    rawData.forEach((item) => {
      // Obtener el ID interno mapeado
      const internalId = ID_MAPPING[item.casa];

      // Si la casa no está en nuestro mapa, la ignoramos
      if (!internalId) return;

      // CÁLCULO DE VARIACIÓN: (Actual - Ayer) / Ayer * 100
      let variacionCalculada = 0;
      
      if (historyRates && historyRates[internalId]) {
        const precioAyer = historyRates[internalId].venta;
        // Evitamos división por cero
        if (precioAyer > 0) {
          console.log(item.venta, precioAyer)
          variacionCalculada = ((item.venta - precioAyer) / precioAyer) * 100;
        }
      }

      // Crear el objeto normalizado
      const cotizacion: Cotizacion = {
        id: internalId,
        destacado: DESTACADOS.includes(internalId),
        compra: item.compra,
        venta: item.venta,
        variacion: variacionCalculada, // Dato calculado contra Mongo DB
        fechaActualizacion: item.fechaActualizacion,
        nombreDisplay: item.nombre
      };

      // Llenar las estructuras
      cotizacionesMap[internalId] = cotizacion;
      cotizacionesArray.push(cotizacion);
    });
    return {
      array: cotizacionesArray,
      object: cotizacionesMap
    };

  } catch (error) {
    console.error("Error en dolar-service:", error);
    // Fallback silencioso para no romper la UI
    return { array: [], object: {} };
  }
}