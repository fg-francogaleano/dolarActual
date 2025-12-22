export const translations = {
  es: {
    nav: {
      home: "Inicio",
      quotations: "Cotizaciones",
      history: "Historial",
      converter: "Conversor",
      news: "Noticias",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contacto",
    },
    home: {
      title: "Cotizaciones del Dólar en",
      subtitle: "Información actualizada en tiempo real",
      featured: "Cotizaciones Destacadas",
      latestNews: "Últimas Noticias",
      quickConverter: "Conversor Rápido",
    },
    quotations: {
      title: "Cotizaciones",
      // Tipos de Dólar
      blue: "Dólar Blue",
      oficial: "Dólar Oficial",
      mep: "Dólar MEP",
      ccl: "Dólar CCL",
      turista: "Dólar Turista",
      mayorista: "Dólar Mayorista",
      cripto: "Dólar Cripto", // Diferenciamos del genérico
      
      // Otras Monedas
      euro: "Euro",
      real: "Real",
      chileno: "Peso Chileno",
      uruguayo: "Peso Uruguayo",
      
      // Criptomonedas (Nombres propios usualmente no se traducen, pero mantenemos consistencia)
      bitcoin: "Bitcoin",
      ethereum: "Ethereum",
      xrp: "XRP",
      bnb: "BNB",
      solana: "Solana",
      usdt: "USDT",

      // Textos UI
      buy: "Compra",
      sell: "Venta",
      variation: "Variación",
      updated: "Última actualización",
      
      // Secciones del Menú Desplegable
      sectionDollars: "Dólares",
      sectionFiat: "Otras Divisas",
      sectionCryptos: "Criptomonedas",
      viewAll: "Todas las cotizaciones",
    },
    converter: {
      title: "Conversor de Divisas",
      from: "De",
      to: "A",
      amount: "Monto",
      convert: "Convertir",
      result: "Resultado",
      title2: "Tasas de Referencia",
    },
    news: {
      title: "Noticias",
      // Categorías
      exchangeMarketCurrencies:"Mercado Cambiario & Divisas",
      economy: "Economía",
      finance: "Finanzas",
      politics: "Política",
      business: "Negocios",
      all: "Todas las noticias",
      
      // UI
      sections: "Secciones",
      market: "Mercado Cambiario",
      readMore: "Leer más",
      source: "Fuente",
    },
    blog: {
      title: "Blog Educativo",
      readMore: "Leer artículo completo",
    },
    faq: {
      title: "Preguntas Frecuentes",
    },
    footer: {
      description:
        "Tu fuente confiable para cotizaciones del dólar en Argentina",
      rights: "Todos los derechos reservados",
      disclaimer:
        "Las cotizaciones son referenciales y pueden variar según el mercado",
    },
  },
  en: {
    nav: {
      home: "Home",
      quotations: "Quotes",
      history: "History",
      converter: "Converter",
      news: "News",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
    },
    home: {
      title: "Dollar Exchange Rates in",
      subtitle: "Real-time updated information",
      featured: "Featured Rates",
      latestNews: "Latest News",
      quickConverter: "Quick Converter",
    },
    quotations: {
      title: "Quotes",
      // Dollar Types
      blue: "Blue Dollar",
      oficial: "Official Dollar",
      mep: "MEP Dollar",
      ccl: "CCL Dollar",
      turista: "Tourist Dollar",
      mayorista: "Wholesale Dollar",
      cripto: " Crypto Dollar",
      
      // Other Currencies
      euro: "Euro",
      real: "Real",
      chileno: "Chilean Peso",
      uruguayo: "Uruguayan Peso",
      
      // Cryptos
      bitcoin: "Bitcoin",
      ethereum: "Ethereum",
      xrp: "XRP",
      bnb: "BNB",
      solana: "Solana",
      usdt: "USDT",

      // UI Texts
      buy: "Buy",
      sell: "Sell",
      variation: "Variation",
      updated: "Latest update",

      // Dropdown Sections
      sectionDollars: "Dollars",
      sectionFiat: "Other Currencies",
      sectionCryptos: "Cryptocurrencies",
      viewAll: "All quotes",
    },
    converter: {
      title: "Currency Converter",
      from: "From",
      to: "To",
      amount: "Amount",
      convert: "Convert",
      result: "Result",
      title2: "Reference Rates",
    },
    news: {
      title: "News",
      // Categories
      exchangeMarketCurrencies:"Exchange Market & Currencies",
      economy: "Economy",
      finance: "Finance",
      politics: "Politics",
      business: "Business",
      all: "All news",

      // UI
      sections: "Sections",
      market: "Exchange Market",
      readMore: "Read more",
      source: "Source",
    },
    blog: {
      title: "Educational Blog",
      readMore: "Read full article",
    },
    faq: {
      title: "Frequently Asked Questions",
    },
    footer: {
      description:
        "Your reliable source for dollar exchange rates in Argentina",
      rights: "All rights reserved",
      disclaimer: "Rates are referential and may vary according to the market",
    },
  },
} as const;

// export const translations = {
//   es: {
//     nav: {
//       home: "Inicio",
//       quotations: "Cotizaciones",
//       history: "Historial",
//       converter: "Conversor",
//       news: "Noticias",
//       blog: "Blog",
//       faq: "FAQ",
//       contact: "Contacto",
//     },
//     home: {
//       title: "Cotizaciones del Dólar en",
//       subtitle: "Información actualizada en tiempo real",
//       featured: "Cotizaciones Destacadas",
//       latestNews: "Últimas Noticias",
//       quickConverter: "Conversor Rápido",
//     },
//     quotations: {
//       title: "Cotizaciones",
//       blue: "Dólar Blue",
//       oficial: "Dólar Oficial",
//       mep: "Dólar MEP",
//       ccl: "Dólar CCL",
//       turista: "Dólar Turista",
//       cripto: "Dólar Cripto",
//       mayorista: "Dólar Mayorista",
//       euro: "Euro Blue",
//       real: "Real",
//       chileno: "Peso Chileno",
//       uruguayo: "Peso Uruguayo",
//       buy: "Compra",
//       sell: "Venta",
//       variation: "Variación",
//       updated: "Última actualización",
//       subtitleDolar: "Tipos de dolar",
//       subtitleOtrasMonedas: "Otras Monedas",
//       subtitleCriptomonedas: "Criptomonedas",
//     },
//     converter: {
//       title: "Conversor de Divisas",
//       from: "De",
//       to: "A",
//       amount: "Monto",
//       convert: "Convertir",
//       result: "Resultado",
//       title2: "Tasas de Referencia",
//     },
//     news: {
//       title: "Noticias",
//       economy: "Economía",
//       finance: "Finanzas",
//       politics: "Política",
//       market: "Mercado Cambiario",
//       readMore: "Leer más",
//       source: "Fuente",
//     },
//     blog: {
//       title: "Blog Educativo",
//       readMore: "Leer artículo completo",
//     },
//     faq: {
//       title: "Preguntas Frecuentes",
//     },
//     footer: {
//       description:
//         "Tu fuente confiable para cotizaciones del dólar en Argentina",
//       rights: "Todos los derechos reservados",
//       disclaimer:
//         "Las cotizaciones son referenciales y pueden variar según el mercado",
//     },
//   },
//   en: {
//     nav: {
//       home: "Home",
//       quotations:"Quotations",  
//       history: "History",
//       converter: "Converter",
//       news: "News",
//       blog: "Blog",
//       faq: "FAQ",
//       contact: "Contact",
//     },
//     home: {
//       title: "Dollar Exchange Rates in",
//       subtitle: "Real-time updated information",
//       featured: "Featured Rates",
//       latestNews: "Latest News",
//       quickConverter: "Quick Converter",
//     },
//     quotations: {
//       title: "Quotes",
//       blue: "Blue Dollar",
//       oficial: "Official Dollar",
//       mep: "MEP Dollar",
//       ccl: "CCL Dollar",
//       turista: "Tourist Dollar",
//       mayorista: "Mayorista Dollar",
//       euro: "Blue Euro",
//       real: "Real",
//       chileno: "Chilean Peso",
//       uruguayo: "Uruguayan Peso",
//       cripto: "Crypto Dollar",
//       buy: "Buy",
//       sell: "Sell",
//       variation: "Variation",
//       updated: "Latest update",
//       subtitleDolar: "Dollar exchange rates",
//       subtitleOtrasMonedas: "Other Currencies",
//       subtitleCriptomonedas: "Cryptocurrencies",
//     },
//     converter: {
//       title: "Currency Converter",
//       from: "From",
//       to: "To",
//       amount: "Amount",
//       convert: "Convert",
//       result: "Result",
//       title2: "Reference Rates",
//     },
//     news: {
//       title: "News",
//       economy: "Economy",
//       finance: "Finance",
//       politics: "Politics",
//       market: "Exchange Market",
//       readMore: "Read more",
//       source: "Source",
//     },
//     blog: {
//       title: "Educational Blog",
//       readMore: "Read full article",
//     },
//     faq: {
//       title: "Frequently Asked Questions",
//     },
//     footer: {
//       description:
//         "Your reliable source for dollar exchange rates in Argentina",
//       rights: "All rights reserved",
//       disclaimer: "Rates are referential and may vary according to the market",
//     },
//   },
// } as const;
