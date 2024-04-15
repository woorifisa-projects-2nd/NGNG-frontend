import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#272727",
        "light-gray": "#EFEFEF",
        "text-gray": "#8E8E8E",
        "point-color": "#873EAC",
        "bg-dark": "#282828",
        "bg-header-dark": "#303030",
        "light-lavender": "#FAF5FF",
      },
      boxShadow: {
        radio: " 0 0 0 1.6px #873EAC",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};
export default config;
