import React from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="module h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="rounded-gradient-bg w-full h-full content flex flex-col">
        {/* Blog Banner */}
        <motion.div className="relative w-full h-64 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={blog.imageUrl || "/assets/logo_black.png"}
            alt={blog.title}
            fill
            className="object-cover rounded-t-lg"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </motion.div>

        {/* Blog Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-center mb-3 line-clamp-2">{blog.title}</h2>
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm">By {blog.author}</p>
              <p className="text-gray-500 text-xs mt-1">{formattedDate}</p>
            </div>
            <p className="text-gray-300 text-center text-sm mb-4 line-clamp-3">
              {truncatedDescription}
            </p>
          </div>
          
          <div className="flex justify-center mt-auto">
            <Link
              href={`/blogs/${blog.id}`}
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-blue-500 text-white rounded-lg hover:scale-105 transition-transform text-center text-sm w-full max-w-32"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
