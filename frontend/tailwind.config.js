/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "media-max-1186px": { max: "1186px" },
        "media-max-1144px": { max: "1144px" },
        "media-max-1114px": { max: "1114px" },
        "media-max-1022px": { max: "1022px" },
        "media-max-986px": { max: "986px" },
        "media-max-962px": { max: "962px" },
        "media-max-872px": { max: "872px" },
        "media-max-842px": { max: "842px" },
        "media-max-820px": { max: "820px" },
        "media-max-690px": { max: "690px" },
        "media-max-666px": { max: "666px" },
        "media-max-648px": { max: "648px" },
        "media-max-570px": { max: "570px" },
        "media-max-550px": { max: "550px" },
        "media-max-536px": { max: "536px" },
        "media-max-494px": { max: "494px" },
        "media-max-482px": { max: "482px" },
        "media-max-468px": { max: "468px" },
        "media-max-408px": { max: "408px" }, // next //
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
