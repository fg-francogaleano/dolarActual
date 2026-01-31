"use client";

import { FC } from "react";
import Link from "next/link";
import { ArrowRight, Book } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockDollarTypes } from "@/mock";

const FAQ: FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-4">
            <Book className="inline mr-3 h-10 w-10" />
            {t("faq.title")}hols
          </h1>

          <p className="text-lg text-[#212529] dark:text-[#E2E8F0] opacity-90 max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          {mockDollarTypes.map((item) => (
            <Card key={item.id} className="border-[#F9FAFB] dark:border-[#2D3748] hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-[#0D47A1] dark:text-[#B0C4DE]">
                  {/* Título desde traducciones: faq.definitions.mep.title */}
                  {t(`faq.definitions.${item.id}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#212529] dark:text-[#E2E8F0] leading-relaxed mb-6 opacity-80">
                  {/* Descripción corta desde traducciones */}
                  {t(`faq.definitions.${item.id}.shortDesc`)}
                </p>
                
                <Link href={`/faq/${item.slug}`}>
                  <Button variant="outline" className="w-full sm:w-auto border-[#1976D2] text-[#1976D2] hover:bg-[#1976D2] hover:text-white dark:border-[#B0C4DE] dark:text-[#B0C4DE] dark:hover:bg-[#B0C4DE] dark:hover:text-[#1A202C]">
                    {t("common.readMore")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;