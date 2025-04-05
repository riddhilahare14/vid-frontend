import React, { useState } from 'react'
import { FilterSection } from "./FilterSection"
import { RadioOption } from "./RadioOption"

const categories = [
  "All categories",
  "Video Editing",
  "Animation",
  "Motion Graphics",
  "Post-Production",
  "Color Grading",
  "Visual Effects",
  "Sound Editing",
  "Video Production",
  "Film Editing",
  "Audio Post-Production"
]

const talentBadges = [
  { label: "Top Rated Plus", value: "top-rated-plus", color: "pink" },
  { label: "Top Rated", value: "top-rated", color: "blue" },
  { label: "Rising Talent", value: "rising-talent", color: "green" }
]

const talentTypes = [
  { label: "Freelancers & Agencies", value: "both" },
  { label: "Freelancers", value: "freelancers" },
  { label: "Agencies", value: "agencies" }
]

const hourlyRates = [
  { label: "Any hourly rate", value: "any" },
  { label: "$10 and below", value: "10-below" },
  { label: "$10 - $30", value: "10-30" },
  { label: "$30 - $60", value: "30-60" },
  { label: "$60 & above", value: "60-above" }
]

const jobSuccess = [
  { label: "Any job success", value: "any" },
  { label: "80% & up", value: "80" },
  { label: "90% & up", value: "90" }
]

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    talentBadge: true,
    location: true,
    talentType: true,
    category: true,
    hourlyRate: true,
    jobSuccess: true,
    earnedAmount: false,
    hoursBilled: false,
    englishLevel: false,
    otherLanguages: false,
  })

  const [selectedCategory, setSelectedCategory] = useState("All categories")
  const [hourlyRate, setHourlyRate] = useState("any")
  const [selectedJobSuccess, setSelectedJobSuccess] = useState("any")
  const [selectedTalentType, setSelectedTalentType] = useState("both")

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="w-72 bg-white p-4 border-r border-gray-200">
      {/* Top Priority Sections */}
      <FilterSection
        title="Talent badge"
        isOpen={openSections.talentBadge}
        onToggle={() => toggleSection('talentBadge')}
      >
        <div className="space-y-2">
          {talentBadges.map(badge => (
            <div key={badge.value} className="flex items-center">
              <input
                type="checkbox"
                id={`badge-${badge.value}`}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor={`badge-${badge.value}`} className="ml-3 flex items-center text-sm text-gray-700">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 bg-${badge.color}-500`}></span>
                {badge.label}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Location"
        isOpen={openSections.location}
        onToggle={() => toggleSection('location')}
      >
        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
          <option value="">Select talent location</option>
          {/* Add location options as needed */}
        </select>
      </FilterSection>

      <FilterSection
        title="Talent type"
        isOpen={openSections.talentType}
        onToggle={() => toggleSection('talentType')}
      >
        <div className="space-y-2">
          {talentTypes.map(type => (
            <RadioOption
              key={type.value}
              id={`type-${type.value}`}
              name="talentType"
              value={type.value}
              label={type.label}
              checked={selectedTalentType === type.value}
              onChange={setSelectedTalentType}
            />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="contract-to-hire"
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="contract-to-hire" className="ml-3 text-sm text-gray-700">
              Open to contract-to-hire
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="consultations"
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="consultations" className="ml-3 text-sm text-gray-700">
              Offers consultations
            </label>
          </div>
        </div>
      </FilterSection>

      {/* Other Sections */}
      <FilterSection
        title="Category"
        isOpen={openSections.category}
        onToggle={() => toggleSection('category')}
      >
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-2 py-1 rounded-md text-sm ${
                selectedCategory === category
                  ? 'text-green-700 bg-green-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Hourly rate"
        isOpen={openSections.hourlyRate}
        onToggle={() => toggleSection('hourlyRate')}
      >
        <div className="space-y-2">
          {hourlyRates.map(rate => (
            <RadioOption
              key={rate.value}
              id={`rate-${rate.value}`}
              name="hourlyRate"
              value={rate.value}
              label={rate.label}
              checked={hourlyRate === rate.value}
              onChange={setHourlyRate}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Job success"
        isOpen={openSections.jobSuccess}
        onToggle={() => toggleSection('jobSuccess')}
      >
        <div className="space-y-2">
          {jobSuccess.map(success => (
            <RadioOption
              key={success.value}
              id={`success-${success.value}`}
              name="jobSuccess"
              value={success.value}
              label={success.label}
              checked={selectedJobSuccess === success.value}
              onChange={setSelectedJobSuccess}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

export default Sidebar;
