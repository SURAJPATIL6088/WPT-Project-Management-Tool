import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <main className="main-content">
        <header className="topbar">
          <h1>Dashboard Overview</h1>
        </header>

        <section className="cards ">
          <div className="card">
            <h3>Total User</h3>
            <p>120</p>
          </div>
          <div className="card">
            <h3>Total Projects</h3>
            <p>15</p>
          
          </div>
          <div className="card">
            <h3>Completed</h3>
            <p>5</p>
          </div>
          <div className="card">
            <h3>Pending Assignments</h3>
            <p>8</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
