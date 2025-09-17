import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { session, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!session) return <Navigate to="/" replace />;

  return children;
};
