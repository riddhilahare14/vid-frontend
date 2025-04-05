import { useState } from "react"
import {
  User,
  FileText,
  Plus,
  Upload,
  FileIcon as FileInvoice,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "./theme-provider"

export default function LeftSidebar({ currentProject, onNewTask, onGenerateInvoice, isCollapsed }) {
  const [projects, setProjects] = useState([
    { id: "proj-001", name: "Promo Video", progress: 60 },
    { id: "proj-002", name: "Wedding Highlights", progress: 25 },
    { id: "proj-003", name: "Corporate Interview", progress: 90 },
  ])

  const { theme, setTheme } = useTheme()

  if (isCollapsed) return null

  return (
    <div className="w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transition-colors duration-200">
      {/* Logo and Theme Toggle */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Vidlancing
        </h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
        </button>
      </div>

      {/* Profile */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div>
          <h3 className="font-medium">Alex Morgan</h3>
          <p className="text-xs text-green-400">Available</p>
        </div>
      </div>

      {/* Projects */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Active Projects</h2>
          <button className="text-blue-400 hover:text-blue-300 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-3 rounded-lg transition-all duration-200 ${
                project.id === currentProject.id
                  ? "bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-400" />
                  {project.name}
                </h3>
                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{project.progress}% Complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onNewTask}
            className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1 group-hover:bg-blue-500/30 transition-colors">
              <Plus className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs">New Task</span>
          </button>

          <button className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-1 group-hover:bg-purple-500/30 transition-colors">
              <Upload className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-xs">Upload</span>
          </button>

          <button
            onClick={onGenerateInvoice}
            className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-1 group-hover:bg-green-500/30 transition-colors">
              <FileInvoice className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-xs">Invoice</span>
          </button>
        </div>
      </div>
    </div>
  )
}

