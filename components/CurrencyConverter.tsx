"use client";

import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, RefreshCcw } from 'lucide-react';
import { StandardRate, ConverterData } from '@/lib/converter-service';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CurrencyConverterProps {
  initialData: ConverterData;
}

const ARS_CURRENCY: StandardRate = {
  id: 'ars',
  name: 'Peso Argentino',
  type: 'fiat',
  buy: 1,
  sell: 1,
  lastUpdated: new Date().toISOString()
};

export default function CurrencyConverter({ initialData }: CurrencyConverterProps) {
  const { t } = useLanguage();
  
  // --- ESTADOS ---
  const [amount, setAmount] = useState<string>("1000");
  
  // Origen y Destino
  const [sourceId, setSourceId] = useState<string>('usd'); 
  const [targetId, setTargetId] = useState<string>('ars');

  // Estado especial para el tipo de dólar
  const [selectedDolarType, setSelectedDolarType] = useState<string>('blue');

  // --- LÓGICA DE DATOS ---
  const allForeignRates = useMemo(() => {
    return [
      ...initialData.dolars,
      ...initialData.fiat,
      ...initialData.cryptos
    ];
  }, [initialData]);

  const getRateValue = (id: string, useBuyPrice: boolean = false): number => {
    if (id === 'ars') return 1;

    if (id === 'usd') {
      const rate = initialData.dolars.find(d => d.id === selectedDolarType);
      return rate ? (useBuyPrice ? rate.buy : rate.sell) : 0;
    }

    const rate = allForeignRates.find(r => r.id === id);
    return rate ? (useBuyPrice ? rate.buy : rate.sell) : 0;
  };

  // --- CÁLCULO ---
  const result = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 0) return 0;

    const sourceRate = getRateValue(sourceId, true);
    const targetRate = getRateValue(targetId, false);

    if (targetRate === 0) return 0;

    return (val * sourceRate) / targetRate;
  }, [amount, sourceId, targetId, selectedDolarType]);

  const handleSwap = () => {
    setSourceId(targetId);
    setTargetId(sourceId);
  };

  const showDolarSelector = sourceId === 'usd' || targetId === 'usd';

  // Helper para traducir nombres de moneda
  const getCurrencyName = (item: StandardRate) => {
    if (item.id === 'ars') return t("converter.ars");
    // Intentamos traducir usando la clave quotations.{id}
    const key = `quotations.${item.id}`;
    const translated = t(key);
    return translated === key ? item.name : translated;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white dark:bg-[#1A202C] border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-blue-600" />
            {t("converter.title")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t("home.quickConverter")}
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* SECCIÓN SUPERIOR: INPUTS Y SELECTORES */}
          <div className="flex flex-col md:flex-row items-center gap-4 relative">
            
            {/* INPUT ORIGEN */}
            <div className="flex-1 w-full space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {t("converter.have")}
              </label>
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
                  t={t}
                  getCurrencyName={getCurrencyName}
                />
              </div>
            </div>

            {/* BOTÓN SWAP */}
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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {t("converter.want")}
              </label>
              <div className="flex gap-2">
                <div className="flex-1 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md flex items-center px-4 text-lg font-bold text-slate-700 dark:text-slate-200 truncate">
                  {result.toLocaleString('es-AR', { maximumFractionDigits: 4 })}
                </div>
                <CurrencySelect 
                  value={targetId} 
                  onChange={setTargetId} 
                  options={{ ars: ARS_CURRENCY, ...initialData }} 
                  t={t}
                  getCurrencyName={getCurrencyName}
                />
              </div>
            </div>
          </div>

          {/* SELECTOR DE TIPO DE DÓLAR */}
          {showDolarSelector && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-xl">
                <label className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
                  {t("converter.selectDollarType")}
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
                      {/* Traducimos los nombres de los botones también */}
                      {getCurrencyName(dolar).replace(/Dólar |Dollar /i, "")}
                    </button>
                  ))}
                </div>
                
                <div className="mt-3 text-xs text-blue-800 dark:text-blue-300 flex gap-4">
                   <span>{t("quotations.buy")}: <b>${initialData.dolars.find(d => d.id === selectedDolarType)?.buy}</b></span>
                   <span>{t("quotations.sell")}: <b>${initialData.dolars.find(d => d.id === selectedDolarType)?.sell}</b></span>
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
  options,
  t,
  getCurrencyName
}: { 
  value: string; 
  onChange: (val: string) => void;
  options: { ars: StandardRate } & ConverterData;
  t: (key: string) => string;
  getCurrencyName: (item: StandardRate) => string;
}) => {
  return (
    <div className="relative w-[140px] md:w-[180px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-md pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium cursor-pointer"
      >
        <option value="ars">🇦🇷 {t("converter.ars")}</option>
        <option value="usd">🇺🇸 {t("converter.usd")}</option>
        
        <optgroup label={t("quotations.sectionFiat")}>
          {options.fiat.map(f => (
            <option key={f.id} value={f.id}>{getCurrencyName(f)}</option>
          ))}
        </optgroup>
        
        <optgroup label={t("quotations.sectionCryptos")}>
          {options.cryptos.map(c => (
            <option key={c.id} value={c.id}>{getCurrencyName(c)}</option>
          ))}
        </optgroup>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
};