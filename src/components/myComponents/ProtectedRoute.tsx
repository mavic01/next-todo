
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/"); // redirect to homepage
    }
  }, [loading, session, router]);

  if (loading) return <p>Loading...</p>;

  if (!session) return null; 

  return children;
};

