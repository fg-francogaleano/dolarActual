"use client";

import { FC, useState } from "react";
import { Newspaper, Filter } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockNoticias } from "@/mock";

const Noticias = () => {
  const { t } = useLanguage();
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [fuenteActiva, setFuenteActiva] = useState("Todas");

  const categorias = [
    { value: "todas", label: "Todas" },
    { value: "Economía", label: t("news.economy") },
    { value: "Finanzas", label: t("news.finance") },
    { value: "Política", label: "Política" },
    { value: "Inversiones", label: "Inversiones" },
  ];

  const fuentes = ["Todas", "Infobae", "Clarín", "La Nación", "Ámbito Financiero", "iProfesional"];

  const noticiasFiltradas = mockNoticias.filter((noticia) => {
    const matchCategoria = categoriaActiva === "todas" || noticia.categoria === categoriaActiva;
    const matchFuente = fuenteActiva === "Todas" || noticia.fuente === fuenteActiva;
    return matchCategoria && matchFuente;
  });

  const noticiaDestacada = noticiasFiltradas[0];
  const otrasNoticias = noticiasFiltradas.slice(1);

  return (
    <div className="min-h-screen py-12 bg-white dark:bg-[#1A202C] transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-4">
            <Newspaper className="inline mr-3 h-10 w-10" />
            {t("news.title")}
          </h1>
          <p className="text-lg text-[#212529] dark:text-[#E2E8F0] opacity-90">
            Últimas noticias del mercado cambiario y economía argentina
          </p>
        </div>

        {/* FILTROS */}
        <div className="mb-8">
          <Tabs value={categoriaActiva} onValueChange={setCategoriaActiva}>
            <TabsList className="w-full flex-nowrap overflow-x-auto">
              {categorias.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-4">
            <Filter className="h-5 w-5 text-[#212529] dark:text-[#E2E8F0]" />

            {fuentes.map((fuente) => (
              <Button
                key={fuente}
                variant={fuenteActiva === fuente ? "default" : "outline"}
                size="sm"
                onClick={() => setFuenteActiva(fuente)}
                className={
                  fuenteActiva === fuente
                    ? "bg-[#1976D2] hover:bg-[#0D47A1] dark:bg-[#4299E1]"
                    : "border-[#E5E7EB] dark:border-[#2D3748]"
                }
              >
                {fuente}
              </Button>
            ))}
          </div>
        </div>

        {/* NOTICIAS */}
        {noticiasFiltradas.length > 0 ? (
          <div className="space-y-8">
            {/* {noticiaDestacada && (
              <div>
                <h2 className="text-2xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-4">Destacada</h2>
                <NewsCard {...noticiaDestacada} destacada />
              </div>
            )} */}

            {otrasNoticias.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-4">Más Noticias</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otrasNoticias.map((noticia) => (
                    <NewsCard key={noticia.id} noticias={noticia} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-lg text-[#212529] dark:text-[#E2E8F0] opacity-75 py-12">
            No hay noticias disponibles para los filtros seleccionados
          </p>
        )}
      </div>
    </div>
  );
};

export default Noticias;
