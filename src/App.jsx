import { Routes, Route } from "react-router-dom";
import DiscussionBoard from "./pages/DiscussionBoard";
import About from "./pages/About";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/discussion", label: "Discussion Board" },
    { to: "/projects", label: "Projects" },
    {
      to: "https://github.com/Samir0051/Samir_Portfolio",
      label: "Docs",
      isExternal: true,
    },
  ];

  return (
    <>
      <div className="dark">
        {/* Global Styles */}
        <style>{`
          @keyframes float3D {
            0%, 100% {
              transform: rotateX(15deg) rotateY(-10deg) translateY(0px);
            }
            25% {
              transform: rotateX(20deg) rotateY(-15deg) translateY(-2px);
            }
            50% {
              transform: rotateX(10deg) rotateY(-5deg) translateY(-4px);
            }
            75% {
              transform: rotateX(25deg) rotateY(-20deg) translateY(-2px);
            }
          }

          @keyframes text-slide {
            0%, 100% { background-position: 0% 50%; }
            50%       { background-position: 100% 50%; }
          }

          .animate-text-slide {
            animation: text-slide 3s ease-in-out infinite;
          }

          .float-3d {
            animation: float3D 5s ease-in-out infinite;
          }

          .float-3d:hover {
            animation: none !important;
            transform: rotateX(0deg) rotateY(0deg) translateY(0px) !important;
            color: #10b981;
            text-shadow: 0 0 10px #10b981, 0 0 20px #10b981, 0 0 30px #10b981;
          }

          .perspective-800 {
            perspective: 800px;
          }
        `}</style>

        {/* Navbar */}
        <nav className="w-full bg-gray-950 shadow px-6 py-4 flex flex-col items-center sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div
            className="text-xl font-bold
              bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600
              bg-clip-text text-transparent bg-[length:200%_200%] animate-text-slide"
          >
            Samir
          </div>

          <ul className="w-full grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:space-x-4 sm:space-y-0 sm:w-auto items-center justify-center">
            {links.map((link) => (
              <li key={link.label} className="perspective-800">
                <a
                  href={link.to}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="block px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg text-white font-medium transform-gpu transition-transform duration-300 ease-out float-3d hover:shadow-xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Routes */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/discussion" element={<DiscussionBoard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<p>Page not found.</p>} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="w-full py-4 bg-black border-t border-emerald-800 text-center text-gray-300 text-sm select-none">
          @ {new Date().getFullYear()} Samir — For Fun
        </footer>
      </div>
    </>
  );
}
