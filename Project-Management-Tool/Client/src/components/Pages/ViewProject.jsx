import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../../Services/AdminService";
import { getProjectById } from "../../Services/ProjectService";
import "./ViewProject.css";

const ViewProject = () => {
  const { id } = useParams(); // fixed param name
  const [projectData, setProjectData] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(id);
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
  }, [id]);

  if (!projectData) {
    return <div className="view-container">Loading project data...</div>;
  }
  

  return (
    <div className="view-container">
      <div className="project-card">
        <h2>Project Details</h2>
        <h3>Name: {projectData.name}</h3>
        <p><strong>Description:</strong> {projectData.description}</p>
        <p><strong>Project Manager Id:</strong> {projectData.managerId}</p>
        <p><strong>Project assigned Employee Id:</strong> {projectData.assignedTo}</p>
        <p><strong>Start Date:</strong> {projectData.startDate}</p>
        <p><strong>End Date:</strong> {projectData.deadline}</p>
        <p><strong>Project Status:</strong> {projectData.status}</p>
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default ViewProject;
