import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch("http://exam.kodevite.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    console.log(response);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(" error");
    return NextResponse.json(
      { message: error.message || "Login fail" },
      { status: 500 }
    );
  }
}
