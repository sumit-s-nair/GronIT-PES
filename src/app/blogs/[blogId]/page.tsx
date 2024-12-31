"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/models/Blog";

const BlogDetailsPage: React.FC = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/blogs/getBlog?blogId=${blogId}`, {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error("Blog not found");
          }
          const data = await response.json();
          setBlog(data);
        } catch {
          setError("Failed to fetch blog details");
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [blogId]);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Handle error or blog not found
  if (error || !blog) {
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

  const imageDataURL = blog.image
    ? `data:${blog.imageType};base64,${Buffer.from(blog.image).toString(
        "base64"
      )}`
    : "/assets/logo_black.png";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Blog Header */}
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src={imageDataURL}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <p className="text-gray-400 mt-2">By {blog.author}</p>
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
