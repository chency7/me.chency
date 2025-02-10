import "./global.css";
import { Inter, Pacifico } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { useEnv } from "@/util/hooks/useEnv";
import { RouteMiddleware } from "./router/middleware";
import Loading from "./components/loading";
import MusicPlayer from "./components/MusicPlayer";
// import Menu from "./components/Menu";
import React from "react";
// import { Analytics } from "./components/analytics";
import { AudioProvider } from "./components/AudioProvider";
import { inter, pacifico, lxgwWenKai, calSans } from "./fonts";

export const metadata: Metadata = {
  // metadataBase: new URL("http://localhost:3000/"),
  title: {
    default: "Chency.com",
    template: "%s | chency.com",
  },
  description: "Software engineer and web developer",
  // 交媒体分享
  // openGraph: {
  //   title: "chency.com",
  //   description: "Software engineer and web developer",
  //   url: "https://chency.com",
  //   siteName: "chency.com",
  //   images: [
  //     {
  //       url: "https://chency.com/og.png",
  //       width: 1920,
  //       height: 1080,
  //     },
  //   ],
  //   locale: "en-US",
  //   type: "website",
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // twitter: {
  //   title: "Chency",
  //   card: "summary_large_image",
  // },
  icons: {
    shortcut: "/favicon.png",
  },
};

// Google 字体配置
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "block",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-Pacifico",
  fallback: ["cursive", "system-ui"],
});

// 本地字体配置
const calSans = LocalFont({
  src: [
    {
      path: "../public/fonts/CalSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-calsans",
  display: "block",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const lxgwWenKai = LocalFont({
  src: [
    {
      path: "../public/fonts/LXGWWenKai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-wenkai",
  display: "block",
  preload: true,
  fallback: ["system-ui", "Microsoft YaHei", "sans-serif"],
});

// 添加字体预加载链接
export const fontLinks = [
  {
    rel: "preload",
    href: "./static/media/fonts/LXGWWenKai-Regular.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { isDevelopment } = useEnv();
  const debugScreens = isDevelopment ? "debug-screens" : "";

  return (
    <html
      lang="zh"
      className={[lxgwWenKai.variable, pacifico.variable, inter.variable, calSans.variable].join(
        " "
      )}
    >
      <head>
        {/* 分析工具停用 */}
        {/* <Analytics /> */}
      </head>
      <body className={`overflow-hidden bg-black ${debugScreens}`}>
        <MusicPlayer />
        {/* 暂时隐藏关于按钮 */}
        {/* <Menu /> */}
        <AudioProvider>
          <RouteMiddleware>
            <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
          </RouteMiddleware>
        </AudioProvider>
      </body>
    </html>
  );
}
