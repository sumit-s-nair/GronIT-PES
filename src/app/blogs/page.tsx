"use client";

import React from "react";
import { MdOutlineArticle } from "react-icons/md";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/blogs/BlogCard";

// Blog data
const blogs = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "Blog Post 1",
    author: "Author A",
    date: "2023-12-01",
    description: "An introduction to the latest trends in web development.",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Blog Post 2",
    author: "Author B",
    date: "2023-12-10",
    description: "Exploring sustainability through tech innovation.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "Blog Post 3",
    author: "Author C",
    date: "2023-12-20",
    description: "How to master design principles for modern UI/UX.",
  },
];

const BlogsPage: React.FC = () => {
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
              key={blog.id}
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
