"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Event, EventRegistrationStatus } from "@/types";
import { formatEventDate } from "@/utils/eventUtils";

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrationStatus, setRegistrationStatus] =
    useState<EventRegistrationStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(
            `/api/events/registration-status?eventId=${eventId}`,
            {
              method: "GET",
            }
          );
          if (!response.ok) {
            throw new Error("Event not found");
          }
          const data = await response.json();
          setEvent(data.event);
          setRegistrationStatus(data.registrationStatus);
        } catch {
          setError("Failed to fetch event details");
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  // Handle error or event not found
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link
          href="/events"
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Go Back to Events
        </Link>
      </div>
    );
  }

  const getRegistrationButton = () => {
    if (!registrationStatus) return null;

    if (!registrationStatus.canRegister) {
      return (
        <div className="px-6 py-3 bg-gray-600 text-center text-gray-300 rounded-lg cursor-not-allowed">
          {registrationStatus.isOpen ? "Event Full" : "Registration Closed"}
        </div>
      );
    }

    return (
      <Link
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-blue-500 text-center text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Register Now
      </Link>
    );
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-black text-white font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Event Header */}
      <motion.div
        className="relative w-full h-64 sm:h-96 flex items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={event.imageUrl || "/assets/logo_black.png"}
          alt={event.title}
          fill
          className="object-cover rounded-lg"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6 rounded-b-lg">
          <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
          <p className="text-gray-400 mb-2">{formatEventDate(event.date)}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold shadow ${
                event.eventType === "ONLINE"
                  ? "bg-blue-700 text-blue-100 border border-blue-300"
                  : event.eventType === "OFFLINE"
                  ? "bg-green-700 text-green-100 border border-green-300"
                  : "bg-purple-700 text-purple-100 border border-purple-300"
              }`}
            >
              {event.eventType}
            </span>
            {event.location && (
              <span className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-200 border border-gray-600 font-medium flex items-center gap-1">
                {event.location}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Registration Status Banner */}
      <AnimatePresence>
        {registrationStatus && (
          <motion.div
            className={`text-center py-4 px-6 rounded-lg mx-auto my-6 max-w-xl shadow-lg ${
              registrationStatus.canRegister
                ? registrationStatus.daysUntilEnd &&
                  registrationStatus.daysUntilEnd <= 3
                  ? "bg-orange-600"
                  : "bg-green-600"
                : "bg-red-600"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white font-medium text-lg">
              {registrationStatus.message}
            </p>
            {event.maxParticipants &&
              event.currentParticipants !== undefined && (
                <p className="text-gray-200 text-sm mt-1">
                  {event.currentParticipants} / {event.maxParticipants}{" "}
                  participants registered
                </p>
              )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Content */}
      <motion.div
        className="flex-1 mx-auto p-6 sm:p-16 max-w-[900px] w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Event Description</h2>
          <p className="text-gray-300 leading-relaxed">{event.description}</p>
        </div>

        {/* Event Details */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Event Details</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="font-medium">Date:</span>{" "}
                {formatEventDate(event.date)}
              </li>
              <li>
                <span className="font-medium">Type:</span> {event.eventType}
              </li>
              {event.location && (
                <li>
                  <span className="font-medium">Location:</span>{" "}
                  {event.location}
                </li>
              )}
              <li>
                <span className="font-medium">Organizer:</span> {event.author}
              </li>
            </ul>
          </div>

          {(event.registrationStartDate ||
            event.registrationEndDate ||
            event.maxParticipants) && (
            <div className="bg-zinc-900 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Registration Info</h3>
              <ul className="space-y-2 text-gray-300">
                {event.registrationStartDate && (
                  <li>
                    <span className="font-medium">Registration Opens:</span>{" "}
                    {formatEventDate(event.registrationStartDate)}
                  </li>
                )}
                {event.registrationEndDate && (
                  <li>
                    <span className="font-medium">Registration Closes:</span>{" "}
                    {formatEventDate(event.registrationEndDate)}
                  </li>
                )}
                {event.maxParticipants && (
                  <li>
                    <span className="font-medium">Max Participants:</span>{" "}
                    {event.maxParticipants}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-500 font-medium shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Full Content */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Full Details</h3>
          <div className="text-gray-300 leading-relaxed prose prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: event.content.replace(/\r\n/g, "<br/>"),
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col justify-center p-6 mx-auto gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {getRegistrationButton()}
        <Link
          href="/events"
          className="px-6 py-3 bg-green-500 text-center text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Back to Events
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default EventDetailsPage;
