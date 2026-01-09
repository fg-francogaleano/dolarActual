"use client";

import React from 'react';
import EvolutionChart from '@/components/EvolutionChart';
import { useLanguage } from '@/contexts/LanguageContext';

interface HistoryContentProps {
  chartData: any[];
}

export default function HistoryContent({ chartData }: HistoryContentProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-gray-50 dark:bg-[#111] py-10 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("history.title")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("history.description")}
          </p>
        </div>

        {/* Sección del Gráfico */}
        <section className="max-w-5xl mx-auto mb-12">
          {chartData.length > 0 ? (
            <EvolutionChart data={chartData} />
          ) : (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-xl text-center border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500">
                {t("history.noData")}
                <br />
                <span className="text-xs mt-2 block opacity-70">
                  {t("history.noDataSub")}
                </span>
              </p>
            </div>
          )}
        </section>
        
      </div>
    </div>
  );
}