"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import "./TodoList.css"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null)
  const [newImage, setNewImage] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos")
      setTodos(response.data)
    } catch (error) {
      console.error("Failed to fetch todos:", error)
      alert("Failed to fetch todos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const deleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return

    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
      alert("Todo deleted successfully!")
    } catch (error) {
      console.error("Delete failed:", error)
      alert("Delete failed")
    }
  }

  const handleEditChange = (e) => {
    setEditTodo({ ...editTodo, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0])
  }

  const updateTodo = async () => {
    const formData = new FormData()
    formData.append("title", editTodo.title)
    formData.append("location", editTodo.location)
    formData.append("description", editTodo.description)
    if (newImage) formData.append("image", newImage)

    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${editTodo._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setTodos(todos.map((todo) => (todo._id === editTodo._id ? response.data : todo)))
      setEditTodo(null)
      setNewImage(null)
      alert("Todo updated successfully!")
    } catch (error) {
      console.error("Update failed:", error)
      alert("Update failed")
    }
  }

  const cancelEdit = () => {
    setEditTodo(null)
    setNewImage(null)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading todos...</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No todos found</h3>
          <p>Create your first todo to get started!</p>
        </div>
      ) : (
        <div className="todos-grid">
          {todos.map((todo) => (
            <div key={todo._id} className="todo-card">
              {editTodo && editTodo._id === todo._id ? (
                <div className="edit-form">
                  <input
                    name="title"
                    value={editTodo.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                    className="edit-input title-input"
                  />
                  <input
                    name="location"
                    value={editTodo.location}
                    onChange={handleEditChange}
                    placeholder="Location"
                    className="edit-input"
                  />
                  <textarea
                    name="description"
                    value={editTodo.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                    className="edit-textarea"
                    rows="3"
                  />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="edit-file-input" />
                  <div className="edit-buttons">
                    <button onClick={updateTodo} className="save-btn">
                      💾 Save
                    </button>
                    <button onClick={cancelEdit} className="cancel-btn">
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-header">
                    <h3 className="todo-title">{todo.title}</h3>
                    <div className="todo-actions">
                      <button onClick={() => setEditTodo(todo)} className="edit-btn" title="Edit todo">
                        ✏️
                      </button>
                      <button onClick={() => deleteTodo(todo._id)} className="delete-btn" title="Delete todo">
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="todo-location">
                    <span className="location-icon">📍</span>
                    <span className="location-text">{todo.location}</span>
                  </div>

                  <p className="todo-description">{todo.description}</p>

                  {todo.image && (
                    <div className="todo-image-container">
                      <img src={`${todo.image}?t=${new Date().getTime()}`} alt="Todo" className="todo-image" />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList
