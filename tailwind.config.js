/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#974343",
        "background-main": "#F1E2DE",
        "background-dark": "#FEF9F7",
        "background-blue": "#FEF9F7",
        "kelcom-red": "#cf0617",
        "kelcom-blue": "#1a69c9",
        "kelcom-light-blue": "#c6d6e9",
        "kelcom-dark-blue": "#6893c9",
        "kelcom-cta": "#EF7359",
        "navbar-bg": "#f1f5f9",
        "navbar-text": "#563d40",
        // New color system for Start page
        "bg-opacity-murky": "rgba(255, 255, 255, 0.75)",
        "on-bg-light": "#EAEAEA",
        "background": "#FFF",
        "on-background": "#242424",
        "accent": "#0070F6",
        "accent-blue": "#0070F6",
        "accent-red": "#cf0617",
        "text-secondary": "#5B5B5B",
        "background-extra-light": "#F4F4F4",
        "default-black": "rgba(0, 0, 0, 0.00)",
        "bg-shadow": "rgba(0, 0, 0, 0.14)",
        "on-accent": "#FFF",
        "on-bg-extra-light": "#F4F4F4",
        "on-accent-disabled": "#B2D4FC",
        "on-bg-disabled": "#919191",
        "on-bg-secondary": "#5B5B5B",
        "accent-high-contrast": "#0070F6",
        "scroll-track": "#E8E8E8",
        "scroll-thumb": "#A1A1A1",
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
