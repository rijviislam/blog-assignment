"use client";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { useState } from "react";

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: User;
}

export default function Comment() {
  const params = useParams();
  const { user, token } = useUser();
  const postId = params.id;
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCommentSubmit = async () => {
    if (!user || !token) {
      console.error("User not authenticated");
      alert("Please log in to post a comment");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to post comment" }));
        throw new Error(errorData.message || "Failed to post comment");
      }

      const data = await res.json();

      setCommentContent("");
      return data;
    } catch (err: any) {
      console.error("Failed to post comment:", err);
      alert(err.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {user && token ? (
        <div className="mb-6 flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full resize-none"
            rows={3}
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            disabled={submitting}
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-purple-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            disabled={submitting || !commentContent.trim()}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      ) : (
        <p className="mb-6 text-gray-500">Please log in to post a comment.</p>
      )}
    </div>
  );
}
