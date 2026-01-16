import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://dolaractual.com'; // Cambia esto por tu dominio real en producción

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Bloqueamos rutas de API internas o admin si existieran
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}