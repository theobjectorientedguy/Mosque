/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./src/*.html","../src/**/*.{html,js}","../src/*.html"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gray: {
          "100": "#fbfbfb",
          "200": "#1b1b1b",
          "300": "#030303",
        },
        mediumseagreen: {
          "100": "#26bf7a",
          "200": "#00ab5c",
          "300": "#009a53",
        },
        dimgray: "#504f4f",
        gainsboro: {
          "100": "#e6e6e6",
          "200": "#d9d9d9",
        },
        mintcream: "#eff9f5",
        black: "#000",
        whitesmoke: "#f5f5f5",
        seagreen: "#006838",
      },
      spacing: {},
      fontFamily: {
        "noto-sans": "'Noto Sans'",
      },
      borderRadius: {
        "8xl": "27px",
        mid: "17px",
        "14xl": "33px",
        "18xl": "37px",
        "20xl": "39px",
      },
    },
    fontSize: {
      lg: "18px",
      xl: "20px",
      base: "16px",
      "7xl": "26px",
      "2xl": "21px",
      "5xl": "24px",
      lgi: "19px",
      "3xl": "22px",
      "3xs": "10px",
      smi: "13px",
      "2xs": "11px",
      mini: "15px",
      inherit: "inherit",
    },
    screens: {
      mq1350: {
        raw: "screen and (max-width: 1350px)",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  plugins: [],
}