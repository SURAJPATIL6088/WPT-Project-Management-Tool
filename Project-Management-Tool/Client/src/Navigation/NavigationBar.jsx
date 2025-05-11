import React, { useContext, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Outlet } from "react-router-dom"; 
import "./Nav.css"; 

const NavigationBar = () => {
  const { loggedIn, logout } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <>
      {loggedIn ? (
        <>
          {/* Top Navbar */}
          <Navbar  variant="dark" expand="lg" className="px-3 fixed-top  " style={{ backgroundColor: "#181622" }}>
            <Container fluid>
              <Button
                variant="outline-light"
                className="me-3"
                onClick={toggleSidebar}
              >
                ☰
              </Button>
              <Navbar.Brand href="/" id="main-container">Astra</Navbar.Brand>
              <Form className="d-flex mx-auto bg-dark" style={{ width: "40%" }}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                />
              </Form>
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </Container>
          </Navbar>

          {/* Sidebar - visible only on large screens */}
          {showSidebar && (
            <div
              className=" sidebar d-none d-lg-block "
            >
              <Nav className="side-nav flex-column p-3 " style={{ backgroundColor: "#181622" }}>
                <LinkContainer className="side" to="/dashboard">
                  <Nav.Link className=" text-white border-bottom">Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/projects">
                  <Nav.Link className="text-white border-bottom">Projects</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/create-project">
                  <Nav.Link className="text-white  border-bottom">Create Project</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/create-project" onClick={toggleSidebar}>
                  <Nav.Link className="text-white border-bottom">Community</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/create-project" onClick={toggleSidebar}>
                  <Nav.Link className="text-white ">New Team</Nav.Link>
                </LinkContainer>
                <Button  variant="outline-light" onClick={logout}>
                Logout
              </Button>
              </Nav>
            </div>
          )}

          {/* Main content shifted when sidebar is visible */}
          <div className={`main-content pt-5 ${showSidebar ? "shifted" : ""}`}>
            <Outlet />
          </div>

          {/* Sidebar for small screens */}
          <Offcanvas
            show={showSidebar}
            onHide={toggleSidebar}
            responsive="lg"
            backdrop
          >
            <Offcanvas.Header closeButton className="bg-dark " >
              <Offcanvas.Title className="text-white"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="bg-dark text-white">
              <Nav className="flex-column">
                <LinkContainer className="side" to="/dashboard" onClick={toggleSidebar}>
                  <Nav.Link className="text-white border-bottom">Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/projects" onClick={toggleSidebar}>
                  <Nav.Link className="text-white border-bottom">Projects</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/create-project" onClick={toggleSidebar}>
                  <Nav.Link className="text-white border-bottom">Create Project</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/create-project" onClick={toggleSidebar}>
                  <Nav.Link className="text-white border-bottom">Community</Nav.Link>
                </LinkContainer>
                <LinkContainer className="side" to="/create-project" onClick={toggleSidebar}>
                  <Nav.Link className="text-white border-bottom">New Team</Nav.Link>
                </LinkContainer>
                <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      ) : (
        <Navbar style={{ backgroundColor: "#181622" }} expand="lg" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Astra</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
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
              </Nav>
              <LinkContainer to="/sign-up">
                <Button style={{ backgroundColor: "#420838" }} variant="outline-light">
                  Sign Up
                </Button>
              </LinkContainer>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default NavigationBar;
