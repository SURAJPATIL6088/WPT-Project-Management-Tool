import React from "react";
import { Container, Col, Nav, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#181622"
 }}>
      <Container fluid>
        <Row
          className="text-white p-4"
          // style={{ backgroundColor: "#383838" }}
        >
          
          <Col md={4} className="mb-3"
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}>
            <h2 style={{ color: "#fff" }}>Astra</h2>
          </Col>

          {/* Navigation Links */}
          <Col md={4} className="mb-3"
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}>
            <Nav className="flex-row fs-5 ">
              <Nav.Link
                href="/"
                className="text-white"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  transition: "color 0.2s ease",
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/about-us"
                className="text-white"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  transition: "color 0.2s ease",
                }}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                href="/feedback"
                className="text-white"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  transition: "color 0.2s ease",
                }}
              >
                Feedback
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={4} className="mb-3"
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}>
            <p style={{ color: "#fff" }}>&copy; 2025 Astra. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
