import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios'; // Adjust path

export default function Shortlist({ jobId: propJobId }) {
  const [editors, setEditors] = useState([]);
  const [selectedEditors, setSelectedEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract jobId from route if not provided as prop
  const { jobId: routeJobId } = useParams();
  const location = useLocation();
  const jobId = propJobId || routeJobId;

  // Debug jobId sources
  console.log('Shortlist Debug:', {
    propJobId,
    routeJobId,
    jobId,
    location: location.pathname,
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!jobId) {
          throw new Error('Please select a job to view its shortlisted applicants.');
        }

        if (isNaN(parseInt(jobId))) {
          throw new Error('Invalid Job ID. Job ID must be a number.');
        }

        const response = await axiosInstance.get(`/jobs/${jobId}/applications`);
        const applications = response.data.data || [];

        const mappedEditors = applications.map((app) => ({
          id: app.freelancerId,
          name: `${app.freelancer.firstname || 'Unknown'} ${app.freelancer.lastname || ''}`.trim(),
          avatar: app.freelancer.profilePicture || '/placeholder.svg',
          specialization: app.freelancer.freelancerProfile?.jobTitle || 'Freelancer',
          rating: app.freelancer.rating || 4.0,
          tagline: app.freelancer.freelancerProfile?.overview || app.aboutFreelancer || 'No description provided',
          tags: app.freelancer.freelancerProfile?.skills || ['Freelancer'],
        }));

        console.log('Fetched Applications:', applications);
        setEditors(mappedEditors);
        if (applications.length === 0) {
          toast.info('No applications found for this job.');
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err.message || 'Failed to load applications. Please try again.');
        toast.error(err.message || 'Failed to load applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const toggleEditorSelection = (id) => {
    setSelectedEditors((prev) =>
      prev.includes(id) ? prev.filter((editorId) => editorId !== id) : [...prev, id]
    );
  };

  const inviteSelectedEditors = async () => {
    if (selectedEditors.length === 0) {
      toast.warn('Please select at least one editor to invite.');
      return;
    }
    try {
      for (const freelancerId of selectedEditors) {
        await axiosInstance.post(`/jobs/apply/${jobId}/accept`, { freelancerId });
      }
      setEditors((prev) => prev.filter((editor) => !selectedEditors.includes(editor.id)));
      setSelectedEditors([]);
      toast.success('Selected editors invited successfully!');
    } catch (err) {
      console.error('Error inviting editors:', err);
      toast.error('Failed to invite editors. Please try again.');
    }
  };

  const removeSelectedEditors = async () => {
    if (selectedEditors.length === 0) {
      toast.warn('Please select at least one editor to remove.');
      return;
    }
    try {
      for (const freelancerId of selectedEditors) {
        await axiosInstance.post(`/jobs/apply/${jobId}/reject`, { freelancerId });
      }
      setEditors((prev) => prev.filter((editor) => !selectedEditors.includes(editor.id)));
      setSelectedEditors([]);
      toast.success('Selected editors removed successfully!');
    } catch (err) {
      console.error('Error removing editors:', err);
      toast.error('Failed to remove editors. Please try again.');
    }
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    setEditors([]);
  };

  if (!jobId) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center text-gray-500">
        <p>Please select a job from the list to view its shortlisted applicants.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Shortlisted Editors</h3>
        <div className="flex space-x-2">
          <button
            onClick={inviteSelectedEditors}
            disabled={selectedEditors.length === 0 || loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Invite Selected
          </button>
          <button
            onClick={removeSelectedEditors}
            disabled={selectedEditors.length === 0 || loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Remove Selected
          </button>
        </div>
      </div>
      {loading && (
        <div className="px-4 py-4 text-center text-gray-500">
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
          <p>Loading applications...</p>
        </div>
      )}
      {error && (
        <div className="px-4 py-4 text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={retryFetch}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && editors.length === 0 && (
        <p className="px-4 py-4 text-center text-gray-500">No applications found for this job.</p>
      )}
      {!loading && !error && editors.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {editors.map((editor) => (
            <li key={editor.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={selectedEditors.includes(editor.id)}
                  onChange={() => toggleEditorSelection(editor.id)}
                  disabled={loading}
                />
                <div className="ml-4 flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={editor.avatar}
                    alt={`${editor.name}'s avatar`}
                    onError={(e) => (e.target.src = '/placeholder.svg')}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{editor.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {editor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <p className="flex items-center text-sm text-gray-500">{editor.tagline}</p>
                    <div className="flex items-center">
                      <svg className="text-yellow-400 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <p className="ml-1 text-sm text-gray-500">{editor.rating.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    {editor.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="mr-2 mb-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
