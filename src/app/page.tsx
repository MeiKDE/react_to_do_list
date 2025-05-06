"use client";
import React, { useState } from "react";
import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/index";

export default function App() {
  // the task input and todo form will be changing between states
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      selected: false,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // update selected boolean field
  const selectedTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              selected: !todo.selected,
            }
          : todo
      )
    );
  };

  // update selected boolean field
  const completedTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
            }
          : todo
      )
    );
  };

  return (
    <>
      <main>
        <h1>Mei&apos;s To-Do List</h1>
        <div>
          {/* add form submission handling to allow adding todos by pressing Enter: */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                addTodo();
              }
            }}
          >
            <input
              placeholder="Add a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </form>
        </div>
      </main>

      <section>
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onSelectTodo={selectedTodo}
              onDeleteTodo={deleteTodo}
              onCompleteTodo={completedTodo}
              onEditTodo={editTodo}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
