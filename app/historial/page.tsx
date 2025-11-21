"use client";

import React, { useState } from "react";
import { LineChart, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockHistorial, mockCotizaciones } from "@/mock";
import { formatNumber } from "@/utils/formatters";
import { Cotizacion, HistorialItem } from "@/mock";

const Historial: React.FC = () => {
  const { t } = useLanguage();
  const [tipoDolar, setTipoDolar] = useState<string>("blue");
  const [periodo, setPeriodo] = useState<"7d" | "30d" | "1y">("7d");

  const renderGrafico = (datos: HistorialItem[]) => {
    const max = Math.max(...datos.map((d) => d.valor));
    const min = Math.min(...datos.map((d) => d.valor));
    const rango = max - min || 1;

    return (
      <div className="space-y-4">
        <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-[#E5E7EB] dark:border-[#2D3748] pl-2 pb-2">
          {datos.map((dato, index) => {
            const altura = ((dato.valor - min) / rango) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div
                  className="w-full bg-gradient-to-t from-[#1976D2] to-[#4299E1] rounded-t transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${altura}%`, minHeight: "10px" }}
                  title={`${dato.fecha}: $${formatNumber(dato.valor)}`}
                />
                <span className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mt-2 rotate-45 origin-left">
                  {dato.fecha.split("-").slice(1).join("/")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 bg-white dark:bg-[#1A202C]">
      <div className="container mx-auto px-4">
        <Card className="border-[#F9FAFB] dark:border-[#2D3748] mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Gráfico Histórico
            </CardTitle>

            <Select value={tipoDolar} onValueChange={setTipoDolar}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockCotizaciones.map((cot) => (
                  <SelectItem key={cot.id} value={cot.id}>
                    {t(`quotations.${cot.id}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent>
            <Tabs value={periodo} onValueChange={(v) => setPeriodo(v as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="7d">7 Días</TabsTrigger>
                <TabsTrigger value="30d">30 Días</TabsTrigger>
                <TabsTrigger value="1y">1 Año</TabsTrigger>
              </TabsList>

              <TabsContent value="7d">{renderGrafico(mockHistorial["7d"])}</TabsContent>
              <TabsContent value="30d">{renderGrafico(mockHistorial["30d"])}</TabsContent>
              <TabsContent value="1y">{renderGrafico(mockHistorial["1y"])}</TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Comparativa */}
        <Card className="border-[#F9FAFB] dark:border-[#2D3748]">
          <CardHeader>
            <CardTitle className="text-2xl">
              <BarChart3 className="inline mr-2 h-6 w-6" />
              Comparativa de Cotizaciones
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {mockCotizaciones.map((cot) => {
                const blue = mockCotizaciones.find((c) => c.id === "blue")?.venta ?? 1;
                const porcentaje = (cot.venta / blue) * 100;

                return (
                  <div key={cot.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span>{t(`quotations.${cot.id}`)}</span>
                      <span className="font-bold">${formatNumber(cot.venta)}</span>
                    </div>

                    <div className="w-full bg-[#F9FAFB] dark:bg-[#2D3748] rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#1976D2] to-[#4299E1] h-full rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Historial;
