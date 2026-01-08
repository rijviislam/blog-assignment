"use client";
import { useParams } from "next/navigation";

export default function BlogDetails() {
  const params = useParams();

  console.log(params);
  return (
    <div className="text-center text-bold text-8xl">
      Blog Details Page : {params.id}
    </div>
  );
}
