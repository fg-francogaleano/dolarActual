"use client";

import React from "react";
import Link from "next/link";
import { UnifiedQuote } from "@/lib/quote-utils";
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDateShort } from "@/utils/formatters"; // Asegúrate de que la ruta sea correcta según tu estructura (ej: ../utils/formatters)

interface QuoteDetailContentProps {
  featured: UnifiedQuote;
  related: UnifiedQuote[];
}

export default function QuoteDetailContent({ featured, related }: QuoteDetailContentProps) {
  const { t, language } = useLanguage();

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
        return t("quotations.sectionFiat");    // "Otras Divisas" / "Other Currencies"
      default:
        return t("quotations.title");          // Fallback "Cotizaciones"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      {/* Botón Volver (Mejora de UX) */}
      <Link 
        href="/" 
        className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        {t("nav.home")}
      </Link>

      {/* 1. CARD DESTACADA (Hero Section) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full mb-2">
              {getCategoryLabel()}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {getTranslatedName(featured)}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {/* Renderizado condicional para Mobile/Desktop usando clases CSS */}
              <span className="hidden md:inline">
                {formatDateShort(featured.fechaActualizacion, false, language)}
              </span>
              <span className="md:hidden">
                {formatDateShort(featured.fechaActualizacion, true, language)}
              </span>
            </p>
          </div>

          <div className={`flex items-center px-4 py-2 rounded-lg mt-4 md:mt-0 ${
            isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            isNegative ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}>
            {isPositive ? <TrendingUp className="w-6 h-6 mr-2" /> : isNegative ? <TrendingDown className="w-6 h-6 mr-2" /> : <Minus className="w-6 h-6 mr-2" />}
            <span className="text-2xl font-bold">{featured.variacion?.toFixed(2)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Precio Compra */}
          {featured.compra !== undefined && featured.compra > 0 && (
            <div className="flex flex-col p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-1">
                {t("quotations.buy")}
              </span>
              <span className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                ${featured.compra.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          {/* Precio Venta (Principal) */}
          <div className="flex flex-col p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <span className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-1">
              {t("quotations.sell")}
            </span>
            <span className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              ${featured.venta.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN RELACIONADA */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-blue-500">
        {t("home.featured")} 
        <span className="text-gray-400 dark:text-gray-500 font-normal text-lg ml-2">
          ({getCategoryLabel()})
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((item) => (
          <Link href={`/${item.slug}`} key={item.id} className="group">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 transition-all duration-200 h-full flex flex-col justify-between">
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                  {getTranslatedName(item)}
                </h3>
                {item.variacion !== undefined && (
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    item.variacion > 0 ? 'text-green-600 bg-green-100 dark:bg-green-900/30' : 
                    item.variacion < 0 ? 'text-red-600 bg-red-100 dark:bg-red-900/30' : 'text-gray-500 bg-gray-100'
                  }`}>
                    {item.variacion > 0 ? '+' : ''}{item.variacion.toFixed(2)}%
                  </span>
                )}
              </div>

              <div className="flex justify-between items-baseline mt-auto">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t("quotations.sell")}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${item.venta.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}