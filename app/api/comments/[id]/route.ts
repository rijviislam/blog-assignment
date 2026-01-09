import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header required" },
        { status: 401 }
      );
    }

    const res = await fetch(`http://exam.kodevite.com/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: authHeader,
      },
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "failed to delete comment" }));
      return NextResponse.json(
        { message: errorData.message || "failed to delete comment" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(" error");
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
