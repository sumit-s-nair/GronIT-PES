"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
      <section className="px-6 sm:px-12 py-12 md:py-20 max-w-7xl mx-auto text-center">
        <div className="text-4xl md:text-6xl font-extrabold tracking-wide">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            GronIT
          </h1>
        </div>
        <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Promoting sustainable practices in technology and fostering
          environmental consciousness within the PES University community.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 mx-auto p-6 sm:p-12 max-w-5xl space-y-20">
        {/* About Section */}
        <section className="flex flex-col sm:flex-row items-center gap-12">
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
          <Image
            src="/assets/logo_black.png"
            alt="About GronIT"
            width={500}
            height={300}
            className="rounded-lg shadow-md object-cover sm:w-1/2"
          />
        </section>

        {/* Vision Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400">
            Our Vision
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            GronIT aligns its initiatives with PES University’s values of
            stewardship and innovation, empowering students to reduce the
            environmental impact of technology and take meaningful steps toward
            a greener, more sustainable future.
          </p>
        </section>

        {/* Objectives Section */}
        <section>
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
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-300 flex flex-col items-center text-center space-y-4"
              >
                {objective.icon}
                <p className="text-lg leading-relaxed">{objective.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center p-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-xl">
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
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
