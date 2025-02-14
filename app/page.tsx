"use client";
import { useState, useEffect, useRef } from "react";
import ThemeDark from "./components/home/theme-dark";
import ThemeNice from "./components/home/theme-nice";
export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "nice">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollThreshold = 10000;

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isTransitioning || currentTheme !== "dark") return;

      setScrollProgress((prev) => {
        const newProgress = Math.max(0, Math.min(prev + Math.abs(e.deltaY), scrollThreshold));

        if (newProgress >= scrollThreshold) {
          setIsTransitioning(true);
          setCurrentTheme("nice");
          setTimeout(() => {
            setIsTransitioning(false);
          }, 5000);
          return 0;
        }

        return newProgress;
      });
    };

    const resetTimer = setInterval(() => {
      setScrollProgress((prev) => {
        if (prev > 0) {
          return Math.max(0, prev - scrollThreshold * 0.1);
        }
        return prev;
      });
    }, 100);

    window.addEventListener("wheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      clearInterval(resetTimer);
    };
  }, [currentTheme, isTransitioning]);

  const handleBack = () => {
    setIsTransitioning(true);
    setCurrentTheme("dark");
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
    setScrollProgress(0);
  };

  return (
    <div className="relative h-screen w-screen">
      <div
        className={`transition-opacity duration-500 ${
          currentTheme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <ThemeDark scrollProgress={scrollProgress} scrollThreshold={scrollThreshold} />
      </div>

      <div
        className={`transition-opacity duration-500 ${
          currentTheme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      >
        <ThemeNice onBack={handleBack} />
      </div>
    </div>
  );
}
