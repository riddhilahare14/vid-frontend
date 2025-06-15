import { useState } from "react"
import LeftSidebar from "./left-sidebar"
import MainPanel from "./main-panel"
import RightPanel from "./right-panel"
import TaskModal from "./task-modal"
import InvoiceModal from "./invoice-modal"
import { ThemeProvider } from "./theme-provider"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ChatDashboard() {
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [currentProject, setCurrentProject] = useState({
    id: "proj-001",
    name: "Promo Video",
    progress: 60,
    tasks: [
      { id: "task-1", name: "Script Review", status: "Completed", hours: 2, cost: 100, dueDate: "2025-04-02" },
      { id: "task-2", name: "Rough Cut", status: "In Progress", hours: 4, cost: 200, dueDate: "2025-04-05" },
      { id: "task-3", name: "Color Grading", status: "Pending", hours: 3, cost: 150, dueDate: "2025-04-10" },
    ],
    drafts: [
      { id: "draft-1", version: "v1.0", thumbnail: "/placeholder.svg?height=120&width=200", locked: false },
      { id: "draft-2", version: "v1.1", thumbnail: "/placeholder.svg?height=120&width=200", locked: true },
    ],
    milestones: [
      { id: "mile-1", name: "Script Approved", completed: true, icon: "FileCheck" },
      { id: "mile-2", name: "Rough Cut Done", completed: true, icon: "Clapperboard" },
      { id: "mile-3", name: "Final Delivery", completed: false, icon: "Package" },
    ],
    messages: [
      {
        id: "msg-1",
        sender: "system",
        content: "Project brief pinned",
        isPinned: true,
        timestamp: "10:00 AM",
        reactions: [],
      },
      {
        id: "msg-2",
        sender: "client",
        content: "Can we make the intro a bit faster?",
        timestamp: "10:15 AM",
        reactions: [],
        replyTo: null,
      },
      {
        id: "msg-3",
        sender: "you",
        content: "Sure, I'll adjust the pacing and send a new version this afternoon.",
        timestamp: "10:20 AM",
        reactions: [],
        replyTo: "msg-2",
      },
    ],
  })

  const handleNewTask = (task) => {
    setCurrentProject({
      ...currentProject,
      tasks: [...currentProject.tasks, task],
    })
    setShowTaskModal(false)
  }

  const handleGenerateInvoice = () => {
    setShowInvoiceModal(true)
  }

  const handleProjectSelect = (project) => {
    // In a real application, you would fetch project-specific data here
    setCurrentProject({
      ...project,
      tasks: currentProject.tasks, // Keep existing tasks for now
      drafts: currentProject.drafts, // Keep existing drafts for now
      milestones: currentProject.milestones, // Keep existing milestones for now
      messages: currentProject.messages, // Keep existing messages for now
    })
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-900 dark:bg-gray-900 text-gray-800 dark:text-white overflow-hidden transition-colors duration-200">
        <div className={`transition-all duration-300 ease-in-out ${leftPanelCollapsed ? "w-0" : "w-1/5"}`}>
          <LeftSidebar
            currentProject={currentProject}
            onNewTask={() => setShowTaskModal(true)}
            onGenerateInvoice={handleGenerateInvoice}
            isCollapsed={leftPanelCollapsed}
            onProjectSelect={handleProjectSelect}
          />
        </div>

        <button
          onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 dark:bg-gray-800 text-white p-1 rounded-r-md shadow-md hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
        >
          {leftPanelCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out ${
            leftPanelCollapsed && rightPanelCollapsed
              ? "w-full"
              : leftPanelCollapsed || rightPanelCollapsed
                ? "w-4/5"
                : "w-3/5"
          }`}
        >
          <MainPanel currentProject={currentProject} />
        </div>

        <button
          onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 dark:bg-gray-800 text-white p-1 rounded-l-md shadow-md hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors"
        >
          {rightPanelCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        <div className={`transition-all duration-300 ease-in-out ${rightPanelCollapsed ? "w-0" : "w-1/5"}`}>
          <RightPanel
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            isCollapsed={rightPanelCollapsed}
          />
        </div>

        {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} onSave={handleNewTask} />}

        {showInvoiceModal && <InvoiceModal project={currentProject} onClose={() => setShowInvoiceModal(false)} />}
      </div>
    </ThemeProvider>
  )
}

