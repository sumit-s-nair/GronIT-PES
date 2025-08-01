"use client";

import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { TeamMember } from "@/types";

const TeamPage: React.FC = () => {
  const [teamData, setTeamData] = useState<{ [key: string]: TeamMember[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team members from the API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/teams");

        // Check for non-OK responses
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data: TeamMember[] = await response.json();

        // Group members by domain
        const grouped = data.reduce(
          (acc: { [key: string]: TeamMember[] }, member: TeamMember) => {
            if (!acc[member.domain]) acc[member.domain] = [];
            acc[member.domain].push(member);
            return acc;
          },
          {}
        );

        setTeamData(grouped);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-blue-500 rounded-full p-6 h-20 w-20 flex items-center justify-center">
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

      {/* Team Members Section */}
      <motion.main
        className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : Object.keys(teamData).length === 0 ? (
          <p className="text-center text-gray-400">No team members found.</p>
        ) : (
          Object.entries(teamData).map(([domain, members]) => (
            <section key={domain} className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">
                {domain}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 auto-rows-fr">
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="team-member-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring" 
                    }}
                  >
                    <TeamMemberCard member={member} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))
        )}
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeamPage;
