
import React from 'react'

interface GenreCardProps {
  genre: string
  image: string
  isSelected: boolean
  onClick: () => void
}

const GenreCard: React.FC<GenreCardProps> = ({ genre, image, isSelected, onClick }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transform transition-all duration-300 ${
        isSelected ? 'bg-yellow-100 scale-105' : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={genre}
        className="rounded-lg object-cover w-full h-48 mb-4"
      />
      <h4 className="text-xl font-semibold text-gray-800">{genre}</h4>
    </div>
  )
}

export default GenreCard

