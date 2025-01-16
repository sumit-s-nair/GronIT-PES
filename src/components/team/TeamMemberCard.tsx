import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

// Define the types for the props
interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

interface TeamMember {
  _id: string; // Use `string` as MongoDB IDs are strings
  image: string; // Image as a valid URL or Base64 string
  name: string;
  socialLinks: SocialLinks;
}

export const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures the code only runs on the client-side
    setIsClient(true);
  }, []);

  // If not on client-side, return null to avoid mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div
      className="module max-w-lg p-8 rounded-lg shadow-xl text-center"
      style={{
        backgroundColor: 'black', // Background color black
        border: '4px solid transparent', // Make border transparent
        borderRadius: '16px', // Rounded corners
        backgroundClip: 'border-box', // To apply gradient to the border
        borderImage: 'linear-gradient(to right, #34d399, #3b82f6) 1', // Gradient border
      }}
    >
      {/* Image Section */}
      <div className="relative w-56 h-56 mx-auto mb-8">
        <Image
          src={member.image}
          alt={`${member.name}'s profile picture`}
          layout="fill"
          className="object-cover rounded-full"
        />
      </div>

      {/* Name */}
      <h2 className="text-3xl font-bold text-white">{member.name}</h2>

      {/* Social Links */}
      <div className="flex justify-center mt-8 space-x-6">
        {member.socialLinks.twitter && (
          <Link href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter size={32} className="text-blue-400 hover:text-white transition duration-300" />
          </Link>
        )}
        {member.socialLinks.linkedin && (
          <Link href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={32} className="text-blue-500 hover:text-white transition duration-300" />
          </Link>
        )}
        {member.socialLinks.github && (
          <Link href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={32} className="text-gray-400 hover:text-white transition duration-300" />
          </Link>
        )}
      </div>
    </div>
  );
};
