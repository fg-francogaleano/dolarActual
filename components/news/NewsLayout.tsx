"use client";

import React from "react";
import NewsHero, { NewsItem } from "./NewsHero";
import { useNewsUrl } from "@/lib/hooks/useNewsUrl";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsLayoutProps {
  initialNews: NewsItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  categorySlug: string; // 'economia', 'todas', etc.
}

const MEDIOS_FILTER = [
  "Clarin",
  "La Nacion",
  "Ambito",
  "Infobae",
  "Cronista",
  "IProfesional",
];

// Usamos las claves de traducción para mapear los slugs a textos
const SECTION_SLUGS = ["economia", "finanzas", "politica", "negocios"];

export default function NewsLayout({
  initialNews,
  pagination,
  categorySlug,
}: NewsLayoutProps) {
  const { setPage, toggleFilter, isActive, currentPage } = useNewsUrl();
  const { t } = useLanguage();

  const isAll = categorySlug === "noticias";

  // Helper para obtener el título traducido de la sección actual
  const getSectionTitle = (slug: string) => {
    if (slug === "todas") return t("news.all");
    // Mapeo simple: si el slug coincide con una clave de traducción conocida
    if (slug === "economia") return t("news.economy");
    if (slug === "finanzas") return t("news.finance");
    if (slug === "politica") return t("news.politics");
    if (slug === "negocios") return t("news.business");
    // Fallback capitalizado
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  // Helper para obtener el nombre del filtro de sección traducido
  const getFilterLabel = (slug: string) => {
    switch (slug.toLowerCase()) {
      case "economia":
        return t("news.economy");
      case "finanzas":
        return t("news.finance");
      case "politica":
        return t("news.politics");
      case "negocios":
        return t("news.business");
      default:
        return slug;
    }
  };

  // 3.1 Separación: Primeras 3 para el Grid, resto para la lista
  const heroNews = initialNews.slice(0, 3);
  const listNews = initialNews.slice(3);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* HEADER DE SECCIÓN + FILTROS (Solo en /todas) */}
      <div className="mb-8">
        <h1 className="text-4xl font-medium text-primary text-center mb-4">
          {getSectionTitle(categorySlug)}
        </h1>

        {isAll && (
          <div className="p-4 rounded-xl border border-border shadow-sm">
            <div className="flex flex-col gap-4">
              {/* Filtro Secciones */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase text-muted-foreground mr-2 flex items-center">
                  <Filter className="w-3 h-3 mr-1" /> {t("news.sections")}:
                </span>
                {SECTION_SLUGS.map((secSlug) => (
                  <Badge
                    key={secSlug}
                    variant={isActive(secSlug) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => toggleFilter(secSlug)}
                  >
                    {getFilterLabel(secSlug)}
                  </Badge>
                ))}
              </div>
              {/* Filtro Medios */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase text-muted-foreground mr-2 flex items-center">
                  <Filter className="w-3 h-3 mr-1" /> {t("news.media")}
                </span>
                {MEDIOS_FILTER.map((media) => (
                  <Badge
                    key={media}
                    variant={isActive(media) ? "secondary" : "outline"}
                    className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => toggleFilter(media)}
                  >
                    {media}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3.1 RENDERIZADO JERARQUIZADO (GRID) */}
      {heroNews.length > 0 ? (
        <NewsHero
          news={heroNews}
          title={t("news.featured")}
          accentColor={isAll ? "bg-purple-500" : "bg-blue-600"}
        />
      ) : (
        <div className="text-center py-20 text-gray-500">
          {t("news.noNewsFound")}
        </div>
      )}

      {/* 3.2 RESTO DE NOTICIAS (CARDS HOMOGÉNEAS) */}
      {listNews.length > 0 && (
        <section className="mb-12">
          <h3 className="text-xl font-medium text-text-strong mb-6 border-l-4 border-primary pl-3">
            {t("news.moreNews")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listNews.map((item, idx) => (
              <a
                key={item._id || idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg overflow-hidden transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-video relative overflow-hidden rounded-xl">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex-1 px-4 md:py-4 md:px-0 flex flex-col justify-between p-2">
                  <div>
                    {/* MEDIO + FAVICON */}
                    <div className="flex items-center gap-2 mb-1">
                      {item.favicon && (
                        <img
                          src={item.favicon}
                          alt={item.creator}
                          className="w-4 h-4 rounded-full"
                        />
                      )}
                      <span className="text-[10px] tracking-wider text-foreground">
                        {item.creator}
                      </span>
                    </div>

                    <h5 className="mt-3 text-sm md:text-base font-medium text-foreground line-clamp-3 group-hover:text-accent transition-colors">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* PAGINACIÓN */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-8 border-t border-border">
          <Button
            variant="outline"
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t("common.prev")}
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {t("common.pageOf")
              .replace("{current}", pagination.currentPage.toString())
              .replace("{total}", pagination.totalPages.toString())}
          </span>
          <Button
            variant="outline"
            disabled={!pagination.hasNextPage}
            onClick={() => setPage(currentPage + 1)}
          >
            {t("common.next")} <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
