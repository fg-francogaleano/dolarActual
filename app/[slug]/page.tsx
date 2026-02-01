import { notFound } from "next/navigation";
import { getQuoteBySlug, getAllQuotesNormalized } from "@/lib/quote-utils";
import { getNewsPaginated } from "@/lib/news-service"; // Importamos el servicio nuevo
import QuoteDetail from "@/components/QuoteDetail";
import NewsLayout from "@/components/news/NewsLayout";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const NEWS_SECTIONS = ['economia', 'finanzas', 'politica', 'negocios', 'noticias'];

// Generar Metadata dinámica
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. Intentar como Cotización
  const quoteData = await getQuoteBySlug(slug);
  if (quoteData) {
    return {
      title: `Cotización ${quoteData.featured.nombre} hoy | Dolaractual.com`,
      description: `Revisá el precio actual del ${quoteData.featured.nombre}.`
    };
  }

  // 2. Intentar como Sección de Noticias
  if (NEWS_SECTIONS.includes(slug)) {
    const title = slug === 'todas' ? 'Todas las Noticias' : `Noticias de ${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
    return {
      title: `${title} | Dolaractual.com`,
      description: `Las últimas noticias sobre ${slug} en Argentina y el mundo.`
    };
  }

  return { title: "Página no encontrada" };
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams; // Esperamos los params de búsqueda

  // ---------------------------------------------------------
  // ESTRATEGIA 1: ¿ES UNA COTIZACIÓN? (Blue, Bitcoin, Euro...)
  // ---------------------------------------------------------
  const quoteData = await getQuoteBySlug(slug);
  
  if (quoteData) {
    return (
      <main className="min-h-screen bg-background">
        <QuoteDetail 
          featured={quoteData.featured} 
          related={quoteData.related} 
        />
      </main>
    );
  }

  // ---------------------------------------------------------
  // ESTRATEGIA 2: ¿ES UNA SECCIÓN DE NOTICIAS? (Economía, Todas...)
  // ---------------------------------------------------------
  if (NEWS_SECTIONS.includes(slug)) {
    // Obtenemos los datos PAGINADOS desde el backend (Server Side Fetching)
    const page = Number(resolvedSearchParams.page) || 1;
    const limit = 39; // Requisito 3.2

    const { news, pagination } = await getNewsPaginated({
      page,
      limit,
      section: slug,
      searchParams: resolvedSearchParams
    });

    return (
      <main className="min-h-screen bg-background">
        <NewsLayout 
          initialNews={news}
          pagination={pagination}
          categorySlug={slug}
        />
      </main>
    );
  }

  // Si no es nada, 404
  notFound();
}



// VERSION ANTIGUA
// import { notFound } from "next/navigation";
// import { getQuoteBySlug, getAllQuotesNormalized } from "@/lib/quote-utils";
// import QuoteDetail from "@/components/QuoteDetail";
// import { Metadata } from "next";

// // En Next.js 15, params es una Promesa
// interface PageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// // Generar Metadata dinámica para SEO
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   // 1. Esperamos a que se resuelva la promesa de params
//   const { slug } = await params;
  
//   const data = await getQuoteBySlug(slug);
//   if (!data) return { title: "Cotización no encontrada" };

//   return {
//     title: `Cotización ${data.featured.nombre} hoy | Dolaractual.com`,
//     description: `Revisá el precio actual del ${data.featured.nombre}. Compra: $${data.featured.compra || '-'} - Venta: $${data.featured.venta}.`
//   };
// }

// // Generar rutas estáticas (opcional)
// export async function generateStaticParams() {
//   const quotes = await getAllQuotesNormalized();
//   return quotes.map((quote) => ({
//     slug: quote.slug,
//   }));
// }

// export default async function DynamicQuotePage({ params }: PageProps) {
//   // 2. Esperamos a que se resuelva la promesa de params
//   const { slug } = await params;
//   // Buscar datos basados en el slug
//   const data = await getQuoteBySlug(slug);

//   // Si no existe, mostrar 404
//   if (!data) {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 dark:bg-[#111]">
//       <QuoteDetail 
//         featured={data.featured} 
//         related={data.related} 
//       />
//     </main>
//   );
// }