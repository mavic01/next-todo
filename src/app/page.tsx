// // import { ReactElement } from "react"
// // import { Routes, Route } from "react-router-dom"
// // import Home from "./pages/Home"
// // import NotFound from "./pages/NotFound"
// // import Todos from "./pages/Todos"
// // import TodoDetail from "./pages/TodoDetail"

// // function App(): ReactElement {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Home />} />
// //       <Route path="/todos" element={<Todos />} />
// //       <Route path="/todos/:id" element={<TodoDetail />} />
// //       <Route path="*" element={<NotFound />} />
// //     </Routes>
// //   )
// // }

// // export default App


// import { ReactElement } from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import Todos from "./pages/Todos";
// import TodoDetail from "./pages/TodoDetail";
// import { ProtectedRoute } from "./components/myComponents/ProtectedRoute"; 
// import { AuthProvider } from "./contexts/AuthContext";

// function App(): ReactElement {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/todos"
//           element={
//             <ProtectedRoute>
//               <Todos />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/todos/:id"
//           element={
//             <ProtectedRoute>
//               <TodoDetail />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;

"use client"

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

  // Redirect if logged in
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
        <h1 className="text-2xl font-bold mb-6">Welcome to Your Task Manager</h1>

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
