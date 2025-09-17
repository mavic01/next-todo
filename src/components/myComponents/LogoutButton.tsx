import { signOut } from "@/lib/auth";

export const LogoutButton = () => {
  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded w-full"
    >
      Logout
    </button>
  );
};
