import { Heart, MapPin, Users, Clock, Briefcase, DollarSign, Building2, CheckCircle2 } from 'lucide-react';

export function JobList({ savedJobs, toggleSaveJob }) {
  // Hardcoded jobs array based on your Prisma Job model
  const jobs = [
    {
      id: 1,
      title: "Video Editor for Promotional Campaign",
      description: "Edit a series of promotional videos for a new product launch.",
      category: ["Video Editing"], // Array as per schema
      budgetMin: 100,
      budgetMax: 200,
      jobDifficulty: "INTERMEDIATE",
      projectLength: "SHORT_TERM",
      requiredSkills: ["Adobe Premiere Pro", "After Effects"],
      tools: ["Adobe Suite"],
      scope: "Small project",
      postedById: 1,
      name: "John Doe",
      email: "john@example.com",
      company: "Example Inc",
      postedTime: "2025-03-01T10:00:00Z", // ISO string for Date
      isVerified: true,
      location: "Remote",
      proposals: 5,
      categoryColor: "blue",
    },
    {
      id: 2,
      title: "Graphic Designer for Branding",
      description: "Design branding materials including logos and banners.",
      category: ["Graphic Design"],
      budgetMin: 150,
      budgetMax: 300,
      jobDifficulty: "EASY",
      projectLength: "MEDIUM_TERM",
      requiredSkills: ["Photoshop", "Illustrator"],
      tools: ["Adobe Suite"],
      scope: "Medium project",
      postedById: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      company: "Creative Co",
      postedTime: "2025-03-15T14:00:00Z",
      isVerified: true,
      location: "Remote",
      proposals: 3,
      categoryColor: "green",
    },
  ];

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="relative p-6">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${job.categoryColor}-50 p-2`}>
                    <Building2 className={`h-6 w-6 text-${job.categoryColor}-500`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{job.company}</span>
                      {job.isVerified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`rounded-full bg-${job.categoryColor}-50 px-3 py-1`}>
                  <span className={`text-sm font-medium text-${job.categoryColor}-600`}>
                    {job.category[0]} {/* Use first category since it's an array */}
                  </span>
                </div>
                <button 
                  onClick={() => toggleSaveJob(job.id)}
                  className={`group/save relative rounded-xl p-2 transition-all duration-200 ${
                    savedJobs.includes(job.id)
                      ? 'bg-red-50 text-red-500'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <Heart 
                    className={`h-5 w-5 transition-all duration-200 ${
                      savedJobs.includes(job.id)
                        ? 'fill-current'
                        : 'group-hover/save:text-gray-600'
                    }`} 
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[10px] font-bold text-white">
                    {savedJobs.includes(job.id) ? '✓' : '+'}
                  </span>
                </button>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">{`${job.budgetMin} - ${job.budgetMax}`}</span>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{job.jobDifficulty}</span>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{job.projectLength}</span>
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{job.location}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Posted {new Date(job.postedTime).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Briefcase className="h-4 w-4" />
                  {job.proposals} proposals
                </span>
              </div>
              <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
