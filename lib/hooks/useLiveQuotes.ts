"use client";

import useSWR from 'swr';
import { UnifiedQuote } from '@/lib/quote-utils';

// Fetcher simple para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseLiveQuotesOptions {
  initialData?: UnifiedQuote[];
  refreshInterval?: number; // en milisegundos
}

export function useLiveQuotes({ initialData, refreshInterval = 30000 }: UseLiveQuotesOptions = {}) {
  const { data, error, isLoading, mutate } = useSWR<UnifiedQuote[]>(
    '/api/quotes', 
    fetcher, 
    {
      fallbackData: initialData, // Usa los datos del servidor inicialmente (SEO)
      refreshInterval: refreshInterval, // Polling automático (ej: 30 seg)
      revalidateOnFocus: true, // Actualiza al volver a la pestaña
      revalidateOnReconnect: true, // Actualiza al recuperar internet
      keepPreviousData: true, // Evita parpadeos durante la recarga
    }
  );

  return {
    quotes: data || [],
    isLoading,
    isError: error,
    mutate, // Función para forzar actualización manual si fuera necesario
  };
}