import { getNewsPaginated } from "@/lib/news-service"; 
import NewsLayout from "@/components/news/NewsLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todas las Noticias | Dolaractual.com",
  description: "Últimas noticias de economía, finanzas, política y negocios en Argentina.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AllNewsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = 40;

  const { news, pagination } = await getNewsPaginated({
    page,
    limit,
    section: 'noticias', // 'noticias' en news-service significa "traer todo"
    searchParams: resolvedSearchParams
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#111]">
      <NewsLayout 
        initialNews={news}
        pagination={pagination}
        categorySlug="noticias"
      />
    </main>
  );
}