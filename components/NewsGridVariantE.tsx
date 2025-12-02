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
  favicon: string; // Nuevo campo
}

interface NewsGridVariantEProps {
  title: string;
  category: string;
  accentColor?: string;
}

export default function NewsGridVariantE({
  title,
  category,
  accentColor = "bg-red-600",
}: NewsGridVariantEProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          setNews(items.slice(0, 7));
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
  const middleNews = news.slice(1, 3);
  const rightNews = news.slice(3, 7);

  return (
    <section className="w-full mb-16">
      <h3 className="text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span
          className={`w-1.5 h-6 rounded-full inline-block ${accentColor}`}
        ></span>
        {title}
      </h3>

      {loading ? (
        <SkeletonVariantE />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:h-[600px]">
          {/* TARJETA PRINCIPAL */}
          {mainNews && (
            <a
              href={mainNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-2 group relative h-[400px] lg:h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700">
                {mainNews.image ? (
                  <img
                    src={mainNews.image}
                    alt={mainNews.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).style.display = "none")
                    }
                  />
                ) : null}
              </div>

              {/* MEDIO + FAVICON */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg border border-white/20 flex items-center gap-2">
                  {mainNews.favicon && (
                    <img
                      src={mainNews.favicon}
                      alt={mainNews.creator}
                      className="w-4 h-4 rounded-full bg-white"
                    />
                  )}
                  <span>{mainNews.creator}</span>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10 z-10">
                <h4 className="text-white text-2xl md:text-4xl font-extrabold leading-tight mb-3 drop-shadow-lg group-hover:text-[#55EEF9] transition-colors">
                  {mainNews.title}
                </h4>
              </div>
            </a>
          )}

          {/* COLUMNA 2 (MEDIANAS) */}
          <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            {middleNews.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col flex-1 bg-white dark:bg-slate-900 rounded-xl overflow-hidden dark:border-slate-800 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full h-1/2 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
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
                          className="w-3 h-3 rounded-full"
                        />
                      )}
                      <span className="text-[10px] font-bold tracking-wider text-[#0D47A1] dark:text-[#55EEF9]">
                        {item.creator}
                      </span>
                    </div>
                    <h5 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* COLUMNA 3 (PEQUEÑAS) */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            {rightNews.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center bg-transparent border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
              >
                <div className="flex-1 pr-3">
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
                  <h5 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h5>
                </div>

                <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function SkeletonVariantE() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Principal */}
      <div className="lg:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />

      {/* Medianas */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="h-1/2 bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="p-4 flex flex-col gap-2">
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="h-1/2 bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="p-4 flex flex-col gap-2">
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Pequeñas */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 flex items-center p-2">
            <div className="flex-1 pr-3 flex flex-col gap-2">
              <div className="h-2 w-1/3 bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>
            <div className="w-20 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
