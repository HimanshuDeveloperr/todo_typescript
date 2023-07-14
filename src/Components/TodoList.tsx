"use client"

import { todoStore } from '@/Store/Todos';
import dynamic from 'next/dynamic';
import { observer } from "mobx-react";

import React from 'react';

const TodoList= () => {
  const todos =  todoStore.todos;

  let filterTodos = todos;

  return (
    <div>
      {filterTodos.map((todo) => (
        <li key={todo.id}>{todo.task}</li>
      ))}
    </div>
  );
};

export default dynamic(() => Promise.resolve(observer(TodoList)), { ssr: false });
