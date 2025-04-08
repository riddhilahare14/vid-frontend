export function PrivacySettings() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-900">
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Privacy & Data</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your privacy settings and data preferences
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Profile Visibility */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Profile Visibility</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Control who can see your profile in search results
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
            </div>

            {/* Show Earnings */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Show Earnings</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Display your earnings on your public profile
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
            </div>

            {/* Data Sharing */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Data Sharing</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow usage data to be shared with third parties
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
