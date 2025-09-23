import { supabase } from "@/lib/supabaseClient";
import { Todo } from "@/types";

// Fetch all todos for the authenticated user
export async function fetchTodos(): Promise<Todo[]> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error("No active session:", sessionError);
    return [];
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error.message);
    return [];
  }

  return data || [];
}


// Fetch a single todo by ID
export const fetchTodoById = async (id: string) => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error("No active session:", sessionError);
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .eq("user_id", session.user.id)
    .single();

  if (error) {
    console.error("Error fetching todo by id:", error.message);
    throw error;
  }

  return data;
};

// ✅ Delete a todo
export async function deleteTodo(id: string): Promise<string> {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error.message);
    throw error;
  }
  return id;
}
