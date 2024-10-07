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
      screens: {
        sm: "460px", // Minimum width for mobile devices
        md: "830px", // Minimum width for tablets
        hd: "1280px", // Minimum width for HD screens (720p)
        fhd: "1920px", // Minimum width for Full HD screens (1080p)
        "2k": "2400px", // Minimum width for 2K screens
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
