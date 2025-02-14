import { motion } from "framer-motion";
import { Calendar, Star, Award, Code } from "lucide-react";

const timelineItems = [
  {
    icon: <Calendar className="h-5 w-5" />,
    year: "2025",
    title: "当前",
    description: "探索 AI 与全栈开发的无限可能",
  },
  {
    icon: <Star className="h-5 w-5" />,
    year: "2023",
    title: "技术突破",
    description: "深入 Next.js 与 React 生态",
  },
  {
    icon: <Award className="h-5 w-5" />,
    year: "2022",
    title: "项目里程碑",
    description: "完成多个重要项目",
  },
  {
    icon: <Code className="h-5 w-5" />,
    year: "2017",
    title: "开发之始",
    description: "开始 Web 开发之旅",
  },
];

export default function Timeline() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-xl px-4 md:max-w-2xl lg:max-w-3xl">
        <div className="relative flex flex-col space-y-8 md:space-y-12">
          {/* 竖直线 - 调整高度和位置 */}
          <div className="absolute left-4 top-12 h-[calc(100%+1rem)] w-[2px] bg-gradient-to-b from-zinc-700/50 via-zinc-700/25 to-transparent md:left-5" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="flex items-start space-x-4 md:space-x-6"
            >
              {/* 图标 */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 * index }}
                className="relative z-10 flex-shrink-0"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-black text-zinc-400 transition-colors duration-300 group-hover:border-zinc-600 group-hover:text-zinc-300 md:h-10 md:w-10">
                  {item.icon}
                </div>
              </motion.div>

              {/* 内容卡片 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 * index }}
                className="group flex-grow rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 md:p-6"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-zinc-300 md:text-xl">{item.title}</h3>
                  <span className="text-sm text-zinc-500 md:text-base">{item.year}</span>
                </div>
                <p className="text-zinc-400">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
