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
import { SkeletonCotizaciones } from "@/components/SkeletonCotizaciones";
import { JsonLd } from "@/components/JsonLd";
import { formatNumber } from "@/utils/formatters";

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
  const { t, language } = useLanguage();
  const { blue, mep, ccl, cripto, turista, oficial } = cotizaciones;

  const hasData = blue && oficial;

  const getQuotePath = (id: string) => `/cotizaciones/dolar-${id}`;

  // --- ESTRATEGIA H1 DINÁMICO (SEO CTR) ---
  // Si tenemos el dato del Blue, lo usamos en el título principal.
  // Esto responde directamente a la intención de búsqueda del usuario.
  const mainTitle = blue
    ? language === "es"
      ? "Dólar Hoy, precio del dolar"
      : "Blue Dollar Today"
    : t("home.featured"); // Fallback

  const subTitle = blue
    ? language === "es"
      ? "Cotización en vivo minuto a minuto"
      : "Live exchange rate updated by the minute"
    : t("home.subtitle");

  // Schema Markup
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
            <h1 className="text-3xl md:text-3xl font-semibold text-foreground tracking-tight leading-tight">
              {mainTitle}
            </h1>
            <p className="text-muted-foreground text-md">
              {subTitle}
            </p>
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
