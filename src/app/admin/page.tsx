"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signOut, User } from "firebase/auth";
import Header from "@/components/Header";
import { FaPlus, FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { UserRecord } from "firebase-admin/auth";
import { Footer } from "@/components/Footer";
import { Avatar } from "@/components/Avatar";
import { Modal } from "@/components/Modal";

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [admins, setAdmins] = useState<UserRecord[]>([]);

  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showSelfDeleteModal, setShowSelfDeleteModal] =
    useState<boolean>(false);
  const [deleteTargetUserId, setDeleteTargetUserId] = useState<string | null>(
    null
  );

  const router = useRouter();

  // Fetch logged-in user and manage session
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
    setLoading(true);
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
      setLoading(false);
    }
  };

  // Fetch list of admins
  useEffect(() => {
    if (user) {
      fetchAdmins();
    }
  }, [user]);
  

  const handleAddUser = async () => {
    if (!newUserEmail) return;

    setLoading(true);
    try {
      const idToken = await user?.getIdToken();

      const response = await axios.post(
        "/api/admin/addUser",
        { email: newUserEmail },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (response.status === 201) {
        setShowModal(false);

        setTimeout(() => {
          fetchAdmins();
        }, 300);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (userEmail === user?.email) {
      setShowSelfDeleteModal(true);
      return;
    }

    setDeleteTargetUserId(userId); // Set the user ID to be deleted
    setShowDeleteModal(true); // Show the confirmation modal
  };

  const confirmDeleteUser = async () => {
    if (!deleteTargetUserId) return;

    setLoading(true);
    try {
      const idToken = await user?.getIdToken();

      const response = await axios.delete("/api/admin/deleteUser", {
        data: { userId: deleteTargetUserId },
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.status === 200) {
        fetchAdmins();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    } finally {
      setShowDeleteModal(false);
      setDeleteTargetUserId(null);
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
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
          Manage admin users blogs, events and more.
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Admins</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
          >
            <FaPlus />
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
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
                <p className="text-lg font-semibold mt-2">
                  {admin.displayName || "No Name"}
                </p>
                <p className="text-sm text-center mt-2">{admin.email}</p>
                <button
                  onClick={() =>
                    admin.email && handleDeleteUser(admin.uid, admin.email)
                  }
                  className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.main>

      <Footer />

      {showModal && (
        <Modal onClose={() => setShowModal(false)} isOpen={true}>
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>
          <input
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            placeholder="Enter user's email"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 bg-zinc-800 text-white"
            disabled={loading}
          />
          <button
            onClick={handleAddUser}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)} isOpen={true}>
          <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteUser}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Modal>
      )}

      {/* Modal for self-delete attempt */}
      {showSelfDeleteModal && (
        <Modal onClose={() => setShowSelfDeleteModal(false)} isOpen={true}>
          <h2 className="text-xl font-semibold mb-4">Cannot Delete Yourself</h2>
          <p className="text-gray-400 mb-6">
            You cannot delete your own account.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowSelfDeleteModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              disabled={loading}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
