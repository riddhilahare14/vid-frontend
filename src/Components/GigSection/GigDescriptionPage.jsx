import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios"; // Adjust path as needed
import {
  Clock,
  Star,
  Check,
  ChevronRight,
  Share2,
  MessageCircle,
  Play,
  Calendar,
  Shield,
  Award,
  Globe,
  Package,
  Zap,
  Video,
  Music,
  Sparkles,
  Bookmark,
} from "lucide-react";

export default function GigDescriptionPage() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("basic");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/gig/${gigId}`);
        
        // Log response for debugging
        console.log("Backend response:", response.data);

        // Check if response has expected structure
        if (!response.data || !response.data.data) {
          throw new Error("Invalid response structure or gig not found");
        }

        const gigData = response.data.data;

        // Map experience level to user-friendly text
        const experienceMap = {
          ENTRY: "1-3 years",
          INTERMEDIATE: "3-7 years",
          EXPERT: "7+ years",
        };

        // Map backend data to frontend structure
        setGig({
          id: gigData.id || "",
          title: gigData.title || "Untitled Gig",
          description: gigData.description || "No description provided.",
          category: gigData.category || "general",
          rating: gigData.rating || 0,
          reviews: gigData.reviews || 0,
          thumbnail:
            gigData.sampleMedia?.find((media) => media.mediaType === "THUMBNAIL")?.mediaUrl ||
            "/placeholder.svg?height=720&width=1280",
          portfolio:
            gigData.sampleMedia
              ?.filter((media) => media.mediaType !== "THUMBNAIL")
              .map((media, index) => ({
                id: index,
                url: media.mediaUrl || `/placeholder.svg?height=180&width=320&text=Sample ${index + 1}`,
              })) || [],
          seller: {
            name:
              gigData.freelancer?.user?.firstname && gigData.freelancer?.user?.lastname
                ? `${gigData.freelancer.user.firstname} ${gigData.freelancer.user.lastname}`
                : gigData.freelancer?.user?.firstname || "Anonymous",
            avatar: gigData.freelancer?.user?.profilePicture || "/placeholder.svg?height=200&width=200",
            badge: gigData.freelancer?.userBadges?.[0]?.badge?.name || "Standard",
            rating: gigData.freelancer?.rating || 0,
            reviews: gigData.freelancer?.reviewsReceived?.length || 0,
            location: gigData.freelancer?.city || gigData.freelancer?.user?.country || "Unknown",
            experience: experienceMap[gigData.freelancer?.experienceLevel] || "Not specified",
            responseTime: "Not specified", // Not in schema; default value
            bio: gigData.freelancer?.overview || gigData.freelancer?.user?.bio || "No bio available.",
          },
          packages: Array.isArray(gigData.pricing)
            ? gigData.pricing.map((pkg) => ({
                type: pkg.type || "basic",
                name: pkg.name || "Unnamed Package",
                price: pkg.price || 0,
                delivery: pkg.delivery || "Not specified",
                revisions: pkg.revisions || 0,
                duration: pkg.duration || "Not specified",
                features: pkg.features || [],
              }))
            : [
                {
                  type: "basic",
                  name: "Default Package",
                  price: 0,
                  delivery: "Not specified",
                  revisions: 0,
                  duration: "Not specified",
                  features: [],
                },
              ],
          testimonials: gigData.reviewsReceived || [],
        });
      } catch (err) {
        console.error("Error fetching gig:", err);
        setError(
          err.response?.status === 404
            ? "Gig not found."
            : err.response?.status === 401
            ? "Please log in to view this gig."
            : "Failed to load gig details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (gigId) {
      fetchGig();
    } else {
      setError("Invalid gig ID.");
      setLoading(false);
    }
  }, [gigId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-lg">Gig not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>{gig.category.charAt(0).toUpperCase() + gig.category.slice(1)}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{gig.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(gig.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-semibold text-gray-900">{gig.rating.toFixed(1)}</span>
                <span className="ml-1 text-gray-600">({gig.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="text-gray-600 flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-medium">{gig.seller.badge}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 lg:self-start">
            <button className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 h-10">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 h-10">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Portfolio & Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Portfolio Showcase */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-purple-900 aspect-video group shadow-xl">
              <img
                src={gig.thumbnail}
                alt={`${gig.title} portfolio`}
                width={1280}
                height={720}
                className="object-cover w-full h-full opacity-70 group-hover:opacity-50 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 hover:bg-white rounded-full p-5 transition-all transform hover:scale-105 shadow-lg">
                  <Play className="w-8 h-8 text-purple-700 fill-purple-700" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                <div className="text-white text-2xl md:text-3xl font-bold mb-2">{gig.title.toUpperCase()}</div>
                <div className="text-gray-300">{gig.description}</div>
              </div>
            </div>

            {gig.portfolio.length > 0 && (
              <div className="grid grid-cols-5 gap-3">
                {gig.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-video rounded-xl overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition-all hover:shadow-md transform hover:-translate-y-1"
                  >
                    <img
                      src={item.url}
                      alt={`Portfolio sample ${item.id}`}
                      width={320}
                      height={180}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* About This Gig */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Video className="w-6 h-6 text-purple-600" />
                About This Gig
              </h2>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-100 shadow-sm">
                <div className="flex items-center gap-3 text-purple-800 font-semibold">
                  <Shield className="w-5 h-5" />
                  100% Satisfaction Guarantee or Full Refund
                </div>
              </div>

              <div className="prose max-w-none text-gray-700">
                <p className="text-lg">{gig.description}</p>
                <p>
                  My expertise spans across multiple domains including commercial production, YouTube content
                  optimization, wedding cinematography, corporate videos, and advanced techniques like multicam editing
                  and green screen compositing.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      Technical Excellence
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Output in any format including 4K HDR</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Professional color grading & LUTs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Adobe Premiere Pro & After Effects</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Music className="w-5 h-5 text-indigo-500" />
                      Creative Services
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Custom motion graphics & animations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Curated royalty-free music library</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Professional sound design & mixing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* About Seller */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                Meet Your Editor
              </h2>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={gig.seller.avatar}
                        alt={`${gig.seller.name} profile`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-2 border-white">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{gig.seller.name}</h3>
                    <p className="text-purple-700 font-medium mb-2">Senior Video Editor & Colorist</p>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(gig.seller.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">{gig.seller.rating.toFixed(1)}</span>
                      <span className="text-gray-600">({gig.seller.reviews.toLocaleString()})</span>
                    </div>

                    <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium shadow-sm">
                      Contact Me
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-8 border-t border-gray-100 pt-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{gig.seller.location}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Experience</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{gig.seller.experience}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-1">Response Time</div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{gig.seller.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-slate-50 p-5 rounded-xl">
                  <p className="text-gray-700 italic">{gig.seller.bio}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {gig.testimonials.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Star className="w-6 h-6 text-amber-500" />
                    Client Testimonials
                  </h2>
                  <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">
                    View all {gig.reviews.toLocaleString()} reviews
                  </a>
                </div>

                <div className="flex items-center gap-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-1">{gig.rating.toFixed(1)}</div>
                    <div className="flex justify-center mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(gig.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-amber-200 text-amber-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Exceptional</div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium w-16">5 Stars</div>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 w-12 text-right">(1,271)</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium w-16">4 Stars</div>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                          style={{ width: "5%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 w-12 text-right">(45)</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium w-16">3 Stars</div>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                          style={{ width: "1%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 w-12 text-right">(10)</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium w-16">2 Stars</div>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                          style={{ width: "0.5%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 w-12 text-right">(6)</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium w-16">1 Star</div>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                          style={{ width: "0.2%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500 w-12 text-right">(2)</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {gig.testimonials.map((review) => (
                    <div key={review.id} className="p-6 bg-white rounded-2xl border border-gray-200">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src={`/placeholder.svg?height=100&width=100&text=${review.name.charAt(0)}`}
                            alt={`${review.name} avatar`}
                            width={100}
                            height={100}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>

                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">{review.country}</div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700">{review.comment}</p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">{review.package}</div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{review.delivery}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Pricing */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
                {/* Tabs */}
                <div className="flex">
                  {gig.packages.map((pkg) => (
                    <button
                      key={pkg.type}
                      className={`flex-1 py-4 font-medium text-center relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-purple-600 after:opacity-${
                        selectedPackage === pkg.type ? "100" : "0"
                      }`}
                      onClick={() => setSelectedPackage(pkg.type)}
                    >
                      <span
                        className={
                          selectedPackage === pkg.type ? "text-purple-700" : "text-gray-500 hover:text-gray-700"
                        }
                      >
                        {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                      </span>
                      <div className="text-sm text-gray-500">${pkg.price}</div>
                    </button>
                  ))}
                </div>

                {/* Package Content */}
                <div className="p-6 relative">
                  {gig.packages.map((pkg) => (
                    <div key={pkg.type} className={selectedPackage === pkg.type ? "block" : "hidden"}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl text-gray-900">{pkg.name}</h3>
                        <div className="flex items-center">
                          <span className="text-3xl font-bold text-purple-700">${pkg.price}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-5 border-b border-gray-100 pb-5">{gig.description}</p>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="flex items-center gap-2 bg-purple-50 p-2.5 rounded-xl">
                          <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <div className="text-gray-700 font-medium text-sm">{pkg.delivery}</div>
                        </div>

                        <div className="flex items-center gap-2 bg-blue-50 p-2.5 rounded-xl">
                          <Package className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <div className="text-gray-700 font-medium text-sm">
                            {pkg.revisions} Revision{pkg.revisions !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold text-gray-900 text-sm">Service Includes:</h4>

                        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-xs">{feature}</span>
                            </div>
                          ))}
                          <div className="flex items-start gap-1.5 col-span-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-xs">{pkg.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow">
                          Continue
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <button className="w-full py-2.5 bg-white hover:bg-gray-50 border border-gray-300 font-medium rounded-xl transition-colors text-sm">
                          Contact Me
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-5 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Need a Custom Quote?
                </h3>
                <p className="mb-3 text-purple-100 text-sm">
                  Have a unique project? Let's discuss your specific requirements.
                </p>
                <button className="w-full py-2.5 bg-white text-purple-900 font-medium rounded-xl hover:bg-purple-50 transition-colors text-sm">
                  Request Custom Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}