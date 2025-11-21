// app/page.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockCotizaciones, mockNoticias } from "@/mock";
import ConversorWidget from "@/components/ConversorWidget";
import NewsCard from "@/components/NewsCard";

import { TrendingUp, Newspaper, Calculator, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import CotizacionCard from "@/components/CotizacionCard";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="w-full">
      {/* SECCIÓN HERO */}
      <div className="w-full min-h-[65vh] bg-gradient-to-b from-[#111] to-[#222] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-cover opacity-10" />

        <div className="relative text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t("home.title")} <span className="text-cyan-400">Argentina</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>

          <Link
            href="/cotizaciones"
            className="inline-block mt-8 px-10 py-3 bg-cyan-500 text-white rounded-xl text-lg font-semibold hover:bg-cyan-400 transition"
          >
            Ver cotizaciones
          </Link>
        </div>
      </div>

      {/* COTIZACIONES DESTACADAS */}
      <section className="py-16 bg-white dark:bg-[#1A202C] transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Título + Ver todas */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-3xl font-bold text-[#0D47A1] dark:text-[#B0C4DE]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("home.featured")}
          </h2>

          {/* NEXT.JS LINK */}
          <Link href="/cotizaciones">
            <Button
              variant="ghost"
              className="text-[#1976D2] dark:text-[#4299E1] hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ver todas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCotizaciones.map((cotizacion, index) => (
            <CotizacionCard key={index} cotizacion={cotizacion} />
          ))}
        </div>
      </div>
    </section>

      {/* SECCIÓN CONVERSOR */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          {t("home.quickConverter")}
        </h2>
        <ConversorWidget />
      </section>

      {/* SECCIÓN DE NOTICIAS */}
      <section className="py-12 px-6 bg-black/30 backdrop-blur-sm border-t border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          {t("home.latestNews")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNoticias.slice(0, 3).map((noticia) => (
            <NewsCard key={noticia.id} noticias={noticia} />
          ))}
        </div>

        <Link
          href="/noticias"
          className="inline-block mt-8 px-8 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-800 transition"
        >
          Ver todas las noticias
        </Link>
      </section>
    </main>
  );
}
