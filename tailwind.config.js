/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  extend: {
    animation: {
      bounce: "bounce 0.5s ease-in-out",
    },
  },
},
  plugins: [],
};
