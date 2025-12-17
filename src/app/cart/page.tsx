"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MapPin,
  Clock,
  CreditCard,
  Wallet,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// --- 1. COPY IMAGE IMPORTS FROM POS PAGE ---
// This ensures images load correctly.
import milk01 from "@/app/assets/milk-tea/signature-tea.jpg";
import milk02 from "@/app/assets/milk-tea/classic-tea.jpg";
import milk03 from "@/app/assets/milk-tea/elachi-tea.jpg";
import gingerTea from "@/app/assets/milk-tea/ginger-tea.jpg";
import hotMilk01 from "@/app/assets/hot-milk/masala-milk.jpg";
import hotMilk02 from "@/app/assets/hot-milk/badam-milk.jpg";
import hotMilk03 from "@/app/assets/hot-milk/panankarkandu-milk.jpg";
import hotMilk04 from "@/app/assets/hot-milk/naatu-sakkarai.jpg";
import hotMilk05 from "@/app/assets/hot-milk/hot-chocolate.jpg";
import filterCoffee from "@/app/assets/coffee/filter-coffee.jpg";
import doubleStrongCoffee from "@/app/assets/coffee/strong-filtercoffee.jpg";
import sukkuMalliCoffee from "@/app/assets/coffee/sukku-malli-coffee.jpg";
import blackCoffee from "@/app/assets/coffee/black-coffee.jpg";
import coldChocolate from "@/app/assets/cold-shake/cold-chocolate.jpg";
import hazelnutColdChocolate from "@/app/assets/cold-shake/hazelnut-cold-chocolate.jpg";
import coldMilo from "@/app/assets/cold-shake/cold-milo.jpg";
import coldBournvita from "@/app/assets/cold-shake/cold-bournvita.jpg";
import blackTea from "@/app/assets/water-based-tea/black-tea.jpg";
import honeyGingerTea from "@/app/assets/water-based-tea/honey-ginger-tea.jpg";
import lemonTea from "@/app/assets/water-based-tea/lemon-tea.jpg";
import honeyLemonTea from "@/app/assets/water-based-tea/honey-lemon-tea.jpg";
import sukkuMalliTea from "@/app/assets/water-based-tea/sukku-malli-tea.jpg";
import thulasiTea from "@/app/assets/water-based-tea/thulasi-tea.jpg";
import hibiscusTea from "@/app/assets/water-based-tea/hibiscus-tea.jpg";
import icedTea from "@/app/assets/chillers/iced-tea.jpg";
import lemonCooler from "@/app/assets/chillers/lemon-cooler.jpg";
import coldBlackCoffee from "@/app/assets/chillers/cold-black-coffee.jpg";
import classicFries from "@/app/assets/fries/classic-french-fries.jpg";
import periPeriFries from "@/app/assets/fries/periperi-french-fries.jpg";
import cheesyFries from "@/app/assets/fries/cheesy-fernch-fries.jpg";
import alooSamosa from "@/app/assets/samosa/aloo-samosa.jpg";
import miniAlooSamosa from "@/app/assets/samosa/miniu-aloo-samosa.jpg";
import cheeseCornSamosa from "@/app/assets/samosa/cheese-corn-samosa.jpg";
import chickenSamosa from "@/app/assets/samosa/chicken-samosa.jpg";
import vegPuff from "@/app/assets/puff/veg-puff.jpg";
import eggPuff from "@/app/assets/puff/egg-puff.jpg";
import chickenPuff from "@/app/assets/puff/chicken-puff.jpg";
import cheeseCornNuggets from "@/app/assets/quick-bites/cheese-corn-nuggets.jpg";
import chickenNuggets from "@/app/assets/quick-bites/chicken-nuggets.jpg";
import cheeseBalls from "@/app/assets/quick-bites/cheese-balls.jpg";
import chickenPopcorn from "@/app/assets/quick-bites/cheese-balls.jpg";
import vegCutlet from "@/app/assets/quick-bites/cheese-corn-nuggets.jpg";
import chickenCutlet from "@/app/assets/quick-bites/chicken-nuggets.jpg";
import paneerRoll from "@/app/assets/quick-bites/cheese-corn-nuggets.jpg";
import chickenRoll from "@/app/assets/quick-bites/cheese-balls.jpg";
import plainMaggi from "@/app/assets/maggi/plain-maggi.jpg";
import masalaMaggi from "@/app/assets/maggi/masala-maggi.jpg";
import periPeriMaggi from "@/app/assets/maggi/periperi-maggi.jpg";
import cheeseMaggi from "@/app/assets/maggi/cheese-maggi.jpg";

import Imagf1 from "@/app/assets/quick-bites/cheese-balls.jpg";
import Imagf2 from "@/app/assets/quick-bites/cheese-corn-nuggets.jpg";
import Imagf3 from "@/app/assets/quick-bites/chicken-nuggets.jpg";
import Imagf4 from "@/app/assets/samosa/cheese-corn-samosa.jpg";

import Imagf01 from "@/app/assets/samosa/aloo-samosa.jpg";
import Imagf02 from "@/app/assets/samosa/cheese-corn-samosa.jpg";
import Imagf03 from "@/app/assets/samosa/chicken-samosa.jpg";
import Imagf04 from "@/app/assets/samosa/miniu-aloo-samosa.jpg";

import ImagC1 from "@/app/assets/chillers/cold-black-coffee.jpg";
import ImagC2 from "@/app/assets/maggi/cheese-maggi.jpg";
import ImagC3 from "@/app/assets/maggi/masala-maggi.jpg";

import Imagc from "@/app/assets/puff/chicken-puff.jpg";
import Imagc2 from "@/app/assets/puff/egg-puff.jpg";
import Imagc3 from "@/app/assets/puff/veg-puff.jpg";

import ImagS from "@/app/assets/hot-milk/badam-milk.jpg";
import imagS1 from "@/app/assets/hot-milk/hot-chocolate.jpg";
import imagS2 from "@/app/assets/hot-milk/masala-milk.jpg";
import imagS3 from "@/app/assets/hot-milk/masala-milk.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  description: string;
  weight?: string;
  rating?: number;
  reviews?: number;
  reviewCount?: number;
  deliveryTime?: string;
  badge?: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

// --- 2. DEFINE THE DATA EXACTLY AS IN POS PAGE ---
// This ensures IDs like "milk1" match what is stored in localStorage
const posData: Record<string, Product[]> = {
  "milk-tea": [
    { id: "milk1", name: "Signature Tea", description: "Our special signature milk tea blend.", price: 25, image: milk01.src, rating: 4.9, reviewCount: 120 },
    { id: "milk2", name: "Classic Tea", description: "Traditional classic milk tea.", price: 15, image: milk02.src, rating: 4.7, reviewCount: 95 },
    { id: "milk3", name: "Elachi Tea", description: "Aromatic cardamom flavored milk tea.", price: 20, image: milk03.src, rating: 4.8, reviewCount: 88 },
    { id: "milk4", name: "Ginger Tea", description: "Refreshing ginger infused milk tea.", price: 20, image: gingerTea.src, rating: 4.9, reviewCount: 140 },
  ],
  "hot-milk": [
    { id: "hot1", name: "Manjal Milagu Milk", description: "Turmeric and pepper infused hot milk.", price: 25, image: hotMilk01.src, rating: 4.8, reviewCount: 80 },
    { id: "hot2", name: "Badam Milk", description: "Creamy almond flavored milk.", price: 15, image: hotMilk02.src, rating: 4.7, reviewCount: 60 },
    { id: "hot3", name: "Panankarkandu Milk", description: "Palm sugar sweetened hot milk.", price: 15, image: hotMilk03.src, rating: 4.6, reviewCount: 45 },
    { id: "hot4", name: "Naatu Sakkarai", description: "Natural jaggery sweetened milk.", price: 15, image: hotMilk04.src, rating: 4.7, reviewCount: 50 },
    { id: "hot5", name: "Hot Chocolate", description: "Rich and creamy hot chocolate.", price: 100, image: hotMilk05.src, rating: 4.9, reviewCount: 110 },
  ],
  coffee: [
    { id: "coffee1", name: "Filter Coffee", description: "Authentic South Indian filter coffee.", price: 25, image: filterCoffee.src, rating: 4.9, reviewCount: 200 },
    { id: "coffee2", name: "Double Strong Filter Coffee", description: "Extra strong filter coffee.", price: 30, image: doubleStrongCoffee.src, rating: 4.8, reviewCount: 130 },
    { id: "coffee3", name: "Sukku Malli Coffee", description: "Dry ginger coriander coffee.", price: 25, image: sukkuMalliCoffee.src, rating: 4.7, reviewCount: 90 },
    { id: "coffee4", name: "Black Coffee", description: "Pure black coffee without milk.", price: 20, image: blackCoffee.src, rating: 4.6, reviewCount: 70 },
  ],
  "cold-shakes": [
    { id: "shake1", name: "Cold Chocolate", description: "Chilled chocolate shake.", price: 120, image: coldChocolate.src, rating: 4.8, reviewCount: 85 },
    { id: "shake2", name: "Hazelnut Cold Chocolate", description: "Chocolate shake with hazelnut.", price: 120, image: hazelnutColdChocolate.src, rating: 4.9, reviewCount: 75 },
    { id: "shake3", name: "Cold Milo", description: "Refreshing cold Milo shake.", price: 120, image: coldMilo.src, rating: 4.7, reviewCount: 60 },
    { id: "shake4", name: "Cold Bournvita", description: "Chilled Bournvita shake.", price: 120, image: coldBournvita.src, rating: 4.7, reviewCount: 55 },
  ],
  "water-tea": [
    { id: "water1", name: "Black Tea", description: "Simple water-based black tea.", price: 15, image: blackTea.src, rating: 4.6, reviewCount: 40 },
    { id: "water2", name: "Honey Ginger Tea", description: "Soothing honey and ginger tea.", price: 20, image: honeyGingerTea.src, rating: 4.8, reviewCount: 65 },
    { id: "water3", name: "Lemon Tea", description: "Refreshing lemon flavored tea.", price: 20, image: lemonTea.src, rating: 4.7, reviewCount: 50 },
    { id: "water4", name: "Honey Lemon Tea", description: "Sweet honey with tangy lemon tea.", price: 20, image: honeyLemonTea.src, rating: 4.8, reviewCount: 55 },
    { id: "water5", name: "Sukku Malli Tea", description: "Dry ginger coriander tea.", price: 20, image: sukkuMalliTea.src, rating: 4.7, reviewCount: 52 },
    { id: "water6", name: "Thulasi Tea", description: "Holy basil infused herbal tea.", price: 20, image: thulasiTea.src, rating: 4.8, reviewCount: 48 },
    { id: "water7", name: "Hibiscus Tea", description: "Floral hibiscus water-based tea.", price: 20, image: hibiscusTea.src, rating: 4.6, reviewCount: 30 },
  ],
  chillers: [
    { id: "chill1", name: "Iced Tea", description: "Refreshing chilled iced tea.", price: 60, image: icedTea.src, rating: 4.7, reviewCount: 42 },
    { id: "chill2", name: "Lemon Cooler", description: "Cool and tangy lemon refresher.", price: 50, image: lemonCooler.src, rating: 4.8, reviewCount: 38 },
    { id: "chill3", name: "Cold Black Coffee", description: "Chilled black coffee.", price: 60, image: coldBlackCoffee.src, rating: 4.6, reviewCount: 33 },
  ],
  fries: [
    { id: "fries1", name: "Classic French Fries", description: "Crispy golden french fries.", price: 60, image: classicFries.src, rating: 4.8, reviewCount: 90 },
    { id: "fries2", name: "Peri Peri French Fries", description: "Spicy peri peri seasoned fries.", price: 80, image: periPeriFries.src, rating: 4.8, reviewCount: 75 },
    { id: "fries3", name: "Cheesy French Fries", description: "Fries loaded with melted cheese.", price: 80, image: cheesyFries.src, rating: 4.7, reviewCount: 68 },
  ],
  samosa: [
    { id: "samosa1", name: "Aloo Samosa", description: "Classic potato filled samosa.", price: 15, image: alooSamosa.src, rating: 4.7, reviewCount: 60 },
    { id: "samosa2", name: "Mini Aloo Samosa", description: "Bite-sized potato samosas.", price: 20, image: miniAlooSamosa.src, rating: 4.7, reviewCount: 55 },
    { id: "samosa3", name: "Cheese Corn Samosa", description: "Cheesy corn filled samosa.", price: 40, image: cheeseCornSamosa.src, rating: 4.8, reviewCount: 50 },
    { id: "samosa4", name: "Chicken Samosa", description: "Spiced chicken filled samosa.", price: 50, image: chickenSamosa.src, rating: 4.8, reviewCount: 58 },
  ],
  puff: [
    { id: "puff1", name: "Veg Puff", description: "Flaky pastry with vegetable filling.", price: 30, image: vegPuff.src, rating: 4.7, reviewCount: 40 },
    { id: "puff2", name: "Egg Puff", description: "Puff pastry with egg filling.", price: 35, image: eggPuff.src, rating: 4.7, reviewCount: 38 },
    { id: "puff3", name: "Chicken Puff", description: "Crispy puff with chicken filling.", price: 40, image: chickenPuff.src, rating: 4.8, reviewCount: 45 },
  ],
  "quick-bites": [
    { id: "qb1", name: "Cheese Corn Nuggets", description: "Crispy cheese and corn nuggets.", price: 80, image: cheeseCornNuggets.src, rating: 4.8, reviewCount: 55 },
    { id: "qb2", name: "Chicken Nuggets", description: "Golden fried chicken nuggets.", price: 80, image: chickenNuggets.src, rating: 4.8, reviewCount: 60 },
    { id: "qb3", name: "Cheese Balls", description: "Crispy cheese balls.", price: 70, image: cheeseBalls.src, rating: 4.7, reviewCount: 50 },
    { id: "qb4", name: "Chicken Popcorn", description: "Bite-sized crispy chicken pieces.", price: 80, image: chickenPopcorn.src, rating: 4.8, reviewCount: 62 },
    { id: "qb5", name: "Veg Cutlet", description: "Spiced vegetable cutlet.", price: 40, image: vegCutlet.src, rating: 4.6, reviewCount: 35 },
    { id: "qb6", name: "Chicken Cutlet", description: "Crispy chicken cutlet.", price: 50, image: chickenCutlet.src, rating: 4.7, reviewCount: 37 },
    { id: "qb7", name: "Paneer Roll", description: "Paneer wrapped in a soft roll.", price: 70, image: paneerRoll.src, rating: 4.7, reviewCount: 42 },
    { id: "qb8", name: "Chicken Roll", description: "Chicken wrapped in a soft roll.", price: 80, image: chickenRoll.src, rating: 4.8, reviewCount: 48 },
  ],
  maggi: [
    { id: "maggi1", name: "Plain Maggi", description: "Classic plain Maggi noodles.", price: 50, image: plainMaggi.src, rating: 4.7, reviewCount: 52 },
    { id: "maggi2", name: "Masala Maggi", description: "Spiced masala Maggi noodles.", price: 60, image: masalaMaggi.src, rating: 4.8, reviewCount: 60 },
    { id: "maggi3", name: "Peri Peri Maggi", description: "Maggi with peri peri seasoning.", price: 70, image: periPeriMaggi.src, rating: 4.8, reviewCount: 45 },
    { id: "maggi4", name: "Cheese Maggi", description: "Cheesy Maggi noodles.", price: 80, image: cheeseMaggi.src, rating: 4.8, reviewCount: 58 },
  ],

   trendingDishes: [
  {
    id: "trending1",
    name: "Aloo Samosa",
    description: "Crispy samosa stuffed with spiced potato filling.",
    price: 20,
    image: Imagf1.src,
    badge: "#1 Seller",
    deliveryTime: "8 mins",
    rating: 4.9,
    reviews: 3.2,
  },
  {
    id: "trending2",
    name: "Cheese Corn Samosa",
    description: "A fusion samosa loaded with cheese and sweet corn.",
    price: 25,
    image: Imagf2.src,
    badge: "#2 Seller",
    deliveryTime: "10 mins",
    rating: 4.8,
    reviews: 2.4,
  },
  {
    id: "trending3",
    name: "Chicken Samosa",
    description: "Spicy minced chicken wrapped in a crispy shell.",
    price: 35,
    image: Imagf3.src,
    badge: "#3 Seller",
    deliveryTime: "12 mins",
    rating: 4.7,
    reviews: 1.9,
  },
  {
    id: "trending4",
    name: "Mini Aloo Samosas",
    description: "Bite-sized crispy samosas perfect for snacking.",
    price: 15,
    image: Imagf4.src,
    badge: "#4 Seller",
    deliveryTime: "6 mins",
    rating: 4.6,
    reviews: 1.4,
  },
],

  special: [{
    id: "special1",
    name: "Cheese Balls",
    description: "Crispy, golden cheese balls served hot with spicy mayo.",
    price: 89,
    image: Imagf01.src,
    deliveryTime: "10 mins",
    rating: 4.7,
    reviews: 1.2,
  },
  {
    id: "special2",
    name: "Cheese Corn Nuggets",
    description: "Crunchy bites loaded with melted cheese and sweet corn.",
    price: 99,
    image: Imagf02.src,
    deliveryTime: "12 mins",
    rating: 4.8,
    reviews: 2.5,
  },
  {
    id: "special3",
    name: "Chicken Nuggets",
    description: "Tender chicken nuggets fried to a golden crisp.",
    price: 119,
    image: Imagf03.src,
    deliveryTime: "15 mins",
    rating: 4.9,
    reviews: 3.1,
  },
  {
    id: "special4",
    name: "Cheese Corn Samosa",
    description: "A fusion samosa stuffed with cheese & sweet corn filling.",
    price: 79,
    image: Imagf04.src,
    deliveryTime: "8 mins",
    rating: 4.6,
    reviews: 1.8,
  }
  ],

  chefSpecials: [
  {
    id: "chef1",
    name: "Cold Black Coffee",
    description: "Strong, chilled, refreshing black coffee served over ice.",
    price: 69,
    image: ImagC1.src,
    badge: "Chef's Pick",
  },
  {
    id: "chef2",
    name: "Cheese Maggi",
    description: "Hot and creamy Maggi loaded with melted cheese.",
    price: 89,
    image: ImagC2.src,
    badge: "Chef's Pick",
  },
  {
    id: "chef3",
    name: "Masala Maggi",
    description: "Classic spicy Maggi cooked with veggies & masala.",
    price: 79,
    image: ImagC3.src,
    badge: "Chef's Pick",
  },
],

  ratedDishes: [
  {
    id: "rated1",
    name: "Chicken Puff",
    description: "Flaky puff pastry filled with spicy chicken stuffing.",
    price: 35,
    image: Imagc.src,
    rating: 5,
    reviewCount: 128,
  },
  {
    id: "rated2",
    name: "Egg Puff",
    description: "Classic bakery-style egg puff with masala filling.",
    price: 30,
    image: Imagc2.src,
    rating: 4.8,
    reviewCount: 95,
  },
  {
    id: "rated3",
    name: "Veg Puff",
    description: "Crispy puff loaded with mixed veggies and mild spices.",
    price: 25,
    image: Imagc3.src,
    rating: 4.7,
    reviewCount: 82,
  },
],

  discountedDishes: [
  {
    id: "discount1",
    name: "Badam Milk",
    description: "Rich almond milk flavored with saffron and cardamom.",
    price: 50,
    discountedPrice: 40,
    image: ImagS.src,
    badge: "20% OFF",
    deliveryTime: "5 mins",
    rating: 4.8,
    reviews: 2.1,
  },
  {
    id: "discount2",
    name: "Hot Chocolate",
    description: "Thick and creamy chocolate drink topped with cocoa.",
    price: 70,
    discountedPrice: 70, // for BUY 1 GET 1 offer
    image: imagS1.src,
    badge: "BUY 1 GET 1",
    deliveryTime: "6 mins",
    rating: 4.7,
    reviews: 3.4,
  },
  {
    id: "discount3",
    name: "Masala Milk",
    description: "Traditional spiced milk with pepper, ginger & herbs.",
    price: 45,
    discountedPrice: 34,
    image: imagS2.src,
    badge: "25% OFF",
    deliveryTime: "4 mins",
    rating: 4.6,
    reviews: 1.8,
  },
  {
    id: "discount4",
    name: "Special Masala Milk",
    description: "Premium version with extra nuts & strong spice mix.",
    price: 55,
    discountedPrice: 44,
    image: imagS3.src,
    badge: "20% OFF",
    deliveryTime: "5 mins",
    rating: 4.5,
    reviews: 1.1,
  },
]

};

// --- 3. FLATTEN DATA FOR LOOKUP ---
const allProducts = Object.values(posData).flat();

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState("home")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const router = useRouter()

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("foodCart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsLoading(false)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("foodCart", JSON.stringify(cart))
    }
  }, [cart, isLoading])

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.productId !== productId))
    } else {
      setCart(cart.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "qwiky10") {
      setPromoApplied(true)
    }
  }

  const getCartItems = () => {
    return cart
      .map((cartItem) => {
        // --- 4. FIND PRODUCT IN FLATTENED ARRAY ---
        const product = allProducts.find((dish) => dish.id === cartItem.productId)
        return product ? { ...product, quantity: cartItem.quantity } : null
      })
      .filter(Boolean) as (Product & { quantity: number })[]
  }

  const calculateSubtotal = () => {
    return getCartItems().reduce((total, item) => {
      const price = item.discountedPrice || item.price
      return total + price * item.quantity
    }, 0)
  }

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal()
    // Free delivery over 500 (since your items are priced ~25-100)
    return subtotal > 500 ? 0 : 30
  }

  const calculateDiscount = () => {
    return promoApplied ? calculateSubtotal() * 0.1 : 0
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const deliveryFee = calculateDeliveryFee()
    const discount = calculateDiscount()
    return subtotal + deliveryFee - discount
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart after successful checkout
    clearCart()
    setIsCheckingOut(false)

    // You could redirect to a success page here
    alert("Order placed successfully! 🎉")
  }

  const cartItems = getCartItems()
  const subtotal = calculateSubtotal()
  const deliveryFee = calculateDeliveryFee()
  const discount = calculateDiscount()
  const total = calculateTotal()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#917c3d]"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
            <button onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
          <Button
            onClick={() => router.back()}
            className="bg-[#917c3d] hover:bg-[#e55a2b] text-white px-8 py-3 rounded-lg font-medium"
          >
            Browse Menu
          </Button>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Your Cart ({cartItems.length} items)</h1>
          </div>
          <button onClick={clearCart} className="text-red-500 hover:text-red-600 font-medium text-sm">
            Clear All
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Items</h2>

                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {item.badge && (
                          <div className="absolute -top-1 -right-1 bg-[#917c3d] text-white text-xs font-bold px-1 py-0.5 rounded-full text-[10px]">
                            {item.badge}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-bold text-[#917c3d]">
                            ₹{(item.discountedPrice || item.price).toFixed(2)}
                          </span>
                          {item.discountedPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-gray-100 rounded-lg">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#917c3d]"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#917c3d]"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Delivery Address */}
            {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Delivery Address</h2>
              <div className="space-y-3">
                <div
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-colors",
                    selectedAddress === "home"
                      ? "border-[#917c3d] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => setSelectedAddress("home")}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#917c3d]" />
                    <div>
                      <p className="font-medium text-gray-800">Home</p>
                      <p className="text-sm text-gray-600">123 Main Street, City, State 12345</p>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-colors",
                    selectedAddress === "work"
                      ? "border-[#917c3d] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => setSelectedAddress("work")}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#917c3d]" />
                    <div>
                      <p className="font-medium text-gray-800">Work</p>
                      <p className="text-sm text-gray-600">456 Business Ave, City, State 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

              {/* Promo Code */}
              {/* <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#917c3d] focus:border-transparent"
                    disabled={promoApplied}
                  />
                  <Button
                    onClick={applyPromoCode}
                    disabled={promoApplied || !promoCode}
                    className="bg-[#917c3d] hover:bg-[#e55a2b] text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && <p className="text-sm text-green-600 mt-2">✓ Promo code applied!</p>}
                <p className="text-xs text-gray-500 mt-1">Try: QWIKY10 for 10% off</p>
              </div> */}

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#917c3d]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Time */}
              {/* <div className="flex items-center space-x-2 mb-6 p-3 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-[#917c3d]" />
                <span className="text-sm font-medium text-gray-800">Estimated delivery: 25-35 mins</span>
              </div> */}

              {/* Payment Method */}
              {/* <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors",
                      selectedPayment === "card"
                        ? "border-[#917c3d] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                    onClick={() => setSelectedPayment("card")}
                  >
                    <CreditCard className="w-5 h-5 text-[#917c3d]" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors",
                      selectedPayment === "wallet"
                        ? "border-[#917c3d] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                    onClick={() => setSelectedPayment("wallet")}
                  >
                    <Wallet className="w-5 h-5 text-[#917c3d]" />
                    <span className="font-medium">Digital Wallet</span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors",
                      selectedPayment === "cash"
                        ? "border-[#917c3d] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                    onClick={() => setSelectedPayment("cash")}
                  >
                    <Smartphone className="w-5 h-5 text-[#917c3d]" />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </div>
              </div> */}

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#917c3d] hover:bg-[#917c3d] text-white py-4 rounded-lg font-medium text-lg disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Place Order • ₹${total.toFixed(2)}`
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}