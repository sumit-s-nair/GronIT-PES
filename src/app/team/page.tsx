"use client";

import React from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";

// Sample team member data
const teamMembers = [
  {
    _id: "1",
    image: "https://via.placeholder.com/150",
    name: "User1",
    domain: "Software Engineer", // Added domain
    socialLinks: {
      twitter: "https://twitter.com/User1",
      linkedin: "https://linkedin.com/in/User1",
      github: "https://github.com/User1",
    },
  },
  {
    _id: "2",
    image: "https://via.placeholder.com/150",
    name: "Jane Smith",
    domain: "Product Manager", // Added domain
    socialLinks: {
      twitter: "https://twitter.com/User2",
      linkedin: "https://linkedin.com/in/User2",
      github: "https://github.com/User2",
    },
  },
  {
    _id: "3",
    image: "https://via.placeholder.com/150",
    name: "Sam Wilson",
    domain: "Designer", // Added domain
    socialLinks: {
      twitter: "https://twitter.com/User3",
      linkedin: "https://linkedin.com/in/User3",
      github: "https://github.com/User3",
    },
  },
];

const TeamPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Icon rendering */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-6 h-20 w-20 flex items-center justify-center">
          <FaUsers size={50} color="white" />
        </div>
        <h1 className="text-4xl mt-4 text-white font-bold uppercase">
          Meet Our Team
        </h1>
        <p className="text-gray-400 text-lg mt-2 text-center max-w-3xl">
          Our team is passionate about innovation and working towards creating
          positive change in the world.
        </p>
      </motion.div>

      {/* Team Member Cards Section */}
      <motion.main
        className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              className="team-member-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.3,
              }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </div>
      </motion.main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default TeamPage;
