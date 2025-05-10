import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchProjects } from "../Services/ProjectService.js";
import { getToken, removeToken } from "../Services/AdminService.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext("");

const ContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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

  const fetchProjectById = async(id)=>{
    try {
      const response = await fetchProjectById(id);

      if(response.status === 200){
        
      }
    } catch (error) {
      toast.error("Error fetching project:", error.message);
    }
  }

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken("token");
    setLoggedIn(!!token);
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    removeToken("token");
    navigate("/sign-up");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ projects, fetchAllProjects, loggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
