import React, { useState } from "react";

// Define a type for a single to-do item
interface Todo {
  id: number;
  text: string;
  selected: boolean;
  completed: boolean;
}

export const TodoItem = ({
  todo,
  onToggleSelect,
  onDelete,
  onToggleComplete,
  onEdit,
}: {
  todo: Todo;
  onToggleSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li
      className={`flex items-center justify-between p-2 mb-2 rounded ${
        todo.selected
          ? "bg-green-100 hover:bg-green-200"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={() => onToggleSelect(todo.id)}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggleComplete(todo.id);
          }}
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <span className={todo.completed ? "line-through text-gray-400" : ""}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-yellow-500 hover:text-yellow-700"
          >
            Edit
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
