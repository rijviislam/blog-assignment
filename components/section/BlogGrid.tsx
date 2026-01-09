"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface User {
  id: number;
  name: string;
}

interface Blog {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  comments_count: number;
  user: User;
}

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // loading state

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setBlogs(data.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        {/* spinner */}
        <span className="loader border-4 border-t-purple-500 border-gray-200 rounded-full w-12 h-12 animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/posts/${blog.id}`} className="w-full">
            <Card className="h-[400px] flex flex-col bg-purple-100 overflow-hidden">
              <CardHeader className="flex flex-col h-full p-4 justify-between">
                <CardTitle className="text-xl font-bold line-clamp-1 mb-2">
                  {blog.title}
                </CardTitle>

                <CardDescription className="text-base mb-2 line-clamp-[12]">
                  {blog.content}
                </CardDescription>

                <small className="text-gray-500 mt-2">
                  By: {blog.user.name} | Posted on:{" "}
                  {formatDate(blog.created_at)}
                </small>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
