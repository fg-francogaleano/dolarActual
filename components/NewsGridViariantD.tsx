"use client";

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  favicon: string;
  image: string | null;
  category?: string;
  source?: string;
}

interface NewsGridVariantDProps {
  title?: string;
  category: string;
  accentColor?: string;
  preloadedNews?: NewsItem[]; // <--- NUEVA PROP OPCIONAL
}

export default function NewsGridVariantD({
  title = "Mercado Cambiario",
  category,
  accentColor = "bg-[#55EEF9]",
  preloadedNews, // Recibimos data inyectada
}: NewsGridVariantDProps) {
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

  return (
    <section className="mb-16">
      <h3 className="text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span
          className={`w-1.5 h-6 rounded-full inline-block ${accentColor}`}
        ></span>
        {title}
      </h3>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full h-40 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden dark:border-slate-800 transition-transform duration-300 hover:-translate-y-1 h-full"
              >
                <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <ImageOff className="h-8 w-8" />
                    </div>
                  )}
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

                  <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 mb-2 leading-relaxed group-hover:text-[#0891B2] dark:group-hover:text-[#55EEF9] transition-colors">
                    {item.title}
                  </h5>
                </div>
              </a>
          ))}
        </div>
      )}
    </section>
  );
}
