"use client";
import { useState, useEffect, useRef } from "react";
import ThemeDark from "./components/home/theme-dark";
import ThemeNice from "./components/home/theme-nice";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "nice">("dark");
  const isTransitioning = useRef(false);
  const scrollAccumulator = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const scrollThreshold = 10000;

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isTransitioning.current) return;

      // 清除之前的超时
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // 累积滚动距离
      scrollAccumulator.current += Math.abs(e.deltaY);

      // 设置新的超时，如果 200ms 内没有新的滚动，则重置累积值
      scrollTimeout.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 2000);

      // 检查是否达到阈值
      if (scrollAccumulator.current >= scrollThreshold && currentTheme === "dark") {
        isTransitioning.current = true;
        setCurrentTheme("nice");
        scrollAccumulator.current = 0;
        setTimeout(() => {
          isTransitioning.current = false;
        }, 1000);
      }

      // 调试用
      console.log("Accumulated scroll:", scrollAccumulator.current, "Threshold:", scrollThreshold);
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentTheme]);

  const handleBack = () => {
    console.log("handleBack called"); // 调试日志
    if (currentTheme === "nice") {
      setCurrentTheme("dark");
      // 重置滚动累积器
      scrollAccumulator.current = 0;
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    }
  };

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-500 ${
          currentTheme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <ThemeDark />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          currentTheme === "nice" ? "opacity-100" : "opacity-0"
        }`}
      >
        <ThemeNice onBack={handleBack} />
      </div>
    </div>
  );
}
