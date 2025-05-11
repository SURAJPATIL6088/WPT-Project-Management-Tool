import React from 'react';
import './Features.css';
import BgAnimation from '../components/BgAnimation'
import Groups3Icon from '@mui/icons-material/Groups3';
import TimelineIcon from '@mui/icons-material/Timeline';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PublicIcon from '@mui/icons-material/Public';

const featuresData = [
  { icon: <ElectricBoltIcon />, title: 'Project Management', description: 'Effortlessly manage your personal projects and assign tasks to team members while keeping track of progress.' },
  { icon: <Groups3Icon />, title: 'Team Collaboration', description: 'Collaborate with your team members in real-time, assign tasks, and keep track of your team’s progress.' },
  { icon: <PublicIcon />, title: 'Community Building', description: 'Connect with members of similar interests, build communities, and grow your network.' },
  { icon: <TimelineIcon />, title: 'Time Tracking', description: 'Track your time and improve your productivity by setting goals and keeping track of your progress.' },
];

const Features = () => {
  return (
    <section className="features-wrapper" id="features">
      <div className="number">1</div>
      <div className="features-title">Key Features</div>
      <p className="feature-description">Discover how our app simplifies project management and makes collaboration effortless.</p>
      <div className="content">
        <div className="features-container">
          {featuresData.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div>
                <div className="feature-title">{feature.title}</div>
                <div className="feature-card-description">{feature.description}</div>
              </div>
              <div className="feature-icon">
                {feature.icon}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-image">
          <BgAnimation />
        </div>
      </div>
    </section>
  );
};

export default Features;
