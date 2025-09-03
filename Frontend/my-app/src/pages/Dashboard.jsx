// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        withCredentials: true, // send cookies with request
      });
      setTasks(res.data.tasks); // <-- note .tasks
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // if your API uses tokens
        },
        credentials: "include", // send cookies if using cookie-based auth
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Deleted:", data);
        alert("✅ Task Deleted successfully!");
        fetchTasks(); // refresh after delete
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📋 Task Dashboard</h1>

      <button className="add-task-btn" onClick={() => navigate("/add")}>
        <FaPlus /> Add Task
      </button>

<div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {tasks.length > 0 ? (
    tasks.map((task) => (
      <tr key={task._id}>
        <td data-label="Title">{task.title}</td>
        <td data-label="Description">{task.description}</td>
        <td data-label="Priority" className={`priority-${task.priority}`}>
          {task.priority}
        </td>
        <td data-label="Due Date">
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"}
        </td>
        <td data-label="Status">
          {task.completed ? "✅ Done" : "⏳ Pending"}
        </td>
        <td data-label="Actions">
          <button
            className="edit-btn"
            onClick={() => navigate(`/edit/${task._id}`)}
          >
            <FaEdit />
          </button>
          <button
            className="delete-btn"
            onClick={() => handleDelete(task._id)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No tasks yet
      </td>
    </tr>
  )}
</tbody>

      </table>
      </div>
    </div>
  );
}
