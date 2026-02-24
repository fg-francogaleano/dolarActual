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
    <div className="w-full bg-background py-10 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-primary mb-4 h-13">
          {t("converter.title")}
        </h1>
        <p className="text-text max-w-2xl mx-auto px-3 leading-relaxed">
          {t("converter.description")}
        </p>
      </div>

      <CurrencyConverter initialData={initialData} />

      {/* Sección SEO / Informativa adicional */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
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
    <div className="bg-card p-6 rounded-xl border border-border shadow-xl">
      <h3 className="font-medium text-lg text-text-strong mb-2">{title}</h3>
      <p className="text-sm text-text">{description}</p>
    </div>
  );
}