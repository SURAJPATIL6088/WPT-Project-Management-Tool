import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            required
            minLength={3}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={goToLogin}>Login</button>
      </p>
    </div>
  );
};

export default Register;
