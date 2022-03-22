module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'center': '0.5px 0.5px 10px',
      },
      colors: {
        secondary: {
          dark: '#28104E',
          normal: '#6237A0',
          light: '#9754C8',
          "very-light": '#DEACF5'
        },
        gray: { light: "#e7e7e9", normal: '#9e9ea7', dark: "#8b8b8b" }

      },
      screens: {
        xs: "450px"
      },
      maxWidth: ({ theme }) => ({
        ...theme('width')
      }),
      maxHeight: ({ theme }) => ({
        ...theme('height')
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