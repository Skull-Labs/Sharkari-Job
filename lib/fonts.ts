import { Inter, Noto_Sans_Devanagari } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const noto = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export { inter, noto };

export const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("sharkari-theme");
    var dark = t === "dark" || (t !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
    var l = localStorage.getItem("sharkari-lang");
    if (l === "hi") document.documentElement.lang = "hi";
  } catch (e) {}
})();
`;
