// src/types/dolar.ts

// 1. Lo que devuelve la API externa (DolarApi)
export interface DolarApiResponse {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

// 2. Tu modelo de dominio (Lo que usa tu UI actual y tus cards)
export interface Cotizacion {
  id: string;
  destacado: boolean;
  compra: number;
  venta: number;
  variacion: number; // La API no lo provee, lo calcularemos o dejaremos en 0
  fechaActualizacion: string;
  nombreDisplay?: string; // Opcional, para usar el nombre limpio
}

// 3. El objeto mapa que usa tu componente HomePage (para acceder como cotizaciones.blue)
export interface CotizacionesMap {
  [key: string]: Cotizacion;
}

// 4. La respuesta completa que devolverá nuestro servicio
export interface DolarData {
  array: Cotizacion[];
  object: CotizacionesMap;
}