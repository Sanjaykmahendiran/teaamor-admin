import Image from "next/image"
import Link from "next/link"
import { ProfileForm } from "@/components/profile-form"
import { ChevronLeft } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="relative h-screen w-full max-w-sm mx-auto bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b">
        <Link href="/dashboard" className="mr-4">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-green-800">Create Profile</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-800">
              <Image
                src="/images/profile-placeholder.png"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-200">
              <div className="bg-green-800 rounded-full w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <ProfileForm />
      </div>
    </div>
  )
}
