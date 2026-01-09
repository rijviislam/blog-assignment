"use client";

import Comment from "@/components/section/Comment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

interface CommentType {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: User;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
  comments: CommentType[];
}

export default function BlogDetails() {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}`);
      if (!res.ok) throw new Error(`Post not found (${res.status})`);
      const data = await res.json();
      setPost(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!postId) return;
    fetchPost();
  }, [postId]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${date
      .toLocaleString("en-US", { month: "long" })
      .toUpperCase()} ${date.getFullYear()}`;
  };

  if (loading)
    return (
      <div className="text-center py-20">
        <div className="flex justify-center items-center h-100">
          <span className="loader border-4 border-t-purple-500 border-gray-200 rounded-full w-12 h-12 animate-spin"></span>
        </div>
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!post) return <div className="text-center py-20">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        By {post.user.name} | Posted on {formatDate(post.created_at)}
      </p>
      <p className="mb-8">{post.content}</p>

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      <Comment comments={post.comments} onCommentChange={fetchPost} />
    </div>
  );
}
