import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../Services/AdminService";
import { toast } from "react-toastify";
import { getAssignedProjects } from "../../Services/ProjectService";

const AssignedProjects = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const navigate = useNavigate();
  const role = getRole();

  const fetchAssignedProjects = async () => {
    try {
      const response = await getAssignedProjects();
      if (response.status === 200) {
        setAssignedProjects(response.data);
        toast.success("Fetched User Assigned Projects");
      }
    } catch (error) {
      toast.error("Failed to fetched Assigned Projects");
    }
  };

  useEffect(() => {
    fetchAssignedProjects();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-project/${id}`);
  };

  const handleProjectView = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div>
      <h2>Assigned Projects</h2>
      <ul>
        {assignedProjects?.result?.length > 0 ? (
          assignedProjects.result.map((project) => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Deadline: {project.deadline.split('T')[0]}</p>
              <p>Status: {project.status}</p>
              <button onClick={() => handleProjectView(project.id)}>
                View Details
              </button>
              <button onClick={() => handleUpdate(project.id)}>Update</button>
            </li>
          ))
        ) : (
          <p>No assigned projects found..</p>
        )}
      </ul>
    </div>
  );
};

export default AssignedProjects;
