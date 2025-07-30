import { useState } from "react"
import DiscussionBoard from "./discussion-board"
import ShowcaseWall from "./showcase-wall"
import CollabHub from "./collab-hub"
import WeeklyChallenges from "./weekly-challenge"
import VerifiedProCorner from "./verified-pro-corner"
import ClientLounge from "./client-lounge"
import { MessageSquare, Video, Users, Trophy, Crown, Target, Search, Plus, TrendingUp, Eye, Heart, BarChart3, Play } from 'lucide-react'

const quickStats = [
  { label: "Active Discussions", value: "1,247", icon: MessageSquare, trend: "+12%", color: "blue" },
  { label: "Showcases This Week", value: "89", icon: Video, trend: "+8%", color: "purple" },
  { label: "Active Collaborations", value: "156", icon: Users, trend: "+15%", color: "green" },
  { label: "Challenge Entries", value: "234", icon: Trophy, trend: "+22%", color: "orange" },
]

const trendingTopics = [
  { tag: "#premierepro", posts: 45, trend: "hot" },
  { tag: "#colorgrading", posts: 32, trend: "up" },
  { tag: "#motiongraphics", posts: 28, trend: "hot" },
  { tag: "#davinciresolve", posts: 24, trend: "stable" },
  { tag: "#aftereffects", posts: 19, trend: "up" },
]

const featuredShowcases = [
  {
    id: 1,
    title: "Cinematic Travel Reel - Bali Adventure",
    author: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    views: 2847,
    likes: 156,
    comments: 23,
    tags: ["travel", "cinematic", "colorgrading"],
  },
  {
    id: 2,
    title: "Product Launch Video - Tech Startup",
    author: "Sarah Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    thumbnail: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    views: 1923,
    likes: 134,
    comments: 18,
    tags: ["product", "corporate", "motion"],
  },
]

export default function CommunityDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15,23,42) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Vidlancing Community
                </h1>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-full border border-amber-200">
                <Crown className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-sm font-medium">Pro Member</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search community..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Post</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 relative z-10">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "discussions", label: "Discussions", icon: MessageSquare },
              { id: "showcase", label: "Showcase", icon: Video },
              { id: "collab", label: "Collab", icon: Users },
              { id: "challenges", label: "Challenges", icon: Trophy },
              { id: "pro-corner", label: "Pro Corner", icon: Crown },
              { id: "client-lounge", label: "Clients", icon: Target },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap font-medium ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      stat.color === 'blue' ? 'bg-blue-50' :
                      stat.color === 'purple' ? 'bg-purple-50' :
                      stat.color === 'green' ? 'bg-green-50' : 'bg-orange-50'
                    }`}>
                      <stat.icon className={`w-5 h-5 ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'purple' ? 'text-purple-600' :
                        stat.color === 'green' ? 'text-green-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <span className="text-green-600 text-sm font-medium">{stat.trend}</span>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Showcases */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Featured Showcases</h2>
                  </div>
                  <div className="space-y-4">
                    {featuredShowcases.map((showcase) => (
                      <div
                        key={showcase.id}
                        className="group flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={showcase.thumbnail || "/placeholder.svg"}
                            alt={showcase.title}
                            className="w-24 h-16 object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="text-white w-6 h-6" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {showcase.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 mb-2">
                            <img
                              src={showcase.avatar || "/placeholder.svg"}
                              alt={showcase.author}
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-gray-600 text-sm">{showcase.author}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span>{showcase.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{showcase.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{showcase.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
                  </div>
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {topic.tag}
                          </span>
                          <span className="text-gray-600 text-sm">{topic.posts} posts</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          topic.trend === 'hot' ? 'bg-red-500' :
                          topic.trend === 'up' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    {[
                      { icon: MessageSquare, label: "Start Discussion", color: "blue" },
                      { icon: Video, label: "Share Showcase", color: "purple" },
                      { icon: Users, label: "Find Collaborator", color: "green" },
                      { icon: Trophy, label: "Join Challenge", color: "orange" },
                    ].map((action, index) => (
                      <button
                        key={index}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all transform hover:scale-105 ${
                          action.color === 'blue' ? 'bg-blue-50 hover:bg-blue-100 text-blue-700' :
                          action.color === 'purple' ? 'bg-purple-50 hover:bg-purple-100 text-purple-700' :
                          action.color === 'green' ? 'bg-green-50 hover:bg-green-100 text-green-700' :
                          'bg-orange-50 hover:bg-orange-100 text-orange-700'
                        }`}
                      >
                        <action.icon className="w-5 h-5" />
                        <span className="font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "discussions" && <DiscussionBoard />}
        {activeTab === "showcase" && <ShowcaseWall />}
        {activeTab === "collab" && <CollabHub />}
        {activeTab === "challenges" && <WeeklyChallenges />}
        {activeTab === "pro-corner" && <VerifiedProCorner />}
        {activeTab === "client-lounge" && <ClientLounge />}
      </main>
    </div>
  )
}
