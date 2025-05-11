import React, { useEffect, useState, useContext } from "react";
import { deleteProject } from "../Services/ProjectService";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectList.css";

const ProjectList = () => {
  const { projects, fetchAllProjects } = useContext(AuthContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
    navigate(`/update-project/${id}`);
  };

  const handleProjectView = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="project-container">
      <motion.h2 className="heading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Your Projects
      </motion.h2>
      <div class="projects">
         <img src="./R.png" alt="" />
      </div>
          <div className="project-grid">
        {projects?.results?.length > 0 ? (
          projects.results.map((project, index) => (
            <motion.div
              className="project-card"
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3>{project.name}</h3>
              <p className="truncate">{project.description}</p>
              <div className="button-group">
                <button className="view-btn" onClick={() => handleProjectView(project)}>
                  View
                </button>
                <button className="update-btn" onClick={() => handleUpdate(project.id)}>
                  Update
                </button>
                <button className="delete-btn" onClick={() => handleDelete(project.id)}>
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="no-projects">No projects found.</p>
        )}
      </div>

      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div
            className="modal-overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <span className="close-btn" onClick={closeModal}>×</span>
              <h2>Project Details</h2>
        <h3>Name: {selectedProject.name}</h3>
        <p><strong>Description:</strong> {selectedProject.description}</p>
        <p><strong>Project Manager Id:</strong> {selectedProject.managerId}</p>
        <p><strong>Project assigned Employee Id:</strong> {selectedProject.assignedTo}</p>
        <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
        <p><strong>End Date:</strong> {selectedProject.deadline}</p>
        <p><strong>Project Status:</strong> {selectedProject.status}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectList;
