import { ImageOff } from "lucide-react";
import React from "react";

// Interfaces reutilizables
export interface NewsItem {
  _id?: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  image: string | null;
  favicon?: string;
  category?: string;
}

interface NewsHeroProps {
  news: NewsItem[]; // Recibe las noticias ya fetcheadas
  title: string;
  accentColor?: string;
}

export default function NewsHero({
  news,
  title,
  accentColor = "bg-blue-600",
}: NewsHeroProps) {
  if (!news || news.length === 0) return null;

  // Tomamos las primeras 3 noticias para el layout jerárquico
  const mainNews = news[0];
  const secondaryNews = news.slice(1, 3);

  return (
    <section className="w-full mb-12">
      <h3 className="text-xl font-semibold text-[#0D47A1] dark:text-[#55EEF9] mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <span
          className={`w-1.5 h-6 rounded-full inline-block ${accentColor}`}
        ></span>
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 h-auto md:h-[500px]">
        {/* TARJETA PRINCIPAL */}
        {mainNews && (
          <a
            href={mainNews.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full h-[400px] md:h-full rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800"
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
              <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg border border-white/20 flex items-center gap-2">
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

            {/* TITULO */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6 md:p-8 z-10">
              <h4 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-2 drop-shadow-lg group-hover:text-[#55EEF9] transition-colors">
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
              className="group flex flex-1 dark:bg-slate-900 rounded-xl overflow-hidden dark:border-slate-800 hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Layout móvil: Row, Desktop: Col */}
              <div className="flex flex-row md:flex-col w-full h-full">
                <div className="relative w-1/3 md:w-full h-full md:h-1/2 overflow-hidden dark:bg-slate-800">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).style.display = "none")
                      }
                    />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {/* MEDIO + FAVICON */}
                  <div className="flex items-center gap-2 mb-1">
                    {item.favicon && (
                      <img
                        src={item.favicon}
                        alt={item.creator}
                        className="w-3 h-3 rounded-full"
                      />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] dark:text-[#55EEF9]">
                      {item.creator}
                    </span>
                  </div>

                  <h5 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-3 md:line-clamp-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h5>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
