// app/cotizaciones/page.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  mockCotizaciones,
  mockOtrasCotizaciones,
  mockCriptomonedas,
} from "@/mock";
import CotizacionCard from "@/components/CotizacionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/utils/formatters";
import { TrendingUp } from "lucide-react";

export default function CotizacionesPage() {
  const { t } = useLanguage();

  return (
    <main className="w-full py-12 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">
        {t("quotations.title")}
      </h1>

      {/* COTIZACIONES DEL DOLAR */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {t("quotations.subtitleDolar")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCotizaciones.map((cot) => (
            <CotizacionCard key={cot.id} cotizacion={cot} />
          ))}
        </div>
      </section>

      {/* OTRAS MONEDAS */}
      <section className="mb-12">
        <h2
          className="text-2xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
           {t("quotations.subtitleOtrasMonedas")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockOtrasCotizaciones.map((cot) => (
            <CotizacionCard key={cot.id} cotizacion={cot} />
          ))}
        </div>
      </section>

      {/* CRIPTOMONEDAS */}
      <section>
        <h2
          className="text-2xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {t("quotations.subtitleCriptomonedas")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCriptomonedas.map((cripto) => (
            <Card
              key={cripto.id}
              className="border-[#F9FAFB] dark:border-[#2D3748] transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className="text-lg text-[#0D47A1] dark:text-[#B0C4DE]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {cripto.simbolo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-2xl font-bold text-[#212529] dark:text-[#E2E8F0] mb-2"
                  style={{ fontFamily: "Roboto Mono, monospace" }}
                >
                  ${formatNumber(cripto.precio)}
                </p>
                <div
                  className={`flex items-center space-x-1 text-sm font-semibold ${
                    cripto.variacion >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span style={{ fontFamily: "Roboto Mono, monospace" }}>
                    {cripto.variacion >= 0 ? "+" : ""}
                    {cripto.variacion.toFixed(2)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Link
        href="/"
        className="inline-block mt-10 px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
