module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
     themes: [
      "light"
     ],
  },
  plugins: [
    require('daisyui'),
  ],
  
};
