import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Camera,
  Check,
  Clock,
  Heart,
  ImageIcon,
  MapPin,
  MessageCircle,
  MoreVertical,
  Share2,
  Star,
  Trophy,
  User,
  Briefcase,
  Zap,
  Edit,
  Upload,
  Plus,
  X,
  Video,
  Save,
  Sparkles,
  Award,
  Palette,
  Layers,
  PenTool,
  Settings,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Image,
} from "lucide-react";
import { toast } from "react-toastify"; // Added for error notifications
import "./animation.css";
import axiosInstance from "../../utils/axios";

// Helper function to replace the cn utility
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfilePage() {
  const { freelancerId } = useParams();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [profile, setProfile] = useState({});
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [about, setAbout] = useState({ text: "", services: [] });
  const [equipment, setEquipment] = useState({ cameras: [], lenses: [], lighting: [] });
  const [gigs, setGigs] = useState([]);
  const [badges, setBadges] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [stats, setStats] = useState({ totalJobs: 0, totalHours: 0, successRate: 0, rating: 0 });
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [contentType, setContentType] = useState("");
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    category: "",
    description: "",
    mediaType: "image",
    mediaUrl: "",
  });
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [newEquipment, setNewEquipment] = useState({
    type: "cameras",
    name: "",
  });
  const [newGig, setNewGig] = useState({
    title: "",
    description: "",
    pricing: JSON.stringify({
      basic: 0,
      standard: 0,
      premium: 0
    }),
    deliveryTime: 0,
    category: "",
    thumbnailUrl: ""
  });
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const fileInputRef = useRef(null);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const endpoint = freelancerId ? `/users/profile/${freelancerId}` : "/users/me";
        console.log('Fetching profile - Endpoint:', endpoint);
        console.log('Freelancer ID from params:', freelancerId);
        
        const { data } = await axiosInstance.get(endpoint);
        console.log('Raw API Response:', data);
        console.log('User data received:', data.data);
        
        const userData = data.data;

        if (!userData) {
          console.error('No user data found in response');
          toast.error("Freelancer profile not found");
          return;
        }

        // Set profile data
        setProfile({
          id: userData.id,
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          profilePicture: userData.profilePicture || "/placeholder.svg?height=160&width=160",
          isVerified: userData.isVerified || false,
          lastNameChange: userData.lastNameChange || null,
          hourlyRate: userData.freelancerProfile?.hourlyRate || 85,
          country: userData.country || "United States",
          city: userData.freelancerProfile?.city || "New York",
          bio: userData.bio || "",
        });

        // Map portfolio videos
        const mappedPortfolioItems = (userData.freelancerProfile?.portfolioVideos || []).map(video => ({
          id: video.id,
          title: video.title,
          mediaType: "video",
          mediaUrl: video.videoUrl,
          description: video.description,
          category: video.category,
          uploadedAt: video.uploadedAt
        }));

        setPortfolioItems(mappedPortfolioItems);
        
        // Set about data
        setAbout({
          text: userData.freelancerProfile?.overview || "",
          services: userData.freelancerProfile?.skills || [],
        });

        // Set equipment data
        setEquipment({
          cameras: userData.freelancerProfile?.equipmentCameras?.split(", ") || [],
          lenses: userData.freelancerProfile?.equipmentLenses?.split(", ") || [],
          lighting: userData.freelancerProfile?.equipmentLighting?.split(", ") || [],
        });

        // Set gigs data
        setGigs(userData.freelancerProfile?.gigs || []);

        // Set badges
        setBadges(
          (userData.freelancerProfile?.userBadges || []).map((b) => ({
            id: b.id,
            name: b.badge?.name || "Badge",
            icon: <Trophy className="w-3.5 h-3.5 text-amber-500" />,
            achieved: true,
            isVisible: b.isVisible || true,
          }))
        );

        // Set stats data
        setStats({
          totalJobs: userData.totalJobs || 0,
          totalHours: userData.totalHours || 0,
          successRate: userData.successRate || 0,
          rating: userData.rating || 0,
        });

        // Check if current user is the owner
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          setIsOwner(!freelancerId || userData.id === decoded.id);
        } else {
          setIsOwner(false);
        }

      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, [freelancerId]);

  // Owner-only handlers with isOwner check
  const handleSaveProfile = async (updatedProfile) => {
    if (!isOwner) {
      toast.error("You don't have permission to edit this profile");
      return;
    }
    try {
      const { data } = await axiosInstance.patch("/users/me", updatedProfile);
      setProfile(data.data);
      setIsModalOpen(false);
      showNotificationMessage("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotificationMessage("Failed to update profile", "error");
    }
  };

  const handleDeleteItem = async (type, id) => {
    if (!isOwner) {
      toast.error("You don't have permission to delete items from this profile");
      return;
    }
    try {
      await axiosInstance.delete(`/users/me/${type}/${id}`);
      if (type === "portfolio") setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
      if (type === "gigs") setGigs((prev) => prev.filter((gig) => gig.id !== id));
      if (type === "services")
        setAbout((prev) => ({
          ...prev,
          services: prev.services.filter((service) => service.id !== id),
        }));
      showNotificationMessage(`${type} item deleted successfully`, "success");
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      showNotificationMessage(`Failed to delete ${type} item`, "error");
    }
  };

  const handleUpdateItem = async (type, id, updatedItem) => {
    if (!isOwner) {
      toast.error("You don't have permission to update items on this profile");
      return;
    }
    try {
      await axiosInstance.patch(`/users/me`, { [type]: updatedItem });
      if (type === "portfolio") setPortfolioItems((prev) => prev.map((item) => (item.id === id ? updatedItem : item)));
      if (type === "gigs") setGigs((prev) => prev.map((gig) => (gig.id === id ? updatedItem : gig)));
      if (type === "services")
        setAbout((prev) => ({
          ...prev,
          services: prev.services.map((service) => (service.id === id ? updatedItem : service)),
        }));
      showNotificationMessage(`${type} item updated successfully`, "success");
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      showNotificationMessage(`Failed to update ${type} item`, "error");
    }
  };

  const handleAddItem = async (type) => {
    if (!isOwner) {
      toast.error("You don't have permission to add items to this profile");
      return;
    }
    try {
      let payload = {};
      let response;

      if (type === "portfolio") {
        payload = { portfolio: newPortfolioItem };
        response = await axiosInstance.post("/users/me/portfolio", newPortfolioItem);
        setPortfolioItems((prev) => [...prev, response.data.data]);
      } else if (type === "services") {
        payload = { services: newService };
        response = await axiosInstance.post("/users/me/services", newService);
        setAbout((prev) => ({
          ...prev,
          services: [...prev.services, response.data.data],
        }));
      } else if (type === "equipment") {
        const updatedEquipment = {
          ...equipment,
          [newEquipment.type]: [...equipment[newEquipment.type], newEquipment.name],
        };
        setEquipment(updatedEquipment);
        payload = {
          [`equipment${newEquipment.type.charAt(0).toUpperCase() + newEquipment.type.slice(1)}`]:
            updatedEquipment[newEquipment.type].join(", "),
        };
        await axiosInstance.patch("/users/me", payload);
      } else if (type === "gigs") {
        payload = { gigs: newGig };
        response = await axiosInstance.post("/users/me/gigs", newGig);
        setGigs((prev) => [...prev, response.data.data]);
      }

      setIsAddingContent(false);
      setNewPortfolioItem({ title: "", category: "", description: "", mediaType: "image", mediaUrl: "" });
      setNewService({ title: "", description: "", price: "" });
      setNewEquipment({ type: "cameras", name: "" });
      setNewGig({ title: "", description: "", pricing: JSON.stringify({
        basic: 0,
        standard: 0,
        premium: 0
      }), deliveryTime: 0, category: "", thumbnailUrl: "" });

      showNotificationMessage(`New ${type} added successfully`, "success");
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
      showNotificationMessage(`Failed to add ${type}`, "error");
    }
  };

  const handleSaveAbout = async () => {
    if (!isOwner) {
      toast.error("You don't have permission to edit this profile");
      return;
    }
    try {
      await axiosInstance.patch("/users/me", { overview: about.text });
      setIsEditingAbout(false);
      showNotificationMessage("About section updated successfully", "success");
    } catch (error) {
      console.error("Error updating about section:", error);
      showNotificationMessage("Failed to update about section", "error");
    }
  };

  const showNotificationMessage = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleFileUpload = (e) => {
    if (!isOwner) {
      toast.error("You don't have permission to upload files to this profile");
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setNewPortfolioItem({
        ...newPortfolioItem,
        mediaUrl: localUrl,
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Notification */}
      {showNotification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg notification-slide-in ${
            notificationType === "success"
              ? "bg-green-50 text-green-800 border-l-4 border-green-500"
              : "bg-red-50 text-red-800 border-l-4 border-red-500"
          }`}
        >
          <div className="mr-3">
            {notificationType === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <p>{notificationMessage}</p>
          <button onClick={() => setShowNotification(false)} className="ml-4 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hero Section with Profile Info */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 h-64 md:h-80"></div>
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 p-8 flex flex-col items-center justify-center border-r border-gray-100">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-purple-100">
                    <img
                      src={profile.profilePicture || "/placeholder.svg"}
                      alt={`${profile.firstname} ${profile.lastname}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {isOwner && (
                    <div className="absolute bottom-2 right-2">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-8 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h1 className="text-2xl font-bold mt-4 text-center">
                  {profile.firstname} {profile.lastname}
                  {profile.isVerified && (
                    <span className="inline-flex items-center ml-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-blue-600" />
                      </span>
                    </span>
                  )}
                </h1>
                <div className="text-gray-500 text-center mt-1 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.city}, {profile.country}
                </div>
                <div className="mt-6 text-center">
                  <div className="text-3xl font-bold text-purple-600">${profile.hourlyRate}</div>
                  <div className="text-sm text-gray-500">per hour</div>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {badges
                    .filter((b) => b.isVisible)
                    .map((badge) => (
                      <span
                        key={badge.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border border-amber-200"
                      >
                        {badge.icon}
                        <span className="ml-1">{badge.name}</span>
                      </span>
                    ))}
                </div>
                {!isOwner && (
                  <div className="mt-8 flex flex-col gap-3 w-full">
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Message
                    </button>
                    <div className="flex gap-2 w-full">
                      <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </button>
                      <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center">
                        <Heart className="w-4 h-4 mr-2" />
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Professional Overview</h2>
                  {isOwner && !isEditingAbout && (
                    <button
                      onClick={() => setIsEditingAbout(true)}
                      className="mt-2 md:mt-0 text-sm text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Overview
                    </button>
                  )}
                </div>

                {isEditingAbout ? (
                  <div className="space-y-4">
                    <textarea
                      value={about.text}
                      onChange={(e) => setAbout({ ...about, text: e.target.value })}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 min-h-[150px]"
                      placeholder="Write about your professional experience, skills, and expertise..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditingAbout(false)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveAbout}
                        className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {about.text || "No professional overview provided yet."}
                  </p>
                )}

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xs text-gray-500">Total</span>
                    </div>
                    <div className="text-2xl font-bold">{stats.totalJobs}</div>
                    <div className="text-sm text-gray-500">Jobs Completed</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-500">Total</span>
                    </div>
                    <div className="text-2xl font-bold">{stats.totalHours}</div>
                    <div className="text-sm text-gray-500">Hours Worked</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-xs text-gray-500">Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{stats.successRate}%</div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Star className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-xs text-gray-500">Average</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">{stats.rating}/5</div>
                    <div className="text-sm text-gray-500">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <EditProfileModal
          profile={profile}
          badges={badges}
          onSave={handleSaveProfile}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Add Content Modal */}
      {isAddingContent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 modal-overlay">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden modal-content">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {contentType === "portfolio" && "Add Portfolio Item"}
                  {contentType === "services" && "Add Service"}
                  {contentType === "equipment" && "Add Equipment"}
                  {contentType === "gigs" && "Create a Gig"}
                </h2>
                <button onClick={() => setIsAddingContent(false)} className="text-white/80 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {contentType === "portfolio" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={newPortfolioItem.title}
                      onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      placeholder="Enter portfolio item title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newPortfolioItem.category}
                      onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, category: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                    >
                      <option value="">Select a category</option>
                      <option value="Photography">Photography</option>
                      <option value="Videography">Videography</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newPortfolioItem.description}
                      onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none min-h-[100px]"
                      placeholder="Describe your portfolio item"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={newPortfolioItem.mediaType === "image"}
                          onChange={() => setNewPortfolioItem({ ...newPortfolioItem, mediaType: "image" })}
                          className="mr-2"
                        />
                        <Image className="w-4 h-4 mr-1" />
                        Image
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={newPortfolioItem.mediaType === "video"}
                          onChange={() => setNewPortfolioItem({ ...newPortfolioItem, mediaType: "video" })}
                          className="mr-2"
                        />
                        <Video className="w-4 h-4 mr-1" />
                        Video
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {newPortfolioItem.mediaType === "image" ? "Upload Image" : "Video URL"}
                    </label>
                    {newPortfolioItem.mediaType === "image" ? (
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                        >
                          {newPortfolioItem.mediaUrl ? (
                            <div className="relative">
                              <img
                                src={newPortfolioItem.mediaUrl || "/placeholder.svg"}
                                alt="Preview"
                                className="max-h-40 mx-auto rounded"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setNewPortfolioItem({ ...newPortfolioItem, mediaUrl: "" })
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Click to upload an image</p>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={newPortfolioItem.mediaUrl}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, mediaUrl: e.target.value })}
                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                        placeholder="Enter YouTube or Vimeo URL"
                      />
                    )}
                  </div>
                </div>
              )}

              {contentType === "services" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      placeholder="E.g., Portrait Photography"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none min-h-[100px]"
                      placeholder="Describe the service you offer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        className="w-full p-2.5 pl-10 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                </div>
              )}

              {contentType === "equipment" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Type</label>
                    <select
                      value={newEquipment.type}
                      onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                    >
                      <option value="cameras">Camera</option>
                      <option value="lenses">Lens</option>
                      <option value="lighting">Lighting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Name</label>
                    <input
                      type="text"
                      value={newEquipment.name}
                      onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      placeholder="E.g., Canon EOS R5"
                    />
                  </div>
                </div>
              )}

              {contentType === "gigs" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gig Title</label>
                    <input
                      type="text"
                      value={newGig.title}
                      onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      placeholder="E.g., Professional Headshot Photography"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newGig.description}
                      onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none min-h-[100px]"
                      placeholder="Describe your gig in detail"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Basic Package Price</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="number"
                        value={typeof newGig.pricing === 'string' ? JSON.parse(newGig.pricing).basic : newGig.pricing.basic}
                        onChange={(e) => {
                          const pricing = typeof newGig.pricing === 'string' ? JSON.parse(newGig.pricing) : newGig.pricing;
                          setNewGig({
                            ...newGig,
                            pricing: JSON.stringify({
                              ...pricing,
                              basic: parseFloat(e.target.value)
                            })
                          });
                        }}
                        className="w-full p-2.5 pl-10 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                        placeholder="Enter starting price"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time (days)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="number"
                        value={newGig.deliveryTime}
                        onChange={(e) => setNewGig({ ...newGig, deliveryTime: parseInt(e.target.value) })}
                        className="w-full p-2.5 pl-10 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                        placeholder="E.g., 3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={newGig.category || ""}
                      onChange={(e) => setNewGig({ ...newGig, category: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      placeholder="E.g., Video Editing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                    <input
                      type="text"
                      value={newGig.thumbnailUrl}
                      onChange={(e) => setNewGig({ ...newGig, thumbnailUrl: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      placeholder="Enter thumbnail URL"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button
                onClick={() => setIsAddingContent(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddItem(contentType)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md hover:from-purple-600 hover:to-indigo-600 transition-all shadow-sm hover:shadow flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add{" "}
                {contentType === "portfolio"
                  ? "Item"
                  : contentType === "services"
                    ? "Service"
                    : contentType === "equipment"
                      ? "Equipment"
                      : "Gig"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex overflow-x-auto">
            {["portfolio", "reviews", "about", "equipment", "gigs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 flex flex-col items-center justify-center transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-b from-purple-50 to-white text-purple-700 border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <div className={`p-2 rounded-full mb-1 ${activeTab === tab ? "bg-purple-100" : "bg-gray-100"}`}>
                  {tab === "portfolio" && <ImageIcon className="w-5 h-5" />}
                  {tab === "reviews" && <Star className="w-5 h-5" />}
                  {tab === "about" && <User className="w-5 h-5" />}
                  {tab === "equipment" && <Camera className="w-5 h-5" />}
                  {tab === "gigs" && <Briefcase className="w-5 h-5" />}
                </div>
                <span className="text-sm font-medium capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Portfolio Tab */}
          {activeTab === "portfolio" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-purple-600" />
                  Portfolio
                </h2>
                {isOwner && (
                  <button
                    onClick={() => {
                      setContentType("portfolio")
                      setIsAddingContent(true)
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </button>
                )}
              </div>
              {portfolioItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 empty-state bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <div className="bg-purple-50 rounded-full p-6 mb-4 empty-state-icon">
                    <ImageIcon className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No portfolio items yet</h3>
                  <p className="text-center text-gray-500 max-w-md mb-6">
                    Showcase your best work to attract potential clients. Add photos, videos, and projects to your
                    portfolio.
                  </p>
                  {isOwner && (
                    <button
                      onClick={() => {
                        setContentType("portfolio")
                        setIsAddingContent(true)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Your First Portfolio Item
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map((item) => (
                    <PortfolioItem
                      key={item.id}
                      item={item}
                      isOwner={isOwner}
                      onDelete={() => handleDeleteItem("portfolio", item.id)}
                      onUpdate={(updated) => handleUpdateItem("portfolio", item.id, updated)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Star className="w-5 h-5 mr-2 text-amber-500" />
                  Reviews
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center py-16 empty-state bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <div className="bg-amber-50 rounded-full p-6 mb-4 empty-state-icon">
                  <Star className="w-12 h-12 text-amber-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No reviews yet</h3>
                <p className="text-center text-gray-500 max-w-md mb-6">
                  Reviews from your clients will appear here. Complete more jobs to get reviews.
                </p>
                {isOwner && (
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg flex items-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Your Profile
                  </button>
                )}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-indigo-600" />
                  Services
                </h2>
                {isOwner && (
                  <button
                    onClick={() => {
                      setContentType("services")
                      setIsAddingContent(true)
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Service
                  </button>
                )}
              </div>
              {about.services.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 empty-state bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <div className="bg-indigo-50 rounded-full p-6 mb-4 empty-state-icon">
                    <PenTool className="w-12 h-12 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No services listed yet</h3>
                  <p className="text-center text-gray-500 max-w-md mb-6">
                    Let potential clients know what services you offer. Add your specialties and expertise.
                  </p>
                  {isOwner && (
                    <button
                      onClick={() => {
                        setContentType("services")
                        setIsAddingContent(true)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg flex items-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Your First Service
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {about.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all relative group"
                    >
                      {isOwner && (
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setIsDropdownOpen(service.id)}
                            className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {isDropdownOpen === service.id && (
                            <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 w-36">
                              <button
                                onClick={() => {
                                  const updated = prompt("Update service title:", service.title)
                                  if (updated)
                                    handleUpdateItem("services", service.id, {
                                      ...service,
                                      title: updated,
                                    })
                                  setIsDropdownOpen(null)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                              >
                                <Edit className="w-4 h-4 mr-2 text-gray-500" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteItem("services", service.id)
                                  setIsDropdownOpen(null)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-start">
                        <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                          <Award className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <p className="text-gray-600 mt-2">{service.description}</p>
                          {service.price && (
                            <div className="mt-4 inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                              Starting at ${service.price}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Equipment Tab */}
          {activeTab === "equipment" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-green-600" />
                  Equipment
                </h2>
                {isOwner && (
                  <button
                    onClick={() => {
                      setContentType("equipment")
                      setIsAddingContent(true)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Equipment
                  </button>
                )}
              </div>
              <div className="space-y-8">
                {["cameras", "lenses", "lighting"].map((category) => (
                  <div key={category} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-medium mb-4 capitalize flex items-center">
                      {category === "cameras" && <Camera className="w-5 h-5 mr-2 text-green-600" />}
                      {category === "lenses" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 mr-2 text-blue-600"
                        >
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                          <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                          <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                          <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                        </svg>
                      )}
                      {category === "lighting" && <Zap className="w-5 h-5 mr-2 text-amber-600" />}
                      {category}
                    </h3>
                    {equipment[category].length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 empty-state bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">No {category} added yet</p>
                        {isOwner && (
                          <button
                            onClick={() => {
                              setContentType("equipment")
                              setNewEquipment({ type: category, name: "" })
                              setIsAddingContent(true)
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center text-sm"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add {category.slice(0, -1)}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {equipment[category].map((item, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-3 relative group hover:shadow-md transition-all"
                          >
                            {isOwner && (
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => setIsDropdownOpen(`${category}-${index}`)}
                                  className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                                {isDropdownOpen === `${category}-${index}` && (
                                  <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 w-36">
                                    <button
                                      onClick={() => {
                                        const updated = prompt(`Update ${category} item:`, item)
                                        if (updated) {
                                          const updatedEquipment = {
                                            ...equipment,
                                            [category]: equipment[category].map((i, idx) =>
                                              idx === index ? updated : i,
                                            ),
                                          }
                                          setEquipment(updatedEquipment)
                                          handleUpdateItem("equipment", null, {
                                            [`equipment${category.charAt(0).toUpperCase() + category.slice(1)}`]:
                                              updatedEquipment[category].join(", "),
                                          })
                                        }
                                        setIsDropdownOpen(null)
                                      }}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                    >
                                      <Edit className="w-4 h-4 mr-2 text-gray-500" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        const updatedEquipment = {
                                          ...equipment,
                                          [category]: equipment[category].filter((_, idx) => idx !== index),
                                        }
                                        setEquipment(updatedEquipment)
                                        handleUpdateItem("equipment", null, {
                                          [`equipment${category.charAt(0).toUpperCase() + category.slice(1)}`]:
                                            updatedEquipment[category].join(", "),
                                        })
                                        setIsDropdownOpen(null)
                                      }}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center"
                                    >
                                      <X className="w-4 h-4 mr-2" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center">
                              {category === "cameras" && (
                                <div className="p-2 bg-green-100 rounded-full">
                                  <Camera className="w-5 h-5 text-green-600" />
                                </div>
                              )}
                              {category === "lenses" && (
                                <div className="p-2 bg-blue-100 rounded-full">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5 text-blue-600"
                                  >
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                                    <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                                    <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                                    <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                                  </svg>
                                </div>
                              )}
                              {category === "lighting" && (
                                <div className="p-2 bg-amber-100 rounded-full">
                                  <Zap className="w-5 h-5 text-amber-600" />
                                </div>
                              )}
                            </div>
                            <span className="font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gigs Tab */}
          {activeTab === "gigs" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                  Gigs
                </h2>
                {isOwner && (
                  <button
                    onClick={() => {
                      setContentType("gigs")
                      setIsAddingContent(true)
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create Gig
                  </button>
                )}
              </div>
              {gigs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 empty-state bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <div className="bg-purple-50 rounded-full p-6 mb-4 empty-state-icon">
                    <Briefcase className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No gigs created yet</h3>
                  <p className="text-center text-gray-500 max-w-md mb-6">
                    Create gigs to offer your services with fixed prices and delivery times.
                  </p>
                  {isOwner && (
                    <button
                      onClick={() => {
                        setContentType("gigs")
                        setIsAddingContent(true)
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg flex items-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Gig
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gigs.map((gig) => (
                    <div
                      key={gig.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative group border border-gray-100"
                    >
                      {isOwner && (
                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setIsDropdownOpen(gig.id)}
                            className="p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {isDropdownOpen === gig.id && (
                            <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 w-36">
                              <button
                                onClick={() => {
                                  const updatedTitle = prompt("Update gig title:", gig.title)
                                  if (updatedTitle)
                                    handleUpdateItem("gigs", gig.id, {
                                      ...gig,
                                      title: updatedTitle,
                                    })
                                  setIsDropdownOpen(null)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                              >
                                <Edit className="w-4 h-4 mr-2 text-gray-500" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteItem("gigs", gig.id)
                                  setIsDropdownOpen(null)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="aspect-video relative overflow-hidden bg-gradient-to-r from-purple-100 to-blue-100">
                        <img
                          src={`/placeholder.svg?height=200&width=400`}
                          alt={gig.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-lg">{gig.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-xl font-bold text-purple-600">
                            ${typeof gig.pricing === 'string' ? JSON.parse(gig.pricing).basic : gig.pricing?.basic}
                          </div>
                          <div className="text-sm text-gray-500">Starting price</div>
                        </div>
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{gig.description}</p>
                        <div className="flex items-center gap-1 mt-4 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>Delivery in {gig.deliveryTime} days</span>
                        </div>
                        {gig.category && (
                          <div className="mt-2 text-sm text-gray-500">
                            Category: {gig.category}
                          </div>
                        )}
                        {!isOwner && (
                          <button className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-md text-sm font-medium transition-all duration-300 shadow-sm hover:shadow">
                            Order Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Edit Profile Modal
function EditProfileModal({ profile, badges, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...profile })
  const [selectedImage, setSelectedImage] = useState(null)
  const [updatedBadges, setUpdatedBadges] = useState(badges)
  const [activeTab, setActiveTab] = useState("profile")
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
      setFormData({ ...formData, profilePicture: file }) // Will need to upload to S3
    }
  }

  const handleDeleteImage = () => {
    setSelectedImage(null)
    setFormData({ ...formData, profilePicture: null })
  }

  const canChangeName = () => {
    if (!formData.lastNameChange) return true
    const lastChange = new Date(formData.lastNameChange)
    const now = new Date()
    const diffMonths = (now - lastChange) / (1000 * 60 * 60 * 24 * 30)
    return diffMonths >= 3
  }

  const handleSubmit = () => {
    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      profilePicture: formData.profilePicture, // Handle file upload separately
      isVerified: formData.isVerified,
      hourlyRate: formData.hourlyRate,
      country: formData.country,
      city: formData.city,
      bio: formData.bio,
      userBadges: updatedBadges.map((b) => ({ id: b.id, isVisible: b.isVisible })),
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 modal-overlay">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden modal-content">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Edit Your Profile</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2 text-white/80">Update your personal information and profile settings</p>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center ${activeTab === "profile" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
          >
            <User className="w-5 h-5 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center ${activeTab === "settings" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center ${activeTab === "badges" ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"}`}
          >
            <Award className="w-5 h-5 mr-2" />
            Badges
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-purple-100">
                      <img
                        src={selectedImage || formData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/20 rounded-full">
                        <Edit className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                    >
                      Change
                    </button>
                    <button
                      onClick={handleDeleteImage}
                      className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={formData.firstname}
                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                        disabled={!canChangeName()}
                        className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all ${!canChangeName() ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      />
                      {!canChangeName() && (
                        <p className="text-sm text-red-500 mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Name can only be changed every 3 months
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        disabled={!canChangeName()}
                        className={`w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all ${!canChangeName() ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                    <input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none min-h-[100px]"
                      placeholder="Tell clients about yourself..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Verified Badge</h3>
                    <p className="text-sm text-gray-500">Show verification badge on your profile</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email notifications for messages</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={true} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Profile Visibility</h3>
                    <p className="text-sm text-gray-500">Make your profile visible to everyone</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={true} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === "badges" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Select which badges to display on your profile.</p>
              <div className="grid gap-3">
                {updatedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${badge.isVisible ? "border-purple-200 bg-purple-50" : "border-gray-200"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${badge.isVisible ? "bg-purple-100" : "bg-gray-100"}`}>
                        {badge.icon}
                      </div>
                      <div>
                        <p className="font-medium">{badge.name}</p>
                        <p className="text-xs text-gray-500">Earned on Jan 15, 2023</p>
                      </div>
                    </div>
                    {badge.achieved && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={badge.isVisible}
                          onChange={(e) =>
                            setUpdatedBadges((prev) =>
                              prev.map((b) => (b.id === badge.id ? { ...b, isVisible: e.target.checked } : b)),
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md hover:from-purple-600 hover:to-indigo-600 transition-all shadow-sm hover:shadow flex items-center"
          >
            <Save className="w-4 h-4 mr-1" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// Portfolio Item Component
function PortfolioItem({ item, isOwner, onDelete, onUpdate }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes || 0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 portfolio-item">
      <div className="aspect-square relative overflow-hidden">
        {item.mediaType === "video" ? (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <iframe
              src={item.mediaUrl}
              title={item.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={item.mediaUrl || `/placeholder.svg?height=400&width=400`}
            alt={item.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
        )}
        {isOwner && (
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        )}
        {isDropdownOpen && (
          <div className="absolute top-10 right-2 bg-white shadow-lg rounded-lg overflow-hidden z-10 w-36">
            <button
              onClick={() => {
                const updatedTitle = prompt("Update title:", item.title)
                if (updatedTitle) onUpdate({ ...item, title: updatedTitle })
                setIsDropdownOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            >
              <Edit className="w-4 h-4 mr-2 text-gray-500" />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete()
                setIsDropdownOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="font-medium text-white text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {item.title}
          </h3>
          <p className="text-sm text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {item.category}
          </p>
          <div className="flex items-center justify-between mt-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
            <div className="flex items-center gap-1 text-white/90">
              <Heart className={cn("w-4 h-4", liked ? "fill-red-500 text-red-500" : "fill-white text-white")} />
              <span className="text-sm">{likeCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleLike}
                className={cn(
                  "text-white hover:bg-white/20 rounded-full p-2 transition-colors",
                  liked && "text-red-500",
                )}
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

// Review Card Component (unchanged for now)
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
