'use client'

import Image from "next/image"
import { ChevronLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Component() {
  const reviews = [
    {
      id: 1,
      name: "saleb sdorty",
      location: "Great restaurant",
      time: "1 week ago",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Aftab Hussain",
      location: "Bar",
      time: "1 week ago",
      rating: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "John Doe",
      location: "Ok",
      time: "3 weeks ago",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "basti bach",
      location: "Tetsgdbx",
      time: "3 weeks ago",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Kareem Elkafi",
      location: "Kkk",
      time: "4 weeks ago",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "basti bach",
      location: "Cscs",
      time: "2 months ago",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "basti bach",
      location: "Cscs",
      time: "2 months ago",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Masoum Mahmoud",
      location: "Good",
      time: "2 months ago",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "Verga Verga",
      location: "Coman verga",
      time: "3 months ago",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
      />
    ))
  }

  const router = useRouter();
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
  <button onClick={() => router.push("/dashboard")}>
    <ChevronLeft className="w-6 h-6 text-gray-600" />
  </button>
  <h1 className="text-lg font-medium text-gray-900">Customer reviews (56)</h1>
</div>

      {/* Reviews List */}
      <div className="divide-y divide-gray-100">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={review.avatar || "/placeholder.svg"}
                alt={review.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.location}</p>
                  <p className="text-xs text-gray-400 mt-1">{review.time}</p>
                </div>
              </div>

              {/* Publish button and stars */}
              <div className="flex items-center gap-3 mt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-6 px-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Publish
                </Button>
                <div className="flex gap-0.5">{renderStars(review.rating)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
