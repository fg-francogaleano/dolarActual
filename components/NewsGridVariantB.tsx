"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ImageOff, User } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
}

interface NewsGridVariantBProps {
  title: string;
  category: string;
  accentColor?: string;
}

export default function NewsGridVariantB({
  title,
  category,
  accentColor = "bg-purple-600",
}: NewsGridVariantBProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Consumimos la API para la categoría (ej: finanzas)
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          // Necesitamos 4 noticias: 1 grande arriba + 3 abajo
          setNews(items.slice(0, 4));
        }
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (!loading && news.length === 0) return null;

  const mainNews = news[0];
  const secondaryNews = news.slice(1, 4); // Las 3 de abajo

  return (
    <section className="w-full mb-16">
      {/* ENCABEZADO PRINCIPAL */}
      <h3 className="text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="w-1.5 h-6 bg-[#55EEF9] rounded-full inline-block"></span>
        {title}
      </h3>

      {loading ? (
        <SkeletonVariantB />
      ) : (
        <div className="flex flex-col gap-4">
          {/* TARJETA PRINCIPAL */}
          {mainNews && (
            <a
              href={mainNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 block"
            >
              {/* IMAGEN */}
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700">
                {mainNews.image ? (
                  <img
                    src={mainNews.image}
                    alt={mainNews.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (
                        e.target as HTMLImageElement
                      ).nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                {/* FALLBACK */}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    mainNews.image ? "hidden" : "flex"
                  }`}
                >
                  <ImageOff className="w-16 h-16 text-slate-400" />
                </div>
              </div>

              {/* MEDIO DIGITAL */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-black/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg border border-white/20">
                  {mainNews.creator}
                </span>
              </div>

              {/* TITULO */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10 z-10">
                <h4 className="text-white text-2xl md:text-4xl font-extrabold leading-tight mb-3 drop-shadow-lg max-w-4xl group-hover:text-[#55EEF9] transition-colors">
                  {mainNews.title}
                </h4>
              </div>
            </a>
          )}

          {/* FILA INFERIOR (GRID 3 NOTICIAS) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {secondaryNews.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-transparent rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 "
              >
                {/* IMAGEN */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden  bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (
                          e.target as HTMLImageElement
                        ).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}

                  {/* FALLBACK ICON */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${
                      item.image ? "hidden" : "flex"
                    }`}
                  >
                    <ImageOff className="w-8 h-8 text-slate-300" />
                  </div>
                </div>

                {/* CONTENIDO */}
                <div className="py-4">
                  <div>
                    {/* MEDIO DIGITAL */}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] dark:text-[#55EEF9] mb-1 block">
                      {item.creator}
                    </span>

                    {/* TITULO */}
                    <h5 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function SkeletonVariantB() {
  return (
    <div className="flex flex-col gap-6">
      {/* Skeleton Grande */}
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
      {/* Skeleton Fila Inferior */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full aspect-4/3 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
