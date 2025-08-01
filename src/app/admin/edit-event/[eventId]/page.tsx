"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextFieldInput from "@/components/forms/TextFieldInput";

const EditEventPage: React.FC = () => {
  const router = useRouter();
  const { eventId } = useParams();

  const [title, setTitle] = useState("");
  const [user, setUser] = useState<User | null>(null);
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/auth");
      }
    });

    // Fetch event details
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/editevent?eventId=${eventId}`);
        if (!response.ok) throw new Error("Error fetching event details");

        const event = await response.json();
        setTitle(event.title || "");
        setDescription(event.description || "");
        setContent(event.content || "");
        setDate(event.date ? new Date(event.date).toISOString().slice(0, 16) : "");
        setRegistrationLink(event.registrationLink || "");
        setRegistrationStartDate(event.registrationStartDate ? new Date(event.registrationStartDate).toISOString().slice(0, 16) : "");
        setRegistrationEndDate(event.registrationEndDate ? new Date(event.registrationEndDate).toISOString().slice(0, 16) : "");
        setMaxParticipants(event.maxParticipants?.toString() || "");
        setLocation(event.location || "");
        setEventType(event.eventType || "ONLINE");
        setTags(event.tags?.join(", ") || "");
        setImagePreview(event.imageUrl || "/assets/logo_black.png");
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (eventId) fetchEventDetails();

    return () => unsubscribe();
  }, [router, eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("registrationLink", registrationLink);
    
    // Add new fields
    if (registrationStartDate) formData.append("registrationStartDate", registrationStartDate);
    if (registrationEndDate) formData.append("registrationEndDate", registrationEndDate);
    if (maxParticipants) formData.append("maxParticipants", maxParticipants);
    if (location) formData.append("location", location);
    formData.append("eventType", eventType);
    if (tags) formData.append("tags", tags);
    
    if (image) formData.append("image", image);

    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(`/api/events/editevent?eventId=${eventId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        console.error("Error updating event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src={imagePreview || "https://via.placeholder.com/800x400"}
          alt="Event Banner"
          fill
          className="object-cover rounded-xl transition-all duration-500 ease-in-out"
        />
        <div className="absolute bottom-4 left-4 z-10">
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
          <h1 className="text-4xl font-bold tracking-tight">Edit Event</h1>
        </div>
      </div>

      <div className="flex-1 mx-auto p-8 sm:p-16 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
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
            <TextFieldInput
              id="date"
              label="Event Date & Time"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="datetime-local"
              required
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
            <TextFieldInput
              id="registrationStartDate"
              label="Registration Start Date (optional)"
              value={registrationStartDate}
              onChange={(e) => setRegistrationStartDate(e.target.value)}
              type="datetime-local"
            />
            
            <TextFieldInput
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

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2, py: 1.5 }}
          >
            Update Event
          </Button>
        </form>
      </div>

      <div className="flex justify-center p-6">
        <Link
          href="/admin"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Back to Admin
        </Link>
      </div>
    </div>
  );
};

export default EditEventPage;
