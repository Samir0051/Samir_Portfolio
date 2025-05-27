// src/pages/About.jsx
import React from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

import Img1 from '../assets/samir_picture/samir_picture.jpg'
import Collage from '../components/Collage'

const items = [
  {
    id: 1,
    image: Img1,
    text: [
      <>🎓 My name is <strong>Samir Sanchez Tejada</strong>, and I’m currently a senior at <strong>Columbia University</strong> studying <strong>Computer Science</strong>.</>,
      <>🎶 I love music, specifically hip-hop, R&amp;B, jazz and indie.</>,
      <>🎬 I enjoy film — follow me on{' '}
        <a
          href="https://letterboxd.com/samir005/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-emerald-400 transition-colors"
        >
          Letterboxd
        </a>
        !
      </>,
      <>🎮 I’m into video games with a strong passion for platformers.</>,
      <>🌲 I love being outdoors, whether that’s walking through the city or skating with friends.</>,
      <>✨ …and more!</>
    ]
  },
]

export default function About() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <h2
        className="
          font-extrabold mb-12 text-4xl sm:text-5xl md:text-6xl
          bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
          bg-clip-text text-transparent text-center
        "
      >
        About Me
      </h2>

      {/* Bio Items */}
      <div className="flex flex-col space-y-16 w-full">
        {items.map(({ id, image, text }) => (
          <motion.div
            key={id}
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Image Tilt Card */}
            <Tilt
              className="rounded-xl shadow-lg"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={false}
              scale={1.05}
            >
              <div className="
                w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-xl overflow-hidden
                border-4 border-transparent hover:border-emerald-400
                hover:shadow-[0_0_15px_4px_rgba(16,185,129,0.4)]
                transition-all duration-500
              ">
                <img
                  src={image}
                  alt="About item"
                  className="w-full h-full object-cover"
                />
              </div>
            </Tilt>

            {/* Text Card */}
            <div
              className="
                w-full md:w-1/2
                bg-white/30 dark:bg-emerald-800/60 backdrop-blur-lg
                p-8 rounded-xl shadow-lg
                transition-shadow duration-300
              "
            >
              <ul className="list-disc list-inside space-y-4 text-gray-800 dark:text-gray-200 text-lg">
                {text.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="w-full overflow-visible">
        <h2
          className="
            font-extrabold text-4xl sm:text-5xl md:text-6xl
            mb-8 pb-2 leading-relaxed
            bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
            bg-clip-text text-transparent text-center mt-10"
        >
          Photo Collage
        </h2>
        <div className="w-full flex justify-center mt-16">
          <Collage />
        </div>
      </div>
    </div>
  )
}
