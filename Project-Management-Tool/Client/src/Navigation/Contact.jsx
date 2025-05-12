import React, { useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import { FaEnvelope, FaUser, FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Contact.css";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    // You can also send form data to your backend here using Axios or fetch
  };

  return (
    <div className="contact-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="contact-card"
      >
        {/* Left: Slider */}
        <div className="slider-section">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            infiniteLoop
            autoPlay
            interval={3000}
            transitionTime={500}
            emulateTouch
          >
            <div>
              <img
                src="https://thumbs.dreamstime.com/b/vertical-business-background-group-people-having-hand-touch-together-to-show-teamwork-unity-meeting-office-170540518.jpg"
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                src={slide2}
                alt="Slide 2"
              />
            </div>
            <div>
              <img
                src={slide3}
                alt="Slide 3"
              />
            </div>
          </Carousel>
        </div>

        {/* Right: Form */}
        <div className="form-section">
          <h1 className="contact-heading">Let’s Get In Touch.</h1>
          <p className="contact-subheading">
            Or just reach out manually to{" "}
            <a href="mailto:mahajantrushita.com" className="contact-link">
              mahajantrushita.com
            </a>
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Enter your name" required className="input" />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Enter your email" required className="input" />
            </div>

            <div className="input-group">
              <FaPhoneAlt className="input-icon" />
              <input type="tel" placeholder="Enter your phone" required className="input" />
            </div>

            <div className="input-group">
              <FaCommentDots className="input-icon" />
              <textarea
                placeholder="Enter your message"
                maxLength="300"
                required
                className="input"
                style={{ minHeight: "100px", resize: "vertical" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span className="char-count">{message.length}/300</span>
            </div>

            <div className="button">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="submit-btn"
              >
                Submit Form
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
