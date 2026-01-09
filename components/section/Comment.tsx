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

interface CommentProps {
  comments?: Comment[];
  onCommentChange?: () => void;
}

export default function Comment({
  comments = [],
  onCommentChange,
}: CommentProps) {
  const params = useParams();
  const { user, token } = useUser();
  const postId = params.id;
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${date
      .toLocaleString("en-US", { month: "long" })
      .toUpperCase()} ${date.getFullYear()}`;
  };

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
      alert("Comment posted successfully!");

      // Refresh the page or call callback to reload comments
      if (onCommentChange) {
        onCommentChange();
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      console.error("Failed to post comment:", err);
      alert(err.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!token) {
      alert("Please log in to delete comments");
      return;
    }

    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    setDeletingId(commentId);

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to delete comment" }));
        throw new Error(errorData.message || "Failed to delete comment");
      }

      alert("Comment deleted successfully!");

      // Refresh the page or call callback to reload comments
      if (onCommentChange) {
        onCommentChange();
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      console.error("Failed to delete comment:", err);
      alert(err.message || "Failed to delete comment");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Comment Input */}
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

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="border-b pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{c.user.name}</p>
                  <p className="mt-1 text-gray-700">{c.content}</p>
                  <small className="text-gray-500 text-xs mt-2 block">
                    {formatDate(c.created_at)}
                  </small>
                </div>

                {/* Delete button - only show if current user is the comment author */}
                {user && user.id === c.user_id && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    disabled={deletingId === c.id}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {deletingId === c.id ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
