"use client";

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

// Asegúrate de que esta interfaz coincida con la que usas en el distribuidor
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

interface NewsGridVariantAProps {
  title: string;
  category: string; // Se mantiene por si se usa el fetch interno
  accentColor?: string;
  preloadedNews?: NewsItem[]; // <--- NUEVA PROP OPCIONAL
}

export default function NewsGridVariantA({
  title,
  category,
  accentColor = "bg-blue-600",
  preloadedNews, // Recibimos la data ya filtrada
}: NewsGridVariantAProps) {
  
  // Si viene preloadedNews, inicializamos el estado con eso
  const [news, setNews] = useState<NewsItem[]>(preloadedNews || []);
  const [loading, setLoading] = useState(!preloadedNews); // Si hay data, no cargamos

  useEffect(() => {
    // Si ya tenemos noticias inyectadas desde el padre, NO hacemos fetch
    if (preloadedNews && preloadedNews.length > 0) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          setNews(items.slice(0, 3));
        }
      } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, preloadedNews]); // Dependencia clave

  if (!loading && news.length === 0) return null;

  const mainNews = news[0];
  const secondaryNews = news.slice(1, 3);

  return (
    <section className="w-full mb-16">
      <h3 className="text-xl text-text-strong font-medium mb-6 flex items-center gap-2 border-b border-border pb-2">
        <span
          className="w-1 h-6 inline-block bg-primary"
        ></span>
        {title}
      </h3>

      {loading ? (
        <SkeletonVariantA />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 h-auto md:h-[600px]">
          {/* TARJETA PRINCIPAL */}
          {mainNews && (
            <a
              href={mainNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full h-[400px] md:h-full rounded-xl overflow-hidden shadow-lg"
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

              {/* MEDIO DIGITAL + FAVICON */}
              <div className="absolute top-4 left-4 z-20">
                <div className="text-white px-3 py-1.5 text-xs tracking-widest flex items-center gap-2">
                  {mainNews.favicon && (
                    <img
                      src={mainNews.favicon}
                      alt={mainNews.creator}
                      className="w-5 h-5 rounded-full"
                    />
                  )}
                  <span>{mainNews.creator}</span>
                </div>
              </div>
              
              {/* TITULO */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10 z-10">
                <h4 className="text-[#e5e7eb] dark:text-foreground text-2xl md:text-4xl font-bold leading-tight mb-3 drop-shadow-lg group-hover:text-accent transition-colors">
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
                className="group flex flex-1 overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`flex flex-row md:flex-col w-full h-full pb-4.5 sm:pb-0 ${idx !== secondaryNews.length -1 ? "border-b sm:border-none":""}`}>
                  <div className="relative w-1/4 md:w-full h-full overflow-hidden bg-card rounded-md">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).style.display =
                            "none")
                        }
                      />
                    )}
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
                        <span className="text-[10px] font-medium tracking-wider text-foreground">
                          {item.creator}
                        </span>
                      </div>

                      <h5 className="text-sm md:text-base font-medium text-foreground line-clamp-3 group-hover:text-accent transition-colors">
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

function SkeletonVariantA() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 h-auto md:h-[600px]">
      {/* Skeleton Principal */}
      <div className="w-full h-[400px] md:h-full bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse relative">
        <div className="absolute bottom-10 left-10 w-3/4 h-8 bg-slate-300 dark:bg-slate-700 rounded animate-pulse" />
        <div className="absolute bottom-20 left-10 w-1/2 h-8 bg-slate-300 dark:bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Skeleton Columna Derecha */}
      <div className="flex flex-col gap-4 h-full">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-1 flex-row md:flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden"
          >
            {/* Imagen pequeña */}
            <div className="w-1/4 md:w-full h-full md:h-1/2 bg-slate-200 dark:bg-slate-800 animate-pulse" />
            {/* Texto */}
            <div className="flex-1 p-4 flex flex-col gap-2 justify-center">
              <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

