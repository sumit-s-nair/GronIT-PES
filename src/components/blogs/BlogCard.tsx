import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types";

export const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const truncatedDescription =
    blog.description.length > 75
      ? `${blog.description.slice(0, 75)}...`
      : blog.description;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="module">
      <div className="rounded-gradient-bg max-w-[400px] sm:max-w-[460px] w-full content">
        {/* Blog Banner */}
        <div className="relative w-full h-64">
          <Image
            src={blog.imageUrl || "/assets/logo_black.png"}
            alt={blog.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        {/* Blog Details */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center">{blog.title}</h2>
          <p className="text-gray-400 text-center mt-2">By {blog.author}</p>
          <p className="text-gray-500 text-center text-sm">{formattedDate}</p>
          <p className="text-gray-300 text-center mt-4">
            {truncatedDescription}
          </p>
          <div className="flex justify-center gap-16 mt-6">
            <Link
              href={`/blogs/${blog.id}`}
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-blue-500 text-white rounded-lg hover:scale-105 transition-transform w-30 text-center"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
