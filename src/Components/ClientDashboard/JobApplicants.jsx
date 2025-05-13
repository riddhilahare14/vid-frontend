import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

export default function JobApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  // Helper function to log errors
  const logError = (context, error) => {
    console.error(`[JobApplicants] ${context}:`, {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
  };

  // Sorting priorities
  const badgePriority = { gold: 3, silver: 2, bronze: 1, none: 0 };
  const preferencePriority = { 'full-time': 3, 'part-time': 2, 'one-time': 1, none: 0 };

  // Sort applicants
  const sortApplicants = (applicantsToSort) => {
    return [...applicantsToSort].sort((a, b) => {
      let compare = 0;
      if (sortBy === 'rating') {
        compare = (b.freelancer.rating || 0) - (a.freelancer.rating || 0);
      } else if (sortBy === 'badge') {
        compare = badgePriority[b.freelancer.freelancerProfile.badge || 'none'] - badgePriority[a.freelancer.freelancerProfile.badge || 'none'];
      } else if (sortBy === 'freelancingPreference') {
        compare = preferencePriority[b.freelancer.freelancerProfile.freelancingPreference || 'none'] - preferencePriority[a.freelancer.freelancerProfile.freelancingPreference || 'none'];
      } else if (sortBy === 'createdAt') {
        compare = new Date(b.createdAt) - new Date(a.createdAt);
      }
      return sortDirection === 'asc' ? -compare : compare;
    });
  };

  // Fetch job details and applicants
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        console.log('[JobApplicants] JWT token:', token ? 'Present' : 'Missing');
        if (!token) {
          toast.error('Please log in to view applicants.');
          navigate('/login');
          return;
        }

        // Fetch job details
        console.log(`[JobApplicants] Fetching job: ${jobId}`);
        const jobResponse = await axiosInstance.get(`/jobs/${jobId}`);
        console.log('[JobApplicants] Job response:', JSON.stringify(jobResponse.data, null, 2));
        const jobData = jobResponse.data.data?.job || jobResponse.data.data;
        if (!jobData) {
          throw new Error('Job not found');
        }
        setJob(jobData);

        // Fetch applicants
        console.log(`[JobApplicants] Fetching applicants for job: ${jobId}`);
        const applicantsResponse = await axiosInstance.get(`/jobs/${jobId}/applications`);
        console.log('[JobApplicants] Applicants response:', JSON.stringify(applicantsResponse.data, null, 2));

        // Parse applications
        const applications = Array.isArray(applicantsResponse.data.data) ? applicantsResponse.data.data : [];
        console.log('[JobApplicants] Parsed applications:', applications);

        if (!Array.isArray(applications)) {
          console.warn('[JobApplicants] Applications is not an array:', applications);
          setApplicants([]);
          toast.warn('No valid applicant data received.');
          return;
        }

        const fetchedApplicants = applications.map((app) => {
          console.log('[JobApplicants] Processing applicant:', app);
          return {
            id: app.id,
            userId: app.freelancerId,
            name: app.freelancer ? `${app.freelancer.firstname} ${app.freelancer.lastname}`.trim() : `Applicant #${app.freelancerId}`,
            email: app.freelancer?.email || 'N/A',
            coverLetter: app.aboutFreelancer || 'No cover letter provided',
            portfolioItems: Array.isArray(app.portfolioItems) ? app.portfolioItems : [],
            createdAt: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A',
            status: app.status ? app.status.toLowerCase() : 'pending',
            freelancer: {
              id: app.freelancer?.id,
              rating: app.freelancer?.rating || 0,
              freelancerProfile: {
                badge: app.freelancer?.freelancerProfile?.badge || 'none',
                freelancingPreference: app.freelancer?.freelancerProfile?.freelancingPreference || 'none',
              },
            },
          };
        });

        console.log('[JobApplicants] Mapped applicants:', fetchedApplicants);
        setApplicants(fetchedApplicants);

        if (fetchedApplicants.length === 0) {
          toast.warn('No applicants found for this job.');
        }
      } catch (error) {
        logError('Data fetch', error);
        console.log('[JobApplicants] Error response:', JSON.stringify(error.response?.data, null, 2));
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (status === 404) {
          toast.error('Job or applications not found.');
          navigate('/client-dashboard/shortlist');
        } else {
          toast.error('Failed to load data. Please try again.');
          navigate('/client-dashboard/shortlist');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobId, navigate]);

  // Handle select (accept) applicant
  const handleSelect = async (applicantId) => {
    try {
      console.log(`[JobApplicants] Selecting applicant: ${applicantId} for job: ${jobId}`);
      const response = await axiosInstance.post(`/jobs/${jobId}/apply/accept`, { applicationId: applicantId });
      console.log('[JobApplicants] Select response:', response.data);
      toast.success('Applicant selected successfully.');
      setApplicants((prev) =>
        prev.map((app) => (app.id === applicantId ? { ...app, status: 'accepted' } : app))
      );
    } catch (error) {
      logError('Select applicant', error);
      toast.error('Failed to select applicant.');
    }
  };

  // Handle remove (reject) applicant
  const handleRemove = async (applicantId) => {
    try {
      console.log(`[JobApplicants] Removing applicant: ${applicantId} for job: ${jobId}`);
      const response = await axiosInstance.post(`/jobs/${jobId}/apply/reject`, { applicationId: applicantId });
      console.log('[JobApplicants] Remove response:', response.data);
      toast.success('Applicant removed successfully.');
      setApplicants((prev) =>
        prev.map((app) => (app.id === applicantId ? { ...app, status: 'rejected' } : app))
      );
    } catch (error) {
      logError('Remove applicant', error);
      toast.error('Failed to remove applicant.');
    }
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('desc');
    }
  };

  // Sorted applicants
  const sortedApplicants = sortApplicants(applicants);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/client-dashboard/shortlist')}
        className="mb-6 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shortlist
      </button>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : job ? (
        <>
          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
            <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Budget:</span>{' '}
                  ₹{Number(job.budgetMin).toLocaleString('en-IN')} - ₹{Number(job.budgetMax).toLocaleString('en-IN')}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Deadline:</span>{' '}
                  {job.deadline ? new Date(job.deadline).toLocaleDateString('en-US') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      job.status === 'open'
                        ? 'bg-green-100 text-green-800'
                        : job.status === 'closed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {job.status || 'Active'}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Job ID:</span> {job.id}
                </p>
              </div>
            </div>
          </div>

          {/* Applicants Queue */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Applicants</h2>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Sort by Application Date</option>
                <option value="rating">Sort by Rating</option>
                <option value="badge">Sort by Badge</option>
                <option value="freelancingPreference">Sort by Freelancing Preference</option>
              </select>
              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
              >
                {sortDirection === 'asc' ? '↑ Asc' : '↓ Desc'}
              </button>
            </div>
          </div>
          {sortedApplicants.length > 0 ? (
            <div className="space-y-4">
              {sortedApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <span className="text-lg font-medium">
                        {applicant.name?.charAt(0) || applicant.userId?.toString().charAt(0) || 'A'}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{applicant.name}</h4>
                      <p className="text-sm text-gray-500">{applicant.email}</p>
                      <p className="text-sm text-gray-500">Applied: {applicant.createdAt}</p>
                      <p className="text-sm text-gray-500">
                        Rating: {applicant.freelancer.rating || 0} / 5
                      </p>
                      <p className="text-sm text-gray-500">
                        Badge:{' '}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            applicant.freelancer.freelancerProfile.badge === 'gold'
                              ? 'bg-yellow-100 text-yellow-800'
                              : applicant.freelancer.freelancerProfile.badge === 'silver'
                              ? 'bg-gray-100 text-gray-800'
                              : applicant.freelancer.freelancerProfile.badge === 'bronze'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {applicant.freelancer.freelancerProfile.badge || 'None'}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Preference: {applicant.freelancer.freelancerProfile.freelancingPreference || 'None'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status:{' '}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            applicant.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : applicant.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {applicant.status}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/freelancer/${applicant.userId}`)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100"
                      >
                        View Profile
                      </button>
                      {applicant.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleSelect(applicant.id)}
                            className="px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm hover:bg-green-100"
                          >
                            Select
                          </button>
                          <button
                            onClick={() => handleRemove(applicant.id)}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {applicant.coverLetter && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">Cover Letter:</span>
                      <p className="mt-1">{applicant.coverLetter}</p>
                    </div>
                  )}

                  {applicant.portfolioItems.length > 0 && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">Portfolio Items:</span>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {applicant.portfolioItems.map((item, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applicants found</h3>
              <p className="mt-1 text-sm text-gray-500">This job doesn't have any applicants yet.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-sm font-medium text-gray-900">Job not found</h3>
          <p className="mt-1 text-sm text-gray-500">The requested job does not exist.</p>
        </div>
      )}
    </div>
  );
}