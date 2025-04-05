import { useState } from "react"
import { Calendar, Search, Star } from "lucide-react"

export default function ProjectMemory() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Company Overview Video",
      editor: "John D.",
      date: "Feb 15, 2025",
      rating: 4,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      title: "Product Demo",
      editor: "Sarah M.",
      date: "Jan 28, 2025",
      rating: 5,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      title: "Social Media Ad",
      editor: "Alex T.",
      date: "Jan 10, 2025",
      rating: 3,
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Project History</h3>
        <div className="relative">
          <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-8 py-1 px-3 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md hover:border-orange-300 dark:hover:border-orange-700 transition-colors cursor-pointer"
          >
            <div className="flex">
              <div className="w-20 h-12 bg-gray-200 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{project.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Editor: {project.editor}</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={`${star <= project.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                        fill={star <= project.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar size={10} className="mr-1" />
                  <span>{project.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm">
        View All Projects
      </button>
    </div>
  )
}

