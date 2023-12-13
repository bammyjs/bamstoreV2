/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pry-color": "#0066db",
        "pry-deep": "#000066",
        "sec-color": "#ff6600",
        "sec-light-color": "#ff8c00",
        dark: "#1e1e24",
        light: "#ffffff",
        "gray-bk": "rgb(243 244 246)",
        "gray-900": "rgb(17 24 39)",
        "gray-400": "rgb(156 163 175)",
        "gray-100": "rgb(243 244 246)",
        gray: "#aeb1a9",
        "color-1": "#BD9FAC",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#000066",

          secondary: "#ff6600",

          accent: "#ff8c00",

          neutral: "#ffffff",

          "base-100": "#1e1e24",

          info: "#f9f9fb",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs"), require("daisyui")],
};
