"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; // Importing social media icons from react-icons

// Sample data for demonstration (replace with real data fetching)
const teamMembers = [
  {
    id: "1",
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    role: "Web Developer",
    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
  },
  {
    id: "2",
    image: "https://via.placeholder.com/150",
    name: "Jane Smith",
    role: "UI/UX Designer",
    socialLinks: {
      twitter: "https://twitter.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
  },
  {
    id: "3",
    image: "https://via.placeholder.com/150",
    name: "Alex Johnson",
    role: "Project Manager",
    socialLinks: {
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
    },
  },
];

const TeamDetailsPage: React.FC = () => {
  const { teamId } = useParams(); // Get the teamId from the URL

  // Find the team member based on the teamId
  const teamMember = teamMembers.find((member) => member.id === teamId);

  // Handle team member not found
  if (!teamMember) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Team Member Not Found</h1>
        <Link
          href="/team"
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Go Back to Team
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Team Member Header */}
      <div className="relative w-full h-96 mb-12">
        <div className="module bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src={teamMember.image}
              alt={teamMember.name}
              width={192}
              height={192}
              className="object-cover rounded-full border-4 border-white"
            />
          </div>
          <h1 className="text-4xl font-bold text-center">{teamMember.name}</h1>
          <p className="text-xl text-center text-gray-400 mt-2">{teamMember.role}</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]">
        <div className="mt-6 flex justify-center gap-8">
          <Link
            href={teamMember.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:scale-105 transition-transform"
          >
            <FaTwitter size={28} />
          </Link>
          <Link
            href={teamMember.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:scale-105 transition-transform"
          >
            <FaLinkedin size={28} />
          </Link>
          <Link
            href={teamMember.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:scale-105 transition-transform"
          >
            <FaGithub size={28} />
          </Link>
        </div>
      </div>

      {/* Back to Team */}
      <div className="flex justify-center p-6">
        <Link
          href="/team"
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Back to Team
        </Link>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
