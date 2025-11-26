/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/context/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#000000',
        background: '#ffffff',
        primary: '#f97316',
        secondary: '#64748b',
        muted: '#f1f5f9',
        'muted-foreground': '#64748b',
        accent: '#e0f2fe',
        'accent-foreground': '#0c4a6e',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        border: '#e2e8f0',
        input: '#cbd5e1',
      },
    },
  },
  plugins: [],
};
