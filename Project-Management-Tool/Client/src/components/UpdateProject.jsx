import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProjectById, updateProject } from "../Services/ProjectService";
import { getRole, getToken } from "../Services/AdminService";
import RegisteredUsers from "./Pages/RegisteredUsers";
import "./UpdateProject.css";

const UpdateProject = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    assigned_to: "",
    deadline: "",
    status: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchAllProjects } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = getRole();

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

    const { name, description, assigned_to, deadline, status } = projectData;
    if (!name || !description || !assigned_to || !deadline || !status) {
      toast.error("All fields are required");
      setError("All fields are required");
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
    <div className="main-container">
    <div className="container">
      <div className="form-container">
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
          {role === "admin" && (
            <div>
              <div>
                <label htmlFor="assigned_to">Assigned To</label>
                <input
                  type="text"
                  id="assigned_to"
                  name="assigned_to"
                  value={projectData.assigned_to}
                  onChange={handleChange}
                  placeholder="Enter the person assigned to the project"
                />
              </div>
              <div>
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={projectData.deadline}
                  onChange={handleChange}
                  placeholder="Enter project deadline"
                />
              </div>
            </div>
          )}{" "}
          {role === "user" && (
            <div>
              <label htmlFor="deadline">Updated On</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={projectData.deadline}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const originalDeadline = new Date(projectData.deadline);

                  if (selectedDate > originalDeadline) {
                    alert(
                      "Selected date cannot be after the original deadline."
                    );
                    return;
                  }

                  handleChange(e);
                }}
                placeholder="Enter project deadline"
              />
            </div>
          )}
          <div>
            <label htmlFor="status">Project Status</label>
            <select
              id="status"
              name="status"
              value={projectData.status}
              onChange={handleChange}
            >
              <option className="radio-txt" value="Pending">
                Pending
              </option>
              <option className="radio-txt" value="In Progress">
                In Progress
              </option>
              <option className="radio-txt" value="Development">
                Development
              </option>
              <option className="radio-txt" value="Testing">
                Testing
              </option>
              <option className="radio-txt" value="Completed">
                Completed
              </option>
            </select>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>
      <div>{role === "admin" && <RegisteredUsers />}</div>
    </div>
    </div>
  );
};

export default UpdateProject;
