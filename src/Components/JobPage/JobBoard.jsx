import { useState } from 'react'
import { Search } from 'lucide-react'
import { Sidebar } from "./Sidebar"
import { EmptySavedJobs } from "./EmptySavedJobs"
import { JobList } from "./JobList"

export function JobBoard() {
  const [activeTab, setActiveTab] = useState('best-matches')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedJobs, setSavedJobs] = useState([])

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white px-6 py-4 shadow-sm">
          <div className="relative mx-auto mb-8 max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search for video editing jobs..." 
              className="h-12 w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 text-lg shadow-sm outline-none transition-shadow duration-200 ease-in-out placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            {['best-matches', 'most-recent', 'saved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 text-lg font-medium transition-colors duration-200 ${
                  activeTab === tab 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[calc(100vh-132px)] overflow-y-auto bg-gray-50 px-6 py-8">
          <div className="mx-auto max-w-5xl">
            {activeTab === 'saved' && savedJobs.length === 0 ? (
              <EmptySavedJobs />
            ) : (
              <JobList savedJobs={savedJobs} toggleSaveJob={toggleSaveJob} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

