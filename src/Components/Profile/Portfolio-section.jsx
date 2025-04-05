'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

function PortfolioSection() {
  const [currentPage, setCurrentPage] = useState(0)

  const videos = [
    {
      id: 1,
      title: "Product Commercial - TechGear Pro",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "0:45",
      views: "2.3k",
      category: "Commercial"
    },
    {
      id: 2,
      title: "Fashion Collection Showcase",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1:20",
      views: "1.8k",
      category: "Fashion"
    },
    {
      id: 3,
      title: "Lifestyle Product Story",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "2:15",
      views: "3.1k",
      category: "Lifestyle"
    },
    {
      id: 4,
      title: "Brand Campaign Video",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "1:45",
      views: "4.2k",
      category: "Branding"
    },
    {
      id: 5,
      title: "Tech Gadget Review",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "3:30",
      views: "5.7k",
      category: "Review"
    },
    {
      id: 6,
      title: "Eco-Friendly Product Launch",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "2:00",
      views: "1.5k",
      category: "Product Launch"
    }
  ]

  const totalPages = Math.ceil(videos.length / 2)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const VideoCard = ({ video }) => (
    <div className="relative overflow-hidden rounded-xl bg-gray-100">
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 hover:bg-white"
              aria-label={`Play ${video.title}`}
            >
              <Play className="h-6 w-6 text-gray-900" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            {video.duration}
          </span>
          <span className="rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            {video.views} views
          </span>
          <span className="rounded-full bg-black/50 px-2 py-1 text-xs text-white">
            {video.category}
          </span>
        </div>
        <h4 className="mt-2 text-sm font-medium text-white line-clamp-2">
          {video.title}
        </h4>
      </div>
    </div>
  )

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Portfolio</h3>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextPage}
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {videos.slice(currentPage * 2, currentPage * 2 + 2).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 w-2 rounded-full ${
              currentPage === index ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PortfolioSection
