"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import CotizacionCard from "@/components/CotizacionCard";
import { UnifiedQuote } from "@/lib/quote-utils";
import { ArrowLeft } from "lucide-react";

interface AllQuoteContentProps {
  initialQuotes: UnifiedQuote[];
}

export default function AllQuoteContent({ initialQuotes }: AllQuoteContentProps) {
  const { t } = useLanguage();
console.log(initialQuotes)
  // 1. Clasificar las cotizaciones para mostrarlas en secciones
  const { dolares, fiat, criptos } = useMemo(() => {
    return {
      dolares: initialQuotes.filter((q) => q.category === "dolar"),
      fiat: initialQuotes.filter((q) => q.category === "fiat"),
      criptos: initialQuotes.filter((q) => q.category === "crypto"),
    };
  }, [initialQuotes]);

  // Helper para adaptar UnifiedQuote a la estructura de CotizacionCard
  const adaptToCard = (quote: UnifiedQuote) => ({
    id: quote.id,
    destacado: false,
    compra: quote.compra || 0,
    venta: quote.venta,
    variacion: quote.variacion || 0,
    fechaActualizacion: quote.fechaActualizacion,
  });

  return (
    <div className="w-full py-10 px-6 max-w-6xl mx-auto">
      
      {/* Header con Botón Volver */}
      <div className="mb-8">
        {/* <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          {t("nav.home")}
        </Link> */}
        
        <h1 className="text-2xl md:text-3xl font-medium text-primary text-center">
          {t("quotations.title")}
        </h1>
      </div>

      {/* SECCIÓN DÓLARES */}
      {dolares.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
            {t("quotations.sectionDollars")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dolares.map((cot) => (
              <Link 
                key={cot.id} 
                href={`/cotizaciones/${cot.slug}`}
                className="block h-full hover:scale-[1.02] transition-transform duration-200"
              >
                <CotizacionCard cotizacion={adaptToCard(cot)} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECCIÓN OTRAS MONEDAS (FIAT) */}
      {fiat.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
            {t("quotations.sectionFiat")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fiat.map((cot) => (
              <Link 
                key={cot.id} 
                href={`/cotizaciones/${cot.slug}`}
                className="block h-full hover:scale-[1.02] transition-transform duration-200"
              >
                <CotizacionCard cotizacion={adaptToCard(cot)} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECCIÓN CRIPTOMONEDAS */}
      {criptos.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
            {t("quotations.sectionCryptos")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criptos.map((cot) => (
              <Link 
                key={cot.id} 
                href={`/cotizaciones/${cot.slug}`}
                className="block h-full transition-transform duration-200"
              >
                <CotizacionCard cotizacion={adaptToCard(cot)} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2 border border-input text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Volver al inicio
        </Link>
      </div> */}
    </div>
  );
}