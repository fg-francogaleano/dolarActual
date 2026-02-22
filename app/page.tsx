import { getDolarRates } from "@/lib/dolar-service";
import { getRecentNewsPool } from "@/lib/news-service"; 
import { NewsDistributor } from "@/lib/news-distributor";
import HomeContent from "@/components/HomeContent"; 
import { getDollarNews } from "@/lib/news-service"; 

export const revalidate = 60;

export default async function HomePage() {
  // 1. CARGA DE DATOS (SERVER SIDE)
  const [dolarData, newsPool, dollarNewsRaw] = await Promise.all([
    getDolarRates(),
    getRecentNewsPool(200), // Pool general para las secciones de abajo
    getDollarNews(20)       // Pool específico para "Dólar Hoy"
  ]);

  const cotizaciones = dolarData.object || {};

  const dollarDistributor = new NewsDistributor(dollarNewsRaw);
  const dollarNewsFiltered = dollarDistributor.getSelection("all", 4);

  // 2. LÓGICA DE DISTRIBUCIÓN (SERVER SIDE)
  const distributor = new NewsDistributor(newsPool);

  const mercadoNews = distributor.getSelection("dólar", 5);
  const economiaNews = distributor.getSelection("economia", 3);
  const finanzasNews = distributor.getSelection("finanzas", 4);
  const politicaNews = distributor.getSelection("politica", 5);
  const negociosNews = distributor.getSelection("negocios", 7);

  // 3. RENDERIZADO (Delegamos al cliente la presentación)
  return (
    <HomeContent 
      cotizaciones={cotizaciones}
      newsData={{
        mercado: dollarNewsFiltered,
        economia: economiaNews,
        finanzas: finanzasNews,
        politica: politicaNews,
        negocios: negociosNews
      }}
    />
  );
}