"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/myComponents/NavBar";
import { SignupForm } from "@/components/myComponents/SignupForm";
import { LoginForm } from "@/components/myComponents/LoginForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (session) {
      router.push("/todos");
    }
  }, [session, router]);

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-bold mb-6">
          Welcome to Your Task Manager
        </h1>

        {/* Toggle between login and signup */}
        <div className="w-full max-w-sm p-6 rounded-xl shadow-md bg-white">
          {showLogin ? (
            <>
              <LoginForm />
              <p className="mt-4 text-sm text-center">
                Don’t have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-teal-600 cursor-pointer"
                  onClick={() => setShowLogin(false)}
                >
                  Sign up
                </Button>
              </p>
            </>
          ) : (
            <>
              <SignupForm />
              <p className="mt-4 text-sm text-center">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 text-teal-600 cursor-pointer"
                  onClick={() => setShowLogin(true)}
                >
                  Log in
                </Button>
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}
