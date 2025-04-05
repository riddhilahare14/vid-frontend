import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import axiosInstance from "../../utils/axios";

function PreviewSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function Preview({ data, onEdit, onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to save your profile.");
        return;
      }

      const profileData = {
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
        jobTitle: data.jobTitle,
        overview: data.overview,
        skills: data.skills,
        languages: data.languages,
        tools: data.tools,
        equipmentCameras: data.equipmentCameras,
        equipmentLenses: data.equipmentLenses,
        equipmentLighting: data.equipmentLighting,
        equipmentOther: data.equipmentOther,
        certifications: data.certifications,
        minimumRate: data.minimumRate,
        maximumRate: data.maximumRate,
        weeklyHours: data.weeklyHours,
        availabilityStatus: data.availabilityStatus,
        hourlyRate: data.hourlyRate,
        experienceLevel: data.experienceLevel,
        bio: data.bio,
        profilePicture: data.profilePicture,
        // socialLinks omitted unless schema updated
      };

      const response = await axiosInstance.patch("/users/me", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.portfolioVideos?.length > 0) {
        // Placeholder for portfolio video submission
        console.log("Portfolio videos to submit:", data.portfolioVideos);
      }

      const updatedUser = response.data.data;
      dispatch(setUser({ ...updatedUser, token }));
      onSubmit();
      navigate("/freelancerProfile");
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Failed to submit profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <div className="px-8 py-6">
          <h2 className="text-3xl font-bold mb-4">Profile Preview</h2>
          <div className="space-y-6">
            <PreviewSection title="Personal Details">
              {data.profilePicture && (
                <img src={data.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
              )}
              <p>City: {data.city}</p>
              <p>State: {data.state}</p>
              <p>PIN Code: {data.pinCode}</p>
              <p>Bio: {data.bio}</p>
            </PreviewSection>
            <PreviewSection title="Professional Overview">
              <p>Job Title: {data.jobTitle}</p>
              <p>Overview: {data.overview}</p>
              <p>Languages: {data.languages?.join(", ")}</p>
            </PreviewSection>
            <PreviewSection title="Skills & Portfolio">
              <p>Skills: {data.skills?.join(", ")}</p>
              {data.portfolioVideos?.map((video, index) => (
                <div key={index}>
                  <p>Video {index + 1}: {video.title}</p>
                  <p>URL: {video.videoUrl}</p>
                  <p>Description: {video.description}</p>
                </div>
              ))}
            </PreviewSection>
            <PreviewSection title="Tools, Equipment & Certifications">
              <p>Tools: {data.tools?.join(", ")}</p>
              <p>Cameras: {data.equipmentCameras}</p>
              <p>Lenses: {data.equipmentLenses}</p>
              <p>Lighting: {data.equipmentLighting}</p>
              <p>Other Equipment: {data.equipmentOther}</p>
              <p>Certifications: {data.certifications}</p>
            </PreviewSection>
            <PreviewSection title="Rates & Availability">
              <p>Minimum Rate: ${data.minimumRate}</p>
              <p>Maximum Rate: ${data.maximumRate}</p>
              <p>Hourly Rate: ${data.hourlyRate}</p>
              <p>Weekly Hours: {data.weeklyHours || "N/A"}</p>
              <p>Availability: {data.availabilityStatus}</p>
              <p>Experience Level: {data.experienceLevel}</p>
            </PreviewSection>
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={onEdit}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}