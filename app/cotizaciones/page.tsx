"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import CotizacionCard from "@/components/CotizacionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/utils/formatters";
import { TrendingUp, Loader2 } from "lucide-react";

// Servicios Específicos
import { getDolarRates } from "@/lib/dolar-service";
import { getOtherCurrencies } from "@/lib/otros-service"; // Nuevo servicio
import { getCryptoRates } from "@/lib/crypto-service";

// Tipos Específicos
import { Cotizacion } from "@/types/dolar";
import { OtraMoneda } from "@/types/otros"; // Nuevo tipo
import { Criptomoneda } from "@/types/crypto"; // Nuevo tipo

export default function CotizacionesPage() {
  const { t } = useLanguage();

  const [dolares, setDolares] = useState<Cotizacion[]>([]);
  const [otras, setOtras] = useState<OtraMoneda[]>([]); // Tipado estricto
  const [criptos, setCriptos] = useState<Criptomoneda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [dolarData, otrasData, cryptoData] = await Promise.all([
          getDolarRates(),
          getOtherCurrencies(),
          getCryptoRates(),
        ]);

        setDolares(dolarData.array);
        setOtras(otrasData);
        setCriptos(cryptoData);
      } catch (error) {
        console.error("Error cargando cotizaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <main className="w-full py-12 px-6 max-w-6xl mx-auto">
      <div className="flex justify-center items-center mb-6 relative">
        <h1 className="text-4xl font-bold text-foreground text-start">
          {t("quotations.title")}
        </h1>
        {loading && (
          <Loader2 className="absolute right-0 animate-spin text-white h-8 w-8" />
        )}
      </div>

      {/* COTIZACIONES DEL DOLAR */}
      <section className="">
        <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
          {t("quotations.sectionDollars")}
        </h2>

        {loading && dolares.length === 0 ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dolares.map((cot) => (
              <CotizacionCard key={cot.id} cotizacion={cot} />
            ))}
          </div>
        )}
      </section>

      {/* OTRAS MONEDAS */}
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-foreground mb-6 pl-2 border-l-4 border-primary">
          {t("quotations.sectionCryptos")}
        </h2>
        {loading && otras.length === 0 ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nota: CotizacionCard debe aceptar la interfaz Cotizacion.
               Dado que OtraMoneda es estructuralmente idéntica a Cotizacion, 
               TypeScript debería aceptarlo. Si CotizacionCard es estricto, 
               puedes hacer un cast o unificar interfaces visuales.
            */}
            {otras.map((cot) => (
              <CotizacionCard key={cot.id} cotizacion={cot as any} />
            ))}
          </div>
        )}
      </section>

      {/* CRIPTOMONEDAS */}
      <section>
        <h2 className="text-2xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-6">
          {t("quotations.subtitleCriptomonedas")}
        </h2>

        {loading && criptos.length === 0 ? (
          <SkeletonGrid count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {criptos.map((cripto) => (
              <Card
                key={cripto.id}
                className="border-[#F9FAFB] dark:border-[#2D3748] transition-all hover:shadow-lg bg-white dark:bg-slate-900"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#0D47A1] dark:text-[#B0C4DE]">
                    {cripto.simbolo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-2xl font-bold text-[#212529] dark:text-[#E2E8F0] mb-2">
                    ${formatNumber(cripto.precio)}
                  </p>
                  <div className="font-mono flex items-center space-x-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                    <span>En vivo</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block mt-10 px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

function SkeletonGrid({ count = 2 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${count} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}
