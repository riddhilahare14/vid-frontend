import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { XCircle, CheckCircle } from "lucide-react";

export default function JobApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

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
            userId: app.freelancer?.id,
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
  const handleSelect = (applicant) => {
    setSelectedApplicant(applicant);
    setShowConfirmModal(true);
  };

  const handleConfirmSelect = async () => {
    try {
      console.log(`[JobApplicants] Selecting applicant:`, {
        jobId,
        freelancerId: selectedApplicant.freelancer.id
      });

      const response = await axiosInstance.post(`/jobs/${jobId}/accept`, {
        freelancerId: selectedApplicant.freelancer.id
      });

      console.log('[JobApplicants] Selection response:', response.data);

      if (response.data.success) {
        // Update local state
        setApplicants(prevApplicants => 
          prevApplicants.map(app => ({
            ...app,
            status: app.freelancer.id === selectedApplicant.freelancer.id ? "accepted" : "rejected"
          }))
        );

        // Close modal
        setShowConfirmModal(false);
        setSelectedApplicant(null);

        // Show success message
        toast.success("Applicant selected successfully! All other applicants have been notified.");
        
                  // Redirect to accepted jobs after a short delay
        setTimeout(() => {
          navigate('/client-dashboard/accepted-jobs');
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Failed to select applicant');
      }
    } catch (error) {
      console.error("[JobApplicants] Error selecting applicant:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to select applicant. Please try again.";
      toast.error(errorMessage);
      
      // Keep the modal open if there's an error
      setShowConfirmModal(true);
    }
  };

  // Handle remove (reject) applicant
  const handleRemove = (applicantId) => {
    console.log('Removing applicant with ID:', applicantId);
    setApplicants((prev) =>
      prev.map((app) => (app.id === applicantId ? { ...app, status: 'rejected' } : app))
    );
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

  // Handle view profile
  const handleViewProfile = (freelancerId) => {
    navigate(`/freelancerProfile/${freelancerId}`);
  };

  // Sorted applicants
  const sortedApplicants = sortApplicants(applicants.filter(applicant => applicant.status !== 'rejected'));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Job Applicants</h1>
      {isLoading ? (
        <div className="text-center py-10">Loading applicants...</div>
      ) : applicants.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No applicants found for this job.</div>
      ) : (
        <div className="space-y-6">
          {/* Sorting controls */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleSortChange('createdAt')}
              className={`px-4 py-2 rounded ${
                sortBy === 'createdAt' ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}
            >
              Sort by Date {sortBy === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
          </div>

          {/* Applicants list */}
          {sortedApplicants.map((applicant) => (
            <div key={applicant.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{applicant.name}</h3>
                  <p className="text-gray-600 mt-1">{applicant.email}</p>
                  <p className="text-gray-500 text-sm mt-2">Applied on: {applicant.createdAt}</p>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Cover Letter:</h4>
                    <p className="text-gray-700">{applicant.coverLetter}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleViewProfile(applicant.freelancer.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </button>
                  {applicant.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleSelect(applicant)}
                        className="flex items-center px-4 py-2 text-sm text-green-600 hover:text-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Select
                      </button>
                      <button
                        onClick={() => handleRemove(applicant.id)}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                  {applicant.status === 'accepted' && (
                    <span className="text-green-600 font-medium">Selected</span>
                  )}
                  {applicant.status === 'rejected' && (
                    <span className="text-red-600 font-medium">Rejected</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Confirm Selection</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to select{" "}
              <span className="font-semibold">
                {selectedApplicant?.freelancer.firstname} {selectedApplicant?.freelancer.lastname}
              </span>
              ? This will:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              <li>Move this job to Accepted status</li>
              <li>Reject all other applicants</li>
              <li>Send notifications to all applicants</li>
              <li>Remove this job from the Find Work section</li>
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedApplicant(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSelect}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}