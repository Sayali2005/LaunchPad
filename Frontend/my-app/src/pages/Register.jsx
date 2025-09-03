import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password, username };
      const res = await API.post("/auth/register", body);
      console.log("Registered user:", res.data);

      // ✅ Alert message
      alert("Registration successful! 🎉 Redirecting to dashboard...");

      // ✅ Redirect
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      
        <p className="signup-note">
          Already registered? &nbsp;<Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
