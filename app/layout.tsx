import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. Configuración de Fuentes Optimizadas
// Next.js descargará estas fuentes y las servirá desde el mismo dominio (Self-hosted)
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat", // Variable CSS para Tailwind
  weight: ["300", "400", "500", "600", "700", "800"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  weight: ["400", "500", "700"],
});

// 2. Metadatos Base (SEO)
export const metadata: Metadata = {
  title: {
    template: '%s | DolarActual', // Template dinámico para títulos
    default: 'DolarActual - Cotizaciones del Dólar en Vivo',
  },
  description: "Cotizaciones del dólar oficial, blue, MEP y cripto en Argentina en tiempo real. Noticias financieras y conversores de moneda.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'suppressHydrationWarning' es necesario para el ThemeProvider
    <html lang="es" suppressHydrationWarning className={`${montserrat.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            {/* Header siempre visible */}
            <Header />
            
            {/* Contenido principal flexible */}
            <main className="flex-1 w-full">
              {children}
            </main>
            
            {/* Footer siempre al final */}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
