import React, { useState } from "react";
import { loginAdmin, storeToken } from "../Services/AdminService.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      toast.error("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      e.preventDefault();
      setLoading(true);
      console.log(formData);
      const response = await loginAdmin(formData);
      console.log("response : ", response);

      if (response.status === 200) {
        storeToken(response.data.token);
        console.log(response.data.token);
        toast.success("User Authenticated Successfully");
        //setTimeout(() => {
        //}, 3000);
        setLoading(false);
        navigate("/projects");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong...!");
      }
    }
  };

  const goToRegister = () => {
    navigate("/sign-up");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        if you do not have an account?{" "}
        <button onClick={goToRegister}>Register</button>
      </p>
    </div>
  );
};

export default Login;
