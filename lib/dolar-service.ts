"use server";

import { DolarApiResponse, Cotizacion, CotizacionesMap, DolarData } from "@/types/dolar";

const API_URL = "https://dolarapi.com/v1/dolares";

// Diccionario de mapeo: "Nombre API" -> "Tu ID interno"
const ID_MAPPING: Record<string, string> = {
  oficial: "oficial",
  blue: "blue",
  bolsa: "mep",              // API usa "bolsa", tu app usa "mep"
  contadoconliqui: "ccl",    // API usa "contadoconliqui", tu app usa "ccl"
  tarjeta: "turista",        // API usa "tarjeta", tu app usa "turista"
  cripto: "cripto",
  mayorista: "mayorista"
};

// IDs que quieres destacar en la UI (poniendo destacado: true)
const DESTACADOS = ["blue", "oficial"];

export async function getDolarRates(): Promise<DolarData> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // Next.js caching: revalidar cada 60 segundos
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      throw new Error(`Error fetching DolarApi: ${response.statusText}`);
    }

    const rawData: DolarApiResponse[] = await response.json();

    // Estructuras de salida
    const cotizacionesMap: CotizacionesMap = {};
    const cotizacionesArray: Cotizacion[] = [];

    rawData.forEach((item) => {
      // 1. Obtener el ID interno mapeado
      const internalId = ID_MAPPING[item.casa];

      // Si la casa no está en nuestro mapa (ej: 'mayorista' si no lo usaras), la ignoramos o la agregamos
      if (!internalId) return; 

      // 2. Crear el objeto normalizado
      const cotizacion: Cotizacion = {
        id: internalId,
        destacado: DESTACADOS.includes(internalId),
        compra: item.compra,
        venta: item.venta,
        // La API no da variación diaria. 
        // Solución Pro: Devolver 0 o calcularlo si tuvieramos histórico.
        variacion: 0, 
        fechaActualizacion: item.fechaActualizacion,
        nombreDisplay: item.nombre
      };

      // 3. Llenar las estructuras
      cotizacionesMap[internalId] = cotizacion;
      cotizacionesArray.push(cotizacion);
    });

    return {
      array: cotizacionesArray,
      object: cotizacionesMap
    };

  } catch (error) {
    console.error("Error en dolar-service:", error);
    // Fallback silencioso: Devolver estructuras vacías para no romper la UI
    return { array: [], object: {} };
  }
}