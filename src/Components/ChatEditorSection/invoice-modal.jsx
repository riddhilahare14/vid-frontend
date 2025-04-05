import { useState } from "react"
import { X, FileText, Check } from "lucide-react"

export default function InvoiceModal({ project, onClose }) {
  const [invoiceStatus, setInvoiceStatus] = useState("draft") // draft, pending, paid

  const totalHours = project.tasks.reduce((sum, task) => sum + task.hours, 0)
  const totalCost = project.tasks.reduce((sum, task) => sum + task.cost, 0)
  const commission = Math.round(totalCost * 0.1)
  const grandTotal = totalCost + commission

  const handleSendInvoice = () => {
    setInvoiceStatus("pending")
    // In a real app, this would send the invoice to the client
    setTimeout(() => {
      setInvoiceStatus("paid")
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl overflow-hidden shadow-xl transform transition-all">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-400" />
            Generate Invoice
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">{project.name}</h2>
              <p className="text-gray-400 text-sm">Invoice #{project.id.replace("proj-", "INV-")}</p>
              <p className="text-gray-400 text-sm">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium">Vidlancing</h3>
              <p className="text-gray-400 text-sm">123 Editor Street</p>
              <p className="text-gray-400 text-sm">Creative City, CC 12345</p>
            </div>
          </div>

          <div className="border border-gray-700 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-3">Task</th>
                  <th className="text-center p-3">Hours</th>
                  <th className="text-right p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {project.tasks.map((task) => (
                  <tr key={task.id} className="border-t border-gray-700">
                    <td className="p-3">{task.name}</td>
                    <td className="p-3 text-center">{task.hours}</td>
                    <td className="p-3 text-right">${task.cost.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-700 bg-gray-700/30">
                  <td className="p-3 font-medium">Subtotal</td>
                  <td className="p-3 text-center">{totalHours}</td>
                  <td className="p-3 text-right">${totalCost.toFixed(2)}</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-3">Platform Commission (10%)</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-right">${commission.toFixed(2)}</td>
                </tr>
                <tr className="border-t border-gray-700 bg-gray-700/50">
                  <td className="p-3 font-bold">Total</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-right font-bold">${grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg mb-6">
            <h4 className="font-medium mb-2">Payment Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Payment Method:</p>
                <p>Credit Card / PayPal</p>
              </div>
              <div>
                <p className="text-gray-400">Due Date:</p>
                <p>{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {invoiceStatus === "paid" && (
                <div className="bg-green-900/30 text-green-500 px-4 py-2 rounded-lg flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Payment Received
                </div>
              )}
              {invoiceStatus === "pending" && (
                <div className="bg-yellow-900/30 text-yellow-500 px-4 py-2 rounded-lg flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                  Payment Pending
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
              >
                Close
              </button>

              {invoiceStatus === "draft" && (
                <button
                  onClick={handleSendInvoice}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
                >
                  Send Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

