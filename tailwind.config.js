module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'haikei-bauhaus': "url('/blob-scene-haikei.svg')",
        'rayan-gosling': "url('/rayan-gosling.jpg')",
        'hasan': "url('/hasan.gif')"
      },
      colors: {
        'dark': "#191919",
        'secondary': "#2D4263",
        'primary': "#C84B31",
        'auxilary': "#ECDBBA"
      },
      gridTemplateRows: {
        // Simple 8 row grid
        '8': 'repeat(8, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};
