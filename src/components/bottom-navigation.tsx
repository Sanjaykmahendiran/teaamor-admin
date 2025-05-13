import Link from "next/link"
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react"

interface BottomNavigationProps {
  currentPath: string
}

export function BottomNavigation({ currentPath }: BottomNavigationProps) {
  return (
    <div className="flex items-center justify-around py-3 border-t bg-white">
      <Link href="/dashboard" className="flex flex-col items-center">
        <Home className={`h-6 w-6 ${currentPath === "/dashboard" ? "text-green-800" : "text-gray-400"}`} />
        <span className="text-xs mt-1 text-gray-500">Home</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center">
        <Search className={`h-6 w-6 ${currentPath === "/search" ? "text-green-800" : "text-gray-400"}`} />
        <span className="text-xs mt-1 text-gray-500">Search</span>
      </Link>
      <Link href="/cart" className="flex flex-col items-center">
        <ShoppingCart className={`h-6 w-6 ${currentPath === "/cart" ? "text-green-800" : "text-gray-400"}`} />
        <span className="text-xs mt-1 text-gray-500">Cart</span>
      </Link>
      <Link href="/favorites" className="flex flex-col items-center">
        <Heart className={`h-6 w-6 ${currentPath === "/favorites" ? "text-green-800" : "text-gray-400"}`} />
        <span className="text-xs mt-1 text-gray-500">Favorite</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <User className={`h-6 w-6 ${currentPath === "/profile" ? "text-green-800" : "text-gray-400"}`} />
        <span className="text-xs mt-1 text-gray-500">Profiles</span>
      </Link>
    </div>
  )
}
