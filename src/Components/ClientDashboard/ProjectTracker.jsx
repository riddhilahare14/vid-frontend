import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProjectTracker() {
  const [categories] = useState({
    Active: [
      {
        id: 1,
        title: 'Corporate Video Edit',
        description: 'Editing a 5-minute corporate promotional video',
        status: 'Editing',
        progress: 60,
        editor: {
          name: 'Jane Doe',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          specialization: 'Corporate Videos',
        },
        milestones: [
          { name: 'First Draft', deadline: '2023-06-15', completed: true },
          { name: 'Client Review', deadline: '2023-06-20', completed: false },
          { name: 'Final Delivery', deadline: '2023-06-25', completed: false },
        ],
      },
      // Add more active projects...
    ],
    Pending: [
      {
        id: 2,
        title: 'Wedding Highlight Reel',
        description: 'Creating a 3-minute highlight reel from a wedding video',
        budget: '$500',
        deadline: '2023-07-10',
        shortlistedEditors: 3,
      },
      // Add more pending projects...
    ],
    Completed: [
      {
        id: 3,
        title: 'Music Video Edit',
        description: 'Edited a 4-minute music video for an indie band',
        editor: {
          name: 'John Smith',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        completionDate: '2023-05-30',
        rating: 4.5,
        invoiceLink: '#',
      },
      // Add more completed projects...
    ],
  })

  return (
    <div className="w-full px-2 py-16 sm:px-0">
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
              {category}
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
              <ul>
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {project.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{project.description}</li>
                      {'status' in project && (
                        <><li>&middot;</li><li>{project.status}</li></>
                      )}
                      {'budget' in project && (
                        <>
                          <li>&middot;</li>
                          <li>Budget: {project.budget}</li>
                        </>
                      )}
                      {'completionDate' in project && (
                        <>
                          <li>&middot;</li>
                          <li>Completed: {project.completionDate}</li>
                        </>
                      )}
                    </ul>

                    {'editor' in project && project.editor && (
                      <div className="mt-2 flex items-center">
                        <img
                          src={project.editor.avatar || "/placeholder.svg"}
                          alt=""
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{project.editor.name}</p>
                          {'specialization' in project.editor && (
                            <p className="text-sm text-gray-500">{project.editor.specialization}</p>
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

                    {'milestones' in project && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-900">Milestones</h4>
                        <ul className="mt-1 space-y-1">
                          {project.milestones.map((milestone, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <span className={`mr-2 ${milestone.completed ? 'text-green-500' : 'text-gray-400'}`}>
                                {milestone.completed ? '✓' : '○'}
                              </span>
                              <span>{milestone.name} - {milestone.deadline}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {'rating' in project && (
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-400">{'★'.repeat(Math.round(project.rating))}</span>
                        <span className="ml-1 text-sm text-gray-500">{project.rating}/5</span>
                      </div>
                    )}

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

