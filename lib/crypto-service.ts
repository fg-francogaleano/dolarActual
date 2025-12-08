"use server";

import { Criptomoneda }  from "@/types/crypto";
import connectDB from '@/lib/db';
import RateHistory from '@/models/RateHistory';
import { getArgentinaDate } from '@/lib/date-utils'; 

// Configuración de las monedas que queremos buscar
const CRYPTO_CONFIG = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", url: "https://criptoya.com/api/binance/BTC/ARS/0.1" },
  { id: "eth", symbol: "ETH", name: "Ethereum", url: "https://criptoya.com/api/binance/ETH/ARS/0.1" },
  { id: "xrp", symbol: "XRP", name: "Ripple", url: "https://criptoya.com/api/binance/XRP/ARS/0.1" },
  { id: "bnb", symbol: "BNB", name: "Binance Coin", url: "https://criptoya.com/api/binance/BNB/ARS/0.1" },
  { id: "sol", symbol: "SOL", name: "Solana", url: "https://criptoya.com/api/binance/SOL/ARS/0.1" }, 
  { id: "usdt", symbol: "USDT", name: "Tether", url: "https://criptoya.com/api/binance/USDT/ARS/0.1" },
];

interface CriptoYaResponse {
  ask: number;      // Precio de venta (lo que paga el usuario para comprar)
  bid: number;      // Precio de compra
  totalAsk: number;
  totalBid: number;
  time: number;     // Timestamp unix
}

export async function getCryptoRates(): Promise<Criptomoneda[]> {
  try {
    // 1. Fetch HISTORIAL (Cierre de Ayer) desde MongoDB
    // Lo hacemos antes o en paralelo a las llamadas de API para tener los datos listos
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
      console.warn("⚠️ No se pudo leer el historial de DB para Cripto.");
    }

    // 2. Ejecutamos todas las peticiones a la API en paralelo
    const promises = CRYPTO_CONFIG.map(async (coin) => {
      try {
        const response = await fetch(coin.url, { 
            next: { revalidate: 30 } 
        });
        
        if (!response.ok) return null;
        
        const data: CriptoYaResponse = await response.json();

        // 3. CÁLCULO DE VARIACIÓN
        let variacionCalculada = 0;
        // Buscamos en el historial usando el ID de la moneda (ej: "btc", "eth")
        if (historyRates && historyRates[coin.id]) {
          // Asumimos que guardaste criptos con estructura { venta: number, ... } o similar
          // Si guardaste directo el número, ajusta a: const precioAyer = historyRates[coin.id];
          const precioAyer = historyRates[coin.id].venta || historyRates[coin.id].precio || historyRates[coin.id]; 
          
          if (precioAyer > 0) {
            variacionCalculada = ((data.ask - precioAyer) / precioAyer) * 100;
          }
        }

        return {
          id: coin.id,
          simbolo: coin.symbol,
          nombre: coin.name,
          precio: data.ask, 
          variacion: variacionCalculada, // Dato calculado contra Mongo DB
          fechaActualizacion: new Date(data.time * 1000).toISOString()
        } as Criptomoneda;

      } catch (err) {
        console.error(`Error fetching ${coin.symbol}:`, err);
        return null;
      }
    });

    const results = await Promise.all(promises);

    // Filtramos los que hayan fallado (null)
    return results.filter((item): item is Criptomoneda => item !== null);

  } catch (error) {
    console.error("Error general en crypto-service:", error);
    return [];
  }
}

// VERSION ANTIGUA
// "use server";

// import { Criptomoneda }  from "@/types/crypto";

// // Configuración de las monedas que queremos buscar
// const CRYPTO_CONFIG = [
//   { id: "btc", symbol: "BTC", name: "Bitcoin", url: "https://criptoya.com/api/binance/BTC/ARS/0.1" },
//   { id: "eth", symbol: "ETH", name: "Ethereum", url: "https://criptoya.com/api/binance/ETH/ARS/0.1" },
//   { id: "xrp", symbol: "XRP", name: "Ripple", url: "https://criptoya.com/api/binance/XRP/ARS/0.1" },
//   { id: "bnb", symbol: "BNB", name: "Binance Coin", url: "https://criptoya.com/api/binance/BNB/ARS/0.1" },
// ];

// interface CriptoYaResponse {
//   ask: number;      // Precio de venta (lo que paga el usuario para comprar)
//   bid: number;      // Precio de compra
//   totalAsk: number;
//   totalBid: number;
//   time: number;     // Timestamp unix
// }

// export async function getCryptoRates(): Promise<Criptomoneda[]> {
//   try {
//     // Ejecutamos todas las peticiones en paralelo para máxima velocidad
//     const promises = CRYPTO_CONFIG.map(async (coin) => {
//       try {
//         const response = await fetch(coin.url, { 
//             next: { revalidate: 30 } // Cripto cambia rápido, cacheamos menos tiempo (30s)
//         });
        
//         if (!response.ok) return null;
        
//         const data: CriptoYaResponse = await response.json();

//         return {
//           id: coin.id,
//           simbolo: coin.symbol,
//           nombre: coin.name,
//           precio: data.ask, // Usamos 'ask' como precio de referencia de mercado
//           variacion: 0,     // Esta API específica no provee % 24h, ponemos 0 para no romper la UI
//           fechaActualizacion: new Date(data.time * 1000).toISOString()
//         } as Criptomoneda;

//       } catch (err) {
//         console.error(`Error fetching ${coin.symbol}:`, err);
//         return null;
//       }
//     });

//     const results = await Promise.all(promises);

//     // Filtramos los que hayan fallado (null)
//     return results.filter((item): item is Criptomoneda => item !== null);

//   } catch (error) {
//     console.error("Error general en crypto-service:", error);
//     return [];
//   }
// }