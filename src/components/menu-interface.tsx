"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"

type Category = {
  id: string
  name: string
  itemCount: number
  isOpen: boolean
  tabType: string
}

type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  image: string
  available: boolean
  categoryId: string
  tabType: string
}

export function MenuInterface() {
  const [categories, setCategories] = useState<Category[]>([
    // Menu Items Categories
    { id: "desserts", name: "Desserts & Drinks", itemCount: 3, isOpen: false, tabType: "Menu Items" },
    { id: "group-meals", name: "Group Meals", itemCount: 2, isOpen: false, tabType: "Menu Items" },
    { id: "rice-bowls", name: "Rice Bowls", itemCount: 1, isOpen: false, tabType: "Menu Items" },
    { id: "appetizers", name: "Appetizers", itemCount: 2, isOpen: false, tabType: "Menu Items" },

    // Addons Categories
    { id: "extra-toppings", name: "Extra Toppings", itemCount: 4, isOpen: false, tabType: "Addons" },
    { id: "sauces", name: "Sauces & Dips", itemCount: 3, isOpen: false, tabType: "Addons" },
    { id: "sides", name: "Side Dishes", itemCount: 2, isOpen: false, tabType: "Addons" },

    // Size Categories
    { id: "portion-sizes", name: "Portion Sizes", itemCount: 3, isOpen: false, tabType: "Size" },
    { id: "drink-sizes", name: "Drink Sizes", itemCount: 3, isOpen: false, tabType: "Size" },

    // Ingredients Categories
    { id: "proteins", name: "Proteins", itemCount: 5, isOpen: false, tabType: "Ingredients" },
    { id: "vegetables", name: "Vegetables", itemCount: 6, isOpen: false, tabType: "Ingredients" },
    { id: "grains", name: "Grains & Rice", itemCount: 3, isOpen: false, tabType: "Ingredients" },

    // Cooking Reference Categories
    { id: "spice-levels", name: "Spice Levels", itemCount: 4, isOpen: false, tabType: "Cooking Reference" },
    { id: "cooking-methods", name: "Cooking Methods", itemCount: 3, isOpen: false, tabType: "Cooking Reference" },
    { id: "dietary-options", name: "Dietary Options", itemCount: 4, isOpen: false, tabType: "Cooking Reference" },
  ])

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // Menu Items
    {
      id: "1",
      name: "2-pc. Mushroom Pepper Steak Meal",
      description: "Delicious mushroom steak with rice and sauce.",
      price: "$107.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "desserts",
      tabType: "Menu Items",
    },
    {
      id: "2",
      name: "2-pc. Mushroom Pepper Steak w/ Egg Meal",
      description: "Served with a fried egg on top.",
      price: "$129.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "desserts",
      tabType: "Menu Items",
    },
    {
      id: "3",
      name: "1-pc. Mushroom Pepper Steak w/ Egg Meal",
      description: "Single piece version with egg.",
      price: "$107.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "desserts",
      tabType: "Menu Items",
    },
    {
      id: "4",
      name: "Family Combo Meal",
      description: "Perfect for sharing with family.",
      price: "$250.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "group-meals",
      tabType: "Menu Items",
    },
    {
      id: "5",
      name: "Party Pack Special",
      description: "Great for parties and gatherings.",
      price: "$350.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "group-meals",
      tabType: "Menu Items",
    },
    {
      id: "6",
      name: "Teriyaki Rice Bowl",
      description: "Fresh rice bowl with teriyaki sauce.",
      price: "$85.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "rice-bowls",
      tabType: "Menu Items",
    },
    {
      id: "7",
      name: "Spring Rolls",
      description: "Crispy spring rolls with dipping sauce.",
      price: "$45.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "appetizers",
      tabType: "Menu Items",
    },
    {
      id: "8",
      name: "Chicken Wings",
      description: "Spicy chicken wings with ranch.",
      price: "$65.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "appetizers",
      tabType: "Menu Items",
    },

    // Addons
    {
      id: "a1",
      name: "Extra Cheese",
      description: "Add extra cheese to your dish.",
      price: "$10.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "extra-toppings",
      tabType: "Addons",
    },
    {
      id: "a2",
      name: "Bacon Bits",
      description: "Crispy bacon bits topping.",
      price: "$15.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "extra-toppings",
      tabType: "Addons",
    },
    {
      id: "a3",
      name: "Avocado Slices",
      description: "Fresh avocado slices.",
      price: "$12.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "extra-toppings",
      tabType: "Addons",
    },
    {
      id: "a4",
      name: "Fried Onions",
      description: "Crispy fried onions.",
      price: "$8.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "extra-toppings",
      tabType: "Addons",
    },
    {
      id: "a5",
      name: "Spicy Mayo",
      description: "Creamy spicy mayonnaise.",
      price: "$5.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "sauces",
      tabType: "Addons",
    },
    {
      id: "a6",
      name: "Teriyaki Sauce",
      description: "Sweet teriyaki glaze.",
      price: "$5.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "sauces",
      tabType: "Addons",
    },
    {
      id: "a7",
      name: "Garlic Aioli",
      description: "Creamy garlic aioli.",
      price: "$6.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "sauces",
      tabType: "Addons",
    },
    {
      id: "a8",
      name: "French Fries",
      description: "Crispy golden fries.",
      price: "$25.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "sides",
      tabType: "Addons",
    },
    {
      id: "a9",
      name: "Coleslaw",
      description: "Fresh cabbage coleslaw.",
      price: "$20.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "sides",
      tabType: "Addons",
    },

    // Sizes
    {
      id: "s1",
      name: "Regular Size",
      description: "Standard portion size.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "portion-sizes",
      tabType: "Size",
    },
    {
      id: "s2",
      name: "Large Size",
      description: "Upgrade to large portion.",
      price: "$20.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "portion-sizes",
      tabType: "Size",
    },
    {
      id: "s3",
      name: "Extra Large",
      description: "Maximum portion size.",
      price: "$35.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "portion-sizes",
      tabType: "Size",
    },
    {
      id: "s4",
      name: "Small Drink",
      description: "12oz drink size.",
      price: "$15.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "drink-sizes",
      tabType: "Size",
    },
    {
      id: "s5",
      name: "Medium Drink",
      description: "16oz drink size.",
      price: "$20.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "drink-sizes",
      tabType: "Size",
    },
    {
      id: "s6",
      name: "Large Drink",
      description: "24oz drink size.",
      price: "$25.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "drink-sizes",
      tabType: "Size",
    },

    // Ingredients
    {
      id: "i1",
      name: "Chicken Breast",
      description: "Grilled chicken breast.",
      price: "$30.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "proteins",
      tabType: "Ingredients",
    },
    {
      id: "i2",
      name: "Beef Steak",
      description: "Premium beef steak.",
      price: "$45.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "proteins",
      tabType: "Ingredients",
    },
    {
      id: "i3",
      name: "Salmon Fillet",
      description: "Fresh salmon fillet.",
      price: "$50.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "proteins",
      tabType: "Ingredients",
    },
    {
      id: "i4",
      name: "Tofu",
      description: "Organic tofu protein.",
      price: "$20.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "proteins",
      tabType: "Ingredients",
    },
    {
      id: "i5",
      name: "Shrimp",
      description: "Fresh jumbo shrimp.",
      price: "$40.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "proteins",
      tabType: "Ingredients",
    },
    {
      id: "i6",
      name: "Mixed Vegetables",
      description: "Seasonal vegetable mix.",
      price: "$15.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "vegetables",
      tabType: "Ingredients",
    },
    {
      id: "i7",
      name: "Broccoli",
      description: "Fresh steamed broccoli.",
      price: "$10.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "vegetables",
      tabType: "Ingredients",
    },
    {
      id: "i8",
      name: "Bell Peppers",
      description: "Colorful bell peppers.",
      price: "$12.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "vegetables",
      tabType: "Ingredients",
    },
    {
      id: "i9",
      name: "Mushrooms",
      description: "Fresh button mushrooms.",
      price: "$8.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "vegetables",
      tabType: "Ingredients",
    },
    {
      id: "i10",
      name: "Carrots",
      description: "Fresh sliced carrots.",
      price: "$8.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "vegetables",
      tabType: "Ingredients",
    },
    {
      id: "i11",
      name: "Spinach",
      description: "Fresh baby spinach.",
      price: "$10.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "vegetables",
      tabType: "Ingredients",
    },
    {
      id: "i12",
      name: "Jasmine Rice",
      description: "Fragrant jasmine rice.",
      price: "$8.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "grains",
      tabType: "Ingredients",
    },
    {
      id: "i13",
      name: "Brown Rice",
      description: "Healthy brown rice.",
      price: "$10.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "grains",
      tabType: "Ingredients",
    },
    {
      id: "i14",
      name: "Quinoa",
      description: "Protein-rich quinoa.",
      price: "$15.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "grains",
      tabType: "Ingredients",
    },

    // Cooking Reference
    {
      id: "r1",
      name: "Mild",
      description: "No spice, family friendly.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "spice-levels",
      tabType: "Cooking Reference",
    },
    {
      id: "r2",
      name: "Medium Spicy",
      description: "Moderate heat level.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "spice-levels",
      tabType: "Cooking Reference",
    },
    {
      id: "r3",
      name: "Hot",
      description: "Spicy kick for heat lovers.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "spice-levels",
      tabType: "Cooking Reference",
    },
    {
      id: "r4",
      name: "Extra Hot",
      description: "Maximum heat level.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "spice-levels",
      tabType: "Cooking Reference",
    },
    {
      id: "r5",
      name: "Grilled",
      description: "Cooked on the grill.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "cooking-methods",
      tabType: "Cooking Reference",
    },
    {
      id: "r6",
      name: "Fried",
      description: "Deep fried preparation.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "cooking-methods",
      tabType: "Cooking Reference",
    },
    {
      id: "r7",
      name: "Steamed",
      description: "Healthy steamed cooking.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "cooking-methods",
      tabType: "Cooking Reference",
    },
    {
      id: "r8",
      name: "Vegetarian",
      description: "No meat ingredients.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "dietary-options",
      tabType: "Cooking Reference",
    },
    {
      id: "r9",
      name: "Vegan",
      description: "No animal products.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "dietary-options",
      tabType: "Cooking Reference",
    },
    {
      id: "r10",
      name: "Gluten-Free",
      description: "No gluten ingredients.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "dietary-options",
      tabType: "Cooking Reference",
    },
    {
      id: "r11",
      name: "Keto-Friendly",
      description: "Low carb, high fat.",
      price: "$0.00",
      image: "/placeholder.svg?height=80&width=80",
      available: true,
      categoryId: "dietary-options",
      tabType: "Cooking Reference",
    },
  ])

  const [activeTab, setActiveTab] = useState("Menu Items")
  const [openPopup, setOpenPopup] = useState(false)

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : { ...cat, isOpen: false })),
    )
  }

  const toggleAvailability = (itemId: string) => {
    setMenuItems((items) => items.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item)))
  }

  // Get categories for the active tab
  const getActiveTabCategories = (): Category[] => {
    return categories.filter((category) => category.tabType === activeTab)
  }

  // Get items for the active tab
  const getActiveTabItems = (): MenuItem[] => {
    return menuItems.filter((item) => item.tabType === activeTab)
  }

  const activeCategories = getActiveTabCategories()
  const activeItems = getActiveTabItems()

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <Header />

      {/* Tabs */}
      <div className="p-3">
        <div className="flex overflow-x-auto items-center gap-2">
          {["Menu Items", "Addons", "Size", "Ingredients", "Cooking Reference"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "px-5 py-2 text-sm rounded-full whitespace-nowrap transition-all duration-200",
                activeTab === tab ? "bg-[#FF6B4A] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <div className="flex-1 bg-white pb-24">
        {activeCategories.map((category) => (
          <div key={category.id} className="border-b">
            {/* Category Header */}
            <div
              className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded">
                  <Image
                    src="/placeholder.svg"
                    alt="placeholder"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover rounded opacity-50"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{category.name}</span>
                  <span className="text-xs text-[#FF6B4A]">Edit Category</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {category.itemCount} {category.itemCount === 1 ? "Item" : "Items"}
                </span>
                {category.isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Items under category */}
            {category.isOpen &&
              activeItems
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <div key={item.id} className="bg-white px-4 py-4 border-t">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1 mb-2">{item.description}</p>
                        <p className="font-medium text-sm">{item.price}</p>
                      </div>
                      <div className="flex flex-col justify-between items-end space-y-2">
                        <button className="w-8 h-8 bg-[#ff734d] rounded-full flex items-center justify-center text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 text-gray-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-10 h-5 rounded-full p-0.5 flex items-center cursor-pointer transition-colors duration-300",
                          item.available ? "bg-[#ff734d]" : "bg-gray-300",
                        )}
                        onClick={() => toggleAvailability(item.id)}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 bg-white rounded-full transform transition-transform duration-300",
                            item.available ? "translate-x-5" : "translate-x-0",
                          )}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Available</span>
                    </div>
                  </div>
                ))}

            {/* Empty Category */}
            {category.isOpen && activeItems.filter((item) => item.categoryId === category.id).length === 0 && (
              <div className="px-4 py-4 text-center text-[#ff734d] text-sm">No items available</div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
<div className="fixed bottom-20 right-4 z-20 flex flex-col items-end">
  <div className="relative">
    <AnimatePresence>
      {openPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-12 right-0 w-34 space-y-3 p-2 origin-bottom-right"
        >
          <button className="w-full py-2 px-4 rounded-full bg-[#ff734d] text-white text-sm">
            Add Category
          </button>
          <button className="w-full py-2 px-4 rounded-full bg-[#ff734d] text-white text-sm">
            Add Item
          </button>
          <button className="w-full py-2 px-4 rounded-full bg-[#ff734d] text-white text-sm">
            Sort Category
          </button>
          <button className="w-full py-2 px-4 rounded-full bg-[#ff734d] text-white text-sm">
            Sort Item
          </button>
        </motion.div>
      )}
    </AnimatePresence>

    <button
      onClick={() => setOpenPopup(!openPopup)}
      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
    >
      <motion.div animate={{ rotate: openPopup ? 225 : 0 }} transition={{ duration: 0.2 }}>
        <Plus size={28} />
      </motion.div>
    </button>
  </div>
</div>


      <Footer />
    </div>
  )
}