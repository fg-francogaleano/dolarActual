"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import CurrencyConverter from '@/components/CurrencyConverter';
import { ConverterData } from '@/lib/converter-service';

interface ConversorContentProps {
  initialData: ConverterData;
}

export default function ConversorContent({ initialData }: ConversorContentProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {t("converter.title")}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t("converter.description")}
        </p>
      </div>

      <CurrencyConverter initialData={initialData} />

      {/* Sección SEO / Informativa adicional */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <InfoCard 
          title={t("converter.infoBlueTitle")}
          description={t("converter.infoBlueDesc")}
        />
        <InfoCard 
          title={t("converter.infoFiatTitle")}
          description={t("converter.infoFiatDesc")}
        />
        <InfoCard 
          title={t("converter.infoCryptoTitle")}
          description={t("converter.infoCryptoDesc")}
        />
      </div>
    </div>
  );
}

function InfoCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
}