import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function StatsSidebar() {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handlePricingClick = () => {
    navigate('/pricing'); // Adjust the route as needed
  };

  return (
    <div className="space-y-6">
      {/* Pricing Card */}
      <div className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="mb-4 flex justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-800">$85.00</p>
            <p className="text-base text-gray-600">per hour</p>
          </div>
          <button
            onClick={handlePricingClick}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            <Link to="/pricing">
            View Pricing
            </Link>
          </button>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Jobs</span>
            <span className="font-semibold text-gray-800">245</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Hours Worked</span>
            <span className="font-semibold text-gray-800">1,840</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Job Success Rate</span>
            <span className="font-semibold text-green-500">98%</span>
          </div>
        </div>
      </div>

      {/* Work Schedule */}
      <div className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <h3 className="mb-4 font-semibold text-xl text-gray-800">Work Schedule</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Weekly Availability</span>
            <span className="font-semibold text-gray-800">30+ hrs/week</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Preferred Work Hours</span>
            <span className="font-semibold text-gray-800">9 AM - 5 PM</span>
          </div>
        </div>
      </div>

      {/* Associated Company */}
      <div className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <h3 className="mb-4 font-semibold text-xl text-gray-800">Associated with</h3>
        <div className="flex items-center gap-3">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Company logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-lg text-gray-800">VisualCraft Studio</p>
            <p className="text-sm text-gray-600">Since 2020</p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
        <h3 className="mb-4 font-semibold text-xl text-gray-800">Contact Options</h3>
        <div className="space-y-4">
          <button
            className="w-full py-3 px-6 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
            onClick={() => alert('Open Contact Form')}
          >
            Contact Me
          </button>
          <button
            className="w-full py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => alert('Start a Project')}
          >
            Start a Project
          </button>
          <button
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => alert('View Portfolio')}
          >
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
