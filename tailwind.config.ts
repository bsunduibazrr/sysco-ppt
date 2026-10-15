import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spidey: "#E62429",
        blood: "#8B0A0F",
        ink: "#0A0A0C",
        paper: "#F4F1EC",
        suit: "#1B3A8A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        comic: "6px 6px 0 0 #0A0A0C",
        "comic-red": "6px 6px 0 0 #E62429",
        "comic-lg": "12px 12px 0 0 #0A0A0C",
      },
    },
  },
  plugins: [],
};

export default config;
