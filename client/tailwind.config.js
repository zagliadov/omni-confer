/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      charcoal: "#1D232A",
      "red-700": "##b91c1c",
      cyan: "#06b6d4",
      "cyan-50": "#ecfeff",
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{}, "dark"],
  },
}

