// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Providers
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Global components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "DolarActual.com",
  description: "Cotizaciones del dólar en Argentina en tiempo real",
    icons: {
    icon: "/Logo-favicom",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#1A202C] transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <Header />

            <main className="grow">{children}</main>

            <Footer />

            {/* <Toaster /> */}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
