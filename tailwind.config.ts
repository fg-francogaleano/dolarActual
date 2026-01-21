import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },

        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },

        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        destructive: {
          DEFAULT: "var(--destructive)",
        },

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },

        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },

        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        
        danger: {
          DEFAULT: "var(--danger)",
          foreground: "var(--danger-foreground)",
        },
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
};

export default config;

// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: "class", // Activación manual por clase (para el ThemeContext)
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       // 1. Tipografía basada en variables CSS de next/font
//       fontFamily: {
//         sans: ["var(--font-montserrat)", "sans-serif"],
//         mono: ["var(--font-roboto-mono)", "monospace"],
//       },
//       // 2. Paleta de Colores Semántica
//       colors: {
//         // Colores de Marca (Brand)
//         brand: {
//           50: '#E3F2FD',  // Fondos muy claros / Hover
//           100: '#BBDEFB',
//           200: '#90CAF9',
//           300: '#64B5F6',
//           400: '#42A5F5',
//           500: '#1976D2', // Color Principal (Primary Action)
//           600: '#0D47A1', // Color Institucional (Header / Títulos fuertes)
//           700: '#1565C0',
//           800: '#0B1120', // Fondo Dark Mode Profundo
//           900: '#0D47A1', // Legacy dark reference
//         },
//         // Colores de Estado (Semánticos)
//         sentiment: {
//           positive: '#16A34A', // Green 600 - Subidas
//           negative: '#DC2626', // Red 600 - Bajadas
//           neutral: '#64748B',  // Slate 500 - Sin cambios
//         },
//         // Sistema de Superficies (Adaptable a Dark Mode)
//         background: "var(--background)", // Configurar en globals.css si usas vars
//         foreground: "var(--foreground)",
//       },
//       // 3. Sistema de Bordes
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//     },
//   },
// };

// export default config;
