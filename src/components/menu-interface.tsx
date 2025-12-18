"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"

// --- IMAGE IMPORTS ---
import milk01 from "@/app/assets/milk-tea/signature-tea.jpg";
import hotMilk01 from "@/app/assets/hot-milk/masala-milk.jpg";
import filterCoffee from "@/app/assets/coffee/filter-coffee.jpg";
import coldChocolate from "@/app/assets/cold-shake/cold-chocolate.jpg";
import blackTea from "@/app/assets/water-based-tea/black-tea.jpg";
import icedTea from "@/app/assets/chillers/iced-tea.jpg";
import classicFries from "@/app/assets/fries/classic-french-fries.jpg";
import alooSamosa from "@/app/assets/samosa/aloo-samosa.jpg";
import vegPuff from "@/app/assets/puff/veg-puff.jpg";
import chickenNuggets from "@/app/assets/quick-bites/chicken-nuggets.jpg";
import plainMaggi from "@/app/assets/maggi/plain-maggi.jpg";

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
  // --- 1. UPDATED CATEGORIES FOR TEA AMOR ---
  const [categories, setCategories] = useState<Category[]>([
    // Tab: Menu Items
    { id: "milk-tea", name: "Milk Tea", itemCount: 4, isOpen: true, tabType: "Menu Items" },
    { id: "hot-milk", name: "Hot Milk", itemCount: 5, isOpen: false, tabType: "Menu Items" },
    { id: "coffee", name: "Coffee", itemCount: 4, isOpen: false, tabType: "Menu Items" },
    { id: "cold-shakes", name: "Cold Shakes", itemCount: 4, isOpen: false, tabType: "Menu Items" },
    { id: "quick-bites", name: "Quick Bites", itemCount: 8, isOpen: false, tabType: "Menu Items" },
    { id: "maggi", name: "Maggi", itemCount: 4, isOpen: false, tabType: "Menu Items" },

    // Tab: Addons
    { id: "sugar", name: "Sweeteners", itemCount: 3, isOpen: false, tabType: "Addons" },
    { id: "toppings", name: "Extra Toppings", itemCount: 2, isOpen: false, tabType: "Addons" },

    // Tab: Size
    { id: "cup-sizes", name: "Cup Sizes", itemCount: 2, isOpen: false, tabType: "Size" },

    // Tab: Cooking Reference (Customizations)
    { id: "sugar-level", name: "Sugar Level", itemCount: 4, isOpen: false, tabType: "Cooking Reference" },
    { id: "temp", name: "Temperature", itemCount: 2, isOpen: false, tabType: "Cooking Reference" },
  ])

  // --- 2. UPDATED MENU ITEMS FOR TEA AMOR ---
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // -- Milk Tea --
    {
      id: "milk1",
      name: "Signature Tea",
      description: "Our special signature milk tea blend.",
      price: "₹25.00",
      image: milk01.src,
      available: true,
      categoryId: "milk-tea",
      tabType: "Menu Items",
    },
    {
      id: "milk2",
      name: "Classic Tea",
      description: "Traditional classic milk tea.",
      price: "₹15.00",
      image: "/placeholder.svg", // Using placeholder if image var not available, else import
      available: true,
      categoryId: "milk-tea",
      tabType: "Menu Items",
    },
    {
      id: "milk3",
      name: "Elachi Tea",
      description: "Aromatic cardamom flavored milk tea.",
      price: "₹20.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "milk-tea",
      tabType: "Menu Items",
    },
    {
      id: "milk4",
      name: "Ginger Tea",
      description: "Refreshing ginger infused milk tea.",
      price: "₹20.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "milk-tea",
      tabType: "Menu Items",
    },

    // -- Hot Milk --
    {
      id: "hot1",
      name: "Manjal Milagu Milk",
      description: "Turmeric and pepper infused hot milk.",
      price: "₹25.00",
      image: hotMilk01.src,
      available: true,
      categoryId: "hot-milk",
      tabType: "Menu Items",
    },
    {
      id: "hot5",
      name: "Hot Chocolate",
      description: "Rich and creamy hot chocolate.",
      price: "₹100.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "hot-milk",
      tabType: "Menu Items",
    },

    // -- Coffee --
    {
      id: "coffee1",
      name: "Filter Coffee",
      description: "Authentic South Indian filter coffee.",
      price: "₹25.00",
      image: filterCoffee.src,
      available: true,
      categoryId: "coffee",
      tabType: "Menu Items",
    },
    {
      id: "coffee2",
      name: "Double Strong Coffee",
      description: "Extra strong filter coffee.",
      price: "₹30.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "coffee",
      tabType: "Menu Items",
    },

    // -- Quick Bites --
    {
      id: "qb2",
      name: "Chicken Nuggets",
      description: "Golden fried chicken nuggets.",
      price: "₹80.00",
      image: chickenNuggets.src,
      available: true,
      categoryId: "quick-bites",
      tabType: "Menu Items",
    },
    {
      id: "qb1",
      name: "Cheese Corn Nuggets",
      description: "Crispy cheese and corn nuggets.",
      price: "₹80.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "quick-bites",
      tabType: "Menu Items",
    },

    // -- Maggi --
    {
      id: "maggi1",
      name: "Plain Maggi",
      description: "Classic plain Maggi noodles.",
      price: "₹50.00",
      image: plainMaggi.src,
      available: true,
      categoryId: "maggi",
      tabType: "Menu Items",
    },

    // -- ADDONS --
    {
      id: "add1",
      name: "Extra Sugar",
      description: "Additional packet of sugar.",
      price: "₹0.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "sugar",
      tabType: "Addons",
    },
    {
      id: "add2",
      name: "Jaggery (Naatu Sakkarai)",
      description: "Healthy cane sugar alternative.",
      price: "₹5.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "sugar",
      tabType: "Addons",
    },

    // -- SIZES --
    {
      id: "sz1",
      name: "Regular",
      description: "Standard serving size.",
      price: "₹0.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "cup-sizes",
      tabType: "Size",
    },
    {
      id: "sz2",
      name: "Large",
      description: "Extra quantity.",
      price: "₹20.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "cup-sizes",
      tabType: "Size",
    },

    // -- COOKING REF (Sugar Levels) --
    {
      id: "sl1",
      name: "No Sugar",
      description: "0% Sugar",
      price: "₹0.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "sugar-level",
      tabType: "Cooking Reference",
    },
    {
      id: "sl2",
      name: "Medium Sugar",
      description: "50% Sugar",
      price: "₹0.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "sugar-level",
      tabType: "Cooking Reference",
    },
    {
      id: "sl3",
      name: "High Sugar",
      description: "100% Sugar",
      price: "₹0.00",
      image: "/placeholder.svg",
      available: true,
      categoryId: "sugar-level",
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
        <div className="flex overflow-x-auto items-center gap-2 scrollbar-hide">
          {["Menu Items", "Addons", "Size", "Ingredients", "Cooking Reference"].map((tab) => (
            <button
              key={tab}
              className={cn(
                "px-5 py-2 text-sm rounded-full whitespace-nowrap transition-all duration-200",
                activeTab === tab ? "bg-[#D4AF37] text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
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
        {activeCategories.length === 0 ? (
             <div className="text-center py-10 text-gray-500">No categories found for this section.</div>
        ) : (
            activeCategories.map((category) => (
            <div key={category.id} className="border-b">
                {/* Category Header */}
                <div
                className="flex justify-between items-center px-4 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleCategory(category.id)}
                >
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    {/* Just using a generic placeholder or the first item's image for the category icon */}
                    <div className="w-full h-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs">
                        {category.name.substring(0,2).toUpperCase()}
                    </div>
                    </div>
                    <div className="flex flex-col">
                    <span className="text-sm font-semibold">{category.name}</span>
                    <span className="text-xs text-[#D4AF37]">Edit Category</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                    {activeItems.filter(i => i.categoryId === category.id).length} Items
                    </span>
                    {category.isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </div>
                </div>

                {/* Items under category */}
                <AnimatePresence>
                {category.isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                    {activeItems
                        .filter((item) => item.categoryId === category.id)
                        .map((item) => (
                        <div key={item.id} className="bg-white px-4 py-4 border-t border-gray-100">
                            <div className="flex">
                            <div className="flex-shrink-0 mr-4">
                                <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover h-20 w-20"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm text-gray-800">{item.name}</h4>
                                <p className="text-xs text-gray-500 mt-1 mb-2 line-clamp-2">{item.description}</p>
                                <p className="font-bold text-sm text-[#D4AF37]">{item.price}</p>
                            </div>
                            <div className="flex flex-col justify-between items-end space-y-2">
                                <button className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white hover:bg-[#7a6833] transition-colors">
                                <Edit className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            </div>

                            <div className="flex items-center mt-3">
                            <div
                                className={cn(
                                "w-10 h-5 rounded-full p-0.5 flex items-center cursor-pointer transition-colors duration-300",
                                item.available ? "bg-[#D4AF37]" : "bg-gray-300",
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
                            <span className="ml-2 text-xs font-medium text-gray-600">
                                {item.available ? "Available" : "Unavailable"}
                            </span>
                            </div>
                        </div>
                        ))}
                    
                    {/* Empty Category Message */}
                    {activeItems.filter((item) => item.categoryId === category.id).length === 0 && (
                        <div className="px-4 py-6 text-center text-gray-400 text-sm italic bg-gray-50">
                            No items added to this category yet.
                        </div>
                    )}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            ))
        )}
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
                transition={{ duration: 0.2 }}
                className="absolute bottom-14 right-0 w-40 space-y-2 origin-bottom-right"
              >
                <button className="w-full py-2 px-4 rounded-xl bg-white text-[#D4AF37] text-sm font-semibold shadow-lg border border-gray-100 hover:bg-gray-50 text-right">
                  Add Category
                </button>
                <button className="w-full py-2 px-4 rounded-xl bg-[#D4AF37] text-white text-sm font-semibold shadow-lg hover:bg-[#7a6833] text-right">
                  Add Item
                </button>
                <button className="w-full py-2 px-4 rounded-xl bg-white text-gray-600 text-sm font-semibold shadow-lg border border-gray-100 hover:bg-gray-50 text-right">
                  Sort Items
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpenPopup(!openPopup)}
            className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors",
                openPopup ? "bg-gray-800 text-white" : "bg-[#D4AF37] text-white"
            )}
          >
            <motion.div 
                animate={{ rotate: openPopup ? 45 : 0 }} 
                transition={{ duration: 0.2 }}
            >
              <Plus size={24} />
            </motion.div>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}