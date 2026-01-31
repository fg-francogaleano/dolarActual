import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Base */
        background: "var(--background)",
        foreground: "var(--foreground)",

        /* Cards */
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",

        /* Primary system */
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        /* States */
        success: "var(--success)",
        "success-foreground": "var(--success-foreground)",

        danger: "var(--danger)",
        "danger-foreground": "var(--danger-foreground)",

        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        /* UI */
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        /* Text hierarchy (CLAVE) */
        "text-strong": "var(--text-strong)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-subtle": "var(--text-subtle)",

        /* Neutral scale */
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },

        /* Charts / data-viz */
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
}

export default config



// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: "class",

//   content: [
//     "./app/**/*.{ts,tsx}",
//     "./pages/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}",
//   ],

//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",

//         card: {
//           DEFAULT: "var(--card)",
//           foreground: "var(--card-foreground)",
//         },

//         popover: {
//           DEFAULT: "var(--popover)",
//           foreground: "var(--popover-foreground)",
//         },

//         primary: {
//           DEFAULT: "var(--primary)",
//           foreground: "var(--primary-foreground)",
//         },

//         secondary: {
//           DEFAULT: "var(--secondary)",
//           foreground: "var(--secondary-foreground)",
//         },

//         muted: {
//           DEFAULT: "var(--muted)",
//           foreground: "var(--muted-foreground)",
//         },

//         accent: {
//           DEFAULT: "var(--accent)",
//           foreground: "var(--accent-foreground)",
//         },

//         destructive: {
//           DEFAULT: "var(--destructive)",
//         },

//         border: "var(--border)",
//         input: "var(--input)",
//         ring: "var(--ring)",

//         chart: {
//           1: "var(--chart-1)",
//           2: "var(--chart-2)",
//           3: "var(--chart-3)",
//           4: "var(--chart-4)",
//           5: "var(--chart-5)",
//         },

//         sidebar: {
//           DEFAULT: "var(--sidebar)",
//           foreground: "var(--sidebar-foreground)",
//           primary: "var(--sidebar-primary)",
//           "primary-foreground": "var(--sidebar-primary-foreground)",
//           accent: "var(--sidebar-accent)",
//           "accent-foreground": "var(--sidebar-accent-foreground)",
//           border: "var(--sidebar-border)",
//           ring: "var(--sidebar-ring)",
//         },

//         success: {
//           DEFAULT: "var(--success)",
//           foreground: "var(--success-foreground)",
//         },
        
//         danger: {
//           DEFAULT: "var(--danger)",
//           foreground: "var(--danger-foreground)",
//         },
//       },

//       borderRadius: {
//         sm: "var(--radius-sm)",
//         md: "var(--radius-md)",
//         lg: "var(--radius-lg)",
//         xl: "var(--radius-xl)",
//       },

//       fontFamily: {
//         sans: ["var(--font-sans)"],
//         mono: ["var(--font-mono)"],
//       },
//     },
//   },
// };

// export default config;


