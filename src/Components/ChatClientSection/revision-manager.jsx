import { useState } from "react"
import { AlertCircle, Check, Clock, RefreshCw } from "lucide-react"

export default function RevisionManager() {
  const [revisions, setRevisions] = useState([
    { id: 1, title: "Add company logo", status: "completed", date: "Mar 18, 2025" },
    { id: 2, title: "Change background music", status: "pending", date: "Mar 22, 2025" },
  ])
  const [freeRevisionsLeft, setFreeRevisionsLeft] = useState(1)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Revision Requests</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Free Revisions Left:</span>
          <span
            className={`text-sm font-medium px-2 py-0.5 rounded-full ${freeRevisionsLeft > 0 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"}`}
          >
            {freeRevisionsLeft}/2
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {revisions.map((revision) => (
          <div
            key={revision.id}
            className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{revision.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Requested: {revision.date}</p>
              </div>
              <div
                className={`flex items-center ${
                  revision.status === "completed"
                    ? "text-green-500"
                    : revision.status === "rejected"
                      ? "text-red-500"
                      : "text-orange-500"
                }`}
              >
                {revision.status === "completed" ? <Check size={16} /> : <Clock size={16} />}
                <span className="ml-1 text-xs font-medium capitalize">{revision.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 px-4 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-md font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all flex items-center justify-center">
        <RefreshCw size={16} className="mr-2" />
        Request Revision
      </button>

      {freeRevisionsLeft === 0 && (
        <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md border border-orange-200 dark:border-orange-900/30 flex items-start">
          <AlertCircle size={16} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-700 dark:text-orange-400">
            You've used all free revisions. Additional revisions will incur extra charges.
          </p>
        </div>
      )}
    </div>
  )
}

