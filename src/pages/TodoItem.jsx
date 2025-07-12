import React from "react";

const TodoItem = ({ todo, onDelete, onEdit }) => {
  return (
    <div className="todo-item">
      <h3>{todo.title}</h3>
      <p><strong>Location:</strong> {todo.location}</p>
      <p>{todo.description}</p>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
