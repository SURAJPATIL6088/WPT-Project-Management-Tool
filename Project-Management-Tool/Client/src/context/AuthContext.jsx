import React, { useState, createContext } from "react";
import { toast } from "react-toastify";
import { fetchProjects } from "../Services/ProjectService.js";

export const AuthContext = createContext("");

const ContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchAllProjects = async () => {
    try {
      const response = await fetchProjects();

      if (response.status === 200) {
        setProjects(response.data);
        toast.success("Projects Fetched Successfully..");
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      toast.error("Error fetching projects:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ projects, fetchAllProjects }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
