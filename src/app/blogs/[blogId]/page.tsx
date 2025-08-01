"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types";

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
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center text-white bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Loading...</h1>
      </motion.div>
    );
  }

  // Handle error or blog not found
  if (error || !blog) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center text-white bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Blog Not Found</h1>
        <Link
          href="/blogs"
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Go Back to Blogs
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-black text-white font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Blog Header */}
      <motion.div
        className="relative w-full h-64 sm:h-96 flex items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={blog.imageUrl || "/assets/logo_black.png"}
          alt={blog.title}
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6 rounded-b-lg">
          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-400 text-lg">By {blog.author}</span>
            {blog.createdAt && (
              <span className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-200 border border-gray-600 font-medium">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Blog Content */}
      <motion.div
        className="flex-1 mx-auto p-6 sm:p-16 max-w-[900px] w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mt-6 text-gray-300 leading-relaxed prose prose-invert max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\r\n/g, "<br/>"),
            }}
          />
        </div>
      </motion.div>

      {/* Back to Blogs */}
      <motion.div
        className="flex justify-center p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/blogs"
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Back to Blogs
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default BlogDetailsPage;
