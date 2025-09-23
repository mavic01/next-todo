import { ReactElement, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

type Props = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const supabaseClient = useMemo(() => supabase, []);

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      }

      if (!session) {
        router.replace("/");
      } else {
        setSession(session);
      }

      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) router.replace("/");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router, supabaseClient]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  if (!session) return null;

  return children;
};
