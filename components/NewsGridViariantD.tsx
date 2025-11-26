"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ImageOff } from "lucide-react";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
}

interface NewsGridVariantDProps {
  title?: string;
  category: string;
  accentColor?: string;
}

export default function NewsGridVariantD({
  title = "Mercado Cambiario",
  category,
  accentColor = "bg-[#55EEF9]",
}: NewsGridVariantDProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Consumimos la API dinámica
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          // Tomamos 4 para el grid de columnas
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

  return (
    <div className="mb-16">
      {/* Encabezado */}
      <h3
        className={`text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2`}
      >
        <span
          className={`w-1.5 h-6 rounded-full inline-block ${accentColor}`}
        ></span>
        {title}
      </h3>

      {loading ? (
        // Skeleton loader (4 columnas)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full h-40 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        // Grid Real
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, idx) => (
            <a
              key={`${item.link}-${idx}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden  dark:border-slate-800 transition-transform duration-300 hover:-translate-y-1 h-full"
            >
              {/* IMAGEN */}
              <div className="relative w-full h-40 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
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
                  className={`absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600 ${
                    item.image ? "hidden" : "flex"
                  }`}
                >
                  <ImageOff className="h-8 w-8" />
                </div>
              </div>

              {/* CONTENIDO */}
              <div className="py-4 flex flex-col grow">
                {/* MEDIO DIGITAL */}
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] dark:text-[#55EEF9] mb-1 block">
                  {item.creator}
                </span>

                <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 mb-2 leading-relaxed group-hover:text-[#0891B2] dark:group-hover:text-[#55EEF9] transition-colors">
                  {item.title}
                </h5>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
