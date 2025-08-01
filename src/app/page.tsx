"use client";

import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { FaCode, FaUsers } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { motion } from "framer-motion";

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
    <div className="flex flex-col min-h-screen text-white font-sans">
      {/* Top Section */}
      <header className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-black p-4 flex items-center justify-center mx-auto overflow-hidden">
          <Image
            src={"/assets/logo_black.png"}
            width={100}
            height={100}
            alt="GronIT Logo"
          />
        </div>
        <h1 className="text-5xl mt-4 text-white font-bold text-center">
          Welcome to Gron<span className="text-green-400">IT</span>
        </h1>
      </header>

      {/* Mid Section */}
      <main className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%] sm:max-w-[75%] lg:max-w-[60%]">
        {/* Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* About Module */}
          <motion.div
            className={`module relative bg-black ${
              isMobile ? "col-span-1" : isTablet ? "col-span-2" : "col-span-2"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="content">
              <Link href="/about">
                <div className="icon">
                  <FaCode size={40} />
                </div>
                <h2 className="text-2xl font-bold text-center">What We Do</h2>
                <p className="text-gray-400 mt-2 text-center">
                  Empowering green computing through innovation and sustainable
                  practices.
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Team Module */}
          <motion.div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "col-span-1"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="content">
              <Link href="/team" passHref>
                <div className="icon">
                  <FaUsers size={40} />
                </div>
                <h2 className="text-2xl font-bold">Our Team</h2>
                <p className="text-gray-400 mt-2">
                  Meet the passionate individuals driving GronIT&apos;s mission
                  forward.
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Event Module */}
          <motion.div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "col-span-1"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="content">
              <Link href="/events">
                <div className="icon">
                  <MdOutlineEventAvailable size={50} />
                </div>
                <h2 className="text-2xl font-bold">Events</h2>
                <p className="text-gray-400 mt-2">
                  Stay updated on our latest workshops, seminars, and
                  conferences.
                </p>
              </Link>
            </div>
          </motion.div>

          {/* Blogs Module */}
          <motion.div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "row-start-2 row-span-2 col-start-2"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="content">
              <Link href="/blogs">
                <div className="icon">
                  <BsLayoutTextWindowReverse size={40} />
                </div>
                <h2 className="text-2xl font-bold text-center">Blogs</h2>
                <p className="text-gray-400 mt-2 text-center">
                  Explore insights and stories on sustainable computing.
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
