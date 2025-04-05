import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const featuredArticle = {
  title: "The Evolution of Video Editing: From Analog to AI",
  excerpt:
    "Discover how video editing has transformed over the decades and what the future holds with AI-powered tools.",
  date: "January 28, 2024",
  readTime: "8 min read",
  image: "/placeholder.svg?height=600&width=1200",
  category: "Technology",
}

const popularArticles = [
  {
    id: 1,
    title: "Top 10 Video Editing Techniques for Cinematic Effects",
    date: "January 25, 2024",
    image: "/placeholder.svg?height=400&width=600",
    category: "Tutorials",
  },
  {
    id: 2,
    title: "Color Grading Secrets from Hollywood Professionals",
    date: "January 23, 2024",
    image: "/placeholder.svg?height=400&width=600",
    category: "Professional Tips",
  },
  {
    id: 3,
    title: "The Rise of Vertical Video: Adapting to Modern Platforms",
    date: "January 20, 2024",
    image: "/placeholder.svg?height=400&width=600",
    category: "Industry Trends",
  },
]

const latestArticles = [
  {
    id: 1,
    title: "Understanding Video Compression for Different Platforms",
    excerpt:
      "Learn how to optimize your videos for various social media and streaming platforms while maintaining quality.",
    date: "January 18, 2024",
    image: "/placeholder.svg?height=300&width=500",
    category: "Technical Guide",
  },
  {
    id: 2,
    title: "Creating Engaging Video Content for Social Media",
    excerpt: "Master the art of creating scroll-stopping content that captures audience attention.",
    date: "January 15, 2024",
    image: "/placeholder.svg?height=300&width=500",
    category: "Social Media",
  },
  {
    id: 3,
    title: "The Psychology of Video Editing: Emotional Storytelling",
    excerpt: "Explore how editing techniques can influence viewer emotions and enhance storytelling.",
    date: "January 12, 2024",
    image: "/placeholder.svg?height=300&width=500",
    category: "Creative",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Featured Article */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredArticle.image || "/placeholder.svg"}
            alt="Featured article cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              {featuredArticle.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{featuredArticle.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{featuredArticle.excerpt}</p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {featuredArticle.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {featuredArticle.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold mb-8">Popular Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularArticles.map((article) => (
            <motion.article
              key={article.id}
              className="group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-medium mb-3">
                {article.category}
              </span>
              <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2">{article.date}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 gap-12">
          {latestArticles.map((article) => (
            <motion.article
              key={article.id}
              className="group grid md:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-medium mb-4">
                  {article.category}
                </span>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative overflow-hidden rounded-2xl bg-purple-500/10 p-8 md:p-12">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Get the latest video editing tips, tutorials, and industry insights delivered to your inbox.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-50" />
        </div>
      </section>
    </div>
  )
}

