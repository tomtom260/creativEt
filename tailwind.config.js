module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#ea4c89",
        gray: { light: '#9e9ea7', dark: "#8b8b8b" }

      },
      screens: {
        xs: "450px"
      },
      maxWidth: ({ theme }) => ({
        ...theme('width')
      }),
      fontFamily: {
        mono: [
          "Roboto Mono",
          "monospace"
        ],
        "sans-serif": [
          "Quicksand",
          "sans-serif"
        ],
        serif: [
          "Poppins",
          "sans-serif"
        ]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],

}