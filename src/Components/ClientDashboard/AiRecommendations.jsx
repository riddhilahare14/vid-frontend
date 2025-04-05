export default function AIRecommendations() {
    const recommendations = [
      {
        id: 1,
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        specialization: 'Motion Graphics',
        match: 95,
      },
      {
        id: 2,
        name: 'Michael Lee',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        specialization: 'Color Grading',
        match: 88,
      },
      // Add more recommendations...
    ]
  
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">AI-Driven Recommendations</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Editors that best match your project requirements.</p>
        </div>
        <ul className="divide-y divide-gray-200">
          {recommendations.map((editor) => (
            <li key={editor.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={editor.avatar || "/placeholder.svg"} alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{editor.name}</div>
                  <div className="text-sm text-gray-500">{editor.specialization}</div>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {editor.match}% Match
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  