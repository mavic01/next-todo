// // src/services/todoService.js
// import axios from "axios";

// const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// // // Get all todos
// // export const fetchTodos = async () => {
// //   const res = await axios.get(BASE_URL);
// //   return res.data;
// // };

// // Get single todo
// export const fetchTodoById = async (id) => {
//   const res = await axios.get(`${BASE_URL}/${id}`);
//   return res.data;
// };


import { supabase } from "@/lib/supabaseClient";
import { Todo } from "@/types";

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
    .eq("user_id", session.user.id) // only their todos
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error.message);
    return [];
  }

  return data || [];
}


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
    .eq("id", id)                 // match todo id
    .eq("user_id", session.user.id) // ensure it's owned by the logged-in user
    .single();

  if (error) {
    console.error("Error fetching todo by id:", error.message);
    throw error;
  }

  return data;
};



// ✅ Delete a todo
export async function deleteTodo(id: string): Promise<string> {
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error.message);
    throw error;
  }

  // return the deleted todo's id so onSuccess knows what to filter out
  return id;
}




// // ✅ Update a todo
// export async function updateTodo(id: string, updates: Partial<Todo>) {
//   const { data, error } = await supabase
//     .from("todos")
//     .update(updates)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error("Error updating todo:", error.message);
//     throw error;
//   }

//   return data;
// }