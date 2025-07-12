"use client"
import { useAuth } from "../context/authContext"
import "./Navbar.css"

const Navbar = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout()
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>📝 Todo App</h2>
        </div>
        <div className="navbar-user">
          <span className="user-greeting">
            Hello, <strong>{user?.firstName}</strong>
          </span>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
