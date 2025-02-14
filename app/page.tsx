"use client";

import { useState, useEffect } from "react";
import ThemeDark from "@/app/components/home/theme-dark";
import ThemeNice from "@/app/components/home/theme-nice";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "nice">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollThreshold = 10000; // 恢复原来的阈值

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    if (isMobile || currentTheme !== "dark") {
      // 移动端或非暗色主题时不需要滚动监听
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      setScrollProgress((prev) => {
        const newProgress = Math.max(0, Math.min(prev + Math.abs(e.deltaY), scrollThreshold));

        if (newProgress >= scrollThreshold) {
          setIsTransitioning(true);
          setCurrentTheme("nice");
          setTimeout(() => {
            setIsTransitioning(false);
          }, 1000);
          return 0;
        }

        return newProgress;
      });
    };

    // 添加进度条重置定时器
    const resetTimer = setInterval(() => {
      setScrollProgress((prev) => {
        if (prev > 0) {
          return Math.max(0, prev - scrollThreshold * 0.1);
        }
        return prev;
      });
    }, 100);

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearInterval(resetTimer);
    };
  }, [currentTheme, isMobile, isTransitioning]);

  // 处理标题点击
  const handleTitleClick = () => {
    if (!isMobile) return; // PC端不处理点击

    const now = Date.now();
    if (now - lastClickTime < 300) {
      // 300ms内的双击
      setCurrentTheme(currentTheme === "dark" ? "nice" : "dark");
    }
    setLastClickTime(now);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setCurrentTheme("dark");
    setScrollProgress(0);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className={`transition-opacity duration-500 ${
          currentTheme === "dark" ? "block" : "hidden"
        }`}
      >
        <ThemeDark
          scrollProgress={scrollProgress}
          scrollThreshold={scrollThreshold}
          onTitleClick={handleTitleClick}
        />
      </div>

      <div
        className={`transition-opacity duration-500 ${
          currentTheme === "dark" ? "hidden" : "block"
        }`}
      >
        <ThemeNice onBack={handleBack} />
      </div>
    </div>
  );
}
