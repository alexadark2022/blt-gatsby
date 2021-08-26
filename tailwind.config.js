const colors = require("tailwindcss/colors")
const rem = (px) => px / 16 + "rem"

//palette
const cyan='#08fcfe',
darkCyan="#417373",
magenta="#f0a0ee",
lightMagenta="#fdf3fd"
green="#8df286",
darkGreen="#445d42",
lightGreen="#f0fdef"
yellow="#feffa2",
lightYellow="#ffffed"
red="#fd9b9c",
darkRed="#895354",
black="#121211",
white="#fff",
blueWeb="#0000FF"

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],

  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      maxWidth: {
        lg: rem(1024),
        md: rem(768),
        sm: rem(640),
        xl: rem(1280),
      },
      fontWeight: {
        body: 400,
        heading: "bold",
        bold: 700,
      },
      lineHeight: {
        body: 1.8,
        heading: 1.4,
        loose: 2,
      },
      boxShadow: {
        input: "currentcolor 0px 0px 0px inset",
        inputFocus: "currentcolor 0px -3px 0px inset",
      },
      typography: {
        DEFAULT: {
          css: {
            a: {},
          },
        },
      },

      colors: {
        cyan,
        darkCyan,
        green,
        magenta,
        lightMagenta,
        lightGreen,
        lightYellow,
        darkGreen,
        yellow,
        red,
        darkRed,
        black,
        white,
        blueWeb,
        link:blueWeb,
        text: black


      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-debug-screens"),
  ],
  corePlugins: {
    preflight: true,
  },
}
