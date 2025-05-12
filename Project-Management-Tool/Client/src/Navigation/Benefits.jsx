import React from 'react';
import './Benefits.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BgAnimation from '../components/BgAnimation'

const featuresData = [
  {
    icon: <TrendingUpIcon />,
    title: 'Increased Productivity',
    description: 'Effortlessly manage your personal projects and assign tasks to team members while keeping track of progress.',
  },
  {
    icon: <ForumIcon />,
    title: 'Improved Communication',
    description: 'Keep everyone on the same page and reduce misunderstandings with clear communication.',
  },
  {
    icon: <CheckCircleOutlineIcon />,
    title: 'Better Project Outcomes',
    description: 'Make informed decisions and track progress to ensure successful project outcomes.',
  },
  {
    icon: <Diversity3Icon />,
    title: 'Networking Opportunities',
    description: 'Connect and collaborate with other developers and professionals in your industry to expand your network and build valuable relationships.',
  },
];

const Benefits = () => {
  return (
    <section className="features-wrapper" id="benefits">
      <div className="number">2</div>
      <div className="features-title">Benefits</div>
      <p className="feature-description">
        Discover the many benefits of using our app to manage your personal and team projects.
      </p>
      <div className="content">
        <div className="features-container">
          {featuresData.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-card-text">
                <div className="feature-title">{feature.title}</div>
                <div className="feature-card-description">{feature.description}</div>
              </div>
              <div className="feature-icon">{feature.icon}</div>
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

export default Benefits;
