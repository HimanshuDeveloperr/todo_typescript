"use client";

import { todoStore } from "@/Store/Todos";
import { observer } from "mobx-react";
import React, { FormEvent, useState } from "react";

const AddToDO: React.FC = observer(() => {
  const [todo, setTodo] = useState("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    todoStore.addTodo(todo);
    const addedTodo = todoStore.todos[0].task; // Get the last added todo
    console.log(addedTodo); // Log the added todo
    setTodo("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name=""
        id=""
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="add new task"
        className="border-[1px] outline-none text-center border-[#8458B3] w-80  rounded-lg bg-[#8458B3] placeholder:text-center text-[#d0bdf4] "
      />
      <button
        type="submit"
        className="bg-[#a0d2eb] px-1 rounded-lg ml-1 text-center text-[15px] text-[#8458B3]"
      >
        Add
      </button>
    </form>
  );
});

export default AddToDO;