import { useState } from 'react'
import { Search, Sliders, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const popularSearches = [
  "Animation",
  "Video Editing",
  "Social Media Videos",
  "Motion Graphics",
  "Product Videos"
]

const filters = [
  {
    name: "Category",
    options: ["Animation", "Video Editing", "Motion Graphics", "Social Media"]
  },
  {
    name: "Duration",
    options: ["Less than 30s", "30s to 1min", "1-3 min", "3+ min"]
  },
  {
    name: "Budget",
    options: ["Basic", "Standard", "Premium", "Custom"]
  }
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({})

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        {/* Main Search Input */}
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What kind of video are you looking for?"
              className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none text-lg shadow-sm bg-white/70 backdrop-blur-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`h-14 px-5 rounded-2xl border-2 flex items-center gap-2 transition-colors ${
              isFilterOpen 
                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                : 'border-gray-100 hover:border-gray-200 text-gray-700'
            }`}
          >
            <Sliders className="h-5 w-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filters Dropdown */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 z-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filters.map((filter) => (
                  <div key={filter.name}>
                    <h3 className="font-medium mb-2 text-gray-700">{filter.name}</h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={filter.name}
                            value={option}
                            checked={selectedFilters[filter.name] === option}
                            onChange={(e) => 
                              setSelectedFilters(prev => ({
                                ...prev,
                                [filter.name]: e.target.value
                              }))
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popular Searches */}
       
      </div>
    </div>
  )
}

