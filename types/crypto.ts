export interface Criptomoneda {
  id: string;
  simbolo: string;
  nombre: string;
  precio: number;
  variacion: number; 
  fechaActualizacion: string;
}

export interface CryptoData {
  array: Criptomoneda[];
}