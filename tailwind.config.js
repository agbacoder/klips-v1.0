/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*{.html, .ts}',
    './pages/**/*.{html,ts}',
    '/components/**/*.{html,ts}',
    

  ],
  safelist: ['bg-blue-400', 'bg-green-400', 'bg-red-400'],
  theme: {
    screens: {
      'sm': '640px',
      'md': "768px",
      'lg': "1024px",
      'xlg': "1280px"
    },
    
    extend: {
      'gridTemplateRows': {
        'layout': '200px minmax(900px, 1fr) 100px'
      }
    },
  },
  plugins: [],
}
