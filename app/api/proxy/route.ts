import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://v1.hitokoto.cn/", {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
