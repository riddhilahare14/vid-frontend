
import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, Clock, FileVideo, MessageSquare, Plus } from "lucide-react"
import ProjectList from "./project-list"
import TaskProgress from "./task-progress"
import ChatInterface from "./chat-interface"

export default function ClientDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Left Sidebar - Projects */}
      <aside
        className={`${leftPanelCollapsed ? "w-0 -ml-4" : "w-64"} transition-all duration-300 ease-in-out relative flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div
            className={`flex items-center ${leftPanelCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
          >
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              V
            </div>
            <h1 className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Vidlancing
            </h1>
          </div>
          <button
            onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {leftPanelCollapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
        </div>

        <div
          className={`flex-1 overflow-auto ${leftPanelCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        >
          <ProjectList />
        </div>

        <div
          className={`p-4 border-t border-gray-200 dark:border-gray-700 ${leftPanelCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        >
          <div className="flex space-x-4">
            <button className="flex-1 py-2 px-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all flex items-center justify-center">
              <Plus size={16} className="mr-1" />
              New Brief
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - Chat */}
      <main
        className={`flex-1 flex flex-col ${leftPanelCollapsed && rightPanelCollapsed ? "max-w-full" : leftPanelCollapsed || rightPanelCollapsed ? "max-w-[calc(100%-20rem)]" : "max-w-[calc(100%-40rem)]"} transition-all duration-300 ease-in-out`}
      >
        {/* Project header */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center px-4">
          <div>
            <h2 className="font-bold text-gray-800 dark:text-gray-200">Promo Video</h2>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={14} className="mr-1" />
              <span>Due Apr 10, 2025</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                Alex Morgan
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              <FileVideo size={18} />
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              <MessageSquare size={18} />
            </button>
          </div>
        </div>

        {/* Chat interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </main>

      {/* Right Sidebar - Tasks & Progress */}
      <aside
        className={`${rightPanelCollapsed ? "w-0 -mr-4" : "w-64"} transition-all duration-300 ease-in-out relative flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-10`}
      >
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
          <h3
            className={`font-semibold text-gray-800 dark:text-gray-200 ${rightPanelCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
          >
            Project Progress
          </h3>
          <button
            onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {rightPanelCollapsed ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>

        <div
          className={`flex-1 overflow-auto p-4 ${rightPanelCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        >
          <TaskProgress />
        </div>
      </aside>
    </div>
  )
}

