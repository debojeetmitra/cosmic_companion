/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          900: '#0B0F19',
          800: '#111827',
          700: '#1F2937',
          accent: '#8B5CF6',
          glow: '#A78BFA'
        }
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["dark", "synthwave"],
  },
}
