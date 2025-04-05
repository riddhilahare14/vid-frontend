import { useState } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

const videos = [
  {
    id: 1,
    title: "Urban Dance Championship",
    category: "Sports",
    thumbnail: "/placeholder.svg?height=800&width=1200",
    editor: "Alex Rivera",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    title: "Mountain Bike Series",
    category: "Sports",
    thumbnail: "/placeholder.svg?height=1200&width=800",
    editor: "Sarah Chen",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    title: "Boxing Championship",
    category: "Sports",
    thumbnail: "/placeholder.svg?height=800&width=1200",
    editor: "Mike Johnson",
    aspectRatio: "landscape",
  },
  {
    id: 4,
    title: "Sunset Rally Race",
    category: "Automotive",
    thumbnail: "/placeholder.svg?height=800&width=1200",
    editor: "Emma Williams",
    aspectRatio: "landscape",
  },
  {
    id: 5,
    title: "Basketball Finals",
    category: "Sports",
    thumbnail: "/placeholder.svg?height=1200&width=800",
    editor: "David Liu",
    aspectRatio: "portrait",
  },
  {
    id: 6,
    title: "Soccer Highlights",
    category: "Sports",
    thumbnail: "/placeholder.svg?height=800&width=1200",
    editor: "Maria Garcia",
    aspectRatio: "landscape",
  },
]

const categories = ["All", "Sports", "Automotive", "Events", "Commercial"]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredVideo, setHoveredVideo] = useState(null)

  const filteredVideos =
    selectedCategory === "All" ? videos : videos.filter((video) => video.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Vidlancing</h1>
            <div className="flex gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm transition-colors duration-300 ${
                    selectedCategory === category ? "text-white" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1" layout>
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`relative group cursor-pointer ${video.aspectRatio === "portrait" ? "row-span-2" : ""}`}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Editor Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredVideo === video.id ? 1 : 0,
                      y: hoveredVideo === video.id ? 0 : 20,
                    }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <p className="text-white text-sm font-medium">Edited by {video.editor}</p>
                    <h2 className="text-white text-lg font-bold mt-1">{video.title}</h2>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

