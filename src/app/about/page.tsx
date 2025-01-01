"use client";

import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white font-sans">
      {/* Top Section */}
      <header className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-green-500 to-blue-500 shadow-lg">
        <Image
          src={"/assets/logo_black.png"}
          width={120}
          height={120}
          alt="GronIT Logo"
          className="rounded-full shadow-2xl border-4 border-white"
        />
        <h1 className="text-6xl mt-6 font-extrabold text-white drop-shadow-xl tracking-wide">
          About GronIT
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto p-6 sm:p-12 max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-6 text-green-400 underline decoration-dotted decoration-green-500">
            About Us
          </h2>
          <p className="text-gray-300 text-lg text-center leading-relaxed hover:scale-105 transition-transform">
            GronIT is the Green Computing Club established under the Department
            of Computer Science and Engineering at PES University, RR Campus.
            The club is dedicated to promoting sustainable practices in
            technology and fostering environmental consciousness within the
            university community. Through its activities, GronIT aims to raise
            awareness about environmental issues related to computing, advocate
            for energy-efficient technologies, and encourage the proper disposal
            and recycling of electronic devices to minimize waste. The club also
            collaborates with industry partners to explore innovative solutions
            for sustainable computing while engaging students and the community
            through workshops, events, and outreach programs.
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-400 underline decoration-dotted decoration-blue-500">
            Our Vision
          </h2>
          <p className="text-gray-300 text-lg text-center leading-relaxed hover:scale-105 transition-transform">
            GronIT aligns its initiatives with PES University’s values of
            stewardship and innovation, empowering students to reduce the
            environmental impact of technology and take meaningful steps toward
            a greener, more sustainable future.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-6 text-green-400 underline decoration-dotted decoration-green-500">
            Our Objectives
          </h2>
          <p className="text-gray-300 text-lg text-center leading-relaxed hover:scale-105 transition-transform">
            Raise awareness about environmental issues in computing. Promote
            energy efficiency and adoption of energy-saving technologies.
            Advocate for proper disposal and recycling of electronic devices.
            Collaborate with industry partners for sustainable computing
            solutions. Engage the community through workshops, events, and
            educational campaigns. Promote sustainable computing practices like
            virtualization, cloud computing, and resource optimization.
          </p>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-6 text-blue-400 underline decoration-dotted decoration-blue-500">
            Get in Touch
          </h2>
          <p className="text-gray-300 text-lg text-center leading-relaxed hover:scale-105 transition-transform">
            Have questions or want to collaborate? Reach out to us at
            <Link
              href="mailto:gronit@pes.edu"
              className="text-blue-300 hover:text-blue-500 hover:underline mx-1"
            >
              gronit@pes.edu
            </Link>
            . We&apos;d love to hear from you!
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
