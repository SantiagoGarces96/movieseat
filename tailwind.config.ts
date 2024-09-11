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
          primary: "#FFFDF6",
          secondary: "#1E91D6",
          accent: "#0072BB",
          neutral: "#1E91D6",
          "base-100": "#FFFDF6",
          "base-content": "#262a2e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
