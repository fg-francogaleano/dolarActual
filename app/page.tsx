"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockNoticias } from "@/mock";
import ConversorWidget from "@/components/ConversorWidget";
import NewsCard from "@/components/NewsCard";
import CotizacionCard from "@/components/CotizacionCard";
import { getDolarRates } from "@/lib/dolar-service"; 
import { CotizacionesMap, Cotizacion } from "@/types/dolar";

// Importamos TODAS las variantes (Incluyendo la nueva D)
import NewsGridVariantA from "@/components/NewsGridVariantA";
import NewsGridVariantB from "@/components/NewsGridVariantB"; 
import NewsGridVariantC from "@/components/NewsGridVariantC"; 
import NewsGridVariantD from "@/components/NewsGridViariantD"; // <--- NUEVO COMPONENTE

import { Loader2 } from "lucide-react";
import NewsGridVariantE from "@/components/NewsGridVariantE";

// (Ya no necesitamos la interfaz NewsItem localmente, ni los estados de dolarNews)

const INITIAL_STATE: CotizacionesMap = {
  blue: { id: "blue", compra: 0, venta: 0, destacado: true, variacion: 0, fechaActualizacion: "" },
  oficial: { id: "oficial", compra: 0, venta: 0, destacado: true, variacion: 0, fechaActualizacion: "" },
  mep: { id: "mep", compra: 0, venta: 0, destacado: false, variacion: 0, fechaActualizacion: "" },
  ccl: { id: "ccl", compra: 0, venta: 0, destacado: false, variacion: 0, fechaActualizacion: "" },
  turista: { id: "turista", compra: 0, venta: 0, destacado: false, variacion: 0, fechaActualizacion: "" },
  cripto: { id: "cripto", compra: 0, venta: 0, destacado: false, variacion: 0, fechaActualizacion: "" },
};

export default function HomePage() {
  const { t } = useLanguage();
  
  const [cotizaciones, setCotizaciones] = useState<CotizacionesMap>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  // Carga Cotizaciones
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getDolarRates();
        if (data.array.length > 0) {
          setCotizaciones(data.object);
        }
      } catch (error) {
        console.error("Error cargando cotizaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const { blue, mep, ccl, cripto, turista, oficial } = cotizaciones;

  return (
    <main className="w-full bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">
      
      {/* SECCIÓN COTIZACIONES */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {t("home.featured")}
          </h2>
          {loading && <Loader2 className="animate-spin text-[#55EEF9]" />}
        </div>
        
        <div className="sm:block">
           {!loading && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
               <div className="h-full">{blue && <CotizacionCard cotizacion={blue} />}</div>
               <div className="lg:col-span-2 block md:hidden">{oficial && <CotizacionCard cotizacion={oficial} />}</div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                 {mep && <CotizacionCard cotizacion={mep} />}
                 {ccl && <CotizacionCard cotizacion={ccl} />}
                 {cripto && <CotizacionCard cotizacion={cripto} />}
                 {turista && <CotizacionCard cotizacion={turista} />}
               </div>
               <div className="lg:col-span-2 hidden md:block">{oficial && <CotizacionCard cotizacion={oficial} />}</div>
             </div>
           )}
        </div>
      </section>

      {/* SECCIÓN CONVERSOR */}
      {/* <section className="py-16 px-6 dark:bg-[#111827]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center md:text-left">
            {t("home.quickConverter")}
          </h2>
          <ConversorWidget />
        </div>
      </section> */}

      {/* SECCIÓN NOTICIAS */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {t("home.latestNews")}
            </h2>
            <Link href="/noticias" className="hidden md:inline-block px-6 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:border-[#55EEF9] dark:hover:border-[#55EEF9] transition-colors">
              Ver todas las noticias
            </Link>
          </div>

          {/* 1. SECCIÓN DÓLAR (Modularizada en Variante D) */}
          <NewsGridVariantD 
            title="Mercado Cambiario & Divisas"
            category="dólar"
            accentColor="bg-[#55EEF9]"
          />

          {/* 2. SECCIÓN ECONOMÍA (Variante A - 3 Cards) */}
          <NewsGridVariantA 
            title="Economía" 
            category="economia" 
            accentColor="bg-emerald-500" 
          />

          {/* 3. SECCIÓN FINANZAS (Variante B - 4 Cards) */}
          <NewsGridVariantB 
            title="Finanzas" 
            category="finanzas" 
            accentColor="bg-purple-500" 
          />
          
          {/* 4. SECCIÓN POLITICA (Variante C - 5 Cards) */}
          <NewsGridVariantC 
            title="Política" 
            category="politica" 
            accentColor="bg-orange-500" 
          />

          {/* 4. SECCIÓN POLITICA (Variante C - 7 Cards) */}
          <NewsGridVariantE 
            title="Negocios" 
            category="negocios" 
            accentColor="bg-orange-500" 
          />
          
          {/* OTRAS NOVEDADES */}
          {/* <div className="mt-12">
            <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-6">
              Otras novedades
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockNoticias.slice(0, 3).map((noticia) => (
                <NewsCard key={noticia.id} noticias={noticia} />
              ))}
            </div>
          </div> */}

          <div className="mt-10 md:hidden text-center">
            <Link
              href="/noticias"
              className="inline-block w-full px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Ver todas las noticias
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}