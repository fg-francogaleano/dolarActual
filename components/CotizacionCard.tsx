"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatDateShort } from "@/utils/formatters";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CotizacionCardProps {
  cotizacion: {
    id: string;
    destacado: boolean; // Nota: 'destacado' viene de los datos, pero 'destacada' prop controla el diseño visual
    compra: number;
    venta: number;
    variacion: number;
    fechaActualizacion: string;
    nombre?: string; // Opcional, para casos donde ya viene el nombre traducido o raw
  };
  destacada?: boolean; // Prop de control visual: true = Hero Style, false = Grid Style
}

export default function CotizacionCard({
  cotizacion,
  destacada = false,
}: CotizacionCardProps) {
  const { t, language } = useLanguage();

  const { id, compra, venta, variacion, fechaActualizacion, nombre } =
    cotizacion;

  const isPositive = variacion > 0;
  const isNegative = variacion < 0;
  // const isNeutral = variacion === 0; // Usado implícitamente

  // Helper para obtener el nombre (si viene en el objeto o traducir por ID)
  // Esto mantiene la lógica que tenías en QuoteDetailContent
  const displayName = nombre || t(`quotations.${id}`).toLocaleUpperCase();

  // Helper para traducir la etiqueta de categoría (usado solo en versión destacada por ahora o si se requiere)
  // En este diseño simplificado asumimos que el "chip" de categoría se maneja externamente o no es crítico dentro de la card pequeña.
  // Pero si quisieras mostrarlo, podrías agregarlo aquí.

  // --- RENDERIZADO DESTACADO (HERO STYLE) ---
  if (destacada) {
    return (
      <Card className="h-full bg-card rounded-xl overflow-hidden flex flex-col justify-between shadow-md">
        <CardHeader className="pb-0 px-8">
          <div className="flex md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              {/* TITULO COTIZACION */}
              <CardTitle className="text-2xl sm:text-3xl font-medium text-primary">
                {displayName.toLocaleUpperCase()}
              </CardTitle>
            </div>

            {/* VARIACION */}
            <div
              className={`flex items-center px-4 py-2 rounded-lg ${
                isPositive
                  ? "text-success"
                  : isNegative
                    ? "text-danger"
                    : "text-muted-foreground"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-6 h-6 mr-1" />
              ) : isNegative ? (
                <TrendingDown className="w-6 h-6 mr-1" />
              ) : (
                <Minus className="w-6 h-6 mr-1" />
              )}
              <span className="text-xl md:text-2xl">
                {Math.abs(variacion).toFixed(2)}%
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 gap-1 mt-1">
            {/* COMPRA */}
            {compra !== undefined && compra > 0 && (
              <div className="flex flex-col p-6">
                <span className="text-lg text-muted-foreground mb-1">
                  {t("quotations.buy")}
                </span>
                <span className="sm:text-5xl text-4xl text-foreground font-medium tracking-tight">
                  $
                  {compra.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}

            {/* VENTA */}
            <div className="flex flex-col p-6">
              <span className="text-lg text-muted-foreground mb-1">
                {t("quotations.sell")}
              </span>
              <span className="sm:text-5xl text-4xl font-medium text-foreground tracking-tight">
                $
                {venta.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Fecha */}
            {/* ACTUALIZACION */}
            <p className="text-muted-foreground text-sm flex">
              {/* Renderizado condicional para Mobile/Desktop usando clases CSS */}
              {<Clock className="w-4 h-4 self-center" />}
              <span className="hidden md:inline ml-2">
                {formatDateShort(fechaActualizacion, false, language)}
              </span>
              <span className="md:hidden ml-2">
                {formatDateShort(fechaActualizacion, true, language)}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- RENDERIZADO ESTÁNDAR ---
  return (
    <Card className="h-full bg-card p-5 rounded-lg border hover:border-accent transition-all duration-400 flex flex-col justify-between group shadow-md">
      <CardHeader className="p-0 mb-3 space-y-0">
        <div className="flex justify-between items-start">
          {/* TITULO COTIZACION */}
          <CardTitle className="font-medium text-lg text-primary group-hover:text-accent transition-colors">
            {displayName}
          </CardTitle>

          {/* VARIACION */}
          {variacion !== undefined && (
            <span
              className={`text-xs font-bold px-2 py-1 rounded flex items-center ${
                isPositive
                  ? "text-success"
                  : isNegative
                    ? "text-danger"
                    : "text-muted-foreground"
              }`}
            >
              {isPositive ? "+" : ""}
              {variacion.toFixed(2)}%
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex justify-between items-baseline mt-auto">
          <div className="text-sm text-muted-foreground">
            {t("quotations.sell")}
          </div>
          <div className="text-2xl font-medium text-foreground">
            $
            {venta.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// "use client";

// import { TrendingUp, TrendingDown } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import {
//   formatNumber,
//   formatVariation,
// } from "../utils/formatters"; // Quitamos formatDateShort de aquí
// import { formatDateShort } from "../utils/formatters"; // Importamos la versión inteligente
// import { useLanguage } from "../contexts/LanguageContext";

// export interface CotizacionCardProps {
//   cotizacion: {
//     id: string;
//     destacado: boolean;
//     compra: number;
//     venta: number;
//     variacion: number;
//     fechaActualizacion: string;
//   };
//   destacada?: boolean;
// }

// export default function CotizacionCard({
//   cotizacion,
//   destacada = false,
// }: CotizacionCardProps) {
//   // 1. Obtenemos 'language' del contexto (es/en)
//   const { t, language } = useLanguage();

//   const { id, compra, venta, variacion, destacado, fechaActualizacion } =
//     cotizacion;

//   const isPositive = variacion >= 0;

//   return (
//     <>
//       {/* --- VERSION DESKTOP --- */}
//       <Card className="h-full justify-center hidden sm:flex">
//         <div>

//           <CardHeader className="pb-3">
//             <CardTitle
//               className={`${
//                 destacado ? "text-3xl" : "text-lg"
//               } text-primary`}
//             >
//               {t(`quotations.${id}`).toLocaleUpperCase()}
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             {/* COMPRA - VENTA */}
//             <div className={`grid gap-4 mb-4 ${compra ? "grid-cols-2": "grid-cols-1"}  `}>
//               {/* COMPRA */}
//               <div
//                 className={`${
//                   destacado ? "flex items-center justify-center" : ""

//                 } ${compra ? "block" : "hidden"} `}
//               >
//                 <span>
//                   <p
//                     className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
//                   >
//                     {t("quotations.buy")}
//                   </p>
//                   <p
//                     className={`${
//                       destacado ? "text-3xl" : "text-xl"
//                     } font-bold text-[#212529] dark:text-[#E2E8F0] font-mono`}
//                   >
//                     {compra > 0 ? `$${formatNumber(compra)}` : "-"}
//                   </p>
//                 </span>
//               </div>

//               {/* VENTA */}
//               <div
//                 className={`${
//                   destacado ? "flex items-center justify-center" : ""
//                 } `}
//               >
//                 <span>
//                   <p
//                     className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
//                   >
//                     {t("quotations.sell")}
//                   </p>
//                   <p
//                     className={`${
//                       destacado ? "text-3xl" : "text-xl"
//                     } font-bold text-[#212529] dark:text-[#E2E8F0] font-mono`}
//                   >
//                     ${formatNumber(venta)}
//                   </p>
//                 </span>
//               </div>
//             </div>

//             {/* VARIACION */}
//             <div
//               className={`flex items-center pt-3 border-t dark:border-[#2D3748] ${
//                 destacado ? "gap-3" : "justify-between"
//               }`}
//             >
//               <span
//                 className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75"
//               >
//                 {t("quotations.variation")}
//               </span>

//               <div
//                 className={`flex items-center space-x-1 font-semibold ${
//                   isPositive
//                     ? "text-green-600 dark:text-green-400"
//                     : "text-red-600 dark:text-red-400"
//                 }`}
//               >
//                 {isPositive ? (
//                   <TrendingUp className="h-4 w-4" />
//                 ) : (
//                   <TrendingDown className="h-4 w-4" />
//                 )}
//                 <span className="font-mono">
//                   {formatVariation(variacion)}
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </div>

//         {/* ULTIMA ACTUALIZACION (Solo Desktop y Destacados por diseño original) */}
//         <div className={`${destacado ? "block" : "hidden"} mt-2`}>
//           <p
//             className="text-sm text-[#212529] dark:text-[#E2E8F0] opacity-75 text-center"
//           >
//             {/* 2. Usamos la función inteligente con 'isMobile=false' y el idioma actual */}
//             {formatDateShort(fechaActualizacion, false, language)}
//           </p>
//         </div>
//       </Card>

//       {/* --- VERSION MOVIL --- */}
//       <Card className="block sm:hidden">
//         <CardHeader className="pb-3 flex flex-row items-center justify-between">
//           <CardTitle
//             className={`${
//               destacada ? "text-xl" : "text-lg"
//             } text-[#0D47A1] dark:text-[#B0C4DE]`}
//           >
//             {t(`quotations.${id}`).toLocaleUpperCase()}
//           </CardTitle>

//           {/* Agregamos fecha "Recién" / "Hace 5m" en móvil arriba a la derecha */}
//           {destacado && (
//              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-normal">
//                {formatDateShort(fechaActualizacion, true, language)}
//              </span>
//           )}
//         </CardHeader>

//         <CardContent>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <p
//                 className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
//               >
//                 {t("quotations.buy")}
//               </p>
//               <p
//                 className={`${
//                   destacada ? "text-2xl" : "text-xl"
//                 } font-bold text-[#212529] dark:text-[#E2E8F0] font-mono`}
//               >
//                 {compra > 0 ? `$${formatNumber(compra)}` : "-"}
//               </p>
//             </div>

//             <div>
//               <p
//                 className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
//               >
//                 {t("quotations.sell")}
//               </p>
//               <p
//                 className={`${
//                   destacada ? "text-2xl" : "text-xl"
//                 } font-bold text-[#212529] dark:text-[#E2E8F0] font-mono`}
//               >
//                 ${formatNumber(venta)}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-3 border-t dark:border-[#2D3748]">
//             <span
//               className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75"
//             >
//               {t("quotations.variation")}
//             </span>

//             <div
//               className={`flex items-center space-x-1 font-semibold ${
//                 isPositive
//                   ? "text-green-600 dark:text-green-400"
//                   : "text-red-600 dark:text-red-400"
//               }`}
//             >
//               {isPositive ? (
//                 <TrendingUp className="h-4 w-4" />
//               ) : (
//                 <TrendingDown className="h-4 w-4" />
//               )}
//               <span >
//                 {formatVariation(variacion)}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }
