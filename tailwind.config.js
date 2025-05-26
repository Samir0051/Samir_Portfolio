/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": { borderColor: "#f00" },
          "25%":      { borderColor: "#0f0" },
          "50%":      { borderColor: "#00f" },
          "75%":      { borderColor: "#f0f" },
        },
        edgeGlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        "text-slide": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        glow:      "glow 3s ease-in-out infinite",
        edgeGlow:  "edgeGlow 10s ease infinite",
        "text-slide": "text-slide 4s ease infinite",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [],
}
