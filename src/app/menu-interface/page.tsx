"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Edit, Trash2, Plus, X, Save, FolderPlus, Package } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ImageUpload from "@/components/image-upload"
import { api } from "@/lib/api-service"

// --- IMAGE IMPORTS ---
import milk01 from "@/assets/milk-tea/signature-tea.jpg";
import milk02 from "@/assets/milk-tea/classic-tea.jpg";
import milk03 from "@/assets/milk-tea/elachi-tea.jpg";
import milk04 from "@/assets/milk-tea/ginger-tea.jpg";
import hotMilk01 from "@/assets/hot-milk/masala-milk.jpg";
import filterCoffee from "@/assets/coffee/filter-coffee.jpg";
import hotChocolate from "@/assets/hot-milk/hot-chocolate.jpg";
import doubleStrongCoffee from "@/assets/coffee/strong-filtercoffee.jpg";
import cheeseCornNuggets from "@/assets/quick-bites/cheese-corn-nuggets.jpg";
import chickenNuggets from "@/assets/quick-bites/chicken-nuggets.jpg";
import plainMaggi from "@/assets/maggi/plain-maggi.jpg";
import sugar from "@/assets/sugar/sugar.webp";
import jaggery from "@/assets/sugar/jaggery.webp";
import regular from "@/assets/size/regular.webp";
import large from "@/assets/size/large.webp";
import noSugar from "@/assets/sugar/sugar.webp";
import mediumSugar from "@/assets/sugar/sugar.webp";
import highSugar from "@/assets/sugar/sugar.webp";

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

export default function MenuInterface() {
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
      image: milk02.src, // Using placeholder if image var not available, else import
      available: true,
      categoryId: "milk-tea",
      tabType: "Menu Items",
    },
    {
      id: "milk3",
      name: "Elachi Tea",
      description: "Aromatic cardamom flavored milk tea.",
      price: "₹20.00",
      image: milk03.src,
      available: true,
      categoryId: "milk-tea",
      tabType: "Menu Items",
    },
    {
      id: "milk4",
      name: "Ginger Tea",
      description: "Refreshing ginger infused milk tea.",
      price: "₹20.00",
      image: milk04.src,
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
      image: hotChocolate.src,
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
      image: doubleStrongCoffee.src,
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
      image: cheeseCornNuggets.src,
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
      image: sugar.src,
      available: true,
      categoryId: "sugar",
      tabType: "Addons",
    },
    {
      id: "add2",
      name: "Jaggery (Naatu Sakkarai)",
      description: "Healthy cane sugar alternative.",
      price: "₹5.00",
      image: jaggery.src,
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
      image: regular.src,
      available: true,
      categoryId: "cup-sizes",
      tabType: "Size",
    },
    {
      id: "sz2",
      name: "Large",
      description: "Extra quantity.",
      price: "₹20.00",
      image: large.src,
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
      image: noSugar.src,
      available: true,
      categoryId: "sugar-level",
      tabType: "Cooking Reference",
    },
    {
      id: "sl2",
      name: "Medium Sugar",
      description: "50% Sugar",
      price: "₹0.00",
      image: mediumSugar.src,
      available: true,
      categoryId: "sugar-level",
      tabType: "Cooking Reference",
    },
    {
      id: "sl3",
      name: "High Sugar",
      description: "100% Sugar",
      price: "₹0.00",
      image: highSugar.src,
      available: true,
      categoryId: "sugar-level",
      tabType: "Cooking Reference",
    },
  ])

  const [activeTab, setActiveTab] = useState("Menu Items")
  const [openPopup, setOpenPopup] = useState(false)

  // Edit form state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editFormData, setEditFormData] = useState({ name: "", description: "", price: "" })

  // Delete confirmation state
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null)

  // Add Category state
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [categoryFormData, setCategoryFormData] = useState({ name: "", tabType: "Menu Items" })

  // Add Item state
  const [showAddItem, setShowAddItem] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [itemFormData, setItemFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: ""
  })

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, isOpen: !cat.isOpen } : { ...cat, isOpen: false })),
    )
  }

  const toggleAvailability = (itemId: string) => {
    setMenuItems((items) => items.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item)))
  }

  // Handle Edit
  const handleEditClick = (item: MenuItem) => {
    setEditingItem(item)
    setEditFormData({
      name: item.name,
      description: item.description,
      price: item.price.replace('₹', '').replace(',', '')
    })
  }

  const handleEditSave = () => {
    if (!editingItem) return

    setMenuItems((items) =>
      items.map((item) =>
        item.id === editingItem.id
          ? {
            ...item,
            name: editFormData.name,
            description: editFormData.description,
            price: `₹${parseFloat(editFormData.price).toFixed(2)}`,
          }
          : item
      )
    )
    setEditingItem(null)
    setEditFormData({ name: "", description: "", price: "" })
  }

  const handleEditCancel = () => {
    setEditingItem(null)
    setEditFormData({ name: "", description: "", price: "" })
  }

  // Handle Delete
  const handleDeleteClick = (item: MenuItem) => {
    setDeletingItem(item)
  }

  const handleDeleteConfirm = () => {
    if (!deletingItem) return

    setMenuItems((items) => items.filter((item) => item.id !== deletingItem.id))

    // Update category item count
    setCategories((cats) =>
      cats.map((cat) =>
        cat.id === deletingItem.categoryId
          ? { ...cat, itemCount: Math.max(0, cat.itemCount - 1) }
          : cat
      )
    )

    setDeletingItem(null)
  }

  const handleDeleteCancel = () => {
    setDeletingItem(null)
  }

  // Handle Add Category
  const handleAddCategoryClick = () => {
    setShowAddCategory(true)
    setOpenPopup(false)
    setCategoryFormData({ name: "", tabType: activeTab })
  }

  const handleAddCategorySave = async () => {
    if (!categoryFormData.name.trim()) return

    setIsSubmitting(true)
    try {
      // Call API to add category
      const response: any = await api.categories.add({
        cat_name: categoryFormData.name,
        menu_type: categoryFormData.tabType,
      })

      // Assuming API returns category_id in response
      const newCategory: Category = {
        id: response.category_id || response.data?.category_id || `cat-${Date.now()}`,
        name: categoryFormData.name,
        itemCount: 0,
        isOpen: false,
        tabType: categoryFormData.tabType,
      }

      setCategories((prev) => [...prev, newCategory])
      setShowAddCategory(false)
      setCategoryFormData({ name: "", tabType: "Menu Items" })
    } catch (error) {
      console.error("Failed to add category:", error)
      alert("Failed to add category. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddCategoryCancel = () => {
    setShowAddCategory(false)
    setCategoryFormData({ name: "", tabType: "Menu Items" })
  }

  // Handle Add Item
  const handleAddItemClick = () => {
    setShowAddItem(true)
    setOpenPopup(false)
    // Set default category to first category of active tab
    const firstCategory = activeCategories[0]
    setItemFormData({
      name: "",
      description: "",
      price: "",
      categoryId: firstCategory?.id || "",
      image: "",
    })
  }

  const handleAddItemSave = async () => {
    if (!itemFormData.name.trim() || !itemFormData.categoryId) return

    setIsSubmitting(true)
    try {
      const category = categories.find(c => c.id === itemFormData.categoryId)
      const categoryIdNum = parseInt(itemFormData.categoryId.replace(/\D/g, '')) || 1

      // API Call using api service
      const response: any = await api.products.add({
        product_name: itemFormData.name,
        product_image: itemFormData.image || "/placeholder.svg",
        description: itemFormData.description,
        is_featured: 0,
        user_ratings: 0,
        price: parseFloat(itemFormData.price || "0"),
        products_category: [{ category_id: categoryIdNum }]
      })

      const newItem: MenuItem = {
        id: response.product_id || response.data?.product_id || `item-${Date.now()}`,
        name: itemFormData.name,
        description: itemFormData.description,
        price: `₹${parseFloat(itemFormData.price || "0").toFixed(2)}`,
        image: itemFormData.image || "/placeholder.svg",
        available: true,
        categoryId: itemFormData.categoryId,
        tabType: activeTab,
      }

      setMenuItems((prev) => [...prev, newItem])

      // Update local categories count
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === itemFormData.categoryId ? { ...cat, itemCount: cat.itemCount + 1 } : cat
        )
      )

      setShowAddItem(false)
      setItemFormData({ name: "", description: "", price: "", categoryId: "", image: "" })
    } catch (error) {
      console.error(error)
      alert("Failed to add product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddItemCancel = () => {
    setShowAddItem(false)
    setItemFormData({ name: "", description: "", price: "", categoryId: "", image: "" })
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
                activeTab === tab ? "bg-primary text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
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
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      {category.name.substring(0, 2).toUpperCase()}
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
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditClick(item)
                                }}
                                className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-[#7a6833] transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteClick(item)
                                }}
                                className="w-8 h-8 text-red-500 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center mt-3">
                            <div
                              className={cn(
                                "w-10 h-5 rounded-full p-0.5 flex items-center cursor-pointer transition-colors duration-300",
                                item.available ? "bg-primary" : "bg-gray-300",
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
                className="absolute bottom-14 right-0 w-48 space-y-2 origin-bottom-right bg-white rounded-xl shadow-2xl border border-gray-100 p-3"
              >
                <button
                  onClick={handleAddCategoryClick}
                  className="w-full py-3 px-4 rounded-lg bg-white text-primary text-sm font-semibold border border-gray-200 hover:bg-primary/5 hover:border-primary/30 text-left flex items-center gap-2 transition-all duration-200 group"
                >
                  <FolderPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Add Category</span>
                </button>
                <button
                  onClick={handleAddItemClick}
                  className="w-full py-3 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-[#7a6833] text-left flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Add Item</span>
                </button>
                <button className="w-full py-3 px-4 rounded-lg bg-white text-gray-600 text-sm font-semibold border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-left transition-all duration-200">
                  Sort Items
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpenPopup(!openPopup)}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors",
              openPopup ? "bg-gray-800 text-white" : "bg-primary text-white"
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

      {/* Edit Form Modal */}
      <AnimatePresence>
        {editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleEditCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#2c375d]">Edit Item</h3>
                <button
                  onClick={handleEditCancel}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-4 border-t border-gray-200">
                <button
                  onClick={handleEditCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-[#7a6833] transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Category Modal */}
      <AnimatePresence>
        {showAddCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleAddCategoryCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FolderPlus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2c375d]">Add New Category</h3>
                    <p className="text-xs text-gray-500">Create a new category for your menu</p>
                  </div>
                </div>
                <button
                  onClick={handleAddCategoryCancel}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={categoryFormData.name}
                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Hot Beverages, Snacks"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tab Type <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={categoryFormData.tabType}
                    onValueChange={(value) => setCategoryFormData({ ...categoryFormData, tabType: value })}
                  >
                    <SelectTrigger className="w-full px-4 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white h-auto">
                      <SelectValue placeholder="Select tab type" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Menu Items", "Addons", "Size", "Ingredients", "Cooking Reference"].map((tab) => (
                        <SelectItem key={tab} value={tab}>
                          {tab}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <button
                  onClick={handleAddCategoryCancel}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategorySave}
                  disabled={!categoryFormData.name.trim() || isSubmitting}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-[#7a6833] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FolderPlus className="w-4 h-4" />
                      Create Category
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleAddItemCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2c375d]">Add New Item</h3>
                    <p className="text-xs text-gray-500">Add a new item to your menu</p>
                  </div>
                </div>
                <button
                  onClick={handleAddItemCancel}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={itemFormData.name}
                    onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="e.g., Masala Chai"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={itemFormData.description}
                    onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                    rows={3}
                    placeholder="Enter item description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={itemFormData.price}
                      onChange={(e) => setItemFormData({ ...itemFormData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={itemFormData.categoryId}
                      onValueChange={(value) => setItemFormData({ ...itemFormData, categoryId: value })}
                    >
                      <SelectTrigger className="w-full px-4 py-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white h-auto">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {activeCategories.length > 0 ? (
                          activeCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            No categories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <ImageUpload
                    variableName="image"
                    setImageUrls={setItemFormData}
                    initialImage={itemFormData.image}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl sticky bottom-0">
                <button
                  onClick={handleAddItemCancel}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItemSave}
                  disabled={!itemFormData.name.trim() || !itemFormData.categoryId || !itemFormData.price || isSubmitting}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-[#7a6833] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Add Item
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleDeleteCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-[#2c375d] text-center mb-2">
                  Delete Item?
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Are you sure you want to delete <span className="font-semibold">"{deletingItem.name}"</span>? This action cannot be undone.
                </p>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-4">
                <button
                  onClick={handleDeleteCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}