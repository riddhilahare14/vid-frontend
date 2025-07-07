"use client"

import { useState } from "react"
import LeftSidebar from "./left-sidebar"
import MainPanel from "./main-panel"
import RightPanel from "./right-panel"
import TaskModal from "./task-modal"
import InvoiceModal from "./invoice-modal"
import { ThemeProvider } from "./theme-provider"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

export default function ChatDashboard() {
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    notes: "",
    timeline: [
      { id: "timeline-1", title: "Project Kickoff", date: "2025-01-01", status: "completed" },
      { id: "timeline-2", title: "First Draft", date: "2025-01-10", status: "completed" },
      { id: "timeline-3", title: "Client Review", date: "2025-01-15", status: "in-progress" },
      { id: "timeline-4", title: "Final Delivery", date: "2025-01-25", status: "pending" },
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
    setCurrentProject({
      ...project,
      tasks: currentProject.tasks,
      drafts: currentProject.drafts,
      milestones: currentProject.milestones,
      messages: currentProject.messages,
      notes: currentProject.notes || "",
      timeline: currentProject.timeline || [],
    })
    setMobileMenuOpen(false)
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 overflow-hidden">
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Left Sidebar */}
        <div
          className={`
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${leftPanelCollapsed ? "lg:w-0" : "w-80 lg:w-80"}
        `}
        >
          <LeftSidebar
            currentProject={currentProject}
            onNewTask={() => setShowTaskModal(true)}
            onGenerateInvoice={handleGenerateInvoice}
            isCollapsed={leftPanelCollapsed}
            onProjectSelect={handleProjectSelect}
            onClose={() => setMobileMenuOpen(false)}
          />
        </div>

        {/* Desktop Toggle Buttons */}
        <button
          onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-2 rounded-r-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 border border-l-0 border-slate-200 dark:border-slate-700"
        >
          {leftPanelCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Main Content */}
        <div
          className={`
          flex-1 flex flex-col lg:flex-row
          transition-all duration-300 ease-in-out
        `}
        >
          {/* Mobile Header */}
          <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-semibold text-lg">{currentProject?.title || currentProject?.name}</h1>
            <div className="w-10" />
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            <MainPanel currentProject={currentProject} setCurrentProject={setCurrentProject} />
          </div>

          {/* Right Panel */}
          <div
            className={`
            hidden lg:block
            transition-all duration-300 ease-in-out
            ${rightPanelCollapsed ? "w-0" : "w-80"}
          `}
          >
            <RightPanel
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              isCollapsed={rightPanelCollapsed}
            />
          </div>
        </div>

        {/* Desktop Right Toggle */}
        <button
          onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-2 rounded-l-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 border border-r-0 border-slate-200 dark:border-slate-700"
        >
          {rightPanelCollapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Modals */}
        {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} onSave={handleNewTask} />}
        {showInvoiceModal && <InvoiceModal project={currentProject} onClose={() => setShowInvoiceModal(false)} />}
      </div>
    </ThemeProvider>
  )
}
