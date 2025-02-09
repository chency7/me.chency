import { useState, useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";
import { setTimeout } from "timers";

const FONTS = [
  { name: "Pacifico", weight: 400 },
  { name: "Inter", weight: 400 },
  { name: "LXGW WenKai", weight: 400 },
  { name: "Cal Sans", weight: 400 },
] as const;

const TIMEOUT = 10000;
const ONE_DAY = 24 * 60 * 60 * 1000;
const RETRY_DELAY = 1000;
const MAX_RETRIES = 3;

export function useFontLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCachedFonts = () => {
      const fontLoadedBefore = localStorage.getItem("fontLoaded");
      const lastLoadTime = localStorage.getItem("fontLoadTime");
      return fontLoadedBefore && lastLoadTime && Date.now() - Number(lastLoadTime) < ONE_DAY;
    };

    const loadFont = async (font: (typeof FONTS)[number]) => {
      const observer = new FontFaceObserver(font.name, { weight: font.weight });

      for (let i = 0; i < MAX_RETRIES; i++) {
        try {
          await observer.load(null, TIMEOUT);
          console.log(`Font ${font.name} loaded successfully`);
          return true;
        } catch (error) {
          if (i === MAX_RETRIES - 1) {
            console.warn(`Failed to load font ${font.name}: ${error}`);
            return false;
          }
          console.warn(`Retry ${i + 1} loading font ${font.name}`);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
      }
    };

    const loadAllFonts = async () => {
      if (checkCachedFonts()) {
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(FONTS.map(loadFont));
        const allLoaded = results.every(Boolean);

        if (allLoaded) {
          localStorage.setItem("fontLoaded", "true");
          localStorage.setItem("fontLoadTime", Date.now().toString());
        }
      } catch (error) {
        console.warn(`Font loading error: ${error}`);
      } finally {
        setTimeout(() => setLoading(false), RETRY_DELAY);
      }
    };

    loadAllFonts();
    return () => setLoading(false);
  }, []);

  return loading;
}
