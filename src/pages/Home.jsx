import { useEffect, useState } from 'react'

import img1 from '../assets/logo/img1.png'
import img2 from '../assets/logo/img2.png'
import img3 from '../assets/logo/img3.png'
import img4 from '../assets/logo/img4.png'
import img5 from '../assets/logo/img5.png'
import img6 from '../assets/logo/img6.png'
import img7 from '../assets/logo/img7.png'
import img8a from '../assets/logo/img8a.png'
import img8b from '../assets/logo/img8b.png'

export default function Home() {
  const [index, setIndex] = useState(0)
  const images = [img1, img2, img3, img4, img5, img6, img7]
  const altImages = [img8a, img8b]

  useEffect(() => {
    const interval = setInterval(() => {
      // If we've shown the first 7, toggle between the last 2
      if (index >= images.length) {
        setIndex(prev => (prev === images.length ? images.length + 1 : images.length))
      } else {
        setIndex(prev => prev + 1)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [index])

  const currentImage = index < images.length ? images[index] : altImages[(index - images.length) % 2]

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-emerald-800 to-emerald-200 p-8">
      <img
        src={currentImage}
        alt="Animated logo"
        className="w-75 h-72 object-contain transition-opacity duration-300"
      />

      <h2 className="text-3xl font-bold text-white mt-8">Welcome to Samir's Site 🥳</h2>
      <p className="text-white text-center mt-2">Click on tabs to explore!</p>
    </div>
  )
}
