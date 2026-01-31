// Mapa de metadatos visuales para cada moneda
// Usamos imágenes CDN para no sobrecargar el proyecto con assets locales

export interface CurrencyMeta {
  icon: string; // URL de la bandera o icono
  symbol: string; // ARS, USD, BTC
  label?: string; // Nombre corto opcional
  isCrypto?: boolean;
}

export const CURRENCY_METADATA: Record<string, CurrencyMeta> = {
  // FIAT - Banderas
  ars: { icon: "https://flagcdn.com/w40/ar.png", symbol: "ARS" },
  usd: { icon: "https://flagcdn.com/w40/us.png", symbol: "USD" },
  euro: { icon: "https://flagcdn.com/w40/eu.png", symbol: "EUR" },
  real: { icon: "https://flagcdn.com/w40/br.png", symbol: "BRL" },
  chileno: { icon: "https://flagcdn.com/w40/cl.png", symbol: "CLP" },
  uruguayo: { icon: "https://flagcdn.com/w40/uy.png", symbol: "UYU" },

  // CRYPTO - Iconos
  btc: { icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png", symbol: "BTC", isCrypto: true },
  eth: { icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png", symbol: "ETH", isCrypto: true },
  xrp: { icon: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png", symbol: "XRP", isCrypto: true },
  bnb: { icon: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png", symbol: "BNB", isCrypto: true },
  sol: { icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png", symbol: "SOL", isCrypto: true },
  usdt: { icon: "https://assets.coingecko.com/coins/images/325/small/Tether.png", symbol: "USDT", isCrypto: true },
  
  // Default fallback
  default: { icon: "/globe.svg", symbol: "???" }
};

export const getCurrencyMeta = (id: string): CurrencyMeta => {
  // Normalizamos IDs (ej: 'bitcoin' -> 'btc' si fuera necesario, o mapeo directo)
  // Como tus IDs ya vienen normalizados del servicio (btc, eth), buscamos directo.
  // Casos especiales si el ID no coincide exactamente:
  const map: Record<string, string> = {
    bitcoin: 'btc',
    ethereum: 'eth',
    solana: 'sol',
    // Agrega más alias si tus servicios devuelven nombres largos
  };

  const key = map[id] || id;
  return CURRENCY_METADATA[key] || CURRENCY_METADATA.default;
};