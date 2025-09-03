import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddTask.css";
import API from "../services/api"; // make sure path is correct


export default function AddTask({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/tasks", {
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    });

    if (onTaskAdded) onTaskAdded(res.data);

    alert("✅ Task added successfully!");
    navigate("/dashboard");

    setTask({ title: "", description: "", priority: "low", dueDate: "" });
  } catch (err) {
    console.error("Error adding task:", err);
    alert("❌ Failed to add task. Please try again.");
  }
};


  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task description"
        value={task.description}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="low">Low priority</option>
        <option value="medium">Medium priority</option>
        <option value="high">High priority</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <button type="submit">➕ Add Task</button>
    </form>
  );
}
