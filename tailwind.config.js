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
      },
    },
  },
  plugins: [],
};
