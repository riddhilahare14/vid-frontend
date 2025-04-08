import { Clock, DollarSign, PauseCircle } from "lucide-react"

export function GigSettings() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-900">
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gig & Work Preferences</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage your service offerings and availability</p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Availability Status</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Let clients know if you're currently accepting new work
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Available</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
                </label>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/20">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">Response Time Expectation</h5>
                  <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                    Set client expectations for how quickly you typically respond
                  </p>
                  <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                    <option value="1">Within 1 hour</option>
                    <option value="4" selected>
                      Within 4 hours
                    </option>
                    <option value="24">Within 24 hours</option>
                    <option value="48">Within 2 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">Pricing & Rates</h4>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hourly Rate</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    defaultValue="65"
                    className="w-full rounded-md border border-gray-300 bg-white pl-8 pr-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Minimum</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    defaultValue="250"
                    className="w-full rounded-md border border-gray-300 bg-white pl-8 pr-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience Level</label>
                <span className="text-sm text-gray-500 dark:text-gray-400">Expert</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="absolute h-2 w-[85%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white bg-indigo-600 shadow-md dark:border-gray-800"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">Active Gigs</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Professional Video Editing</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Starting at $150</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    Edit
                  </button>
                  <button className="flex items-center rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <PauseCircle className="mr-1 h-4 w-4" />
                    Pause
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Motion Graphics & Animation</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Starting at $250</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                    Edit
                  </button>
                  <button className="flex items-center rounded-md px-3 py-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <PauseCircle className="mr-1 h-4 w-4" />
                    Pause
                  </button>
                </div>
              </div>
            </div>

            <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              Create New Gig
            </button>
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">Client Requirements</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Requirements Template
              </label>
              <textarea
                className="min-h-[120px] w-full rounded-md border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                defaultValue="1. Project brief and goals
2. Reference videos or examples
3. Brand guidelines (if applicable)
4. Raw footage format and resolution
5. Specific editing style preferences"
              ></textarea>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This template will be shown to clients when they request a custom quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

