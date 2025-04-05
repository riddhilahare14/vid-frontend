import { useState } from "react"
import { ArrowRight, Check, Clock, FileVideo, Upload, DollarSign } from "lucide-react"

export default function BriefBuilder({ onClose }) {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                step > index + 1
                  ? "bg-orange-500 text-white"
                  : step === index + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {step > index + 1 ? <Check size={16} /> : index + 1}
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-orange-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Project Details</span>
          <span>Style & References</span>
          <span>Timeline & Budget</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step content */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Project Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
            <input
              type="text"
              placeholder="e.g., Product Launch Video"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Description
            </label>
            <textarea
              placeholder="Describe your project in detail..."
              rows={4}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video Length</label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>15-30 seconds</option>
              <option>30-60 seconds</option>
              <option>1-2 minutes</option>
              <option>2-5 minutes</option>
              <option>5+ minutes</option>
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Style & References</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video Style</label>
            <div className="grid grid-cols-3 gap-3">
              <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 hover:border-orange-500 transition-colors">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-2 flex items-center justify-center">
                  <FileVideo size={24} className="text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">Professional</p>
              </div>
              <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 hover:border-orange-500 transition-colors">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-2 flex items-center justify-center">
                  <FileVideo size={24} className="text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">Casual</p>
              </div>
              <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 hover:border-orange-500 transition-colors">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md mb-2 flex items-center justify-center">
                  <FileVideo size={24} className="text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">Animated</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mood</label>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                Fun
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Serious
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Inspirational
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Informative
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Emotional
              </span>
            </div>
            <div className="mt-2 p-3 bg-orange-50 dark:bg-gray-800 rounded-md border border-orange-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">AI Suggestion:</span> "Fun" style typically includes bright colors, upbeat
                tempo, and energetic transitions.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reference Files</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Drag and drop files here, or click to browse
              </p>
              <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 dark:text-orange-400 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Upload Files
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Timeline & Budget</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
            <div className="flex items-center">
              <Clock size={20} className="text-gray-400 mr-2" />
              <input
                type="date"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
            <div className="flex items-center">
              <DollarSign size={20} className="text-gray-400 mr-2" />
              <input
                type="number"
                placeholder="Enter your budget"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number of Revisions
            </label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>1 Revision</option>
              <option>2 Revisions</option>
              <option>3 Revisions</option>
              <option>Unlimited Revisions</option>
            </select>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-gray-800 rounded-md border border-orange-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Budget Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Editor Fee</span>
                <span className="text-gray-800 dark:text-gray-200">$120</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Vidlancing Fee</span>
                <span className="text-gray-800 dark:text-gray-200">$30</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-orange-200 dark:border-gray-700">
                <span className="text-gray-800 dark:text-gray-200">Total</span>
                <span className="text-gray-800 dark:text-gray-200">$150</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Review Your Brief</h3>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Project Details</h4>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-1/3">Title:</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Product Launch Video</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-1/3">Length:</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">1-2 minutes</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-1/3">Style:</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Professional, Fun</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Timeline & Budget</h4>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-1/3">Deadline:</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">March 28, 2025</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-1/3">Budget:</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">$150</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-1/3">Revisions:</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">2 Revisions</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-900/30">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-green-800 dark:text-green-400">Ready to Submit</h4>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-500">
                    Your brief is complete and ready to be submitted to our editors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-end">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mr-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Back
          </button>
        )}

        <button
          onClick={nextStep}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:from-orange-600 hover:to-pink-600 transition-all flex items-center"
        >
          {step === totalSteps ? "Submit Brief" : "Next"}
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  )
}

