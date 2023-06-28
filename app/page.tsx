import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NewTodoForm from "./new-todo-form";
import React from "react";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: todos } = await supabase
    .from("todos")
    .select()
    .match({ user_id: session?.user.id });
  return (
    <div>
      <h1>Hello, {session?.user?.email}</h1>;
      <React.Suspense fallback={<div className="text-white">Loading...</div>}>
        <NewTodoForm />
      </React.Suspense>
      <div className="flex flex-col gap-2">
        {todos?.map((todo) => (
          <div key={todo.id}>{todo.name}</div>
        ))}
      </div>
    </div>
  );
}
