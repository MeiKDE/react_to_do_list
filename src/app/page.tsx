"use client";
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  selected: boolean;
  completed: boolean;
}

export default function Home() {
  const [todos, setToDos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");

  //When the page loads, check if there’s a saved to-do list in the browser. If yes, load it and use it to show the to-dos.
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setToDos(JSON.parse(stored));
    }
  }, []);

  //This watches the todos state, and anytime it changes, it saves it to local storage.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // create a new object and append onto the todos array
  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      selected: false,
    };

    setToDos([...todos, newTodo]);
    setInput("");
  };

  //delete the data keeping all data minus the parameter id
  const deleteTodo = (id: number) => {
    setToDos(todos.filter((todo) => todo.id !== id));
  };

  //locate data and then update it by setting selected boolean from 'false' to 'true'
  const selectTodo = (id: number) => {
    setToDos(
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-8">
      <main className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          My Todo List
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a task..."
            />

            <button
              onClick={addTodo}
              className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>

          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                onClick={() => selectTodo(todo.id)}
                className="flex items-center justify-between rounded-md bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100"
              >
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-grow mr-2 border rounded px-2 py-1"
                  />
                ) : (
                  <span className="text-gray-700">{todo.text}</span>
                )}

                {editingId === todo.id ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = todos.map((t) =>
                        t.id === todo.id
                          ? {
                              ...t,
                              text: editInput,
                            }
                          : t
                      );
                      setToDos(updated);
                      setEditingId(null);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(todo.id);
                      setEditInput(todo.text);
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                  className="rounded-md px-3 py-1 text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
