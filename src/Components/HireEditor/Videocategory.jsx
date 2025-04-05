import { Link } from "react-router-dom"
import img1 from "../../assets/img3.jpg"


export default function VideoCategory({ title, image, subtypes }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img src={img1} alt={title} fill className="object-cover" />
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {subtypes.map((subtype, index) => (
          <Link 
            key={index} 
            href="#"
            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-gray-900">{subtype.title}</div>
            <div className="text-sm text-gray-500">{subtype.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

