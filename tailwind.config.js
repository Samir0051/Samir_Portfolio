/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float3D: {
          '0%':   { transform: 'rotateX(8deg) rotateY(0deg)' },
          '25%':  { transform: 'rotateX(10deg) rotateY(3deg)' },
          '50%':  { transform: 'rotateX(8deg) rotateY(0deg)' },
          '75%':  { transform: 'rotateX(6deg) rotateY(-3deg)' },
          '100%': { transform: 'rotateX(8deg) rotateY(0deg)' },
        },
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
        float3D: 'float3D 5s ease-in-out infinite',
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [plugin(function ({ addUtilities }) {
      addUtilities({
        '.perspective-800': { perspective: '800px' },
        '.preserve-3d': { 'transform-style': 'preserve-3d' },
        '.backface-hidden':    { 'backface-visibility': 'hidden' },
      })
    }),],
}
