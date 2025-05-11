import React from 'react'
import './Home.css';
import homeimg from '../assets/home.png';
import Features from './Features';
import Benefits from './Benefits';
import AboutUs from "../Navigation/AboutUs";

const Home = () => {
  return (
    <>
     <div className="hero-container" id="home">
      <div className="hero-left">
        <h1 className="hero-title">Power Your Projects with Our App.</h1>
        <p className="hero-description">
          Take control of your projects and stay on top of your goals with our intuitive project management app. Say goodbye to chaos and hello to streamlined efficiency. Try it now and experience the difference.
        </p>
        <button className="hero-button" onClick={() => setSignInOpen(true)}>
          Manage a New Project
        </button>
      </div>
      <img src={homeimg} alt="Project Demo" className="hero-image" />
    </div>

    <Features/>
    <Benefits/>
    <AboutUs />
    </>
  )
}

export default Home

