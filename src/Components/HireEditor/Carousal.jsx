import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'



export default function Carousel({ title, children }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const containerRef = useRef(null)

  const checkScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction) => {
    if (!containerRef.current) return
    const scrollAmount = direction === 'left' ? -400 : 400
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      
      <div className="relative group">
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        )}
        
        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {children}
        </div>
        
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  )
}

