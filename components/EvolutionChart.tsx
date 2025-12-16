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

// Configuración de líneas y colores
const LINES_CONFIG = [
  { key: 'blue', color: '#3b82f6', name: 'Dólar Blue' },     // Blue-500
  { key: 'oficial', color: '#10b981', name: 'Dólar Oficial' }, // Emerald-500
  { key: 'mep', color: '#f59e0b', name: 'Dólar MEP' },       // Amber-500
  { key: 'ccl', color: '#8b5cf6', name: 'Contado con Liqui' }, // Violet-500
  { key: 'cripto', color: '#ec4899', name: 'Dólar Cripto' },   // Pink-500
];

// --- COMPONENTES ---

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50">
        <p className="font-bold text-slate-700 dark:text-slate-200 mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm mb-1">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {entry.name}:
            </span>
            <span className="font-bold text-slate-800 dark:text-white">
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
  // Estado para filtrar qué líneas se ven
  const [activeLines, setActiveLines] = useState<string[]>(['blue', 'oficial', 'mep', 'ccl', 'cripto']);
  const [timeRange, setTimeRange] = useState<number>(30); // Días a mostrar por defecto

  // Función para togglear líneas
  const toggleLine = (key: string) => {
    setActiveLines(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // 1. Filtrado por rango de tiempo
  const slicedData = timeRange === 0 ? data : data.slice(-timeRange);

  // 2. PROCESAMIENTO DE DATOS (FIX CRÍTICO):
  // Convertimos explícitamente a números y filtramos nulos para evitar líneas rectas por error de tipo
  const processedData = useMemo(() => {
    return slicedData.map(item => {
      const newItem: any = { ...item };
      LINES_CONFIG.forEach(config => {
        // Si existe el valor, forzamos la conversión a Number.
        // Recharts necesita números puros para escalar correctamente el eje Y.
        if (newItem[config.key] !== undefined && newItem[config.key] !== null) {
          newItem[config.key] = Number(newItem[config.key]);
        }
      });
      return newItem;
    });
  }, [slicedData]);

  return (
    <Card className="p-6 w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Evolución Histórica</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Comparativa de cotizaciones en el tiempo</p>
        </div>

        {/* Selector de Rango */}
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 overflow-x-auto max-w-full">
          {[
            { label: '7D', value: 7 },
            { label: '30D', value: 30 },
            { label: '90D', value: 90 },
            { label: '1A', value: 365 },
            { label: 'Todo', value: 0 },
          ].map((range) => (
            <button
              key={range.label}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                timeRange === range.value
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
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
            {line.name}
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
            
            {/* FIX DOMINIO YAXIS: 
               Usamos 'auto' o ['dataMin', 'dataMax'] para que el gráfico no empiece en 0.
               Esto hace visibles las pequeñas variaciones.
            */}
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
                  name={line.name}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={1000}
                  connectNulls={true} // Conecta puntos si faltan datos intermedios
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}