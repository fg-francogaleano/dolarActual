import { getDolarRates } from "@/lib/dolar-service";
import { getOtherCurrencies } from "@/lib/otros-service";
import { getCryptoRates } from "@/lib/crypto-service";

export interface StandardRate {
  id: string;          // 'blue', 'oficial', 'btc', 'eur'
  name: string;        // 'Dólar Blue', 'Bitcoin', 'Euro'
  type: 'dolar' | 'fiat' | 'crypto';
  buy: number;         // Precio Compra (si existe)
  sell: number;        // Precio Venta (referencia principal)
  lastUpdated: string;
}

export interface ConverterData {
  dolars: StandardRate[];
  fiat: StandardRate[];
  cryptos: StandardRate[];
}

export async function getAllRatesForConverter(): Promise<ConverterData> {
  // Ejecutamos las 3 peticiones en paralelo para máxima velocidad
  const [dolarData, otherData, cryptoData] = await Promise.all([
    getDolarRates(),
    getOtherCurrencies(),
    getCryptoRates()
  ]);

  // 1. Normalizar Dólares
  const dolars: StandardRate[] = dolarData.array.map(d => ({
    id: d.id, 
    name: d.nombreDisplay || d.id, // Fallback seguro
    type: 'dolar' as const, // Forzamos el literal type
    buy: d.compra || d.venta, 
    sell: d.venta,
    lastUpdated: d.fechaActualizacion
  })).filter(d => d.sell > 0); 

  // 2. Normalizar Otras Divisas (Euro, Real, etc.)
  const fiat: StandardRate[] = otherData.map(f => ({
    id: f.id,
    name: f.nombreDisplay || f.id, // Fallback seguro si nombreDisplay es undefined
    type: 'fiat' as const, // Forzamos el literal type
    buy: f.compra || f.venta,
    sell: f.venta,
    lastUpdated: f.fechaActualizacion
  }));

  // 3. Normalizar Criptos
  const cryptos: StandardRate[] = cryptoData.map(c => ({
    id: c.id,
    name: c.nombre,
    type: 'crypto' as const, // Forzamos el literal type
    buy: c.precio, 
    sell: c.precio,
    lastUpdated: c.fechaActualizacion
  }));

  return { dolars, fiat, cryptos };
}