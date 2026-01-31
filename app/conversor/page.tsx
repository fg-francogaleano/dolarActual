import React from 'react';
import { Metadata } from 'next';
import { getAllRatesForConverter } from '@/lib/converter-service';
import ConversorContent from '@/components/ConversorContent';

export const metadata: Metadata = {
  title: 'Conversor de Monedas y Dólar a Peso | Dolaractual.com',
  description: 'Calculadora de cambio oficial, blue, cripto y divisas internacionales a pesos argentinos.',
};

export const revalidate = 60;

export default async function ConversorPage() {
  const ratesData = await getAllRatesForConverter();

  return (
    <main>
        <ConversorContent initialData={ratesData} />
    </main>
  );
}