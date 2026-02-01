export const translations = {
  es: {
    common: {
      prev: "Anterior",
      next: "Siguiente",
      pageOf: "Página {current} de {total}",
      readMore: "Leer más",
      back: "Volver",
    },
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
    history: {
      title: "Historial de Cotizaciones",
      description:
        "Visualizá cómo ha variado el precio de las distintas cotizaciones del dólar en el último año. Utilizá el gráfico interactivo para comparar tendencias.",
      noData:
        "No hay suficientes datos históricos registrados aún para generar el gráfico.",
      noDataSub:
        "(El sistema comenzará a registrar datos automáticamente con el cron job diario)",
      chartTitle: "Evolución Histórica",
      chartSubtitle: "Comparativa de cotizaciones en el tiempo",
      rangeAll: "Todo",
    },
    quotations: {
      title: "Cotizaciones",
      blue: "Dólar Blue",
      oficial: "Dólar Oficial",
      mep: "Dólar MEP",
      ccl: "Dólar CCL",
      turista: "Dólar Turista",
      mayorista: "Dólar Mayorista",
      cripto: "Dólar Cripto",
      euro: "Euro",
      real: "Real",
      chileno: "Peso Chileno",
      uruguayo: "Peso Uruguayo",
      btc: "Bitcoin",
      eth: "Ethereum",
      xrp: "XRP",
      bnb: "BNB",
      sol: "Solana",
      usdt: "USDT",
      buy: "Compra",
      sell: "Venta",
      variation: "Variación",
      updated: "Última actualización",
      sectionDollars: "Dólares",
      sectionFiat: "Otras Divisas",
      sectionCryptos: "Criptomonedas",
      viewAll: "Todas las cotizaciones",
    },
    converter: {
      title: "Conversor de Monedas",
      description:
        "La herramienta definitiva para convertir entre Pesos Argentinos, Dólares (Blue, MEP, CCL), Euros, Reales y las principales Criptomonedas en tiempo real.",
      from: "De",
      to: "A",
      have: "Tengo",
      want: "Quiero",
      amount: "Monto",
      convert: "Convertir",
      result: "Resultado",
      title2: "Tasas de Referencia",
      ars: "Peso Arg",
      usd: "Dólar (USD)",
      selectDollarType: "Seleccioná la cotización del Dólar",
      infoBlueTitle: "Dólar Blue y Financieros",
      infoBlueDesc:
        "Cotizaciones actualizadas al instante para operar en el mercado paralelo y financiero de Argentina.",
      infoFiatTitle: "Fiat y Regionales",
      infoFiatDesc:
        "Calculá cambios para viajes a Brasil, Chile, Uruguay o Europa con las tasas oficiales.",
      infoCryptoTitle: "Cripto Economía",
      infoCryptoDesc:
        "Equivalencias directas entre tus pesos y Bitcoin, Ethereum o Stablecoins (USDT).",
    },
    news: {
      title: "Noticias",
      exchangeMarketCurrencies: "Mercado Cambiario & Divisas",
      economy: "Economía",
      finance: "Finanzas",
      politics: "Política",
      business: "Negocios",
      all: "Todas las noticias",
      sections: "Secciones",
      media: "Medios",
      market: "Mercado Cambiario",
      readMore: "Leer más",
      source: "Fuente",
      featured: "Destacado",
      moreNews: "Más Noticias",
      noNewsFound: "No hay noticias que coincidan con los filtros.",
    },
    // --- BLOG CONTENT ---
    blog: {
      title: "Blog Educativo",
      subtitle: "Consejos prácticos y guías rápidas",
      readMore: "Leer artículo completo",
      posts: {
        1: {
          title: "Diferencias entre dólar MEP y CCL",
          content:
            "El Dólar MEP (Mercado Electrónico de Pagos) se opera con bonos dentro de Argentina y los dólares resultantes quedan en una cuenta local. El Dólar CCL (Contado con Liquidación) también se opera con bonos o acciones, pero permite transferir los dólares a una cuenta en el exterior. El CCL suele ser más caro por este beneficio de 'fuga' legal de capitales.",
        },
        2: {
          title: "Guía para turistas: dónde cambiar dólares",
          content:
            "Los turistas extranjeros pueden acceder a un tipo de cambio preferencial similar al MEP pagando con tarjetas de crédito o débito extranjeras. Evita las casas de cambio oficiales con tasa baja y prefiere el uso de tarjeta o 'cuevas' de confianza si buscas efectivo, aunque esto último conlleva riesgos de seguridad.",
        },
        3: {
          title: "Consejos para freelancers: cómo cobrar del exterior",
          content:
            "Los freelancers pueden ingresar hasta 12.000 USD anuales sin pesificar a través del régimen de Monotributo Tech. Para montos mayores o fuera de este régimen, se utilizan plataformas cripto (USDT) o cuentas en el exterior, aunque esto requiere asesoramiento contable para evitar problemas con ARCA.",
        },
        4: {
          title: "¿Por qué hay tantos dólares en Argentina?",
          content:
            "Debido a la inestabilidad histórica del Peso Argentino y la inflación crónica, los argentinos utilizan el Dólar como reserva de valor. Existen múltiples tipos de cambio (Oficial, Blue, MEP, Tarjeta) debido a las restricciones (cepo) impuestas por el gobierno para evitar la fuga de reservas del Banco Central.",
        },
        5: {
          title: "¿Qué es la brecha cambiaria y por qué importa?",
          content:
            "La brecha es la diferencia porcentual entre el dólar oficial y los dólares paralelos (Blue, MEP, CCL). Una brecha alta indica desconfianza en la economía y expectativas de devaluación. Importa porque distorsiona precios relativos y fomenta la subfacturación de exportaciones.",
        },
        6: {
          title: "¿Qué dólar toman para Netflix y Spotify?",
          content:
            "Los servicios digitales se cobran al valor del 'Dólar Tarjeta'. Este se compone del Dólar Oficial minorista más impuestos (Impuesto PAIS + Percepción de Ganancias). Suele ser uno de los tipos de cambio más altos.",
        },
        7: {
          title: "¿Se puede comprar dólar MEP sin banco?",
          content:
            "Sí, se puede operar Dólar MEP a través de Agentes de Liquidación y Compensación (ALyC) o brokers online (como IOL, Balanz, Bull Market). Necesitas transferir los pesos desde tu cuenta bancaria al broker, operar los bonos y luego transferir los dólares de vuelta a tu cuenta bancaria.",
        },
      },
    },
    // --- FAQ / DEFINITIONS CONTENT ---
    faq: {
      title: "Tipos de Dólar",
      subtitle: "Definiciones y operatoria de cada tipo de cambio",
      definitions: {
        mep: {
          title: "¿Qué es el Dólar MEP?",
          shortDesc:
            "Se conoce como Dólar MEP o Dólar Bolsa al procedimiento para comprar dólares de forma legal y sin límite a través de la bolsa.",
          details: [
            {
              title: "¿Qué es el Dólar MEP?",
              text: "El Dólar MEP (Mercado Electrónico de Pagos) es una operación bursátil que permite comprar dólares mediante la compra y venta de bonos. Es 100% legal y, a diferencia del dólar ahorro, no tiene cupo de 200 USD mensuales.",
            },
            {
              title: "¿Qué necesito para operar Dólar MEP?",
              text: "Necesitas una cuenta bancaria en pesos y otra en dólares (ambas a tu nombre), y una Cuenta Comitente en un broker o banco para operar bonos.",
            },
            {
              title: "¿Cómo vinculo la cuenta comitente?",
              text: "La vinculación se hace desde la plataforma del broker (CBU). Debes declarar tu CBU en pesos para ingresar fondos y tu CBU en dólares para retirar los dólares resultantes de la operación.",
            },
            {
              title: "¿Con qué bonos puedo hacerlo?",
              text: "Los bonos más utilizados son el GD30 y el AL30. Se compran en pesos (ej. AL30) y, tras un día de parking, se venden en su versión en dólares (ej. AL30D).",
            },
          ],
        },
        blue: {
          title: "¿Qué es el Dólar Blue?",
          shortDesc:
            "El Dólar Blue es el tipo de cambio informal que circula en el mercado paralelo, fuera del sistema bancario oficial.",
          details: [
            {
              title: "Definición",
              text: "Es el dólar físico que se negocia en 'cuevas' o entre particulares. Su precio varía según la oferta y demanda y suele ser la referencia para precios de la economía informal.",
            },
            {
              title: "¿Es legal?",
              text: "Técnicamente es un mercado no regulado. Sin embargo, su cotización es pública y ampliamente difundida por los medios.",
            },
          ],
        },
        oficial: {
          title: "¿Qué es el Dólar Oficial?",
          shortDesc:
            "Es el tipo de cambio regulado por el Banco Central. Sirve de base para importaciones y exportaciones.",
          details: [
            {
              title: "Tipos de Oficial",
              text: "Existe el oficial mayorista (para empresas y comercio exterior) y el minorista (referencia para la gente, aunque difícil de acceder sin impuestos).",
            },
          ],
        },
        cripto: {
          title: "¿Qué es el Dólar Cripto?",
          shortDesc:
            "Se refiere a las stablecoins (monedas estables) atadas al valor del dólar, como USDT, USDC o DAI.",
          details: [
            {
              title: "Ventajas",
              text: "Opera 24/7, no depende de bancos y se puede comprar sin límites. Su cotización suele estar cerca del CCL o Blue.",
            },
          ],
        },
        tarjeta: {
          title: "¿Qué es el Dólar Tarjeta/Turista?",
          shortDesc:
            "Es el valor que pagás cuando usás tu tarjeta de crédito para compras en moneda extranjera.",
          details: [
            {
              title: "Composición",
              text: "Se calcula tomando el Dólar Oficial y sumándole impuestos (Impuesto PAIS + Percepción de Ganancias). Es el dólar más caro generalmente.",
            },
          ],
        },
      },
    },
    footer: {
      description:
        "Tu fuente confiable para cotizaciones del dólar en Argentina",
      rights: "Todos los derechos reservados",
      disclaimer:
        "Las cotizaciones son referenciales y pueden variar según el mercado",
      sections: "Secciones",
      resources: "Recursos",
      legal: "Legal",
      terms: "Términos de Uso",
      privacy: "Política de Privacidad",
    },
    legal: {
      terms: {
        title: "Términos y Condiciones",
        intro:
          "DolarActual es un sitio exclusivamente informativo. No ofrece consejos, recomendaciones, asesoramiento ni invitaciones de ningún tipo para realizar operaciones o actos de cualquier naturaleza.",
        sections: [
          {
            title: "Fuentes de información",
            content: "Provienen de acceso público.",
          },
          {
            title: "Cuadros y datos",
            content:
              "Se elaboran sobre la base de dichas fuentes y constituyen propiedad intelectual protegida por la Ley N°11.723.",
          },
          {
            title: "Responsabilidad",
            content:
              "Los titulares del sitio no garantizan la precisión, veracidad, exactitud, integridad ni vigencia de los datos publicados, y deslindan toda responsabilidad por posibles errores o falta de actualización.",
          },
          {
            title: "Uso de la información",
            content:
              "Quienes accedan al sitio son responsables de las decisiones que adopten basadas en los datos allí presentados. Los titulares no se responsabilizan por eventuales daños o perjuicios patrimoniales derivados de tales decisiones.",
          },
          {
            title: "Publicidad",
            content:
              "Los titulares no mantienen acuerdos, asociaciones ni vínculos con los anunciantes más allá de la locación de espacios publicitarios. El contenido de las piezas publicitarias es responsabilidad exclusiva de cada anunciante, sin garantía alguna por parte del sitio respecto de su precisión o veracidad.",
          },
        ],
      },
      privacy: {
        title: "Política de Privacidad",
        intro:
          "En DolarActual, valoramos su privacidad. Esta política describe cómo manejamos la información cuando utiliza nuestro sitio.",
        sections: [
          {
            title: "Recolección de Datos",
            content:
              "No recolectamos información personal identificable de los usuarios de manera directa. Nuestro sitio es de libre acceso y no requiere registro.",
          },
          {
            title: "Cookies y Tecnologías de Rastreo",
            content:
              "Podemos utilizar cookies o tecnologías similares de terceros (como Google Analytics) para analizar el tráfico y mejorar la experiencia del usuario. Estas herramientas recopilan datos anónimos sobre el comportamiento de navegación.",
          },
          {
            title: "Enlaces a Terceros",
            content:
              "Nuestro sitio contiene enlaces a otros sitios web (fuentes de noticias, brokers, etc.). No somos responsables de las prácticas de privacidad o el contenido de esos sitios externos.",
          },
          // Reutilizamos la sección de publicidad que es relevante también para privacidad
          {
            title: "Publicidad",
            content:
              "Los espacios publicitarios son gestionados de forma independiente. Los anunciantes pueden utilizar sus propias tecnologías para medir la efectividad de sus campañas.",
          },
        ],
      },
    },
  },
  en: {
    common: {
      prev: "Previous",
      next: "Next",
      pageOf: "Page {current} of {total}",
      readMore: "Read more",
      back: "Back",
    },
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
    history: {
      title: "Historical Rates",
      description:
        "Visualize how the price of different dollar rates has varied over the last year. Use the interactive chart to compare trends.",
      noData:
        "There is not enough historical data recorded yet to generate the chart.",
      noDataSub:
        "(The system will start recording data automatically with the daily cron job)",
      chartTitle: "Historical Evolution",
      chartSubtitle: "Exchange rates comparison over time",
      rangeAll: "All",
    },
    quotations: {
      title: "Quotes",
      blue: "Blue Dollar",
      oficial: "Official Dollar",
      mep: "MEP Dollar",
      ccl: "CCL Dollar",
      turista: "Tourist Dollar",
      mayorista: "Wholesale Dollar",
      cripto: "Crypto Dollar",
      euro: "Euro",
      real: "Real",
      chileno: "Chilean Peso",
      uruguayo: "Uruguayan Peso",
      bitcoin: "Bitcoin",
      ethereum: "Ethereum",
      xrp: "XRP",
      bnb: "BNB",
      solana: "Solana",
      usdt: "USDT",
      btc: "Bitcoin",
      eth: "Ethereum",
      sol: "Solana",
      buy: "Buy",
      sell: "Sell",
      variation: "Variation",
      updated: "Latest update",
      sectionDollars: "Dollars",
      sectionFiat: "Other Currencies",
      sectionCryptos: "Cryptocurrencies",
      viewAll: "All quotes",
    },
    converter: {
      title: "Currency Converter",
      description:
        "The ultimate tool to convert between Argentine Pesos, Dollars (Blue, MEP, CCL), Euros, Reals, and major Cryptocurrencies in real-time.",
      from: "From",
      to: "To",
      have: "I have",
      want: "I want",
      amount: "Amount",
      convert: "Convert",
      result: "Result",
      title2: "Reference Rates",
      ars: "Arg Peso",
      usd: "Dollar (USD)",
      selectDollarType: "Select Dollar Rate",
      infoBlueTitle: "Blue Dollar & Financials",
      infoBlueDesc:
        "Instantly updated quotes for operating in Argentina's parallel and financial markets.",
      infoFiatTitle: "Fiat & Regional",
      infoFiatDesc:
        "Calculate exchange rates for trips to Brazil, Chile, Uruguay, or Europe with official rates.",
      infoCryptoTitle: "Crypto Economy",
      infoCryptoDesc:
        "Direct equivalencies between your pesos and Bitcoin, Ethereum, or Stablecoins (USDT).",
    },
    news: {
      title: "News",
      exchangeMarketCurrencies: "Exchange Market & Currencies",
      economy: "Economy",
      finance: "Finance",
      politics: "Politics",
      business: "Business",
      all: "All news",
      sections: "Sections",
      media: "Media",
      market: "Exchange Market",
      readMore: "Read more",
      source: "Source",
      featured: "Featured",
      moreNews: "More News",
      noNewsFound: "No news found matching the filters.",
    },
    // --- BLOG CONTENT (ENGLISH) ---
    blog: {
      title: "Educational Blog",
      subtitle: "Practical tips and quick guides",
      readMore: "Read full article",
      posts: {
        1: {
          title: "Differences between MEP and CCL Dollar",
          content:
            "MEP Dollar (Electronic Payment Market) is traded with bonds within Argentina, and the resulting dollars remain in a local account. CCL Dollar (Cash with Settlement) is also traded with bonds or shares but allows transferring dollars to a foreign account. CCL is usually more expensive due to this legal capital flight benefit.",
        },
        2: {
          title: "Tourist Guide: Where to exchange dollars",
          content:
            "Foreign tourists can access a preferential exchange rate similar to MEP by paying with foreign credit or debit cards. Avoid official exchange houses with low rates and prefer using cards or trusted 'cueva' (exchange houses) if you seek cash, although the latter carries security risks.",
        },
        3: {
          title: "Tips for Freelancers: How to get paid from abroad",
          content:
            "Freelancers can bring in up to 12,000 USD annually without converting to pesos through the Tech Monotributo regime. For larger amounts or outside this regime, crypto platforms (USDT) or foreign accounts are used, although this requires accounting advice to avoid issues with ARCA.",
        },
        4: {
          title: "Why are there so many dollars in Argentina?",
          content:
            "Due to the historical instability of the Argentine Peso and chronic inflation, Argentines use the Dollar as a store of value. There are multiple exchange rates (Official, Blue, MEP, Card) due to government restrictions (stocks) imposed to prevent the flight of Central Bank reserves.",
        },
        5: {
          title: "What is the exchange gap and why does it matter?",
          content:
            "The gap is the percentage difference between the official dollar and parallel dollars (Blue, MEP, CCL). A high gap indicates distrust in the economy and expectations of devaluation. It matters because it distorts relative prices and encourages under-invoicing of exports.",
        },
        6: {
          title: "Which dollar rate applies to Netflix and Spotify?",
          content:
            "Digital services are charged at the 'Card Dollar' rate. This consists of the Official Retail Dollar plus taxes (PAIS Tax + Earnings Withholding). It is usually one of the highest exchange rates.",
        },
        7: {
          title: "Can I buy MEP Dollar without a bank?",
          content:
            "Yes, you can trade MEP Dollar through Settlement and Compensation Agents (ALyC) or online brokers (like IOL, Balanz, Bull Market). You need to transfer pesos from your bank account to the broker, trade the bonds, and then transfer the dollars back to your bank account.",
        },
      },
    },
    // --- FAQ / DEFINITIONS CONTENT (ENGLISH) ---
    faq: {
      title: "Dollar Types",
      subtitle: "Definitions and operations for each exchange rate",
      definitions: {
        mep: {
          title: "What is MEP Dollar?",
          shortDesc:
            "MEP Dollar or Stock Dollar is known as the procedure to buy dollars legally and without limits through the stock market.",
          details: [
            {
              title: "What is MEP Dollar?",
              text: "MEP Dollar (Electronic Payment Market) is a stock market operation that allows buying dollars through buying and selling bonds. It is 100% legal and, unlike the savings dollar, has no monthly 200 USD limit.",
            },
            {
              title: "What do I need to trade MEP Dollar?",
              text: "You need a bank account in pesos and another in dollars (both in your name), and a Custody Account in a broker or bank to trade bonds.",
            },
            {
              title: "How do I link the custody account?",
              text: "Linking is done from the broker's platform (CBU). You must declare your CBU in pesos to deposit funds and your CBU in dollars to withdraw the resulting dollars.",
            },
            {
              title: "Which bonds can I use?",
              text: "The most used bonds are GD30 and AL30. You buy in pesos (e.g., AL30) and, after one day of parking, sell in its dollar version (e.g., AL30D).",
            },
          ],
        },
        blue: {
          title: "What is Blue Dollar?",
          shortDesc:
            "Blue Dollar is the informal exchange rate circulating in the parallel market, outside the official banking system.",
          details: [
            {
              title: "Definition",
              text: "It is the physical dollar traded in 'cuevas' or between individuals. Its price varies by supply and demand and is usually the reference for informal economy prices.",
            },
            {
              title: "Is it legal?",
              text: "Technically, it is an unregulated market. However, its quote is public and widely disseminated by the media.",
            },
          ],
        },
        oficial: {
          title: "What is Official Dollar?",
          shortDesc:
            "It is the exchange rate regulated by the Central Bank. It serves as a basis for imports and exports.",
          details: [
            {
              title: "Types of Official",
              text: "There is the wholesale official (for companies and foreign trade) and retail (reference for people, although difficult to access without taxes).",
            },
          ],
        },
        cripto: {
          title: "What is Crypto Dollar?",
          shortDesc:
            "Refers to stablecoins pegged to the dollar value, such as USDT, USDC, or DAI.",
          details: [
            {
              title: "Advantages",
              text: "Operates 24/7, does not depend on banks, and can be bought without limits. Its quote is usually close to CCL or Blue.",
            },
          ],
        },
        tarjeta: {
          title: "What is Card/Tourist Dollar?",
          shortDesc:
            "It is the value you pay when using your credit card for purchases in foreign currency.",
          details: [
            {
              title: "Composition",
              text: "It is calculated by taking the Official Dollar and adding taxes (PAIS Tax + Earnings Withholding). It is generally the most expensive dollar.",
            },
          ],
        },
      },
    },
    footer: {
      description:
        "Your reliable source for dollar exchange rates in Argentina",
      rights: "All rights reserved",
      disclaimer: "Rates are referential and may vary according to the market",
      sections: "Sections",
      resources: "Resources",
      legal: "Legal",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
    },
    legal: {
      terms: {
        title: "Terms and Conditions",
        intro:
          "DolarActual is an exclusively informational site. It does not offer advice, recommendations, counseling, or invitations of any kind to carry out operations or acts of any nature.",
        sections: [
          {
            title: "Information sources",
            content: "Come from public access.",
          },
          {
            title: "Charts and data",
            content:
              "Are prepared based on said sources and constitute intellectual property protected by Law No. 11,723.",
          },
          {
            title: "Liability",
            content:
              "The site owners do not guarantee the precision, truthfulness, accuracy, integrity, or currency of the published data, and disclaim all liability for possible errors or lack of updates.",
          },
          {
            title: "Use of information",
            content:
              "Those who access the site are responsible for the decisions they make based on the data presented there. The owners are not responsible for any financial damages or losses derived from such decisions.",
          },
          {
            title: "Advertising",
            content:
              "The owners do not maintain agreements, associations, or links with advertisers beyond the leasing of advertising spaces. The content of advertising pieces is the exclusive responsibility of each advertiser, without any guarantee from the site regarding their accuracy or truthfulness.",
          },
        ],
      },
      privacy: {
        title: "Privacy Policy",
        intro:
          "At DolarActual, we value your privacy. This policy describes how we handle information when you use our site.",
        sections: [
          {
            title: "Data Collection",
            content:
              "We do not collect personally identifiable information from users directly. Our site is free to access and does not require registration.",
          },
          {
            title: "Cookies and Tracking Technologies",
            content:
              "We may use cookies or similar third-party technologies (such as Google Analytics) to analyze traffic and improve user experience. These tools collect anonymous data about browsing behavior.",
          },
          {
            title: "Third-Party Links",
            content:
              "Our site contains links to other websites (news sources, brokers, etc.). We are not responsible for the privacy practices or content of those external sites.",
          },
          {
            title: "Advertising",
            content:
              "Advertising spaces are managed independently. Advertisers may use their own technologies to measure the effectiveness of their campaigns.",
          },
        ],
      },
    },
  },
} as const;

// export const translations = {
//   es: {
//     common: {
//       prev: "Anterior",
//       next: "Siguiente",
//       pageOf: "Página {current} de {total}",
//     },
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
//     history: {
//       title: "Historial de Cotizaciones",
//       description: "Visualizá cómo ha variado el precio de las distintas cotizaciones del dólar en el último año. Utilizá el gráfico interactivo para comparar tendencias.",
//       noData: "No hay suficientes datos históricos registrados aún para generar el gráfico.",
//       noDataSub: "(El sistema comenzará a registrar datos automáticamente con el cron job diario)",
//       chartTitle: "Evolución Histórica",
//       chartSubtitle: "Comparativa de cotizaciones en el tiempo",
//       rangeAll: "Todo",
//     },
//     quotations: {
//       title: "Cotizaciones",
//       blue: "Dólar Blue",
//       oficial: "Dólar Oficial",
//       mep: "Dólar MEP",
//       ccl: "Dólar CCL",
//       turista: "Dólar Turista",
//       mayorista: "Dólar Mayorista",
//       cripto: "Dólar Cripto",

//       euro: "Euro",
//       real: "Real",
//       chileno: "Peso Chileno",
//       uruguayo: "Peso Uruguayo",

//       bitcoin: "Bitcoin",
//       ethereum: "Ethereum",
//       xrp: "XRP",
//       bnb: "BNB",
//       solana: "Solana",
//       usdt: "USDT",

//       buy: "Compra",
//       sell: "Venta",
//       variation: "Variación",
//       updated: "Última actualización",

//       sectionDollars: "Dólares",
//       sectionFiat: "Otras Divisas",
//       sectionCryptos: "Criptomonedas",
//       viewAll: "Todas las cotizaciones",
//     },
//     converter: {
//       title: "Conversor de Monedas",
//       description: "La herramienta definitiva para convertir entre Pesos Argentinos, Dólares (Blue, MEP, CCL), Euros, Reales y las principales Criptomonedas en tiempo real.",
//       from: "De",
//       to: "A",
//       have: "Tengo",
//       want: "Quiero",
//       amount: "Monto",
//       convert: "Convertir",
//       result: "Resultado",
//       title2: "Tasas de Referencia",
//       ars: "Peso Arg",
//       usd: "Dólar (USD)",
//       selectDollarType: "Seleccioná la cotización del Dólar",

//       // Info Cards
//       infoBlueTitle: "Dólar Blue y Financieros",
//       infoBlueDesc: "Cotizaciones actualizadas al instante para operar en el mercado paralelo y financiero de Argentina.",
//       infoFiatTitle: "Fiat y Regionales",
//       infoFiatDesc: "Calculá cambios para viajes a Brasil, Chile, Uruguay o Europa con las tasas oficiales.",
//       infoCryptoTitle: "Cripto Economía",
//       infoCryptoDesc: "Equivalencias directas entre tus pesos y Bitcoin, Ethereum o Stablecoins (USDT)."
//     },
//     news: {
//       title: "Noticias",
//       exchangeMarketCurrencies: "Mercado Cambiario & Divisas",
//       economy: "Economía",
//       finance: "Finanzas",
//       politics: "Política",
//       business: "Negocios",
//       all: "Todas las noticias",
//       sections: "Secciones",
//       media: "Medios",
//       market: "Mercado Cambiario",
//       readMore: "Leer más",
//       source: "Fuente",
//       featured: "Destacado",
//       moreNews: "Más Noticias",
//       noNewsFound: "No hay noticias que coincidan con los filtros.",
//     },
//     blog: {
//       title: "Blog Educativo",
//       readMore: "Leer artículo completo",
//     },
//     faq: {
//       title: "Preguntas Frecuentes",
//     },
//     footer: {
//       description: "Tu fuente confiable para cotizaciones del dólar en Argentina",
//       rights: "Todos los derechos reservados",
//       disclaimer: "Las cotizaciones son referenciales y pueden variar según el mercado",
//     },
//   },
//   en: {
//     common: {
//       prev: "Previous",
//       next: "Next",
//       pageOf: "Page {current} of {total}",
//     },
//     nav: {
//       home: "Home",
//       quotations: "Quotes",
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
//     history: {
//       title: "Historical Rates",
//       description: "Visualize how the price of different dollar rates has varied over the last year. Use the interactive chart to compare trends.",
//       noData: "There is not enough historical data recorded yet to generate the chart.",
//       noDataSub: "(The system will start recording data automatically with the daily cron job)",
//       chartTitle: "Historical Evolution",
//       chartSubtitle: "Exchange rates comparison over time",
//       rangeAll: "All",
//     },
//     quotations: {
//       title: "Quotes",
//       blue: "Blue Dollar",
//       oficial: "Official Dollar",
//       mep: "MEP Dollar",
//       ccl: "CCL Dollar",
//       turista: "Tourist Dollar",
//       mayorista: "Wholesale Dollar",
//       cripto: "Crypto Dollar",

//       euro: "Euro",
//       real: "Real",
//       chileno: "Chilean Peso",
//       uruguayo: "Uruguayan Peso",

//       bitcoin: "Bitcoin",
//       ethereum: "Ethereum",
//       xrp: "XRP",
//       bnb: "BNB",
//       solana: "Solana",
//       usdt: "USDT",

//       buy: "Buy",
//       sell: "Sell",
//       variation: "Variation",
//       updated: "Latest update",

//       sectionDollars: "Dollars",
//       sectionFiat: "Other Currencies",
//       sectionCryptos: "Cryptocurrencies",
//       viewAll: "All quotes",
//     },
//     converter: {
//       title: "Currency Converter",
//       description: "The ultimate tool to convert between Argentine Pesos, Dollars (Blue, MEP, CCL), Euros, Reals, and major Cryptocurrencies in real-time.",
//       from: "From",
//       to: "To",
//       have: "I have",
//       want: "I want",
//       amount: "Amount",
//       convert: "Convert",
//       result: "Result",
//       title2: "Reference Rates",
//       ars: "Arg Peso",
//       usd: "Dollar (USD)",
//       selectDollarType: "Select Dollar Rate",

//       // Info Cards
//       infoBlueTitle: "Blue Dollar & Financials",
//       infoBlueDesc: "Instantly updated quotes for operating in Argentina's parallel and financial markets.",
//       infoFiatTitle: "Fiat & Regional",
//       infoFiatDesc: "Calculate exchange rates for trips to Brazil, Chile, Uruguay, or Europe with official rates.",
//       infoCryptoTitle: "Crypto Economy",
//       infoCryptoDesc: "Direct equivalencies between your pesos and Bitcoin, Ethereum, or Stablecoins (USDT)."
//     },
//     news: {
//       title: "News",
//       exchangeMarketCurrencies: "Exchange Market & Currencies",
//       economy: "Economy",
//       finance: "Finance",
//       politics: "Politics",
//       business: "Business",
//       all: "All news",
//       sections: "Sections",
//       media: "Media",
//       market: "Exchange Market",
//       readMore: "Read more",
//       source: "Source",
//       featured: "Featured",
//       moreNews: "More News",
//       noNewsFound: "No news found matching the filters.",
//     },
//     blog: {
//       title: "Educational Blog",
//       readMore: "Read full article",
//     },
//     faq: {
//       title: "Frequently Asked Questions",
//     },
//     footer: {
//       description: "Your reliable source for dollar exchange rates in Argentina",
//       rights: "All rights reserved",
//       disclaimer: "Rates are referential and may vary according to the market",
//     },
//   },
// } as const;
