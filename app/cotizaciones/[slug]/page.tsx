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

// ISR para las páginas de detalle
export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const data = await getQuoteBySlug(slug);
  console.log(data, "hola");
  if (!data) return { title: "Cotización no encontrada" };

  if (data.featured.category === "dolar")
    return {
      title: `Dólar ${data.featured.nombre} hoy`,
      description: `Revisá el precio actual del dólar ${data.featured.nombre}. Compra: $${data.featured.compra || "-"} - Venta: $${data.featured.venta}.`,
    };

  return {
    title: `${data.featured.nombre} hoy`,
    description: `Revisá el precio actual del ${data.featured.nombre}. Compra: $${data.featured.compra || "-"} - Venta: $${data.featured.venta}.`,
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
  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <QuoteDetailContent featured={data.featured} related={data.related} />
    </main>
  );
}
