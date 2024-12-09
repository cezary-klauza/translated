/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#040711",
        gray: {
          1: "#394150",
          2: "#4D5562",
          3: "#212936cc",
          4: "#121826cc",
        },
        blue: {
          1: "#CDD5E0",
          2: "#7CA9F3",
          3: "#3662E3",
        },
        white: "#F9FAFB",
      },
      keyframes: {
        hide: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
      },
      animation: {
        hide: "hide 4s ease-in",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
