import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Link } from "react-router-dom"
import {
  ChevronDown,
  ChevronRight,
  X,
  Plus,
  Upload,
  Eye,
  Save,
  AlertCircle,
  Check,
  Edit3,
  DollarSign,
  Clock,
  RefreshCw,
  Tag,
  HelpCircle,
  FileText,
  Film,
} from "lucide-react"

export default function CreateGigForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    pricing: [
      {
        name: "Basic",
        price: "",
        deliveryTime: "3",
        revisions: "1",
        description: "",
      },
    ],
    thumbnail: null,
    thumbnailPreview: "",
    tags: [],
    addOns: [],
    requirements: "",
    faqs: [],
    sampleWork: [],
  })

  const [errors, setErrors] = useState({})
  const [tagInput, setTagInput] = useState("")
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const categories = ["Video Editing", "Motion Graphics", "Color Grading", "Animation", "VFX", "Other"]

  const popularTags = [
    "YouTube",
    "Wedding",
    "Corporate",
    "Vlog",
    "4K",
    "Music Video",
    "Social Media",
    "Commercial",
    "Documentary",
    "Cinematic",
  ]

  const deliveryTimeOptions = ["1", "2", "3", "5", "7", "14", "21", "30"]

  const revisionOptions = ["1", "2", "3", "5", "Unlimited"]

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  // Handle thumbnail upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          ...errors,
          thumbnail: "File size must be less than 10MB",
        })
        return
      }

      const fileType = file.type
      if (!fileType.match(/image\/(jpeg|png)/) && !fileType.match(/video\/mp4/)) {
        setErrors({
          ...errors,
          thumbnail: "File must be JPEG, PNG, or MP4",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setFormData({
          ...formData,
          thumbnail: file,
          thumbnailPreview: reader.result,
        })

        if (errors.thumbnail) {
          setErrors({
            ...errors,
            thumbnail: null,
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle drag and drop for thumbnail
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          ...errors,
          thumbnail: "File size must be less than 10MB",
        })
        return
      }

      const fileType = file.type
      if (!fileType.match(/image\/(jpeg|png)/) && !fileType.match(/video\/mp4/)) {
        setErrors({
          ...errors,
          thumbnail: "File must be JPEG, PNG, or MP4",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setFormData({
          ...formData,
          thumbnail: file,
          thumbnailPreview: reader.result,
        })

        if (errors.thumbnail) {
          setErrors({
            ...errors,
            thumbnail: null,
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle tag input
  const handleTagInput = (e) => {
    setTagInput(e.target.value)
  }

  const addTag = (tag) => {
    if (tag && formData.tags.length < 10 && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      })
      setTagInput("")
    }
  }

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(tagInput.trim())
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  // Handle pricing tiers
  const addPricingTier = () => {
    if (formData.pricing.length < 3) {
      const tierNames = ["Basic", "Standard", "Premium"]
      const newTier = {
        name: tierNames[formData.pricing.length],
        price: "",
        deliveryTime: "3",
        revisions: "1",
        description: "",
      }

      setFormData({
        ...formData,
        pricing: [...formData.pricing, newTier],
      })
    }
  }

  const removePricingTier = (index) => {
    if (formData.pricing.length > 1) {
      const newPricing = formData.pricing.filter((_, i) => i !== index)
      setFormData({
        ...formData,
        pricing: newPricing,
      })
    }
  }

  const updatePricingTier = (index, field, value) => {
    const newPricing = [...formData.pricing]
    newPricing[index] = {
      ...newPricing[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      pricing: newPricing,
    })
  }

  // Handle add-ons
  const addAddOn = () => {
    if (formData.addOns.length < 5) {
      const newAddOn = {
        name: "",
        price: "",
        description: "",
      }

      setFormData({
        ...formData,
        addOns: [...formData.addOns, newAddOn],
      })
    }
  }

  const removeAddOn = (index) => {
    const newAddOns = formData.addOns.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      addOns: newAddOns,
    })
  }

  const updateAddOn = (index, field, value) => {
    const newAddOns = [...formData.addOns]
    newAddOns[index] = {
      ...newAddOns[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      addOns: newAddOns,
    })
  }

  // Handle FAQs
  const addFaq = () => {
    if (formData.faqs.length < 5) {
      const newFaq = {
        question: "",
        answer: "",
      }

      setFormData({
        ...formData,
        faqs: [...formData.faqs, newFaq],
      })
    }
  }

  const removeFaq = (index) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      faqs: newFaqs,
    })
  }

  const updateFaq = (index, field, value) => {
    const newFaqs = [...formData.faqs]
    newFaqs[index] = {
      ...newFaqs[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      faqs: newFaqs,
    })
  }

  // Handle sample work
  const addSampleWork = (file) => {
    if (formData.sampleWork.length < 3) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          ...errors,
          sampleWork: "File size must be less than 10MB",
        })
        return
      }

      const fileType = file.type
      if (!fileType.match(/image\/(jpeg|png)/) && !fileType.match(/video\/mp4/)) {
        setErrors({
          ...errors,
          sampleWork: "File must be JPEG, PNG, or MP4",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const newSample = {
          file,
          preview: reader.result,
          type: file.type.includes("video") ? "video" : "image",
        }

        setFormData({
          ...formData,
          sampleWork: [...formData.sampleWork, newSample],
        })

        if (errors.sampleWork) {
          setErrors({
            ...errors,
            sampleWork: null,
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSampleWorkUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      addSampleWork(file)
    }
  }

  const removeSampleWork = (index) => {
    const newSampleWork = formData.sampleWork.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      sampleWork: newSampleWork,
    })
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    // Title validation
    if (!formData.title) {
      newErrors.title = "Title is required"
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters"
    } else if (formData.title.length > 60) {
      newErrors.title = "Title must be less than 60 characters"
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    // Description validation
    if (!formData.description) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters"
    }

    // Pricing validation
    const pricingErrors = []
    formData.pricing.forEach((tier, index) => {
      const tierErrors = {}

      if (!tier.price) {
        tierErrors.price = "Price is required"
      } else if (isNaN(tier.price) || Number(tier.price) < 5 || Number(tier.price) > 10000) {
        tierErrors.price = "Price must be between $5 and $10,000"
      }

      if (!tier.deliveryTime) {
        tierErrors.deliveryTime = "Delivery time is required"
      }

      if (Object.keys(tierErrors).length > 0) {
        pricingErrors[index] = tierErrors
      }
    })

    if (pricingErrors.length > 0) {
      newErrors.pricing = pricingErrors
    }

    // Thumbnail validation
    if (!formData.thumbnail) {
      newErrors.thumbnail = "Thumbnail is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission
  const handleSubmit = (status) => {
    if (status === "PUBLISH" && !validateForm()) {
      return
    }

    // Here you would typically send the data to your backend
    console.log("Submitting form with status:", status)
    console.log("Form data:", formData)

    // Redirect to gigs dashboard with success message
    router.push("/gigs-dashboard?success=true")
  }

  // Navigation between form steps
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Render form based on current step
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Basic Information</h3>
                <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Required</div>
              </div>
              <p className="text-gray-500">Let clients know what you offer and why they should choose you.</p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="title" className="block font-medium">
                  Gig Title
                </label>
                <span className={`text-sm ${formData.title.length > 60 ? "text-red-500" : "text-gray-500"}`}>
                  {formData.title.length}/60
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Professional YouTube Video Editing"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.title ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-purple-500"
                  }`}
                />
                {errors.title && (
                  <div className="absolute right-3 top-3 text-red-500">
                    <AlertCircle size={18} />
                  </div>
                )}
              </div>
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              <p className="text-sm text-gray-500">
                A catchy title helps your gig stand out and appear in search results.
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block font-medium">
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg appearance-none focus:outline-none transition-colors ${
                    errors.category ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-purple-500"
                  }`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-500" />
                </div>
                {errors.category && (
                  <div className="absolute right-8 top-3 text-red-500">
                    <AlertCircle size={18} />
                  </div>
                )}
              </div>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              <p className="text-sm text-gray-500">Choose a category to help clients find your gig.</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="description" className="block font-medium">
                  Description
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    {showMarkdownPreview ? (
                      <>
                        <Edit3 size={14} />
                        Edit
                      </>
                    ) : (
                      <>
                        <Eye size={14} />
                        Preview
                      </>
                    )}
                  </button>
                  <span className={`text-sm ${formData.description.length > 1000 ? "text-red-500" : "text-gray-500"}`}>
                    {formData.description.length}/1000
                  </span>
                </div>
              </div>

              {!showMarkdownPreview ? (
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what you'll do, your style, and what clients can expect."
                    rows={6}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.description ? "border-red-300 bg-red-50" : "border-gray-300 focus:border-purple-500"
                    }`}
                  />
                  {errors.description && (
                    <div className="absolute right-3 top-3 text-red-500">
                      <AlertCircle size={18} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[150px] bg-white">
                  {formData.description || "No description yet."}
                </div>
              )}

              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              <div className="text-sm text-gray-500 space-y-1">
                <p>Markdown supported: **bold**, *italic*, - bullet points</p>
                <p>Minimum 50 characters required. Be specific about what you offer.</p>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Link to="/gigs-dashboard" className="text-gray-500 hover:text-gray-700 font-medium">
                Cancel
              </Link>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                Next Step
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Pricing & Packages</h3>
                <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Required</div>
              </div>
              <p className="text-gray-500">Define your service tiers and pricing structure.</p>
            </div>

            {/* Pricing Tiers */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Pricing Tiers</h4>
                {formData.pricing.length < 3 && (
                  <button
                    type="button"
                    onClick={addPricingTier}
                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Tier
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formData.pricing.map((tier, index) => (
                  <div
                    key={index}
                    className={`relative border-2 rounded-xl p-5 transition-all ${
                      index === 0
                        ? "border-purple-200 bg-purple-50"
                        : index === 1
                          ? "border-blue-200 bg-blue-50"
                          : "border-teal-200 bg-teal-50"
                    }`}
                  >
                    {formData.pricing.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePricingTier(index)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    )}

                    <div className="space-y-4">
                      {/* Package Name */}
                      <div>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => updatePricingTier(index, "name", e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                            index === 0
                              ? "border-purple-300 focus:border-purple-500"
                              : index === 1
                                ? "border-blue-300 focus:border-blue-500"
                                : "border-teal-300 focus:border-teal-500"
                          }`}
                        />
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <DollarSign size={16} className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            value={tier.price}
                            onChange={(e) => updatePricingTier(index, "price", e.target.value)}
                            placeholder="e.g., 50"
                            className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none ${
                              errors.pricing && errors.pricing[index]?.price
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 focus:border-purple-500"
                            }`}
                          />
                        </div>
                        {errors.pricing && errors.pricing[index]?.price && (
                          <p className="text-red-500 text-xs">{errors.pricing[index].price}</p>
                        )}
                      </div>

                      {/* Delivery Time */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">Delivery Time</label>
                        <div className="relative">
                          <select
                            value={tier.deliveryTime}
                            onChange={(e) => updatePricingTier(index, "deliveryTime", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg appearance-none focus:outline-none ${
                              errors.pricing && errors.pricing[index]?.deliveryTime
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300 focus:border-purple-500"
                            }`}
                          >
                            {deliveryTimeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option} {Number.parseInt(option) === 1 ? "day" : "days"}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Clock size={16} className="text-gray-500" />
                          </div>
                        </div>
                        {errors.pricing && errors.pricing[index]?.deliveryTime && (
                          <p className="text-red-500 text-xs">{errors.pricing[index].deliveryTime}</p>
                        )}
                      </div>

                      {/* Revisions */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">Revisions</label>
                        <div className="relative">
                          <select
                            value={tier.revisions}
                            onChange={(e) => updatePricingTier(index, "revisions", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-purple-500"
                          >
                            {revisionOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <RefreshCw size={16} className="text-gray-500" />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={tier.description}
                          onChange={(e) => updatePricingTier(index, "description", e.target.value)}
                          placeholder="e.g., Up to 3-min video with basic cuts"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-Ons */}
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Add-Ons (Optional)</h4>
                  <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Optional</div>
                </div>
                {formData.addOns.length < 5 && (
                  <button
                    type="button"
                    onClick={addAddOn}
                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Service
                  </button>
                )}
              </div>

              {formData.addOns.length > 0 ? (
                <div className="space-y-4">
                  {formData.addOns.map((addOn, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap md:flex-nowrap gap-4 items-start border border-gray-200 rounded-lg p-4 bg-white"
                    >
                      <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          value={addOn.name}
                          onChange={(e) => updateAddOn(index, "name", e.target.value)}
                          placeholder="e.g., Rush Delivery"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="w-full md:w-1/5">
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <DollarSign size={16} className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            value={addOn.price}
                            onChange={(e) => updateAddOn(index, "price", e.target.value)}
                            placeholder="e.g., 20"
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-2/5">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input
                          type="text"
                          value={addOn.description}
                          onChange={(e) => updateAddOn(index, "description", e.target.value)}
                          placeholder="e.g., Delivered in 24 hours"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="flex items-center justify-center pt-6 md:pt-0">
                        <button
                          type="button"
                          onClick={() => removeAddOn(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-gray-500 mb-3">No add-ons yet</p>
                  <button
                    type="button"
                    onClick={addAddOn}
                    className="px-4 py-2 bg-white border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Add Your First Add-On
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                Next Step
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Media & Requirements</h3>
                <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Thumbnail Required</div>
              </div>
              <p className="text-gray-500">Upload media to showcase your work and set client expectations.</p>
            </div>

            {/* Thumbnail */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block font-medium">Gig Thumbnail</label>
                <div className="text-xs text-gray-500">Max size: 10MB (JPEG, PNG, MP4)</div>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-purple-500 bg-purple-50"
                    : errors.thumbnail
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {formData.thumbnailPreview ? (
                  <div className="relative">
                    <div className="relative mx-auto max-w-xs overflow-hidden rounded-lg">
                      {formData.thumbnail.type.includes("video") ? (
                        <video src={formData.thumbnailPreview} className="w-full h-auto" controls />
                      ) : (
                        <img
                          src={formData.thumbnailPreview || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          width={300}
                          height={200}
                          className="w-full h-auto object-cover"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          thumbnail: null,
                          thumbnailPreview: "",
                        })
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X size={18} className="text-gray-700" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-purple-100 p-4 rounded-full">
                        <Upload size={32} className="text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-2">Drag and drop your file here, or</p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Browse Files
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,video/mp4"
                        onChange={handleThumbnailUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>

              {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail}</p>}
              <p className="text-sm text-gray-500">
                Your thumbnail is the first thing clients see. Choose a high-quality image or video that represents your
                work.
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="block font-medium">Tags</label>
                  <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Optional</div>
                </div>
                <div className="text-xs text-gray-500">Max 10 tags</div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Tag size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add a tag and press Enter (e.g., YouTube, Wedding)"
                    className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    disabled={formData.tags.length >= 10}
                  />
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-purple-500 hover:text-purple-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-2">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        disabled={formData.tags.includes(tag) || formData.tags.length >= 10}
                        className={`px-3 py-1 border rounded-full text-sm transition-colors ${
                          formData.tags.includes(tag) || formData.tags.length >= 10
                            ? "border-gray-200 text-gray-400 bg-gray-100"
                            : "border-gray-300 text-gray-700 hover:border-purple-500 hover:bg-purple-50"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor="requirements" className="block font-medium">
                    Requirements
                  </label>
                  <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Optional</div>
                </div>
                <div className="text-xs text-gray-500">{formData.requirements.length}/500</div>
              </div>

              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g., Send me your video files and any specific instructions."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />

              <p className="text-sm text-gray-500">
                Let clients know what you need from them to start working on their order.
              </p>
            </div>

            {/* Sample Work */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="block font-medium">Sample Work</label>
                  <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Optional</div>
                </div>
                <div className="text-xs text-gray-500">Max 3 samples</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.sampleWork.map((sample, index) => (
                  <div key={index} className="relative border rounded-lg overflow-hidden">
                    {sample.type === "video" ? (
                      <video src={sample.preview} className="w-full h-48 object-cover" controls />
                    ) : (
                      <Image
                        src={sample.preview || "/placeholder.svg"}
                        alt={`Sample work ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeSampleWork(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X size={18} className="text-gray-700" />
                    </button>
                  </div>
                ))}

                {formData.sampleWork.length < 3 && (
                  <div
                    className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-48 text-center cursor-pointer hover:border-purple-400 hover:bg-gray-50 transition-colors"
                    onClick={() => document.getElementById("sample-work-upload").click()}
                  >
                    <Film size={32} className="text-gray-400 mb-2" />
                    <p className="text-gray-700">Add Sample</p>
                    <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                    <input
                      id="sample-work-upload"
                      type="file"
                      accept="image/jpeg,image/png,video/mp4"
                      onChange={handleSampleWorkUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {errors.sampleWork && <p className="text-red-500 text-sm">{errors.sampleWork}</p>}
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                Next Step
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">Additional Information</h3>
                <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">Optional</div>
              </div>
              <p className="text-gray-500">Add FAQs to answer common client questions.</p>
            </div>

            {/* FAQs */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Frequently Asked Questions</h4>
                </div>
                {formData.faqs.length < 5 && (
                  <button
                    type="button"
                    onClick={addFaq}
                    className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add FAQ
                  </button>
                )}
              </div>

              {formData.faqs.length > 0 ? (
                <div className="space-y-4">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <HelpCircle size={18} className="text-purple-500" />
                          <h5 className="font-medium">Question {index + 1}</h5>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFaq(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFaq(index, "question", e.target.value)}
                          placeholder="e.g., Can you add subtitles?"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />

                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, "answer", e.target.value)}
                          placeholder="e.g., Yes, I can add subtitles in any language for an additional $10."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="flex justify-center mb-3">
                    <FileText size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-3">No FAQs yet</p>
                  <button
                    type="button"
                    onClick={addFaq}
                    className="px-4 py-2 bg-white border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    Add Your First FAQ
                  </button>
                </div>
              )}

              <p className="text-sm text-gray-500">
                FAQs help reduce back-and-forth with clients and can increase your order rate.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 pt-8">
              <div className="flex gap-3 w-full md:w-auto">
                <Link to="/gigs-dashboard" className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={() => handleSubmit("DRAFT")}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  Save as Draft
                </button>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="px-6 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2"
                >
                  <Eye size={18} />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit("PUBLISH")}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  Publish Gig
                  <Check size={18} />
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a New Gig</h1>
        <p className="text-gray-600">Showcase your video editing expertise and attract clients.</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 ${
                  currentStep === step
                    ? "border-purple-600 bg-purple-600 text-white"
                    : currentStep > step
                      ? "border-purple-600 bg-white text-purple-600"
                      : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {currentStep > step ? <Check size={18} /> : step}
              </div>
              <div
                className={`text-sm font-medium ${
                  currentStep === step ? "text-purple-600" : currentStep > step ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {step === 1 && "Basic Info"}
                {step === 2 && "Pricing"}
                {step === 3 && "Media"}
                {step === 4 && "Additional"}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded-full" />
          <div
            className="absolute top-0 left-0 h-1 bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          />
        </div>
      </div>

    {/* Form Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">{renderFormStep()}</div>
    </div>
  )
}

