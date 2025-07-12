"use client"

import { useState } from "react"
import TodoList from "./TodoList"
import CreateTodo from "./CreateTodo"
import "./Dashboard.css"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list")
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTodoCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
    setActiveTab("list")
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Todos</h1>
          <p>Manage your tasks efficiently</p>
        </div>

        <div className="tabs">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
            >
              📋 Todo List
            </button>
            <button
              className={`tab-button ${activeTab === "create" ? "active" : ""}`}
              onClick={() => setActiveTab("create")}
            >
              ➕ Create Todo
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "list" ? (
              <TodoList key={refreshTrigger} />
            ) : (
              <CreateTodo onTodoCreated={handleTodoCreated} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
