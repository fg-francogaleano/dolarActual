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

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  // 1. Configuración del Menú de Cotizaciones
  const quotesMenu = {
    label: "Cotizaciones",
    mainPath: "/cotizaciones",
    sections: [
      {
        title: "Dólares",
        items: [
          { label: "Blue", path: "/blue" },
          { label: "Oficial", path: "/oficial" },
          { label: "MEP", path: "/mep" },
          { label: "CCL", path: "/ccl" },
          { label: "Turista", path: "/turista" },
          { label: "Mayorista", path: "/mayorista" },
          { label: "Cripto (Dólar)", path: "/dolar-cripto" },
        ],
      },
      {
        title: "Otras Divisas",
        items: [
          { label: "Euro", path: "/euro" },
          { label: "Real", path: "/real" },
          { label: "Peso Uruguayo", path: "/peso-uruguayo" },
          { label: "Peso Chileno", path: "/peso-chileno" },
        ],
      },
      {
        title: "Criptomonedas",
        items: [
          { label: "Bitcoin", path: "/bitcoin" },
          { label: "Ethereum", path: "/ethereum" },
          { label: "XRP", path: "/xrp" },
          { label: "BNB", path: "/bnb" },
          { label: "Solana", path: "/solana" },
          { label: "USDT", path: "/usdt" },
        ],
      },
    ],
  };

  // 2. Configuración del Menú de Noticias
  const newsMenu = [
    { label: "Economía", path: "/economia" },
    { label: "Finanzas", path: "/finanzas" },
    { label: "Política", path: "/politica" },
    { label: "Negocios", path: "/negocios" },
    { label: "Todas las noticias", path: "/todas" },
  ];

  // --- LÓGICA DE ESTADO ACTIVO ---

  // Verifica rutas simples (Home, Blog, FAQ, etc)
  const isSimpleActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  // Verifica si estamos en alguna ruta de Cotizaciones
  const isQuotesActive = () => {
    if (pathname === "/cotizaciones") return true;
    // Busca si la ruta actual coincide con alguno de los items del menú de cotizaciones
    return quotesMenu.sections.some((section) =>
      section.items.some((item) => pathname === item.path)
    );
  };

  // Verifica si estamos en alguna ruta de Noticias
  const isNewsActive = () => {
    return newsMenu.some((item) => pathname === item.path);
  };

  // Generador de clases CSS para Desktop
  const getDesktopLinkClasses = (isActive: boolean) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "text-[#1976D2] dark:bg-[#1976D2] dark:text-white"
        : "text-[#212529] dark:text-[#E2E8F0] hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  // Generador de clases CSS para Mobile
  const getMobileLinkClasses = (isActive: boolean) =>
    `block px-3 py-3 text-base font-medium border-b dark:border-gray-800 transition-colors ${
      isActive
        ? "bg-blue-50 text-[#1976D2] dark:bg-blue-900/20 dark:text-[#4299E1]"
        : "text-gray-800 dark:text-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur dark:bg-[#1A202C]/95 dark:border-[#2D3748] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <div
              className="font-bold text-2xl text-[#0D47A1] dark:text-[#B0C4DE]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Dolaractual.com
            </div>
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
            <div className="relative group">
              <button className={getDesktopLinkClasses(isQuotesActive())}>
                {t("nav.quotations")} <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {/* Mega Menu Cotizaciones */}
              <div className="absolute left-0 top-full mt-1 w-[600px] bg-white dark:bg-[#1A202C] border dark:border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-3 gap-4 p-5 z-50">
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
                    className="text-sm font-bold text-blue-600 hover:underline"
                  >
                    Ver todas las cotizaciones →
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
            <div className="relative group">
              <button className={getDesktopLinkClasses(isNewsActive())}>
                {t("nav.news")} <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div className="cursor-pointer absolute left-0 top-full mt-1 w-48 bg-white dark:bg-[#1A202C] border dark:border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b dark:border-gray-700 mb-1">
                  Secciones
                </div>
                {newsMenu.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === item.path
                        ? "text-[#1976D2] bg-blue-50 dark:text-[#4299E1] dark:bg-blue-900/20 font-medium"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
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
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("es")}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="cursor-pointer">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
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
          <nav className="lg:hidden py-4 border-t dark:border-[#2D3748] h-[calc(100vh-64px)] overflow-y-auto">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/"))}
            >
              {t("nav.home")}
            </Link>

            {/* ACORDEÓN COTIZACIONES (Móvil) */}
            <div className="border-b dark:border-gray-800">
              <button
                onClick={() => toggleSubmenu("cotizaciones")}
                className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium transition-colors ${
                  isQuotesActive()
                    ? "text-[#1976D2] dark:text-[#4299E1]"
                    : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {t("nav.quotations")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openSubmenu === "cotizaciones" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSubmenu === "cotizaciones" && (
                <div className="bg-gray-50 dark:bg-gray-900/50 pb-2">
                  {quotesMenu.sections.map((section) => (
                    <div key={section.title} className="px-4 py-2">
                      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {section.title}
                      </h5>
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
                    Ver todas las cotizaciones
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/historial"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/historial"))}
            >
              {t("nav.history")}
            </Link>

            {/* ACORDEÓN NOTICIAS (Móvil) */}
            <div className="border-b dark:border-gray-800">
              <button
                onClick={() => toggleSubmenu("noticias")}
                className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium transition-colors ${
                  isNewsActive()
                    ? "text-[#1976D2] dark:text-[#4299E1]"
                    : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {t("nav.news")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openSubmenu === "noticias" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSubmenu === "noticias" && (
                <div className="bg-gray-50 dark:bg-gray-900/50 pb-2">
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Secciones
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

            <Link
              href="/conversor"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/conversor"))}
            >
              {t("nav.converter")}
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={getMobileLinkClasses(isSimpleActive("/blog"))}
            >
              {t("nav.blog")}
            </Link>

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

// VERSION MAS ANTIGUA
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// import { Moon, Sun, Globe, Menu, X } from "lucide-react";

// import { useTheme } from "@/contexts/ThemeContext";
// import { useLanguage } from "@/contexts/LanguageContext";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem
// } from "@/components/ui/dropdown-menu";

// interface NavItem {
//   path: string;
//   label: string;
// }

// const Header: React.FC = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { language, changeLanguage, t } = useLanguage();

//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

//   const navItems: NavItem[] = [
//     { path: "/", label: t("nav.home") },
//     { path: "/cotizaciones", label: t("nav.quotations") },
//     { path: "/historial", label: t("nav.history") },
//     { path: "/conversor", label: t("nav.converter") },
//     { path: "/noticias", label: t("nav.news") },
//     { path: "/blog", label: t("nav.blog") },
//     { path: "/faq", label: t("nav.faq") },
//     // { path: "/contacto", label: t("nav.contact") },
//   ];

//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur dark:bg-[#1A202C]/95 dark:border-[#2D3748] transition-colors duration-300">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center space-x-2 transition-opacity hover:opacity-80"
//           >
//             <div
//               className="font-bold text-2xl text-[#0D47A1] dark:text-[#B0C4DE]"
//               style={{ fontFamily: "Montserrat, sans-serif" }}
//             >
//               Dolaractual.com
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive(item.path)
//                     ? "bg-[#1976D2] text-white dark:bg-[#4299E1]"
//                     : "text-[#212529] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
//                 }`}
//                 style={{ fontFamily: "Montserrat, sans-serif" }}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center space-x-2">
//             {/* Language Selector */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
//                 >
//                   <Globe className="h-5 w-5" />
//                   <span className="sr-only">Cambiar idioma</span>
//                 </Button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem
//                   onClick={() => changeLanguage("es")}
//                   className={
//                     language === "es"
//                       ? "bg-[#F9FAFB] dark:bg-[#2D3748]"
//                       : undefined
//                   }
//                 >
//                   Español
//                 </DropdownMenuItem>

//                 <DropdownMenuItem
//                   onClick={() => changeLanguage("en")}
//                   className={
//                     language === "en"
//                       ? "bg-[#F9FAFB] dark:bg-[#2D3748]"
//                       : undefined
//                   }
//                 >
//                   English
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleTheme}
//               className="hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748] transition-colors"
//             >
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )}
//               <span className="sr-only">Cambiar tema</span>
//             </Button>

//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//               <span className="sr-only">Menú</span>
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <nav className="lg:hidden py-4 border-t dark:border-[#2D3748]">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                   isActive(item.path)
//                     ? "bg-[#1976D2] text-white dark:bg-[#4299E1]"
//                     : "text-[#212529] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
//                 }`}
//                 style={{ fontFamily: "Montserrat, sans-serif" }}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
