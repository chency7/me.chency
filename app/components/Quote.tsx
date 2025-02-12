"use client";
import React, { useState, useEffect } from "react";

// 语录数组
const quotes = [
  "生活不止眼前的苟且，还有诗和远方",
  "不要等待，时机永远不会恰到好处",
  "越是困难的时候，越要抬起头微笑向前",
  "生命中最重要的不是位置，而是方向",
  "没有伞的孩子必须努力奔跑",
];

interface QuoteProps {
  className?: string;
  interval?: number; // 切换间隔，单位毫秒
}

export default function Quote({ className = "", interval = 10000 }: QuoteProps) {
  // 使用 useState 管理当前显示的语录
  const [currentQuote, setCurrentQuote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );

  // 定时切换语录
  useEffect(() => {
    const timer = setInterval(() => {
      let newQuote;
      do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      } while (newQuote === currentQuote); // 确保不会连续显示相同的语录

      setCurrentQuote(newQuote);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, currentQuote]);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 animate-fade-in ${className}`}>
      <div className="relative">
        {/* 背景模糊效果 */}
        <div
          className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-zinc-900/50 via-zinc-800/50 to-zinc-900/50 blur-md"
          aria-hidden="true"
        />

        {/* 语录文本 */}
        <p
          className="rounded-lg px-6 py-3 text-center font-wenkai text-sm text-zinc-400 transition-colors duration-500 hover:text-zinc-300 sm:text-base"
          role="status"
          aria-live="polite"
        >
          {currentQuote}
        </p>

        {/* 装饰线条 */}
        <div
          className="absolute -bottom-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-zinc-500/0 via-zinc-500/50 to-zinc-500/0"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
