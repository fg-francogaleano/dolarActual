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

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const pathname = usePathname();
  
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
          { label: t("quotations.oficial"), path: "/cotizaciones/dolar-oficial" },
          { label: t("quotations.mep"), path: "/cotizaciones/dolar-mep" },
          { label: t("quotations.ccl"), path: "/cotizaciones/dolar-ccl" },
          { label: t("quotations.turista"), path: "/cotizaciones/dolar-turista" },
          { label: t("quotations.mayorista"), path: "/cotizaciones/dolar-mayorista" },
          { label: t("quotations.cripto"), path: "/cotizaciones/dolar-cripto" },
        ]
      },
      {
        title: t("quotations.sectionFiat"),
        items: [
          { label: t("quotations.euro"), path: "/cotizaciones/euro" },
          { label: t("quotations.real"), path: "/cotizaciones/real" },
          { label: t("quotations.uruguayo"), path: "/cotizaciones/peso-uruguayo" },
          { label: t("quotations.chileno"), path: "/cotizaciones/peso-chileno" },
        ]
      },
      {
        title: t("quotations.sectionCryptos"),
        items: [
          { label: t("quotations.bitcoin"), path: "/cotizaciones/bitcoin" },
          { label: t("quotations.ethereum"), path: "/cotizaciones/ethereum" },
          { label: t("quotations.xrp"), path: "/cotizaciones/xrp" },
          { label: t("quotations.bnb"), path: "/cotizaciones/bnb" },
          { label: t("quotations.solana"), path: "/cotizaciones/solana" },
          { label: t("quotations.usdt"), path: "/cotizaciones/usdt" },
        ]
      }
    ]
  };

  // 2. Rutas de Noticias Actualizadas (/noticias/categoria)
  const newsMenu = [
    { label: t("news.economy"), path: "/noticias/economia" },
    { label: t("news.finance"), path: "/noticias/finanzas" },
    { label: t("news.politics"), path: "/noticias/politica" },
    { label: t("news.business"), path: "/noticias/negocios" },
    { label: t("news.all"), path: "/noticias" },
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
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
      isActive 
        ? "text-[#1976D2] dark:bg-[#1976D2] dark:text-white" 
        : "text-[#212529] dark:text-[#E2E8F0] hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  const getMobileLinkClasses = (isActive: boolean) =>
    `block px-3 py-3 text-base font-medium border-b dark:border-gray-800 transition-colors ${
      isActive
        ? "bg-blue-50 text-[#1976D2] dark:bg-blue-900/20 dark:text-[#4299E1]"
        : "text-gray-800 dark:text-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background transition-colors duration-300 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
            <img 
              src="/logo1.png" 
              alt="DolarActual Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className={getDesktopLinkClasses(isSimpleActive("/"))}>
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
                className={`absolute left-0 top-full mt-1 w-[600px] bg-card border dark:border-gray-700 rounded-lg shadow-xl z-50 grid grid-cols-3 gap-4 p-5 transition-all duration-200 ${
                  isQuotesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                {quotesMenu.sections.map((section) => (
                  <div key={section.title}>
                    <h4 className="font-bold text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide border-b pb-1 dark:border-gray-700">
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
                                ? "text-[#1976D2] bg-blue-50 dark:text-[#4299E1] dark:bg-blue-900/20 font-medium"
                                : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-300"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-3 mt-2 pt-2 border-t dark:border-gray-700 text-center">
                   <Link 
                     href="/cotizaciones" 
                     onClick={() => setIsQuotesOpen(false)}
                     className="text-sm font-bold text-blue-600 hover:underline"
                   >
                     {t("quotations.viewAll")} →
                   </Link>
                </div>
              </div>
            </div>

            <Link href="/historial" className={getDesktopLinkClasses(isSimpleActive("/historial"))}>
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
                className={`absolute left-0 top-full mt-1 w-48 bg-white dark:bg-[#1A202C] border dark:border-gray-700 rounded-lg shadow-xl z-50 py-2 transition-all duration-200 ${
                  isNewsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b dark:border-gray-700 mb-1">
                  {t("news.sections")}
                </div>
                {newsMenu.map((item) => (
                  <Link 
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsNewsOpen(false)}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === item.path 
                        ? "text-[#1976D2] bg-blue-50 dark:text-[#4299E1] dark:bg-blue-900/20 font-medium"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-1 pt-2 border-t dark:border-gray-700 text-center">
                   <Link 
                     href="/noticias" 
                     onClick={() => setIsNewsOpen(false)}
                     className="block px-4 py-2 text-xs font-bold text-blue-600 hover:underline"
                   >
                     {t("news.all")} →
                   </Link>
                </div>
              </div>
            </div>

            <Link href="/conversor" className={getDesktopLinkClasses(isSimpleActive("/conversor"))}>
              {t("nav.converter")}
            </Link>

            <Link href="/blog" className={getDesktopLinkClasses(isSimpleActive("/blog"))}>
              {t("nav.blog")}
            </Link>
            <Link href="/faq" className={getDesktopLinkClasses(isSimpleActive("/faq"))}>
              {t("nav.faq")}
            </Link>
          </nav>

          {/* --- ACTIONS --- */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("es")}>Español</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* --- MOBILE NAVIGATION --- */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t dark:border-[#2D3748] h-[calc(100vh-64px)] overflow-y-auto">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClasses(isSimpleActive("/"))}>
              {t("nav.home")}
            </Link>

            {/* ACORDEÓN COTIZACIONES (Móvil) */}
            <div className="border-b dark:border-gray-800">
              <button 
                onClick={() => toggleSubmenu("cotizaciones")}
                className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium transition-colors ${
                   isQuotesActive() ? "text-[#1976D2] dark:text-[#4299E1]" : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {t("nav.quotations")}
                <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenu === "cotizaciones" ? "rotate-180" : ""}`} />
              </button>
              
              {openSubmenu === "cotizaciones" && (
                <div className="bg-gray-50 dark:bg-gray-900/50 pb-2">
                  {quotesMenu.sections.map((section) => (
                    <div key={section.title} className="px-4 py-2">
                      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{section.title}</h5>
                      <div className="space-y-1 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                        {section.items.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-1.5 text-sm rounded-md ${
                              pathname === item.path
                                ? "text-[#1976D2] font-bold"
                                : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
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
                    className="block px-4 py-3 text-sm font-bold text-blue-600 text-center bg-blue-50 dark:bg-blue-900/20 mt-2"
                  >
                    {t("quotations.viewAll")}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/historial" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClasses(isSimpleActive("/historial"))}>
              {t("nav.history")}
            </Link>

            {/* ACORDEÓN NOTICIAS (Móvil) */}
            <div className="border-b dark:border-gray-800">
              <button 
                onClick={() => toggleSubmenu("noticias")}
                className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium transition-colors ${
                  isNewsActive() ? "text-[#1976D2] dark:text-[#4299E1]" : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {t("nav.news")}
                <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenu === "noticias" ? "rotate-180" : ""}`} />
              </button>
              
              {openSubmenu === "noticias" && (
                <div className="bg-gray-50 dark:bg-gray-900/50 pb-2">
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {t("news.sections")}
                  </div>
                  <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 ml-4 space-y-1">
                    {newsMenu.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-sm rounded-md ${
                          pathname === item.path
                            ? "text-[#1976D2] font-bold"
                            : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/conversor" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClasses(isSimpleActive("/conversor"))}>
              {t("nav.converter")}
            </Link>
            
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClasses(isSimpleActive("/blog"))}>
              {t("nav.blog")}
            </Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className={getMobileLinkClasses(isSimpleActive("/faq"))}>
              {t("nav.faq")}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;