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
        primary: "#191A19",
        secondary: "#3C3D37",
        warm: "#FABC3F",
        light: "#ECDFCC"
      },
    },
  },
  plugins: [],
};
export default config;
