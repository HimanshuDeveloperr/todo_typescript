import { makeAutoObservable } from "mobx";

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
}

export class TodoStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadTodos();
  }

  addTodo = (task: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      task,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.unshift(newTodo);
    this.saveTodos();
  };

  toggleTodoAsCompleted = (id: string) => {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  };

  deleteTodo = (id: string) => {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveTodos();
    }
  };

  editTodo = (id: string, newTask: string) => {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.task = newTask;
      this.saveTodos();
    }
  };

  saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  };

  loadTodos = () => {
    if (typeof localStorage !== "undefined") {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    }
  };
  
}

export const todoStore = new TodoStore();
