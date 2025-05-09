import React, { useEffect } from "react";
import { deleteProject } from "../Services/ProjectService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProjectList = () => {
  const { projects, fetchAllProjects } = useContext(AuthContext);

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

  const handleUpdate = (id) => {
    console.log({ projects });
    try {
    } catch (error) {}
  };

  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>{project.created_by}</p>
            <p>{project.createdAt}</p>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
            <button onClick={() => handleUpdate(project.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
