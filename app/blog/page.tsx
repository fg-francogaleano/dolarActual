"use client";

import { FC } from "react";
import { BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockBlogPosts } from "@/mock";

const Blog: FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 bg-white dark:bg-[#1A202C] transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-4">
            <BookOpen className="inline mr-3 h-10 w-10" />
            {t("blog.title")}
          </h1>

          <p className="text-lg text-[#212529] dark:text-[#E2E8F0] opacity-90">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-[#F9FAFB] dark:border-[#2D3748] mb-8 shadow-sm">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {mockBlogPosts.map((post) => (
                  <AccordionItem key={post.id} value={`item-${post.id}`}>
                    <AccordionTrigger className="text-left hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800/50 px-4 rounded-md transition-colors">
                      <span className="text-lg font-semibold text-[#0D47A1] dark:text-[#B0C4DE]">
                        {/* Título del blog desde traducciones: blog.posts.1.title */}
                        {t(`blog.posts.${post.id}.title`)}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pt-2 pb-4">
                      <p className="text-[#212529] dark:text-[#E2E8F0] leading-relaxed text-base">
                        {/* Contenido del blog desde traducciones */}
                        {t(`blog.posts.${post.id}.content`)}
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
}

export default Blog;