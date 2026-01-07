"use client";

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
  favicon: string; 
  category?: string;
  source?: string;
}

interface NewsGridVariantCProps {
  title: string;
  category: string;
  accentColor?: string;
  preloadedNews?: NewsItem[]; // <--- NUEVA PROP OPCIONAL
}

export default function NewsGridVariantC({
  title,
  category,
  accentColor = "bg-orange-500",
  preloadedNews, // Recibimos data inyectada
}: NewsGridVariantCProps) {
  const [news, setNews] = useState<NewsItem[]>(preloadedNews || []);
  const [loading, setLoading] = useState(!preloadedNews);

  useEffect(() => {
    if (preloadedNews && preloadedNews.length > 0) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          setNews(items.slice(0, 5));
        }
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, preloadedNews]);

  if (!loading && news.length === 0) return null;

  const mainNews = news[0];
  const secondaryNews = news.slice(1, 5);

  return (
    <section className="w-full mb-16">
      <h3 className="text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span
          className={`w-1.5 h-6 rounded-full inline-block ${accentColor}`}
        ></span>
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
              <div className="relative w-full h-[350px] lg:h-[60%] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                {mainNews.image ? (
                  <img
                    src={mainNews.image}
                    alt={mainNews.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).style.display = "none")
                    }
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    <ImageOff className="w-12 h-12" />
                  </div>
                )}
              </div>

              <div className="flex-1 py-4 flex flex-col">
                {/* MEDIO + FAVICON */}
                <div className="flex items-center gap-2 mb-1">
                  {mainNews.favicon && (
                    <img
                      src={mainNews.favicon}
                      alt={mainNews.creator}
                      className="w-3 h-3 rounded-full"
                    />
                  )}
                  <span className="text-[10px] font-bold tracking-wider text-[#0D47A1] dark:text-[#55EEF9]">
                    {mainNews.creator}
                  </span>
                </div>

                <h4 className="text-slate-800 dark:text-white text-2xl md:text-4xl font-extrabold leading-tight mb-3 drop-shadow-lg max-w-4xl group-hover:text-[#55EEF9] transition-colors">
                  {mainNews.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed grow">
                  {mainNews.description}
                </p>
              </div>
            </a>
          )}

          {/* COLUMNA DERECHA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4 h-full">
            {secondaryNews.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-transparent dark:bg-slate-900 overflow-hidden dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  ) : null}
                </div>

                <div className="py-4 flex flex-col grow">
                  {/* MEDIO + FAVICON */}
                  <div className="flex items-center gap-2 mb-1">
                    {item.favicon && (
                      <img
                        src={item.favicon}
                        alt={item.creator}
                        className="w-3 h-3 rounded-full"
                      />
                    )}
                    <span className="text-[10px] font-bold tracking-wider text-[#0D47A1] dark:text-[#55EEF9]">
                      {item.creator}
                    </span>
                  </div>

                  <h5 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h5>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[600px]">
      {/* Skeleton Principal */}
      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-full">
        <div className="w-full h-[60%] bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="p-6 flex-1 flex flex-col gap-3">
          <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse mt-auto" />
        </div>
      </div>

      {/* Skeleton Derecha (Grid 2x2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}