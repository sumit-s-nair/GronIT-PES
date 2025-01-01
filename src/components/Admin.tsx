import { UserRecord } from "firebase-admin/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { Blog } from "@/models/Blog";
import { Event } from "@/models/Event";
import { TeamMember } from "@/models/Member";
import { Avatar } from "./Avatar";
import Image from "next/image";
import axios from "axios";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";

// Types for props
interface BlogListProps {
  blogs: Blog[];
  onDelete: (id: string, type: "blog") => void;
}

interface EventListProps {
  events: Event[];
  onDelete: (id: string, type: "event") => void;
}

interface MemberListProps {
  members: TeamMember[];
  onDelete: (id: string, type: "member") => void;
  onAdd: () => void;
}
// AdminList component
const AddModal: React.FC<{
  show: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  title: string;
}> = ({ show, onClose, onSubmit, title }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await onSubmit(email);
      setEmail("");
      onClose();
    } catch (error) {
      console.error("Error adding:", error);
      alert("Failed to add.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 bg-black"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-500 ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

// AdminList component
export const AdminList: React.FC<{
  admins: UserRecord[];
  onDelete: (uid: string) => void;
}> = ({ admins, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser as User);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (email: string) => {
    const idToken = await user?.getIdToken();
    await axios.post(
      "/api/admin/addUser",
      { email },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Admins</h2>
        <button
          onClick={() => setShowModal(true)}
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

      {/* Add Modal */}
      <AddModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdd}
        title="Add Admin"
      />
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

          const truncatedDescription =
            blog.description.length > 50
              ? `${blog.description.slice(0, 50)}...`
              : blog.description;

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
              <p className="text-sm text-center mt-2">{truncatedDescription}</p>
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

          const truncatedDescription =
            event.description.length > 50
              ? `${event.description.slice(0, 50)}...`
              : event.description;

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
              <p className="text-sm text-center mt-2">{truncatedDescription}</p>
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

// MemberList component
export const MemberList: React.FC<MemberListProps> = ({
  members,
  onDelete,
  onAdd,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Members</h2>
        <button
          onClick={() => onAdd()}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {members.map((member) => {
          const imageDataURL = member.image
            ? `data:${member.imageType};base64,${Buffer.from(
                member.image
              ).toString("base64")}`
            : "/assets/logo_black.png";
          return (
            <div
              key={member.id}
              className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg shadow-md w-full sm:w-[200px]"
            >
              <Avatar imageUrl={imageDataURL} name={member.name} />
              <p className="text-lg font-semibold mt-2 text-center">
                {member.name}
              </p>
              <button
                onClick={() => member.id && onDelete(member.id, "member")}
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
