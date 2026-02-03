"use client";

import React from "react";
import Link from "next/link";
import { UnifiedQuote } from "@/lib/quote-utils";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDateShort } from "@/utils/formatters"; // Asegúrate de que la ruta sea correcta según tu estructura (ej: ../utils/formatters)

interface QuoteDetailContentProps {
  featured: UnifiedQuote;
  related: UnifiedQuote[];
}

export default function QuoteDetailContent({
  featured,
  related,
}: QuoteDetailContentProps) {
  const { t, language } = useLanguage();
// console.log(related)
  const isPositive = (featured.variacion || 0) > 0;
  const isNegative = (featured.variacion || 0) < 0;

  // --- Helpers de Traducción ---

  // Traduce el nombre de la moneda basándose en su ID.
  // Si no hay traducción en translations.ts, usa el nombre original de la API.
  const getTranslatedName = (item: UnifiedQuote) => {
    const translationKey = `quotations.${item.id}`;
    const translated = t(translationKey);
    // Si la función t devuelve la misma clave (significa que no encontró traducción),
    // usamos el nombre que viene de la API.
    return translated === translationKey ? item.nombre : translated;
  };

  // Obtiene la etiqueta de la categoría usando las secciones definidas en translations.ts
  const getCategoryLabel = () => {
    switch (featured.category) {
      case "dolar":
        return t("quotations.sectionDollars"); // "Dólares" / "Dollars"
      case "crypto":
        return t("quotations.sectionCryptos"); // "Criptomonedas" / "Cryptocurrencies"
      case "fiat":
        return t("quotations.sectionFiat"); // "Otras Divisas" / "Other Currencies"
      default:
        return t("quotations.title"); // Fallback "Cotizaciones"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* 1. CARD DESTACADA (Hero Section) */}
      <div className="bg-card rounded-xl shadow-xl p-8 mb-12">
        <div className="flex md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            {/* TITULO COTIZACION */}
            <h1 className="text-2xl sm:text-3xl font-medium text-primary">
              {getTranslatedName(featured).toLocaleUpperCase()}
            </h1>
          </div>
          {/* VARIACION */}
          <div
            className={`flex items-center px-4 py-2 rounded-lg mt-4 md:mt-0 ${
              isPositive
                ? "text-success"
                : isNegative
                ? "text-danger"
                : "text-muted-foreground"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-6 h-6 mr-1" />
            ) : isNegative ? (
              <TrendingDown className="w-6 h-6 mr-1" />
            ) : (
              <Minus className="w-6 h-6 mr-1" />
            )}
            <span className="text-xl md:text-2xl">
              {featured.variacion?.toFixed(2)}%
            </span>
          </div>
        </div>
        {/* COMPRA/VENTA */}
        <div className="grid grid-cols-2 sm:gap-8 gap-1 mt-1">
          {/* COMPRA */}
          {featured.compra !== undefined && featured.compra > 0 && (
            <div className="flex flex-col p-6">
              <span className="text-lg text-muted-foreground mb-1">
                {t("quotations.buy")}
              </span>
              <span className="sm:text-5xl text-2xl text-foreground font-medium tracking-tight">
                $
                {featured.compra.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          {/* VENTA */}
          <div className="flex flex-col p-6 rounded-xl">
            <span className="text-lg text-muted-foreground mb-1">
              {t("quotations.sell")}
            </span>
            <span className="sm:text-5xl text-2xl font-medium text-foreground tracking-tight">
              $
              {featured.venta.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        {/* ACTUALIZACION */}
        <p className="text-muted-foreground text-sm flex mt-8">
          {/* Renderizado condicional para Mobile/Desktop usando clases CSS */}
          {<Clock className="w-4 h-4 self-center" />}
          <span className="hidden md:inline ml-2">
            {formatDateShort(featured.fechaActualizacion, false, language)}
          </span>
          <span className="md:hidden ml-2">
            {formatDateShort(featured.fechaActualizacion, true, language)}
          </span>
        </p>
      </div>

      {/* 2. SECCIÓN RELACIONADA */}
      <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
        {getCategoryLabel()}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((item) => (
          <Link href={`${item.slug}`} key={item.id} className="group">
            <div className="bg-card p-5 rounded-lg hover:shadow-lg border hover:border-accent transition-all duration-400 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                {/* TITULO COTIZACION */}
                <h3 className="font-medium text-lg text-primary group-hover:text-accent transition-colors">
                  {getTranslatedName(item).toLocaleUpperCase()}
                </h3>
                {/* VARIACION */}
                {item.variacion !== undefined && (
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      item.variacion > 0
                        ? "text-success"
                        : item.variacion < 0
                        ? "text-danger"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.variacion > 0 ? "+" : ""}
                    {item.variacion.toFixed(2)}%
                  </span>
                )}
              </div>
              {/* VENTA */}
              <div className="flex justify-between items-baseline mt-auto">
                <div className="text-sm text-muted-foreground">
                  {t("quotations.sell")}
                </div>
                <div className="text-2xl font-medium text-foreground">
                  $
                  {item.venta.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
