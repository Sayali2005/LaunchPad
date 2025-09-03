import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // import the new page
import Register from "./pages/Register";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
      
    </BrowserRouter>

  );
}

export default App;
