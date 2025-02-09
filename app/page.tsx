import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Github } from "lucide-react";

const navigation = [
  { name: "项目", href: "/views/projects" },
  { name: "博客", href: "/views/contact" },
  { name: "娱乐", href: "/views/contact" },
];

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/10 to-black">
      <nav className="mb-40 animate-fade-in duration-500">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="duration-400 text-sm text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="animate-glow mb-10 hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      <div className="relative">
        <h1 className="z-10 h-[200px] animate-typing select-none overflow-hidden whitespace-nowrap bg-gradient-to-r from-white via-pink-500 to-white bg-clip-text px-1 font-pacifico  text-5xl text-transparent sm:text-6xl md:text-9xl">
          Chency
        </h1>
      </div>

      <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      {/* 背景 */}
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={500} />

      {/* 链接 */}
      <div className="mb-16 animate-fade-in text-center">
        <h2 className="mt-40 animate-fade-in text-sm text-zinc-500">
          <Github className="mr-1 inline h-4 w-4" />
          <Link
            target="_blank"
            href="https://github.com/chency7"
            className="duration-500 hover:text-zinc-300 hover:underline"
          >
            chency.github
          </Link>{" "}
        </h2>
      </div>
    </div>
  );
}
