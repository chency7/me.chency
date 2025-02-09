"use client";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "@/util/hooks/useAudioPlayer";
import { ScrollingText } from "./ScrollingText";
import { useEffect, useState, useRef } from "react";
import type { MusicInfo } from "@/util/getMusicList";
import { throttle } from "lodash";

export default function MusicPlayer() {
  const [musicList, setMusicList] = useState<MusicInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 加载状态
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const { isPlaying, isMuted, toggle, next, previous, songName, currentMusic } = useAudioPlayer({
    musicList,
    autoPlay: false,
    loop: true,
  });

  useEffect(() => {
    fetch("/api/music")
      .then((res) => res.json())
      .then(setMusicList)
      .catch((error) => {
        console.error("Failed to load music list:", error);
        console.error("无法加载音乐列表，请稍后重试！");
      });
  }, []);

  useEffect(() => {
    if (currentMusic) {
      setIsLoading(true); // 开始加载音频

      // 初始化音频对象
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.preload = "metadata"; // 预加载元数据
      }

      const audio = audioRef.current;

      // 初始化 Web Audio API
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.AudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.value = 0.7; // 设置初始音量
      }

      const audioContext = audioContextRef.current;

      // 更新音频路径
      audio.src = currentMusic.path;

      // 懒加载音频文件
      audio.load(); // 强制重新加载音频文件
      audio.oncanplaythrough = () => {
        setIsLoading(false); // 音频加载完成
      };

      // 如果音频上下文处于暂停状态，则恢复
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // 创建音频源（仅在首次或切换歌曲时创建）
      if (!sourceRef.current) {
        sourceRef.current = audioContext.createMediaElementSource(audio);
        if (gainNodeRef.current) {
          sourceRef.current.connect(gainNodeRef.current).connect(audioContext.destination);
        }
      }

      // 错误处理
      audio.onerror = () => {
        setIsLoading(false);
        console.error("音频加载失败");
        alert(`无法加载音频：${currentMusic.name}`);
      };

      // 减少不必要的重渲染
      const handleTimeUpdate = throttle(() => {
        // 更新进度逻辑（如果有需要）
      }, 1000);

      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        handleTimeUpdate.cancel();
      };
    }
  }, [currentMusic]);

  useEffect(() => {
    return () => {
      // 清理所有音频资源
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // 清空音频路径
        audioRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error); // 关闭音频上下文
        audioContextRef.current = null;
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect(); // 断开音频源
        sourceRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect(); // 断开增益节点
        gainNodeRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <button
        onClick={toggle}
        className="fixed right-4 top-4 z-50 rounded-full p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-100"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 flex w-60 items-center gap-4 overflow-hidden rounded-full bg-zinc-900/90 px-4 py-2 text-zinc-400 shadow-lg backdrop-blur-sm"
          >
            <button
              onClick={previous}
              className="rounded-full p-1 hover:bg-zinc-800 hover:text-zinc-200"
            >
              <ChevronLeft size={16} />
            </button>
            {/* 声波动画 */}
            <div className="mr-[16px] flex h-4 items-end gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-full w-[2px] bg-pink-400 will-change-transform" // 提升动画性能
                  animate={{
                    height: ["40%", "90%", "40%"],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            {/* 歌曲名字 */}
            <div className="w-16 whitespace-nowrap">
              {/* 加载状态 */}
              {isLoading ? (
                <div className="ml-2 text-xs text-zinc-400">加载中...</div>
              ) : (
                <ScrollingText text={songName} className="text-sm font-medium" />
              )}
            </div>
            <button
              onClick={next}
              className="rounded-full p-1 hover:bg-zinc-800 hover:text-zinc-200"
            >
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
