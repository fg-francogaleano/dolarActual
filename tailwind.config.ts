import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Activación manual por clase (para el ThemeContext)
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Tipografía basada en variables CSS de next/font
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      // 2. Paleta de Colores Semántica
      colors: {
        // Colores de Marca (Brand)
        brand: {
          50: '#E3F2FD',  // Fondos muy claros / Hover
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#1976D2', // Color Principal (Primary Action)
          600: '#0D47A1', // Color Institucional (Header / Títulos fuertes)
          700: '#1565C0',
          800: '#0B1120', // Fondo Dark Mode Profundo
          900: '#0D47A1', // Legacy dark reference
        },
        // Colores de Estado (Semánticos)
        sentiment: {
          positive: '#16A34A', // Green 600 - Subidas
          negative: '#DC2626', // Red 600 - Bajadas
          neutral: '#64748B',  // Slate 500 - Sin cambios
        },
        // Sistema de Superficies (Adaptable a Dark Mode)
        background: "var(--background)", // Configurar en globals.css si usas vars
        foreground: "var(--foreground)",
      },
      // 3. Sistema de Bordes
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};

export default config;

// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: "class",
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--primary))", // El anillo de foco usa tu color
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--accent))", // Usamos accent como secundario
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--trend-down))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         // TUS COLORES PERSONALIZADOS PARA COTIZACIONES
//         trend: {
//           up: "hsl(var(--trend-up))",
//           down: "hsl(var(--trend-down))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//     },
//   },
//   // plugins: [require("tailwindcss-animate")],
// };
// export default config;