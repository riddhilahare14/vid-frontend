import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { ChatSection } from "./chat-section"
import { FilesSection } from "./files-section"
import { TasksSection } from "./tasks-section"
import { FeedbackSection } from "./feedback-section"
import { TimelineSection } from "./timeline-section"
import { SummarySection } from "./summary-section"
import { Tabs } from "./ui/tabs"
import axiosInstance from "../../utils/axios"

// Utility functions
export function formatDistanceToNow(date) {
  const now = new Date()
  const diff = Math.abs(now - new Date(date))
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days === 1 ? "" : "s"} ago`
  if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  return "just now"
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function getStatusClasses(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "in progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "review":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

export function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500"
    case "in progress":
      return "bg-blue-500"
    case "review":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ")
}

export function ClientWorkspace() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [activeJobs, setActiveJobs] = useState([])
  const [completedJobs, setCompletedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeRightTab, setActiveRightTab] = useState("files")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get("/jobs")
        const jobs = response.data.data.jobs || []
        
        // Split jobs into active and completed
        const active = jobs.filter(job => 
          job.status !== "COMPLETED" && 
          job.freelancer // Only include jobs that have an assigned editor
        )
        const completed = jobs.filter(job => job.status === "COMPLETED")
        
        setActiveJobs(active)
        setCompletedJobs(completed)
        
        // Select the first active job by default if available
        if (active.length > 0 && !selectedJob) {
          setSelectedJob(active[0])
        }
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError("Failed to load jobs. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleJobSelect = (job) => {
    setSelectedJob(job)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Sidebar */}
      <Sidebar 
        onSelectJob={handleJobSelect} 
        selectedJobId={selectedJob?.id} 
        activeJobs={activeJobs} 
        completedJobs={completedJobs} 
      />

      {selectedJob ? (
        <>
          {/* Main Chat Section */}
          <main className="flex-1 overflow-auto">
            <div className="container h-full mx-auto py-6 px-4">
              <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedJob.title}</h1>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(selectedJob.status)}`}>
                    {selectedJob.status}
                  </span>
                  <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Posted {formatDistanceToNow(selectedJob.createdAt)}
                  </span>
                </div>
              </header>

              <div className="h-[calc(100%-4rem)]">
                <ChatSection job={selectedJob} />
              </div>
            </div>
          </main>

          {/* Right Panel */}
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <Tabs
              tabs={[
                { id: "files", label: "Files", content: <FilesSection job={selectedJob} /> },
                { id: "tasks", label: "Tasks", content: <TasksSection job={selectedJob} /> },
                { id: "timeline", label: "Timeline", content: <TimelineSection job={selectedJob} /> },
                { id: "feedback", label: "Feedback", content: <FeedbackSection job={selectedJob} /> },
                { id: "summary", label: "Summary", content: <SummarySection job={selectedJob} /> },
              ]}
              activeTab={activeRightTab}
              onChange={setActiveRightTab}
            />
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">No job selected</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select a job from the sidebar to view details</p>
          </div>
        </div>
      )}
    </div>
  )
}
