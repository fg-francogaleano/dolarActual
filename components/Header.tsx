"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Moon, Sun, Globe, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const pathname = usePathname();
  console.log(language)

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const [isQuotesOpen, setIsQuotesOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  // 1. Rutas de Cotizaciones Actualizadas (/cotizaciones/slug)
  const quotesMenu = {
    label: t("nav.quotations"),
    mainPath: "/cotizaciones",
    sections: [
      {
        title: t("quotations.sectionDollars"),
        items: [
          { label: t("quotations.blue"), path: "/cotizaciones/dolar-blue" },
          {
            label: t("quotations.oficial"),
            path: "/cotizaciones/dolar-oficial",
          },
          { label: t("quotations.mep"), path: "/cotizaciones/dolar-mep" },
          { label: t("quotations.ccl"), path: "/cotizaciones/dolar-ccl" },
          {
            label: t("quotations.turista"),
            path: "/cotizaciones/dolar-turista",
          },
          {
            label: t("quotations.mayorista"),
            path: "/cotizaciones/dolar-mayorista",
          },
          { label: t("quotations.cripto"), path: "/cotizaciones/dolar-cripto" },
        ],
      },
      {
        title: t("quotations.sectionFiat"),
        items: [
          { label: t("quotations.euro"), path: "/cotizaciones/euro" },
          { label: t("quotations.real"), path: "/cotizaciones/real" },
          {
            label: t("quotations.uruguayo"),
            path: "/cotizaciones/peso-uruguayo",
          },
          {
            label: t("quotations.chileno"),
            path: "/cotizaciones/peso-chileno",
          },
        ],
      },
      {
        title: t("quotations.sectionCryptos"),
        items: [
          { label: t("quotations.btc"), path: "/cotizaciones/bitcoin" },
          { label: t("quotations.eth"), path: "/cotizaciones/ethereum" },
          { label: t("quotations.xrp"), path: "/cotizaciones/xrp" },
          { label: t("quotations.bnb"), path: "/cotizaciones/bnb" },
          { label: t("quotations.sol"), path: "/cotizaciones/solana" },
          { label: t("quotations.usdt"), path: "/cotizaciones/usdt" },
        ],
      },
    ],
  };

  // 2. Rutas de Noticias Actualizadas (/noticias/categoria)
  const newsMenu = [
    { label: t("news.economy"), path: "/noticias/economia" },
    { label: t("news.finance"), path: "/noticias/finanzas" },
    { label: t("news.politics"), path: "/noticias/politica" },
    { label: t("news.business"), path: "/noticias/negocios" },
  ];

  const isSimpleActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isQuotesActive = () => {
    // Activo si estamos en /cotizaciones (root) o en cualquier subruta
    return pathname.startsWith("/cotizaciones");
  };

  const isNewsActive = () => {
    // Activo si estamos en /noticias (root) o en cualquier subruta
    return pathname.startsWith("/noticias");
  };

  const getDesktopLinkClasses = (isActive: boolean) =>
    `flex items-center px-3 py-2 rounded-md font-medium transition-colors cursor-pointer hover:text-accent ${
      isActive ? "text-primary" : "text-foreground"
    }`;

  const getMobileLinkClasses = (isActive: boolean) =>
    `block px-3 py-3 text-base font-semibold border-b border-border transition-colors ${
      isActive ? "text-primary" : "text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background transition-colors duration-300 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          aria-label="Ir al inicio - Dólar Actual"
        >
          <Image
            src="/logo1.svg" // <-- CAMBIO PRINCIPAL: Apuntamos al archivo SVG
            alt="Dólar Actual Logo"
            width={320} // Ajusta el ancho base según las proporciones de tu SVG
            height={90} // Ajusta el alto base
            priority // Muy importante para el SEO: fuerza la carga inmediata del logo
            // className="w-auto h-8 md:h-10" // Tamaños responsive con Tailwind
            // Nota: Si tu SVG es oscuro y tienes modo noche, puedes añadir 'dark:invert' para que se vuelva blanco
          />
        </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={getDesktopLinkClasses(isSimpleActive("/"))}
            >
              {t("nav.home")}
            </Link>

            {/* DROPDOWN COTIZACIONES */}
            <div
              className="relative"
              onMouseEnter={() => setIsQuotesOpen(true)}
              onMouseLeave={() => setIsQuotesOpen(false)}
            >
              <button
                className={getDesktopLinkClasses(isQuotesActive())}
                onClick={() => setIsQuotesOpen(!isQuotesOpen)}
              >
                {t("nav.quotations")} <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div
                className={`absolute left-0 top-full mt-1 w-[600px] bg-card border border-border rounded-lg shadow-xl z-50 grid grid-cols-3 gap-4 p-5 transition-all duration-200 ${
                  isQuotesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {quotesMenu.sections.map((section) => (
                  <div key={section.title}>
                    <h4 className="font-medium text-xs text-text-strong mb-2 uppercase tracking-wide border-b pb-2">
                      {section.title}
                    </h4>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            onClick={() => setIsQuotesOpen(false)}
                            className={`block px-2 py-1.5 text-sm rounded-md transition-colors ${
                              pathname === item.path
                                ? "text-primary font-medium"
                                : "text-foreground hover:text-accent"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-3 mt-2 pt-2 border-t border-border text-center">
                  <Link
                    href="/cotizaciones"
                    onClick={() => setIsQuotesOpen(false)}
                    className="text-sm font-medium text-primary hover:text-accent"
                  >
                    {t("quotations.viewAll")}
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/historial"
              className={getDesktopLinkClasses(isSimpleActive("/historial"))}
            >
              {t("nav.history")}
            </Link>

            {/* DROPDOWN NOTICIAS */}
            <div
              className="relative"
              onMouseEnter={() => setIsNewsOpen(true)}
              onMouseLeave={() => setIsNewsOpen(false)}
            >
              <button
                className={getDesktopLinkClasses(isNewsActive())}
                onClick={() => setIsNewsOpen(!isNewsOpen)}
              >
                {t("nav.news")} <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div
                className={`absolute left-0 top-full mt-1 w-48 bg-card p-4 rounded-lg shadow-xl z-50 py-2 transition-all duration-200 ${
                  isNewsOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="pb-2 text-xs font-medium text-foreground uppercase tracking-wider border-b mt-3">
                  {t("news.sections")}
                </div>
                {newsMenu.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsNewsOpen(false)}
                    className={`block px-2 py-2 text-sm transition-colors ${
                      pathname === item.path
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-1 mx-2 border-t border-red text-center">
                  <Link
                    href="/noticias"
                    onClick={() => setIsNewsOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent"
                  >
                    {t("news.all")}
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/conversor"
              className={getDesktopLinkClasses(isSimpleActive("/conversor"))}
            >
              {t("nav.converter")}
            </Link>

            <Link
              href="/blog"
              className={getDesktopLinkClasses(isSimpleActive("/blog"))}
            >
              {t("nav.blog")}
            </Link>

            <Link
              href="/faq"
              className={getDesktopLinkClasses(isSimpleActive("/faq"))}
            >
              {t("nav.faq")}
            </Link>
          </nav>

          {/* --- ACTIONS --- */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {language === "es" ?
                (                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  English
                </DropdownMenuItem>) :( <DropdownMenuItem onClick={() => changeLanguage("es")}>
                  Español
                </DropdownMenuItem>) }
               
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5 cu" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              className="lg:hidden cursor-default"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* --- MOBILE NAVIGATION --- */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-muted-foreground h-[calc(100vh-64px)] overflow-y-auto">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/"))}
            >
              {t("nav.home")}
            </Link>

            {/* ACORDEÓN COTIZACIONES */}
            <div className="border-b">
              <button
                onClick={() => toggleSubmenu("cotizaciones")}
                className={`w-full flex items-center justify-between px-3 py-3 text-base font-semibold transition-colors ${
                  isQuotesActive()
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {t("nav.quotations")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openSubmenu === "cotizaciones" ? "rotate-180" : ""}`}
                />
              </button>

              {openSubmenu === "cotizaciones" && (
                <div className="pb-2">
                  {quotesMenu.sections.map((section) => (
                    <div key={section.title} className="px-5 py-2">
                      <h5 className="font-medium text-foreground mb-2">
                        {section.title}
                      </h5>
                      <div className="space-y-1 border-b pb-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-2 py-1.5 text-sm rounded-md ${
                              pathname === item.path
                                ? "text-primary font-medium"
                                : "text-foreground  hover:text-accent"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/cotizaciones"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-primary text-center md:mt-2 "
                  >
                    {t("quotations.viewAll")}
                  </Link>
                </div>
              )}
            </div>
            {/* HISTORIAL */}
            <Link
              href="/historial"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/historial"))}
            >
              {t("nav.history")}
            </Link>

            {/* ACORDEÓN NOTICIAS */}
            <div className="border-b">
              <button
                onClick={() => toggleSubmenu("noticias")}
                className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium transition-colors ${
                  isNewsActive() ? "text-primary" : "text-foreground"
                }`}
              >
                {t("nav.news")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openSubmenu === "noticias" ? "rotate-180" : ""}`}
                />
              </button>

              {openSubmenu === "noticias" && (
                <>
                  <div className="pb-2">
                    <div className="px-5 py-2 font-medium text-foreground">
                      {t("news.sections")}
                    </div>
                    <div className="pl-2 space-y-1">
                      {newsMenu.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-5 py-2 text-sm rounded-md ${
                            pathname === item.path
                              ? "text-primary"
                              : "text-foreground hover:text-accent"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/noticias"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-primary text-center md:mt-2 "
                  >
                    {t("news.all")}
                  </Link>
                </>
              )}
            </div>
            {/* CONVERSOR */}
            <Link
              href="/conversor"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/conversor"))}
            >
              {t("nav.converter")}
            </Link>
            {/* BLOG */}
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/blog"))}
            >
              {t("nav.blog")}
            </Link>
            {/* FAQ */}
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/faq"))}
            >
              {t("nav.faq")}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
