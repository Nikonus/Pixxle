"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useStoreUser() {
  const { isSignedIn, isLoaded } = useUser();
  const storeUser = useMutation(api.users.storeUser);

  const hasStored = useRef(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 IMPORTANT

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (hasStored.current) return;

    const syncUser = async () => {
      try {
        setIsLoading(true);
        await storeUser();
        hasStored.current = true;
      } catch (err) {
        console.error("Error storing user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, storeUser]);

  return { isLoading };
}