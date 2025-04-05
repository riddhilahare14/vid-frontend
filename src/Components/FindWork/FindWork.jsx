import { useState } from 'react'
import { JobCard } from "./job-card"
import { JobFilters } from "./job-filters"
import { JobModal } from "./job-modal"
import { EmptySavedJobs } from "./empty-saved-jobs"


const MOCK_JOBS = [
    {
      id: '1',
      title: 'Wedding Highlight Video Editor Needed',
      description:
        'Looking for an experienced video editor to create a cinematic 5-minute wedding highlight video. Must have experience with emotional storytelling and working with RAW footage.',
      budget: {
        type: 'fixed' ,
        amount: '$500-750',
        duration: '1 week',
      },
      postedTime: '5 minutes ago',
      skills: ['Wedding Videography', 'Adobe Premiere Pro', 'Color Grading', 'Sound Design'],
      clientInfo: {
        verified: true,
        spent: '10',
        rating: 4.9,
      },
      location: 'United States',
      proposals: 3,
      thumbnail: '/placeholder.svg?height=150&width=250',
      experienceLevel: 'Expert',
    },
    {
      id: '2',
      title: 'YouTube Content Editor - Gaming Channel',
      description:
        'Seeking a creative video editor for our gaming YouTube channel. Need someone who can create engaging, fast-paced gaming montages with effects and smooth transitions.',
      budget: {
        type: 'hourly' ,
        amount: '$25-35',
        duration: 'Long term',
      },
      postedTime: '1 hour ago',
      skills: ['Video Editing', 'After Effects', 'Gaming Content', 'YouTube SEO'],
      clientInfo: {
        verified: true,
        spent: '25',
        rating: 4.8,
      },
      location: 'Remote',
      proposals: 8,
      thumbnail: '/placeholder.svg?height=150&width=250',
      experienceLevel: 'Intermediate',
    },
  ]
  
  const MOST_RECENT_JOBS = [
    {
      id: '3',
      title: 'Short Film Post-Production Editor',
      description:
        'Looking for a skilled editor for a 15-minute short film. Need expertise in narrative storytelling, color grading, and sound mixing.',
      budget: {
        type: 'fixed' ,
        amount: '$1,500-2,000',
        duration: '2 weeks',
      },
      postedTime: '2 minutes ago',
      skills: ['Film Editing', 'DaVinci Resolve', 'Sound Design', 'Color Grading'],
      clientInfo: {
        verified: true,
        spent: '30',
        rating: 4.9,
      },
      location: 'United Kingdom',
      proposals: 1,
      thumbnail: '/placeholder.svg?height=150&width=250',
      experienceLevel: 'Expert',
    },
    {
      id: '4',
      title: 'Social Media Video Content Creator',
      description:
        'Need a video editor for daily social media content. Must be familiar with current trends and able to create engaging short-form videos.',
      budget: {
        type: 'hourly' ,
        amount: '$20-30',
        duration: 'Ongoing',
      },
      postedTime: '15 minutes ago',
      skills: ['Social Media', 'TikTok', 'Instagram Reels', 'Motion Graphics'],
      clientInfo: {
        verified: true,
        spent: '15',
        rating: 4.7,
      },
      location: 'Remote',
      proposals: 4,
      thumbnail: '/placeholder.svg?height=150&width=250',
      experienceLevel: 'Intermediate',
    },
  ]
  
  export default function SearchAndBrowsePage() {
    const [selectedJob, setSelectedJob] = useState(null)
    const [activeTab, setActiveTab] = useState('best-matches')
    const [savedJobs, setSavedJobs] = useState(new Set())
  
    const handleSaveToggle = (jobId) => {
      setSavedJobs((prev) => {
        const newSaved = new Set(prev)
        if (newSaved.has(jobId)) {
          newSaved.delete(jobId)
        } else {
          newSaved.add(jobId)
        }
        return newSaved
      })
    }
  
    const getJobsByTab = () => {
      switch (activeTab) {
        case 'most-recent':
          return MOST_RECENT_JOBS
        case 'saved-jobs':
          return [...MOCK_JOBS, ...MOST_RECENT_JOBS].filter((job) => savedJobs.has(job.id))
        default:
          return MOCK_JOBS
      }
    }
  
    const displayJobs = getJobsByTab()
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Find Video Editing Jobs</h1>
            <p className="mt-2 text-gray-600">
              Browse jobs that match your experience to a client's hiring preferences
            </p>
          </div>
  
          <div className="mb-6 flex gap-4 border-b border-gray-200">
            {[
              { id: 'best-matches', label: 'Best Matches' },
              { id: 'most-recent', label: 'Most Recent' },
              { id: 'saved-jobs', label: 'Saved Jobs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id )}
                className={`border-b-2 px-4 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
  
          <div className="flex flex-col gap-6 md:flex-row">
            <JobFilters />
            <div className="flex-1 space-y-6">
              {activeTab === 'saved-jobs' && displayJobs.length === 0 ? (
                <EmptySavedJobs />
              ) : (
                displayJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    isSaved={savedJobs.has(job.id)}
                    onSaveToggle={handleSaveToggle}
                    onClick={() => setSelectedJob(job)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
  
        {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </div>
    )
  }
  
  