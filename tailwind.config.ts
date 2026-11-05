import type { Config } from "tailwindcss";

// Paleta: base marfil para leer, bloques oscuros de ambiente y un único acento cálido para acciones.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marfil: "#FBF7F0",
        arena: "#F3EBDD",
        linea: "#E4D8C4",
        tinta: { DEFAULT: "#231C17", suave: "#5C5047" },
        noche: { DEFAULT: "#1C1A27", 800: "#25222F", 700: "#312D3D" },
        acento: { DEFAULT: "#B4441F", hover: "#953516", claro: "#F0A47F" },
        oro: "#E3B66E",
        wa: { DEFAULT: "#25D366", hover: "#1EBE5A", oscuro: "#0B3D22" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { prosa: "42rem" },
    },
  },
  plugins: [],
};

export default config;
