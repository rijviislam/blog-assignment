"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Inputs = {
  title: string;
  content: string;
};
export default function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://exam.kodevite.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Success:", result);
      setIsOpen(false);
      alert("Form submitted successfully!");

      reset();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit form.");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer bg-purple-300 text-black font-bold hover:bg-purple-200"
      >
        Create Post
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <Input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Title"
                  {...register("title", { required: true })}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Content"
                  {...register("content", { required: true })}
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
