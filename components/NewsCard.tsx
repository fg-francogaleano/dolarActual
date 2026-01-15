"use client";

import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatDateShort } from "../utils/formatters";
import { useLanguage } from "../contexts/LanguageContext";

interface NewsCardProps {
  noticias: {
  titulo: string;
  descripcion: string;
  fuente: string;
  fecha: string;
  categoria: string;
  url: string;
  imagen?: string;
  }
  destacada?: boolean;
}

export default function NewsCard({ noticias, destacada = false }: NewsCardProps) {
  const { t } = useLanguage();
const { titulo, descripcion, fuente, fecha, categoria, url, imagen } = noticias;
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${
        destacada ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {imagen && (
        <div className={`overflow-hidden ${destacada ? "h-64" : "h-48"}`}>
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-[#1976D2] text-white dark:bg-[#4299E1]">
            {categoria}
          </Badge>
          <span
            className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75"
          >
            {fuente}
          </span>
        </div>

        <CardTitle
          className={`${destacada ? "text-2xl" : "text-lg"} text-[#0D47A1] dark:text-[#B0C4DE] line-clamp-2`}
        >
          {titulo}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p
          className={`text-[#212529] dark:text-[#E2E8F0] mb-4 ${
            destacada ? "line-clamp-4" : "line-clamp-2"
          }`}
        >
          {descripcion}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75">
            <Clock className="h-3 w-3" />
            <span>
              {formatDateShort(fecha)}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-[#1976D2] dark:text-[#4299E1] hover:bg-[#F9FAFB] dark:hover:bg-[#2D3748]"
            onClick={() => window.open(url, "_blank")}
          >
            {t("news.readMore")}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
