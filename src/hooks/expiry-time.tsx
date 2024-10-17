import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "./store/user";

export const useTokenExpiryCheck = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  useEffect(() => {
    const checkAndHandleExpiry = () => {
      if (user) {
        const tokenExpiry = new Date();
        const now = new Date();
        if (now >= tokenExpiry) {
          logout();
        }
      }
    };

    // Check immediately
    checkAndHandleExpiry();

    // Set up interval to check periodically
    const intervalId = setInterval(checkAndHandleExpiry, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [user, logout, router]);
};
