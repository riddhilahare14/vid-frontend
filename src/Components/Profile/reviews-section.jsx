import { Star } from 'lucide-react'

export default function ReviewsSection() {
  const reviews = [
    {
      title: "Product Photography Session",
      rating: 5,
      date: "Aug 15, 2023 - Sep 1, 2023",
      comment: "Excellent work! Delivered high-quality product photos that exceeded our expectations. Very professional and responsive throughout the project.",
      client: "TechGear Inc."
    },
    {
      title: "Commercial Video Production",
      rating: 5,
      date: "Jul 1, 2023 - Jul 15, 2023",
      comment: "Sarah created an amazing commercial for our brand. The quality and creativity were outstanding. Would definitely work with her again.",
      client: "Fashion Forward"
    }
  ]

  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Reviews</h3>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-semibold">4.9</span>
            <span className="text-gray-600">(1,370 reviews)</span>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search reviews"
            className="rounded-lg border border-gray-300 px-4 py-2"
          />
          <select className="rounded-lg border border-gray-300 px-4 py-2">
            <option>Most relevant</option>
            <option>Most recent</option>
            <option>Highest rated</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold">{review.title}</h4>
              <span className="text-sm text-gray-600">{review.date}</span>
            </div>
            <div className="mb-2 flex">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <p className="mt-2 text-sm font-medium">{review.client}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

