"use client";

import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to sign in with Google.");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="logo mb-4">
        <Image
          src="/assets/logo_black.png"
          alt="Gron-IT Logo"
          className="w-40 h-40 rounded-full"
          width={160}
          height={160}
        />
      </div>

      <h2 className="text-2xl font-semibold mb-6">Sign in to GronIT</h2>

      <div className="container max-w-xs w-full p-6 rounded-lg shadow-lg">
        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleGoogleSignIn}
          className="button w-full px-3 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 mb-4 flex items-center justify-center"
        >
          <FaGoogle className="mr-2" />
          Sign in with Google
        </button>

        <div className="footer-links mt-4 text-center text-sm"></div>
      </div>
    </div>
  );
};

export default Login;
