"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { ArrowLeft, Shield, FileText } from "lucide-react";

interface LegalContentProps {
  type: "terms" | "privacy";
}

export default function LegalContent({ type }: LegalContentProps) {
  const { t } = useLanguage();

  // Accedemos a la sección correcta de las traducciones
  // Forzamos el tipado 'any' temporalmente para acceder a las propiedades anidadas
  // ya que la estructura en translations.ts es compleja para inferencia directa aquí.
  const legalData = type === "terms" 
    ? (t("legal.terms") as any) 
    : (t("legal.privacy") as any);

  // Si por alguna razón la traducción falla o devuelve el key string,
  // mostramos un fallback o evitamos crash.
  const title = typeof legalData === "string" ? "Legal Information" : legalData.title;
  const intro = typeof legalData === "string" ? "" : legalData.intro;
  const sections = typeof legalData === "string" ? [] : legalData.sections || [];

  const Icon = type === "terms" ? FileText : Shield;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-3xl">

        <article className="">
          <header className="mb-10 text-center">
            <h1 className="text-2xl md:text-3xl font-medium text-primary mb-4">
              {title}
            </h1>
            <p className="text-lg text-text leading-relaxed">
              {intro}
            </p>
          </header>

          <div className="space-y-8">
            {sections.map((section: any, index: number) => (
              <section key={index} className="pl-6">
                <h2 className="text-xl font-medium text-text-strong mb-3">
                  {section.title}
                </h2>
                <p className="text-text leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </article>

      </div>
    </div>
  );
}