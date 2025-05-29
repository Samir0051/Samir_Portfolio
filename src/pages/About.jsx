// src/pages/About.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

import Img1 from '../assets/samir_picture/samir_picture.jpg'
import Collage from '../components/Collage'

const items = [
  {
    id: 1,
    image: Img1,
    text: [
      <>🎓 My name is <strong>Samir Sanchez Tejada</strong>, and I'm currently a senior at <strong>Columbia University</strong> studying <strong>Computer Science</strong>.</>,
      <>🎶 I love music, specifically hip-hop, R&B, jazz and indie.</>,
      <>🎬 I enjoy film, follow me on{' '}
        <a
          href="https://letterboxd.com/samir005/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-emerald-400 transition-colors duration-300 hover:scale-105 inline-block"
        >
          Letterboxd
        </a>
        !
      </>,
      <>🎮 I'm into video games with a strong passion for platformers.</>,
      <>🌲 I love being outdoors, whether that's walking through the city or skating with friends.</>,
      <>✨ I'm also big into art museums and history!</>
    ]
  },
]

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const SPOTIFY_REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN

// Floating animation variants
const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const pulseVariants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

async function getAccessToken() {
  const creds = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  })
  const data = await response.json()
  return data.access_token
}

async function getCurrentlyPlaying(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (response.status === 204 || response.status >= 400) {
    return null
  }
  const data = await response.json()
  return data
}

export default function About() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const token = await getAccessToken()
        const playing = await getCurrentlyPlaying(token)
        if (playing && playing.item) {
          setCurrentTrack(playing.item.uri)
        } else {
          setCurrentTrack(null)
        }
      } catch (error) {
        console.error('Error fetching Spotify now playing:', error)
        setCurrentTrack(null)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleTitleClick = () => {
    setClickCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-emerald-900">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-emerald-300 rounded-full opacity-60"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-cyan-300 rounded-full opacity-50"
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 left-1/3 w-5 h-5 bg-emerald-200 rounded-full opacity-40"
          animate={{ y: [-25, 25, -25], x: [15, -15, 15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Middle floating elements */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-3 h-3 bg-emerald-400 rounded-full opacity-70"
          animate={{ y: [-15, 15, -15], rotate: [0, 180, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-4 h-4 bg-cyan-200 rounded-full opacity-60"
          animate={{ y: [10, -10, 10], x: [-5, 5, -5], rotate: [0, -180, -360] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Bottom floating elements */}
        <motion.div
          className="absolute bottom-40 left-1/4 w-3 h-3 bg-emerald-400 rounded-full opacity-70"
          animate={{ y: [-15, 15, -15], rotate: [0, 180, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-5 h-5 bg-emerald-300 rounded-full opacity-50"
          animate={{ y: [20, -20, 20], x: [8, -8, 8] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-4 h-4 bg-cyan-400 rounded-full opacity-60"
          animate={{ y: [-12, 12, -12], x: [-12, 12, -12], rotate: [0, 360, 720] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-60 right-10 w-6 h-6 bg-emerald-200 rounded-full opacity-40"
          animate={{ y: [18, -18, 18], x: [-6, 6, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-3 h-3 bg-cyan-300 rounded-full opacity-50"
          animate={{ y: [-8, 8, -8], x: [8, -8, 8], scale: [1, 1.2, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-1/2 w-4 h-4 bg-emerald-500 rounded-full opacity-30"
          animate={{ y: [15, -15, 15], rotate: [0, -270, -540] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative p-8 max-w-5xl mx-auto">
        {/* Interactive Title */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-3xl shadow-xl"
            animate={isHovered ? { scale: 1.05, rotate: 1 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.h2
            className="
              relative font-extrabold mb-12 text-4xl sm:text-5xl md:text-6xl
              bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
              bg-clip-text text-transparent text-center py-8 cursor-pointer
            "
            onClick={handleTitleClick}
            animate={clickCount > 0 ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            About Me {clickCount > 2 && ":0"}
          </motion.h2>
        </motion.div>

        {/* Bio Items with Enhanced White Boxes */}
        <div className="flex flex-col space-y-16 w-full">
          {items.map(({ id, image, text }) => (
            <motion.div
              key={id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              variants={floatingVariants}
              animate="animate"
            >
              {/* White Background Box */}
              <motion.div
                className="
                  absolute inset-0 bg-white/90 dark:bg-white/10
                  backdrop-blur-lg rounded-3xl shadow-2xl
                  border border-white/20
                "
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  borderColor: "rgba(16, 185, 129, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
                {/* Enhanced Image Tilt Card */}
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tilt
                    className="rounded-xl shadow-lg"
                    tiltMaxAngleX={20}
                    tiltMaxAngleY={20}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    glareColor="#10b981"
                    glarePosition="all"
                    // scale={1.1}
                  >
                    <motion.div 
                      className="
                        w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-xl overflow-hidden
                        border-4 border-transparent hover:border-emerald-400
                        hover:shadow-[0_0_25px_8px_rgba(16,185,129,0.4)]
                        transition-all duration-500 cursor-pointer
                      "
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt="About item"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </motion.div>
                  </Tilt>
                </motion.div>

                {/* Enhanced Text Card */}
                <motion.div
                  className="
                    w-full md:w-1/2
                    bg-gradient-to-br from-white/60 via-white/40 to-emerald-50/60
                    dark:from-emerald-800/60 dark:via-emerald-900/40 dark:to-neutral-800/60
                    backdrop-blur-lg p-8 rounded-2xl shadow-lg
                    border border-white/30 dark:border-emerald-700/30
                  "
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                  variants={pulseVariants}
                  animate="animate"
                >
                  <ul className="space-y-4 text-gray-800 dark:text-gray-200 text-lg">
                    {text.map((line, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{line}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Spotify Section */}
        <motion.div 
          className="w-full mt-16 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* White Background Box for Spotify Section */}
          <motion.div
            className="
              relative bg-white/90 dark:bg-white/10 backdrop-blur-lg 
              rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 w-full max-w-sm sm:max-w-md
            "
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              borderColor: "rgba(16, 185, 129, 0.4)"
            }}
            variants={floatingVariants}
            animate="animate"
          >
            <motion.h3 
              className="text-2xl sm:text-3xl bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
                bg-clip-text text-transparent font-bold mb-6 text-center"
              whileHover={{ scale: 1.05 }}
            >
              What I'm Listening To Right Now :)
            </motion.h3>
            
            {currentTrack ? (
              <motion.div 
                className="rounded-lg bg-gradient-to-br from-emerald-900/80 to-emerald-800/80 p-3 sm:p-4 shadow-lg border border-emerald-700/50 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full overflow-hidden">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${currentTrack.split(':').pop()}`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify Now Playing"
                    className="rounded-md w-full max-w-full"
                    style={{ 
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: '0'
                    }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.p 
                className="italic text-gray-500 text-center text-sm sm:text-base"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Not playing anything right now.
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Enhanced Photo Collage Section */}
        <motion.div 
          className="w-full overflow-visible mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* White Background Box for Collage */}
          <motion.div
            className="
              relative bg-white/90 dark:bg-white/10 backdrop-blur-lg 
              rounded-3xl shadow-2xl border border-white/20 p-8
            "
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            variants={floatingVariants}
            animate="animate"
          >
            <motion.h2
              className="
                font-extrabold text-4xl sm:text-5xl md:text-6xl
                mb-8 pb-2 leading-relaxed
                bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
                bg-clip-text text-transparent text-center
              "
              whileHover={{ scale: 1.02 }}
            >
              Photo Collage
            </motion.h2>
            
            <motion.div 
              className="w-full flex justify-center mt-8"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Collage />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}