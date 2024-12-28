"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Sample data for demonstration (replace with real data fetching)
const blogs = [
  {
    id: "1",
    image: "https://via.placeholder.com/800x400",
    title: "Blog Post 1",
    author: "Author A",
    date: "2023-12-01",
    description: "An introduction to the latest trends in web development.",
    content: "This is the detailed content of Blog Post 1...",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/800x400",
    title: "Blog Post 2",
    author: "Author B",
    date: "2023-12-10",
    description: "Exploring sustainability through tech innovation.",
    content: "This is the detailed content of Blog Post 2...",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/800x400",
    title: "Blog Post 3",
    author: "Author C",
    date: "2023-12-20",
    description: "How to master design principles for modern UI/UX.",
    content: "This is the detailed content of Blog Post 3...",
  },
];

const BlogDetailsPage: React.FC = () => {
  const { blogId } = useParams();

  // Find the blog based on the blogId
  const blog = blogs.find((b) => b.id === blogId);

  // Handle blog not found
  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Blog Not Found</h1>
        <Link
          href="/blogs"
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Go Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Blog Header */}
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <p className="text-gray-400 mt-2">
            By {blog.author} on {blog.date}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]">
        <p className="text-gray-400 text-lg">{blog.description}</p>
        <div className="mt-6 text-gray-300 leading-relaxed">{blog.content}</div>
      </div>

      {/* Back to Blogs */}
      <div className="flex justify-center p-6">
        <Link
          href="/blogs"
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
