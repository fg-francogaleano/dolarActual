import React from 'react';
import { Metadata } from 'next';
import { getHistoricalEvolution } from '@/lib/history-service';
import HistoryContent from '@/components/HistoryContent';

export const metadata: Metadata = {
  title: 'Historial de Cotizaciones | Dolaractual.com',
  description: 'Analizá la evolución histórica del Dólar Blue, Oficial, MEP, CCL y Cripto en Argentina.',
};

// Revalidar los datos cada 12 horas (43200 segundos) ya que es data histórica
export const revalidate = 43200; 

export default async function HistorialPage() {
  // Obtenemos los datos en el servidor (SSR/ISR)
  // Pedimos 365 días por defecto
  const chartData = await getHistoricalEvolution(365);

  return (
    <main>
      <HistoryContent chartData={chartData} />
    </main>
  );
}
