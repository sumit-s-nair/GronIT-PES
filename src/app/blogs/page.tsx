"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineArticle } from "react-icons/md";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blogs/BlogCard";
import axios from "axios";
import { Blog } from "@/models/Blog";

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const blogsResponse = await axios.get("/api/blogs");

      if (blogsResponse.data) setBlogs(blogsResponse.data);
    } catch (error) {
      console.error("Error fetching blogs/events:", error);
      alert("Failed to fetch blogs and events.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero */}
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-6 h-20 w-20 flex items-center justify-center">
          <MdOutlineArticle size={50} />
        </div>
        <h1 className="text-4xl mt-4 text-white font-bold uppercase">Blogs</h1>
        <p className="text-gray-400 text-lg mt-2 text-center max-w-3xl">
          Discover insights, trends, and stories in our curated collection of
          blog posts.
        </p>
      </motion.div>

      {/* Blog Cards */}
      <motion.main
        className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="blog-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.3,
              }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogsPage;
