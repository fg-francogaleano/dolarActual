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

interface NewsGridVariantCProps {
  title: string;
  category: string;
  accentColor?: string;
}

export default function NewsGridVariantC({
  title,
  category,
  accentColor = "bg-orange-500",
}: NewsGridVariantCProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Consumimos la ruta solicitada /api/news/financiero
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          // Necesitamos 5 noticias para este layout (1 grande + 4 pequeñas)
          setNews(items.slice(0, 5));
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
  const secondaryNews = news.slice(1, 5); // Las siguientes 4 noticias

  return (
    <section className="w-full mb-16">
      {/* ENCABEZADO PRINCIPAL */}
      <h3 className="text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="w-1.5 h-6 bg-[#55EEF9] rounded-full inline-block"></span>
        {title}
      </h3>

      {loading ? (
        <SkeletonVariantC />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[600px]">
          {/* TARJETA PRINCIPAL */}
          {mainNews && (
            <a
              href={mainNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden dark:border-slate-800 transition-all duration-300"
            >
              {/* IMAGEN */}
              <div className="relative w-full h-[350px] lg:h-[60%] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
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
                  <ImageOff className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              {/* TITULO + DESCRIPCION */}
              <div className="flex-1 py-4 flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] dark:text-[#55EEF9] mb-1 block">
                  {mainNews.creator}
                </span>
                <h4 className="text-slate-800 text-2xl md:text-4xl font-extrabold leading-tight mb-3 drop-shadow-lg max-w-4xl group-hover:text-[#55EEF9] transition-colors">
                  {mainNews.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed grow">
                  {mainNews.description}
                </p>
              </div>
            </a>
          )}

          {/* COLUMNA DERECHA (GRID 2x2 - 4 NOTICIAS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4 h-full">
            {secondaryNews.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-transparent dark:bg-slate-900 overflow-hidden  dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300"
              >
                {/* IMAGEN */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
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
                <div className="py-4 flex flex-col grow">
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

function SkeletonVariantC() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
      <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
