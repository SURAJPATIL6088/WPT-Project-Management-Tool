import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../Services/AdminService";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { projects, fetchAllProjects } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !deadline) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = getToken("token");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      //console.log(token);
      //console.log(decoded.userId);

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
      console.log("Project created:", data);
      toast.success("Project created successfully");
      fetchAllProjects();
      setName("");
      setDescription("");
      setDeadline("");
      setStatus("");
    } catch (error) {
      setError(error.message);
      console.error("Error creating project:", error);
      toast.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>
        <div>
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Enter project deadline"
          />
        </div>

        <div>
          <label htmlFor="status">Project Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Testing">Testing</option>
            <option value="Development">Development</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
