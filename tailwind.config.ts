import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      green: {
        500: "#55D462",
      },

      gray: {
        100: "#ffffff",
        150: "#F6F6F6",
        200: "#C1C1C1",
        300: "#7A7A7A",
        400: "#424242",
        500: "#242424",
        70080: "#24242480",
      },

      red: {
        500: "#FD3E3E",
      },

      blue: {
        500: "#589BFF",
      },
    },
  },
  plugins: [],
};
export default config;
