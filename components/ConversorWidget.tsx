"use client";

import { useState, useMemo } from "react";
import { ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguage } from "../contexts/LanguageContext";
import { formatNumber } from "../utils/formatters";
import { mockCotizaciones } from "../mock";

// Tipo local basado en tu mock real
type CotizacionLite = {
  id: string;
  compra: number;
  venta: number;
};

interface ConversorWidgetProps {
  compact?: boolean;
}

export default function ConversorWidget({
  compact = false,
}: ConversorWidgetProps) {
  const { t } = useLanguage();

  const [monto, setMonto] = useState<string>("");
  const [monedaOrigen, setMonedaOrigen] = useState("ARS");
  const [monedaDestino, setMonedaDestino] = useState("USD");
  const [resultado, setResultado] = useState<number | null>(null);

  // Encuentra la cotización del dólar blue desde el array
  const dolarBlue = useMemo<CotizacionLite | undefined>(() => {
    return mockCotizaciones.find((c) => c.id === "blue");
  }, []);

  const monedas = [
    { value: "ARS", label: "Peso Argentino (ARS)" },
    { value: "USD", label: "Dólar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "BRL", label: "Real (BRL)" },
  ];

  const handleConvert = () => {
    if (!monto || Number(monto) <= 0) return;
    if (!dolarBlue) return; // seguridad

    let tasaCambio = 1;

    if (monedaOrigen === "ARS" && monedaDestino === "USD") {
      tasaCambio = 1 / dolarBlue.venta;
    } else if (monedaOrigen === "USD" && monedaDestino === "ARS") {
      tasaCambio = dolarBlue.compra;
    } else if (monedaOrigen === "ARS" && monedaDestino === "EUR") {
      tasaCambio = 1 / 1090;
    } else if (monedaOrigen === "USD" && monedaDestino === "EUR") {
      tasaCambio = 0.92;
    }

    setResultado(Number(monto) * tasaCambio);
  };

  const intercambiarMonedas = () => {
    setMonedaOrigen(monedaDestino);
    setMonedaDestino(monedaOrigen);
    setResultado(null);
  };

  return (
    <Card className="border-[#F9FAFB] dark:border-[#2D3748]">
      <CardHeader>
        <CardTitle
          className="text-xl text-[#0D47A1] dark:text-[#B0C4DE]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {t("converter.title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ORIGEN */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#212529] dark:text-[#E2E8F0]">
            {t("converter.from")}
          </label>
          <Select value={monedaOrigen} onValueChange={setMonedaOrigen}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monedas.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* MONTO */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#212529] dark:text-[#E2E8F0]">
            {t("converter.amount")}
          </label>
          <Input
            type="number"
            placeholder="0.00"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="text-lg"
          />
        </div>

        {/* BOTON INTERCAMBIO */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={intercambiarMonedas}
            className="rounded-full hover:bg-[#1976D2] hover:text-white"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* DESTINO */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#212529] dark:text-[#E2E8F0]">
            {t("converter.to")}
          </label>
          <Select value={monedaDestino} onValueChange={setMonedaDestino}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monedas.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* BOTÓN CONVERTIR */}
        <Button
          onClick={handleConvert}
          className="w-full bg-[#1976D2] hover:bg-[#0D47A1] dark:bg-[#4299E1] dark:hover:bg-[#1976D2]"
        >
          {t("converter.convert")}
        </Button>

        {/* RESULTADO */}
        {resultado !== null && (
          <div className="mt-4 p-4 bg-[#F9FAFB] dark:bg-[#2D3748] rounded-lg">
            <p className="text-sm text-[#212529] dark:text-[#E2E8F0] opacity-75">
              {t("converter.result")}
            </p>
            <p className="text-3xl font-bold text-[#0D47A1] dark:text-[#B0C4DE]">
              {formatNumber(resultado)} {monedaDestino}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
