/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Just-In-Time Compiler mode
  darkMode: 'class', // Uses the 'class' strategy for dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to all template files
  ],
  theme: {
    extend: {
      textShadow: {
        'md': '1px 1px 2px black', // Custom text shadow utility
      },
      // You can add more custom styles in extend
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Official forms plugin
    require('tailwindcss-textshadow') // Ensure this plugin is installed
  ],
}
