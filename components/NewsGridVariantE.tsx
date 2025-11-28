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

interface NewsGridVariantEProps {
  title: string;      
  category: string;   
  accentColor?: string;
}

export default function NewsGridVariantE({ 
  title, 
  category, 
  accentColor = "bg-red-600" 
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
          const items = Array.isArray(json) ? json : (json.data || []);
          // Necesitamos 7 noticias para llenar la grilla según el dibujo
          // (1 Grande + 2 Medianas + 4 Pequeñas)
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

  // Distribución de noticias
  const mainNews = news[0];               // Columna Izquierda
  const middleNews = news.slice(1, 3);    // Columna Central (2)
  const rightNews = news.slice(3, 7);     // Columna Derecha (4)

  return (
    <section className="w-full mb-16">
      {/* Encabezado */}
      <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3`}>
        <span className={`w-1.5 h-8 rounded-full inline-block ${accentColor}`}></span>
        {title}
      </h3>

      {loading ? (
        <SkeletonVariantE />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:h-[600px]">
          
          {/* --- COLUMNA 1: PRINCIPAL (Ocupa 2 espacios) --- */}
          {mainNews && (
            <a 
              href={mainNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-2 group relative h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800"
            >
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700">
                {mainNews.image ? (
                   <img 
                   src={mainNews.image} 
                   alt={mainNews.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   onError={(e) => {
                     (e.target as HTMLImageElement).style.display = 'none';
                     (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                   }}
                 />
                ) : null}
                <div className={`absolute inset-0 flex items-center justify-center ${mainNews.image ? 'hidden' : 'flex'}`}>
                  <ImageOff className="w-12 h-12 text-slate-400" />
                </div>
              </div>

              {/* Título Difuminado (Abajo) */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 to-transparent flex flex-col justify-end p-6 md:p-8">
                <span className="inline-block bg-[#0D47A1] w-fit text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 uppercase tracking-wider">
                  {mainNews.creator}
                </span>
                <h4 className="text-white text-xl md:text-3xl font-bold leading-tight group-hover:text-[#55EEF9] transition-colors line-clamp-3">
                  {mainNews.title}
                </h4>
              </div>
            </a>
          )}

          {/* --- COLUMNA 2: MEDIANAS (2 apiladas) --- */}
          <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            {middleNews.map((item, idx) => (
              <a 
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col flex-1 bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Imagen Arriba */}
                <div className="relative w-full h-1/2 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {item.image ? (
                     <img 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     onError={(e) => {
                       (e.target as HTMLImageElement).style.display = 'none';
                       (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                     }}
                   />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : 'flex'}`}>
                     <ImageOff className="w-8 h-8 text-slate-300" />
                  </div>
                </div>
                {/* Título Abajo */}
                <div className="p-4 flex flex-col flex-1">
                   <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                     {item.title}
                   </h5>
                   <div className="mt-auto pt-2 flex justify-between items-center text-xs text-slate-500">
                      <span>{item.creator}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                </div>
              </a>
            ))}
          </div>

          {/* --- COLUMNA 3: PEQUEÑAS (4 apiladas lista) --- */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            {rightNews.map((item, idx) => (
              <a 
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center bg-transparent border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
              >
                 {/* Título Izquierda (Según Wireframe) */}
                 <div className="flex-1 pr-3">
                    <h5 className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-200 line-clamp-3 group-hover:text-red-500 transition-colors leading-tight">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 mt-1 block uppercase">{item.creator}</span>
                 </div>

                 {/* Imagen Derecha (Según Wireframe) */}
                 <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    {item.image ? (
                       <img 
                       src={item.image} 
                       alt={item.title} 
                       className="w-full h-full object-cover"
                       onError={(e) => {
                         (e.target as HTMLImageElement).style.display = 'none';
                         (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                       }}
                     />
                    ) : null}
                     <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : 'flex'}`}>
                        <ImageOff className="w-4 h-4 text-slate-300" />
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

function SkeletonVariantE() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      <div className="lg:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
      <div className="lg:col-span-1 flex flex-col gap-6">
         <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
         <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
      </div>
      <div className="lg:col-span-1 flex flex-col gap-4">
         {[1,2,3,4].map(i => <div key={i} className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />)}
      </div>
    </div>
  );
}