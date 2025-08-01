"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { TeamMember } from "@/types";

export const TeamMemberCard: React.FC<{ member: TeamMember }> = ({
  member,
}) => {
  return (
    <motion.div 
      className="module h-full"
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="content h-full flex flex-col text-center">
        {/* Image Section */}
        <motion.div 
          className="relative w-40 h-40 mx-auto mb-6 flex-shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={member.imageUrl || "/assets/logo_black.png"}
            alt={`${member.name}'s profile picture`}
            fill
            className="object-cover rounded-full"
            loading="lazy"
            sizes="160px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </motion.div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Name */}
            <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{member.name}</h2>

            {/* Domain */}
            <p className="text-gray-400 text-sm mb-4">{member.domain}</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center mt-auto space-x-4">
            {(() => {
              const socialLinks = member.socialLinks as {
                instagram?: string;
                linkedin?: string;
                github?: string;
              } | null;
              
              return (
                <>
                  {socialLinks?.instagram && (
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram
                          size={24}
                          className="text-pink-500 hover:text-pink-400 transition duration-300"
                        />
                      </Link>
                    </motion.div>
                  )}
                  {socialLinks?.linkedin && (
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin
                          size={24}
                          className="text-blue-500 hover:text-blue-400 transition duration-300"
                        />
                      </Link>
                    </motion.div>
                  )}
                  {socialLinks?.github && (
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub
                          size={24}
                          className="text-gray-400 hover:text-white transition duration-300"
                        />
                      </Link>
                    </motion.div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
