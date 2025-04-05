"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PortfolioItem({ item }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-500">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={`/placeholder.svg?height=400&width=400`}
          alt={item.title}
          width={400}
          height={400}
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {/* Content that slides up on hover */}
          <h3 className="font-medium text-white text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {item.title}
          </h3>
          <p className="text-sm text-white/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {item.category}
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
            <div className="flex items-center gap-1 text-white/90">
              <Heart className={cn("w-4 h-4", liked ? "fill-red-500 text-red-500" : "fill-white text-white")} />
              <span className="text-sm">{likeCount}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/20 rounded-full p-2 h-auto"
                onClick={() => {}}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/20 rounded-full p-2 h-auto"
                onClick={() => {}}
              >
                <Share2 className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-white hover:text-white hover:bg-white/20 rounded-full p-2 h-auto",
                  liked && "text-red-500 hover:text-red-500",
                )}
                onClick={handleLike}
              >
                <Heart className={cn("w-4 h-4", liked && "fill-red-500")} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

