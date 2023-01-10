/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/containers/users/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#C9D7E3',
      },
    },
  },
  plugins: [],
}
