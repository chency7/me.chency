import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ThemeNiceProps {
  onBack?: () => void;
}

export default function ThemeNice({ onBack }: ThemeNiceProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBack) {
      console.log("Button clicked"); // 调试日志
      onBack();
    }
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black">
      <motion.button
        onClick={handleClick}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute left-8 top-8 z-50 flex cursor-pointer items-center gap-2 text-white/50 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="text-sm">返回</span>
      </motion.button>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.4, 0, 0.2, 1],
          times: [0, 0.5, 1],
        }}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.5,
        }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent"
      />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.8,
        }}
        className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-gray-100 to-white shadow-2xl"
      />
    </div>
  );
}
