import React, { useState } from "react";
import { loginAdmin, storeRole, storeToken } from "../Services/AdminService.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

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
        navigate("/dashboard");
        storeToken(response.data.token);
        storeRole(response.data.role);
        console.log(response.data.token);
        toast.success("User Authenticated Successfully");
        setLoading(false);
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

        <button className="button-cls" type="submit" disabled={loading}>
          <FaSignInAlt style={{ marginRight: "8px" }} />
          {loading ? "Logging in..." : "Login"}
        </button>

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
