import React from "react";
import { Metadata } from "next";
import { getAllRatesForConverter } from "@/lib/converter-service";
import CurrencyConverter from "@/components/CurrencyConverter";

export const metadata: Metadata = {
  title: "Conversor de Monedas y Dólar a Peso | Dolaractual.com",
  description:
    "Calculadora de cambio oficial, blue, cripto y divisas internacionales a pesos argentinos.",
};

export const revalidate = 60; // Revalidar datos cada minuto

export default async function ConversorPage() {
  const ratesData = await getAllRatesForConverter();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#111] py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Conversor de Monedas
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            La herramienta definitiva para convertir entre Pesos Argentinos,
            Dólares (Blue, MEP, CCL), Euros, Reales y las principales
            Criptomonedas en tiempo real.
          </p>
        </div>

        <CurrencyConverter initialData={ratesData} />

        {/* Sección SEO / Informativa adicional */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <InfoCard
            title="Dólar Blue y Financieros"
            description="Cotizaciones actualizadas al instante para operar en el mercado paralelo y financiero de Argentina."
          />
          <InfoCard
            title="Fiat y Regionales"
            description="Calculá cambios para viajes a Brasil, Chile, Uruguay o Europa con las tasas oficiales."
          />
          <InfoCard
            title="Cripto Economía"
            description="Equivalencias directas entre tus pesos y Bitcoin, Ethereum o Stablecoins (USDT)."
          />
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

// "use client";

// import React from "react";
// import { Calculator } from "lucide-react";
// import ConversorWidget from "@/components/ConversorWidget";
// import { Card, CardContent } from "@/components/ui/card";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { mockCotizaciones } from "@/mock";
// import { Cotizacion } from "@/mock";
// import { formatNumber } from "@/utils/formatters";

// const Conversor: React.FC = () => {
//   const { t } = useLanguage();

//   const tasasReferencia = [
//     { nombre: "Dólar Blue", tasa: mockCotizaciones.find(c => c.id === "blue")?.venta ?? 0 },
//     { nombre: "Dólar Oficial", tasa: mockCotizaciones.find(c => c.id === "oficial")?.venta ?? 0 },
//     { nombre: "Dólar MEP", tasa: mockCotizaciones.find(c => c.id === "mep")?.venta ?? 0 },
//     { nombre: "Dólar CCL", tasa: mockCotizaciones.find(c => c.id === "ccl")?.venta ?? 0 },
//   ];

//   return (
//     <div className="min-h-screen py-12 bg-white dark:bg-[#1A202C]">
//       <div className="container mx-auto px-4">

//         <div className="mb-12 text-center">
//           <h1 className="text-4xl font-bold">
//             <Calculator className="inline mr-3 h-10 w-10" />
//             {t("converter.title")}
//           </h1>
//         </div>

//         <div className="max-w-2xl mx-auto space-y-8">
//           <ConversorWidget />

//           <Card>
//             <CardContent className="pt-6">
//               <h3 className="text-xl font-bold mb-4">{t('converter.title2')}</h3>

//               <div className="space-y-3">
//                 {tasasReferencia.map((tasa) => (
//                   <div key={tasa.nombre} className="flex justify-between items-center p-3 bg-[#F9FAFB] dark:bg-[#2D3748] rounded-lg">
//                     <span>{tasa.nombre}</span>
//                     <span className="font-bold">${formatNumber(tasa.tasa)}</span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Conversor;
