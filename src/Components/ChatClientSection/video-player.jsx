import { useState } from "react"
import { Maximize, Pause, Play, SkipBack, SkipForward, Volume2, FileVideo, X } from "lucide-react"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [annotations, setAnnotations] = useState([
    { id: 1, time: "0:32", text: "Add transition here", position: { x: 30, y: 40 } },
    { id: 2, time: "1:15", text: "Increase brightness", position: { x: 60, y: 70 } },
  ])

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
      {/* Video container */}
      <div className="relative aspect-video bg-black">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FileVideo size={48} className="text-gray-500 dark:text-gray-400" />
        </div>

        {/* Annotations */}
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            className="absolute w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            style={{ left: `${annotation.position.x}%`, top: `${annotation.position.y}%` }}
          >
            <span className="text-xs font-bold">{annotation.id}</span>

            {/* Annotation tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-gray-800 dark:text-gray-200 text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              <p className="font-bold">{annotation.time}</p>
              <p>{annotation.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video controls */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800">
        {/* Progress bar */}
        <div className="relative h-1 bg-gray-300 dark:bg-gray-700 rounded-full mb-4 cursor-pointer">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-orange-500 rounded-full"></div>
          <div className="absolute h-3 w-3 bg-white border-2 border-orange-500 rounded-full top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <SkipBack size={20} />
            </button>
            <button
              className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <SkipForward size={20} />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">0:32 / 2:45</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Volume2 size={16} className="text-gray-600 dark:text-gray-300 mr-2" />
              <div className="w-20 h-1 bg-gray-300 dark:bg-gray-700 rounded-full">
                <div className="h-full w-2/3 bg-orange-500 rounded-full"></div>
              </div>
            </div>
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Annotation tools */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Annotation Tools</h3>
        <div className="flex space-x-2">
          <button className="py-1 px-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-md text-sm font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
            Add Comment
          </button>
          <button className="py-1 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
            Draw
          </button>
          <button className="py-1 px-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
            Timestamp
          </button>
        </div>

        {/* Annotations list */}
        <div className="mt-4 space-y-2">
          {annotations.map((annotation) => (
            <div key={annotation.id} className="flex items-start p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <span className="text-xs font-bold">{annotation.id}</span>
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{annotation.time}</p>
                <p className="text-sm text-gray-800 dark:text-gray-200">{annotation.text}</p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

