import { useState, useRef } from "react"
import { CheckCircle, Clock, AlertCircle, MoreVertical, Package, Clapperboard, FileCheck, File, Upload } from "lucide-react"

export default function RightPanel({ currentProject, setCurrentProject, isCollapsed }) {
  const [activeTab, setActiveTab] = useState("tasks")
  const [fileCategory, setFileCategory] = useState("all")
  const fileInputRef = useRef(null)

  // File categories
  const fileCategories = [
    { id: "all", label: "All" },
    { id: "raw", label: "Raw" },
    { id: "final", label: "Final" },
    { id: "refs", label: "Refs" },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId)
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("taskId")

    const updatedTasks = currentProject.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task,
    )

    setCurrentProject({
      ...currentProject,
      tasks: updatedTasks,
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const getMilestoneIcon = (iconName) => {
    switch (iconName) {
      case "FileCheck":
        return <FileCheck className="w-5 h-5" />
      case "Clapperboard":
        return <Clapperboard className="w-5 h-5" />
      case "Package":
        return <Package className="w-5 h-5" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map((file) => ({
      id: `file-${Date.now()}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      category: fileCategory === "all" ? "raw" : fileCategory, // default to raw if all
      uploadedAt: new Date().toISOString(),
      versions: [
        {
          version: 1,
          fileUrl: URL.createObjectURL(file),
          uploadedAt: new Date().toISOString(),
        },
      ],
    }))
    setCurrentProject({
      ...currentProject,
      files: [...(currentProject.files || []), ...newFiles],
    })
  }

  // Filter files by category
  const filteredFiles = (currentProject.files || []).filter(
    (file) => fileCategory === "all" || file.category === fileCategory
  )

  if (isCollapsed) return null

  return (
    <div className="w-full bg-white dark:bg-gray-800 flex flex-col h-full transition-colors duration-200">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`flex-1 px-4 py-3 font-medium text-sm ${
            activeTab === "tasks"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </button>
        <button
          className={`flex-1 px-4 py-3 font-medium text-sm ${
            activeTab === "progress"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("progress")}
        >
          Progress
        </button>
        <button
          className={`flex-1 px-4 py-3 font-medium text-sm ${
            activeTab === "files"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("files")}
        >
          Files
        </button>
      </div>

      {/* Files Tab */}
      {activeTab === "files" && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center gap-2 mb-4">
            {fileCategories.map((cat) => (
              <button
                key={cat.id}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  fileCategory === cat.id
                    ? "bg-blue-100 text-blue-700 border-blue-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                }`}
                onClick={() => setFileCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
            <button
              className="ml-auto flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-1" /> Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
          </div>
          <div className="space-y-3">
            {filteredFiles.length === 0 && (
              <div className="text-center text-gray-400 py-8">No files uploaded yet.</div>
            )}
            {filteredFiles.map((file) => (
              <div key={file.id} className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <File className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-sm">{file.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{file.category}</span>
                  </div>
                  <a
                    href={file.url}
                    download={file.name}
                    className="text-blue-500 hover:underline text-xs"
                  >
                    Download
                  </a>
                </div>
                {/* Version history */}
                {file.versions && file.versions.length > 1 && (
                  <div className="mt-2 text-xs text-gray-500">
                    Versions:
                    {file.versions.map((ver, idx) => (
                      <a
                        key={idx}
                        href={ver.fileUrl}
                        download={`${file.name}.v${ver.version}`}
                        className="ml-2 underline text-blue-400"
                      >
                        v{ver.version}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "tasks" ? (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Pending Tasks */}
            <div
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
              onDrop={(e) => handleDrop(e, "Pending")}
              onDragOver={handleDragOver}
            >
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-gray-400" />
                Pending
              </h3>
              <div className="space-y-2">
                {currentProject.tasks
                  .filter((task) => task.status === "Pending")
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 cursor-move hover:shadow-md hover:shadow-blue-900/20 transition-all border border-gray-200 dark:border-gray-700"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{task.name}</h4>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          ${task.cost} • {task.hours}h
                        </span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* In Progress Tasks */}
            <div
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
              onDrop={(e) => handleDrop(e, "In Progress")}
              onDragOver={handleDragOver}
            >
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                In Progress
              </h3>
              <div className="space-y-2">
                {currentProject.tasks
                  .filter((task) => task.status === "In Progress")
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 cursor-move hover:shadow-md hover:shadow-blue-900/20 transition-all border border-gray-200 dark:border-gray-700"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{task.name}</h4>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          ${task.cost} • {task.hours}h
                        </span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Completed Tasks */}
            <div
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
              onDrop={(e) => handleDrop(e, "Completed")}
              onDragOver={handleDragOver}
            >
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Completed
              </h3>
              <div className="space-y-2">
                {currentProject.tasks
                  .filter((task) => task.status === "Completed")
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 cursor-move hover:shadow-md hover:shadow-blue-900/20 transition-all border border-gray-200 dark:border-gray-700"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium line-through text-gray-500">{task.name}</h4>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>
                          ${task.cost} • {task.hours}h
                        </span>
                        <span>Completed</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {/* Progress Tracker */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Project Progress</h3>
              <div className="text-lg font-bold text-blue-500 dark:text-blue-400">{currentProject.progress}%</div>
            </div>

            <div className="relative h-32 w-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  className="dark:stroke-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#blue-gradient)"
                  strokeWidth="10"
                  strokeDasharray={`${(2 * Math.PI * 40 * currentProject.progress) / 100} ${2 * Math.PI * 40 * (1 - currentProject.progress / 100)}`}
                  strokeDashoffset={2 * Math.PI * 40 * 0.25}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{currentProject.progress}%</span>
              </div>
            </div>

            {/* Milestone Badges */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Milestones</h4>
              <div className="flex justify-between">
                {currentProject.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        milestone.completed
                          ? "bg-blue-100 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                      } ${milestone.completed ? "animate-pulse" : ""}`}
                    >
                      {getMilestoneIcon(milestone.icon)}
                    </div>
                    <span className="text-xs mt-1 text-center max-w-[60px]">{milestone.name}</span>
                    {index < currentProject.milestones.length - 1 && (
                      <div className="absolute w-8 h-0.5 bg-gray-200 dark:bg-gray-700 translate-x-[60px]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

