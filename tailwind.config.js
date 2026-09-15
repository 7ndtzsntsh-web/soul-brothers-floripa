
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#14b8a6", // Teal/Cyan accent similar to the reference
          600: "#0d9488",
          900: "#134e4a",
        },
        surface: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          900: "#18181B"
        }
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "soft": "0 10px 40px -10px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

