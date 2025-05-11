import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai"; // Import icon
import './Register.css'; // Import external CSS

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess("User registered successfully. Redirecting to login...");
        setUsername("");
        setPassword("");
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
          <label>Username</label>
          <input
            type="text"
            value={username}
            required
            minLength={3}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
         <div class ="btn">
         <button type="submit" className="submit-button">
          <AiOutlineUserAdd /> Register
        </button>
         </div>
       

        <p className="login-link">
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            className="login-button"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
