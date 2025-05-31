// src/components/Collage.jsx
import React, { useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useResizeObserver from "@react-hook/resize-observer";
import Img1 from "../assets/collage/bad_bunny_frog.jpg";
import Img2 from "../assets/collage/basquiat_warhol.jpg";
import Img3 from "../assets/collage/biking_through_nyc.jpg";
import Img4 from "../assets/collage/boston_college.jpg";
import Img5 from "../assets/collage/dune2.jpg";
import Img6 from "../assets/collage/isabella_gardner.jpg";
import Img7 from "../assets/collage/oreo.jpg";
import Img8 from "../assets/collage/skating_through_nyc.jpg";
import Img9 from "../assets/collage/studying.jpg";
import Img10 from "../assets/collage/thunderbolts.jpg";

const photos = [
  { id: 1, src: Img1, caption: "Drawing of Concho at Puerto Rican Museum" },
  {
    id: 2,
    src: Img2,
    caption: "Basquiat & Warhol exhibit that I like the artwork for",
  },
  { id: 3, src: Img3, caption: "Biking through NYC with friends" },
  { id: 4, src: Img4, caption: "Boston College visit" },
  { id: 5, src: Img5, caption: "Dune II priemere" },
  { id: 6, src: Img6, caption: "Isabella Gardner Museum" },
  { id: 7, src: Img7, caption: "Oreo my dog :)" },
  { id: 8, src: Img8, caption: "Skating through NYC again with friends" },
  { id: 9, src: Img9, caption: "Studying by myself with a redbull" },
  {
    id: 10,
    src: Img10,
    caption:
      "Tried watching Thunderbolts with my friends and the theater got evacuated :(",
  },
];
const IMG_SIZE = 160;

export default function Collage() {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useResizeObserver(containerRef, (entry) => {
    const { width, height } = entry.contentRect;
    setDims({ width, height });
  });

  const layout = useMemo(() => {
    if (!dims.width || !dims.height) return [];
    return photos.map(() => ({
      top: Math.random() * (dims.height - IMG_SIZE),
      left: Math.random() * (dims.width - IMG_SIZE),
      angle: Math.random() * 30 - 15,
    }));
  }, [dims]);

  return (
    <>
      <div
        ref={containerRef}
        className="hidden md:block relative w-full h-48 sm:h-64 md:h-80 lg:h-[500px] max-w-4xl mx-auto mt-12"
      >
        {layout.map((pos, i) => {
          const p = photos[i];
          return (
            <motion.img
              key={p.id}
              src={p.src}
              alt={p.caption}
              onClick={() => setSelected(p)}
              className="
                absolute
                w-20 h-20
                sm:w-24 sm:h-24
                md:w-32 md:h-32
                lg:w-40 lg:h-40
                object-cover rounded-xl cursor-pointer
                shadow-lg border-4 border-white
                transition-colors duration-500 ease-in-out
                hover:border-emerald-500
              "
              style={{
                top: pos.top,
                left: pos.left,
                rotate: `${pos.angle}deg`,
                zIndex: i + 1,
              }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 200 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          );
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
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selected.src}
                  alt={selected.caption}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-900 dark:text-gray-100">
                  {selected.caption}
                </p>
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

      <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-2xl mx-auto mt-8 px-4">
        {photos.map((p) => (
          <img
            key={p.id}
            src={p.src}
            alt={p.caption}
            className="w-full h-24 object-cover rounded-lg cursor-pointer shadow"
            onClick={() => setSelected(p)}
          />
        ))}

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
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selected.src}
                  alt={selected.caption}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-900 dark:text-gray-100">
                  {selected.caption}
                </p>
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
    </>
  );
}
