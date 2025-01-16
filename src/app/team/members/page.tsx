import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";

interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
}

interface ApiResponseTeamMember {
  _id: string;
  name: string;
  domain: string;
  image: {
    data: Uint8Array;
  };
  imageType: string;
  socialLinks: SocialLinks;
  createdAt: Date;
}

interface TeamMember {
  _id: string;
  name: string;
  domain: string;
  image: string; // Base64 string
  socialLinks: SocialLinks;
  createdAt: Date;
}

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Fetch team members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const data: ApiResponseTeamMember[] = await response.json();

        // Transform API response to add Base64 image string
        const transformedMembers: TeamMember[] = data.map((member) => ({
          ...member,
          image: `data:image/${member.imageType};base64,${Buffer.from(
            member.image.data
          ).toString("base64")}`, // Convert Buffer to Base64 string
        }));

        setTeamMembers(transformedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-16 px-4 sm:px-8 lg:px-16">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-6 h-20 w-20 flex items-center justify-center">
          <FaUsers size={50} color="white" />
        </div>
        <h1 className="text-4xl mt-4 text-white font-bold uppercase">
          Meet Our Team
        </h1>
        <p className="text-gray-400 text-lg mt-2 max-w-2xl">
          Our team is passionate about innovation and working towards creating
          positive change in the world.
        </p>
      </motion.div>

      {/* Team Members Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member._id} // Use _id as key
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.3 }}
          >
            <TeamMemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeamPage;
