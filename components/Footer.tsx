"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

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
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-4">{t("footer.sections")}</h3>
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
            <h3 className="font-semibold text-foreground mb-4">{t("footer.resources")}</h3>
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
            <h3 className="font-semibold text-foreground mb-4">{t("footer.legal")}</h3>
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

// "use client";

// import React from "react";
// import Link from "next/link";
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageContext";

// const Footer: React.FC = () => {
//   const { t } = useLanguage();
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-[#F9FAFB] dark:bg-[#2D3748] border-t dark:border-[#1A202C] mt-16 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* About */}
//           <div>
//             <h3
//               className="font-bold text-lg mb-4 text-[#0D47A1] dark:text-[#B0C4DE]"
//             >
//               Dolaractual.com
//             </h3>
//             <p
//               className="text-sm text-[#212529] dark:text-[#E2E8F0] mb-4"
//             >
//               {t("footer.description")}
//             </p>

//             <div className="flex space-x-3">
//               <a
//                 href="#"
//                 className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//               >
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//               >
//                 <Twitter className="h-5 w-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//               >
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//               >
//                 <Linkedin className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3
//               className="font-bold text-lg mb-4 text-[#0D47A1] dark:text-[#B0C4DE]"
//             >
//               Enlaces Rápidos
//             </h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/cotizaciones"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   {t("nav.quotations")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/conversor"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   {t("nav.converter")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/noticias"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   {t("nav.news")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/blog"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   {t("nav.blog")}
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h3
//               className="font-bold text-lg mb-4 text-[#0D47A1] dark:text-[#B0C4DE]"
//             >
//               Recursos
//             </h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/faq"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   {t("nav.faq")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/historial"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   {t("nav.history")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contacto"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   {t("nav.contact")}
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h3
//               className="font-bold text-lg mb-4 text-[#0D47A1] dark:text-[#B0C4DE]"
//             >
//               Legal
//             </h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   Términos de Uso
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   Privacidad
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#212529] dark:text-[#E2E8F0] hover:text-[#1976D2] dark:hover:text-[#4299E1] transition-colors"
//                 >
//                   Cookies
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="mt-8 pt-8 border-t dark:border-[#1A202C]">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p
//               className="text-sm text-[#212529] dark:text-[#E2E8F0]"
//             >
//               © {currentYear} Dolaractual.com. {t("footer.rights")}
//             </p>

//             <p
//               className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75"
//             >
//               {t("footer.disclaimer")}
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
