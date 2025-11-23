import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tu nuevo color base "Electric Cyan"
        primary: {
          DEFAULT: '#55EEF9', // Tu color
          hover: '#22D3EE',   // Un poco más oscuro para hovers
          text: '#0891B2',    // Para usar como color de texto sobre blanco (legibilidad)
        },
        // Un secundario Indigo para dar profundidad
        secondary: {
          DEFAULT: '#6366F1',
          dark: '#4338CA',
        },
        // Semántica "Neo"
        trend: {
          up: '#34D399',    // Verde menta neon
          down: '#F43F5E',  // Rojo rosado
          neutral: '#FBBF24',
        },
        // Fondos oscuros profundos (Dark Navy)
        dark: {
          bg: '#0B1120',      // Fondo principal muy oscuro
          surface: '#1E293B', // Tarjetas
          border: '#334155',  // Bordes sutiles
        }
      },
      // Sobrescribimos la fuente Montserrat si no la tienes configurada
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;