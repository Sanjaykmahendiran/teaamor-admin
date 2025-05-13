import Image from "next/image"
import { Bell, Menu } from "lucide-react"

export function HomeHeader() {
  return (
    <div className="bg-green-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Menu className="h-6 w-6 mr-3" />
        <div className="flex items-center">
          <Image src="/images/starbucks-logo-white.png" alt="Starbucks" width={30} height={30} className="mr-2" />
          <span className="font-semibold">Starbucks</span>
        </div>
      </div>
      <Bell className="h-6 w-6" />
    </div>
  )
}
