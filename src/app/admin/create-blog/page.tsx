"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import TextFieldInput from "@/components/forms/TextFieldInput";

const CreateBlogPage: React.FC = () => {
  const router = useRouter();

  // State to manage form data
  const [title, setTitle] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageType, setImageType] = useState<string>("");

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
    formData.append("imageType", imageType);

    try {
      const idToken = await user?.getIdToken();
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        console.error("Error creating blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageType(file.type);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      {/* Blog Header with Image Banner */}
      <div className="relative w-full h-64 sm:h-96">
        <Image
          src={
            image
              ? URL.createObjectURL(image)
              : "https://via.placeholder.com/800x400"
          }
          alt="Blog Banner"
          fill
          className="object-cover rounded-xl transition-all duration-500 ease-in-out"
        />
        <div className="absolute bottom-4 left-4 z-10">
          {/* Upload Icon Positioned at Bottom of Banner */}
          <label
            htmlFor="image-upload"
            className="bg-green-600 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-green-700 transition-colors"
          >
            <span className="text-3xl">+</span>
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
          <h1 className="text-4xl font-bold tracking-tight">Create New Blog</h1>
        </div>
      </div>

      {/* Blog Form */}
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

          {/* Description */}
          <TextFieldInput
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            required
          />

          {/* Content */}
          <TextFieldInput
            id="content"
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={8}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
          >
            Publish Blog
          </button>
        </form>
      </div>

      {/* Back to Blogs Button */}
      <div className="flex justify-center p-6">
        <Link
          href="/blogs"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default CreateBlogPage;
