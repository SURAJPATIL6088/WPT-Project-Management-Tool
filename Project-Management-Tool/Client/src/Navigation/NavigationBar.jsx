// import React from 'react'
// import { Link } from 'react-router-dom'

// const NavigationBar = () => {
//   return (
//     <div>
//         <Link to={"/"}>Home</Link>
//         <Link to={"/about-us"}>About Us</Link>
//         <Link to={"/feedback"}>Feedback</Link>
//         <Link to={"/contact-us"}>Contact Us</Link>
//         <Link to={"/sign-in"}>Sign In</Link>
//         <Link to={"/sign-up"}>Sign Up</Link>
//         {/* <Link to={"/projects"}>Project List</Link>
//         <Link to={"/create-project"}>Create Project</Link> */}
        

//     </div>
//   )
// }

// export default NavigationBar

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavigationBar = () => {
  const { loggedIn, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      <Link to="/about-us">About Us</Link>{" "}
      <Link to="/feedback">Feedback</Link>{" "}
      <Link to="/contact-us">Contact</Link>{" "}
      {loggedIn ? (
        <>
          <Link to="/projects">Projects</Link>{" "}
          <Link to="/create-project">Create Project</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          
          <Link to="/sign-up">Register</Link>{" "}
        </>
      )}
    </nav>
  );
};

export default NavigationBar;
