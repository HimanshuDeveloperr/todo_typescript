"use client"

import { todoStore } from '@/Store/Todos';
import dynamic from 'next/dynamic';
import { observer } from "mobx-react";

import React from 'react';

const TodoList= () => {
  const todos =  todoStore.todos;

  let filterTodos = todos;

  const toggleTodoAsCompleted = (id: string) => {
    todoStore.toggleTodoAsCompleted(id);
  };

  const deleteTodo = (id: string) => {
    todoStore.deleteTodo(id);
  };

  return (
    <ul>
      {filterTodos.map((todo) => (
        <li key={todo.id} className='bg-[#596697cb] p-2 w-max text-center rounded-lg outline-none flex items-center justify-center border-t-[#fea49f] border-b-[#fea49f] border-[1px] border-l-[0px] border-r-[0px]'>
          <input type="checkbox" name="" id={`todo-${todo.id}`} className='mr-2' checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)}  />
          <label htmlFor={`todo-${todo.id}`} className='ml-2 mr-2 font-bold text-[#d0bdf4] '>{todo.task}</label>
          { 
            todo.completed && <button type="button" className='ml-3 mt-1 border-b-[1px] border-[white] text-[15px] text-center text-[#fea49f]' onClick={() => deleteTodo(todo.id)}> Delete </button>
          }
        </li>

      ))}
    </ul>
  );
};

export default dynamic(() => Promise.resolve(observer(TodoList)), { ssr: false });
