"use client";

import { Footer } from "@/components/Footer";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { FaCode, FaUsers } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";

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
        <Image
          src={"/assets/logo_black.png"}
          width={100}
          height={100}
          alt="GronIT Logo"
        />
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
            <div className="content">
              <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4 h-20 w-20 flex items-center justify-center mx-auto">
                <FaCode size={40} />
              </div>
              <h2 className="text-2xl font-bold text-center">What We Do</h2>
              <p className="text-gray-400 mt-2 text-center">
                Empowering green computing through innovation and sustainable
                practices.
              </p>
            </div>
          </div>

          {/* Team Module */}
          <div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "col-span-1"
            }`}
          >
            <div className="content">
              <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4 h-20 w-20 flex items-center justify-center mx-auto">
                <FaUsers size={40} />
              </div>
              <h2 className="text-2xl font-bold">Our Team</h2>
              <p className="text-gray-400 mt-2">
                Meet the passionate individuals driving GronIT&apos;s mission
                forward.
              </p>
            </div>
          </div>

          {/* Event Module */}
          <div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "col-span-1"
            }`}
          >
            <div className="content">
              <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4 h-20 w-20 flex items-center justify-center mx-auto">
                <MdOutlineEventAvailable size={50} />
              </div>
              <h2 className="text-2xl font-bold">Events</h2>
              <p className="text-gray-400 mt-2">
                Stay updated on our latest workshops, seminars, and conferences.
              </p>
            </div>
          </div>

          {/* Blogs Module */}
          <div
            className={`module relative bg-black border rounded-xl border-gradient-to-r from-green-400 to-blue-500 p-6 hover:shadow-green-400/50 transition-all ${
              isMobile ? "col-span-1" : "row-start-2 row-span-2 col-start-2"
            }`}
          >
            <div className="content">
              <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4 h-20 w-20 flex items-center justify-center mx-auto">
                <BsLayoutTextWindowReverse size={40} />
              </div>
              <h2 className="text-2xl font-bold text-center">Blogs</h2>
              <p className="text-gray-400 mt-2 text-center">
                Explore insights and stories on sustainable computing.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
