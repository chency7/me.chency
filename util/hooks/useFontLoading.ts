import { useState, useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";
import { setTimeout } from "timers";

export function useFontLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查 localStorage 中是否有字体加载记录
    const fontLoadedBefore = localStorage.getItem("fontLoaded");
    const lastLoadTime = localStorage.getItem("fontLoadTime");
    const ONE_DAY = 24 * 60 * 60 * 1000; // 一天的毫秒数

    // 如果字体已加载且在24小时内，直接返回
    if (fontLoadedBefore && lastLoadTime && Date.now() - Number(lastLoadTime) < ONE_DAY) {
      setLoading(false);
      return;
    }

    const loadFonts = async () => {
      try {
        const fonts = [
          { name: "Pacifico", observer: new FontFaceObserver("Pacifico") },
          { name: "Inter", observer: new FontFaceObserver("Inter") },
          { name: "LXGW WenKai", observer: new FontFaceObserver("LXGW WenKai") },
          { name: "Cal Sans", observer: new FontFaceObserver("Cal Sans") },
        ];

        // 使用 Promise.all 而不是 allSettled，确保所有字体都加载成功
        await Promise.all(
          fonts.map(async (font) => {
            try {
              await font.observer.load(null, 5000); // 增加超时时间到 5 秒
              console.log(`Font ${font.name} loaded successfully`);
            } catch (error) {
              console.error(`Failed to load font ${font.name}:`, error);
              throw error; // 重新抛出错误以触发整体的 catch 块
            }
          })
        );

        // 所有字体加载成功后，更新 localStorage
        localStorage.setItem("fontLoaded", "true");
        localStorage.setItem("fontLoadTime", Date.now().toString());
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Font loading error:", error);
        // 加载失败时，清除之前的记录
        localStorage.removeItem("fontLoaded");
        localStorage.removeItem("fontLoadTime");
        // 仍然设置 loading 为 false，但不缓存结果
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    loadFonts();

    // 清理函数
    return () => {
      // 如果组件卸载时字体还没加载完，不要更新 state
      setLoading(false);
    };
  }, []);

  return loading;
}
