// src/components/Collage.jsx
import React, { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Img1 from '../assets/collage/bad_bunny_frog.jpg'
import Img2 from '../assets/collage/basquiat_warhol.jpg'
import Img3 from '../assets/collage/biking_through_nyc.jpg'
import Img4 from '../assets/collage/boston_college.jpg'
import Img5 from '../assets/collage/dune2.jpg'
import Img6 from '../assets/collage/isabella_gardner.jpg'
import Img7 from '../assets/collage/oreo.jpg'
import Img8 from '../assets/collage/skating_through_nyc.jpg'
import Img9 from '../assets/collage/studying.jpg'
import Img10 from '../assets/collage/thunderbolts.jpg'

const photos = [
  { id: 1, src: Img1, caption: 'Me at Columbia Convocation, May 2024.' },
  { id: 2, src: Img2, caption: 'Basquiat & Warhol exhibit, Fall 2022.' },
  { id: 3, src: Img3, caption: 'Biking through NYC, Summer 2023.' },
  { id: 4, src: Img4, caption: 'Boston College visit, Spring 2023.' },
  { id: 5, src: Img5, caption: 'Dune II launch party, Feb 2024.' },
  { id: 6, src: Img6, caption: 'Isabella Gardner Museum, Winter 2022.' },
  { id: 7, src: Img7, caption: 'Oreo taste test, Jun 2021.' },
  { id: 8, src: Img8, caption: 'Skating through NYC, Spring 2023.' },
  { id: 9, src: Img9, caption: 'Studying with friends, Fall 2023.' },
  { id: 10, src: Img10, caption: 'Thor: Love and Thunder, Jul 2022.' },
]

export default function Collage() {
  const [selected, setSelected] = useState(null)

  const layout = useMemo(() => {
    return photos.map(() => ({
      top: Math.random() * 360 + 20,
      left: Math.random() * 840 + 20,
      angle: (Math.random() * 30) - 15,
    }))
  }, [])

  return (
    <div className="relative w-full h-[500px] max-w-4xl mx-auto mt-12">
      {photos.map((p, i) => {
        const { top, left, angle } = layout[i]
        return (
                <motion.img
                key={p.id}
                src={p.src}
                alt=""
                onClick={() => setSelected(p)}
                className="
                absolute w-40 h-40 object-cover rounded-xl cursor-pointer
                shadow-lg border-4 border-white
                transition-colors duration-500 ease-in-out
                hover:border-emerald-500
                "
                style={{ top, left, rotate: `${angle}deg`, zIndex: i + 1 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 200 }}
                transition={{ type: 'spring', stiffness: 300 }}
                />
        )
      })}

      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              style={{ zIndex: 1010 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md text-center shadow-xl border-emerald-400"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt=""
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-900 dark:text-gray-100">{selected.caption}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
