"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft, DollarSign, Coins, Globe, RefreshCcw } from 'lucide-react';
import { StandardRate, ConverterData } from '@/lib/converter-service';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CurrencyConverterProps {
  initialData: ConverterData;
}

// Definimos "ARS" (Peso Argentino) manualmente ya que es la base
const ARS_CURRENCY: StandardRate = {
  id: 'ars',
  name: 'Peso Argentino',
  type: 'fiat',
  buy: 1,
  sell: 1,
  lastUpdated: new Date().toISOString()
};

export default function CurrencyConverter({ initialData }: CurrencyConverterProps) {
  // --- ESTADOS ---
  const [amount, setAmount] = useState<string>("1000"); // String para input controlado
  
  // Origen y Destino
  // Guardamos el ID de la moneda seleccionada ('ars', 'usd', 'btc', 'eur')
  const [sourceId, setSourceId] = useState<string>('usd'); 
  const [targetId, setTargetId] = useState<string>('ars');

  // Estado especial para el tipo de dólar (si se selecciona Dólar)
  // Por defecto 'blue'
  const [selectedDolarType, setSelectedDolarType] = useState<string>('blue');

  // --- LÓGICA DE DATOS ---

  // Combinamos todas las monedas extranjeras/cripto en una lista para buscar
  const allForeignRates = useMemo(() => {
    return [
      ...initialData.dolars,
      ...initialData.fiat,
      ...initialData.cryptos
    ];
  }, [initialData]);

  // Función para obtener la tasa de cambio real de una moneda
  const getRateValue = (id: string, useBuyPrice: boolean = false): number => {
    if (id === 'ars') return 1;

    // Si es Dólar, buscamos ESPECÍFICAMENTE el tipo seleccionado (Blue, MEP, etc)
    if (id === 'usd') {
      const rate = initialData.dolars.find(d => d.id === selectedDolarType);
      return rate ? (useBuyPrice ? rate.buy : rate.sell) : 0;
    }

    // Si es otra, buscamos en la lista general
    const rate = allForeignRates.find(r => r.id === id);
    return rate ? (useBuyPrice ? rate.buy : rate.sell) : 0;
  };

  // --- CÁLCULO DE CONVERSIÓN ---
  const result = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 0) return 0;

    const sourceRate = getRateValue(sourceId, true);  // Si tengo dólares, el banco me los "compra" (Precio Compra)
    const targetRate = getRateValue(targetId, false); // Si quiero dólares, el banco me los "vende" (Precio Venta)

    if (targetRate === 0) return 0;

    // Fórmula: (Cantidad * TasaOrigen) / TasaDestino
    // Ejemplo: 100 USD (Blue) a ARS -> (100 * 1200) / 1 = 120,000 ARS
    // Ejemplo: 100,000 ARS a USD (Blue) -> (100000 * 1) / 1200 = 83.33 USD
    return (val * sourceRate) / targetRate;

  }, [amount, sourceId, targetId, selectedDolarType]);

  // --- HANDLERS ---
  const handleSwap = () => {
    setSourceId(targetId);
    setTargetId(sourceId);
  };

  // Determinar si hay que mostrar el selector de Dólar
  const showDolarSelector = sourceId === 'usd' || targetId === 'usd';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white dark:bg-[#1A202C] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-blue-600" />
            Conversor Universal
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Calculá cotizaciones en tiempo real para Dólar, Divisas y Cripto.
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* SECCIÓN SUPERIOR: INPUTS Y SELECTORES */}
          <div className="flex flex-col md:flex-row items-center gap-4 relative">
            
            {/* INPUT ORIGEN */}
            <div className="flex-1 w-full space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tengo</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg font-bold h-12"
                  placeholder="0.00"
                />
                <CurrencySelect 
                  value={sourceId} 
                  onChange={setSourceId} 
                  options={{ ars: ARS_CURRENCY, ...initialData }} 
                />
              </div>
            </div>

            {/* BOTÓN SWAP (CENTRADO) */}
            <div className="md:pt-6">
              <Button 
                onClick={handleSwap}
                variant="outline" 
                size="icon" 
                className="rounded-full w-10 h-10 border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-colors shadow-sm"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* INPUT DESTINO */}
            <div className="flex-1 w-full space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quiero</label>
              <div className="flex gap-2">
                <div className="flex-1 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md flex items-center px-4 text-lg font-bold text-slate-700 dark:text-slate-200 truncate">
                  {result.toLocaleString('es-AR', { maximumFractionDigits: 4 })}
                </div>
                <CurrencySelect 
                  value={targetId} 
                  onChange={setTargetId} 
                  options={{ ars: ARS_CURRENCY, ...initialData }} 
                />
              </div>
            </div>
          </div>

          {/* SELECTOR DE TIPO DE DÓLAR (CONDICIONAL) */}
          {showDolarSelector && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-xl">
                <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
                  Seleccioná la cotización del Dólar
                </label>
                <div className="flex flex-wrap gap-2">
                  {initialData.dolars.map((dolar) => (
                    <button
                      key={dolar.id}
                      onClick={() => setSelectedDolarType(dolar.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDolarType === dolar.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                      }`}
                    >
                      {dolar.name.replace("Dólar ", "")}
                    </button>
                  ))}
                </div>
                {/* Info de la cotización seleccionada */}
                <div className="mt-3 text-xs text-blue-800 dark:text-blue-300 flex gap-4">
                   <span>Compra: <b>${initialData.dolars.find(d => d.id === selectedDolarType)?.buy}</b></span>
                   <span>Venta: <b>${initialData.dolars.find(d => d.id === selectedDolarType)?.sell}</b></span>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </Card>
    </div>
  );
}

// --- SUB-COMPONENTE: SELECTOR DE MONEDA ---
const CurrencySelect = ({ 
  value, 
  onChange, 
  options 
}: { 
  value: string; 
  onChange: (val: string) => void;
  options: { ars: StandardRate } & ConverterData;
}) => {
  return (
    <div className="relative w-[140px] md:w-[180px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-md pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium cursor-pointer"
      >
        <option value="ars">🇦🇷 Peso Arg</option>
        <option value="usd">🇺🇸 Dólar (USD)</option>
        
        <optgroup label="Otras Divisas">
          {options.fiat.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </optgroup>
        
        <optgroup label="Criptomonedas">
          {options.cryptos.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </optgroup>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
};