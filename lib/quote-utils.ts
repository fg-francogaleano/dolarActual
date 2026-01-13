import { getDolarRates } from "@/lib/dolar-service";
import { getOtherCurrencies } from "@/lib/otros-service";
import { getCryptoRates } from "@/lib/crypto-service";

export interface UnifiedQuote {
  id: string;
  nombre: string;
  compra?: number;
  venta: number;
  variacion?: number;
  fechaActualizacion: string;
  category: "dolar" | "fiat" | "crypto";
  slug: string;
}

// NUEVO MAPEO SEO-FRIENDLY
// Clave: ID interno -> Valor: Slug URL
const SLUG_MAPPING: Record<string, string> = {
  // Dólares (Prefijo 'dolar-' para SEO)
  blue: "dolar-blue",
  oficial: "dolar-oficial",
  mep: "dolar-mep",
  ccl: "dolar-ccl",
  turista: "dolar-turista",
  mayorista: "dolar-mayorista",
  cripto: "dolar-cripto", // El dólar cripto
  
  // Otras Divisas (Simples)
  euro: "euro",
  real: "real",
  uruguayo: "peso-uruguayo",
  chileno: "peso-chileno",
  
  // Criptomonedas (Simples)
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
  if (dolarData && dolarData.array) {
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
  }

  // 2. Normalizar Otras Divisas
  if (fiatData) {
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
  }

  // 3. Normalizar Criptos
  if (cryptoData) {
    cryptoData.forEach(c => {
      allQuotes.push({
        id: c.id,
        nombre: c.nombre,
        compra: undefined,
        venta: c.precio,
        variacion: c.variacion,
        fechaActualizacion: c.fechaActualizacion,
        category: "crypto",
        slug: SLUG_MAPPING[c.id] || c.id
      });
    });
  }

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