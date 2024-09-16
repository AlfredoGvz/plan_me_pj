/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: "390px", // mobile breakpoint
      tablet: "800px", // tablet breakpoint
      laptop: "1024px", // laptop breakpoint
      desktop: "1280px", // desktop and above
    },
  },
  plugins: [require("daisyui")],
};
