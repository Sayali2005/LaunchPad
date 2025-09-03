import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTask.css";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401) throw new Error("❌ Not authenticated");
          if (res.status === 404) throw new Error("❌ Task not found");
          throw new Error("❌ Failed to load task");
        }

        const data = await res.json();
        setTask(data.task);
        setLoading(false);
      } catch (err) {
        setError(err.message);
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
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("❌ Failed to update task");

      alert("✅ Task updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
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
