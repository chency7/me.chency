import { getMusicList } from "@/util/getMusicList";
import { NextResponse } from "next/server";

export async function GET() {
  const musicList = getMusicList();
  return NextResponse.json(musicList);
}
