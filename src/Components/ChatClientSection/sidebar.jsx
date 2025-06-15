import { useState } from "react"
import { getStatusColor } from "./client-workspace"

export function Sidebar({ onSelectJob, selectedJobId, activeJobs, completedJobs }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={`${isCollapsed ? "w-20" : "w-72"} flex flex-col h-full bg-gray-900 text-white transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className={`${isCollapsed ? "hidden" : "block"}`}>
          <h1 className="text-xl font-bold">Vidlancing</h1>
          <p className="text-sm text-gray-400">Client Workspace</p>
        </div>
        <div className={`${isCollapsed ? "mx-auto" : ""}`}>
          <img src="/placeholder.svg?height=32&width=32" alt="Logo" className="h-8 w-8 rounded-md" />
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded-md hover:bg-gray-800 text-gray-400">
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="py-4">
          <div className={`px-4 mb-2 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
            <h2 className={`text-sm font-semibold text-gray-400 uppercase ${isCollapsed ? "hidden" : "block"}`}>
              Active Jobs
            </h2>
            {isCollapsed ? (
              <div className="h-6 w-6 flex items-center justify-center bg-blue-600 rounded-full text-xs font-medium">
                {activeJobs.length}
              </div>
            ) : (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-600">{activeJobs.length}</span>
            )}
          </div>

          <div className="space-y-1">
            {activeJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => onSelectJob(job)}
                className={`w-full text-left ${isCollapsed ? "px-2" : "px-4"} py-2 ${
                  selectedJobId === job.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {isCollapsed ? (
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden mb-1">
                      <img
                        src={job.freelancer?.profilePicture || "/placeholder.svg?height=32&width=32"}
                        alt={job.freelancer?.firstname}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(job.status)}`}></div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                      <img
                        src={job.freelancer?.profilePicture || "/placeholder.svg?height=32&width=32"}
                        alt={job.freelancer?.firstname}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{job.title}</p>
                        <span className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(job.status)}`}></span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {job.freelancer ? `${job.freelancer.firstname} ${job.freelancer.lastname}` : 'No freelancer assigned'}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="py-4">
          <div className={`px-4 mb-2 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
            <h2 className={`text-sm font-semibold text-gray-400 uppercase ${isCollapsed ? "hidden" : "block"}`}>
              Completed
            </h2>
            {isCollapsed ? (
              <div className="h-6 w-6 flex items-center justify-center bg-green-600 rounded-full text-xs font-medium">
                {completedJobs.length}
              </div>
            ) : (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-600">{completedJobs.length}</span>
            )}
          </div>

          <div className="space-y-1">
            {completedJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => onSelectJob(job)}
                className={`w-full text-left ${isCollapsed ? "px-2" : "px-4"} py-2 ${
                  selectedJobId === job.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {isCollapsed ? (
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden mb-1">
                      <img
                        src={job.freelancer?.profilePicture || "/placeholder.svg?height=32&width=32"}
                        alt={job.freelancer?.firstname}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(job.status)}`}></div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                      <img
                        src={job.freelancer?.profilePicture || "/placeholder.svg?height=32&width=32"}
                        alt={job.freelancer?.firstname}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{job.title}</p>
                        <span className={`ml-2 h-2 w-2 rounded-full ${getStatusColor(job.status)}`}></span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {job.freelancer ? `${job.freelancer.firstname} ${job.freelancer.lastname}` : 'No freelancer assigned'}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
            <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" className="h-full w-full object-cover" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Your Name</p>
              <p className="text-xs text-gray-400 truncate">Client</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
