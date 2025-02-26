"use client";
import { useState, useEffect } from "react";
import ThemeDark from "@/app/components/home/theme-dark";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollThreshold = 10000; // 恢复原来的阈值

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      setScrollProgress((prev) => {
        const newProgress = Math.max(0, Math.min(prev + Math.abs(e.deltaY), scrollThreshold));

        if (newProgress >= scrollThreshold) {
          setIsTransitioning(true);
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
  }, [isTransitioning]);

  return (
    <div className="relative h-screen w-screen">
      <ThemeDark scrollProgress={scrollProgress} scrollThreshold={scrollThreshold} />
    </div>
  );
}
