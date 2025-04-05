import { useState, useRef } from "react";
import { X, Upload } from "lucide-react";

export default function ToolsEquipmentCertifications({ onNext, onPrev, data }) {
  const [formData, setFormData] = useState({
    tools: data.tools || [],
    equipment: data.equipment || { cameras: [], lenses: [], lighting: [], other: [] },
    certifications: data.certifications || [],
  });
  const [errors, setErrors] = useState({});
  const [newTool, setNewTool] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newEquipment, setNewEquipment] = useState({ type: "cameras", name: "" });
  const fileInputRef = useRef(null);

  const handleAddTool = () => {
    if (newTool && !formData.tools.includes(newTool)) {
      setFormData({ ...formData, tools: [...formData.tools, newTool] });
      setNewTool("");
    }
  };

  const handleRemoveTool = (tool) => {
    setFormData({ ...formData, tools: formData.tools.filter((t) => t !== tool) });
  };

  const handleAddCertification = () => {
    if (newCertification && !formData.certifications.includes(newCertification)) {
      setFormData({ ...formData, certifications: [...formData.certifications, newCertification] });
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (cert) => {
    setFormData({ ...formData, certifications: formData.certifications.filter((c) => c !== cert) });
  };

  const handleAddEquipment = () => {
    if (newEquipment.name) {
      setFormData({
        ...formData,
        equipment: {
          ...formData.equipment,
          [newEquipment.type]: [...formData.equipment[newEquipment.type], newEquipment.name],
        },
      });
      setNewEquipment({ ...newEquipment, name: "" });
    }
  };

  const handleRemoveEquipment = (type, item) => {
    setFormData({
      ...formData,
      equipment: {
        ...formData.equipment,
        [type]: formData.equipment[type].filter((i) => i !== item),
      },
    });
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setFormData({
        ...formData,
        certifications: [...formData.certifications, ...fileNames],
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.tools.length === 0) newErrors.tools = "At least one tool is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({
        tools: formData.tools,
        equipmentCameras: formData.equipment.cameras.join(", "),
        equipmentLenses: formData.equipment.lenses.join(", "),
        equipmentLighting: formData.equipment.lighting.join(", "),
        equipmentOther: formData.equipment.other.join(", "),
        certifications: formData.certifications.join(", "), // Single string
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tools <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter a tool"
          />
          <button
            type="button"
            onClick={handleAddTool}
            className="px-4 py-2 border border-purple-500 rounded-md shadow-sm text-sm font-medium text-purple-500 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
            >
              {tool}
              <button
                type="button"
                onClick={() => handleRemoveTool(tool)}
                className="flex-shrink-0 ml-1.5 inline-flex text-purple-500 focus:outline-none focus:text-purple-700"
              >
                <span className="sr-only">Remove {tool}</span>
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
        {errors.tools && <p className="text-red-500 text-xs mt-1">{errors.tools}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
        <div className="flex gap-2 mb-2">
          <select
            value={newEquipment.type}
            onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          >
            <option value="cameras">Cameras</option>
            <option value="lenses">Lenses</option>
            <option value="lighting">Lighting</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            value={newEquipment.name}
            onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter equipment name"
          />
          <button
            type="button"
            onClick={handleAddEquipment}
            className="px-4 py-2 border border-purple-500 rounded-md shadow-sm text-sm font-medium text-purple-500 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add
          </button>
        </div>
        <div className="space-y-4 mt-2">
          {Object.entries(formData.equipment).map(([type, items]) => (
            <div key={type}>
              <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">{type}</h4>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveEquipment(type, item)}
                      className="flex-shrink-0 ml-1.5 inline-flex text-purple-500 focus:outline-none focus:text-purple-700"
                    >
                      <span className="sr-only">Remove {item}</span>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter a certification"
          />
          <button
            type="button"
            onClick={handleAddCertification}
            className="px-4 py-2 border border-purple-500 rounded-md shadow-sm text-sm font-medium text-purple-500 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.certifications.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
            >
              {cert}
              <button
                type="button"
                onClick={() => handleRemoveCertification(cert)}
                className="flex-shrink-0 ml-1.5 inline-flex text-purple-500 focus:outline-none focus:text-purple-700"
              >
                <span className="sr-only">Remove {cert}</span>
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
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