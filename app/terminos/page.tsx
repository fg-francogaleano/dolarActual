import { Metadata } from "next";
import LegalContent from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Información legal sobre el uso del sitio DolarActual y exención de responsabilidad.",
  robots: {
    index: false, // Generalmente estas páginas no se indexan para evitar contenido duplicado o baja relevancia, pero se puede cambiar a true.
    follow: true,
  }
};

export default function TermsPage() {
  return <LegalContent type="terms" />;
}