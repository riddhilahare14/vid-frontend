import ProfileHeader from "./profile-header"
import SkillsSection from "./skills-section"
import WorkHistorySection from "./work-history-section"
import PortfolioSection from "./Portfolio-section"
import StatsSidebar from "./stats-sidebar"
import ReviewsSection from "./reviews-section"
import PricingTiers from "./stats-sidebar"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProfileHeader />
            <SkillsSection />
            <WorkHistorySection />
            <PortfolioSection />
            <ReviewsSection />
          </div>
          <div className="lg:col-span-1">
            <PricingTiers />
          </div>
        </div>
      </div>
    </div>
  )
}

