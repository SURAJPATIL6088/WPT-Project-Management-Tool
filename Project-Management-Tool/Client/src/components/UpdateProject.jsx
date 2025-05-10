import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProjectById, updateProject } from "../Services/ProjectService";
import { getToken } from "../Services/AdminService";

const UpdateProject = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchAllProjects } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

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

  useEffect(() => {
    fetchProject();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description } = projectData;
    if (!name || !description) {
      toast.error("Both name and description are required..");
      setError("Both name and description are required..");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = getToken();
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      console.log(projectData);
      const response = await updateProject(projectId, projectData);

      if (response.status === 200) {
        fetchAllProjects();
        setProjectData(response.data);
        toast.success("Project Updated Successfully");
        navigate("/projects");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error in Project Update..");
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Project Id : {projectId}</label>
        </div>
        <div>
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            placeholder="Enter project name"
          />
        </div>
        <div>
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            placeholder="Enter project description"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
