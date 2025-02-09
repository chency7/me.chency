import { useState, useEffect, useRef, useCallback } from "react";
import type { MusicInfo } from "../getMusicList";

interface UseAudioPlayerProps {
  musicList: MusicInfo[];
  autoPlay?: boolean;
  loop?: boolean;
}

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  isMuted: boolean;
  currentMusic: MusicInfo;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  songName: string;
}

export function useAudioPlayer({
  musicList,
  autoPlay = false,
  loop = true,
}: UseAudioPlayerProps): UseAudioPlayerReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(!autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false); // 用于记录切换前的播放状态

  const currentMusic = musicList[currentIndex];

  useEffect(() => {
    if (currentMusic) {
      // 保存当前播放状态
      wasPlayingRef.current = isPlaying;

      // 暂停并清理当前音频
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // 创建新的音频实例
      audioRef.current = new Audio(currentMusic.path);
      audioRef.current.loop = loop;

      // 如果之前在播放，则自动播放新音频
      if (wasPlayingRef.current) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
          setIsMuted(true);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentMusic, loop, isPlaying]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsMuted(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % musicList.length);
  }, [musicList.length]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + musicList.length) % musicList.length);
  }, [musicList.length]);

  return {
    isPlaying,
    isMuted,
    currentMusic,
    play,
    pause,
    toggle,
    next,
    previous,
    songName: currentMusic?.name.split("-")[1]?.trim() || currentMusic?.name || "",
  };
}
