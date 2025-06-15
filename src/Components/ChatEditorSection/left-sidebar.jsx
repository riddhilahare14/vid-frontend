import { useState, useEffect } from "react";
import {
  User,
  FileText,
  Plus,
  Upload,
  FileIcon as FileInvoice,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import axiosInstance from "../../utils/axios.js";

export default function LeftSidebar({ currentProject, onNewTask, onGenerateInvoice, isCollapsed, onProjectSelect }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    fetchActiveProjects();
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
  }, []);

  // Effect to select first project when projects are loaded
  useEffect(() => {
    if (projects.length > 0 && !currentProject) {
      onProjectSelect(projects[0]);
    }
  }, [projects, currentProject, onProjectSelect]);

  const fetchActiveProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/jobs/active", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Active jobs response:", response.data.data); // Debug log
      setProjects(Array.isArray(response.data.data) ? response.data.data : []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch active jobs");
      console.error("Error fetching active jobs:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (isCollapsed) return null;

  return (
    <div className="w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transition-colors duration-200">
      {/* Logo and Theme Toggle */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Vidlancing
        </h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
        </button>
      </div>

      {/* Profile */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div>
          <h3 className="font-medium">
            {currentProject?.postedBy?.firstname && currentProject?.postedBy?.lastname
              ? `${currentProject.postedBy.firstname} ${currentProject.postedBy.lastname}`
              : projects.length > 0 && projects[0]?.postedBy?.firstname && projects[0]?.postedBy?.lastname
              ? `${projects[0].postedBy.firstname} ${projects[0].postedBy.lastname}`
              : "Loading..."}
          </h3>
          <p className="text-xs text-green-400">Available</p>
        </div>
      </div>

      {/* Projects */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Active Projects</h2>
          <button className="text-blue-400 hover:text-blue-300 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32 text-red-500">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400">
            <FileText className="w-8 h-8 mb-2" />
            <p className="text-sm">No Jobs Available</p>
            <p className="text-xs mt-1">You haven't been accepted for any projects yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  project.id === currentProject?.id
                    ? "bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-400" />
                    {project.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
               
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Deadline: {project.deadline
                    ? new Date(project.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "No deadline set"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onNewTask}
            className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1 group-hover:bg-blue-500/30 transition-colors">
              <Plus className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs">New Task</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-1 group-hover:bg-purple-500/30 transition-colors">
              <Upload className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-xs">Upload</span>
          </button>
          <button
            onClick={onGenerateInvoice}
            className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-1 group-hover:bg-green-500/30 transition-colors">
              <FileInvoice className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-xs">Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}