import { notFound } from "next/navigation";
import { getNewsPaginated } from "@/lib/news-service"; 
import NewsLayout from "@/components/news/NewsLayout";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const VALID_CATEGORIES = ['economia', 'finanzas', 'politica', 'negocios'];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  
  if (!VALID_CATEGORIES.includes(category)) return { title: "Sección no encontrada" };

  return {
    title: `Noticias de ${category.charAt(0).toUpperCase() + category.slice(1)} | Dolaractual.com`,
    description: `Las últimas noticias sobre ${category} en Argentina y el mundo.`
  };
}

export default async function NewsCategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }

  const page = Number(resolvedSearchParams.page) || 1;
  const limit = 40;

  const { news, pagination } = await getNewsPaginated({
    page,
    limit,
    section: category,
    searchParams: resolvedSearchParams
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#111]">
      <NewsLayout 
        initialNews={news}
        pagination={pagination}
        categorySlug={category}
      />
    </main>
  );
}