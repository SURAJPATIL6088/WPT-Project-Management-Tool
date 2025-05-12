import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./Register.css";

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (username.length < 3)
      return setError("Username must be at least 3 characters");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();
      console.log(response);
      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("User registered successfully. Redirecting to login...");
        setUsername("");
        setPassword("");
        setRole("");
        setTimeout(() => {
          onRegisterSuccess();
        }, 1500);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  const goToLogin = () => {
    navigate("/sign-in");
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            required
            className="input-field"
            minLength={3}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            minLength={6}
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          <AiOutlineUserAdd /> Register
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <span className="link" onClick={goToLogin}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
