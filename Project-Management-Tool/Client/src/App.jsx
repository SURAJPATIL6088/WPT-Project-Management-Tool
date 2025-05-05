import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ProjectList from "./components/ProjectList";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [projects, setProjects] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!loggedIn ? (
        <>
          {showLogin ? (
            <div>
              <Login />
              <p>
                if you do not have an account?{" "}
                <button onClick={() => setShowLogin(false)}>Register</button>
              </p>
            </div>
            
          ) : (
            <div>
              <Register onRegisterSuccess={() => setShowLogin(true)} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowLogin(true)}>Login</button>
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <ProjectList projects={projects} />
          <button onClick={handleLogout}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default App;
