"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, FileText, Plus, Upload, MessageSquare } from "lucide-react"

export default function ProjectList() {
  const [expanded, setExpanded] = useState(true)
  const [activeProject, setActiveProject] = useState("promo")

  const projects = [
    {
      id: "promo",
      title: "Promo Video",
      progress: 60,
      color: "bg-indigo-500",
    },
    {
      id: "wedding",
      title: "Wedding Highlights",
      progress: 25,
      color: "bg-purple-500",
    },
    {
      id: "corporate",
      title: "Corporate Interview",
      progress: 90,
      color: "bg-blue-500",
    },
  ]

  return (
    <div className="py-2">
      <div
        className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          {expanded ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />}
          ACTIVE PROJECTS
        </h3>
      </div>

      {expanded && (
        <div className="mt-1 space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                activeProject === project.id
                  ? "bg-indigo-50 dark:bg-indigo-900/20 border-l-2 border-indigo-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 border-l-2 border-transparent"
              }`}
              onClick={() => setActiveProject(project.id)}
            >
              <div className="flex items-center">
                <FileText size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{project.title}</span>
              </div>
              <div className="mt-2 relative h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full ${project.color}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{project.progress}% Complete</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 px-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">QUICK ACTIONS</h3>
        <div className="grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center justify-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Plus size={18} className="text-indigo-500 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">New Task</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Upload size={18} className="text-purple-500 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Upload</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <MessageSquare size={18} className="text-blue-500 mb-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Message</span>
          </button>
        </div>
      </div>
    </div>
  )
}

