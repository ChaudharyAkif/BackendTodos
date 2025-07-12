"use client"

import { useState } from "react"
import axios from "axios"
import "./CreateTodo.css"

const CreateTodo = ({ onTodoCreated }) => {
  const [todo, setTodo] = useState({ title: "", location: "", description: "" })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, location, description } = todo

    if (!title || !location || !description || !image) {
      alert("Please fill all fields and select an image.")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("location", location)
      formData.append("description", description)
      formData.append("image", image)

      await axios.post("http://localhost:5000/api/todos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      alert("Todo created successfully!")

      setTodo({ title: "", location: "", description: "" })
      setImage(null)
      setImagePreview(null)

      const fileInput = document.getElementById("image-input")
      if (fileInput) fileInput.value = ""

      if (onTodoCreated) {
        onTodoCreated()
      }
    } catch (error) {
      console.error("Error creating todo:", error)
      alert("Failed to create todo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-todo">
      <div className="create-todo-card">
        <div className="card-header">
          <h2>➕ Create New Todo</h2>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={todo.title}
              onChange={handleChange}
              placeholder="Enter todo title"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={todo.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={todo.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="form-textarea"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image-input">Image</label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-file-input"
              required
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="preview-image" />
              </div>
            )}
          </div>

          <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Creating...
              </>
            ) : (
              <>➕ Create Todo</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTodo
