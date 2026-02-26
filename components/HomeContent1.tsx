"use client";

import React, { useState, useEffect } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { formatNumber, formatDateShort } from "@/utils/formatters";
import { useLanguage } from "@/contexts/LanguageContext";

interface CotizacionCardProps {
  cotizacion: {
    id: string;
    nombre: string;
    compra: number;
    venta: number;
    variacion: number;
    fechaActualizacion: Date | string;
    destacado?: boolean;
  };
  destacada?: boolean;
}

export default function CotizacionCard({
  cotizacion,
  destacada = false,
}: CotizacionCardProps) {
  const { t } = useLanguage();
  
  // 1. Estado para hidratación segura
  const [isMounted, setIsMounted] = useState(false);
  // 2. Estado de "latido" para forzar el recálculo del tiempo
  const [, setTick] = useState(0);

  useEffect(() => {
    setIsMounted(true); // Confirma que estamos en el cliente
    
    // Configura un intervalo que fuerza un re-render del componente cada 30 segundos.
    // Esto asegura que la función formatTimeAgo() se evalúe de nuevo, 
    // resolviendo el problema de las pestañas inactivas.
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  const isPositive = cotizacion.variacion > 0;
  const isNegative = cotizacion.variacion < 0;
  const isNeutral = cotizacion.variacion === 0;

  const bgClasses = destacada
    ? "bg-brand-600 text-white shadow-xl shadow-brand-500/20"
    : "bg-card text-card-foreground shadow-sm border border-border";

  const textMuted = destacada ? "text-brand-100" : "text-muted-foreground";
  const textValue = destacada ? "text-white" : "text-foreground";
  const divider = destacada ? "bg-brand-500/50" : "bg-border";

  const getVariacionColor = () => {
    if (destacada) return "text-white";
    if (isPositive) return "text-emerald-500 dark:text-emerald-400";
    if (isNegative) return "text-rose-500 dark:text-rose-400";
    return "text-muted-foreground";
  };

  const getVariacionBg = () => {
    if (destacada) return "bg-white/20";
    if (isPositive) return "bg-emerald-100 dark:bg-emerald-500/10";
    if (isNegative) return "bg-rose-100 dark:bg-rose-500/10";
    return "bg-secondary";
  };

  // Cálculo de la fecha en tiempo real (seguro contra Hydration)
  const fechaRelativa = isMounted 
    ? formatDateShort(cotizacion.fechaActualizacion) 
    : t("actualizando"); // Muestra esto en el milisegundo de SSR para evitar saltos de UI

  return (
    <div
      className={`rounded-2xl p-5 md:p-6 transition-all duration-300 h-full flex flex-col ${bgClasses}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3
            className={`font-bold ${destacada ? "text-xl" : "text-lg"} mb-1`}
          >
            {cotizacion.nombre}
          </h3>
          <p className={`text-xs font-medium uppercase tracking-wider ${textMuted}`}>
            {fechaRelativa}
          </p>
        </div>
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-semibold ${getVariacionBg()} ${getVariacionColor()}`}
        >
          {isPositive && <TrendingUp className="w-4 h-4" />}
          {isNegative && <TrendingDown className="w-4 h-4" />}
          {isNeutral && <Minus className="w-4 h-4" />}
          <span>
            {isPositive ? "+" : ""}
            {cotizacion.variacion.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 relative">
        <div className="flex-1">
          <p className={`text-xs uppercase tracking-wider mb-1 ${textMuted}`}>
            {t("quotes.buy")}
          </p>
          <p className={`text-2xl font-bold ${textValue}`}>
            ${formatNumber(cotizacion.compra)}
          </p>
        </div>

        <div className={`w-px h-12 mx-4 ${divider}`} />

        <div className="flex-1 text-right">
          <p className={`text-xs uppercase tracking-wider mb-1 ${textMuted}`}>
            {t("quotes.sell")}
          </p>
          <p className={`text-2xl font-bold ${textValue}`}>
            ${formatNumber(cotizacion.venta)}
          </p>
        </div>
      </div>
    </div>
  );
}