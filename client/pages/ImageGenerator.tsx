import AppLayout from "@/components/layout/AppLayout";
import ComputersCanvas from "@/components/canvas/robot";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import { useState } from "react";
import AIGenerator from "./AiGeneration";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "./styles/imageGenerator.css";

export const fadeIn = (
  direction: "left" | "right" | "up" | "down" = "up",
  type: "spring" | "tween" = "spring",
  delay: number = 0,
  duration: number = 0.75,
): Variants => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

const VendorCard = ({ index, title, users, active, bgImage, onClick }) => (
  <Tilt className="tilt-wrapper">
    <motion.div
      onClick={onClick}
      variants={fadeIn("right", "spring", index * 0.3, 0.75)}
      className={`vendor-card-wrapper ${active ? "active" : ""}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        cursor: "pointer",
      }}
      animate={{ scale: active ? 1.1 : 0.95, zIndex: active ? 2 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <div className="vendor-card-inner">
        <h2 className="vendor-title">{title}</h2>
        <p className="vendor-stats">{users}</p>
        <button className="vendor-button">Generate Now</button>
      </div>
    </motion.div>
  </Tilt>
);

const ImageGenerator = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const cardsPerPage = 3;

  const vendors = [
    {
      title: "Leonardo.Ai",
      users: "+18 Million Creators",
      bg: "/static/leonardo_ai.jpeg",
    },
    {
      title: "Midjourney",
      users: "+19.5 Million Creators",
      bg: "/static/midjourney.jpeg",
    },
    {
      title: "DALL-E",
      users: "+1.5 Million Creators",
      bg: "/static/dall_e_logo.jpeg",
    },
    {
      title: "Playground AI",
      users: "+9 Million Creators",
      bg: "/static/playground_ai.jpeg",
    },
    {
      title: "Adobe Firefly",
      users: "+10 Million Creators",
      bg: "/static/adobe-firefly.jpeg",
    },
    {
      title: "Canva AI",
      users: "+2 Million Creators",
      bg: "/static/canva.jpeg",
    },
  ];

  const visiblevendors = vendors.slice(startIndex, startIndex + cardsPerPage);

  const handleLeft = () => {
    if (startIndex - cardsPerPage >= 0) {
      setStartIndex(startIndex - cardsPerPage);
    }
  };

  const handleRight = () => {
    if (startIndex + cardsPerPage < vendors.length) {
      setStartIndex(startIndex + cardsPerPage);
    }
  };

  return (
    <AppLayout>
      <div className="hero-bg-gradient">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-video-wrapper">
              <video autoPlay muted loop playsInline className="hero-bg-video">
                <source src="/static/earth-bg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="highlight">Image Generator</span>
              </h1>
              <p className="hero-subtitle">
                AI Generated Images <br className="break-sm" />
                <span>Powered by Third party tools</span>
              </p>
            </div>
            <div className="hero-canvas">
              <ComputersCanvas />
            </div>
          </div>
        </section>
      </div>

      <section className="vendor-overlay">
        <div className="vendor-carousel-wrapper">
          <button
            className="arrow left"
            onClick={handleLeft}
            disabled={startIndex === 0}
          >
            <FaArrowLeft />
          </button>

          <div className="vendor-container">
            {visiblevendors.map((vendor, index) => {
              const actualIndex = startIndex + index;
              return (
                <VendorCard
                  key={vendor.title}
                  index={index}
                  title={vendor.title}
                  users={vendor.users}
                  bgImage={vendor.bg}
                  active={actualIndex === activeCardIndex}
                  onClick={() => setActiveCardIndex(actualIndex)}
                />
              );
            })}
          </div>

          <button
            className="arrow right"
            onClick={handleRight}
            disabled={startIndex + cardsPerPage >= vendors.length}
          >
            <FaArrowRight />
          </button>
        </div>

        <AIGenerator />
      </section>
    </AppLayout>
  );
};

export default ImageGenerator;
