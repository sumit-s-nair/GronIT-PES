import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: number;
  image: string;
  date: string;
  name: string;
  description: string;
  registrationLink: string;
}

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="module">
      <div className="rounded-gradient-bg max-w-[400px] sm:max-w-[460px] w-full content">
        {/* Event Banner */}
        <div className="relative w-full h-64">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        {/* Event Details */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center">{event.name}</h2>
          <p className="text-gray-400 text-center mt-2">{event.date}</p>
          <p className="text-gray-300 text-center mt-4">{event.description}</p>
          <div className="flex justify-center gap-16 mt-6">
            <Link
              href={`/events/${event.id}`}
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform w-30 text-center"
            >
              Details
            </Link>
            <Link
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-green-500 text-white rounded-lg hover:scale-105 transition-transform w-30 text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
