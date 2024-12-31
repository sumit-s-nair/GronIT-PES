"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineEventAvailable } from "react-icons/md";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/events/EventCard";
import axios from "axios";
interface Event {
  _id: string;
  name: string;
  content: string;
  author: string;
  description: string;
  registrationLink: string;
  image: Buffer;
  imageType: string;
  date: Date;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const eventsResponse = await axios.get("/api/events");

      if (eventsResponse.data) setEvents(eventsResponse.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero */}
      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="icon bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-6 h-20 w-20 flex items-center justify-center">
          <MdOutlineEventAvailable size={50} />
        </div>
        <h1 className="text-4xl mt-4 text-white font-bold uppercase">Events</h1>
        <p className="text-gray-400 text-lg mt-2 text-center max-w-3xl">
          Stay updated on our latest workshops, seminars, and conferences
          designed to foster innovation and sustainability.
        </p>
      </motion.div>

      {/* Event Cards */}
      <motion.main
        className="flex-1 mx-auto p-6 sm:p-16 max-w-[90%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              className="event-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: index * 0.3,
              }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventsPage;
