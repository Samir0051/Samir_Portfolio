import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const rotations = [
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
  "rotate-1",
  "-rotate-3",
  "rotate-3",
];
const colors = [
  "from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40",
  "from-cyan-100 to-cyan-200 dark:from-cyan-900/40 dark:to-cyan-800/40",
  "from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40",
  "from-teal-100 to-teal-200 dark:from-teal-900/40 dark:to-teal-800/40",
  "from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40",
  "from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40",
  "from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40",
  "from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40",
];

export default function DiscussionBoard() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPostId, setNewPostId] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchPosts();
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  async function fetchPosts() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("messages")
      .select("id, user, message");

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data.reverse());
    }
    setIsLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setShowCelebration(true);

    const { error } = await supabase
      .from("messages")
      .insert([{ user: user.trim(), message: message.trim() }]);

    if (error) {
      console.error("Error inserting post:", error);
    } else {
      const newPost = {
        id: Date.now(),
        user: user.trim(),
        message: message.trim(),
      };

      setNewPostId(newPost.id);
      setPosts((prev) => [newPost, ...prev]);
      setUser("");
      setMessage("");
      setTimeout(() => setNewPostId(null), 3000);
    }

    setIsSubmitting(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Loading discussions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-emerald-900 text-gray-900 dark:text-white transition-all duration-500 relative overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 animate-pulse`}
            style={{
              background: `linear-gradient(45deg, ${
                ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6"][i % 4]
              }, transparent)`,
              width: Math.random() * 12 + 6,
              height: Math.random() * 12 + 6,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                fontSize: `${Math.random() * 20 + 16}px`,
              }}
            >
              {["🎉", "✨", "🎊", "⭐", "💫"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative p-8 max-w-6xl mx-auto">
        <div className="relative mb-12 text-center">
          <div className="absolute inset-0 bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 transform hover:scale-105 transition-all duration-500"></div>
          <div className="relative py-8 px-6">
            <h2
              className={`font-extrabold mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
              bg-clip-text text-transparent transition-all duration-500
              ${
                showCelebration ? "animate-pulse scale-110" : "hover:scale-105"
              }`}
            >
              Discussion Board ✨
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Share your thoughts and connect with others
            </p>
          </div>
        </div>
        <div className="relative mb-12">
          <div
            className={`absolute inset-0 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 transition-all duration-500 
            ${
              showCelebration
                ? "shadow-emerald-500/50 shadow-2xl scale-105"
                : "hover:shadow-2xl hover:scale-[1.02]"
            }`}
          ></div>

          <div className="relative p-8">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Your name ✍️"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onKeyDown={handleKeyDown}
                className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 w-full text-lg
                  focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-800
                  dark:bg-white/20 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  transition-all duration-300 backdrop-blur-sm hover:border-emerald-400"
                disabled={isSubmitting}
              />
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  💡 Tip: Use Ctrl+Enter to submit quickly
                </span>
              </div>
            </div>

            <textarea
              placeholder="Share your thoughts... 💭"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 w-full mb-6 text-lg resize-none
                focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-800
                dark:bg-white/20 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-300 backdrop-blur-sm hover:border-emerald-400"
              disabled={isSubmitting}
            />

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !user.trim() || !message.trim()}
                className={`bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 
                  text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40 hover:shadow-xl
                  ${
                    isSubmitting ? "animate-pulse" : ""
                  } transform active:scale-95`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Adding Magic...
                  </span>
                ) : (
                  <span className="flex items-center">🚀 Add Message</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {posts.map((post, idx) => (
            <div
              key={post.id || idx}
              className={`group relative p-6 rounded-2xl shadow-lg cursor-pointer
                transform ${rotations[idx % rotations.length]} hover:rotate-0
                transition-all duration-500 hover:scale-105 hover:-translate-y-2
                bg-gradient-to-br ${colors[idx % colors.length]}
                backdrop-blur-md border border-white/30 hover:border-emerald-300
                hover:shadow-2xl hover:shadow-emerald-500/20
                ${
                  newPostId === post.id
                    ? "ring-4 ring-emerald-400 animate-pulse scale-105"
                    : ""
                }
                ${hoveredPost === post.id ? "z-10" : ""}
              `}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 
                opacity-0 group-hover:opacity-100 transition-all duration-500 
                ${hoveredPost === post.id ? "animate-pulse" : ""}`}
              ></div>
              <div className="relative z-10">
                <p
                  className={`text-gray-900 dark:text-white whitespace-pre-wrap font-semibold mb-4 text-lg leading-relaxed
                  transition-all duration-300 ${
                    hoveredPost === post.id ? "scale-105" : ""
                  }`}
                >
                  {post.message}
                </p>

                <div
                  className={`flex items-center text-sm font-bold text-gray-600 dark:text-white/70 
                  transition-all duration-300 ${
                    hoveredPost === post.id ? "translate-x-2" : ""
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {post.user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span>{post.user}</span>
                </div>
              </div>

              {newPostId === post.id && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg animate-bounce">
                  <span className="text-lg">✨</span>
                </div>
              )}
              {hoveredPost === post.id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              )}
            </div>
          ))}
        </div>

        {posts.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce">💬</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Start the Conversation!
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Be the first to share your thoughts and get the discussion
              rolling.
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/30">
              <span className="text-2xl mr-2">🎯</span>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {posts.length} {posts.length === 1 ? "Message" : "Messages"}{" "}
                Shared
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
