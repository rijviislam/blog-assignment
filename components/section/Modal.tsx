"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="cursor-pointer">
        Create Post
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  value="title"
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                  value={"content"}
                  // onChange={(e) => setContent(e.target.value)}
                  className="w-full border rounded p-2"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>

                <Button type="submit" className="cursor-pointer">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
