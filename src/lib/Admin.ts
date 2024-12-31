import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import router from "next/router";

export const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };