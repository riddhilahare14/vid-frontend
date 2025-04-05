import { useState } from "react"
import { Calendar, Check, Clock, X } from "lucide-react"

export default function MilestoneApproval() {
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Brief Approval", status: "completed", date: "Mar 15, 2025" },
    { id: 2, title: "Rough Cut", status: "completed", date: "Mar 20, 2025" },
    { id: 3, title: "Final Delivery", status: "pending", date: "Mar 28, 2025" },
  ])

  const handleApprove = (id) => {
    setMilestones(
      milestones.map((milestone) => (milestone.id === id ? { ...milestone, status: "completed" } : milestone)),
    )
  }

  const handleReject = (id) => {
    setMilestones(
      milestones.map((milestone) => (milestone.id === id ? { ...milestone, status: "rejected" } : milestone)),
    )
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          className={`p-4 rounded-lg border ${
            milestone.status === "completed"
              ? "border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20"
              : milestone.status === "rejected"
                ? "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">{milestone.title}</h4>
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="mr-1" />
                <span>{milestone.date}</span>
              </div>
            </div>

            <div
              className={`flex items-center ${
                milestone.status === "completed"
                  ? "text-green-500"
                  : milestone.status === "rejected"
                    ? "text-red-500"
                    : "text-orange-500"
              }`}
            >
              {milestone.status === "completed" ? (
                <Check size={18} />
              ) : milestone.status === "rejected" ? (
                <X size={18} />
              ) : (
                <Clock size={18} />
              )}
              <span className="ml-1 text-sm font-medium capitalize">{milestone.status}</span>
            </div>
          </div>

          {milestone.status === "pending" && (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleApprove(milestone.id)}
                className="flex-1 py-2 px-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-all"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(milestone.id)}
                className="flex-1 py-2 px-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
              >
                Reject
              </button>
            </div>
          )}

          {milestone.status === "rejected" && (
            <div className="mt-4">
              <textarea
                placeholder="Provide feedback for revision..."
                rows={3}
                className="w-full p-2 border border-red-300 dark:border-red-900/50 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
              <button className="mt-2 py-2 px-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                Submit Feedback
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

