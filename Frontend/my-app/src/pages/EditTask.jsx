import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";
import API from "../services/api"; // adjust path if needed


export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTask(res.data.task);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) setError("❌ Not authenticated");
      else if (err.response?.status === 404) setError("❌ Task not found");
      else setError("❌ Failed to load task");
      setLoading(false);
    }
  };
  fetchTask();
}, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    await API.put(`/tasks/${id}`, task);
    alert("✅ Task updated successfully!");
    navigate("/dashboard");
  } catch (err) {
    const msg = err.response?.data?.message || "❌ Failed to update task";
    alert(msg);
  }
};

  if (loading) return <p className="loading-text">Loading task...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <form onSubmit={handleUpdate} className="task-form">
      <h2>Edit Task</h2>

      <label>Title</label>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
      />

      <label>Priority</label>
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Due Date</label>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate?.substring(0, 10) || ""}
        onChange={handleChange}
      />

      <button type="submit">Update Task</button>
    </form>
  );
}
