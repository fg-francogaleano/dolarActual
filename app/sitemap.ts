import { MetadataRoute } from 'next'
import { getAllQuotesNormalized } from '@/lib/quote-utils'

const BASE_URL = 'https://dolaractual.com.ar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Obtener rutas dinámicas de cotizaciones
  const quotes = await getAllQuotesNormalized()
  
  const quoteUrls = quotes.map((quote) => ({
    url: `${BASE_URL}/cotizaciones/${quote.slug}`,
    lastModified: new Date(quote.fechaActualizacion),
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }))

  // 2. Rutas estáticas principales
  const routes = [
    '',
    '/noticias',
    '/conversor',
    '/historial',
    '/blog',
    '/faq',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...quoteUrls]
}