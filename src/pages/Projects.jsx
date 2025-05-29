import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import featuredImage from '../assets/projects/bioinformatics.png'

// Data definitions including languages
const featuredProject = {
  title: 'Building Bioinformatics Research Taxonomy',
  description: 'Columbia University Medical School Weng Lab Project',
  blurb: 'LLM infrastructure for developing instantaneous research taxonomies given a set of research papers',
  imageUrl: featuredImage,
  url: 'https://github.com/Samir0051/building_research_taxonomy',
}

const timelineProjects = [
  {
    year: '2025',
    title: 'Portfolio',
    description: 'Personal Portfolio Designed and Created By Me :)',
    url: 'https://github.com/Samir0051/Samir_Portfolio',
    languages: ['React', 'Tailwind', 'JavaScript', 'Supabase DB'],
  },
  {
    year: '2025',
    title: 'Building Research Taxonomy',
    description: 'Developed LLM infrastructure for replicating bioinformatic research taxonomies',
    url: 'https://github.com/Samir0051/building_research_taxonomy',
    languages: ['Python', 'LangChain', 'OpenAI API'],
  },
  {
    year: '2024',
    title: 'Conformer Model Sequential Batching (Amazon SDE Internship)',
    description: 'Integrated sequential batching to a Conformer Model within a pre-existing LLM pipeline',
    url: '',
    languages: ['PyTorch', 'Python', 'CUDA'],
  },
  {
    year: '2023',
    title: 'Speech Model Runtime Visualization (Amazon SDE Internship)',
    description: 'Develop internal tooling onto Alexa’s model to showcase hypothesis predictions to what it believes the user says',
    url: "",
    languages: ['Python', 'C++', 'Bokeh', 'NetworkX'],
  },
  {
    year: '2022',
    title: 'Single Cell Segmentation',
    description: 'Train a U-Net model on a dataset for single-cell segmentation which was presented to Columbia\'s Biomedical Engineering department!',
    url: 'https://github.com/Samir0051/SingleCellSegmentation',
    languages: ['Python', 'Jupyter Notebooks'],  
  },
  {
    year: '2022',
    title: 'Lucky Bird',
    description: 'Alongside a team developed a Lucky Bird original game that was presented at an expo at Columbia!',
    url: 'https://github.com/Samir0051/LuckyBird',
    languages: ['C++'],  
  },
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null)

  // Filter out any duplicate entries by title and year
  const uniqueProjects = timelineProjects.filter(
    (proj, idx, arr) =>
      arr.findIndex(p => p.title === proj.title && p.year === proj.year) === idx
  )

  // Create stable refs using useMemo to avoid hook order issues
  const projectRefs = useMemo(() => {
    return Array.from({ length: uniqueProjects.length }, () => ({}))
  }, [uniqueProjects.length])

  // Create individual useInView hooks for each project
  const ref0 = useInView({ threshold: 0.1, triggerOnce: false })
  const ref1 = useInView({ threshold: 0.1, triggerOnce: false })  
  const ref2 = useInView({ threshold: 0.1, triggerOnce: false })
  const ref3 = useInView({ threshold: 0.1, triggerOnce: false })
  const ref4 = useInView({ threshold: 0.1, triggerOnce: false })
  const ref5 = useInView({ threshold: 0.1, triggerOnce: false })
  
  // Array of refs for easy access
  const allRefs = [ref0, ref1, ref2, ref3, ref4, ref5]

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      {/* Page Headers */}
      <h2 className="text-emerald-500 text-3xl sm:text-6xl font-bold mb-6 text-center">Featured Project</h2>

      {/* Featured Project Card */}
      <motion.div
        className="relative mb-16 p-[2px] rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(270deg, #A855F7, #EC4899, #F87171)',
            backgroundSize: '600% 600%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner content */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center">
          <motion.a
            href={featuredProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src={featuredProject.imageUrl}
              alt={featuredProject.title}
              className="block w-4/5 sm:w-3/5 max-w-sm h-auto object-contain mt-4 sm:mt-6 mx-auto"
            />
            <div className="w-full p-4 sm:p-6 bg-emerald-700 text-center text-white rounded-b-2xl">
              <h3 className="text-xl sm:text-3xl font-bold mb-2">{featuredProject.title}</h3>
              <p className="text-white mb-2 sm:mb-4 text-sm sm:text-base">{featuredProject.description}</p>
              <p className="text-white text-xs sm:text-sm">{featuredProject.blurb}</p>
            </div>
          </motion.a>
        </div>
      </motion.div>

      {/* Timeline Header */}
      <h2 className="text-emerald-500 text-2xl sm:text-4xl font-semibold mb-6 text-center">Projects Timeline</h2>

      {/* Timeline */}
      <div className="relative">
        {/* Main vertical timeline line with glow effect */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
          initial={{ backgroundColor: '#d1d5db' }}
          animate={{ 
            backgroundColor: hoveredProject !== null ? '#10b981' : '#d1d5db',
            boxShadow: hoveredProject !== null ? '0 0 20px #10b981, 0 0 40px #10b981' : 'none'
          }}
          transition={{ duration: 0.4 }}
        />
        
        <div className="space-y-8 sm:space-y-12">
          {uniqueProjects.map((proj, idx) => {
            const isLeft = idx % 2 === 0
            const [ref, inView] = allRefs[idx] || [() => {}, false] // Fallback for extra projects

            return (
              <motion.div
                key={`${proj.year}-${proj.title}`}
                ref={ref}
                className={`relative w-full flex ${
                  // On mobile, all cards go to the right. On desktop, alternate sides
                  window.innerWidth < 640 ? 'justify-end pr-4' : (isLeft ? 'justify-start' : 'justify-end')
                }`}
                initial={{ opacity: 0, x: window.innerWidth < 640 ? 50 : (isLeft ? -50 : 50) }}
                animate={inView ? { opacity: 1, x: 0 } : { 
                  opacity: 0, 
                  x: window.innerWidth < 640 ? 50 : (isLeft ? -50 : 50) 
                }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                {/* Timeline dot - properly centered on the line */}
                <motion.div
                  className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full z-10"
                  initial={{ backgroundColor: '#d1d5db' }}
                  animate={{ 
                    backgroundColor: hoveredProject === idx ? '#10b981' : '#d1d5db',
                    scale: hoveredProject === idx ? 1.8 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient glow ring when hovered */}
                  {hoveredProject === idx && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(270deg, #A855F7, #EC4899, #F87171, #A855F7)',
                        backgroundSize: '300% 300%',
                        padding: '3px',
                      }}
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        scale: [1, 1.3, 1],
                        opacity: 1
                      }}
                      transition={{ 
                        backgroundPosition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                        scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      initial={{ opacity: 0 }}
                    >
                      <div className="w-full h-full bg-emerald-500 rounded-full" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Card connection line - from card edge to center - hidden on mobile */}
                <motion.div
                  className={`absolute top-6 sm:top-8 z-5 h-0.5 bg-emerald-500 hidden sm:block`}
                  style={{
                    [isLeft ? 'right' : 'left']: isLeft ? '40%' : '40%',
                    width: '10%',
                    transformOrigin: isLeft ? 'right center' : 'left center',
                    boxShadow: hoveredProject === idx ? '0 0 10px #10b981' : 'none'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: hoveredProject === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />

                {/* Tree-like branch connection - hidden on mobile */}
                <div className={`absolute top-6 sm:top-8 z-5 hidden sm:block`} style={{ [isLeft ? 'right' : 'left']: '30%' }}>
                  {/* Main horizontal branch */}
                  <motion.div
                    className="absolute h-0.5 bg-emerald-500"
                    style={{
                      [isLeft ? 'right' : 'left']: '0px',
                      transformOrigin: isLeft ? 'right center' : 'left center',
                      width: '40px',
                      boxShadow: hoveredProject === idx ? '0 0 10px #10b981' : 'none'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredProject === idx ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  
                  {/* Upper branch */}
                  <motion.div
                    className="absolute h-0.5 bg-emerald-500"
                    style={{
                      [isLeft ? 'right' : 'left']: '32px',
                      top: '-8px',
                      transformOrigin: isLeft ? 'right center' : 'left center',
                      transform: isLeft ? 'rotate(30deg)' : 'rotate(-30deg)',
                      width: '40px',
                      boxShadow: hoveredProject === idx ? '0 0 8px #10b981' : 'none'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredProject === idx ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                  />
                  
                  {/* Lower branch */}
                  <motion.div
                    className="absolute h-0.5 bg-emerald-500"
                    style={{
                      [isLeft ? 'right' : 'left']: '32px',
                      top: '8px',
                      transformOrigin: isLeft ? 'right center' : 'left center',
                      transform: isLeft ? 'rotate(-30deg)' : 'rotate(30deg)',
                      width: '40px',
                      boxShadow: hoveredProject === idx ? '0 0 8px #10b981' : 'none'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredProject === idx ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                  />
                  
                  {/* Small connecting twigs */}
                  <motion.div
                    className="absolute h-0.5 bg-emerald-400"
                    style={{
                      [isLeft ? 'right' : 'left']: '12px',
                      top: '-4px',
                      transformOrigin: isLeft ? 'right center' : 'left center',
                      transform: isLeft ? 'rotate(15deg)' : 'rotate(-15deg)',
                      width: '20px',
                      boxShadow: hoveredProject === idx ? '0 0 6px #10b981' : 'none'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredProject === idx ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
                  />
                  
                  <motion.div
                    className="absolute h-0.5 bg-emerald-400"
                    style={{
                      [isLeft ? 'right' : 'left']: '12px',
                      top: '4px',
                      transformOrigin: isLeft ? 'right center' : 'left center',
                      transform: isLeft ? 'rotate(-15deg)' : 'rotate(15deg)',
                      width: '20px',
                      boxShadow: hoveredProject === idx ? '0 0 6px #10b981' : 'none'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredProject === idx ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>

                <motion.a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11/12 sm:w-5/12 p-[2px] rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 group"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onMouseEnter={() => setHoveredProject(idx)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-hidden">
                    <span className="block text-sm text-gray-400 mb-1">{proj.year}</span>
                    <h4 className="text-emerald-600 text-lg sm:text-xl font-semibold mb-2">{proj.title}</h4>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">{proj.description}</p>
                    {/* Expand on hover to show languages */}
                    <div className="max-h-0 group-hover:max-h-32 transition-all duration-300 overflow-hidden">
                      <p className="text-sm text-gray-500 font-medium">Languages:</p>
                      <ul className="list-disc list-inside text-gray-500 text-sm">
                        {proj.languages.map(lang => (
                          <li key={lang}>{lang}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}