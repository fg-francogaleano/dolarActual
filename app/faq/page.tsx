"use client";

import { FC } from "react";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockFAQs } from "@/mock";

interface FAQItem {
  pregunta: string;
  respuesta: string;
}

const FAQ: FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 bg-white dark:bg-[#1A202C]">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-4">
            <HelpCircle className="inline mr-3 h-10 w-10" />
            {t("faq.title")}
          </h1>

          <p className="text-lg text-[#212529] dark:text-[#E2E8F0] opacity-90">
            Respuestas a las preguntas más frecuentes sobre cotizaciones del dólar
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-[#F9FAFB] dark:border-[#2D3748] mb-8">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible>
                {mockFAQs.map((faq: FAQItem, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <span className="text-lg font-semibold text-[#0D47A1] dark:text-[#B0C4DE]">
                        {faq.pregunta}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent>
                      <p className="text-[#212529] dark:text-[#E2E8F0] leading-relaxed">
                        {faq.respuesta}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
