import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', completed: 4 },
  { month: 'Feb', completed: 3 },
  { month: 'Mar', completed: 5 },
  { month: 'Apr', completed: 7 },
  { month: 'May', completed: 6 },
  { month: 'Jun', completed: 8 },
]

export default function ProgressAnalytics() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Progress Analytics</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Your project completion trends.</p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

