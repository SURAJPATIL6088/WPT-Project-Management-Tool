import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { getProjectById, updateProject } from "../Services/ProjectService";
import { getToken } from "../Services/AdminService";
import "./UpdateProject.css";

const UpdateProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { fetchAllProjects } = useContext(AuthContext);

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: "Development",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        if (response.status === 200) {
          setProjectData(response.data);
        } else {
          toast.error("Failed to fetch project data");
        }
      } catch (error) {
        toast.error("Error fetching project data");
      }
    };

    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "assignedTo") {
      const regex = /^[A-Za-z]*$/;
      if (!regex.test(value)) return;
    }

    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = projectData;

    if (!name || !description) {
      setError("Both name and description are required.");
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = getToken();
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      const response = await updateProject(projectId, projectData);
      if (response.status === 200) {
        fetchAllProjects();
        toast.success("Project updated successfully!");
        navigate("/projects");
      }
    } catch (err) {
      toast.error("Failed to update project.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Update Project</h2>
        <p>Project Id : {projectId}</p>

        <form onSubmit={handleSubmit}>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            placeholder="Enter project name"
          />

          <label>Project Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
            placeholder="Enter project description"
          />

          <label>Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            value={projectData.assignedTo}
            onChange={handleChange}
            placeholder="Enter user ID"
            pattern="[A-Za-z]+"
            title="Only letters allowed"
            required
          />

          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={projectData.deadline}
            onChange={handleChange}
          />

          <label>Project Status</label>
          <select
            name="status"
            value={projectData.status}
            onChange={handleChange}
          >
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Completed">Completed</option>
          </select>

          {error && <p className="error">{error}</p>}

          <div className="btn-box">
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Project"}
            </button>
            <button className="get-users-btn" type="button">Get Users</button>
          </div>
        </form>
      </div>

      <footer>Footer</footer>
    </div>
  );
};

export default UpdateProject;
