import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/models/Event";

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const image = event.image
    ? `data:${event.imageType};base64,${Buffer.from(event.image).toString(
        "base64"
      )}`
    : "/assets/logo_black.png";

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const truncatedDescription =
    event.description.length > 75
      ? `${event.description.slice(0, 75)}...`
      : event.description;

  return (
    <div className="module">
      <div className="rounded-gradient-bg max-w-[400px] sm:max-w-[460px] w-full content">
        {/* Event Banner */}
        <div className="relative w-full h-64">
          <Image
            src={image}
            alt={event.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        {/* Event Details */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center">{event.title}</h2>
          <p className="text-gray-400 text-center mt-2">{formattedDate}</p>
          <p className="text-gray-300 text-center mt-4">{truncatedDescription}</p>
          <div className="flex justify-center gap-16 mt-6">
            <Link
              href={`/events/${event._id}`}
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-green-500 text-white rounded-lg hover:scale-105 transition-transform w-30 text-center"
            >
              Details
            </Link>
            <Link
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-blue-500 text-white rounded-lg hover:scale-105 transition-transform w-30 text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
