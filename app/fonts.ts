import { Inter, Pacifico } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["cursive"],
});

export const lxgwWenKai = localFont({
  src: "./fonts/LXGWWenKai-Regular.ttf",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const calSans = localFont({
  src: "./fonts/CalSans-SemiBold.woff2",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
