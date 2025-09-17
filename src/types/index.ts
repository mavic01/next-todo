export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;   // 👈 match DB
  created_at: string;
}
