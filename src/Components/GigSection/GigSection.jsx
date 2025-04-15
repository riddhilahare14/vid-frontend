"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Clock, ChevronDown, Heart, Search, ChevronRight, ChevronLeft, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Add this import
import axiosInstance from "../../utils/axios";

// Service categories with modern icons
const serviceCategories = [
  { id: "ads", name: "Advertising", icon: "ads" },
  { id: "youtube", name: "YouTube", icon: "youtube" },
  { id: "corporate", name: "Corporate", icon: "corporate" },
  { id: "gaming", name: "Gaming", icon: "gaming" },
  { id: "family", name: "Family", icon: "family" },
  { id: "music", name: "Music", icon: "music" },
];

export default function PremiumMarketplace() {
  const navigate = useNavigate(); // Initialize navigate
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideoType, setSelectedVideoType] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    serviceOptions: false,
    sellerDetails: false,
    budget: false,
    deliveryTime: false,
  });
  const [sortBy, setSortBy] = useState("Best selling");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sectionRef = useRef(null);
  const categoryRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRefs = useRef({});

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateScrollLimits();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSortOpen && !event.target.closest('[data-dropdown="sort"]')) {
        setIsSortOpen(false);
      }

      Object.keys(activeFilters).forEach((key) => {
        if (activeFilters[key] && !event.target.closest(`[data-dropdown="${key}"]`)) {
          setActiveFilters((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSortOpen, activeFilters]);

  // Update scroll limits for categories
  const updateScrollLimits = () => {
    if (categoryRef.current) {
      const container = categoryRef.current;
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  };

  // Handle horizontal scrolling for categories
  const handleScroll = (direction) => {
    if (categoryRef.current) {
      const container = categoryRef.current;
      const scrollAmount = container.clientWidth * 0.8;

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }

      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
      }, 300);
    }
  };

  // Update scroll position when scrolling manually
  useEffect(() => {
    const container = categoryRef.current;
    if (!container) return;

    const handleScrollUpdate = () => {
      setScrollPosition(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScrollUpdate);
    updateScrollLimits();

    return () => container.removeEventListener("scroll", handleScrollUpdate);
  }, [categoryRef.current]);

  // Fetch gigs from backend using axiosInstance
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const gigResponse = await axiosInstance.get("/gig/all");
        const fetchedGigs = gigResponse.data.data.gigs;

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
          rating: gig.rating || 4.9,
          reviews: gig.reviews || Math.floor(Math.random() * 1000),
          price: gig.pricing[0]?.price || 1999,
          deliveryTime: `${gig.deliveryTime || 1} ${gig.deliveryTime === 1 ? "minute" : "minutes"}`,
          isFavorite: false,
          offersConsultation: Math.random() > 0.7,
        }));
        setGigs(formattedGigs);

        const uniqueCategories = ["all", ...new Set(formattedGigs.map((gig) => gig.category))];
        const categoryList = uniqueCategories.map((cat) => ({
          id: cat,
          name: cat === "all" ? "All Services" : cat.charAt(0).toUpperCase() + cat.slice(1),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching gig data:", error.response?.data || error.message);
        // Handle mock data if needed
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter gigs based on selected category, video type, and search query
  const filteredGigs = gigs.filter((gig) => {
    if (selectedVideoType && gig.category !== selectedVideoType) return false;
    if (selectedCategory !== "all" && gig.category !== selectedCategory) return false;
    if (searchQuery && !gig.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Toggle favorite status for a gig
  const toggleFavorite = (id) => {
    setGigs(gigs.map((gig) => (gig.id === id ? { ...gig, isFavorite: !gig.isFavorite } : gig)));
  };

  // Toggle filter dropdown
  const toggleFilter = (filterName) => {
    const newFilters = Object.keys(activeFilters).reduce((acc, key) => {
      acc[key] = key === filterName ? !activeFilters[key] : false;
      return acc;
    }, {});
    setActiveFilters(newFilters);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Main Search Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-slate-500" />
          </div>
          <input
            type="search"
            className="block w-full p-4 pl-12 text-base text-slate-900 border-0 rounded-xl bg-white shadow-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all duration-200"
            placeholder="Search for video editing services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Selection */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <motion.h2
              className="text-xl font-semibold text-slate-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Explore Categories
            </motion.h2>

            {/* Sort Dropdown */}
            <div className="relative" data-dropdown="sort">
              <button
                className="flex items-center gap-2 text-slate-700 font-medium bg-white border border-slate-200 rounded-lg px-3 py-1.5 hover:border-emerald-300 transition-colors"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span className="text-sm">Sort:</span> <span className="font-semibold text-sm">{sortBy}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-slate-200 overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {["Best selling", "Newest", "Best rating", "Price: Low to High", "Price: High to Low"].map(
                      (option) => (
                        <motion.button
                          key={option}
                          className={`block w-full text-left px-4 py-2 text-sm ${sortBy === option ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-50"}`}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          whileHover={{ backgroundColor: sortBy === option ? "#ecfdf5" : "#f8fafc" }}
                        >
                          {option}
                        </motion.button>
                      ),
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative">
            {scrollPosition > 10 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-slate-200"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </motion.button>
            )}

            <div
              ref={categoryRef}
              className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide relative"
              onScroll={() => setScrollPosition(categoryRef.current?.scrollLeft || 0)}
            >
              {serviceCategories.map((type) => (
                <motion.button
                  key={type.id}
                  onClick={() => setSelectedVideoType(type.id === selectedVideoType ? null : type.id)}
                  className={`flex items-center justify-center min-w-[140px] py-2.5 px-4 rounded-lg ${
                    selectedVideoType === type.id
                      ? "bg-emerald-100 text-emerald-700 border-0"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/30"
                  } transition-all duration-200`}
                  whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ y: 0 }}
                >
                  <CategoryIcon type={type.icon} isSelected={selectedVideoType === type.id} />
                  <span className="font-medium text-sm ml-2">{type.name}</span>
                </motion.button>
              ))}
            </div>

            {scrollPosition < maxScroll - 10 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-slate-200"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <motion.div
        className="border-b border-slate-200 bg-white sticky top-0 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center text-slate-500 mr-2">
              <Filter className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

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
              dropdownRef={(el) => (dropdownRefs.current.serviceOptions = el)}
            />

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
              dropdownRef={(el) => (dropdownRefs.current.sellerDetails = el)}
            />

            <FilterDropdown
              label="Budget"
              isOpen={activeFilters.budget}
              onToggle={() => toggleFilter("budget")}
              type="range"
              dropdownRef={(el) => (dropdownRefs.current.budget = el)}
            />

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
              dropdownRef={(el) => (dropdownRefs.current.deliveryTime = el)}
            />
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          className="flex flex-wrap items-center justify-between mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-slate-600">
            <span className="font-semibold">{filteredGigs.length}</span> services found
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredGigs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-xl text-slate-600 mb-4">No services found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedVideoType(null);
                setSearchQuery("");
              }}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredGigs.map((gig) => (
              <motion.div
                key={gig.id}
                variants={itemVariants}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                whileHover={{
                  y: -3,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                  transition: { duration: 0.2 },
                }}
                onClick={() => navigate(`/gig/${gig.id}`)} // Navigate to gig page
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={gig.image || "/placeholder.svg"}
                    alt={gig.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                      }}
                    >
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5"></div>
                    </motion.div>
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent card click
                      toggleFavorite(gig.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
                    aria-label={gig.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-4 h-4 ${gig.isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-600"}`}
                      style={{
                        filter: gig.isFavorite ? "drop-shadow(0 0 1px rgba(239, 68, 68, 0.5))" : "none",
                      }}
                    />
                  </motion.button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 overflow-hidden flex items-center justify-center text-white text-xs font-bold">
                      {gig.seller.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-slate-700">{gig.seller}</span>
                    {gig.sellerBadge && (
                      <span className="text-xs px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-sm">
                        {gig.sellerBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-medium text-slate-800 mb-2 line-clamp-2 min-h-[40px] group-hover:text-emerald-700 transition-colors">
                    {gig.title}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-xs text-slate-800">{gig.rating.toFixed(1)}</span>
                    <span className="text-xs text-slate-500">({gig.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{gig.deliveryTime}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-500">From</div>
                      <div className="font-bold text-slate-900">₹{gig.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

// CategoryIcon and FilterDropdown components remain unchanged
function CategoryIcon({ type, isSelected }) {
  const iconColor = isSelected ? "#059669" : "#475569";

  const icons = {
    ads: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  };

  return icons[type] || null;
}

function FilterDropdown({ label, isOpen, onToggle, options = [], type = "checkbox", dropdownRef }) {
  return (
    <div className="relative" data-dropdown={label.toLowerCase().replace(/\s+/g, "-")} ref={dropdownRef}>
      <motion.button
        onClick={onToggle}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
          isOpen
            ? "bg-emerald-100 text-emerald-700"
            : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
        } transition-all duration-200`}
        whileHover={{ y: -1, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)" }}
        whileTap={{ y: 0 }}
      >
        <span>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-20 border border-slate-200 p-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-slate-800">{label}</h3>

              {type === "range" ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Min</span>
                    <span>Max</span>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="₹"
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="₹"
                      className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {options.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type={type}
                        name={type === "radio" ? label.toLowerCase().replace(/\s+/g, "-") : undefined}
                        className={`${type === "checkbox" ? "rounded" : "rounded-full"} border-slate-300 text-emerald-600 focus:ring-emerald-500`}
                      />
                      <span className="text-sm text-slate-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <motion.button
                  className="px-3 py-1 text-xs text-slate-600 hover:text-slate-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear
                </motion.button>
                <motion.button
                  className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
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
  );
}