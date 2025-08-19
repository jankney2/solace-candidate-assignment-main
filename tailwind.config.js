/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        specialtyFadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        specialtyFadeIn: "specialtyFadeIn 0.3s ease-out forwards",
      },
      colors: {
        solace: {
          blue: "#00C895", // Their primary brand color
          darkblue: "#101C32", // Dark blue used in headers
          gray: "#667085", // Text color
          lightgray: "#F5F5F5", // Background color
          hover: "#00B084", // Slightly darker version of primary for hover states
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        solace:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
