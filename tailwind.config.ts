import type { Config } from "tailwindcss";



const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        subTitleText: "var(--sub-title-text)",
        titleText: "var(--title-text)",
        primary: "var(--primary)",
        darkText:"#2f3e4e",
        primaryBg:"var(--primary-bg)",
        error: "var(--error)",
        success: "var(--success)",

      },
    },
  },
  plugins: [],
};
export default config;
