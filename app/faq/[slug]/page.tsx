"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { mockDollarTypes } from "@/mock";
import { useLanguage } from "@/contexts/LanguageContext";

// Definición de tipos para el contenido detallado
interface DetailSection {
  title: string;
  text: string;
}

export default function FAQDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useLanguage();
  const [slug, setSlug] = useState<string | null>(null);

  // Desempaquetar params (Next.js 15 async params)
  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) return null; // Loading state

  const item = mockDollarTypes.find((d) => d.slug === slug);

  if (!item) {
    notFound();
  }

  // Obtenemos el contenido traducido. 
  // t() devuelve 'any', así que casteamos a la estructura esperada
  const title = t(`faq.definitions.${item.id}.title`);
  const desc = t(`faq.definitions.${item.id}.shortDesc`);
  
  // Recuperamos el array de detalles
  // En translations.ts definimos details como un array de objetos
  const rawDetails = t(`faq.definitions.${item.id}.details`);
  
  // Verificación de seguridad por si t() devuelve la clave string
  const details: DetailSection[] = Array.isArray(rawDetails) ? rawDetails : [];

  return (
    <div className="min-h-screen py-10 bg-white dark:bg-[#1A202C]">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* <Link href="/faq" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1976D2] mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t("common.back")}
        </Link> */}

        <article className="prose dark:prose-invert lg:prose-xl">
          <h1 className="text-2xl md:text-3xl font-medium text-text-strong pl-2 mb-6 border-l-4 border-primary">
            {title}
          </h1>
          
          <div className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed pl-4">
            {desc}
          </div>

          <div className="space-y-10">
            {details.map((seccion, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-medium text-text-strong mb-3">
                  {seccion.title}
                </h2>
                <p className="text-text max-w-2xl mx-auto px-3 leading-relaxed">
                  {seccion.text}
                </p>
              </div>
            ))}
          </div>
        </article>

      </div>
    </div>
  );
}