import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './SideBar';
import ProjectTracker from './ProjectTracker';
import Shortlist from './ShortList';
import PaymentHistory from './PaymentHistory';
import axiosInstance from '../../utils/axios'; // Adjust path

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch client's jobs
  useEffect(() => {
    if (activeTab === 'shortlist') {
      const fetchJobs = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get('/jobs/client/me');
          const jobData = response.data.data || [];
          setJobs(jobData);
          toast.success('Jobs loaded successfully!');
        } catch (err) {
          console.error('Error fetching jobs:', err);
          toast.error('Failed to load jobs. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchJobs();
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto mt-16">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Client Dashboard</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === 'projects' && <ProjectTracker />}
          {activeTab === 'shortlist' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Posted Jobs</h2>
              {loading && (
                <div className="text-center text-gray-500">
                  <svg
                    className="animate-spin h-5 w-5 mx-auto text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p>Loading jobs...</p>
                </div>
              )}
              {!loading && jobs.length === 0 && (
                <p className="text-gray-500 text-center">No jobs posted yet.</p>
              )}
              {!loading && jobs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{job.scope}</p>
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => setSelectedJobId(job.id)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          View Shortlist
                        </button>
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-purple-600 hover:text-purple-800 font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedJobId && (
                <div className="mt-8">
                  <button
                    onClick={() => setSelectedJobId(null)}
                    className="mb-4 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Back to Jobs
                  </button>
                  <Shortlist jobId={selectedJobId.toString()} />
                </div>
              )}
            </div>
          )}
          {activeTab === 'payments' && <PaymentHistory />}
        </main>
      </div>
    </div>
  );
}
