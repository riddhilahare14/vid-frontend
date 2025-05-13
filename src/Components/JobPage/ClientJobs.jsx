import { useState, useEffect } from 'react';
import { X, Users, Briefcase } from 'lucide-react';

export default function ClientJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch jobs data from API
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Make a request to the actual API endpoint
        const response = await fetch('http://localhost:3000/api/v1/client/jobs', {
          headers: {
            // Include authentication token from localStorage or your auth context
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleShowApplicants = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading your jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          Error: {error}. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Job Listings</h1>
        <p className="text-gray-600">Manage your job postings and review applicants</p>
      </header>

      {jobs.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
          <h2 className="text-xl font-semibold mb-2">No jobs posted yet</h2>
          <p className="text-gray-600 mb-4">Create your first job posting to start receiving applications</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {job.salary}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6">{job.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-2" />
                  <span>
                    {job.applicants?.length || 0} applicant{(!job.applicants || job.applicants.length !== 1) ? 's' : ''}
                  </span>
                </div>
                
                <button
                  onClick={() => handleShowApplicants(job)}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    job.applicants && job.applicants.length > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!job.applicants || job.applicants.length === 0}
                >
                  Show Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Applicants Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">
                Applicants for {selectedJob.title}
              </h3>
              <button 
                onClick={closeModal} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-96">
              {!selectedJob.applicants || selectedJob.applicants.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No applicants yet for this position.
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedJob.applicants.map((applicant) => (
                    <div key={applicant.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-semibold text-lg">{applicant.name}</h4>
                        <span className="text-gray-500">{applicant.experience} experience</span>
                      </div>
                      <p className="text-gray-600 mb-2">{applicant.email}</p>
                      <div className="mt-3">
                        <h5 className="font-medium mb-1">Cover Letter:</h5>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded">{applicant.coverLetter}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}