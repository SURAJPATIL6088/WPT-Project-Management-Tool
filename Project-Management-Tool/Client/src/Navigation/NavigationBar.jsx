import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavigationBar = () => {
  const { loggedIn, logout } = useContext(AuthContext);

  return (
    <nav>
      {loggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/projects">Projects</Link>{" "}
          <Link to="/create-project">Create Project</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/">ASTRA</Link>{" "}
          <Link to="/">Home</Link> <Link to="/about-us">About Us</Link>{" "}
          <Link to="/feedback">Feedback</Link>{" "}
          <Link to="/contact-us">Contact</Link>{" "}
          <Link to="/sign-in">Login</Link>{" "}
        </>
      )}
    </nav>
  );
};

export default NavigationBar;
