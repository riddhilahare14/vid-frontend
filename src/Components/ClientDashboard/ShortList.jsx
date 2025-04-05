
import { useState } from 'react'

const initialEditors = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    specialization: 'VFX',
    rating: 4.8,
    tagline: 'Bringing your vision to life with stunning visual effects',
    tags: ['Animation', 'Affordable'],
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    specialization: 'Short Films',
    rating: 4.5,
    tagline: 'Crafting compelling narratives through expert editing',
    tags: ['Storytelling', 'Fast Turnaround'],
  },
  // Add more editors...
]

export default function Shortlist() {
  const [editors, setEditors] = useState(initialEditors)
  const [selectedEditors, setSelectedEditors] = useState([])

  const toggleEditorSelection = (id) => {
    setSelectedEditors(prev =>
      prev.includes(id) ? prev.filter(editorId => editorId !== id) : [...prev, id]
    )
  }

  const inviteSelectedEditors = () => {
    // Implement invitation logic here
    console.log('Inviting editors:', selectedEditors)
  }

  const removeSelectedEditors = () => {
    setEditors(prev => prev.filter(editor => !selectedEditors.includes(editor.id)))
    setSelectedEditors([])
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Shortlisted Editors</h3>
        <div className="flex space-x-2">
          <button
            onClick={inviteSelectedEditors}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Invite Selected
          </button>
          <button
            onClick={removeSelectedEditors}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Remove Selected
          </button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {editors.map((editor) => (
          <li key={editor.id}>
            <div className="px-4 py-4 sm:px-6 flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={selectedEditors.includes(editor.id)}
                onChange={() => toggleEditorSelection(editor.id)}
              />
              <div className="ml-4 flex-shrink-0">
                <img className="h-12 w-12 rounded-full" src={editor.avatar || "/placeholder.svg"} alt="" />
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
                  <p className="flex items-center text-sm text-gray-500">
                    {editor.tagline}
                  </p>
                  <div className="flex items-center">
                    <svg className="text-yellow-400 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <p className="ml-1 text-sm text-gray-500">{editor.rating}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap">
                  {editor.tags.map((tag, index) => (
                    <span key={index} className="mr-2 mb-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

