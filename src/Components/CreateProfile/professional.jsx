import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const jobTitles = ["Video Editor", "Motion Graphics Designer", "Colorist", "Sound Designer", "VFX Artist"];
const languageOptions = [
  "English", "Spanish", "French", "German", "Chinese",
  "Japanese", "Korean", "Arabic", "Hindi", "Portuguese",
];
const proficiencyLevels = ["Native", "Fluent", "Intermediate", "Basic"];

export default function ProfessionalOverview({ onNext, onPrev, data }) {
  const [formData, setFormData] = useState({
    jobTitle: data.jobTitle || "",
    overview: data.overview || "",
    languages: data.languages || [], // Changed to String[] from array of objects
    socialLinks: data.socialLinks || { instagram: "", youtube: "", vimeo: "", linkedin: "" },
  });
  const [errors, setErrors] = useState({});
  const [showJobTitles, setShowJobTitles] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showProficiency, setShowProficiency] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentProficiency, setCurrentProficiency] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social_")) {
      const socialPlatform = name.split("_")[1];
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [socialPlatform]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleJobTitleSelect = (title) => {
    setFormData({ ...formData, jobTitle: title });
    setShowJobTitles(false);
    if (errors.jobTitle) {
      setErrors({ ...errors, jobTitle: "" });
    }
  };

  const addLanguage = () => {
    if (currentLanguage && !formData.languages.includes(currentLanguage)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, currentLanguage], // Store only language name
      });
      setCurrentLanguage("");
      setCurrentProficiency(""); // Proficiency discarded for now
      setShowLanguages(false);
      setShowProficiency(false);
    }
  };

  const removeLanguage = (language) => {
    setFormData({ ...formData, languages: formData.languages.filter((lang) => lang !== language) });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!formData.overview) newErrors.overview = "Professional overview is required";
    if (formData.languages.length === 0) newErrors.languages = "At least one language is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({
        jobTitle: formData.jobTitle,
        overview: formData.overview,
        languages: formData.languages,
        // socialLinks omitted unless schema updated
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
          Job Title <span className="text-red-500">*</span>
        </label>
        <div
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
          onClick={() => setShowJobTitles(!showJobTitles)}
        >
          {formData.jobTitle || "Select a job title"}
          <ChevronDown className="absolute right-3 top-1/2" />
        </div>
        {showJobTitles && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {jobTitles.map((title) => (
              <div
                key={title}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                onClick={() => handleJobTitleSelect(title)}
              >
                {title}
              </div>
            ))}
          </div>
        )}
        {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
      </div>
      <div>
        <label htmlFor="overview" className="block text-sm font-medium text-gray-700">
          Professional Overview <span className="text-red-500">*</span>
        </label>
        <textarea
          id="overview"
          name="overview"
          rows={4}
          value={formData.overview}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32 resize-none"
          required
        ></textarea>
        {errors.overview && <p className="text-red-500 text-xs mt-1">{errors.overview}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.languages.map((lang, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {lang}
              <button onClick={() => removeLanguage(lang)} className="ml-2 text-indigo-600 hover:text-indigo-800">
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <div
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              {currentLanguage || "Select a language"}
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {showLanguages && (
              <div className="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {languageOptions.map((lang) => (
                  <div
                    key={lang}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                    onClick={() => {
                      setCurrentLanguage(lang);
                      setShowLanguages(false);
                    }}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative flex-1">
            <div
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
              onClick={() => setShowProficiency(!showProficiency)}
            >
              {currentProficiency || "Select proficiency"}
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {showProficiency && (
              <div className="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {proficiencyLevels.map((level) => (
                  <div
                    key={level}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                    onClick={() => {
                      setCurrentProficiency(level);
                      setShowProficiency(false);
                    }}
                  >
                    {level}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={addLanguage}
            className="px-4 py-2 border border-purple-500 rounded-md shadow-sm text-sm font-medium text-purple-500 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add
          </button>
        </div>
        {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</label>
        <div className="space-y-2">
          <input
            type="text"
            name="social_instagram"
            value={formData.socialLinks.instagram}
            onChange={handleInputChange}
            placeholder="Instagram Profile URL"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            name="social_youtube"
            value={formData.socialLinks.youtube}
            onChange={handleInputChange}
            placeholder="YouTube Channel URL"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            name="social_vimeo"
            value={formData.socialLinks.vimeo}
            onChange={handleInputChange}
            placeholder="Vimeo Profile URL"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input
            type="text"
            name="social_linkedin"
            value={formData.socialLinks.linkedin}
            onChange={handleInputChange}
            placeholder="LinkedIn Profile URL"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
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
          Next
        </button>
      </div>
    </div>
  );
}