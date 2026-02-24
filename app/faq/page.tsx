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
    <div className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4">
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-medium text-primary mb-4 h-13">
            {t("faq.title")}
          </h1>

          <p className="text-text leading-relaxed text-base">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          {mockDollarTypes.map((item) => (
            <Card key={item.id} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-text-strong">
                  {t(`faq.definitions.${item.id}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text leading-relaxed mb-6 opacity-80">
                  {/* Descripción corta desde traducciones */}
                  {t(`faq.definitions.${item.id}.shortDesc`)}
                </p>
                
                <Link href={`/faq/${item.slug}`} >
                  <Button variant="secondary" className="w-full sm:w-auto cursor-pointer rounded-full shadow-sm hover:shadow-md">
                    {t("common.readMore")}
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