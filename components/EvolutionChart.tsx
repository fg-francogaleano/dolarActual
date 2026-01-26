"use client";

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

// --- DEFINICIONES DE TIPOS ---

interface ChartDataPoint {
  date: string;
  displayDate: string;
  [key: string]: string | number;
}

interface EvolutionChartProps {
  data: ChartDataPoint[];
}

// Interfaz manual para el Tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    color: string;
    payload?: any;
    [key: string]: any;
  }[];
  label?: string;
}

// Configuración de líneas y colores (Sin nombres harcodeados)
const LINES_CONFIG = [
  { key: 'blue', color: '#0d47a1' },     // Blue-500
  { key: 'oficial', color: '#10b981' }, // Emerald-500
  { key: 'mep', color: '#7c3aed' },       // Amber-500
  { key: 'ccl', color: '#ec4899' }, // Violet-500
  { key: 'cripto', color: '#14b8a6' },   // Pink-500
];

// --- COMPONENTES ---

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-4 border border-border rounded-lg shadow-xl z-50">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm mb-1">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground font-medium">
              {entry.name}
            </span>
            <span className="font-medium text-foreground">
              ${Number(entry.value).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function EvolutionChart({ data }: EvolutionChartProps) {
  const { t } = useLanguage();
  
  // Estado para filtrar qué líneas se ven
  const [activeLines, setActiveLines] = useState<string[]>(['blue', 'oficial', 'mep', 'ccl', 'cripto']);
  const [timeRange, setTimeRange] = useState<number>(7); // Días a mostrar por defecto

  // Función para togglear líneas
  const toggleLine = (key: string) => {
    setActiveLines(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // Helper para obtener nombre traducido
  const getLineName = (key: string) => t(`quotations.${key}`);

  // 1. Filtrado por rango de tiempo
  const slicedData = timeRange === 0 ? data : data.slice(-timeRange);

  // 2. Procesamiento de Datos
  const processedData = useMemo(() => {
    return slicedData.map(item => {
      const newItem: any = { ...item };
      LINES_CONFIG.forEach(config => {
        if (newItem[config.key] !== undefined && newItem[config.key] !== null) {
          newItem[config.key] = Number(newItem[config.key]);
        }
      });
      return newItem;
    });
  }, [slicedData]);

  return (
    <Card className="p-6 w-full bg-card border border-border shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-medium text-foreground">
            {t("history.chartTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("history.chartSubtitle")}
          </p>
        </div>

        {/* Selector de Rango */}
        <div className="flex rounded-lg p-1 overflow-x-auto max-w-full">
          {[
            { label: '7D', value: 7 },
            { label: '30D', value: 30 },
            { label: '90D', value: 90 },
            { label: '1A', value: 365 },
            { label: t("history.rangeAll"), value: 0 },
          ].map((range) => (
            <button
              key={range.label}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-xs cursor-pointer rounded-md transition-all whitespace-nowrap ${
                timeRange === range.value
                  ? 'font-semibold text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-accent'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controles de Leyenda Interactiva */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {LINES_CONFIG.map((line) => (
          <button
            key={line.key}
            onClick={() => toggleLine(line.key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              activeLines.includes(line.key)
                ? 'bg-opacity-10 border-opacity-50'
                : 'opacity-50 grayscale border-transparent'
            }`}
            style={{ 
              backgroundColor: activeLines.includes(line.key) ? `${line.color}20` : 'transparent',
              borderColor: line.color,
              color: activeLines.includes(line.key) ? line.color : 'inherit'
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: line.color }} />
            {getLineName(line.key)}
          </button>
        ))}
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700" />
            
            <XAxis 
              dataKey="displayDate" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickMargin={10}
              minTickGap={30}
            />
            
            <YAxis 
              domain={['auto', 'auto']} 
              stroke="#94a3b8" 
              fontSize={12} 
              tickFormatter={(value) => `$${value}`}
              width={60}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {LINES_CONFIG.map((line) => (
              activeLines.includes(line.key) && (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={getLineName(line.key)} // Nombre traducido para el tooltip
                  stroke={line.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={1000}
                  connectNulls={true}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}