import React, { useEffect } from "react";
import { deleteProject } from "../Services/ProjectService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RegisteredUsers from "./Pages/RegisteredUsers";
import { getRole } from "../Services/AdminService";

const ProjectList = () => {
  const { projects, fetchAllProjects } = useContext(AuthContext);

  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProject(id);

      if (response.status === 200) {
        fetchAllProjects();
        toast.success("Project deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  // console.log(projects.results);
  const handleUpdate = (id) => {
    navigate(`/update-project/${id}`);
  };

  const handleProjectView = async (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects?.results?.length > 0 ? (
          projects.results.map((project) => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button onClick={() => handleProjectView(project.id)}>
                View Details
              </button>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
              <button onClick={() => handleUpdate(project.id)}>Update</button>
            </li>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </ul>
      <div>{role === "admin" && <RegisteredUsers />}</div>
    </div>
  );
};

export default ProjectList;
