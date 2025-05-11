import React, { useState } from "react";
import { loginAdmin, storeToken } from "../Services/AdminService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa"; // Import login icon
import "./Login.css"; // Import external CSS file

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await loginAdmin(formData);
      if (response.status === 200) {
        storeToken(response.data.token);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/sign-up");
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="title">Login</h2>

        <input
          className="input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        <input
          className="input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
       <div class="btn">
       <button className="button" type="submit" disabled={loading}>
          <FaSignInAlt style={{ marginRight: "8px" }} />
          {loading ? "Logging in..." : "Login"}
        </button>
       </div>
        

        <p className="text">
          Don't have an account?{" "}
          <span className="link" onClick={goToRegister}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
