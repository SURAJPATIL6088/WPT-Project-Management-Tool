import React from "react";
import "./About.css"; 

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
      photo: "https://avatars.githubusercontent.com/u/64485885?v=4",
      name: "Rishav Chanda",
      title: "Full-Stack Developer",
      bio: "I have expertise in full-stack web development, Android app development, and MERN stack development. I am knowledgeable in various programming languages, frameworks, and technologies and strive to create high-quality, user-friendly applications.",
    },
    {
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      title: "Frontend Developer",
      bio: "I specialize in front-end web development with a focus on React.js and modern JavaScript frameworks. Passionate about building interactive, responsive user interfaces.",
    },
    {
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      title: "UI/UX Designer",
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
