import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

export default function Shortlist() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to log errors consistently
  const logError = (context, error) => {
    console.error(`[Shortlist] ${context}:`, {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
  };

  // Fetch jobs and user role
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check for token
        const token = localStorage.getItem('token');
        console.log('[Shortlist] JWT token:', token ? 'Present' : 'Missing');
        if (!token) {
          toast.error('Please log in to view shortlist.');
          navigate('/login');
          return;
        }

        // Fetch user role
        let userRole = null;
        try {
          console.log('[Shortlist] Fetching user profile');
          const profileResponse = await axiosInstance.get('/user/profile');
          console.log('[Shortlist] Profile response:', profileResponse.data);
          userRole = profileResponse.data?.data?.role;
          if (userRole && userRole !== 'CLIENT') {
            toast.error('Only clients can access the shortlist.');
            navigate('/jobs');
            return;
          }
        } catch (profileError) {
          logError('Profile fetch', profileError);
          const status = profileError.response?.status;
          if (status === 401 || status === 403) {
            toast.error('Session expired. Please log in again.');
            localStorage.removeItem('token');
            navigate('/login');
            return;
          } else {
            console.warn('[Shortlist] Profile fetch failed, proceeding without role check');
          }
        }

        // Fetch jobs
        console.log('[Shortlist] Fetching jobs');
        setIsLoading(true);
        const jobsResponse = await axiosInstance.get('/jobs');
        console.log('[Shortlist] Jobs response:', JSON.stringify(jobsResponse.data, null, 2));
        const jobsData = jobsResponse.data.data?.jobs || [];
        setJobs(jobsData);
      } catch (error) {
        logError('Jobs fetch', error);
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          toast.error('Failed to load jobs. Please try again.');
          setJobs([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Navigate to job applicants page
  const handleJobClick = (job) => {
    console.log(`[Shortlist] Navigating to applicants for job: ${job.id}`);
    navigate(`/shortlist/${job.id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Job Shortlist</h1>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        /* Job Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                onClick={() => handleJobClick(job)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      ID: {job.id}
                    </span>
                  </div>

                  <div className="mb-4">
                    {job.budgetMin && job.budgetMax && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ₹{Number(job.budgetMin).toLocaleString('en-IN')} - ₹{Number(job.budgetMax).toLocaleString('en-IN')}
                      </div>
                    )}
                    {job.deadline && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Deadline: {new Date(job.deadline).toLocaleDateString('en-US')}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        job.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'closed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {job.status || 'Active'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Applicants
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new job.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
