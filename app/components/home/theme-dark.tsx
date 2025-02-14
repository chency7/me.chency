import Link from "next/link";
import React, { useEffect } from "react";
import Particles from "../particles";
import { Github } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

interface ThemeDarkProps {
  scrollProgress?: number;
  scrollThreshold?: number;
  onTitleClick?: () => void;
}

const navigation = [
  { name: "随记", href: "/views/projects" },
  // { name: "博客", href: "/views/contact" },
  // { name: "关于", href: "/views/ablut" },
];

export default function ThemeDark({
  scrollProgress = 0,
  scrollThreshold = 10000,
  onTitleClick,
}: ThemeDarkProps) {
  const controls = useAnimation();
  const fillPercentage = Math.min((scrollProgress / scrollThreshold) * 100, 100);

  useEffect(() => {
    controls.start({
      clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  }, [fillPercentage, controls]);

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/10 to-black">
      <nav className="mb-20 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-l text-zinc-500 duration-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <div className="relative">
        {/* 背景文字（灰色） */}
        <h1
          onClick={onTitleClick}
          className="z-10 flex h-[300px] w-fit cursor-pointer select-none items-center justify-center overflow-hidden whitespace-nowrap bg-gradient-to-r from-zinc-500 to-zinc-500 bg-clip-text px-16 font-pacifico text-4xl text-transparent sm:text-6xl md:text-9xl"
        >
          Chency
        </h1>
        {/* 渐变填充文字 */}
        <motion.h1
          onClick={onTitleClick}
          animate={controls}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          className="absolute inset-0 z-20 flex h-[300px] w-fit cursor-pointer select-none items-center justify-center overflow-hidden whitespace-nowrap bg-gradient-to-r from-white via-pink-500 to-white bg-clip-text px-16 font-pacifico text-4xl text-transparent sm:text-6xl md:text-9xl"
        >
          Chency
        </motion.h1>
      </div>

      <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={500} />

      <div className="mt-16 animate-fade-in text-center">
        <h2 className="text-sm text-zinc-500">
          <Github className="mr-1 inline h-4 w-4" />
          <Link
            target="_blank"
            href="https://github.com/chency7"
            className="duration-500 hover:text-zinc-300 hover:underline"
          >
            chency.github
          </Link>
        </h2>
      </div>
    </div>
  );
}
