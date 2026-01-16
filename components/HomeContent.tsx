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

export default function HomeContent({ cotizaciones, newsData }: HomeContentProps) {
  const { t, language } = useLanguage();
  const { blue, mep, ccl, cripto, turista, oficial } = cotizaciones;

  const hasData = blue && oficial;

  const getQuotePath = (id: string) => `/cotizaciones/dolar-${id}`;

  // --- ESTRATEGIA H1 DINÁMICO (SEO CTR) ---
  // Si tenemos el dato del Blue, lo usamos en el título principal.
  // Esto responde directamente a la intención de búsqueda del usuario.
  const mainTitle = blue 
    ? language === 'es' 
      ? `Dólar Blue Hoy: $${formatNumber(blue.venta)}` 
      : `Blue Dollar Today: $${formatNumber(blue.venta)}`
    : t("home.featured"); // Fallback

  const subTitle = blue
    ? language === 'es'
      ? "Cotización en vivo minuto a minuto"
      : "Live exchange rate updated by the minute"
    : t("home.subtitle");

  // Schema Markup
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Cotizaciones del Dólar en Argentina",
    "description": "Valores actualizados del Dólar Blue, Oficial, MEP, CCL y Cripto.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [blue, oficial, mep, ccl, cripto, turista].filter(Boolean).map((cot, index) => ({
        "@type": "ExchangeRateSpecification",
        "position": index + 1,
        "currency": "ARS",
        "currentExchangeRate": {
          "@type": "UnitPriceSpecification",
          "price": cot?.venta,
          "priceCurrency": "ARS",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1",
            "unitCode": "USD"
          }
        },
        "name": `Dólar ${cot?.id.charAt(0).toUpperCase()}${cot?.id.slice(1)}`
      }))
    }
  };

  return (
    <div className="w-full bg-background transition-colors duration-300">
      
      <JsonLd data={structuredData} />

      {/* SECCIÓN COTIZACIONES */}
      <section className="py-12 lg:py-16 container mx-auto px-4">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {/* H1 OPTIMIZADO PARA CTR */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-700 dark:text-brand-400 tracking-tight leading-tight">
              {mainTitle}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg font-medium">
              {subTitle}
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground font-mono bg-brand-50 dark:bg-brand-900/30 px-3 py-1 rounded-full border border-brand-100 dark:border-brand-800">
            ARS / USD
          </div>
        </header>

        <div className="sm:block">
          {!hasData ? (
            <SkeletonCotizaciones />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              
              {/* Card Principal (Blue) */}
              <div className="h-full">
                {blue && (
                  <Link href={getQuotePath("blue")} className="block h-full transition-transform hover:scale-[1.01]">
                    <CotizacionCard cotizacion={blue} />
                  </Link>
                )}
              </div>

              {/* Grid Secundario */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mep && (
                    <Link href={getQuotePath("mep")} className="block transition-transform hover:scale-[1.02]">
                      <CotizacionCard cotizacion={mep} />
                    </Link>
                  )}
                  {ccl && (
                    <Link href={getQuotePath("ccl")} className="block transition-transform hover:scale-[1.02]">
                      <CotizacionCard cotizacion={ccl} />
                    </Link>
                  )}
                  {cripto && (
                    <Link href={getQuotePath("cripto")} className="block transition-transform hover:scale-[1.02]">
                      <CotizacionCard cotizacion={cripto} />
                    </Link>
                  )}
                  {turista && (
                    <Link href={getQuotePath("turista")} className="block transition-transform hover:scale-[1.02]">
                      <CotizacionCard cotizacion={turista} />
                    </Link>
                  )}
                </div>
                
                <div className="hidden md:block">
                  {oficial && (
                    <Link href={getQuotePath("oficial")} className="block transition-transform hover:scale-[1.01]">
                      <CotizacionCard cotizacion={oficial} />
                    </Link>
                  )}
                </div>
                <div className="block md:hidden">
                   {oficial && (
                    <Link href={getQuotePath("oficial")} className="block transition-transform hover:scale-[1.01]">
                      <CotizacionCard cotizacion={oficial} />
                    </Link>
                   )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN NOTICIAS */}
      <section className="py-16 px-4 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/noticias"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground rounded-full hover:bg-accent hover:text-brand-600 transition-all font-medium shadow-sm hover:shadow-md"
            >
              {t("news.readMore")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { useLanguage } from "@/contexts/LanguageContext";
// import CotizacionCard from "@/components/CotizacionCard";
// import NewsGridVariantA from "@/components/NewsGridVariantA";
// import NewsGridVariantB from "@/components/NewsGridVariantB";
// import NewsGridVariantC from "@/components/NewsGridVariantC";
// import NewsGridVariantD from "@/components/NewsGridViariantD";
// import NewsGridVariantE from "@/components/NewsGridVariantE";
// import { Cotizacion } from "@/types/dolar";
// import { JsonLd } from "@/components/JsonLd";

// // Definimos las props que recibirá del servidor
// interface HomeContentProps {
//   cotizaciones: {
//     blue?: Cotizacion;
//     oficial?: Cotizacion;
//     mep?: Cotizacion;
//     ccl?: Cotizacion;
//     turista?: Cotizacion;
//     cripto?: Cotizacion;
//   };
//   newsData: {
//     mercado: any[];
//     economia: any[];
//     finanzas: any[];
//     politica: any[];
//     negocios: any[];
//   };
// }

// export default function HomeContent({
//   cotizaciones,
//   newsData,
// }: HomeContentProps) {
//   const { t } = useLanguage();
//   const { blue, mep, ccl, cripto, turista, oficial } = cotizaciones;
//   console.log(newsData.mercado);

//   // Datos Estructurados para SEO (Schema.org)
//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     name: "Cotizaciones del Dólar en Argentina",
//     description:
//       "Valores actualizados del Dólar Blue, Oficial, MEP, CCL y Cripto.",
//     mainEntity: {
//       "@type": "ItemList",
//       itemListElement: [blue, oficial, mep, ccl, cripto, turista]
//         .filter(Boolean)
//         .map((cot, index) => ({
//           "@type": "ExchangeRateSpecification",
//           position: index + 1,
//           currency: "ARS",
//           currentExchangeRate: {
//             "@type": "UnitPriceSpecification",
//             price: cot?.venta,
//             priceCurrency: "ARS",
//             referenceQuantity: {
//               "@type": "QuantitativeValue",
//               value: "1",
//               unitCode: "USD",
//             },
//           },
//           name: `Dólar ${cot?.id.charAt(0).toUpperCase()}${cot?.id.slice(1)}`,
//         })),
//     },
//   };
//   return (
//     <div className="w-full bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">
//       <JsonLd data={structuredData} />

//       {/* SECCIÓN COTIZACIONES */}
//       <section className="py-16 container mx-auto px-4">
//         <div className="flex items-center justify-between mb-10">
//           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
//             Dolar hoy, Dolar blue
//           </h1>
//         </div>

//         <div className="sm:block">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
//             <div className="h-full">
//               {blue && <CotizacionCard cotizacion={blue} />}
//             </div>
//             <div className="lg:col-span-2 block md:hidden">
//               {oficial && <CotizacionCard cotizacion={oficial} />}
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {mep && <CotizacionCard cotizacion={mep} />}
//               {ccl && <CotizacionCard cotizacion={ccl} />}
//               {cripto && <CotizacionCard cotizacion={cripto} />}
//               {turista && <CotizacionCard cotizacion={turista} />}
//             </div>
//             <div className="lg:col-span-2 hidden md:block">
//               {oficial && <CotizacionCard cotizacion={oficial} />}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SECCIÓN NOTICIAS */}
//       <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
//             {t("home.latestNews")}
//           </h2>

//           {/* 1. SECCIÓN DÓLAR (Grid D) */}
//           <NewsGridVariantD
//             title={t("news.exchangeMarketCurrencies")}
//             category="dólar"
//             accentColor="bg-[#55EEF9]"
//             preloadedNews={newsData.mercado}
//           />

//           {/* 2. SECCIÓN ECONOMÍA (Grid A) */}
//           <NewsGridVariantA
//             title={t("news.economy")}
//             category="economia"
//             accentColor="bg-emerald-500"
//             preloadedNews={newsData.economia}
//           />

//           {/* 3. SECCIÓN FINANZAS (Grid B) */}
//           <NewsGridVariantB
//             title={t("news.finance")}
//             category="finanzas"
//             accentColor="bg-purple-500"
//             preloadedNews={newsData.finanzas}
//           />

//           {/* 4. SECCIÓN POLITICA (Grid C) */}
//           <NewsGridVariantC
//             title={t("news.politics")}
//             category="politica"
//             accentColor="bg-orange-500"
//             preloadedNews={newsData.politica}
//           />

//           {/* 5. SECCIÓN NEGOCIOS (Grid E) */}
//           <NewsGridVariantE
//             title={t("news.business")}
//             category="negocios"
//             accentColor="bg-red-500"
//             preloadedNews={newsData.negocios}
//           />

//           <div className="mt-10 md:hidden text-center">
//             <Link
//               href="/noticias"
//               className="inline-block w-full px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
//             >
//               {t("news.readMore")}
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
