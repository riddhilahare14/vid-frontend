import { useState } from "react";
import { Upload } from "lucide-react";

export default function PersonalDetails({ onNext, data }) {
  const [image, setImage] = useState(data.profilePicture || null);
  const [formData, setFormData] = useState({
    apartment: data.apartment || "",
    area: data.area || "",
    city: data.city || "",
    pinCode: data.pinCode || "",
    state: data.state || "",
    bio: data.bio || "",
  });
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Profile picture is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pinCode) newErrors.pinCode = "PIN code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext({
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        bio: formData.bio,
        profilePicture: image, // Maps to User.profilePicture
        // apartment and area ignored unless schema updated
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {image ? (
            <img src={image || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-sm text-gray-500">Click to upload profile picture (max 5MB)</p>
        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
            Apartment/House No.
          </label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area/Street
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
            PIN Code <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
          />
          {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32 resize-none"
          ></textarea>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Next
      </button>
    </div>
  );
}