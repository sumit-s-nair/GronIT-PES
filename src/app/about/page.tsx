"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaRecycle,
  FaHandshake,
  FaUsers,
  FaCloud,
} from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen text-white font-sans">
      {/* Header */}
      <Header />

      {/* Top Section */}
      <motion.section 
        className="px-6 sm:px-12 py-12 md:py-20 max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-4xl md:text-6xl font-extrabold tracking-wide"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            GronIT
          </h1>
        </motion.div>
        <motion.p 
          className="text-gray-300 mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Promoting sustainable practices in technology and fostering
          environmental consciousness within the PES University community.
        </motion.p>
      </motion.section>

      {/* Main Content */}
      <main className="flex-1 mx-auto p-6 sm:p-12 max-w-5xl space-y-20">
        {/* About Section */}
        <motion.section 
          className="flex flex-col sm:flex-row items-center gap-12"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="sm:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-4">
              About Us
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              GronIT is the Green Computing Club established under the
              Department of Computer Science and Engineering at PES University,
              RR Campus. The club is dedicated to promoting sustainable
              practices in technology and fostering environmental consciousness
              within the university community.
            </p>
          </div>
          <motion.div
            className="sm:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image
              src="/assets/logo_black.png"
              alt="About GronIT"
              width={500}
              height={300}
              className="rounded-lg shadow-md object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.section>

        {/* Vision Section */}
        <motion.section 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">
            Our Vision
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            GronIT aligns its initiatives with PES University&apos;s values of
            stewardship and innovation, empowering students to reduce the
            environmental impact of technology and take meaningful steps toward
            a greener, more sustainable future.
          </p>
        </motion.section>

        {/* Objectives Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-400 text-center mb-12">
            Our Objectives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaEarthAmericas className="text-green-400 text-4xl" />,
                text: "Raise awareness about environmental issues in computing.",
              },
              {
                icon: <FaBolt className="text-green-400 text-4xl" />,
                text: "Promote energy efficiency and adoption of energy-saving technologies.",
              },
              {
                icon: <FaRecycle className="text-green-400 text-4xl" />,
                text: "Advocate for proper disposal and recycling of electronic devices.",
              },
              {
                icon: <FaHandshake className="text-green-400 text-4xl" />,
                text: "Collaborate with industry partners for sustainable computing solutions.",
              },
              {
                icon: <FaUsers className="text-green-400 text-4xl" />,
                text: "Engage the community through workshops, events, and educational campaigns.",
              },
              {
                icon: <FaCloud className="text-green-400 text-4xl" />,
                text: "Promote sustainable computing practices like virtualization, cloud computing, and resource optimization.",
              },
            ].map((objective, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-300 flex flex-col items-center text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {objective.icon}
                <p className="text-lg leading-relaxed">{objective.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="text-center p-6 bg-sky-800 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-300 text-lg">
            Have questions or want to collaborate? Reach out to us at{" "}
            <Link
              href="mailto:gronit@pes.edu"
              className="text-blue-100 hover:text-blue-300 hover:underline"
            >
              gronit@pes.edu
            </Link>
            .
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
