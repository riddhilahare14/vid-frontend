import { useState } from "react"
import { AlertTriangle } from "lucide-react"

export default function BudgetTracker() {
  const [budget, setBudget] = useState({
    total: 200,
    spent: 150,
    breakdown: {
      editorFee: 120,
      vidlancingFee: 30,
      remaining: 50,
    },
  })

  // Calculate percentages for the pie chart
  const editorFeePercent = (budget.breakdown.editorFee / budget.total) * 100
  const vidlancingFeePercent = (budget.breakdown.vidlancingFee / budget.total) * 100
  const remainingPercent = (budget.breakdown.remaining / budget.total) * 100

  return (
    <div>
      {/* Pie chart */}
      <div className="flex justify-center mb-4">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* Editor Fee slice */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#f97316"
              strokeWidth="20"
              strokeDasharray={`${editorFeePercent} ${100 - editorFeePercent}`}
              strokeDashoffset="25"
              className="transition-all duration-500 ease-in-out"
            />

            {/* Vidlancing Fee slice */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#ec4899"
              strokeWidth="20"
              strokeDasharray={`${vidlancingFeePercent} ${100 - vidlancingFeePercent}`}
              strokeDashoffset={`${100 - editorFeePercent + 25}`}
              className="transition-all duration-500 ease-in-out"
            />

            {/* Remaining slice */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#d1d5db"
              strokeWidth="20"
              strokeDasharray={`${remainingPercent} ${100 - remainingPercent}`}
              strokeDashoffset={`${100 - editorFeePercent - vidlancingFeePercent + 25}`}
              className="transition-all duration-500 ease-in-out dark:stroke-gray-600"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Spent</span>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">${budget.spent}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">of ${budget.total}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Editor Fee</span>
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">${budget.breakdown.editorFee}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-pink-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Vidlancing Fee</span>
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            ${budget.breakdown.vidlancingFee}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Remaining</span>
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">${budget.breakdown.remaining}</span>
        </div>
      </div>

      {/* Warning for low budget */}
      {budget.breakdown.remaining < 60 && (
        <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md border border-orange-200 dark:border-orange-900/30 flex items-start">
          <AlertTriangle size={16} className="text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Additional revisions may exceed your budget. Consider adding funds.
          </p>
        </div>
      )}

      <button className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md font-medium hover:from-orange-600 hover:to-pink-600 transition-all">
        Add Funds
      </button>
    </div>
  )
}

