"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import Header from "@/components/Header";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { UserRecord } from "firebase-admin/auth";
import { Footer } from "@/components/Footer";
import { Modal } from "@/components/Modal";
import { Blog } from "@/models/Blog";
import { Event } from "@/models/Event";
import { AdminList, BlogList, EventList, MemberList } from "@/components/Admin";
import { handleSignOut } from "@/lib/Admin";
import { TeamMember } from "@/models/Member";

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [admins, setAdmins] = useState<UserRecord[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [adminLoading, setAdminLoading] = useState<boolean>(false);
  const [blogLoading, setBlogLoading] = useState<boolean>(false);
  const [teamLoading, setTeamLoading] = useState<boolean>(false);
  const [eventLoading, setEventLoading] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    type: string;
    title: string;
    message: string;
    action: () => Promise<void>;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser as User);
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchAdmins = async () => {
    setAdminLoading(true);
    try {
      const idToken = await user?.getIdToken();
      const response = await axios.get("/api/admin/getAdmins", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.data && response.data.users) {
        setAdmins(response.data.users);
      } else {
        throw new Error("No admins data found in the response");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      alert("Failed to fetch admins.");
    } finally {
      setAdminLoading(false);
    }
  };

  const fetchBlogsAndEvents = async () => {
    setBlogLoading(true);
    setEventLoading(true);
    setTeamLoading(true);
    try {
      const idToken = await user?.getIdToken();
      const [blogsResponse, eventsResponse, teamResponse] = await Promise.all([
        axios.get("/api/blogs", {
          headers: { Authorization: `Bearer ${idToken}` },
        }),
        axios.get("/api/events", {
          headers: { Authorization: `Bearer ${idToken}` },
        }),
        axios.get("/api/teams", {
          headers: { Authorization: `Bearer ${idToken}` },
        }),
      ]);

      if (blogsResponse.data) setBlogs(blogsResponse.data);
      if (eventsResponse.data) setEvents(eventsResponse.data);
      if (teamResponse.data) setTeam(teamResponse.data);
    } catch (error) {
      console.error("Error fetching blogs/events:", error);
      alert("Failed to fetch blogs and events.");
    } finally {
      setBlogLoading(false);
      setEventLoading(false);
      setTeamLoading(false);
    }
  };

  // Fetch list of admins
  useEffect(() => {
    if (user) {
      fetchAdmins();
      fetchBlogsAndEvents();
    }
  }, [user]);

  const handleDeleteUser = async (userId: string) => {
    const userEmail = admins.find((admin) => admin.uid === userId)?.email || "";
    if (userEmail === user?.email) {
      setModalContent({
        type: "self-delete",
        title: "Cannot Delete Yourself",
        message: "You cannot delete your own account.",
        action: () => Promise.resolve(),
      });
      return;
    }

    setModalContent({
      type: "delete-user",
      title: "Confirm Delete User",
      message: `Are you sure you want to delete this user? This action cannot be undone.`,
      action: async () => {
        setLoading(true);
        try {
          const idToken = await user?.getIdToken();
          const response = await axios.delete("/api/admin/deleteUser", {
            data: { userId },
            headers: { Authorization: `Bearer ${idToken}` },
          });

          if (response.status === 200) {
            fetchAdmins();
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete user.");
        } finally {
          setLoading(false);
          setModalContent(null);
        }
      },
    });
  };

  const handleDeleteItem = (id: string, type: "blog" | "event" | "member") => {
    setModalContent({
      type: "delete-item",
      title: `Confirm Delete ${type}`,
      message: `Are you sure you want to delete this ${type}? This action cannot be undone.`,
      action: async () => {
        setLoading(true);
        try {
          const idToken = await user?.getIdToken();
          let endpoint = "";

          // Set the correct endpoint based on the type
          if (type === "blog") {
            endpoint = "/api/blogs";
          } else if (type === "event") {
            endpoint = "/api/events";
          } else if (type === "member") {
            endpoint = "/api/teams";
          }

          const response = await axios.delete(endpoint, {
            headers: { Authorization: `Bearer ${idToken}` },
            data: { id },
          });

          if (response.status === 200) {
            // Update the state based on the type
            if (type === "blog") {
              setBlogs((prev) => prev.filter((blog) => blog.id !== id));
            } else if (type === "event") {
              setEvents((prev) => prev.filter((event) => event.id !== id));
            } else if (type === "member") {
              setTeam((prev) => prev.filter((member) => member.id !== id));
            }

            setTimeout(() => {
              fetchBlogsAndEvents();
            }, 300);
          }
        } catch (error) {
          console.error(`Error deleting ${type}:`, error);
          alert(`Failed to delete ${type}.`);
        } finally {
          setModalContent(null);
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen text-white font-sans">
      <Header />

      <motion.div
        className="flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="mb-6 text-2xl font-medium">
          {user && (
            <p>
              Welcome,{" "}
              <span className="text-green-500">
                {user.displayName || user.email}
              </span>
              !
            </p>
          )}
        </div>
        <h1 className="text-4xl font-bold text-white uppercase text-center">
          Admin Dashboard
        </h1>
        <p className="text-gray-300 text-lg mt-2 text-center max-w-3xl">
          Manage admin users blogs, events, and more.
        </p>

        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
        >
          <FaSignOutAlt /> Log Out
        </button>
      </motion.div>

      <motion.main
        className="flex-1 p-6 sm:p-16 w-full max-w-[90%] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Admin List Section */}
        {adminLoading ? (
          <p className="text-center text-gray-500">Loading Admins...</p>
        ) : (
          <AdminList admins={admins} onDelete={handleDeleteUser} />
        )}

        {/* Blogs Section */}
        {blogLoading ? (
          <p className="text-center text-gray-500">Loading Blogs...</p>
        ) : (
          <BlogList blogs={blogs} onDelete={handleDeleteItem} />
        )}

        {/* Events Section */}
        {eventLoading ? (
          <p className="text-center text-gray-500">Loading Events...</p>
        ) : (
          <EventList events={events} onDelete={handleDeleteItem} />
        )}

        {/* Team Section */}
        {teamLoading ? (
          <p className="text-center text-gray-500">Loading Team...</p>
        ) : (
          <MemberList members={team} onDelete={handleDeleteItem} />
        )}
      </motion.main>

      <Footer />

      {modalContent && (
        <Modal onClose={() => setModalContent(null)} isOpen={true}>
          <h2 className="text-xl font-semibold mb-4">{modalContent.title}</h2>
          <p className="text-gray-400 mb-6">{modalContent.message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setModalContent(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={modalContent.action}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
