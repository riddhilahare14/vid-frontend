"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Stepper } from "./stepper"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Button } from "./button"
import { Dropdown } from "./dropdown"
import { useDispatch } from "react-redux"
import { setJob } from "../../features/JobSlicer.js"

const CATEGORIES = [
  { value: "wedding", label: "Wedding Videos" },
  { value: "corporate", label: "Corporate Videos" },
  { value: "social", label: "Social Media Content" },
  { value: "music", label: "Music Videos" },
]

const WORK_LEVELS = ["Easy", "Intermediate", "Hard"]
const DURATIONS = ["Short term", "Medium term", "Long term"]
const KEY_RESPONSIBILITIES = ["Video Production", "Color Grading", "Effects", "Transitions"]
const REQUIRED_SKILLS = ["Video Editing", "Color Correction", "Sound Design", "Motion Graphics"]
const TOOLS = ["Adobe Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "After Effects"]

export default function JobPosting() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: [],
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    workLevel: [],
    duration: [],
    keyResponsibilities: [],
    avgVideoLength: "",
    requiredSkills: [],
    tools: [],
    name: "",
    email: "",
    company: "",
    skills: "",
    scope: "",
    jobDifficulty: "",
    projectLength: "",
    videoFile: null,
    note: "", // Changed from noteFile to note (text)
  })
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.title) newErrors.title = "Job title is required"
      if (!formData.description) newErrors.description = "Job description is required"
      if (formData.category.length === 0) newErrors.category = "Category is required"
    } else if (currentStep === 2) {
      if (!formData.budgetMin || !formData.budgetMax) {
        newErrors.budget = "Budget range is required"
      } else if (Number.parseFloat(formData.budgetMin) >= Number.parseFloat(formData.budgetMax)) {
        newErrors.budget = "Minimum budget must be less than maximum budget"
      }
      if (!formData.deadline) {
        newErrors.deadline = "Deadline is required"
      } else if (new Date(formData.deadline) < new Date().setHours(0, 0, 0, 0)) {
        newErrors.deadline = "Deadline cannot be in the past"
      }
      if (formData.requiredSkills.length === 0) newErrors.requiredSkills = "Required skills are required"
      if (!formData.scope) newErrors.scope = "Project scope is required"
    } else if (currentStep === 3) {
      if (!formData.name) newErrors.name = "Your name is required"
      if (!formData.email) newErrors.email = "Email address is required"
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1)
    }
  }

  const handlePrevious = () => {
    setStep((s) => s - 1)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleDropdownChange = (name) => (selected) => {
    setFormData((prev) => ({ ...prev, [name]: selected }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, [type]: file }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newJob = {
      id: Date.now(), // Generate a unique ID
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()), // Convert skills string to array
      postedTime: "Just now",
      isVerified: true,
      level: "Intermediate",
      duration: "Long term",
      location: "Remote",
      proposals: 0,
      categoryColor: "blue",
    }
    dispatch(setJob(newJob))
    alert("Job posted successfully!")
    console.log("Job posted:", newJob)

    // Reset form data after submission
    setFormData({
      title: "",
      description: "",
      category: [],
      budgetMin: "",
      budgetMax: "",
      deadline: "",
      workLevel: [],
      duration: [],
      keyResponsibilities: [],
      avgVideoLength: "",
      requiredSkills: [],
      tools: [],
      name: "",
      email: "",
      company: "",
      skills: "",
      scope: "",
      jobDifficulty: "",
      projectLength: "",
      videoFile: null,
      note: "", // Reset note as text
    })
    setStep(1) // Reset to first step
  }

  const renderPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Preview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Job Title</h3>
          <p>{formData.title}</p>
        </div>
        <div>
          <h3 className="font-semibold">Category</h3>
          <p>{formData.category.join(", ")}</p>
        </div>
        <div>
          <h3 className="font-semibold">Job Difficulty</h3>
          <p>{formData.jobDifficulty}</p>
        </div>
        <div>
          <h3 className="font-semibold">Project Length</h3>
          <p>{formData.projectLength}</p>
        </div>
        <div>
          <h3 className="font-semibold">Budget</h3>
          <p>
            ${formData.budgetMin} - ${formData.budgetMax}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Deadline</h3>
          <p>{formData.deadline}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Job Description</h3>
        <p>{formData.description}</p>
      </div>
      <div>
        <h3 className="font-semibold">Key Responsibilities</h3>
        <p>{formData.keyResponsibilities.join(", ")}</p>
      </div>
      <div>
        <h3 className="font-semibold">Required Skills</h3>
        <p>{formData.requiredSkills.join(", ")}</p>
      </div>
      <div>
        <h3 className="font-semibold">Required Tools</h3>
        <p>{formData.tools.join(", ")}</p>
      </div>
      <div>
        <h3 className="font-semibold">Project Scope</h3>
        <p>{formData.scope}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Your Name</h3>
          <p>{formData.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Email Address</h3>
          <p>{formData.email}</p>
        </div>
      </div>
      {formData.company && (
        <div>
          <h3 className="font-semibold">Company</h3>
          <p>{formData.company}</p>
        </div>
      )}
      {formData.note && (
        <div>
          <h3 className="font-semibold">Additional Note</h3>
          <p>{formData.note}</p>
        </div>
      )}
      <div>
        <h3 className="font-semibold">Uploaded Video</h3>
        <p>{formData.videoFile ? formData.videoFile.name : "None"}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-center mb-2">Post a Video Editing Job</h1>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below to post your video editing job and find the perfect freelancer.
          </p>

          <Stepper currentStep={step} steps={4} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <Input
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Wedding Video Editor Needed"
                  error={errors.title}
                />
                <Textarea
                  label="Job Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the job requirements and expectations..."
                  error={errors.description}
                />
                <Dropdown
                  label="Category"
                  options={CATEGORIES.map((c) => c.label)}
                  selectedOptions={formData.category}
                  onChange={handleDropdownChange("category")}
                  error={errors.category}
                />
                <Dropdown
                  label="Job Difficulty"
                  options={WORK_LEVELS}
                  selectedOptions={formData.jobDifficulty}
                  onChange={handleDropdownChange("jobDifficulty")}
                />
                <Dropdown
                  label="Project Length"
                  options={DURATIONS}
                  selectedOptions={formData.projectLength}
                  onChange={handleDropdownChange("projectLength")}
                />
                <Dropdown
                  label="Key Responsibilities"
                  options={KEY_RESPONSIBILITIES}
                  selectedOptions={formData.keyResponsibilities}
                  onChange={handleDropdownChange("keyResponsibilities")}
                />
                <Dropdown
                  label="Tools"
                  options={TOOLS}
                  selectedOptions={formData.tools}
                  onChange={handleDropdownChange("tools")}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Budget Min"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    type="number"
                    placeholder="Min"
                    error={errors.budget}
                  />
                  <Input
                    label="Budget Max"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    type="number"
                    placeholder="Max"
                    error={errors.budget}
                  />
                </div>
                <Input
                  label="Deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  type="date"
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  error={errors.deadline}
                />
                <Dropdown
                  label="Required Skills"
                  options={REQUIRED_SKILLS}
                  selectedOptions={formData.requiredSkills}
                  onChange={handleDropdownChange("requiredSkills")}
                  error={errors.requiredSkills}
                />
                <Textarea
                  label="Project Scope"
                  name="scope"
                  value={formData.scope}
                  onChange={handleChange}
                  placeholder="Describe the scope of your project, including any specific requirements or milestones..."
                  error={errors.scope}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <Input
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <Input
                  label="Company Name (Optional)"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <label
                    htmlFor="videoFile"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      <span>Drag and drop a sample video or click to upload</span>
                    </p>
                  </label>
                  <input
                    type="file"
                    id="videoFile"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, "videoFile")}
                  />
                </div>
                <Textarea
                  label="Additional Note (Optional)"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Add any additional notes or instructions for freelancers..."
                />
              </div>
            )}

            {step === 4 && (
              <>
                {renderPreview()}
                <div className="flex justify-end mt-6">
                  <Button type="button" variant="outline" className="mr-4" onClick={() => setStep(1)}>
                    Edit
                  </Button>
                  <Button type="submit">Post Job</Button>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && step < 4 && (
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <div className="ml-auto">
                {step < 4 ? (
                  <Button type="button" onClick={handleNext}>
                    {step === 3 ? "Preview" : "Next"}
                  </Button>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

