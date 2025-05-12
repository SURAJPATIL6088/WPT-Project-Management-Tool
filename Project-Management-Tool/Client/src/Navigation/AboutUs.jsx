import React from "react";
import "./About.css"; 
import Suraj from '../assets/Suraj_KH.jpg'
import Shubhra from '../assets/Shubhra.jpg'
import trushita from "../assets/trushita.jpg"

const TeamMember = ({ photo, name, title, bio }) => {
  return (
    <div className="team-member-container">
      <div className="team-header">
        <img className="team-member-photo" src={photo} alt={name} />
        <div className="team-member-data">
          <div className="team-member-name">{name}</div>
          <div className="team-member-title">{title}</div>
        </div>
      </div>
      <p className="team-member-bio">{bio}</p>
    </div>
  );
};

const Team = () => {
  const members = [
    {
      photo: Suraj,
      name: "Suraj Patil",
      title: "Full-Stack Developer",
      bio: "I have expertise in full-stack web development, Blockchain development, and MERN stack development. I am knowledgeable in various programming languages, frameworks, and technologies and strive to create high-quality, user-friendly applications.",
    },
    {
      photo: Shubhra,
      name: "Shubhra Jyotsna Manhar",
      title: "Frontend Developer",
      bio: "I specialize in front-end web development with a focus on React.js and modern JavaScript frameworks. Passionate about building interactive, responsive user interfaces.",
    },
    {
      photo: trushita,
      name: "Trushita Mahajan",
      title: "Frontend Developer",
      bio: "I am a creative designer with a strong understanding of user-centered design principles. My goal is to create aesthetically pleasing and intuitive interfaces that provide users with a seamless experience.",
    },
  ];

  return (
    <div className="team-wrapper" id="team">
      <div className="team-title">Meet the crew</div>
      <p className="team-description">
        We're a small, remote team working on interesting problems at the edge of compute.
      </p>
      <div className="team-container">
        {members.map((member, index) => (
          <TeamMember
            key={index}
            photo={member.photo}
            name={member.name}
            title={member.title}
            bio={member.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
