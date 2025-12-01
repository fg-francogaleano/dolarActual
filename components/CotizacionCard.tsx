"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  formatNumber,
  formatVariation,
  formatDateShort,
} from "../utils/formatters";
import { useLanguage } from "../contexts/LanguageContext";

export interface CotizacionCardProps {
  cotizacion: {
    id: string;
    destacado: boolean;
    compra: number;
    venta: number;
    variacion: number;
    fechaActualizacion: string;
  };
  destacada?: boolean; // opcional si quieres destacar una card
}

export default function CotizacionCard({
  cotizacion,
  destacada = false,
}: CotizacionCardProps) {
  const { t } = useLanguage();

  const { id, compra, venta, variacion, destacado, fechaActualizacion } =
    cotizacion;

  const isPositive = variacion >= 0;

  return (
    <>
      <Card className="h-full justify-center hidden sm:flex">
        <div>
          <CardHeader className="pb-3">
            <CardTitle
              className={`${
                destacado ? "text-xl text-center" : "text-lg"
              } text-[#0D47A1] dark:text-[#B0C4DE]`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t(`quotations.${id}`).toLocaleUpperCase()}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* COMPRA - VENTA */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* COMPRA */}
              <div
                className={`${
                  destacado ? "flex items-center justify-center" : ""
                } `}
              >
                <span>
                  <p
                    className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {t("quotations.buy")}
                  </p>
                  <p
                    className={`${
                      destacado ? "text-3xl" : "text-xl"
                    } font-bold text-[#212529] dark:text-[#E2E8F0]`}
                    style={{ fontFamily: "Roboto Mono, monospace" }}
                  >
                    {compra > 0 ? `$${formatNumber(compra)}` : "-"}
                  </p>
                </span>
              </div>

              {/* VENTA */}
              <div
                className={`${
                  destacado ? "flex items-center justify-center" : ""
                } `}
              >
                <span>
                  <p
                    className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {t("quotations.sell")}
                  </p>
                  <p
                    className={`${
                      destacado ? "text-3xl" : "text-xl"
                    } font-bold text-[#212529] dark:text-[#E2E8F0]`}
                    style={{ fontFamily: "Roboto Mono, monospace" }}
                  >
                    ${formatNumber(venta)}
                  </p>
                </span>
              </div>
            </div>

            {/* VARIACION */}
            <div
              className={`flex items-center pt-3 border-t dark:border-[#2D3748] ${
                destacado ? "gap-3" : "justify-between"
              }`}
            >
              <span
                className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("quotations.variation")}
              </span>

              <div
                className={`flex items-center space-x-1 font-semibold ${
                  isPositive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span style={{ fontFamily: "Roboto Mono, monospace" }}>
                  {formatVariation(variacion)}
                </span>
              </div>
            </div>
          </CardContent>
        </div>

        {/* ULTIMA ACTUALIZACION PARA DESTACADOS */}
        <div className={`${destacado ? "block" : "hidden"} mt-2`}>
          <p
            className="text-sm text-[#212529] dark:text-[#E2E8F0] opacity-75 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("quotations.updated")} {formatDateShort(fechaActualizacion)}
          </p>
        </div>
      </Card>

      {/* VERSION MOVIL */}
      <Card className="block sm:hidden">
        <CardHeader className="pb-3">
          <CardTitle
            className={`${
              destacada ? "text-xl" : "text-lg"
            } text-[#0D47A1] dark:text-[#B0C4DE]`}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t(`quotations.${id}`).toLocaleUpperCase()}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p
                className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("quotations.buy")}
              </p>
              <p
                className={`${
                  destacada ? "text-2xl" : "text-xl"
                } font-bold text-[#212529] dark:text-[#E2E8F0]`}
                style={{ fontFamily: "Roboto Mono, monospace" }}
              >
                {compra > 0 ? `$${formatNumber(compra)}` : "-"}
              </p>
            </div>

            <div>
              <p
                className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75 mb-1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("quotations.sell")}
              </p>
              <p
                className={`${
                  destacada ? "text-2xl" : "text-xl"
                } font-bold text-[#212529] dark:text-[#E2E8F0]`}
                style={{ fontFamily: "Roboto Mono, monospace" }}
              >
                ${formatNumber(venta)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t dark:border-[#2D3748]">
            <span
              className="text-xs text-[#212529] dark:text-[#E2E8F0] opacity-75"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t("quotations.variation")}
            </span>

            <div
              className={`flex items-center space-x-1 font-semibold ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span style={{ fontFamily: "Roboto Mono, monospace" }}>
                {formatVariation(variacion)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
