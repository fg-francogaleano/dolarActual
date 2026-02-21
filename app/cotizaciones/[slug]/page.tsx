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
  
  // 1. Manejo del caso en el que no hay datos
  if (!data) return { title: "Cotización no encontrada | Dólar Actual" };

  // 2. Definición de la descripción principal (clave para el SEO)
  const baseDescription = "Dólar Actual es un portal de cotizaciones del dólar y de titulares de noticias de economía, finanzas, política y negocios de los principales medios de la Argentina (Clarín, La Nación, Infobae, etc.).";

  // 3. Variables de precio limpias para evitar errores si vienen vacías
  const compra = data.featured.compra || "-";
  const venta = data.featured.venta || "-";
  const nombre = data.featured.nombre;

  if (data.featured.category === "dolar") {
    return {
      title: `Precio del Dólar ${nombre} Hoy: Compra $${compra} - Venta $${venta} | Dólar Actual`,
      description: `${baseDescription} Revisá la cotización actualizada del dólar ${nombre.toLowerCase()} hoy.`,
    };
  }

  return {
    title: `${nombre} Hoy: Compra $${compra} - Venta $${venta} | Dólar Actual`,
    description: `${baseDescription} Revisá el precio actualizado del ${nombre.toLowerCase()} hoy.`,
  };
}

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;

//   const data = await getQuoteBySlug(slug);
//   console.log(data, "hola");
//   if (!data) return { title: "Cotización no encontrada" };

//   if (data.featured.category === "dolar")
//     return {
//       title: `Dólar ${data.featured.nombre} hoy`,
//       description: `Revisá el precio actual del dólar ${data.featured.nombre}. Compra: $${data.featured.compra || "-"} - Venta: $${data.featured.venta}.`,
//     };

//   return {
//     title: `${data.featured.nombre} hoy`,
//     description: `Revisá el precio actual del ${data.featured.nombre}. Compra: $${data.featured.compra || "-"} - Venta: $${data.featured.venta}.`,
//   };
// }

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
