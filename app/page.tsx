"use client";

import Link from "next/link";
import { useEffect, useState } from "react"; // Importamos hooks
import { useLanguage } from "@/contexts/LanguageContext";
import { mockNoticias } from "@/mock"; // Mantenemos noticias mockeadas por ahora
import ConversorWidget from "@/components/ConversorWidget";
import NewsCard from "@/components/NewsCard";
import CotizacionCard from "@/components/CotizacionCard";
import { getDolarRates } from "@/lib/dolar-service"; // Importamos el servicio
import { CotizacionesMap, Cotizacion } from "@/types/dolar";

import { ArrowRight, Loader2 } from "lucide-react";

// Estado inicial vacío para evitar undefined
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
  
  // Estado para las cotizaciones reales
  const [cotizaciones, setCotizaciones] = useState<CotizacionesMap>(INITIAL_STATE);
  const [cotizacionesArray, setCotizacionesArray] = useState<Cotizacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDolarRates();
        
        // Validamos que hayan llegado datos antes de setear
        if (data.array.length > 0) {
          setCotizaciones(data.object);
          setCotizacionesArray(data.array);
        }
      } catch (error) {
        console.error("Error cargando cotizaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Desestructuramos del estado (ya no del mock)
  const { blue, mep, ccl, cripto, turista, oficial } = cotizaciones;

  return (
    <main className="w-full bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300">
      
      {/* SECCIÓN HERO (Comentada en tu original) */}
      {/* ... */}

      {/* COTIZACIONES DESTACADAS */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-3xl font-bold text-slate-900 dark:text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("home.featured")}
          </h2>
          
          {/* Indicador de carga o "Live" */}
          {loading && <Loader2 className="animate-spin text-[#55EEF9]" />}
        </div>

        {/* GRID MÓVIL */}
        <div className="block sm:hidden">
          {loading ? (
             // Skeleton simple para móvil
             <div className="space-y-4">
               {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />)}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Usamos el array dinámico en lugar del mock estático */}
              {cotizacionesArray.map((cotizacion, index) => (
                <CotizacionCard key={cotizacion.id || index} cotizacion={cotizacion} />
              ))}
            </div>
          )}
        </div>

        {/* GRID VERSIÓN ESCRITORIO */}
        <div className="hidden sm:block">
          {loading ? (
             // Skeleton simple para escritorio
             <div className="grid grid-cols-2 gap-4 h-64">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {/* COLUMNA IZQUIERDA (BLUE) */}
              <div className="h-full">
                {blue && <CotizacionCard cotizacion={blue} />}
              </div>

              {/* COLUMNA DERECHA (4 CUADRÍCULAS) */}
              <div className="grid grid-cols-2 gap-2">
                {mep && <CotizacionCard cotizacion={mep} />}
                {ccl && <CotizacionCard cotizacion={ccl} />}
                {cripto && <CotizacionCard cotizacion={cripto} />}
                {turista && <CotizacionCard cotizacion={turista} />}
              </div>

              {/* FILA 3 → ANCHO COMPLETO (OFICIAL) */}
              <div className="lg:col-span-2">
                {oficial && <CotizacionCard cotizacion={oficial} />}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN CONVERSOR */}
      <section className="py-16 px-6 dark:bg-[#111827]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white text-center md:text-left">
            {t("home.quickConverter")}
          </h2>
          {/* Pasamos las cotizaciones reales al conversor si lo soporta, o dejamos que use su lógica */}
          <ConversorWidget />
        </div>
      </section>

      {/* SECCIÓN DE NOTICIAS */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {t("home.latestNews")}
            </h2>

            <Link
              href="/noticias"
              className="hidden md:inline-block px-6 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:border-[#55EEF9] dark:hover:border-[#55EEF9] hover:text-[#0891B2] dark:hover:text-[#55EEF9] transition-colors"
            >
              Ver todas las noticias
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockNoticias.slice(0, 3).map((noticia) => (
              <NewsCard key={noticia.id} noticias={noticia} />
            ))}
          </div>

          {/* Botón móvil */}
          <div className="mt-8 md:hidden text-center">
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