import { useState } from "react"
import { AlertTriangle, Check, Download } from "lucide-react"

export default function QualityChecklist() {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Audio is clear and balanced", checked: true },
    { id: 2, text: "Video resolution meets requirements", checked: false, aiFlag: "Low resolution detected" },
    { id: 3, text: "Branding elements are consistent", checked: true },
    { id: 4, text: "Content follows the brief", checked: true },
    { id: 5, text: "Transitions are smooth", checked: false },
  ])

  const toggleItem = (id) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const allChecked = checklist.every((item) => item.checked)

  return (
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Quality Assurance</h3>

      <div className="space-y-3 mb-4">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-md ${
              item.aiFlag
                ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-start">
              <div
                className={`h-5 w-5 rounded border flex-shrink-0 flex items-center justify-center cursor-pointer ${
                  item.checked ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-gray-600"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                {item.checked && <Check size={12} className="text-white" />}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-800 dark:text-gray-200">{item.text}</p>
                {item.aiFlag && (
                  <div className="flex items-center mt-1">
                    <AlertTriangle size={12} className="text-red-500 mr-1" />
                    <p className="text-xs text-red-600 dark:text-red-400">{item.aiFlag}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2 px-4 rounded-md font-medium flex items-center justify-center ${
          allChecked
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        } transition-all`}
        disabled={!allChecked}
      >
        <Download size={16} className="mr-2" />
        Download Final File
      </button>

      {!allChecked && (
        <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
          Complete all quality checks to unlock download
        </p>
      )}
    </div>
  )
}

