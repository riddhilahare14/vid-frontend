"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Tabs({ tabs, activeTab, onChange }) {
  const [scrollIndex, setScrollIndex] = useState(0)
  const visibleTabs = 3 // Number of tabs visible at once

  const nextTab = () => {
    if (scrollIndex + visibleTabs < tabs.length) {
      setScrollIndex(scrollIndex + 1)
    }
  }

  const prevTab = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex items-center border-b border-gray-200 dark:border-gray-700">
        {scrollIndex > 0 && (
          <button
            onClick={prevTab}
            className="absolute left-0 z-10 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 bg-gradient-to-r from-white dark:from-gray-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        
        <div className="flex-1 flex justify-center">
          {tabs.slice(scrollIndex, scrollIndex + visibleTabs).map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex-1 px-4 py-2 text-sm font-medium text-center
                ${activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {scrollIndex + visibleTabs < tabs.length && (
          <button
            onClick={nextTab}
            className="absolute right-0 z-10 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 bg-gradient-to-l from-white dark:from-gray-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

function TabsList({ children }) {
  return <div className="flex">{children}</div>
}

function TabsTrigger({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
          : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
      }`}
    >
      {children}
    </button>
  )
}

function TabsContent({ children }) {
  return <div className="p-4">{children}</div>
}

export { TabsList, TabsTrigger, TabsContent }
