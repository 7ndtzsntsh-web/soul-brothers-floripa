module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        tech: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Inter'", "system-ui", "-apple-system", "sans-serif"]
      },

      colors: {
        cobalt: {
          500: "#0055FF",
          400: "#2979FF",
          600: "#0040DD"
        },
        cyber: {
          lime: "#00FF66"
        },
        cream: {
          50: "#FFFDF9",
          100: "#FFF8F0",
          200: "#FDF0DE",
          300: "#FBE6C8"
        },
        flame: {
          DEFAULT: "#FF7A00",
          500: "#FF7A00",
          600: "#E66800",
          700: "#CC5500",
          hover: "#FF8C1A",
          dark: "#D84315"
        },
        charcoal: {
          950: "#080808",
          900: "#111111",
          850: "#181818",
          800: "#222222",
          700: "#2E2E2E"
        }
      },
      boxShadow: {
        "flame-glow": "0 10px 25px -5px rgba(255, 122, 0, 0.4)",
        "card-soft": "0 8px 30px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 20px 40px -10px rgba(0, 0, 0, 0.12)"
      }

    }
  },
  plugins: []
};

