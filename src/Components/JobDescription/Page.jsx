import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Mail,
  Calendar,
  DollarSign,
  Clock,
  Award,
  User,
  Building,
  Film,
  Play,
  Star,
  CheckCircle,
  IndianRupee,
  X,
} from "lucide-react";
import axiosInstance from "../../utils/axios";

export default function JobDescriptionPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationText, setApplicationText] = useState("");
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  // Fetch job and profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobResponse = await axiosInstance.get(`/job/${jobId}`);
        const jobData = jobResponse.data.data;
        setJob({
          id: jobData.id,
          title: jobData.title,
          description: jobData.description,
          category: jobData.category || ["Unknown"],
          budgetMin: jobData.budgetMin || 0,
          budgetMax: jobData.budgetMax || 0,
          deadline: jobData.deadline || new Date().toISOString(),
          jobDifficulty: jobData.jobDifficulty || "Unknown",
          projectLength: jobData.projectLength || "Unknown",
          keyResponsibilities: jobData.keyResponsibilities || ["Not specified"],
          requiredSkills: jobData.requiredSkills || [],
          tools: jobData.tools || [],
          scope: jobData.scope || "Not specified",
          name: jobData.name || "Anonymous",
          email: jobData.email || "N/A",
          company: jobData.company || "Unknown",
          note: jobData.note || "No additional notes provided.",
          sampleVideos: jobData.sampleVideos || [],
          isVerified: jobData.isVerified !== undefined ? jobData.isVerified : false,
        });

        // Fetch profile separately to check appliedJobsId
        try {
          const profileResponse = await axiosInstance.get("/user/profile");
          console.log("Profile response:", profileResponse.data);
          const appliedJobsId = profileResponse.data.data.appliedJobsId || [];
          setHasApplied(appliedJobsId.includes(parseInt(jobId)));
        } catch (profileError) {
          console.warn("Failed to fetch profile:", profileError.response?.status, profileError.message);
          setHasApplied(false); // Default to false if profile fetch fails
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(
          err.response?.status === 404
            ? "Job not found."
            : "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  // Fetch application template when modal opens
  useEffect(() => {
    if (!isModalOpen) return;
    
    const fetchUserData = async () => {
      try {
        let applicationTemplate = "";
        try {
          const profileResponse = await axiosInstance.get("/user/profile");
          const profileData = profileResponse.data.data;
          applicationTemplate = profileData.applicationTemplate || "";
        } catch (profileError) {
          console.warn("Profile endpoint not available:", profileError);
        }
        setApplicationText(applicationTemplate);
        setPortfolioItems([]);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setToast({
          message: "Failed to load profile data.",
          type: "error",
        });
      }
    };
    
    fetchUserData();
  }, [isModalOpen]);

  const openModal = () => {
    if (hasApplied) {
      setToast({ message: "You have already applied for this job.", type: "info" });
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setToast({ message: "", type: "" });
  };

  const togglePortfolioItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setToast({ message: "", type: "" });

    try {
      console.log("Submitting application for job:", job.id, { aboutFreelancer: applicationText });
      const response = await axiosInstance.post(`/job/apply/${job.id}`, {
        aboutFreelancer: applicationText,
      });
      
      closeModal();
      setHasApplied(true); // Update state immediately
      setToast({
        message: response.data.message || "Application submitted successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      let errorMessage = "Failed to submit application.";
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = "Please log in to apply.";
            break;
          case 403:
            errorMessage = "Only freelancers can apply for jobs.";
            break;
          case 400:
            errorMessage = error.response.data.message || "Invalid application data.";
            break;
          case 404:
            errorMessage = "Job not found.";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
        }
      }
      setToast({ message: errorMessage, type: "error" });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading job details...</div>;
  }

  if (error || !job) {
    return (
      <div className="text-center py-20 text-red-600">
        {error || "Job not found."}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {toast.message && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "info"
                ? "bg-blue-600"
                : "bg-red-600"
            } z-[1000]`}
          >
            {toast.message}
            <button
              onClick={() => setToast({ message: "", type: "" })}
              className="ml-2 text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Film className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">{job.company}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-yellow-500" : ""}`} />
                ))}
                <span className="text-gray-600 text-sm ml-2">
                  {job.isVerified ? "Top Rated Employer" : "Employer"}
                </span>
              </div>
              <p className="text-gray-600 max-w-3xl">{job.description}</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <button
                onClick={openModal}
                disabled={hasApplied}
                className={`flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-lg transition-colors ${
                  hasApplied
                    ? "border-2 border-green-500 text-green-500 bg-transparent cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {hasApplied ? (
                  <>
                    Applied <CheckCircle className="h-4 w-4 text-green-500" />
                  </>
                ) : (
                  "Apply Now"
                )}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <IndianRupee className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Budget Range</h3>
                    <p className="text-gray-600">
                      ₹{Number(job.budgetMin).toLocaleString("en-IN")} - ₹{Number(job.budgetMax).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Application Deadline</h3>
                    <p className="text-gray-600">
                      {new Date(job.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Experience Level</h3>
                    <p className="text-gray-600">{job.jobDifficulty}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Project Length</h3>
                    <p className="text-gray-600">{job.projectLength}</p>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Project Scope</h3>
                <p className="text-gray-700">{job.scope}</p>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Responsibilities</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.keyResponsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Required Skills & Tools</h2>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="border border-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {job.sampleVideos.length > 0 && (
              <div className="border-b border-gray-200 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sample Videos</h2>
                <p className="text-gray-600 mb-6">
                  These videos represent the style and quality we're looking for.
                </p>
                {job.sampleVideos.map((video, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{video.title}</h3>
                      <span className="text-gray-500 text-sm">{video.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{video.description}</p>
                    <button className="flex items-center text-purple-600 hover:text-purple-800 font-medium">
                      <Play className="h-4 w-4 mr-1" /> Watch Video
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="pb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Job Categories</h3>
              <div className="flex flex-wrap gap-2">
                {job.category.map((category, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Contact Person</h3>
                    <p className="text-gray-600">{job.name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href={`mailto:${job.email}`} className="text-purple-600 hover:underline">
                      {job.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Company</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Additional Notes</h3>
                <p className="text-gray-600 italic mb-6">{job.note}</p>
                <button
                  onClick={openModal}
                  disabled={hasApplied}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                    hasApplied
                      ? "border-2 border-green-500 text-green-500 bg-transparent cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  }`}
                >
                  {hasApplied ? (
                    <>
                      Applied <CheckCircle className="h-4 w-4 text-green-500" />
                    </>
                  ) : (
                    "Apply for this Position"
                  )}
                </button>
                <div className="mt-4 text-center">
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Share this job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-800">Apply for Position</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Job Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-700">{job.title}</h4>
                  <p className="text-gray-600 text-sm">{job.company}</p>
                </div>
                <div className="flex flex-col md:items-end">
                  <div className="flex items-center text-gray-700 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>₹{Number(job.budgetMin).toLocaleString("en-IN")} - ₹{Number(job.budgetMax).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(job.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{job.description}</p>
            </div>
            <form onSubmit={handleSubmitApplication} className="p-6">
              <div className="mb-6">
                <label htmlFor="applicationText" className="block text-gray-700 font-medium mb-2">
                  Your Application
                </label>
                <textarea
                  id="applicationText"
                  value={applicationText}
                  onChange={(e) => setApplicationText(e.target.value)}
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe why you're a good fit for this position..."
                  required
                ></textarea>
              </div>
              {portfolioItems.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Attach Portfolio Items
                  </label>
                  <div className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto">
                    {portfolioItems.map((item) => (
                      <div key={item.id} className="flex items-center mb-2 last:mb-0">
                        <input
                          type="checkbox"
                          id={`portfolio-${item.id}`}
                          checked={selectedItems.includes(item.id)}
                          onChange={() => togglePortfolioItem(item.id)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`portfolio-${item.id}`}
                          className="ml-2 block text-gray-700"
                        >
                          {item.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg disabled:opacity-75"
                >
                  {submitLoading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}