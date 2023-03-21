/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        lga: { max: "1023px" },
        mda: { max: "768px" },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
