// src/types/otros.ts

// Definición específica para monedas no-dólar (Euro, Real, etc.)
export interface OtraMoneda {
  id: string;
  destacado: boolean;
  compra: number;
  venta: number;
  variacion: number;
  fechaActualizacion: string;
  nombreDisplay?: string;
}