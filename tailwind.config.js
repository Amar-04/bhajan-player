/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#A10000", // deep red
        gold: "#FFB300", // golden yellow
        card: "#F5D6A0", // beige card
        card2: "#EBCB93",
        muted: "#C67E5A",
        overlay: "#5E0C0C",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
