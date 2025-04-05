import { CheckCircle, MapPin, Share2 } from 'lucide-react';

export default function ProfileHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 text-blue-500">
              <CheckCircle className="h-6 w-6" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Sarah Parker</h1>
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>New York, USA</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center">
                <div className="h-2 w-16 rounded-full bg-blue-500"></div>
                <div className="h-2 w-16 rounded-full bg-gray-200"></div>
              </div>
              <span className="text-sm text-gray-600">65% Job Success</span>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Creative Photography & Videography Professional</h2>
        <p className="mt-2 text-gray-600">
          Professional photographer and videographer specializing in product photography, commercial videos, and brand storytelling. 
          Creating compelling visual content for e-commerce and digital marketing.
        </p>
      </div>
    </div>
  );
}
