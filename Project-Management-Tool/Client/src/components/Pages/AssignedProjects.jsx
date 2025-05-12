import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../Services/AdminService";
import { toast } from "react-toastify";
import { getAssignedProjects } from "../../Services/ProjectService";
import { motion, AnimatePresence } from "framer-motion";
import "../ProjectList.css";

const AssignedProjects = () => {
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const role = getRole();

  const fetchAssignedProjects = async () => {
    try {
      const response = await getAssignedProjects();
      if (response.status === 200) {
        setAssignedProjects(response.data);
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
      <motion.h2
        className="heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Assigned Projects
      </motion.h2>

      <div className="project-grid">
        {assignedProjects?.result?.length > 0 ? (
          assignedProjects.result.map((project, index) => (
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
                <button
                  className="view-btn"
                  onClick={() => handleProjectView(project)}
                >
                  View
                </button>
                <button
                  className="update-btn"
                  onClick={() => handleUpdate(project.id)}
                >
                  Update
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
              <span className="close-btn" onClick={closeModal}>
                ×
              </span>
              <h2>Project Details</h2>
              <h3>Name: {selectedProject.name}</h3>
              <p>
                <strong>Description:</strong> {selectedProject.description}
              </p>
              <p>
                <strong>Assigned Employee Name:</strong>{" "}
                {selectedProject.username}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {selectedProject.deadline.split("T")[0]}
              </p>
              <p>
                <strong>Status:</strong> {selectedProject.status}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AssignedProjects;
