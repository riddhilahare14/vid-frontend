import { useState } from "react"
import { X, Plus } from "lucide-react"

export default function TaskModal({ onClose, onSave }) {
  const [task, setTask] = useState({
    id: `task-${Date.now()}`,
    name: "",
    status: "Pending",
    hours: 0,
    cost: 0,
    dueDate: new Date().toISOString().split("T")[0],
  })

  const [suggestions] = useState([
    { name: "Color Grading", hours: 2, cost: 100 },
    { name: "Sound Design", hours: 3, cost: 150 },
    { name: "Motion Graphics", hours: 4, cost: 200 },
  ])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask({
      ...task,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(task)
  }

  const applySuggestion = (suggestion) => {
    setTask({
      ...task,
      name: suggestion.name,
      hours: suggestion.hours,
      cost: suggestion.cost,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md overflow-hidden shadow-xl transform transition-all">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium">Add New Task</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Task Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={task.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-300 mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  value={task.hours}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium text-gray-300 mb-1">
                  Cost ($)
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={task.cost}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">AI Suggestions</label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.name}
                    type="button"
                    onClick={() => applySuggestion(suggestion)}
                    className="bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 text-xs rounded-full px-3 py-1 flex items-center transition-colors border border-blue-800/50"
                  >
                    {suggestion.name} - {suggestion.hours}h
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

