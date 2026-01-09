import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://exam.kodevite.com/api/posts");
    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch Posts" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("API /api/posts error:", err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
