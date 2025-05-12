// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { getRole } from "../Services/AdminService";

// const NavigationBar = () => {
//   const { loggedIn, logout } = useContext(AuthContext);
//   const role = getRole();

//   return (
//     <nav>
//       {loggedIn ? (
//         role === "admin" ? (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <Link to="/projects">Projects</Link>
//             <Link to="/create-project">Create Project</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : role === "user" ? (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <Link to="/projects">Assigned Projects</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : null
//       ) : (
//         <>
//           <Link to="/">ASTRA</Link> <Link to="/">Home</Link>{" "}
//           <Link to="/about-us">About Us</Link>{" "}
//           <Link to="/feedback">Feedback</Link>{" "}
//           <Link to="/contact-us">Contact</Link>{" "}
//           <Link to="/sign-up">Register</Link>{" "}
//         </>
//       )}
//     </nav>
//   );
// };

// export default NavigationBar;


import React, { useContext, useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { getRole } from "../Services/AdminService";
import { Link } from "react-router-dom";
import './Nav.css';

const NavigationBar = () => {
  const { loggedIn, logout } = useContext(AuthContext);
  const role = getRole();

  useEffect(() => {
    if (loggedIn) 
    console.log("loggedIn:", loggedIn);
    console.log("role:", getRole());
  }, [loggedIn]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">ASTRA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {!loggedIn && (
              <>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about-us">
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/feedback">
                  <Nav.Link>Feedback</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact-us">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
              </>
            )}

            {loggedIn && role === "admin" && (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/projects">
                  <Nav.Link>Projects</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/create-project">
                  <Nav.Link>Create Project</Nav.Link>
                </LinkContainer>
              </>
            )}

            {loggedIn && role === "user" && (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/projects">
                  <Nav.Link>Assigned Projects</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>

          <Nav>
            {loggedIn ? (
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            ) : (
              <LinkContainer to="/sign-up">
                <Button variant="outline-light">Sign Up</Button>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
