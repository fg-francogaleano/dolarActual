"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ImageOff, User } from "lucide-react";

// Interfaz para las noticias
interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
}

interface NewsGridVariantAProps {
  title: string; // Ej: "Economía"
  category: string; // Ej: "economia" (para la api)
  accentColor?: string; // Color para la barrita decorativa
}

export default function NewsGridVariantA({
  title,
  category,
  accentColor = "bg-blue-600",
}: NewsGridVariantAProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Consumimos la ruta dinámica de tu API
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          // La API puede devolver array directo o { data: [] }
          const items = Array.isArray(json) ? json : json.data || [];
          // Necesitamos exactamente 3 noticias para este wireframe
          setNews(items.slice(0, 3));
        }
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  // Si no hay noticias, no mostramos nada
  if (!loading && news.length === 0) return null;

  const mainNews = news[0];
  const secondaryNews = news.slice(1, 3);

  return (
    <section className="w-full mb-16">
      {/* ENCABEZADO PRINCIPAL */}
      <h3 className="text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span className="w-1.5 h-6 bg-[#55EEF9] rounded-full inline-block"></span>
        {title}
      </h3>

      {loading ? (
        <SkeletonVariantA />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 h-auto md:h-[500px]">
          {/* TARJETA PRINCIPAL */}
          {mainNews && (
            <a
              href={mainNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full h-[400px] md:h-full rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800"
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
                  <ImageOff className="w-12 h-12 text-slate-400" />
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
                <h4 className="text-white text-2xl md:text-4xl font-extrabold leading-tight mb-3 drop-shadow-lg group-hover:text-[#55EEF9] transition-colors">
                  {mainNews.title}
                </h4>
              </div>
            </a>
          )}

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-4 h-full">
            {secondaryNews.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 bg-white dark:bg-slate-900 rounded-xl overflow-hidden dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex flex-row md:flex-col w-full h-full">
                  {/* IMAGEN */}
                  <div
                    className="relative w-1/3 md:w-full h-full overflow-hidden bg-slate-100 
                  rounded-xl dark:bg-slate-800"
                  >
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
                  <div className="flex-1 px-4 md:py-4 md:px-0 flex flex-col justify-between">
                    <div>

                      {/* MEDIO DIGITAL */}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] dark:text-[#55EEF9] mb-1 block">
                        {item.creator}
                      </span>

                      {/* TITULO */}
                      <h5 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h5>
                    </div>
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

// Subcomponente Skeleton para carga
function SkeletonVariantA() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
      <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
      <div className="flex flex-col gap-6 h-full">
        <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
