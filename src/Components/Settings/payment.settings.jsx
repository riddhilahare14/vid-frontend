import { CreditCard } from "lucide-react"

export function PaymentSettings() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-900">
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage your payment methods and preferences</p>
      </div>
      <div className="p-6">
        <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
          <button className="border-b-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400">
            Payment Methods
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Preferences
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Tax Information
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.5 12a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1 0-5h14a2.5 2.5 0 0 1 2.5 2.5Z" />
                    <path d="M16 8.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1.5" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">PayPal</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                  Edit
                </button>
                <button className="rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  Remove
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Credit Card</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">•••• •••• •••• 4242</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                  Edit
                </button>
                <button className="rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  Remove
                </button>
              </div>
            </div>

            <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

