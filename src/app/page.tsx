"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
        setIsTablet(false);
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setIsMobile(false);
        setIsTablet(true);
      } else {
        setIsMobile(false);
        setIsTablet(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Top Section */}
      <header className="flex flex-col items-center justify-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-400"
        >
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon>
        </svg>
        <h1 className="text-4xl mt-4 text-white">Welcome to GronIT</h1>
      </header>

      {/* Mid Section */}
      <main className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
        {/* Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Home Module */}
          <div
            className={`module relative bg-black ${
              isMobile ? "col-span-1" : isTablet ? "col-span-2" : "col-span-2"
            }`}
          >
            <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="text-white w-12 h-12"
              >
                <polygon
                  points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center">What We Do</h2>
            <p className="text-gray-400 mt-2 text-center">
              Empowering green computing through innovation and sustainable
              practices.
            </p>
          </div>

          {/* Team Module */}
          <div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "col-span-1"
            }`}
          >
            <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="text-white w-8 h-8"
              >
                <polygon
                  points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Our Team</h2>
            <p className="text-gray-400 mt-2">
              Meet the passionate individuals driving GronIT&apos;s mission
              forward.
            </p>
          </div>

          {/* Event Module */}
          <div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "col-span-1"
            }`}
          >
            <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="text-white w-8 h-8"
              >
                <polygon
                  points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Events</h2>
            <p className="text-gray-400 mt-2">
              Stay updated on our latest workshops, seminars, and conferences.
            </p>
          </div>

          {/* Blogs Module */}
          <div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "row-start-2 row-span-2 col-start-2"
            }`}
          >
            <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="text-white w-8 h-8"
              >
                <polygon
                  points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center">Blogs</h2>
            <p className="text-gray-400 mt-2 text-center">
              Explore insights and stories on sustainable computing.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-wrap justify-between items-center px-6 py-4 border-t border-gray-800">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} GronIT. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-white"
          >
            <FaInstagram size={28} />
          </Link>
          <Link
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-white"
          >
            <FaLinkedin size={28} />
          </Link>
          <Link
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-white "
          >
            <FaGithub size={28} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
