import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const cookie = request.headers.get("cookie");

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (authHeader) headers["Authorization"] = authHeader;
    if (cookie) headers["Cookie"] = cookie;

    const res = await fetch("http://exam.kodevite.com/api/logout", {
      method: "POST",
      headers,
      credentials: "include",
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("API /api/logout error:", err);
    return NextResponse.json(
      { message: err.message || "Logout failed" },
      { status: 500 }
    );
  }
}
