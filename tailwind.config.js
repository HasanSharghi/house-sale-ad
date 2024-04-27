/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      IRANYekan: [
        "IRANYekanLight",
        "IRANYekanRegular",
        "IRANYekanMedium",
        "IRANYekanBold",
        "IRANYekanExtraBold",
        "IRANYekanBlack",
      ],
    },
    extend: {
      colors: {
        mainBlue: "#0ea5e9",
        darkBlue: "#334155",
        lightGray: "#94a3b81a",
        hoverGray: "#94a3b833",
        TextGray: "#64748b",
        lightBlue: "#38bdf81a",
        hoverBlue: "#38bdf833",
        textBlue: "#0284c7",
      },
    },
  },
  plugins: [],
};
