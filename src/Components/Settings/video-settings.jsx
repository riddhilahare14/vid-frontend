import { FileVideo, Lock, Upload } from "lucide-react"

export function VideoSettings() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-slate-900">
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Video Tools & Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Configure video-specific preferences for your portfolio and deliverables
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">Upload Settings</h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Maximum File Size</label>
                <span className="text-sm text-gray-500 dark:text-gray-400">500 MB</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="absolute h-2 w-[50%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white bg-indigo-600 shadow-md dark:border-gray-800"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>100 MB</span>
                <span>500 MB</span>
                <span>1 GB</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Default Video Format</label>
              <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                <option value="mp4" selected>
                  MP4 (H.264)
                </option>
                <option value="mov">MOV (QuickTime)</option>
                <option value="avi">AVI</option>
                <option value="webm">WebM</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This format will be used for preview videos and default exports
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Default Resolution</label>
              <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                <option value="720p">720p (HD)</option>
                <option value="1080p" selected>
                  1080p (Full HD)
                </option>
                <option value="2k">2K</option>
                <option value="4k">4K (Ultra HD)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Portfolio Watermark</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add your logo or name to portfolio videos</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
              </label>
            </div>

            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center dark:border-gray-600">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <Upload className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">Upload Watermark Image</h3>
                <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                  PNG or SVG with transparent background recommended
                </p>
                <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                  Select Image
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
                <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right" selected>
                    Bottom Right
                  </option>
                  <option value="center">Center</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Opacity</label>
                <div className="pt-2">
                  <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="absolute h-2 w-[50%] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-white bg-indigo-600 shadow-md dark:border-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Video Privacy</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Control who can view your portfolio videos</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <FileVideo className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">Public Videos</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Anyone can view these videos on your profile
                  </p>
                </div>
                <select className="w-[140px] rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                  <option value="all" selected>
                    All Videos
                  </option>
                  <option value="selected">Selected Only</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
                  <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">Private Videos</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Only visible to clients you've shared with</p>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-[140px] rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-base font-medium text-gray-900 dark:text-white">Video Player Settings</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">Autoplay Portfolio Videos</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Videos will play automatically when a client views your profile
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">Loop Videos</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Videos will play on repeat</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">Show Controls</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Display playback controls on portfolio videos
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
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

