/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    screens: {
      // Differences between each of these is 250px
      xs: "350px",
      sm: "600px",
      md: "750px",
      lg: "1000px",
      xl: "1250px",
      "2xl": "1500px",
    },
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};