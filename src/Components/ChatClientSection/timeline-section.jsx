import { formatDate } from "./client-workspace"
import { Clock, CheckCircle, AlertCircle, MessageSquare, Upload, Download } from "lucide-react"

export function TimelineSection({ job }) {
  // Mock timeline events
  const events = job?.timeline || [
    {
      id: 1,
      type: "project_started",
      title: "Project Started",
      description: "Video editing project has been initiated",
      timestamp: "2024-01-10T09:00:00Z",
      user: { name: "System", avatar: null },
    },
    {
      id: 2,
      type: "file_uploaded",
      title: "Raw Footage Uploaded",
      description: "Editor uploaded raw footage files",
      timestamp: "2024-01-11T14:30:00Z",
      user: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 3,
      type: "milestone_completed",
      title: "First Draft Completed",
      description: "Initial edit has been completed and is ready for review",
      timestamp: "2024-01-13T16:45:00Z",
      user: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 4,
      type: "feedback_received",
      title: "Client Feedback Received",
      description: "Client provided feedback on the first draft",
      timestamp: "2024-01-14T10:15:00Z",
      user: { name: "You", avatar: "/placeholder.svg?height=32&width=32" },
    },
    {
      id: 5,
      type: "revision_uploaded",
      title: "Revision Uploaded",
      description: "Updated version based on client feedback",
      timestamp: "2024-01-15T13:20:00Z",
      user: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    },
  ]

  const getEventIcon = (type) => {
    switch (type) {
      case "project_started":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "milestone_completed":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "file_uploaded":
        return <Upload className="w-4 h-4 text-indigo-500" />
      case "revision_uploaded":
        return <Download className="w-4 h-4 text-purple-500" />
      case "feedback_received":
        return <MessageSquare className="w-4 h-4 text-amber-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getEventColor = (type) => {
    switch (type) {
      case "project_started":
        return "border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
      case "milestone_completed":
        return "border-emerald-200 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20"
      case "file_uploaded":
        return "border-indigo-200 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/20"
      case "revision_uploaded":
        return "border-purple-200 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20"
      case "feedback_received":
        return "border-amber-200 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20"
    }
  }

  return (
    <div className="h-full p-4">
      <div className="mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Project Timeline</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track project milestones and activities</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No timeline events yet</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} className="relative flex items-start space-x-4">
                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                  {getEventIcon(event.type)}
                </div>

                {/* Event content */}
                <div className={`flex-1 p-4 rounded-lg border ${getEventColor(event.type)} min-h-[60px]`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</h4>
                    <time className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                      {formatDate(event.timestamp)}
                    </time>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.description}</p>

                  {event.user && (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <img
                          src={event.user.avatar || "/placeholder.svg?height=20&width=20"}
                          alt={event.user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{event.user.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
