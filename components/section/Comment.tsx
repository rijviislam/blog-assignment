"use client";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

interface CommentFormData {
  content: string;
}

export default function Comment({
  comments = [],
  onCommentChange,
}: CommentProps) {
  const params = useParams();
  const { user, token } = useUser();
  const postId = params.id;
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${date
      .toLocaleString("en-US", { month: "long" })
      .toUpperCase()} ${date.getFullYear()}`;
  };

  const onSubmit = async (data: CommentFormData) => {
    if (!user || !token) {
      console.error("User not authenticated");
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
        body: JSON.stringify({ content: data.content }),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to post comment" }));
        throw new Error(errorData.message || "Failed to post comment");
      }

      reset();

      if (onCommentChange) {
        onCommentChange();
      } else {
        window.location.reload();
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Failed to post comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!token) {
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

      if (onCommentChange) {
        onCommentChange();
      } else {
        window.location.reload();
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Failed to delete comment:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {user && token ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 flex flex-col gap-2"
        >
          <textarea
            {...register("content", {
              required: "Comment cannot be empty",
              minLength: {
                value: 1,
                message: "Comment must be at least 1 character",
              },
              maxLength: {
                value: 500,
                message: "Comment cannot exceed 500 characters",
              },
            })}
            className="border rounded p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            placeholder="Write a comment..."
            disabled={submitting}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
          <button
            type="submit"
            className="bg-purple-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="mb-6 text-gray-500">Please log in to post a comment.</p>
      )}

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

                {user && user.id === c.user_id && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    disabled={deletingId === c.id}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
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
