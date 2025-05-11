import React, { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "./CreateProject.css"; // Link to external CSS for styling

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Testing");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { fetchAllProjects } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description) {
      setError("Both name and description are required.");
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

      // Reset
      setName("");
      setDescription("");
      setDeadline("");
      setStatus("Testing");
    } catch (error) {
      setError(error.message);
      toast.error("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <div className="modal-wrapper">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h2>Create a new project</h2>

        <input
          type="text"
          placeholder="Title (Required)*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description (Required)*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          placeholder="Project Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Testing</option>
          <option>Development</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Next"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
