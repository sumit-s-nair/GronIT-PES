import { UserRecord } from "firebase-admin/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Blog, Event, TeamMember } from "@/types";
import { Avatar } from "./Avatar";
import Image from "next/image";
import axios from "axios";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import Link from "next/link";

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
          const truncatedDescription =
            blog.description.length > 50
              ? `${blog.description.slice(0, 50)}...`
              : blog.description;

          return (
            <div
              key={blog.id}
              className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg shadow-md w-full sm:w-[200px]"
            >
              <Image
                src={blog.imageUrl || "/assets/logo_black.png"}
                alt={blog.title}
                className="w-full h-32 object-cover rounded"
                width={800}
                height={600}
              />
              <p className="text-lg font-semibold mt-2">{blog.title}</p>
              <p className="text-sm text-center mt-2">{truncatedDescription}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => router.push("/admin/edit-blog/" + blog.id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(blog.id, "blog")}
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
          const truncatedDescription =
            event.description.length > 50
              ? `${event.description.slice(0, 50)}...`
              : event.description;

          return (
            <div
              key={event.id}
              className="flex flex-col items-center bg-zinc-800 p-4 rounded-lg shadow-md w-full sm:w-[200px]"
            >
              <Image
                src={event.imageUrl || "/assets/logo_black.png"}
                alt={event.title}
                className="w-full h-32 object-cover rounded"
                width={800}
                height={600}
              />
              <p className="text-lg font-semibold mt-2">{event.title}</p>
              <p className="text-sm text-center mt-2">{truncatedDescription}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => router.push("/admin/edit-event/" + event.id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(event.id, "event")}
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

export const MemberList: React.FC<MemberListProps> = ({
  members,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    image: null as File | null,
    socialLinks: { instagram: "", linkedin: "", github: "" },
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser as User);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (["instagram", "linkedin", "github"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("domain", formData.domain);
    formDataToSubmit.append("image", formData.image as Blob);
    formDataToSubmit.append(
      "socialLinks",
      JSON.stringify(formData.socialLinks)
    );

    try {
      const idToken = await user?.getIdToken();
      await axios.post("/api/teams", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${idToken}`,
        },
      });
      setFormData({
        name: "",
        domain: "",
        image: null,
        socialLinks: { instagram: "", linkedin: "", github: "" },
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member. Please try again.");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mt-12 mb-8">
        <h2 className="text-2xl font-semibold text-gray-100">Team Members</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-zinc-800 text-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center sm:w-[250px]"
          >
            <Image
              src={member.imageUrl || "/assets/logo_black.png"}
              alt={member.name}
              className="w-full h-40 object-cover rounded-lg"
              width={800}
              height={600}
            />
            <h3 className="text-lg font-bold mt-3">{member.name}</h3>
            <p className="text-sm text-gray-400">{member.domain}</p>
            <div className="flex gap-3 mt-2">
              {member.socialLinks?.instagram && (
                <Link
                  href={member.socialLinks.instagram}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  <FaInstagram size={24} />
                </Link>
              )}
              {member.socialLinks?.linkedin && (
                <Link
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  <FaLinkedin size={24} />
                </Link>
              )}
              {member.socialLinks?.github && (
                <Link
                  href={member.socialLinks.github}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  <FaGithub size={24} />
                </Link>
              )}
            </div>
            <button
              onClick={() => onDelete(member.id, "member")}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <FaTrashAlt className="mr-1" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">
              Add Member
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
              />
              <select
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
              >
                <option value="" disabled>
                  Select a domain
                </option>
                <option value="Technical (Web Dev)">Technical (Web Dev)</option>
                <option value="Logistics">Logistics</option>
                <option value="EVM">EVM</option>
                <option value="Heads">Heads</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Research">Research</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Operations">Operations</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Design">Design</option>
                <option value="PR and Campaigning">PR and Campaigning</option>
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
              />
              <input
                type="text"
                name="github"
                placeholder="GitHub URL"
                value={formData.socialLinks.github}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
