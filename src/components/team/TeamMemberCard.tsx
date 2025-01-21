"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { TeamMember } from "@/models/Member";

export const TeamMemberCard: React.FC<{ member: TeamMember }> = ({
  member,
}) => {
  const image = member.image
    ? `data:${member.imageType};base64,${Buffer.from(member.image).toString(
        "base64"
      )}`
    : "/assets/logo_black.png";

  return (
    <div className="module max-w-lg p-8 rounded-lg shadow-xl text-center">
      <div className="content">
        {/* Image Section */}
        <div className="relative w-56 h-56 mx-auto mb-8">
          <Image
            src={image}
            alt={`${member.name}'s profile picture`}
            layout="fill"
            className="object-cover rounded-full"
          />
        </div>

        {/* Name */}
        <h2 className="text-3xl font-bold text-white">{member.name}</h2>

        {/* Social Links */}
        <div className="flex justify-center mt-8 space-x-6">
          {member.socialLinks.instagram && (
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
          {member.socialLinks.linkedin && (
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
          {member.socialLinks.github && (
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
