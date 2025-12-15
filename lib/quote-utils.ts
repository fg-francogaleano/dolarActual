import { getDolarRates } from "@/lib/dolar-service";
import { getOtherCurrencies } from "@/lib/otros-service";
import { getCryptoRates } from "@/lib/crypto-service";
import { Cotizacion } from "@/types/dolar"; // Asumo que tienes tipos base comunes o similares

// Definimos una interfaz unificada para la UI
export interface UnifiedQuote {
  id: string;
  nombre: string;
  compra?: number;
  venta: number;
  variacion?: number;
  fechaActualizacion: string;
  category: "dolar" | "fiat" | "crypto";
  slug: string; // La URL amigable
}

// Mapa de IDs internos a Slugs URL deseados
const SLUG_MAPPING: Record<string, string> = {
  // Dólares
  blue: "blue",
  oficial: "oficial",
  mep: "mep",
  ccl: "ccl",
  turista: "turista",
  mayorista: "mayorista",
  cripto: "dolar-cripto", // Diferenciamos "Dolar Cripto" de las criptomonedas
  
  // Otras Divisas
  euro: "euro",
  real: "real",
  uruguayo: "peso-uruguayo",
  chileno: "peso-chileno",
  
  // Criptomonedas
  btc: "bitcoin",
  eth: "ethereum",
  xrp: "xrp",
  bnb: "bnb",
  sol: "solana",
  usdt: "usdt"
};

export async function getAllQuotesNormalized(): Promise<UnifiedQuote[]> {
  const [dolarData, fiatData, cryptoData] = await Promise.all([
    getDolarRates(),
    getOtherCurrencies(),
    getCryptoRates()
  ]);

  const allQuotes: UnifiedQuote[] = [];

  // 1. Normalizar Dólares
  dolarData.array.forEach(d => {
    allQuotes.push({
      id: d.id,
      nombre: d.nombreDisplay || d.id,
      compra: d.compra,
      venta: d.venta,
      variacion: d.variacion,
      fechaActualizacion: d.fechaActualizacion,
      category: "dolar",
      slug: SLUG_MAPPING[d.id] || d.id
    });
  });

  // 2. Normalizar Otras Divisas
  fiatData.forEach(f => {
    allQuotes.push({
      id: f.id,
      nombre: f.nombreDisplay || f.id,
      compra: f.compra,
      venta: f.venta,
      variacion: f.variacion,
      fechaActualizacion: f.fechaActualizacion,
      category: "fiat",
      slug: SLUG_MAPPING[f.id] || f.id
    });
  });

  // 3. Normalizar Criptos
  cryptoData.forEach(c => {
    allQuotes.push({
      id: c.id,
      nombre: c.nombre,
      compra: undefined, // Criptos a veces solo tienen precio único referencial
      venta: c.precio,
      variacion: c.variacion,
      fechaActualizacion: c.fechaActualizacion,
      category: "crypto",
      slug: SLUG_MAPPING[c.id] || c.id
    });
  });

  return allQuotes;
}

export async function getQuoteBySlug(slug: string) {
  const all = await getAllQuotesNormalized();
  const normalizedSlug = slug.toLowerCase();
  
  const featured = all.find(q => q.slug === normalizedSlug);
  
  if (!featured) return null;

  // Filtrar relacionadas por categoría
  const related = all.filter(q => q.category === featured.category && q.slug !== featured.slug);

  return { featured, related };
}