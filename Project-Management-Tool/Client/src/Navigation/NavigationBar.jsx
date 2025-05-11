import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getRole } from "../Services/AdminService";

const NavigationBar = () => {
  const { loggedIn, logout } = useContext(AuthContext);
  const role = getRole();

  return (
    <nav>
      {loggedIn ? (
        role === "admin" ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/create-project">Create Project</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : role === "user" ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Assigned Projects</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : null
      ) : (
        <>
          <Link to="/">ASTRA</Link> <Link to="/">Home</Link>{" "}
          <Link to="/about-us">About Us</Link>{" "}
          <Link to="/feedback">Feedback</Link>{" "}
          <Link to="/contact-us">Contact</Link>{" "}
          <Link to="/sign-up">Register</Link>{" "}
        </>
      )}
    </nav>
  );
};

export default NavigationBar;
