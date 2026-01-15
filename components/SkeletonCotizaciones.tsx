import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonCotizaciones() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Card Principal (Blue) - Altura fija para evitar CLS */}
      <div className="h-full min-h-[200px]">
        <Card className="h-full border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              {/* Título */}
              <div className="h-6 w-32 bg-secondary/50 rounded animate-pulse" />
              {/* Badge */}
              <div className="h-5 w-16 bg-secondary/50 rounded animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <div className="h-3 w-12 bg-secondary/50 rounded animate-pulse" />
                <div className="h-8 w-24 bg-secondary/50 rounded animate-pulse" />
              </div>
              <div className="flex flex-col text-right gap-2 items-end">
                <div className="h-3 w-12 bg-secondary/50 rounded animate-pulse" />
                <div className="h-8 w-24 bg-secondary/50 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-3 w-full bg-secondary/30 rounded animate-pulse mt-4" />
          </CardContent>
        </Card>
      </div>

      {/* Cards Secundarias Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-full border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="h-5 w-24 bg-secondary/50 rounded animate-pulse" />
                <div className="h-4 w-12 bg-secondary/50 rounded animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mt-2">
                <div className="h-4 w-10 bg-secondary/30 rounded animate-pulse" />
                <div className="h-7 w-20 bg-secondary/50 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


// import { Card, CardContent, CardHeader } from "@/components/ui/card";

// export function SkeletonCotizaciones() {
//   return (
//     <section className="py-16 container mx-auto">
//       {/* Header Skeleton */}
//                         {/* <div className="flex items-center justify-between mb-10">
//                             <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
//                             <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
//                         </div> */}

//       <div className="sm:block">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          
//           {/* COLUMNA IZQUIERDA (Dólar Blue - Grande) */}
//           <div className="h-full">
//             <SkeletonCard className="h-full min-h-[406px]" />
//           </div>

//           {/* SOLO MÓVIL (Oficial) */}
//           <div className="lg:col-span-2 block md:hidden">
//             <SkeletonCard />
//           </div>

//           {/* GRID DERECHA (4 Tarjetas pequeñas) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <SkeletonCard /> {/* MEP */}
//             <SkeletonCard /> {/* CCL */}
//             <SkeletonCard /> {/* Cripto */}
//             <SkeletonCard /> {/* Turista */}
//           </div>

//           {/* SOLO DESKTOP (Oficial - Abajo a la derecha) */}
//           <div className="lg:col-span-2 hidden md:block min-h-[259px]">
//             <SkeletonCard />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Subcomponente reutilizable para la tarjeta individual
// function SkeletonCard({ className = "" }: { className?: string }) {
//   return (
//     <Card className={`border-[#F9FAFB] dark:border-[#2D3748] bg-white dark:bg-slate-900 ${className}`}>
//       <CardHeader className="pb-2">
//         <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-center mb-4">
//           <div className="space-y-2">
//             <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
//             <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
//           </div>
//           <div className="space-y-2 text-right">
//             <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded ml-auto animate-pulse" />
//             <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
//           </div>
//         </div>
//         <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
//           <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
//           <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }