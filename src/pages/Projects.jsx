import React, { useState, useMemo, useEffect } from 'react'
import { motion,  AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import featuredImage from '../assets/projects/bioinformatics.png'

// Enhanced data with more interactive elements
const featuredProject = {
  title: 'Building Bioinformatics Research Taxonomy',
  description: 'Columbia University Medical School Weng Lab Project',
  blurb: 'LLM infrastructure for developing instantaneous research taxonomies given a set of research papers',
  imageUrl: featuredImage,
  url: 'https://github.com/Samir0051/building_research_taxonomy',
  tags: ['AI/ML', 'Bioinformatics', 'Research', 'LLM'],
  stats: { commits: '18', lines: '1,000+', duration: '8 months' }
}

const timelineProjects = [
  {
    year: '2025',
    title: 'Portfolio',
    description: 'Personal Portfolio Designed and Created By Me :)',
    url: 'https://github.com/Samir0051/Samir_Portfolio',
    languages: ['React', 'Tailwind', 'JavaScript', 'Supabase DB'],
    category: 'Web Development',
    status: 'Live',
    impact: 'Showcasing technical skills with JavaScript, React and PostgreSQL'
  },
  {
    year: '2025',
    title: 'Building Research Taxonomy',
    description: 'Developed LLM infrastructure for generating scalable bioinformatic research taxonomies',
    url: 'https://github.com/Samir0051/building_research_taxonomy',
    languages: ['Python', 'Plotly', 'BiomedNLP Model', 'OpenAI API'],
    category: 'AI/ML',
    status: 'Research',
    impact: 'Future co-author on academic paper by the Weng Lab at Columbia'
  },
  {
    year: '2025',
    title: 'Custom Linux File System',
    description: 'Developed a custom filesystem module in Linux alongside a team of two other students',
    url: 'https://github.com/Samir0051/building_research_taxonomy',
    languages: ['C'],
    category: 'Systems Programming',
    status: 'Complete',
    impact: 'Low-level systems understanding for file systems and their creation'
  },
  {
    year: '2025',
    title: 'Custom Linux Scheduler',
    description: 'Developed a custom simple round-robin scheduler in Linux alongside a team of two other students',
    languages: ['C'],
    category: 'Systems Programming',
    status: 'Complete',
    impact: 'Understanding of scheduling systems in Linux and their integration'
  },
  {
    year: '2024',
    title: 'Conformer Model Sequential Batching (Amazon SDE Internship)',
    description: 'Integrated sequential batching to a Conformer Model within a pre-existing LLM pipeline',
    languages: ['PyTorch', 'Python', 'CUDA'],
    category: 'AI/ML',
    status: 'Production',
    impact: 'Improved model throughput through a tradeoff of hightened latency'
  },
  {
    year: '2024',
    title: 'Mock Website for Teaching Students (JADE)',
    description: 'Developed a mock-website alongside a cirriculum to teach students',
    url: 'https://samir0051.github.io/webDev/#/Home',
    languages: ['React', 'JavaScript', 'TypeScript'],
    category: 'Web Development',
    status: 'Complete',
    impact: 'Created to teach alongside students'
  },
  {
    year: '2023',
    title: 'Speech Model Runtime Visualization (Amazon SDE Internship)',
    description: 'Develop internal tooling onto Alexa\'s model to showcase hypothesis predictions to what it believes the user says',
    languages: ['Python', 'C++', 'Bokeh', 'NetworkX'],
    category: 'Data Visualization',
    status: 'Production',
    impact: 'Enhanced debugging for real-time Alexa speech models'
  },
  {
    year: '2023',
    title: 'Portfolio Project',
    description: 'Develop a portfolio website to showcase my work',
    languages: ['Vue', 'JavaScript'],
    category: 'Web Development',
    status: 'Complete',
    impact: 'Learning Web Development'
  },
  {
    year: '2022',
    title: 'Single Cell Segmentation',
    description: 'Train a U-Net model on a dataset for single-cell segmentation which was presented to Columbia\'s Biomedical Engineering department!',
    url: 'https://github.com/Samir0051/SingleCellSegmentation',
    languages: ['Python', 'Jupyter Notebooks'],
    category: 'Computer Vision',
    status: 'Complete',
    impact: 'Presented to the Columbia BME Department'
  },
  {
    year: '2022',
    title: 'Lucky Bird',
    description: 'Alongside a team developed a Lucky Bird original game that was presented at an expo at Columbia!',
    url: 'https://github.com/Samir0051/LuckyBird',
    languages: ['C++'],
    category: 'Game Development',
    status: 'Demo',
    impact: 'Presented at a Columbia Engineering Expo to high praise'
  },
  {
    year: '2022',
    title: 'Brick Breaker',
    description: 'Personal game project developed to emulate the classic brick breaker game in Java',
    url: 'https://github.com/Samir0051/LuckyBird',
    languages: ['Java', 'OpenGL'],
    category: 'Game Development',
    status: 'Demo',
    impact: 'My coding journey\'s start'
  },
  
]

// Particle animation component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Language tag component with hover effects
const LanguageTag = ({ language, index }) => (
  <motion.span
    className="inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-200 cursor-default"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05, y: -2 }}
  >
    {language}
  </motion.span>
)

// Status badge component
const StatusBadge = ({ status }) => {
  const colors = {
    'Live': 'from-green-400 to-green-600',
    'Complete': 'from-blue-400 to-blue-600',
    'Production': 'from-purple-400 to-purple-600',
    'Research': 'from-orange-400 to-orange-600',
    'Demo': 'from-pink-400 to-pink-600'
  }
  
  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r ${colors[status] || 'from-gray-400 to-gray-600'} text-white font-medium`}>
      {status}
    </span>
  )
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const categories = ['All', ...new Set(timelineProjects.map(p => p.category))]
  const filteredProjects = selectedCategory === 'All' 
    ? timelineProjects 
    : timelineProjects.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative">
      <FloatingParticles />
      
      {/* Dynamic gradient overlay that follows mouse */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`
        }}
      />

      <div className="relative z-20 p-4 sm:p-8 max-w-6xl mx-auto">
        {/* Enhanced Page Header with animated text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="relative font-extrabold mb-12 text-4xl sm:text-5xl md:text-6xl
              bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
              bg-clip-text text-transparent text-center py-8 cursor-pointer"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            Featured Project
          </motion.h1>
        </motion.div>

        {/* Enhanced Featured Project with 3D effect */}
        <motion.div
          className="relative mb-20 perspective-1000"
          initial={{ opacity: 0, rotateX: 15 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ rotateX: -5, rotateY: 5 }}
        >
          <motion.div
            className="relative p-1 rounded-3xl"
            style={{
              background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
              backgroundSize: '400% 400%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <div className="bg-gray-900 rounded-3xl overflow-hidden">
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => window.open(featuredProject.url, '_blank')}
              >
                {/* Project Image with overlay effects */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={featuredProject.imageUrl}
                    alt={featuredProject.title}
                    className="w-full h-64 sm:h-80 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-70"
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Enhanced content section */}
                <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProject.tags.map((tag, idx) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                    {featuredProject.title}
                  </h3>
                  
                  <p className="text-emerald-400 text-lg mb-4">{featuredProject.description}</p>
                  <p className="text-gray-300 mb-6">{featuredProject.blurb}</p>
                  
                  {/* Project stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                    {Object.entries(featuredProject.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{value}</div>
                        <div className="text-sm text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Timeline Header */}
        <motion.h2
          className="relative font-extrabold mb-12 text-4xl sm:text-5xl md:text-6xl
               text-white text-center py-8 cursor-pointer"
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Projects Journey
        </motion.h2>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Animated central line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 via-blue-500 to-purple-600 rounded-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              boxShadow: hoveredProject !== null ? '0 0 30px rgba(16, 185, 129, 0.5)' : 'none'
            }}
          />

          <AnimatePresence>
            <div className="space-y-16">
              {filteredProjects.map((proj, idx) => {
                const isLeft = idx % 2 === 0

                return (
                  <motion.div
                    key={`${proj.year}-${proj.title}`}
                    className="relative"
                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLeft ? -100 : 100 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: false, margin: "-50px" }}
                  >
                    {/* Timeline dot with pulse effect */}
                    <motion.div
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full z-20"
                      style={{
                        background: hoveredProject === idx 
                          ? 'linear-gradient(45deg, #ff006e, #8338ec)' 
                          : 'linear-gradient(45deg, #10b981, #3b82f6)'
                      }}
                      animate={{
                        scale: hoveredProject === idx ? [1, 1.5, 1] : 1,
                        boxShadow: hoveredProject === idx 
                          ? ['0 0 0 0 rgba(16, 185, 129, 0.7)', '0 0 0 20px rgba(16, 185, 129, 0)', '0 0 0 0 rgba(16, 185, 129, 0)']
                          : '0 0 0 0 rgba(16, 185, 129, 0)'
                      }}
                      transition={{ 
                        scale: { duration: 2, repeat: Infinity },
                        boxShadow: { duration: 2, repeat: Infinity }
                      }}
                    />

                    {/* Project Card */}
                    <motion.div
                      className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                      onMouseEnter={() => setHoveredProject(idx)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <motion.div
                        className="w-full sm:w-5/12 p-1 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                        whileHover={{ 
                          scale: 1.05,
                          rotateY: isLeft ? 5 : -5,
                          rotateX: -2
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.div
                          className="bg-gray-900 rounded-xl p-6 h-full"
                          whileHover={{ backgroundColor: '#1f2937' }}
                        >
                          {/* Year badge */}
                          <motion.div
                            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white font-bold text-sm mb-4"
                            whileHover={{ scale: 1.1 }}
                          >
                            {proj.year}
                          </motion.div>

                          {/* Project title */}
                          <h4 className="text-white text-xl sm:text-2xl font-bold mb-3 hover:text-emerald-400 transition-colors">
                            {proj.title}
                          </h4>

                          {/* Category and status */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {proj.category}
                            </span>
                            <StatusBadge status={proj.status} />
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                            {proj.description}
                          </p>

                          {/* Impact */}
                          <motion.div
                            className="mb-4 p-3 rounded-lg bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-500/20"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: hoveredProject === idx ? 1 : 0,
                              height: hoveredProject === idx ? 'auto' : 0
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-emerald-400 text-sm font-medium">Impact:</p>
                            <p className="text-gray-300 text-sm">{proj.impact}</p>
                          </motion.div>

                          {/* Languages */}
                          <div className="flex flex-wrap gap-2">
                            {proj.languages.map((lang, langIdx) => (
                              <LanguageTag key={lang} language={lang} index={langIdx} />
                            ))}
                          </div>

                          {/* Link indicator */}
                          {proj.url && (
                            <motion.div
                              className="mt-4 text-emerald-400 text-sm flex items-center gap-2 cursor-pointer"
                              whileHover={{ x: 5 }}
                              onClick={() => window.open(proj.url, '_blank')}
                            >
                              <span>View Project</span>
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <a href="mailto:ses2313@columbia.edu">
            <motion.button
              type="button"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-lg shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              email me @ ses2313@columbia.edu
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  )
}