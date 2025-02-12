"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HitokotoResponse {
  id: number;
  hitokoto: string;
  from: string;
  from_who: string | null;
  creator: string;
}

interface QuoteProps {
  className?: string;
  interval?: number;
}

const ProgressLine = ({ progress }: { progress: number }) => {
  return (
    <div className="absolute -bottom-px left-1/2 h-px w-3/4 -translate-x-1/2 overflow-hidden">
      <motion.div
        className="h-full w-full bg-gradient-to-r from-zinc-500/0 via-zinc-400/70 to-zinc-500/0"
        initial={{ x: "-100%" }}
        animate={{ x: `${progress - 100}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
};

const localQuotes: HitokotoResponse[] = [
  {
    id: 1,
    hitokoto: "人生就像一本书，不会读书的人只能读到封面。",
    from: "名人语录",
    from_who: "叔本华",
    creator: "local",
  },
  {
    id: 2,
    hitokoto: "世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的胸怀。",
    from: "哲理",
    from_who: "雨果",
    creator: "local",
  },
  {
    id: 3,
    hitokoto: "生活明朗，万物可爱。",
    from: "生活感悟",
    from_who: null,
    creator: "local",
  },
  {
    id: 4,
    hitokoto: "不要等待机会，而要创造机会。",
    from: "励志",
    from_who: "拉丁谚语",
    creator: "local",
  },
  {
    id: 5,
    hitokoto: "最美的不是下雨天，是曾与你躲过雨的屋檐。",
    from: "周杰伦",
    from_who: "不能说的秘密",
    creator: "local",
  },
];

export default function Quote({ className = "", interval = 15000 }: QuoteProps) {
  const [quote, setQuote] = useState<HitokotoResponse | null>(null);
  const [progress, setProgress] = useState(0);
  const [useLocalQuotes, setUseLocalQuotes] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    setQuote(localQuotes[randomIndex]);
    setProgress(0);
  };

  const fetchNewQuote = async () => {
    setProgress(0);
    try {
      const response = await fetch("/api/proxy");
      const data: HitokotoResponse = await response.json();

      if (data?.hitokoto) {
        setQuote(data);
      } else {
        throw new Error("Invalid data");
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setUseLocalQuotes(true);
      getRandomQuote();
    }
  };

  const updateQuote = () => {
    if (useLocalQuotes) {
      getRandomQuote();
    } else {
      fetchNewQuote();
    }
  };

  useEffect(() => {
    updateQuote(); // 初始加载
    const timer = setInterval(updateQuote, interval);

    const progressStep = 16.67;
    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + (progressStep / interval) * 100, 100));
    }, progressStep);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [interval, useLocalQuotes]);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 animate-fade-in ${className}`}>
      <div className="relative max-w-[90vw]">
        {/* 背景 */}
        <div
          className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-zinc-900/50 via-zinc-800/50 to-zinc-900/50 blur-md"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={quote?.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="flex flex-col rounded-lg px-6 py-3 text-center font-wenkai text-sm text-zinc-400 transition-colors duration-500 hover:text-zinc-300 sm:text-base"
          >
            <p className="flex items-center justify-center gap-2">
              <span>{quote?.hitokoto}</span>
              {quote?.from && (
                <span className="text-xs text-zinc-500">
                  —— {quote.from} {quote.from_who && ` · ${quote.from_who}`}
                </span>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <ProgressLine progress={progress} />
    </div>
  );
}
