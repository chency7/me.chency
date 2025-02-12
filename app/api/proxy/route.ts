import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://v1.hitokoto.cn/", {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }
    const data = await response.json();
    console.log("NextResponse", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.error();
  }
}
