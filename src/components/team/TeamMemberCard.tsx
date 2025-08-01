"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { TeamMember } from "@/types";

export const TeamMemberCard: React.FC<{ member: TeamMember }> = ({
  member,
}) => {
  return (
    <div className="module max-w-lg p-8 rounded-lg shadow-xl text-center">
      <div className="content">
        {/* Image Section */}
        <div className="relative w-56 h-56 mx-auto mb-8">
          <Image
            src={member.imageUrl || "/assets/logo_black.png"}
            alt={`${member.name}'s profile picture`}
            layout="fill"
            className="object-cover rounded-full"
          />
        </div>

        {/* Name */}
        <h2 className="text-3xl font-bold text-white">{member.name}</h2>

        {/* Domain */}
        <p className="text-gray-400 text-lg mt-2">{member.domain}</p>

        {/* Social Links */}
        <div className="flex justify-center mt-8 space-x-6">
          {member.socialLinks?.instagram && (
            <Link
              href={member.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                size={32}
                className="text-blue-500 hover:text-white transition duration-300"
              />
            </Link>
          )}
          {member.socialLinks?.linkedin && (
            <Link
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                size={32}
                className="text-blue-500 hover:text-white transition duration-300"
              />
            </Link>
          )}
          {member.socialLinks?.github && (
            <Link
              href={member.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                size={32}
                className="text-blue-500 hover:text-white transition duration-300"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
