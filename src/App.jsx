// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom'
import DiscussionBoard from './pages/DiscussionBoard'
import About from './pages/About'
import Home from './pages/Home'
import Projects from './pages/Projects'
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function App() {
  const links = [
    { to: '/',           label: 'Home' },
    { to: '/about',      label: 'About' },
    { to: '/discussion', label: 'Discussion Board' },
    { to: '/projects',   label: 'Projects' },
  ]

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gray-950 shadow px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center items-center text-center space-y-4 sm:space-y-0">
        <div
          className="
            text-xl font-bold
            bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
            bg-clip-text text-transparent
            bg-[length:200%_200%]
            animate-text-slide
          "
        >
          Samir
        </div>

        <ul className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="
                  block
                  px-4 py-2
                  bg-white/20 backdrop-blur-md border border-white/30
                  rounded-lg shadow-lg
                  text-white font-medium
                  transition-all duration-300
                  hover:backdrop-blur-lg
                  hover:text-emerald-200
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>



      {/* Route outlet */}
      <div className="mt-4">
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/discussion" element={<DiscussionBoard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*"      element={<p>Page not found.</p>} />
        </Routes>
      </div>
      <footer className="mt-8 py-4 text-center text-white">
        @Made by Samir - For Fun
      </footer>
    </>
  )
}
