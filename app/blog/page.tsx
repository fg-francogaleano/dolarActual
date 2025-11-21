"use client";

import { FC } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockBlogPosts } from "@/mock";

interface BlogPost {
  id: number;
  categoria: string;
  fecha: string;
  titulo: string;
  contenido: string;
  slug: string;
}

const Blog: FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 bg-white dark:bg-[#1A202C] transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0D47A1] dark:text-[#B0C4DE] mb-4">
            <BookOpen className="inline mr-3 h-10 w-10" />
            {t("blog.title")}
          </h1>

          <p className="text-lg text-[#212529] dark:text-[#E2E8F0] opacity-90">
            Guías, consejos y recursos para entender el mercado cambiario
          </p>
        </div>

        {/* Posts */}
        <div className="max-w-4xl mx-auto space-y-6">
          {mockBlogPosts.map((post: BlogPost) => (
            <Card
              key={post.id}
              className="border-[#F9FAFB] dark:border-[#2D3748] transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-[#1976D2] text-white dark:bg-[#4299E1]">
                    {post.categoria}
                  </Badge>

                  <div className="flex items-center space-x-2 text-sm text-[#212529] dark:text-[#E2E8F0] opacity-75">
                    <Calendar className="h-4 w-4" />
                    <span>{post.fecha}</span>
                  </div>
                </div>

                <CardTitle className="text-2xl text-[#0D47A1] dark:text-[#B0C4DE]">
                  {post.titulo}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-[#212529] dark:text-[#E2E8F0] mb-6">
                  {post.contenido}
                </p>

                <Link href={`/blog/${post.slug}`}>
                  <Button
                    variant="ghost"
                    className="text-[#1976D2] dark:text-[#4299E1] hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
                  >
                    {t("blog.readMore")}
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

export default Blog;
