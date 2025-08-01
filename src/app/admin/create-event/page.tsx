"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DateInput from "@/components/forms/DateInput";
import TextFieldInput from "@/components/forms/TextFieldInput";

const CreateEventPage: React.FC = () => {
  const router = useRouter();

  // State to manage form data
  const [title, setTitle] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<string>("");
  const [registrationLink, setRegistrationLink] = useState<string>("");
  const [registrationStartDate, setRegistrationStartDate] = useState<string>("");
  const [registrationEndDate, setRegistrationEndDate] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("ONLINE");
  const [tags, setTags] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthor(user.displayName || user.email || "Unknown User");
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      console.error("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("registrationLink", registrationLink);
    
    // Add new fields
    if (registrationStartDate) formData.append("registrationStartDate", registrationStartDate);
    if (registrationEndDate) formData.append("registrationEndDate", registrationEndDate);
    if (maxParticipants) formData.append("maxParticipants", maxParticipants);
    if (location) formData.append("location", location);
    formData.append("eventType", eventType);
    if (tags) formData.append("tags", tags);

    try {
      const idToken = await user?.getIdToken();
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        console.error("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Event Header with Image Banner */}
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src={
            image
              ? URL.createObjectURL(image)
              : "https://via.placeholder.com/800x400"
          }
          alt="Event Banner"
          fill
          className="object-cover rounded-xl transition-all duration-500 ease-in-out"
        />
        <div className="absolute bottom-4 left-4 z-10">
          {/* Upload Icon Positioned at Bottom of Banner */}
          <label
            htmlFor="image-upload"
            className="bg-green-600 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-green-700 transition-colors"
          >
            <CloudUploadIcon className="text-3xl" />
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="absolute top-0 left-0 w-full p-6 z-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Create New Event
          </h1>
        </div>
      </div>

      {/* Event Form */}
      <div className="flex-1 mx-auto p-8 sm:p-16 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <TextFieldInput
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <TextFieldInput
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DateInput
              id="date"
              label="Event Date & Time"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="datetime-local"
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>
          
          <TextFieldInput
            id="location"
            label="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Zoom Link, Auditorium, etc."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DateInput
              id="registrationStartDate"
              label="Registration Start Date (optional)"
              value={registrationStartDate}
              onChange={(e) => setRegistrationStartDate(e.target.value)}
              type="datetime-local"
            />
            
            <DateInput
              id="registrationEndDate"
              label="Registration End Date (optional)"
              value={registrationEndDate}
              onChange={(e) => setRegistrationEndDate(e.target.value)}
              type="datetime-local"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextFieldInput
              id="maxParticipants"
              label="Max Participants (optional)"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              type="number"
              placeholder="e.g., 100"
            />
            
            <TextFieldInput
              id="tags"
              label="Tags (optional)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., workshop, tech, ai (comma separated)"
            />
          </div>
          
          <TextFieldInput
            id="registrationLink"
            label="Registration Link"
            value={registrationLink}
            onChange={(e) => setRegistrationLink(e.target.value)}
            required
            placeholder="https://..."
          />
          
          <TextFieldInput
            id="content"
            label="Event Content/Details"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={6}
            required
            placeholder="Detailed description of the event, agenda, etc."
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            Publish Event
          </Button>
        </form>
      </div>

      {/* Back to Events Button */}
      <div className="flex justify-center p-6">
        <Link
          href="/events"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
};

export default CreateEventPage;
