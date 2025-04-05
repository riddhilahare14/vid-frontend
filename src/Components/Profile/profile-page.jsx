import { useState } from "react"
import {
  Camera,
  Check,
  ChevronDown,
  Clock,
  Heart,
  ImageIcon,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  Trophy,
  User,
  Briefcase,
  Zap,
} from "lucide-react"
import "./animation.css"

// Helper function to replace the cn utility
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("portfolio")
  const [portfolioItems, setPortfolioItems] = useState([
    { id: 1, title: "Summer Collection", category: "Fashion Photography", likes: 243 },
    { id: 2, title: "Product Launch", category: "Commercial Video", likes: 187 },
    { id: 3, title: "Brand Story", category: "Storytelling", likes: 329 },
    { id: 4, title: "Tech Gadgets", category: "Product Photography", likes: 156 },
    { id: 5, title: "Lifestyle Series", category: "Social Media", likes: 412 },
    { id: 6, title: "Food Photography", category: "E-commerce", likes: 275 },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-8">
      {/* Profile Header */}
      <section className="pt-8 pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="/placeholder.svg?height=160&width=160"
                  alt="Sarah Parker"
                  width={160}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Sarah Parker</h1>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      New York, USA
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Responds in 2 hours
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <div className="text-2xl font-bold">
                    $85.00 <span className="text-sm font-normal text-gray-500">per hour</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        isFollowing
                          ? "bg-white border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                      }`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                    <button className="px-4 py-2 rounded-md text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </button>
                    <button className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 flex items-center">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                    <button className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300">
                      View Pricing
                    </button>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                  <Trophy className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  Top Rated
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                  <Zap className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                  Fast Responder
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                  <Star className="w-3.5 h-3.5 mr-1.5 text-purple-500" />
                  Expert
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                  <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                  Rising Talent
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3">
                <div className="text-center">
                  <div className="text-xl font-bold">245</div>
                  <div className="text-sm text-gray-500">Total Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">1,840</div>
                  <div className="text-sm text-gray-500">Hours Worked</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">4.9/5</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation - Unique Design */}
      <div className="w-full mt-8">
        <div className="bg-white sticky top-0 z-40 shadow-md rounded-xl mx-4 md:mx-auto max-w-5xl overflow-hidden">
          <div className="flex overflow-x-auto relative">
            {[
              { value: "portfolio", label: "Portfolio", icon: <ImageIcon className="w-5 h-5" /> },
              { value: "reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
              { value: "about", label: "About", icon: <User className="w-5 h-5" /> },
              { value: "equipment", label: "Equipment", icon: <Camera className="w-5 h-5" /> },
              { value: "gigs", label: "Gigs", icon: <Briefcase className="w-5 h-5" /> },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 py-4 px-6 flex flex-col items-center justify-center transition-all duration-300 ${
                  activeTab === tab.value
                    ? "bg-gradient-to-b from-purple-50 to-white text-purple-700"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <div className={`p-2 rounded-full mb-1 ${activeTab === tab.value ? "bg-purple-100" : "bg-gray-100"}`}>
                  {tab.icon}
                </div>
                <span className="text-sm font-medium capitalize">{tab.label}</span>
                {activeTab === tab.value && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 mx-auto"
                    style={{
                      width: "40%",
                      marginLeft: "30%",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Portfolio Tab */}
          {activeTab === "portfolio" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Portfolio</h2>
                <div className="flex items-center gap-2">
                  <select className="px-3 py-1.5 rounded-md border text-sm">
                    <option>All Categories</option>
                    <option>Photography</option>
                    <option>Videography</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioItems.map((item) => (
                  <PortfolioItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    Reviews
                    <span className="text-sm font-normal text-gray-500">(1,370)</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <select className="px-3 py-1.5 rounded-md border text-sm bg-white hover:border-purple-300 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent">
                      <option>Most relevant</option>
                      <option>Most recent</option>
                      <option>Highest rated</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Exceptional Product Photography",
                      date: "Aug 15, 2023 - Sep 1, 2023",
                      client: "TechGear Inc.",
                      service: "Product Photography Session",
                      content:
                        "Sarah delivered outstanding product photos that exceeded our expectations. Her attention to detail and creativity truly brought our products to life. Very professional and responsive throughout the project.",
                    },
                    {
                      title: "Brilliant Commercial Video",
                      date: "Jul 1, 2023 - Jul 15, 2023",
                      client: "Fashion Forward",
                      service: "Commercial Video Production",
                      content:
                        "Sarah created an amazing commercial for our brand. The quality and creativity were outstanding. She captured the essence of our brand perfectly and the final product was beyond our expectations. Would definitely work with her again.",
                    },
                    {
                      title: "Professional and Creative",
                      date: "Jun 10, 2023 - Jun 20, 2023",
                      client: "GreenEats Co.",
                      service: "Brand Storytelling Campaign",
                      content:
                        "Working with Sarah was a pleasure. She brought fresh ideas to our project and executed them flawlessly. Her skills in both photography and videography are top-notch. The final results were exactly what we needed for our marketing campaign.",
                    },
                  ].map((review, index) => (
                    <ReviewCard key={index} review={review} index={index} />
                  ))}

                  <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium group hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-all duration-300 flex items-center justify-center">
                    Show More Reviews
                    <span className="ml-2 group-hover:translate-y-1 transition-transform duration-300">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-1/3 bg-white rounded-xl p-6 shadow-sm h-fit animate-scale-in opacity-0">
                <h3 className="font-semibold text-lg mb-4">Rating Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: "5 Stars", value: 92 },
                    { label: "4 Stars", value: 6 },
                    { label: "3 Stars", value: 2 },
                    { label: "2 Stars", value: 0 },
                    { label: "1 Star", value: 0 },
                  ].map((rating, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-16 text-sm">{rating.label}</div>
                      <div className="relative flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000 ease-out"
                          style={{
                            width: `${rating.value}%`,
                            animation: `progressAnimation 1s ease-out ${index * 0.2}s forwards`,
                          }}
                        />
                      </div>
                      <div className="w-8 text-sm text-right">{rating.value}%</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Overall Rating</div>
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-1">4.9</span>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <Star className="w-4 h-4 fill-amber-400/50 text-amber-400" />
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Based on 1,370 reviews</div>
                </div>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-base leading-relaxed">
                    Professional photographer and videographer with over 8 years of experience, specializing in product
                    photography, commercial videos, and brand storytelling. Creating compelling visual content for
                    e-commerce and digital marketing. My work has been featured in various digital marketing campaigns
                    and I've collaborated with brands across multiple industries.
                  </p>
                  <p className="text-base leading-relaxed mt-4">
                    I believe that every product and brand has a unique story to tell, and my goal is to capture that
                    story through stunning visuals that resonate with your target audience. Whether you need product
                    photography that showcases the finest details or video content that engages and converts, I bring
                    creativity, technical expertise, and a keen eye for aesthetics to every project.
                  </p>
                  <p className="text-base leading-relaxed mt-4">
                    My approach combines technical precision with artistic vision, ensuring that each image and video
                    not only looks beautiful but also serves its strategic purpose in your marketing efforts. I work
                    closely with clients to understand their brand identity and marketing objectives, delivering visual
                    content that aligns perfectly with their vision and goals.
                  </p>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">Services Offered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Product Photography",
                      description: "High-quality product images for e-commerce and marketing",
                    },
                    {
                      title: "Commercial Videography",
                      description: "Engaging video content for brand and product promotion",
                    },
                    {
                      title: "Brand Storytelling",
                      description: "Visual narratives that communicate your brand's unique story",
                    },
                    {
                      title: "Social Media Content",
                      description: "Eye-catching visuals optimized for social platforms",
                    },
                  ].map((service, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                      <h3 className="font-medium text-lg">{service.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/3 space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Availability</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Weekly Availability</span>
                      <span className="font-medium">30+ hrs/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Usually works</span>
                      <span className="font-medium">9 AM - 5 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Local time</span>
                      <span className="font-medium">EDT UTC-4</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Languages</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>English</span>
                        <span className="text-sm text-gray-500">Native</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Spanish</span>
                        <span className="text-sm text-gray-500">Fluent</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>French</span>
                        <span className="text-sm text-gray-500">Conversational</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Certifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center p-1 bg-green-100 text-green-800 rounded-full">
                        <Check className="w-3 h-3" />
                      </span>
                      <div>
                        <div className="font-medium">Adobe Certified Expert</div>
                        <div className="text-sm text-gray-500">Adobe • 2023</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center p-1 bg-green-100 text-green-800 rounded-full">
                        <Check className="w-3 h-3" />
                      </span>
                      <div>
                        <div className="font-medium">Final Cut Pro Master</div>
                        <div className="text-sm text-gray-500">Apple • 2022</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Equipment Tab */}
          {activeTab === "equipment" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Equipment</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-purple-600" />
                    Cameras
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {["Sony A7III", "Canon EOS R5", "DJI Pocket 2"].map((camera, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Camera className="w-5 h-5 text-purple-600" />
                        </div>
                        <span>{camera}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Lenses</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {["24-70mm f/2.8", "70-200mm f/2.8", "50mm f/1.4"].map((lens, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-blue-600">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span>{lens}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Lighting</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {["Godox SL-60W", "Aputure 120d II", "Softboxes"].map((light, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-amber-600">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                        </div>
                        <span>{light}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Project Preferences</h3>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Project Size</div>
                        <div className="font-medium">Medium to Large</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Duration</div>
                        <div className="font-medium">1 week - 3 months</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Availability</div>
                        <div className="font-medium">Remote / On-site</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gigs Tab */}
          {activeTab === "gigs" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Gigs</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Product Photography Package",
                    price: "$250",
                    description: "Professional product photography for e-commerce with 10 high-quality images",
                    deliveryTime: "3 days",
                  },
                  {
                    title: "Brand Storytelling Video",
                    price: "$750",
                    description: "60-90 second brand story video perfect for your website and social media",
                    deliveryTime: "7 days",
                  },
                  {
                    title: "Social Media Content Bundle",
                    price: "$500",
                    description: "20 custom images and 5 short videos optimized for Instagram and TikTok",
                    deliveryTime: "5 days",
                  },
                ].map((gig, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-r from-purple-100 to-blue-100">
                      <img
                        src={`/placeholder.svg?height=200&width=400`}
                        alt={gig.title}
                        width={400}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg">{gig.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xl font-bold text-purple-600">{gig.price}</div>
                        <div className="text-sm text-gray-500">Starting price</div>
                      </div>
                      <p className="mt-3 text-sm text-gray-500">{gig.description}</p>
                      <div className="flex items-center gap-1 mt-4 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>Delivery in {gig.deliveryTime}</span>
                      </div>
                      <button className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-md text-sm font-medium transition-all duration-300">
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Portfolio Item Component
function PortfolioItem({ item }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-500">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={`/placeholder.svg?height=400&width=400`}
          alt={item.title}
          width={400}
          height={400}
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {/* Content that slides up on hover */}
          <h3 className="font-medium text-white text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {item.title}
          </h3>
          <p className="text-sm text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {item.category}
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
            <div className="flex items-center gap-1 text-white/90">
              <Heart className={cn("w-4 h-4", liked ? "fill-red-500 text-red-500" : "fill-white text-white")} />
              <span className="text-sm">{likeCount}</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-white hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>

              <button className="text-white hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>

              <button
                className={cn(
                  "text-white hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors",
                  liked && "text-red-500 hover:text-red-500",
                )}
                onClick={handleLike}
              >
                <Heart className={cn("w-4 h-4", liked && "fill-red-500")} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Review Card Component
function ReviewCard({ review, index }) {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-slide-up opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{review.title}</h3>
          <p className="text-sm text-gray-500">{review.date}</p>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="mt-3">{review.content}</p>
      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div className="text-sm font-medium">{review.client}</div>
        <div className="text-sm text-gray-500">{review.service}</div>
      </div>
    </div>
  )
}

