import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Col, Row, Container, Alert, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "./CreateProject.css";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { fetchAllProjects } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !status || !deadline) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          deadline,
          status,
          created_by: userId,
        }),
      });

      if (!response.ok) throw new Error("Failed to create project");

      const data = await response.json();
      toast.success("Project created successfully");
      fetchAllProjects();
      setName("");
      setDescription("");
      setDeadline("");
      setStatus("");
    } catch (error) {
      setError(error.message);
      toast.error("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 create-project-container">
      <h2>Create New Project</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="description">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        

        
          <Col md={6}>
            <Form.Group controlId="deadline">
              <Form.Label>Project Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Project Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Testing">Testing</option>
                <option value="Development">Development</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Col>
        

        <div className=" justify-content-end">
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="px-4"
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Create Project"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateProject;
