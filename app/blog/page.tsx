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
    <div className="min-h-screen py-10 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        <div className="mb-12 text-center">
          <h1 className="text-2xl md:text-3xl font-medium text-primary mb-4">
            {t("blog.title")}
          </h1>

          <p className="text-text max-w-2xl mx-auto px-3 leading-relaxed">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border mb-8 shadow-sm">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {mockBlogPosts.map((post) => (
                  <AccordionItem key={post.id} value={`item-${post.id}`}>
                    <AccordionTrigger className="text-left hover:no-underline px-4 rounded-md transition-colors cursor-pointer">
                      <span className="text-lg text-text-strong">
                        {t(`blog.posts.${post.id}.title`)}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pt-2 pb-4">
                      <p className="text-text leading-relaxed text-base">
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