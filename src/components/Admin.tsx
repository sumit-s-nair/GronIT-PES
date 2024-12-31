import { UserRecord } from "firebase-admin/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { Blog } from "@/models/Blog";
import { Event } from "@/models/Event";
import { Avatar } from "./Avatar";
import Image from "next/image";

// Types for props
interface AdminListProps {
  admins: UserRecord[];
  onDelete: (uid: string) => void;
  onAdd: () => void;
}

interface BlogListProps {
  blogs: Blog[];
  onDelete: (id: string, type: "blog") => void;
}

interface EventListProps {
  events: Event[];
  onDelete: (id: string, type: "event") => void;
}

// AdminList component
export const AdminList: React.FC<AdminListProps> = ({
  admins,
  onDelete,
  onAdd,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Admins</h2>
        <button
          onClick={() => onAdd()}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {admins.map((admin) => (
          <div
            key={admin.uid}
            className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg shadow-md w-full sm:w-[200px]"
          >
            <Avatar
              imageUrl={admin.photoURL}
              name={admin.displayName || admin.email}
            />
            <p className="text-lg font-semibold mt-2 text-center">
              {admin.displayName || "No Name"}
            </p>
            <p className="text-sm text-center mt-2">{admin.email}</p>
            <button
              onClick={() => admin.email && onDelete(admin.uid)}
              className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// BlogList component
export const BlogList: React.FC<BlogListProps> = ({ blogs, onDelete }) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mt-12 mb-8">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <button
          onClick={() => router.push("/admin/create-blog")}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {blogs.map((blog) => {
          const imageDataURL = blog.image
            ? `data:${blog.imageType};base64,${Buffer.from(blog.image).toString(
                "base64"
              )}`
            : "/assets/logo_black.png";

          return (
            <div
              key={blog._id}
              className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg shadow-md w-full sm:w-[200px]"
            >
              <Image
                src={imageDataURL}
                alt={blog.title}
                className="w-full h-32 object-cover rounded"
                width={800}
                height={600}
              />
              <p className="text-lg font-semibold mt-2">{blog.title}</p>
              <p className="text-sm text-center mt-2">{blog.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => router.push("/admin/edit-blog/" + blog._id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(blog._id, "blog")}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// EventList component
export const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mt-12 mb-8">
        <h2 className="text-2xl font-semibold">Events</h2>
        <button
          onClick={() => router.push("/admin/create-event")}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {events.map((event) => {
          const imageDataURL = event.image
            ? `data:${event.imageType};base64,${Buffer.from(
                event.image
              ).toString("base64")}`
            : "/assets/logo_black.png";

          return (
            <div
              key={event._id}
              className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg shadow-md w-full sm:w-[200px]"
            >
              <Image
                src={imageDataURL}
                alt={event.title}
                className="w-full h-32 object-cover rounded"
                width={800}
                height={600}
              />
              <p className="text-lg font-semibold mt-2">{event.title}</p>
              <p className="text-sm text-center mt-2">{event.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => router.push("/admin/edit-event/" + event._id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(event._id, "event")}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
