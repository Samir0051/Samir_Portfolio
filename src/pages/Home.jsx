import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import img1 from "../assets/logo/img1.png";
import img2 from "../assets/logo/img2.png";
import img3 from "../assets/logo/img3.png";
import img4 from "../assets/logo/img4.png";
import img5 from "../assets/logo/img5.png";
import img6 from "../assets/logo/img6.png";
import img7 from "../assets/logo/img7.png";
import img8a from "../assets/logo/img8a.png";
import img8b from "../assets/logo/img8b.png";

import githubicon from "../assets/icons/github.png";
import linkedinicon from "../assets/icons/linkedin.png";
import spotifyicon from "../assets/icons/spotify.png";

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [index, setIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const images = [];
  const altImages = [img8a, img8b];

  // cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + 1 < images.length
          ? prev + 1
          : (images.length + prev + 1) % (images.length + altImages.length)
      );
    }, 300);
    return () => clearInterval(interval);
  }, [index]);

  // track mouse for radial gradient
  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentImage =
    index < images.length
      ? images[index]
      : altImages[(index - images.length) % altImages.length];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-emerald-800 to-emerald-200 p-8 overflow-hidden">
      {/* background layers */}
      <FloatingParticles />
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`,
        }}
      />

      {/* main content */}
      <div className="relative z-20 flex flex-col items-center">
        <img
          src={currentImage}
          alt="Animated logo"
          className="w-75 h-72 object-contain transition-opacity duration-300"
        />

        <h2 className="flex flex-wrap justify-center mt-10">
          {"Welcome to My Portfolio".split("").map((char, i) => (
            <span
              key={i}
              data-char={char}
              className="letter-stroke mx-[1px] text-4xl sm:text-5xl font-extrabold transition-transform duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <p className="mt-4 text-lg sm:text-xl text-white/90 tracking-wide font-medium text-center px-4">
          🚀 Click on the tabs above and start exploring!
        </p>

        <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 gap-6">
          <a
            href="https://github.com/Samir0051"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubicon}
              alt="GitHub"
              className="w-10 h-10 hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/samir-sanchez-3ac/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedinicon}
              alt="LinkedIn"
              className="w-10 h-10 hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="https://open.spotify.com/user/cqjiv06y90p950gwgabnog682"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={spotifyicon}
              alt="Spotify"
              className="w-10 h-10 hover:scale-110 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
