module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-burgundy': '#7b0828',
        'royal-burgundy-dark': '#5a061e',
        'royal-burgundy-light': '#9e0a33',
        'royal-gold': '#c9a963',
        'royal-gold-dark': '#b08c4c',
        'royal-gold-light': '#d4ba7e',
        'royal-blue': '#0f4c81',
        'luxury-cream': '#f8f5e9',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'regal': '0 4px 12px rgba(123, 8, 40, 0.1)',
      },
    },
  },
    plugins: [],
  }