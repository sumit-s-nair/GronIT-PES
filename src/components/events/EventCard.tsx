import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Event, EventRegistrationStatus } from "@/types";
import { getEventRegistrationStatus } from "@/utils/eventUtils";

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [registrationStatus, setRegistrationStatus] =
    useState<EventRegistrationStatus | null>(null);

  useEffect(() => {
    // Calculate registration status when component mounts
    const status = getEventRegistrationStatus(event);
    setRegistrationStatus(status);
  }, [event]);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const truncatedDescription =
    event.description.length > 75
      ? `${event.description.slice(0, 75)}...`
      : event.description;

  const getRegistrationButton = () => {
    if (!registrationStatus) return null;

    if (!registrationStatus.canRegister) {
      return (
        <button
          disabled
          className="px-4 py-2 border-2 border-gray-500 text-gray-400 rounded-lg cursor-not-allowed text-center text-sm flex-1 max-w-24"
          title={registrationStatus.message}
        >
          {registrationStatus.isOpen ? "Full" : "Closed"}
        </button>
      );
    }

    return (
      <Link
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 border-2 border-blue-500 text-white rounded-lg hover:scale-105 transition-transform text-center text-sm flex-1 max-w-24"
      >
        Register
      </Link>
    );
  };

  return (
    <motion.div
      className="module h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="rounded-gradient-bg w-full h-full content flex flex-col">
        {/* Event Banner */}
        <motion.div
          className="relative w-full h-64 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={event.imageUrl || "/assets/logo_black.png"}
            alt={event.title}
            fill
            className="object-cover rounded-t-lg"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </motion.div>

        {/* Event Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-center mb-3 line-clamp-2">{event.title}</h2>
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm">{formattedDate}</p>
              {event.location && (
                <p className="text-gray-500 text-xs mt-1 line-clamp-1">{event.location}</p>
              )}
              <div className="flex justify-center items-center gap-2 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.eventType === "ONLINE"
                      ? "bg-blue-100 text-blue-800"
                      : event.eventType === "OFFLINE"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {event.eventType}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 text-center text-sm mb-4 line-clamp-3">{truncatedDescription}</p>
            
            {/* Registration Status */}
            {registrationStatus && (
              <div className="text-center mb-4">
                <p className={`text-xs ${
                  registrationStatus.canRegister ? 'text-green-400' : 'text-orange-400'
                }`}>
                  {registrationStatus.message}
                </p>
              </div>
            )}
            
            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {event.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {event.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded-full text-xs">
                    +{event.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3 mt-auto">
            <Link
              href={`/events/${event.id}`}
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-green-500 text-white rounded-lg hover:scale-105 transition-transform text-center text-sm flex-1 max-w-24"
            >
              Details
            </Link>
            {getRegistrationButton()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
