import React from "react";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../../Services/AdminService";
import { getProjectById } from "../../Services/ProjectService";

const ViewProject = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState({ name: "", description: "" });
  const token = getToken();

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

  return (
    <div>
      <div>
        <h2>Project Details of {projectId}</h2>
        <h3>Name : {projectData.name}</h3>
        <p>Description : {projectData.description}</p>
        <p>Project Manager Id : {projectData.created_by}</p>
        <p>Project assigned Employee Id : {projectData.assigned_to}</p>
        <p>Start Date : {projectData.created_at?.split('T')[0]}</p>
        <p>End Date : {projectData.deadline?.split("T")[0]}</p>
        <p>Project Status : {projectData.status}</p>
      </div>
    </div>
  );
};

export default ViewProject;
