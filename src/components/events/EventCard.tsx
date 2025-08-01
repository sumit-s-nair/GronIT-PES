import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Event, EventRegistrationStatus } from "@/types";
import { getEventRegistrationStatus } from "@/utils/eventUtils";

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [registrationStatus, setRegistrationStatus] = useState<EventRegistrationStatus | null>(null);

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
          className="px-4 py-2 border-2 border-gray-500 text-gray-400 rounded-lg cursor-not-allowed w-30 text-center"
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
        className="px-4 py-2 border-2 border-blue-500 text-white rounded-lg hover:scale-105 transition-transform w-30 text-center"
      >
        Register
      </Link>
    );
  };

  return (
    <div className="module">
      <div className="rounded-gradient-bg max-w-[400px] sm:max-w-[460px] w-full content">
        {/* Event Banner */}
        <div className="relative w-full h-64">
          <Image
            src={event.imageUrl || "/assets/logo_black.png"}
            alt={event.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        {/* Event Details */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center">{event.title}</h2>
          <div className="text-center mt-2">
            <p className="text-gray-400">{formattedDate}</p>
            {event.location && (
              <p className="text-gray-500 text-sm">{event.location}</p>
            )}
            <div className="flex justify-center items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs ${
                event.eventType === 'ONLINE' ? 'bg-blue-100 text-blue-800' :
                event.eventType === 'OFFLINE' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {event.eventType}
              </span>
            </div>
          </div>
          
          <p className="text-gray-300 text-center mt-4">{truncatedDescription}</p>
          
          {/* Registration Status */}
          {registrationStatus && (
            <div className="text-center mt-3">
              <p className={`text-sm ${
                registrationStatus.canRegister ? 'text-green-400' : 'text-orange-400'
              }`}>
                {registrationStatus.message}
              </p>
            </div>
          )}
          
          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-16 mt-6">
            <Link
              href={`/events/${event.id}`}
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-green-500 text-white rounded-lg hover:scale-105 transition-transform w-30 text-center"
            >
              Details
            </Link>
            {getRegistrationButton()}
          </div>
        </div>
      </div>
    </div>
  );
};
