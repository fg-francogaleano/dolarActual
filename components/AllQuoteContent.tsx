"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import CotizacionCard from "@/components/CotizacionCard";
import { UnifiedQuote } from "@/lib/quote-utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useLiveQuotes } from "@/lib/hooks/useLiveQuotes"; // Importar el hook

interface AllQuoteContentProps {
  initialQuotes: UnifiedQuote[];
}

export default function AllQuoteContent({ initialQuotes }: AllQuoteContentProps) {
  const { t } = useLanguage();

  // Usamos el hook para mantener los datos vivos.
  // initialQuotes asegura que el SEO funcione y la carga sea instantánea.
  // A los 30 segundos (o al volver a la pestaña), SWR actualizará 'quotes'.
  const { quotes, isLoading } = useLiveQuotes({ 
    initialData: initialQuotes,
    refreshInterval: 60000 // Actualizar cada 1 minuto en esta pantalla
  });

  // Clasificación basada en los datos "vivos" (quotes) en lugar de los iniciales
  const { dolares, fiat, criptos } = useMemo(() => {
    return {
      dolares: quotes.filter((q) => q.category === "dolar"),
      fiat: quotes.filter((q) => q.category === "fiat"),
      criptos: quotes.filter((q) => q.category === "crypto"),
    };
  }, [quotes]);

  const adaptToCard = (quote: UnifiedQuote) => ({
    id: quote.id,
    destacado: false,
    compra: quote.compra || 0,
    venta: quote.venta,
    variacion: quote.variacion || 0,
    fechaActualizacion: quote.fechaActualizacion,
    nombre: quote.nombre
  });

  return (
    <div className="w-full py-12 px-6 max-w-6xl mx-auto relative">
      
      {/* Indicador de actualización (Opcional, sutil) */}
      <div className="absolute top-4 right-6">
         {/* Puedes poner un pequeño indicador de "En vivo" si deseas */}
      </div>

      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          {t("nav.home")}
        </Link>
        
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-foreground text-start">
            {t("quotations.title")}
          </h1>
          {/* Spinner sutil si está revalidando en background (opcional) */}
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        </div>
      </div>

      {/* SECCIÓN DÓLARES */}
      {dolares.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-brand-500">
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

      {/* ... Resto de secciones (Fiat, Cripto) usando las variables 'fiat' y 'criptos' ... */}
      {/* (Mantén el código de las secciones Fiat y Cripto idéntico al anterior, ya usan los datos vivos) */}
      
      {/* SECCIÓN OTRAS MONEDAS (FIAT) */}
      {fiat.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-brand-500">
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
          <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-brand-500">
            {t("quotations.sectionCryptos")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criptos.map((cot) => (
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

      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2 border border-input text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

// "use client";

// import React, { useMemo } from "react";
// import Link from "next/link";
// import { useLanguage } from "@/contexts/LanguageContext";
// import CotizacionCard from "@/components/CotizacionCard";
// import { UnifiedQuote } from "@/lib/quote-utils";
// import { ArrowLeft } from "lucide-react";

// interface AllQuoteContentProps {
//   initialQuotes: UnifiedQuote[];
// }

// export default function AllQuoteContent({ initialQuotes }: AllQuoteContentProps) {
//   const { t } = useLanguage();
// console.log(initialQuotes)
//   // 1. Clasificar las cotizaciones para mostrarlas en secciones
//   const { dolares, fiat, criptos } = useMemo(() => {
//     return {
//       dolares: initialQuotes.filter((q) => q.category === "dolar"),
//       fiat: initialQuotes.filter((q) => q.category === "fiat"),
//       criptos: initialQuotes.filter((q) => q.category === "crypto"),
//     };
//   }, [initialQuotes]);

//   // Helper para adaptar UnifiedQuote a la estructura de CotizacionCard
//   const adaptToCard = (quote: UnifiedQuote) => ({
//     id: quote.id,
//     destacado: false,
//     compra: quote.compra || 0,
//     venta: quote.venta,
//     variacion: quote.variacion || 0,
//     fechaActualizacion: quote.fechaActualizacion,
//   });

//   return (
//     <div className="w-full py-10 px-6 max-w-6xl mx-auto">
      
//       {/* Header con Botón Volver */}
//       <div className="mb-8">
//         {/* <Link 
//           href="/" 
//           className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-600 mb-6 transition-colors group"
//         >
//           <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
//           {t("nav.home")}
//         </Link> */}
        
//         <h1 className="text-2xl md:text-3xl font-medium text-primary text-center">
//           {t("quotations.title")}
//         </h1>
//       </div>

//       {/* SECCIÓN DÓLARES */}
//       {dolares.length > 0 && (
//         <section className="mb-16">
//           <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
//             {t("quotations.sectionDollars")}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {dolares.map((cot) => (
//               <Link 
//                 key={cot.id} 
//                 href={`/cotizaciones/${cot.slug}`}
//                 className="block h-full hover:scale-[1.02] transition-transform duration-200"
//               >
//                 <CotizacionCard cotizacion={adaptToCard(cot)} />
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* SECCIÓN OTRAS MONEDAS (FIAT) */}
//       {fiat.length > 0 && (
//         <section className="mb-16">
//           <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
//             {t("quotations.sectionFiat")}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {fiat.map((cot) => (
//               <Link 
//                 key={cot.id} 
//                 href={`/cotizaciones/${cot.slug}`}
//                 className="block h-full hover:scale-[1.02] transition-transform duration-200"
//               >
//                 <CotizacionCard cotizacion={adaptToCard(cot)} />
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* SECCIÓN CRIPTOMONEDAS */}
//       {criptos.length > 0 && (
//         <section className="mb-16">
//           <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
//             {t("quotations.sectionCryptos")}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {criptos.map((cot) => (
//               <Link 
//                 key={cot.id} 
//                 href={`/cotizaciones/${cot.slug}`}
//                 className="block h-full transition-transform duration-200"
//               >
//                 <CotizacionCard cotizacion={adaptToCard(cot)} />
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* <div className="text-center mt-12">
//         <Link
//           href="/"
//           className="inline-flex items-center justify-center px-6 py-2 border border-input text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
//         >
//           Volver al inicio
//         </Link>
//       </div> */}
//     </div>
//   );
// }