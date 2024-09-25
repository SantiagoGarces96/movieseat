import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFDF6",
        secondary: "#1E91D6",
        accent: "#0072BB",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9CA3AF",
          secondary: "#1E91D6",
          accent: "#0072BB",
          neutral: "#5197c3",
          "base-100": "#FFFDF6",
          "base-content": "#262a2e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
