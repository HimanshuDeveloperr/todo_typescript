"use client"

import { todoStore } from '@/Store/Todos';
import dynamic from 'next/dynamic';
import { observer } from "mobx-react";


import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';


const TodoList = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState('');

  const searchParams = useSearchParams();
  const todosFilter = searchParams.get('todos');

  const todos = todoStore.todos;

  let filterTodos = todos;

  if (todosFilter === "active") {
    filterTodos = filterTodos.filter((todo) => !todo.completed);
  } else if (todosFilter === "completed") {
    filterTodos = filterTodos.filter((todo) => todo.completed);
  }

  const toggleTodoAsCompleted = (id: string) => {
    todoStore.toggleTodoAsCompleted(id);
  };

  const deleteTodo = (id: string) => {
    todoStore.deleteTodo(id);
  };

  const editTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditId(id);
      setEditTask(todo.task);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTask('');
  };

  const saveEdit = () => {
    if (editId) {
      todoStore.editTodo(editId, editTask);
      setEditId(null);
      setEditTask('');
    }
  };

  return (
    <ul>
      {filterTodos.map((todo) => (
        <li key={todo.id} className='bg-[#596697cb] p-2 w-max text-center rounded-lg outline-none flex m-3 items-center justify-center border-t-[#fea49f] border-b-[#fea49f] border-[1px] border-l-[0px] border-r-[0px]'>
          {editId === todo.id ? (
            <>
              <input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} className='mr-2' />
              <button type="button" className='ml-3 mt-1 border-b-[1px] border-[white] text-[15px] text-center text-[#fea49f]' onClick={saveEdit}>Save</button>
              <button type="button" className='ml-3 mt-1 border-b-[1px] border-[white] text-[15px] text-center text-[#fea49f]' onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <input type="checkbox" name="" id={`todo-${todo.id}`} className='mr-2' checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)} />
              <label htmlFor={`todo-${todo.id}`} className='ml-2 mr-2 font-bold text-[#d0bdf4] '>{todo.task}</label>
              {todo.completed && (
                <>
                  <button type="button" className='ml-3 mt-1 border-b-[1px] border-[white] text-[15px] text-center text-[#fea49f]' onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button type="button" className='ml-3 mt-1 border-b-[1px] border-[white] text-[15px] text-center text-[#fea49f]' onClick={() => editTodo(todo.id)}>Edit</button>
                </>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default dynamic(() => Promise.resolve(observer(TodoList)), { ssr: false });
