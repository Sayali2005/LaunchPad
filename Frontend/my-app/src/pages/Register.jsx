import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); // ✅ use context register
const handleRegister = async (e) => {
  e.preventDefault();
  try {
    // ✅ Use context register function instead of direct API call
    const res = await register(name, email, password, username);

    console.log("Registered user:", res.data);

    alert("Registration successful! 🎉 Redirecting to dashboard...");
    navigate("/dashboard"); // Navbar will now show "Hi, username"
  } catch (err) {
    console.error(err.response?.data || err);
    alert(err.response?.data?.message || "Registration failed!");
  }
};


  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Sign Up</h2>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        <p className="signup-note">
          Already registered? &nbsp;<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
