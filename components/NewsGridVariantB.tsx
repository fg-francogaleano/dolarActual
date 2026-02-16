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

interface NewsGridVariantBProps {
  title: string;
  category: string;
  accentColor?: string;
  preloadedNews?: NewsItem[]; // <--- NUEVA PROP OPCIONAL
}

export default function NewsGridVariantB({
  title,
  category,
  accentColor = "bg-purple-600",
  preloadedNews, // Recibimos data inyectada
}: NewsGridVariantBProps) {
  // Inicializamos estado con preloadedNews si existe
  const [news, setNews] = useState<NewsItem[]>(preloadedNews || []);
  // Si tenemos preloadedNews, no cargamos nada
  const [loading, setLoading] = useState(!preloadedNews);

  useEffect(() => {
    // Si ya tenemos noticias inyectadas, salimos
    if (preloadedNews && preloadedNews.length > 0) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news/${category}`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          setNews(items.slice(0, 4));
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
  const secondaryNews = news.slice(1, 4);

  return (
    <section className="w-full mb-16">
      <h3 className="text-xl text-text-strong font-medium mb-6 flex items-center gap-2 border-b border-border pb-2">
        <span
          className="w-1 h-6 inline-block bg-primary"
        ></span>
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
              className="border-b pb-2 sm:border-none sm:pb-0 group relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg block" 
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
                <div className="text-white px-3 py-1.5 text-xs tracking-widest flex items-center gap-2">
                  {mainNews.favicon && (
                    <img
                      src={mainNews.favicon}
                      alt={mainNews.creator}
                      className="w-4 h-4 rounded-full bg-background"
                    />
                  )}
                  <span>{mainNews.creator}</span>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10 z-10">
                <h4 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-3 drop-shadow-lg max-w-4xl group-hover:text-accent transition-colors">
                  {mainNews.title}
                </h4>
              </div>
            </a>
          )}

          {/* FILA INFERIOR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
            {secondaryNews.map((item, idx) => (
              <a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col bg-transparent overflow-hidden hover:-translate-y-1 transition-transform duration-300 pt-5 sm:pt-5 border-t sm:border-none`}
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-card">
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
                    <div className="absolute inset-0 flex items-center justify-center text-foreground">
                      <ImageOff className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="py-4">
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

                    <h5 className="text-sm md:text-base font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors">
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
    <div className="flex flex-col gap-4">
      {/* Skeleton Grande Superior */}
      <div className="w-full h-[350px] md:h-[450px] bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse relative">
         <div className="absolute bottom-8 left-8 right-8 h-8 bg-slate-300 dark:bg-slate-700 rounded animate-pulse" />
      </div>
      
      {/* Skeleton Fila Inferior (3 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* Imagen aspect-video */}
            <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            {/* Texto */}
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}