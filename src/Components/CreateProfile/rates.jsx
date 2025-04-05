import { useState } from "react";

export default function RatesAvailability({ onPrev, onSubmit, data }) {
  const [formData, setFormData] = useState({
    minimumRate: data.minimumRate || "",
    maximumRate: data.maximumRate || "",
    weeklyHours: data.weeklyHours || "",
    availabilityStatus: data.availabilityStatus || "UNAVAILABLE",
    hourlyRate: data.hourlyRate || "",
    experienceLevel: data.experienceLevel || "ENTRY",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.minimumRate || isNaN(formData.minimumRate))
      newErrors.minimumRate = "Minimum rate is required and must be a number";
    if (!formData.maximumRate || isNaN(formData.maximumRate))
      newErrors.maximumRate = "Maximum rate is required and must be a number";
    if (!formData.hourlyRate || isNaN(formData.hourlyRate))
      newErrors.hourlyRate = "Hourly rate is required and must be a number";
    if (parseFloat(formData.minimumRate) > parseFloat(formData.maximumRate))
      newErrors.maximumRate = "Maximum rate must be greater than minimum rate";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        minimumRate: parseFloat(formData.minimumRate),
        maximumRate: parseFloat(formData.maximumRate),
        weeklyHours: parseInt(formData.weeklyHours) || null,
        availabilityStatus: formData.availabilityStatus,
        hourlyRate: parseFloat(formData.hourlyRate),
        experienceLevel: formData.experienceLevel,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="minimumRate" className="block text-sm font-medium text-gray-700">
          Minimum Rate ($) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="minimumRate"
          name="minimumRate"
          value={formData.minimumRate}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., 50"
          min="0"
          required
        />
        {errors.minimumRate && <p className="text-red-500 text-xs mt-1">{errors.minimumRate}</p>}
      </div>
      <div>
        <label htmlFor="maximumRate" className="block text-sm font-medium text-gray-700">
          Maximum Rate ($) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="maximumRate"
          name="maximumRate"
          value={formData.maximumRate}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., 100"
          min="0"
          required
        />
        {errors.maximumRate && <p className="text-red-500 text-xs mt-1">{errors.maximumRate}</p>}
      </div>
      <div>
        <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
          Hourly Rate ($) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="hourlyRate"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., 75"
          min="0"
          required
        />
        {errors.hourlyRate && <p className="text-red-500 text-xs mt-1">{errors.hourlyRate}</p>}
      </div>
      <div>
        <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">
          Weekly Hours Available
        </label>
        <input
          type="number"
          id="weeklyHours"
          name="weeklyHours"
          value={formData.weeklyHours}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., 20"
          min="0"
        />
      </div>
      <div>
        <label htmlFor="availabilityStatus" className="block text-sm font-medium text-gray-700">
          Availability Status
        </label>
        <select
          id="availabilityStatus"
          name="availabilityStatus"
          value={formData.availabilityStatus}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="FULL_TIME">Full-Time</option>
          <option value="PART_TIME">Part-Time</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>
      <div>
        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
          Experience Level
        </label>
        <select
          id="experienceLevel"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="ENTRY">Entry</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="EXPERT">Expert</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Preview
        </button>
      </div>
    </div>
  );
}