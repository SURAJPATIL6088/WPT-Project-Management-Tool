import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout(false);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;