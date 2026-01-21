import React from "react";
import { UnifiedQuote } from "@/lib/quote-utils";
import QuoteDetailContent from "./QuoteDetailContent";

interface QuoteDetailProps {
  featured: UnifiedQuote;
  related: UnifiedQuote[];
}

export default function QuoteDetail({ featured, related }: QuoteDetailProps) {
  // Al ser un Server Component, simplemente pasamos los datos al Client Component
  return <QuoteDetailContent featured={featured} related={related} />;
}