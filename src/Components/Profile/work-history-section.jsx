import { Star } from 'lucide-react'

export default function WorkHistorySection() {
  const jobs = [
    {
      title: "Product Photography - E-commerce Collection",
      rating: 5,
      ratingValue: "5.00",
      dateRange: "Jun 27, 2023 - Aug 2, 2023",
      review: "Exceptional work on our e-commerce product photography. Sarah delivered high-quality images that perfectly captured our product features. Very professional and timely delivery.",
      isPrivate: false
    },
    {
      title: "Sports Photographer - Cycling, Running, Triathlon",
      rating: 2,
      ratingValue: "2.20",
      dateRange: "Jul 30, 2024 - Oct 11, 2024",
      review: "The quality of the work was way below expected. I believe they are good at doing photos of not moving objects or product images. But what we needed, was really...",
      isPrivate: true
    }
  ]

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-semibold">Work history</h3>
      
      <div className="mb-6 border-b">
        <div className="flex gap-6">
          <button className="border-b-2 border-black pb-2 font-medium">
            Completed jobs (189)
          </button>
          <button className="pb-2 text-gray-600 hover:text-gray-900">
            In progress (1)
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {jobs.map((job, index) => (
          <div key={index} className="border-b pb-6">
            <h4 className="mb-2 text-lg font-medium">{job.title}</h4>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < job.rating
                        ? 'fill-orange-400 text-orange-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{job.ratingValue}</span>
              <span className="text-sm text-gray-600">| {job.dateRange}</span>
            </div>
            <p className="text-gray-600">
              {job.review}{' '}
              <button className="text-green-600 hover:underline">
                See more
              </button>
            </p>
            {job.isPrivate && (
              <p className="mt-2 text-sm text-gray-600">Private earnings</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

