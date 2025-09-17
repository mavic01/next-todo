import { useState } from "react";
import { signUp } from "@/lib/auth";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await signUp(email, password);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Check your email for confirmation.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <h2 className="text-xl font-semibold">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[#0d9389] text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </form>
  );
};
