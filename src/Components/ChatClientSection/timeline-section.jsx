import { formatDate } from "./client-workspace"

export function TimelineSection({ job }) {
  // Add default empty arrays and values
  const events = job?.timeline || []

  return (
    <div className="h-full overflow-y-auto p-4">
      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No timeline events yet
        </div>
      ) : (
        <div className="relative">
          {/* Add a vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="relative flex gap-4">
                <div className="absolute left-4 w-2 h-2 mt-2 -translate-x-1 rounded-full bg-blue-600"></div>
                <div className="flex-1 ml-8">
                  <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                  <time className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(event.timestamp)}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
