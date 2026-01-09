import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers["Authorization"] = token;

    const res = await fetch("http://exam.kodevite.com/api/user", {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Unauthorized or failed to fetch user" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const error = err instanceof Error ? err : new Error("error");
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
