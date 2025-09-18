'use client'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTodoById as fetchTodo } from "@/services/todoService";

import { Todo } from "@/types";

export default function TodoDetail() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id!),
    enabled: !!id, // don’t run until id exists
  });

  if (!id) {
    return (
      <main className="p-6 text-center">
        <p className="text-red-600">Invalid todo ID</p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main
        className="min-h-screen bg-stone-100 flex items-center justify-center p-6"
        role="main"
        aria-label="Loading state"
        aria-busy="true"
      >
        <div
          className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
          role="region"
          aria-label="Loading todo details"
        >
          <h1
            className="text-2xl font-bold mb-4 text-teal-600"
            role="heading"
            aria-level={1}
          >
            Loading Todo...
          </h1>
          <div className="space-y-4" aria-hidden="true">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-40 mt-4" />
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main
        className="min-h-screen bg-stone-100 flex items-center justify-center p-6"
        role="main"
        aria-label="Error state"
      >
        <div
          className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
          role="region"
          aria-label="Error message"
        >
          <p className="text-red-600 text-center font-semibold" role="alert">
            ⚠️ Error fetching todo.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-stone-100 flex items-center justify-center p-6"
      role="main"
      aria-label="Todo detail view"
    >
      <div
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
        role="region"
        aria-label="Todo detail card"
      >
        <header>
          <h1
            className="text-2xl font-bold text-teal-700 mb-6 text-center"
            role="heading"
            aria-level={1}
          >
            Todo Details
          </h1>
        </header>

        <section role="region" aria-label="Todo information">
          <dl className="space-y-4" tabIndex={0}>
            {[
              ["ID", todo?.id],
              ["User ID", todo?.user_id],
              ["Title", todo?.title],
              ["Status", todo?.completed ? "✅ Completed" : "❌ Not Completed"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-x-4">
                <dt className="font-semibold text-gray-800">{label}:</dt>
                <dd className="text-gray-700 text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav
          className="mt-8 text-center"
          role="navigation"
          aria-label="Back to todos list"
        >
          <Link
            href="/todos"
            className="inline-block bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition"
            aria-label="Go back to the list of todos"
          >
            ← Back to Todos
          </Link>
        </nav>
      </div>
    </main>
  );
}
