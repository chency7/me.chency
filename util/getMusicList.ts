import fs from "fs";
import path from "path";

export interface MusicInfo {
  name: string;
  path: string;
}

export function getMusicList(): MusicInfo[] {
  const musicDir = path.join(process.cwd(), "public/music");
  const files = fs.readdirSync(musicDir);

  return files
    .filter((file) => /\.(mp3|wav|ogg)$/.test(file))
    .map((file) => ({
      name: file.split(".")[0],
      path: `/music/${file}`,
    }));
}
