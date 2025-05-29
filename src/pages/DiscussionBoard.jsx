import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const rotations = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', '-rotate-3', 'rotate-3']

export default function DiscussionBoard() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    let { data, error } = await supabase
      .from('messages')
      .select('id, user, message')

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      setPosts(data.reverse())
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user.trim() || !message.trim()) return

    const { error } = await supabase
      .from('messages')
      .insert([{ user: user.trim(), message: message.trim() }])

    if (error) {
      console.error('Error inserting post:', error)
    } else {
      setUser('')
      setMessage('')
      fetchPosts()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="font-extrabold mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4
          bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-500
          bg-clip-text text-transparent
          text-center">
          Discussion Board
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="p-2 rounded border border-gray-300 w-full mb-2
              focus:border-emerald-500 focus:outline-none
              dark:bg-white/20 dark:border-emerald-700 dark:text-white"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="p-2 rounded border border-gray-300 w-full mb-2
              focus:border-emerald-500 focus:outline-none
              dark:bg-white/20 dark:border-emerald-700 dark:text-white"
          />
          <button
            type="submit"
            className="block mx-auto bg-emerald-600 hover:bg-emerald-500 transition text-white px-6 py-2 rounded"
          >
            Add Message
          </button>
        </form>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {posts.map((post, idx) => (
            <div
              key={post.id || idx}
              className={`
                relative p-6 rounded-xl shadow-lg
                transform ${rotations[idx % rotations.length]} hover:rotate-0
                transition-all duration-300
                hover:bg-gradient-to-br hover:from-emerald-500/30 hover:to-emerald-600/30
                cursor-pointer
                bg-white dark:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-white/30
              `}
            >
              <p className="text-gray-900 dark:text-white whitespace-pre-wrap font-semibold">{post.message}</p>
              <span className="block mt-4 text-sm font-semibold text-gray-600 dark:text-white/60">
                — {post.user}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}