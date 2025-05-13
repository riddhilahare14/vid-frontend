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
          const response = await axiosInstance.get('/jobs');
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
          {activeTab === 'shortlist' && <Shortlist/>}
          {activeTab === 'payments' && <PaymentHistory />}
        </main>
      </div>
    </div>
  );
}