import { useState } from 'react'

const initialTransactions = [
  {
    id: 1,
    date: '2023-06-01',
    projectName: 'Corporate Video Edit',
    amount: 500,
    paymentMethod: 'PayPal',
    invoiceLink: '#',
  },
  {
    id: 2,
    date: '2023-05-15',
    projectName: 'Wedding Highlight Reel',
    amount: 750,
    paymentMethod: 'Credit Card',
    invoiceLink: '#',
  },
  // Add more transactions...
]

export default function PaymentHistory() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [sortOrder, setSortOrder] = useState('desc')
  const [filterDate, setFilterDate] = useState('')

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.amount - b.amount
    } else {
      return b.amount - a.amount
    }
  })

  const filteredTransactions = filterDate
    ? sortedTransactions.filter(t => t.date.startsWith(filterDate))
    : sortedTransactions

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Payment History</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Your recent transactions and invoices.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <span className="mr-2">Filter by date:</span>
              <input
                type="month"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sort {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.projectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href={transaction.invoiceLink} className="text-indigo-600 hover:text-indigo-900">
                      View Invoice
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

