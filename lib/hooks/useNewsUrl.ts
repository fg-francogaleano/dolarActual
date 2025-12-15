"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useNewsUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Crear una nueva Query String basada en la actual
  const createQueryString = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else if (value !== undefined) {
          params.set(key, value);
        }
      });
      
      return params.toString();
    },
    [searchParams]
  );

  // Función para togglear un filtro booleano (ej: ?clarin)
  const toggleFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedKey = key.toLowerCase();
    
    if (params.has(normalizedKey)) {
      params.delete(normalizedKey);
    } else {
      params.set(normalizedKey, ""); // Setea como flag sin valor
    }
    
    // Resetear página al filtrar
    params.set("page", "1");
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setPage = (page: number) => {
    router.push(`${pathname}?${createQueryString({ page: page.toString() })}`);
  };

  const isActive = (key: string) => {
    return searchParams.has(key.toLowerCase());
  };

  return {
    setPage,
    toggleFilter,
    isActive,
    currentPage: Number(searchParams.get("page")) || 1,
    searchParams
  };
}