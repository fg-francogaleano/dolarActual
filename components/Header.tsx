"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Moon, Sun, Globe, Menu, X } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

interface NavItem {
  path: string;
  label: string;
}

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { path: "/", label: t("nav.home") },
    { path: "/cotizaciones", label: t("nav.quotations") },
    { path: "/historial", label: t("nav.history") },
    { path: "/conversor", label: t("nav.converter") },
    { path: "/noticias", label: t("nav.news") },
    { path: "/blog", label: t("nav.blog") },
    { path: "/faq", label: t("nav.faq") },
    // { path: "/contacto", label: t("nav.contact") },
  ];

  const isActive = (path: string): boolean => pathname === path;

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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-[#1976D2] text-white dark:bg-[#4299E1]"
                    : "text-[#212529] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Cambiar idioma</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => changeLanguage("es")}
                  className={
                    language === "es"
                      ? "bg-[#F9FAFB] dark:bg-[#2D3748]"
                      : undefined
                  }
                >
                  Español
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                  className={
                    language === "en"
                      ? "bg-[#F9FAFB] dark:bg-[#2D3748]"
                      : undefined
                  }
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748] transition-colors"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Cambiar tema</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menú</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t dark:border-[#2D3748]">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-[#1976D2] text-white dark:bg-[#4299E1]"
                    : "text-[#212529] dark:text-[#E2E8F0] hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
