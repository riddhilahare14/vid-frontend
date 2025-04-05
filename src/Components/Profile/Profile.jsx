import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Share2, Play, ChevronLeft, ChevronRight, Search, CheckCircle, Calendar, Clock, Globe2, Award, Camera, Briefcase, MessageSquare, ChevronDown } from 'lucide-react'
import { BadgeTooltip } from './Badge'
import img1 from "../../assets/img3.jpg"
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [activeBadge, setActiveBadge] = useState(null)

  // Sample data
  const badges = [
    {
      id: '1',
      name: 'Top Rated',
      icon: '🏆',
      color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      description: 'Consistently receives 5-star reviews'
    },
    {
      id: '2',
      name: 'Fast Responder',
      icon: '⚡',
      color: 'bg-gradient-to-r from-blue-400 to-blue-600',
      description: 'Responds to messages within 2 hours'
    },
    {
      id: '3',
      name: 'Expert',
      icon: '🎯',
      color: 'bg-gradient-to-r from-purple-400 to-purple-600',
      description: 'Over 1000 hours in video editing'
    },
    {
      id: '4',
      name: 'Rising Talent',
      icon: '🌟',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      description: 'Growing rapidly in popularity'
    }
  ]

  const equipment = [
    {
      category: 'Cameras',
      items: ['Sony A7III', 'Canon EOS R5', 'DJI Pocket 2']
    },
    {
      category: 'Lenses',
      items: ['24-70mm f/2.8', '70-200mm f/2.8', '50mm f/1.4']
    },
    {
      category: 'Lighting',
      items: ['Godox SL-60W', 'Aputure 120d II', 'Softboxes']
    }
  ]

  const languages = [
    { name: 'English', proficiency: 'Native', level: 100 },
    { name: 'Spanish', proficiency: 'Fluent', level: 90 },
    { name: 'French', proficiency: 'Conversational', level: 70 }
  ]

  const certifications = [
    { name: 'Adobe Certified Expert', issuer: 'Adobe', year: 2023, verified: true },
    { name: 'Final Cut Pro Master', issuer: 'Apple', year: 2022, verified: true }
  ]

  const reviews = [
    {
      id: '1',
      title: 'Exceptional Product Photography',
      rating: 5,
      date: 'Aug 15, 2023 - Sep 1, 2023',
      content: 'Sarah delivered outstanding product photos that exceeded our expectations. Her attention to detail and creativity truly brought our products to life. Very professional and responsive throughout the project.',
      author: 'TechGear Inc.',
      project: 'Product Photography Session'
    },
    {
      id: '2',
      title: 'Brilliant Commercial Video',
      rating: 5,
      date: 'Jul 1, 2023 - Jul 15, 2023',
      content: 'Sarah created an amazing commercial for our brand. The quality and creativity were outstanding. She captured the essence of our brand perfectly and the final product was beyond our expectations. Would definitely work with her again.',
      author: 'Fashion Forward',
      project: 'Commercial Video Production'
    },
    {
      id: '3',
      title: 'Professional and Creative',
      rating: 5,
      date: 'Jun 10, 2023 - Jun 20, 2023',
      content: 'Working with Sarah was a pleasure. She brought fresh ideas to our project and executed them flawlessly. Her skills in both photography and videography are top-notch. The final results were exactly what we needed for our marketing campaign.',
      author: 'GreenEats Co.',
      project: 'Brand Storytelling Campaign'
    },
    {
      id: '4',
      title: 'Excellent Work Ethic',
      rating: 5,
      date: 'May 5, 2023 - May 25, 2023',
      content: 'Sarah\'s work ethic is commendable. She was always punctual, prepared, and professional. Her ability to translate our vision into stunning visuals was impressive. The product shots she delivered have significantly boosted our online sales.',
      author: 'Luxe Watches',
      project: 'E-commerce Product Shoot'
    },
    {
      id: '5',
      title: 'Creative Genius',
      rating: 5,
      date: 'Apr 1, 2023 - Apr 10, 2023',
      content: 'Sarah\'s creativity knows no bounds. She took our simple idea and transformed it into a visually stunning video that has become the cornerstone of our latest advertising campaign. Her technical skills combined with her artistic vision produce truly remarkable results.',
      author: 'Eco Solutions',
      project: 'Corporate Video Production'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header with Avatar */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gray-100" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 relative">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <img
                    src={img1}
                    alt="Sarah Parker"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">Sarah Parker</h1>
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>New York, USA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Responds in 2 hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>98% Response Rate</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="relative"
                      onMouseEnter={() => setActiveBadge(badge)}
                      onMouseLeave={() => setActiveBadge(null)}
                    >
                      <div className={`px-4 py-2 rounded-full text-white flex items-center gap-2 ${badge.color}`}>
                        <span>{badge.icon}</span>
                        <span>{badge.name}</span>
                      </div>
                      <AnimatePresence>
                        {activeBadge?.id === badge.id && (
                          <BadgeTooltip badge={badge} />
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 mt-6 lg:mt-0">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share Profile</span>
              </button>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">$85.00</p>
                <p className="text-gray-500">per hour</p>
              </div>
              <Link to="/pricing">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors shadow-lg hover:shadow-xl">
                View Pricing & Availability
              </button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-100 rounded-xl">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">245</p>
              <p className="text-gray-600">Total Jobs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">1,840</p>
              <p className="text-gray-600">Hours Worked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">98%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">4.9/5</p>
              <p className="text-gray-600">Rating</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600">
                Professional photographer and videographer with over 8 years of experience, 
                specializing in product photography, commercial videos, and brand storytelling. 
                Creating compelling visual content for e-commerce and digital marketing.
                My work has been featured in various digital marketing campaigns and I've 
                collaborated with brands across multiple industries.
              </p>
            </div>

            {/* Portfolio Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Portfolio</h3>
                <div className="flex items-center gap-4">
                  <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                    <option>All Categories</option>
                    <option>Commercial</option>
                    <option>Product</option>
                    <option>Fashion</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActivePortfolioIndex(Math.max(0, activePortfolioIndex - 1))}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActivePortfolioIndex(activePortfolioIndex + 1)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Portfolio items here */}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-500">(1,370)</span>
                  </div>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search reviews"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                    <option>Most relevant</option>
                    <option>Most recent</option>
                    <option>Highest rated</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.title}</h4>
                        <p className="text-gray-500 text-sm">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{review.content}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-900">{review.author}</p>
                      <span className="text-sm text-gray-500">{review.project}</span>
                    </div>
                  </div>
                ))}
                <motion.button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="w-full py-3 text-blue-500 hover:text-blue-600 font-medium flex items-center justify-center gap-2"
                >
                  {showAllReviews ? 'Show Less' : 'Show More Reviews'}
                  <ChevronDown className={`w-5 h-5 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Availability Calendar */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Availability
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weekly Availability</span>
                  <span className="font-medium">30+ hrs/week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Usually works</span>
                  <span className="font-medium">9 AM - 5 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Local time</span>
                  <span className="font-medium">EDT UTC-4</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-blue-500" />
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{lang.name}</span>
                      <span className="text-sm text-gray-500">{lang.proficiency}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-500">{cert.issuer} • {cert.year}</div>
                    </div>
                    {cert.verified && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-500" />
                Equipment
              </h3>
              <div className="space-y-6">
                {equipment.map((eq) => (
                  <div key={eq.category}>
                    <h4 className="font-medium text-gray-700 mb-2">{eq.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {eq.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Preferences */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                Project Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Project Size</span>
                  <span className="font-medium">Medium to Large</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">1 week - 3 months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium">Remote / On-site</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

