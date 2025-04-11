"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Clock, ChevronDown, Heart, Search, ChevronRight, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import axiosInstance from "../../utils/axios"

// Video type data with professional icons
const videoTypes = [
  { id: "ads", name: "Ads & social", icon: "ads" },
  { id: "youtube", name: "YouTube videos", icon: "youtube" },
  { id: "corporate", name: "Corporate videos", icon: "corporate" },
  { id: "gaming", name: "Gaming videos", icon: "gaming" },
  { id: "family", name: "Family & travel", icon: "family" },
  { id: "music", name: "Music videos", icon: "music" },
]

export default function PremiumGigSectionLight() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedVideoType, setSelectedVideoType] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [gigs, setGigs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState({
    serviceOptions: false,
    sellerDetails: false,
    budget: false,
    deliveryTime: false,
  })
  const [sortBy, setSortBy] = useState("Best selling")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sectionRef = useRef(null)
  const videoTypesRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      updateScrollLimits()
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update scroll limits for video types
  const updateScrollLimits = () => {
    if (videoTypesRef.current) {
      const container = videoTypesRef.current
      setMaxScroll(container.scrollWidth - container.clientWidth)
    }
  }

  // Handle horizontal scrolling for video types
  const handleScroll = (direction) => {
    if (videoTypesRef.current) {
      const container = videoTypesRef.current
      const scrollAmount = container.clientWidth * 0.8

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }

      // Update scroll position after scrolling
      setTimeout(() => {
        setScrollPosition(container.scrollLeft)
      }, 300)
    }
  }

  // Update scroll position when scrolling manually
  useEffect(() => {
    const container = videoTypesRef.current
    if (!container) return

    const handleScrollUpdate = () => {
      setScrollPosition(container.scrollLeft)
    }

    container.addEventListener("scroll", handleScrollUpdate)
    updateScrollLimits()

    return () => container.removeEventListener("scroll", handleScrollUpdate)
  }, [videoTypesRef.current])

  // Fetch gigs from backend using axiosInstance
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch gigs from /api/v1/gig/all
        const gigResponse = await axiosInstance.get("/gig/all")
        const fetchedGigs = gigResponse.data.data.gigs // Assuming response structure: { data: { gigs: [...] } }

        // Map backend data to frontend structure
        const formattedGigs = fetchedGigs.map((gig) => ({
          id: gig.id,
          title: gig.title,
          seller: gig.seller?.name || "Freelancer",
          sellerBadge: gig.seller?.badge || "",
          level: gig.seller?.level || 1,
          image:
            gig.sampleMedia.find((media) => media.mediaType === "thumbnail")?.mediaUrl ||
            "/placeholder.svg?height=400&width=600",
          category: gig.category || "uncategorized",
          rating: gig.rating || 4.9, // Placeholder; add rating field to backend if needed
          reviews: gig.reviews || Math.floor(Math.random() * 1000), // Placeholder; add reviews field to backend if needed
          price: gig.pricing[0]?.price || 1999, // Assuming pricing is an array of objects with a price field
          deliveryTime: `${gig.deliveryTime || 1} ${gig.deliveryTime === 1 ? "minute" : "minutes"}`,
          isFavorite: false,
          offersConsultation: Math.random() > 0.7, // Random for demo purposes
        }))
        setGigs(formattedGigs)

        // Derive categories from gigs
        const uniqueCategories = ["all", ...new Set(formattedGigs.map((gig) => gig.category))]
        const categoryList = uniqueCategories.map((cat) => ({
          id: cat,
          name: cat === "all" ? "All Gigs" : cat.charAt(0).toUpperCase() + cat.slice(1),
        }))
        setCategories(categoryList)
      } catch (error) {
        console.error("Error fetching gig data:", error.response?.data || error.message)

        // Fallback to mock data if API fails
        const mockGigs = [
          {
            id: 1,
            title: "I will edit ugc video ads that print money",
            seller: "Marko",
            sellerBadge: "Fiverr's Choice",
            rating: 4.9,
            reviews: 59,
            price: 6770,
            deliveryTime: "1 minute",
            image: "/placeholder.svg?height=400&width=600",
            category: "ads",
            isFavorite: false,
            level: 1,
          },
          {
            id: 2,
            title: "I will do professional video editing with in 24 hours",
            seller: "Waleed",
            sellerBadge: "",
            rating: 4.9,
            reviews: 1000,
            price: 903,
            deliveryTime: "1 minute",
            image: "/placeholder.svg?height=400&width=600",
            category: "youtube",
            isFavorite: false,
            level: 1,
          },
          {
            id: 3,
            title: "I will do anything in adobe after effects",
            seller: "Stella R",
            sellerBadge: "",
            rating: 4.9,
            reviews: 15,
            price: 903,
            deliveryTime: "1 minute",
            image: "/placeholder.svg?height=400&width=600",
            category: "corporate",
            isFavorite: false,
            level: 1,
          },
          {
            id: 4,
            title: "I will do christian video editing of church sermon and bible videos",
            seller: "Henry",
            sellerBadge: "",
            rating: 5.0,
            reviews: 562,
            price: 452,
            deliveryTime: "60 minutes",
            image: "/placeholder.svg?height=400&width=600",
            category: "youtube",
            isFavorite: false,
            level: 2,
            offersConsultation: true,
          },
          {
            id: 5,
            title: "I will edit a stunning cinematic video",
            seller: "Chandler Henry",
            sellerBadge: "Vetted Pro",
            rating: 5.0,
            reviews: 179,
            price: 9026,
            deliveryTime: "1 minute",
            image: "/placeholder.svg?height=400&width=600",
            category: "ads",
            isFavorite: false,
            level: 2,
            offersConsultation: true,
          },
          {
            id: 6,
            title: "I will quickly edit your video for tiktok, short, reel, and more",
            seller: "Julius",
            sellerBadge: "",
            rating: 5.0,
            reviews: 54,
            price: 452,
            deliveryTime: "1 minute",
            image: "/placeholder.svg?height=400&width=600",
            category: "youtube",
            isFavorite: false,
            level: 2,
          },
          {
            id: 7,
            title: "I will edit engaging event highlights and recap videos",
            seller: "Asadullah",
            sellerBadge: "",
            rating: 4.9,
            reviews: 654,
            price: 3611,
            deliveryTime: "1 minute",
            image: "/placeholder.svg?height=400&width=600",
            category: "corporate",
            isFavorite: false,
            level: 2,
          },
          {
            id: 8,
            title: "I will be your professional video editor",
            seller: "Brandon",
            sellerBadge: "",
            rating: 5.0,
            reviews: 953,
            price: 2708,
            deliveryTime: "1 minute",
            image: "/placeholder.svg?height=400&width=600",
            category: "gaming",
            isFavorite: false,
            level: 2,
          },
        ]
        setGigs(mockGigs)

        // Create categories from mock data
        const uniqueCategories = ["all", ...new Set(mockGigs.map((gig) => gig.category))]
        const categoryList = uniqueCategories.map((cat) => ({
          id: cat,
          name: cat === "all" ? "All Gigs" : cat.charAt(0).toUpperCase() + cat.slice(1),
        }))
        setCategories(categoryList)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter gigs based on selected category and video type
  const filteredGigs = gigs.filter((gig) => {
    if (selectedVideoType && gig.category !== selectedVideoType) return false
    if (selectedCategory !== "all" && gig.category !== selectedCategory) return false
    return true
  })

  // Toggle favorite status for a gig
  const toggleFavorite = (id) => {
    setGigs(gigs.map((gig) => (gig.id === id ? { ...gig, isFavorite: !gig.isFavorite } : gig)))
  }

  // Toggle filter dropdown
  const toggleFilter = (filterName) => {
    setActiveFilters({
      ...activeFilters,
      [filterName]: !activeFilters[filterName],
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* Video Type Selection */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Select video type
          </motion.h2>

          <div className="relative">
            {/* Left scroll button */}
            {scrollPosition > 10 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 border border-gray-200"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
            )}

            {/* Video types container */}
            <div
              ref={videoTypesRef}
              className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide relative"
              onScroll={() => setScrollPosition(videoTypesRef.current?.scrollLeft || 0)}
            >
              {videoTypes.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setSelectedVideoType(type.id === selectedVideoType ? null : type.id)}
                  className={`flex items-center justify-center min-w-[180px] py-4 px-6 rounded-lg border ${
                    selectedVideoType === type.id
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/30"
                  } transition-all duration-200`}
                  whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ y: 0 }}
                >
                  <VideoTypeIcon type={type.icon} isSelected={selectedVideoType === type.id} />
                  <span className="font-medium text-gray-800 ml-3">{type.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Right scroll button */}
            {scrollPosition < maxScroll - 10 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 border border-gray-200"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <motion.div
        className="border-b border-gray-200 bg-white sticky top-0 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Service Options Filter */}
              <FilterDropdown
                label="Service options"
                isOpen={activeFilters.serviceOptions}
                onToggle={() => toggleFilter("serviceOptions")}
                options={[
                  { id: "editing", label: "Video editing" },
                  { id: "animation", label: "Animation" },
                  { id: "motion", label: "Motion graphics" },
                  { id: "color", label: "Color grading" },
                ]}
              />

              {/* Seller Details Filter */}
              <FilterDropdown
                label="Seller details"
                isOpen={activeFilters.sellerDetails}
                onToggle={() => toggleFilter("sellerDetails")}
                options={[
                  { id: "top", label: "Top Rated" },
                  { id: "level2", label: "Level 2" },
                  { id: "level1", label: "Level 1" },
                  { id: "new", label: "New Seller" },
                ]}
              />

              {/* Budget Filter */}
              <FilterDropdown
                label="Budget"
                isOpen={activeFilters.budget}
                onToggle={() => toggleFilter("budget")}
                type="range"
              />

              {/* Delivery Time Filter */}
              <FilterDropdown
                label="Delivery time"
                isOpen={activeFilters.deliveryTime}
                onToggle={() => toggleFilter("deliveryTime")}
                options={[
                  { id: "express", label: "Express 24H" },
                  { id: "3days", label: "Up to 3 days" },
                  { id: "7days", label: "Up to 7 days" },
                  { id: "anytime", label: "Anytime" },
                ]}
                type="radio"
              />
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500"
                placeholder="Search gigs..."
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-6">
        {/* Results Header */}
        <motion.div
          className="flex flex-wrap items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-gray-600">
            <span className="font-semibold">64,000+</span> results · Showing prices for:{" "}
            <button className="font-semibold text-gray-800 hover:text-purple-600 transition-colors inline-flex items-center">
              1 minute <ChevronDown className="inline-block w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-gray-700 font-medium bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-purple-300 transition-colors"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              Sort by: <span className="font-semibold">{sortBy}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-200 overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {["Best selling", "Newest", "Best rating", "Price: Low to High", "Price: High to Low"].map(
                    (option) => (
                      <motion.button
                        key={option}
                        className={`block w-full text-left px-4 py-3 text-sm ${sortBy === option ? "bg-purple-50 text-purple-700" : "text-gray-700 hover:bg-gray-50"}`}
                        onClick={() => {
                          setSortBy(option)
                          setIsSortOpen(false)
                        }}
                        whileHover={{ backgroundColor: sortBy === option ? "#f3e8ff" : "#f9fafb" }}
                      >
                        {option}
                      </motion.button>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Gigs Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredGigs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No gigs found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("all")
                setSelectedVideoType(null)
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredGigs.map((gig) => (
              <motion.div
                key={gig.id}
                variants={itemVariants}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                  borderColor: "#e9d5ff",
                  transition: { duration: 0.2 },
                }}
              >
                {/* Image container with play button overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={gig.image || "/placeholder.svg"}
                    alt={gig.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                      }}
                    >
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                    </motion.div>
                  </div>

                  {/* Favorite button */}
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(gig.id)
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
                    aria-label={gig.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${gig.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      style={{
                        filter: gig.isFavorite ? "drop-shadow(0 0 1px rgba(239, 68, 68, 0.5))" : "none",
                      }}
                    />
                  </motion.button>

                  {/* Pagination dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`}></div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Seller info */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                      {/* Seller avatar placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{gig.seller}</span>
                    {gig.sellerBadge && (
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-sm">
                        {gig.sellerBadge}
                      </span>
                    )}
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-sm ml-auto">
                      Level {gig.level}
                      {gig.level > 1 && (
                        <span className="inline-flex ml-0.5">
                          {[...Array(gig.level)].map((_, i) => (
                            <span key={i} className="w-1 h-1 bg-gray-500 rounded-full mx-0.5"></span>
                          ))}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2 min-h-[48px] group-hover:text-purple-700 transition-colors">
                    {gig.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-sm text-gray-800">{gig.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({gig.reviews})</span>
                  </div>

                  {/* Price and delivery */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{gig.deliveryTime}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-500">From</div>
                      <div className="font-bold text-gray-900">₹{gig.price.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Video consultation badge */}
                  {gig.offersConsultation && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 p-1.5 rounded">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15 10L19.5528 7.72361C19.8343 7.58281 20 7.30339 20 7V5.5C20 4.67157 19.3284 4 18.5 4H5.5C4.67157 4 4 4.67157 4 5.5V16.5C4 17.3284 4.67157 18 5.5 18H18.5C19.3284 18 20 17.3284 20 16.5V15C20 14.6966 19.8343 14.4172 19.5528 14.2764L15 12V10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Offers video consultations</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* CSS for scrollbar hiding and other utilities */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to {opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  )
}

// Custom component for video type icons
function VideoTypeIcon({ type, isSelected }) {
  const iconColor = isSelected ? "#7e22ce" : "#6b7280"

  // SVG icons for each video type
  const icons = {
    ads: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 8.99998V6.99998C16 5.89541 15.1046 4.99998 14 4.99998H5C3.89543 4.99998 3 5.89541 3 6.99998V17C3 18.1046 3.89543 19 5 19H14C15.1046 19 16 18.1046 16 17V15"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 12H8M19 12L16 9M19 12L16 15"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    youtube: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 12L10.5 14V10L14 12Z"
          fill={iconColor}
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.8109 5.08645 5.23656 5.04613 8.08651 4.96576C9.43077 4.92916 10.8239 4.89999 12 4.89999C13.1761 4.89999 14.5692 4.92916 15.9135 4.96576C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9135 19.0341C14.5692 19.0707 13.1761 19.0999 12 19.0999C10.8239 19.0999 9.43077 19.0707 8.08651 19.0341C5.23656 18.9537 3.8109 18.9134 2.90549 17.9819C2 17.0505 2 15.6028 2 12.7075Z"
          stroke={iconColor}
          strokeWidth="1.5"
        />
      </svg>
    ),
    corporate: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 9.01L7.01 8.99889"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 9.01L11.01 8.99889"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 13.01L7.01 12.9989"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 13.01L11.01 12.9989"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 17.01L7.01 16.9989"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 17.01L11.01 16.9989"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 21H3.6C3.26863 21 3 20.7314 3 20.4V5.6C3 5.26863 3.26863 5 3.6 5H20.4C20.7314 5 21 5.26863 21 5.6V14"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17.5 17.5L19 19L22 16"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    gaming: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 11H10" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9L8 13" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12H15.01" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 10H18.01" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M17.32 5H6.68C5.69028 5 4.91102 5.83873 4.99274 6.82584L5.91894 16.8258C6.01352 17.9652 6.97584 18.84 8.12 18.84H15.88C17.0242 18.84 17.9865 17.9652 18.0811 16.8258L19.0073 6.82584C19.089 5.83873 18.3097 5 17.32 5Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    family: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 15L18 14C17.5 13.5 16.5 13 16 13C15.5 13 14.5 13.5 14 14L13 15"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 15L10 14C9.5 13.5 8.5 13 8 13C7.5 13 6.5 13.5 6 14L5 15"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 13V19" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13V19" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 10V16" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16L14 19" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16L10 19" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    music: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 18V6C9 4.34315 10.3431 3 12 3H16.5C17.8807 3 19 4.11929 19 5.5C19 6.88071 17.8807 8 16.5 8H12"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 18C7.65685 18 9 16.6569 9 15C9 13.3431 7.65685 12 6 12C4.34315 12 3 13.3431 3 15C3 16.6569 4.34315 18 6 18Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 18C18.6569 18 20 16.6569 20 15C20 13.3431 18.6569 12 17 12C15.3431 12 14 13.3431 14 15C14 16.6569 15.3431 18 17 18Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M14 15V6" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  }

  return icons[type] || null
}

// Filter dropdown component
function FilterDropdown({ label, isOpen, onToggle, options = [], type = "checkbox" }) {
  return (
    <div className="relative">
      <motion.button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
          isOpen
            ? "border-purple-500 bg-purple-50 text-purple-700"
            : "border-gray-200 text-gray-700 hover:border-gray-300"
        } transition-all duration-200`}
        whileHover={{ y: -1, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)" }}
        whileTap={{ y: 0 }}
      >
        <span className="font-medium">{label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-20 border border-gray-200 p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">{label}</h3>

              {type === "range" ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min</span>
                    <span className="text-gray-600">Max</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="₹"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="₹"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {options.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type={type}
                        name={type === "radio" ? label.toLowerCase().replace(/\s+/g, "-") : undefined}
                        className={`${type === "checkbox" ? "rounded" : "rounded-full"} border-gray-300 text-purple-600 focus:ring-purple-500`}
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <motion.button
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
                <motion.button
                  className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                  whileHover={{ scale: 1.05, backgroundColor: "#7e22ce" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
