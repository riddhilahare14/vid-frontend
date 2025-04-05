import { useState } from "react";
import { X, Upload } from "lucide-react";

export default function SkillsPortfolio({ onNext, onPrev, data }) {
  const [skills, setSkills] = useState(data.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [portfolioVideos, setPortfolioVideos] = useState(
    data.portfolioVideos || [{ videoUrl: "", title: "", description: "" }]
  );
  const [errors, setErrors] = useState({});

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleVideoChange = (index, field, value) => {
    const newVideos = [...portfolioVideos];
    newVideos[index][field] = value;
    setPortfolioVideos(newVideos);
  };

  const addVideo = () => {
    if (portfolioVideos.length < 5) {
      setPortfolioVideos([...portfolioVideos, { videoUrl: "", title: "", description: "" }]);
    }
  };

  const removeVideo = (index) => {
    setPortfolioVideos(portfolioVideos.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (skills.length === 0) newErrors.skills = "At least one skill is required";
    // Portfolio videos are optional, so no strict validation
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({ skills, portfolioVideos });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Skills <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Add a skill"
          />
          <button
            onClick={addSkill}
            type="button"
            className="px-4 py-2 border border-purple-500 rounded-md shadow-sm text-sm font-medium text-purple-500 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="ml-2 text-indigo-600 hover:text-indigo-800">
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
        {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Portfolio Videos (Max 5)
        </label>
        {portfolioVideos.map((video, index) => (
          <div key={index} className="space-y-2 mt-2 p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              placeholder="Video URL"
              value={video.videoUrl}
              onChange={(e) => handleVideoChange(index, "videoUrl", e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Title"
              value={video.title}
              onChange={(e) => handleVideoChange(index, "title", e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <textarea
              placeholder="Description"
              value={video.description}
              onChange={(e) => handleVideoChange(index, "description", e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={2}
            />
            <button
              onClick={() => removeVideo(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
        {portfolioVideos.length < 5 && (
          <button
            onClick={addVideo}
            type="button"
            className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Another Video
          </button>
        )}
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