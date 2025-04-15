
import { useState } from 'react'
import Sidebar from "./SideBar"
import ProjectTracker from "./ProjectTracker"
import Shortlist from "./ShortList"
import PaymentHistory from "./PaymentHistory"
import AIRecommendations from "./AiRecommendations"
import ProgressAnalytics from "./ProgressAnalytics"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto mt-16">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === 'projects' && <ProjectTracker />}
          {activeTab === 'shortlist' && <Shortlist />}
          {activeTab === 'payments' && <PaymentHistory />}

        </main>
      </div>
    </div>
  )
}