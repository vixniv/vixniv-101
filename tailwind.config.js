// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#C0C0C0",
      secondary: "#F0F0F2",
      tertiary: "#767676",
    },
    extend: {
      fontFamily: {
        title: ["Space Mono", "monospace"],
        desc: ["Inter", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#01020F",
            h2: {
              color: "#01020F",
            },
            h3: {
              color: "#01020F",
            },
            h4: {
              color: "#01020F",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
