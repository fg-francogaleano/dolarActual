import { notFound } from "next/navigation";
import { getQuoteBySlug, getAllQuotesNormalized } from "@/lib/quote-utils";
import QuoteDetail from "@/components/QuoteDetail";
import { Metadata } from "next";
import QuoteDetailContent from "@/components/QuoteDetailContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const data = await getQuoteBySlug(slug);
  if (!data) return { title: "Cotización no encontrada" };

  return {
    title: `Cotización ${data.featured.nombre} hoy | Dolaractual.com`,
    description: `Revisá el precio actual del ${data.featured.nombre}. Compra: $${data.featured.compra || '-'} - Venta: $${data.featured.venta}.`
  };
}

// Generamos rutas estáticas para rendimiento
export async function generateStaticParams() {
  const quotes = await getAllQuotesNormalized();
  return quotes.map((quote) => ({
    slug: quote.slug,
  }));
}

export default async function QuotePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getQuoteBySlug(slug);
console.log(data)
  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#111]">
      <QuoteDetailContent 
        featured={data.featured} 
        related={data.related} 
      />
    </main>
  );
}