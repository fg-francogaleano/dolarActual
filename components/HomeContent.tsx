"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import CotizacionCard from "@/components/CotizacionCard";
import NewsGridVariantA from "@/components/NewsGridVariantA";
import NewsGridVariantB from "@/components/NewsGridVariantB";
import NewsGridVariantC from "@/components/NewsGridVariantC";
import NewsGridVariantD from "@/components/NewsGridViariantD";
import NewsGridVariantE from "@/components/NewsGridVariantE";
import { Cotizacion } from "@/types/dolar";
import { JsonLd } from "@/components/JsonLd";

// Definimos las props que recibirá del servidor
interface HomeContentProps {
  cotizaciones: {
    blue?: Cotizacion;
    oficial?: Cotizacion;
    mep?: Cotizacion;
    ccl?: Cotizacion;
    turista?: Cotizacion;
    cripto?: Cotizacion;
  };
  newsData: {
    mercado: any[];
    economia: any[];
    finanzas: any[];
    politica: any[];
    negocios: any[];
  };
}

export default function HomeContent({
  cotizaciones,
  newsData,
}: HomeContentProps) {
  const { t } = useLanguage();
  const { blue, mep, ccl, cripto, turista, oficial } = cotizaciones;
  console.log(newsData.mercado);

  // Datos Estructurados para SEO (Schema.org)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cotizaciones del Dólar en Argentina",
    description:
      "Valores actualizados del Dólar Blue, Oficial, MEP, CCL y Cripto.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [blue, oficial, mep, ccl, cripto, turista]
        .filter(Boolean)
        .map((cot, index) => ({
          "@type": "ExchangeRateSpecification",
          position: index + 1,
          currency: "ARS",
          currentExchangeRate: {
            "@type": "UnitPriceSpecification",
            price: cot?.venta,
            priceCurrency: "ARS",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitCode: "USD",
            },
          },
          name: `Dólar ${cot?.id.charAt(0).toUpperCase()}${cot?.id.slice(1)}`,
        })),
    },
  };
  return (
    <div className="w-full bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">
      <JsonLd data={structuredData} />

      {/* SECCIÓN COTIZACIONES */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dolar hoy, Dolar blue
          </h1>
        </div>

        <div className="sm:block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="h-full">
              {blue && <CotizacionCard cotizacion={blue} />}
            </div>
            <div className="lg:col-span-2 block md:hidden">
              {oficial && <CotizacionCard cotizacion={oficial} />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mep && <CotizacionCard cotizacion={mep} />}
              {ccl && <CotizacionCard cotizacion={ccl} />}
              {cripto && <CotizacionCard cotizacion={cripto} />}
              {turista && <CotizacionCard cotizacion={turista} />}
            </div>
            <div className="lg:col-span-2 hidden md:block">
              {oficial && <CotizacionCard cotizacion={oficial} />}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN NOTICIAS */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
            {t("home.latestNews")}
          </h2>

          {/* 1. SECCIÓN DÓLAR (Grid D) */}
          <NewsGridVariantD
            title={t("news.exchangeMarketCurrencies")}
            category="dólar"
            accentColor="bg-[#55EEF9]"
            preloadedNews={newsData.mercado}
          />

          {/* 2. SECCIÓN ECONOMÍA (Grid A) */}
          <NewsGridVariantA
            title={t("news.economy")}
            category="economia"
            accentColor="bg-emerald-500"
            preloadedNews={newsData.economia}
          />

          {/* 3. SECCIÓN FINANZAS (Grid B) */}
          <NewsGridVariantB
            title={t("news.finance")}
            category="finanzas"
            accentColor="bg-purple-500"
            preloadedNews={newsData.finanzas}
          />

          {/* 4. SECCIÓN POLITICA (Grid C) */}
          <NewsGridVariantC
            title={t("news.politics")}
            category="politica"
            accentColor="bg-orange-500"
            preloadedNews={newsData.politica}
          />

          {/* 5. SECCIÓN NEGOCIOS (Grid E) */}
          <NewsGridVariantE
            title={t("news.business")}
            category="negocios"
            accentColor="bg-red-500"
            preloadedNews={newsData.negocios}
          />

          <div className="mt-10 md:hidden text-center">
            <Link
              href="/noticias"
              className="inline-block w-full px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {t("news.readMore")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
