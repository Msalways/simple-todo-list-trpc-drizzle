"use client";

import { trpc } from "@/server/client";
import React, { useState } from "react";

export default function Home() {
  const { data, error, isPending, refetch } = trpc.todoRouter.list.useQuery();
  const [msg, setMsg] = useState("Add Todo");

  const todolistSchema = {
    id: null || 0,
    item: "",
  };

  const [todoListInfo, setTodoListInfo] = useState<{
    id: number;
    item: string;
  }>(todolistSchema);

  const mutation = trpc.todoRouter.insert.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  const deleteMutation = trpc.todoRouter.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const updateMutation = trpc.todoRouter.update.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      setTodoListInfo((prev) => ({
        ...prev,
        item: e.target?.value,
      }));
    } catch (error) {}
  };

  const addTodo = async () => {
    try {
      await mutation.mutateAsync({ item: todoListInfo.item });
      console.log(mutation.data);
      setTodoListInfo(todolistSchema);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const editTodo = async () => {
    try {
      // console.log(todoListInfo);

      await updateMutation.mutateAsync(todoListInfo);
      console.log(updateMutation.data);
      setMsg("Add Todo");

      setTodoListInfo(todolistSchema);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync({ id });
      console.log(deleteMutation.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <h1 className="text-6xl font-bold">Todo List</h1>
      <div className=" flex flex-col items-center justify-between gap-10">
        <input
          className=" text-gray-950"
          type="text"
          value={todoListInfo.item}
          onChange={handleOnChange}
        />
        <button
          type="button"
          onClick={() => {
            if (msg === "Add Todo") addTodo();
            else editTodo();
          }}
        >
          {msg}
        </button>
      </div>
      {data?.map((val, i) => (
        <div key={i} className=" flex flex-row gap-x-9">
          <p className=" p-3" key={val.id}>
            {val.item}
          </p>
          <button
            type="button"
            className=" bg-slate-600 border-spacing-2 p-3"
            onClick={() => handleDelete(val.id)}
          >
            Delete
          </button>

          <button
            type="button"
            className=" bg-slate-600 border-spacing-2 p-3"
            onClick={() => {
              setMsg("Edit Todo");
              setTodoListInfo({
                item: val.item,
                id: val.id,
              });
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </main>
  );
}
