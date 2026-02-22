"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import CotizacionCard from "@/components/CotizacionCard";
import NewsGridVariantA from "@/components/NewsGridVariantA";
import NewsGridVariantB from "@/components/NewsGridVariantB";
import NewsGridVariantC from "@/components/NewsGridVariantC";
import NewsGridVariantD from "@/components/NewsGridViariantD";
import NewsGridVariantE from "@/components/NewsGridVariantE";
import { Cotizacion } from "@/types/dolar";
import { SkeletonCotizaciones } from "@/components/SkeletonCotizaciones";
import { JsonLd } from "@/components/JsonLd";
import { formatNumber } from "@/utils/formatters";
import { useLiveQuotes } from "@/lib/hooks/useLiveQuotes";
import { UnifiedQuote } from "@/lib/quote-utils";

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
  cotizaciones: initialCotizaciones, // Renombramos prop para usarla como semilla
  newsData,
}: HomeContentProps) {
  const { t, language } = useLanguage();

  // 1. Convertir el objeto inicial a array para pasarlo a SWR como fallback
  //    CORRECCIÓN: Mapeamos explícitamente para cumplir con UnifiedQuote
  const initialArray = useMemo(() => {
    return Object.values(initialCotizaciones)
      .filter((c): c is Cotizacion => !!c) // Filtramos nulos y aseguramos tipo
      .map((c) => ({
        ...c,
        // Agregamos las propiedades faltantes para UnifiedQuote
        category: "dolar" as const, // Asumimos 'dolar' por defecto para la home inicial
        slug: `dolar-${c.id}`, // Generamos el slug
        nombre: c.id, // Aseguramos nombre
      }));
  }, [initialCotizaciones]);

  // 2. Activar Hook de Datos en Vivo (30 segundos)
  const { quotes } = useLiveQuotes({
    initialData: initialArray,
    refreshInterval: 30000,
  });

  // 3. Reconstruir el objeto de cotizaciones desde los datos "vivos"
  // Esto asegura que la UI siempre muestre lo último que trajo SWR
  const liveData = useMemo(() => {
    const map: Record<string, UnifiedQuote> = {};
    quotes.forEach((q) => {
      map[q.id] = q;
    });

    // Helper para convertir UnifiedQuote de vuelta a Cotizacion (compatible con UI)
    const toCotizacion = (
      q: UnifiedQuote | undefined,
      fallback?: Cotizacion,
    ): Cotizacion | undefined => {
      if (!q) return fallback;
      return {
        id: q.id,
        compra: q.compra || 0, // Aseguramos número
        venta: q.venta,
        variacion: q.variacion || 0, // Aseguramos número
        fechaActualizacion: q.fechaActualizacion,
        destacado: fallback?.destacado || false, // Mantenemos propiedad original si existe
      };
    };

    return {
      blue: toCotizacion(map["blue"], initialCotizaciones.blue),
      oficial: toCotizacion(map["oficial"], initialCotizaciones.oficial),
      mep: toCotizacion(map["mep"], initialCotizaciones.mep),
      ccl: toCotizacion(map["ccl"], initialCotizaciones.ccl),
      turista: toCotizacion(map["turista"], initialCotizaciones.turista),
      cripto: toCotizacion(map["cripto"], initialCotizaciones.cripto),
    };
  }, [quotes, initialCotizaciones]);

  // Usamos liveData en lugar de props directas
  const { blue, mep, ccl, cripto, turista, oficial } = liveData;
  const hasData = blue && oficial;

  const getQuotePath = (id: string) => `/cotizaciones/dolar-${id}`;

  const mainTitle = blue
    ? language === "es"
      ? `Dólar Blue Hoy: $${formatNumber(blue.venta)}`
      : `Blue Dollar Today: $${formatNumber(blue.venta)}`
    : t("home.featured");

  const subTitle = blue
    ? language === "es"
      ? "Cotización en vivo minuto a minuto"
      : "Live exchange rate updated by the minute"
    : t("home.subtitle");

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
    <div className="w-full bg-background transition-colors duration-300">
      <JsonLd data={structuredData} />

      {/* SECCIÓN COTIZACIONES */}
      <section className="py-12 lg:py-16 container mx-auto px-4">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {/* H1 OPTIMIZADO PARA CTR */}
            <h1 className="text-3xl md:text-3xl flex font-semibold text-foreground tracking-tight leading-tight">
              {mainTitle}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              {/* Indicador visual de 'En Vivo' */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </span>
              <p className="text-muted-foreground text-lg font-medium">
                {subTitle}
              </p>
            </div>
          </div>
        </header>

        <div className="sm:block">
          {!hasData ? (
            <SkeletonCotizaciones />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* Card Principal (Blue) */}
                <div className="">
                  {blue && (
                    <div className="block h-full transition-transform">
                      <CotizacionCard cotizacion={blue} destacada={true} />
                    </div>
                  )}
                </div>

                <div className="block lg:hidden">
                  {oficial && (
                    <div className="block">
                      <CotizacionCard cotizacion={oficial} destacada={true} />
                    </div>
                  )}
                </div>

                {/* Grid Secundario */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mep && (
                    <Link href={getQuotePath("mep")} className="block">
                      <CotizacionCard cotizacion={mep} />
                    </Link>
                  )}
                  {ccl && (
                    <Link href={getQuotePath("ccl")} className="block">
                      <CotizacionCard cotizacion={ccl} />
                    </Link>
                  )}
                  {cripto && (
                    <Link href={getQuotePath("cripto")} className="block">
                      <CotizacionCard cotizacion={cripto} />
                    </Link>
                  )}
                  {turista && (
                    <Link href={getQuotePath("turista")} className="block">
                      <CotizacionCard cotizacion={turista} />
                    </Link>
                  )}
                </div>
              </div>
              <div className="hidden lg:block mt-4">
                {oficial && (
                  <div className="block">
                    <CotizacionCard cotizacion={oficial} destacada={true} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECCIÓN NOTICIAS */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-medium text-primary">
              {t("home.latestNews")}
            </h2>
            <div className="w-20 h-1 bg-brand-500 mx-auto mt-4 rounded-full" />
          </header>

          <div className="space-y-16">
            <div id="mercado">
              <NewsGridVariantD
                title={t("news.market")}
                category="economia"
                accentColor="bg-cyan-400"
                preloadedNews={newsData.mercado}
              />
            </div>

            <div id="economia">
              <NewsGridVariantA
                title={t("news.economy")}
                category="economia"
                accentColor="bg-emerald-500"
                preloadedNews={newsData.economia}
              />
            </div>

            <div id="finanzas">
              <NewsGridVariantB
                title={t("news.finance")}
                category="finanzas"
                accentColor="bg-purple-500"
                preloadedNews={newsData.finanzas}
              />
            </div>

            <div id="politica">
              <NewsGridVariantC
                title={t("news.politics")}
                category="politica"
                accentColor="bg-orange-500"
                preloadedNews={newsData.politica}
              />
            </div>

            <div id="negocios">
              <NewsGridVariantE
                title={t("news.business")}
                category="negocios"
                accentColor="bg-red-500"
                preloadedNews={newsData.negocios}
              />
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/noticias"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground rounded-full hover:bg-accent hover:text-primary transition-all font-medium shadow-sm hover:shadow-md"
            >
              {t("news.readMore")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
