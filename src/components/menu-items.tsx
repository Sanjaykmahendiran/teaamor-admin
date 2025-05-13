import Image from "next/image"

const menuItems = [
  { name: "Coffee", image: "/images/coffee.png" },
  { name: "Tea", image: "/images/tea.png" },
  { name: "Food", image: "/images/food.png" },
  { name: "Cold Drinks", image: "/images/cold-drinks.png" },
]

export function MenuItems() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {menuItems.map((item) => (
        <div key={item.name} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="w-20 h-20 relative mb-2">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
          </div>
          <span className="font-medium text-gray-800">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
