"use client";

import React from "react";
import { Calculator } from "lucide-react";
import ConversorWidget from "@/components/ConversorWidget";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockCotizaciones } from "@/mock";
import { Cotizacion } from "@/mock";
import { formatNumber } from "@/utils/formatters";

const Conversor: React.FC = () => {
  const { t } = useLanguage();

  const tasasReferencia = [
    { nombre: "Dólar Blue", tasa: mockCotizaciones.find(c => c.id === "blue")?.venta ?? 0 },
    { nombre: "Dólar Oficial", tasa: mockCotizaciones.find(c => c.id === "oficial")?.venta ?? 0 },
    { nombre: "Dólar MEP", tasa: mockCotizaciones.find(c => c.id === "mep")?.venta ?? 0 },
    { nombre: "Dólar CCL", tasa: mockCotizaciones.find(c => c.id === "ccl")?.venta ?? 0 },
  ];

  return (
    <div className="min-h-screen py-12 bg-white dark:bg-[#1A202C]">
      <div className="container mx-auto px-4">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">
            <Calculator className="inline mr-3 h-10 w-10" />
            {t("converter.title")}
          </h1>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <ConversorWidget />

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">{t('converter.title2')}</h3>

              <div className="space-y-3">
                {tasasReferencia.map((tasa) => (
                  <div key={tasa.nombre} className="flex justify-between items-center p-3 bg-[#F9FAFB] dark:bg-[#2D3748] rounded-lg">
                    <span>{tasa.nombre}</span>
                    <span className="font-bold">${formatNumber(tasa.tasa)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Conversor;
