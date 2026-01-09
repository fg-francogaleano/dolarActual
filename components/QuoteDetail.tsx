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

// import React from "react";
// import { UnifiedQuote } from "@/lib/quote-utils";
// import {
//   ArrowUp,
//   ArrowDown,
//   Minus,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react";
// import Link from "next/link";
// // import { useLanguage } from "@/contexts/LanguageContext";


// interface QuoteDetailProps {
//   featured: UnifiedQuote;
//   related: UnifiedQuote[];
// }

// export default function QuoteDetail({ featured, related }: QuoteDetailProps) {
//   const isPositive = (featured.variacion || 0) > 0;
//   const isNegative = (featured.variacion || 0) < 0;

//     // const { language, changeLanguage, t } = useLanguage();


//   return (
//     <div className="container mx-auto px-4 py-8 max-w-5xl">
//       {/* 1. CARD DESTACADA (Hero Section) */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <div>
//             <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full mb-2">
//               {featured.category === "dolar"
//                 ? "Cotización Dólar"
//                 : featured.category === "crypto"
//                 ? "Criptomercado"
//                 : "Moneda Extranjera"}
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
//               {featured.nombre}
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 text-sm">
//               Actualizado:{" "}
//               {new Date(featured.fechaActualizacion).toLocaleString()}
//             </p>
//           </div>

//           <div
//             className={`flex items-center px-4 py-2 rounded-lg ${
//               isPositive
//                 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//                 : isNegative
//                 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
//                 : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
//             }`}
//           >
//             {isPositive ? (
//               <TrendingUp className="w-6 h-6 mr-1" />
//             ) : isNegative ? (
//               <TrendingDown className="w-6 h-6 mr-1" />
//             ) : (
//               <Minus className="w-6 h-6 mr-1" />
//             )}
//             <span className="text-2xl font-bold">
//               {featured.variacion?.toFixed(2)}%
//             </span>
//             {/* <span className="ml-2 text-xs opacity-75">vs ayer</span> */}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//           {/* Precio Compra (Si existe) */}
//           {featured.compra !== undefined && featured.compra > 0 && (
//             <div className="flex flex-col p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
//               <span className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-1">
// compra              </span>
//               <span className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
//                 $
//                 {featured.compra.toLocaleString("es-AR", {
//                   minimumFractionDigits: 2,
//                 })}
//               </span>
//             </div>
//           )}

//           {/* Precio Venta (Principal) */}
//           <div className="flex flex-col p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
//             <span className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-1">
//               Venta
//             </span>
//             <span className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
//               $
//               {featured.venta.toLocaleString("es-AR", {
//                 minimumFractionDigits: 2,
//               })}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* 2. SECCIÓN RELACIONADA */}
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-blue-500">
//         Otras cotizaciones de{" "}
//         {featured.category === "crypto"
//           ? "Criptomonedas"
//           : featured.category === "fiat"
//           ? "Divisas"
//           : "Dólar"}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {related.map((item) => (
//           <Link href={`/${item.slug}`} key={item.id} className="group">
//             <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
//                   {item.nombre}
//                 </h3>
//                 {item.variacion !== undefined && (
//                   <span
//                     className={`text-xs font-bold px-2 py-1 rounded ${
//                       item.variacion > 0
//                         ? "text-green-600 bg-green-100 dark:bg-green-900/30"
//                         : item.variacion < 0
//                         ? "text-red-600 bg-red-100 dark:bg-red-900/30"
//                         : "text-gray-500 bg-gray-100"
//                     }`}
//                   >
//                     {item.variacion > 0 ? "+" : ""}
//                     {item.variacion.toFixed(2)}%
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-between items-baseline">
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   Venta
//                 </div>
//                 <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                   $
//                   {item.venta.toLocaleString("es-AR", {
//                     minimumFractionDigits: 2,
//                   })}
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
