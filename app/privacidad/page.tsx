import { Metadata } from "next";
import LegalContent from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo manejamos la información y datos en DolarActual.",
  robots: {
    index: false,
    follow: true,
  }
};

export default function PrivacyPage() {
  return <LegalContent type="privacy" />;
}