import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import axiosInstance from "../../utils/axios"; // Adjust path to your axiosInstance

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectTracker() {
  const [categories, setCategories] = useState({
    Active: [],
    Pending: [],
    Completed: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/jobs', {
          params: { page: 1, limit: 50 }, // Adjust limit as needed
        });

        const jobs = response.data.data.jobs || [];

        // Categorize jobs based on status
        const activeJobs = jobs
          .filter((job) => ['ACCEPTED', 'IN_PROGRESS'].includes(job.status))
          .map((job) => ({
            id: job.id,
            title: job.title,
            description: job.description,
            status: job.status === 'IN_PROGRESS' ? 'Editing' : 'Assigned',
            progress: job.progress || 0,
            freelancer: job.freelancer
              ? {
                  name: `${job.freelancer.firstname} ${job.freelancer.lastname}`,
                  avatar: job.freelancer.profilePicture || '/placeholder.svg',
                  specialization:
                    job.freelancer.freelancerProfile?.jobTitle ||
                    job.freelancer.freelancerProfile?.skills?.[0] ||
                    'Freelancer',
                }
              : null,
            milestones: job.deadline
              ? [
                  { name: 'First Draft', deadline: new Date(job.deadline).toISOString().split('T')[0], completed: job.progress >= 50 },
                  { name: 'Client Review', deadline: new Date(job.deadline).toISOString().split('T')[0], completed: job.progress >= 75 },
                  { name: 'Final Delivery', deadline: new Date(job.deadline).toISOString().split('T')[0], completed: job.progress === 100 },
                ]
              : [],
          }));

        const pendingJobs = jobs
          .filter((job) => job.status === 'OPEN')
          .map((job) => ({
            id: job.id,
            title: job.title,
            description: job.description,
            budget: `$${job.budgetMin} - $${job.budgetMax}`,
            deadline: new Date(job.deadline).toISOString().split('T')[0],
            shortlistedEditors: job.proposals || 0,
          }));

        const completedJobs = jobs
          .filter((job) => job.status === 'COMPLETED')
          .map((job) => ({
            id: job.id,
            title: job.title,
            description: job.description,
            freelancer: job.freelancer
              ? {
                  name: `${job.freelancer.firstname} ${job.freelancer.lastname}`,
                  avatar: job.freelancer.profilePicture || '/placeholder.svg',
                }
              : null,
            completionDate: new Date(job.updatedAt).toISOString().split('T')[0],
            rating: job.freelancer?.rating || 4.5, // Fallback rating
            invoiceLink: `/invoices/${job.id}`, // Adjust based on your routing
          }));

        setCategories({
          Active: activeJobs,
          Pending: pendingJobs,
          Completed: completedJobs,
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      {loading && <p className="text-center text-gray-500">Loading jobs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category} ({categories[category].length})
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((projects, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {projects.length === 0 ? (
                  <p className="text-center text-gray-500">No {Object.keys(categories)[idx]} jobs found.</p>
                ) : (
                  <ul>
                    {projects.map((project) => (
                      <li
                        key={project.id}
                        className="relative rounded-md p-3 hover:bg-gray-100"
                      >
                        <h3 className="text-sm font-medium leading-5">{project.title}</h3>

                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                          <li>{project.description}</li>
                          {'status' in project && (
                            <>
                              <li>·</li>
                              <li>{project.status}</li>
                            </>
                          )}
                          {'budget' in project && (
                            <>
                              <li>·</li>
                              <li>Budget: {project.budget}</li>
                            </>
                          )}
                          {'completionDate' in project && (
                            <>
                              <li>·</li>
                              <li>Completed: {project.completionDate}</li>
                            </>
                          )}
                        </ul>

                        {'freelancer' in project && project.freelancer && (
                          <div className="mt-2 flex items-center">
                            <img
                              src={project.freelancer.avatar}
                              alt=""
                              className="h-10 w-10 rounded-full"
                              onError={(e) => (e.target.src = '/placeholder.svg')}
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{project.freelancer.name}</p>
                              {'specialization' in project.freelancer && (
                                <p className="text-sm text-gray-500">{project.freelancer.specialization}</p>
                              )}
                            </div>
                          </div>
                        )}

                        {'progress' in project && (
                          <div className="mt-2">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-500">{project.progress}%</span>
                            </div>
                          </div>
                        )}

                        {'milestones' in project && project.milestones.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-medium text-gray-900">Milestones</h4>
                            <ul className="mt-1 space-y-1">
                              {project.milestones.map((milestone, index) => (
                                <li key={index} className="flex items-center text-sm">
                                  <span
                                    className={`mr-2 ${milestone.completed ? 'text-green-500' : 'text-gray-400'}`}
                                  >
                                    {milestone.completed ? '✓' : '○'}
                                  </span>
                                  <span>
                                    {milestone.name} - {milestone.deadline}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {'rating' in project && (
                          <div className="mt-2 flex items-center">
                            <span className="text-yellow-400">
                              {'★'.repeat(Math.round(project.rating))}
                            </span>
                            <span className="ml-1 text-sm text-gray-500">{project.rating}/5</span>
                          </div>
                        )}

                        <a
                          href={`/jobs/${project.id}`}
                          className={classNames(
                            'absolute inset-0 rounded-md',
                            'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
}
