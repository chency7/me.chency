import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Code, Brush, Music, Coffee, X, Gamepad2 } from "lucide-react";
import Quote from "../Quote";
import Timeline from "./modules/timeline";

interface ThemeNiceProps {
  onBack?: () => void;
}

const cards = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "编程",
    description: "探索代码的世界",
    color: "from-zinc-900/80 to-zinc-800/80",
    details: {
      title: "技术栈",
      items: ["Next.js", "React", "TypeScript", "Node.js", "WebGL", "Vue"],
      bgColor: "from-zinc-900/90 to-zinc-800/90",
    },
  },
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: "游戏",
    description: "虚拟世界的冒险",
    color: "from-zinc-800/80 to-zinc-700/80",
    details: {
      title: "游戏开发",
      items: ["Unity", "Three.js", "WebGL", "游戏设计", "关卡设计"],
      bgColor: "from-zinc-800/90 to-zinc-700/90",
    },
  },
  {
    icon: <Brush className="h-6 w-6" />,
    title: "设计",
    description: "追求视觉的美感",
    color: "from-zinc-900/80 to-zinc-800/80",
    details: {
      title: "设计工具",
      items: ["Figma", "Photoshop", "After Effects", "Blender"],
      bgColor: "from-zinc-900/90 to-zinc-800/90",
    },
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: "音乐",
    description: "感受旋律的律动",
    color: "from-zinc-800/80 to-zinc-700/80",
    details: {
      title: "音乐领域",
      items: ["作曲", "编曲", "混音", "乐器演奏"],
      bgColor: "from-zinc-800/90 to-zinc-700/90",
    },
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "生活",
    description: "品味生活的美好",
    color: "from-zinc-900/80 to-zinc-800/80",
    details: {
      title: "生活方式",
      items: ["摄影", "旅行", "美食", "阅读"],
      bgColor: "from-zinc-900/90 to-zinc-800/90",
    },
  },
];

export default function ThemeNice({ onBack }: ThemeNiceProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-center overflow-y-auto overflow-x-hidden bg-gradient-to-br from-black">
      {/* 头部固定区域 */}
      <div className="sticky top-0 z-50 flex w-full min-w-full items-center bg-black/30 px-4 pt-[20px] backdrop-blur-sm">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex cursor-pointer items-center gap-2 text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
          <span className="text-sm">返回</span>
        </motion.button>
      </div>

      {/* 内容容器 */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-8 md:px-8">
        {/* 卡片网格 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * index }}
              onClick={() => handleCardClick(index)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`group relative flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-zinc-800/50 bg-gradient-to-br ${card.color} p-4 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 sm:h-48 md:p-6`}
            >
              {/* 悬浮时的边框发光效果 */}
              <motion.div
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 rounded-xl border border-zinc-400/20"
              />

              {/* 图标 */}
              <motion.div
                animate={{
                  y: hoveredIndex === index ? -6 : 0,
                }}
                transition={{ type: "spring", stiffness: 400 }}
                className="pointer-events-none mb-4 text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200"
              >
                {card.icon}
              </motion.div>

              {/* 标题和描述 */}
              <motion.h3
                animate={{
                  y: hoveredIndex === index ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none mb-2 text-lg font-medium text-zinc-300 transition-colors duration-300 group-hover:text-white"
              >
                {card.title}
              </motion.h3>

              <motion.p
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none text-center text-sm text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400"
              >
                {card.description}
              </motion.p>

              {/* 悬浮时的背景效果 */}
              <motion.div
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-t from-zinc-700/20 via-zinc-700/10 to-transparent"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 时间轴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-4 flex w-full justify-start px-4 md:mt-24 md:px-8 lg:px-16"
        >
          <Timeline />
        </motion.div>

        {/* Quote 组件 - 在移动端隐藏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-1 hidden w-full max-w-4xl px-4 md:mt-2 md:block"
        >
          <Quote interval={50000} />
        </motion.div>
      </div>

      {/* 弹窗 */}
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`relative max-h-[80vh] w-full overflow-y-auto rounded-2xl bg-gradient-to-br ${cards[selectedCard].details.bgColor} p-6 shadow-2xl md:max-w-2xl md:p-8`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(null);
                }}
                className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              <div className="flex items-center gap-4 text-white/90">
                {cards[selectedCard].icon}
                <h2 className="text-xl font-bold md:text-2xl">
                  {cards[selectedCard].details.title}
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cards[selectedCard].details.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-lg bg-white/10 p-4 text-sm text-white/80 backdrop-blur-sm md:text-base"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部渐变 */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/100 to-transparent"
      />
    </div>
  );
}
