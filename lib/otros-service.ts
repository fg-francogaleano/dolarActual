"use server";

import { OtraMoneda } from "@/types/otros";
import { DolarApiResponse } from "@/types/dolar"; // Reutilizamos la respuesta API cruda ya que es la misma fuente

const BASE_URL = "https://dolarapi.com/v1/cotizaciones";

const ID_MAPPING_OTRAS: Record<string, string> = {
  eur: "euro",
  brl: "real",
  clp: "chileno",
  uyu: "uruguayo"
};

export async function getOtherCurrencies(): Promise<OtraMoneda[]> {
  try {
    const response = await fetch(BASE_URL, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 }
    });

    if (!response.ok) throw new Error("Error fetching Otras Monedas");
    const rawData: DolarApiResponse[] = await response.json();
    
    const otrasArray: OtraMoneda[] = [];

    rawData.forEach((item) => {
      const monedaKey = item.moneda.toLowerCase();
      const internalId = ID_MAPPING_OTRAS[monedaKey];

      if (!internalId) return;

      otrasArray.push({
        id: internalId,
        destacado: false,
        compra: item.compra,
        venta: item.venta,
        variacion: 0,
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