import { useState } from "react"
import Sidebar from "./SideBar"
import ProjectTracker from "./ProjectTracker"
import Shortlist from "./ShortList"
import PaymentSection from "./PaymentHistory"
import SettingsSection from "./settings"
import DashboardHeader from "./Dashboard-header"
import OverviewStats from "./Overview-stats"


export default function ClientDashboard() {
  const [activeSection, setActiveSection] = useState("projects")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "projects":
        return <ProjectTracker />
      case "shortlist":
        return <Shortlist />
      case "payments":
        return <PaymentSection />
      case "settings":
        return <SettingsSection />
      default:
        return <ProjectTracker />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
        <DashboardHeader activeSection={activeSection} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="p-6 space-y-6">
          <OverviewStats />
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
