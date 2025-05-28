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
  const title = "Welcome to Samir's Site".split("")
  useEffect(() => {
    const interval = setInterval(() => {
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
    </div>
  )
}