"use client";
import { trpc } from "@/server/client";
import React from "react";

function TodoTable() {
  const { data, error, status } = trpc.todoRouter.list.useQuery();
  return (
    <div>
      <h1>Todo List</h1>
      {data?.map((val) => (
        <div className=" flex">
          {val.id}
          {val.item}
        </div>
      ))}
    </div>
  );
}

export default TodoTable;
