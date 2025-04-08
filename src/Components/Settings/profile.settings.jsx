import { Camera } from "lucide-react"

export function ProfileSettings() {
  // Read-only data
  const userData = {
    name: "John Doe",
    username: "johndoe",
    bio: "Video Editor with 5+ years in YouTube content specializing in motion graphics and color grading. Worked with top creators and brands to deliver high-quality video content.",
    skills: ["Motion Graphics", "Color Grading", "Video Editing", "After Effects", "Premiere Pro"],
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-900">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
        <h2 className="text-xl font-bold">Profile Information</h2>
        <p className="text-blue-100">Your professional information visible to clients</p>
      </div>
      <div className="p-6">
        <div className="space-y-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
                  <img src="/placeholder.svg?height=96&width=96" alt="Profile" className="h-full w-full object-cover" />
                </div>
                <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-transform hover:scale-110">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">Recommended: 400x400px</div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    {userData.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                    {userData.username}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Bio</label>
                <div className="min-h-[120px] rounded-lg border border-gray-200 bg-gray-50 p-3 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                  {userData.bio}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Brief description of your skills and experience
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills & Expertise</label>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Visibility</label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Public Profile</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Make your profile visible to everyone</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Available for Work</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show clients you're open to new projects</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">Featured Creator</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Apply to be featured on our homepage</p>
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
    </div>
  )
}

