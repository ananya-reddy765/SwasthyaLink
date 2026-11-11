/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0faf7",
          100: "#daf2ea",
          200: "#b3e3d4",
          300: "#7fceb8",
          400: "#48b298",
          500: "#0d9488", // primary teal
          600: "#0b7d73",
          700: "#0a655d",
          800: "#0a5049",
          900: "#08403b",
        },
        ink: "#0f2027",
        mist: "#f6f9f8",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(15, 32, 39, 0.06)",
        card: "0 4px 20px rgba(13, 148, 136, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}
