import { useState } from "react";
import { signIn } from "@/lib/auth";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await signIn(email, password);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-semibold">Log In</h2>
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[#0d9389] text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </form>
  );
};
