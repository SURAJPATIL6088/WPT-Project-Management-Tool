import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";
import CreateProject from "./components/CreateProject";
import NavigationBar from "./Navigation/NavigationBar";
import Feedback from "./Navigation/Feedback";
import Contact from "./Navigation/Contact";
import Home from "./Navigation/Home";
import AboutUs from "./Navigation/AboutUs";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer";
import UpdateProject from "./components/UpdateProject";
import Dashboard from "./components/Pages/Dashboard";
import ViewProject from "./components/Pages/ViewProject";



const App = () => {
  const { loggedIn, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/projects");
  };

  return (
    <div style={{ padding: "20px" }}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact-us" element={<Contact />} />
      <Route path="/viewproject" element={<ViewProject />} />
        <Route path="/sign-in"
          element={<Login onLoginSuccess={handleLogin} />}
        />
        <Route
          path="/sign-up"
          element={<Register onRegisterSuccess={() => navigate("/sign-in")} />}
        />
        {loggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route
              path="/update-project/:projectId"
              element={<UpdateProject />}
            />
            {/* <Route path="/projects/:projectId" element={<ViewProject/>}/> */}
          </>
        )}
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
