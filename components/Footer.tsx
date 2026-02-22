"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-9">
          {/* Columna 1: Branding */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                aria-label="Ir al inicio - Dólar Actual"
              >
                <Image
                  src="/logo.svg" // <-- CAMBIO PRINCIPAL: Apuntamos al archivo SVG
                  alt="Dólar Actual Logo"
                  width={160} // Ajusta el ancho base según las proporciones de tu SVG
                  height={45} // Ajusta el alto base
                  priority // Muy importante para el SEO: fuerza la carga inmediata del logo
                  className="w-auto h-8 md:h-10" // Tamaños responsive con Tailwind
                  // Nota: Si tu SVG es oscuro y tienes modo noche, puedes añadir 'dark:invert' para que se vuelva blanco
                />
              </Link>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            {/* Redes sociales */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <Link
                href="https://x.com/dolaractual2026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted-foreground hover:text-accent transition-colors text-lg"
              >
                <i className="bi bi-twitter-x" />
              </Link>

              <Link
                href="https://www.instagram.com/dolaractual.2026/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-accent transition-colors text-lg"
              >
                <i className="bi bi-instagram" />
              </Link>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.sections")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/cotizaciones"
                  className="hover:text-brand-600 transition-colors"
                >
                  {t("nav.quotations")}
                </Link>
              </li>
              <li>
                <Link
                  href="/noticias"
                  className="hover:text-brand-600 transition-colors"
                >
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/historial"
                  className="hover:text-brand-600 transition-colors"
                >
                  {" "}
                  {t("nav.history")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.resources")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/conversor"
                  className="hover:text-brand-600 transition-colors"
                >
                  {t("nav.converter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-brand-600 transition-colors"
                >
                  {t("nav.faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-brand-600 transition-colors"
                >
                  {t("nav.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacidad"
                  className="hover:text-brand-600 transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="hover:text-brand-600 transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Dolaractual.com.ar - {t("footer.rights")}.
          </p>
          {/* <p className="mt-2 text-xs opacity-70">{t("footer.disclaimer")}</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
