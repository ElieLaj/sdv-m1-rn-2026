import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TodoItem } from './todo-list';

interface TodoContextType {
  todos: TodoItem[];
  addTodo: (title: string, description: string) => void;
  editTodo: (id: string, title: string, description: string) => void;
  deleteTodo: (id: string) => void;
  setTodos: (todos: TodoItem[]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (title: string, description: string) => {
    const newTask: TodoItem = {
      id: Date.now().toString(),
      title,
      description,
    };
    setTodos((prev) => [newTask, ...prev]);
  };

  const editTodo = (id: string, title: string, description: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
