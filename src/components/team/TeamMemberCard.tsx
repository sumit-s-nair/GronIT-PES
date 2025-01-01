import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

interface SocialLinks {
  twitter: string;
  linkedin: string;
  github: string;
}

interface TeamMember {
  id: number;
  image: string;
  name: string;
  socialLinks: SocialLinks;
}

export const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="module max-w-3xl">
      <div className="content">
        <div className="relative w-72 h-72 mx-auto mb-8">
          <Image
            src={member.image}
            alt={`${member.name}'s profile picture`}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <h2 className="text-3xl font-bold">{member.name}</h2> 
        <div className="flex justify-center mt-8 space-x-8">
          <Link href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter size={28} className="text-green-400 hover:text-white duration-300" />
          </Link>
          <Link href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={28} className="text-green-400 hover:text-white duration-300" />
          </Link>
          <Link href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={28} className="text-green-400 hover:text-white duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};
