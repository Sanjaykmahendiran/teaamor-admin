import { HomeHeader } from "@/components/home-header"
import { MenuItems } from "@/components/menu-items"

export default function DashboardPage() {
  return (
    <div className="h-screen w-full max-w-sm mx-auto bg-gray-50">
      <HomeHeader />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
        <MenuItems />
      </div>
    </div>
  )
}
