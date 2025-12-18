"use client";

import type React from "react";
import { useState, useEffect } from "react"; // Removed useContext, added hooks
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button"; // Added Button import
import Image from "next/image";
import { cn } from "@/lib/utils";

import Header from "@/components/header";
import Footer from "@/components/footer";
import DishCard from "@/lib/dish-card";
import {
  CartContext,
  type Product,
   // Ensure this is exported from your listing file or defined here
} from "@/components/food-product-listing";

// --- IMAGES (Kept exactly as you provided) ---
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

// --- TYPES & DATA ---
type Category = {
  id: string;
  icon: string;
  label: string;
};

// Ensure CartItem is defined if not exported
interface CartItem {
  productId: string;
  quantity: number;
}

const categories: Category[] = [
  { id: "milk-tea", icon: "🍵", label: "Milk Tea" },
  { id: "hot-milk", icon: "🥛", label: "Hot Milk" },
  { id: "coffee", icon: "☕", label: "Coffee" },
  { id: "cold-shakes", icon: "🥤", label: "Cold Shakes" },
  { id: "water-tea", icon: "🫖", label: "Water Based Tea" },
  { id: "chillers", icon: "🧊", label: "Chillers" },
  { id: "fries", icon: "🍟", label: "Fries" },
  { id: "samosa", icon: "🥟", label: "Samosa" },
  { id: "puff", icon: "🥧", label: "Puff" },
  { id: "quick-bites", icon: "🍗", label: "Quick Bites" },
  { id: "maggi", icon: "🍜", label: "Maggi" },
];

const posData: Record<string, Product[]> = {
  "milk-tea": [
    {
      id: "milk1",
      name: "Signature Tea",
      description: "Our special signature milk tea blend.",
      price: 25,
      image: milk01.src,
      rating: 4.9,
      reviewCount: 120,
      reviewQuote: "Must-have with every visit.",
    },
    {
      id: "milk2",
      name: "Classic Tea",
      description: "Traditional classic milk tea.",
      price: 15,
      image: milk02.src,
      rating: 4.7,
      reviewCount: 95,
      reviewQuote: "Simple and comforting.",
    },
    {
      id: "milk3",
      name: "Elachi Tea",
      description: "Aromatic cardamom flavored milk tea.",
      price: 20,
      image: milk03.src,
      rating: 4.8,
      reviewCount: 88,
      reviewQuote: "Fragrant and refreshing.",
    },
    {
      id: "milk4",
      name: "Ginger Tea",
      description: "Refreshing ginger infused milk tea.",
      price: 20,
      image: gingerTea.src,
      rating: 4.9,
      reviewCount: 140,
      reviewQuote: "Perfect for cold evenings.",
    },
  ],
  "hot-milk": [
    {
      id: "hot1",
      name: "Manjal Milagu Milk",
      description: "Turmeric and pepper infused hot milk.",
      price: 25,
      image: hotMilk01.src,
      rating: 4.8,
      reviewCount: 80,
      reviewQuote: "Comforting and healthy.",
    },
    {
      id: "hot2",
      name: "Badam Milk",
      description: "Creamy almond flavored milk.",
      price: 15,
      image: hotMilk02.src,
      rating: 4.7,
      reviewCount: 60,
      reviewQuote: "Kids love this one.",
    },
    {
      id: "hot3",
      name: "Panankarkandu Milk",
      description: "Palm sugar sweetened hot milk.",
      price: 15,
      image: hotMilk03.src,
      rating: 4.6,
      reviewCount: 45,
      reviewQuote: "Great for the throat.",
    },
    {
      id: "hot4",
      name: "Naatu Sakkarai",
      description: "Natural jaggery sweetened milk.",
      price: 15,
      image: hotMilk04.src,
      rating: 4.7,
      reviewCount: 50,
      reviewQuote: "Authentic and nostalgic taste.",
    },
    {
      id: "hot5",
      name: "Hot Chocolate",
      description: "Rich and creamy hot chocolate.",
      price: 100,
      image: hotMilk05.src,
      rating: 4.9,
      reviewCount: 110,
      reviewQuote: "Chocolate lovers’ favorite.",
    },
  ],
  coffee: [
    {
      id: "coffee1",
      name: "Filter Coffee",
      description: "Authentic South Indian filter coffee.",
      price: 25,
      image: filterCoffee.src,
      rating: 4.9,
      reviewCount: 200,
      reviewQuote: "Best filter coffee around.",
    },
    {
      id: "coffee2",
      name: "Double Strong Filter Coffee",
      description: "Extra strong filter coffee.",
      price: 30,
      image: doubleStrongCoffee.src,
      rating: 4.8,
      reviewCount: 130,
      reviewQuote: "Gives the perfect kick.",
    },
    {
      id: "coffee3",
      name: "Sukku Malli Coffee",
      description: "Dry ginger coriander coffee.",
      price: 25,
      image: sukkuMalliCoffee.src,
      rating: 4.7,
      reviewCount: 90,
      reviewQuote: "Soothing and aromatic.",
    },
    {
      id: "coffee4",
      name: "Black Coffee",
      description: "Pure black coffee without milk.",
      price: 20,
      image: blackCoffee.src,
      rating: 4.6,
      reviewCount: 70,
      reviewQuote: "Strong and straightforward.",
    },
  ],
  "cold-shakes": [
    {
      id: "shake1",
      name: "Cold Chocolate",
      description: "Chilled chocolate shake.",
      price: 120,
      image: coldChocolate.src,
      rating: 4.8,
      reviewCount: 85,
      reviewQuote: "Thick and indulgent.",
    },
    {
      id: "shake2",
      name: "Hazelnut Cold Chocolate",
      description: "Chocolate shake with hazelnut.",
      price: 120,
      image: hazelnutColdChocolate.src,
      rating: 4.9,
      reviewCount: 75,
      reviewQuote: "Nutty and rich flavor.",
    },
    {
      id: "shake3",
      name: "Cold Milo",
      description: "Refreshing cold Milo shake.",
      price: 120,
      image: coldMilo.src,
      rating: 4.7,
      reviewCount: 60,
      reviewQuote: "Childhood favorite.",
    },
    {
      id: "shake4",
      name: "Cold Bournvita",
      description: "Chilled Bournvita shake.",
      price: 120,
      image: coldBournvita.src,
      rating: 4.7,
      reviewCount: 55,
      reviewQuote: "Perfect evening drink.",
    },
  ],
  "water-tea": [
    {
      id: "water1",
      name: "Black Tea",
      description: "Simple water-based black tea.",
      price: 15,
      image: blackTea.src,
      rating: 4.6,
      reviewCount: 40,
      reviewQuote: "Light and refreshing.",
    },
    {
      id: "water2",
      name: "Honey Ginger Tea",
      description: "Soothing honey and ginger tea.",
      price: 20,
      image: honeyGingerTea.src,
      rating: 4.8,
      reviewCount: 65,
      reviewQuote: "Perfect when feeling low.",
    },
    {
      id: "water3",
      name: "Lemon Tea",
      description: "Refreshing lemon flavored tea.",
      price: 20,
      image: lemonTea.src,
      rating: 4.7,
      reviewCount: 50,
      reviewQuote: "Crisp citrus notes.",
    },
    {
      id: "water4",
      name: "Honey Lemon Tea",
      description: "Sweet honey with tangy lemon tea.",
      price: 20,
      image: honeyLemonTea.src,
      rating: 4.8,
      reviewCount: 55,
      reviewQuote: "Balanced sweet and sour.",
    },
    {
      id: "water5",
      name: "Sukku Malli Tea",
      description: "Dry ginger coriander tea.",
      price: 20,
      image: sukkuMalliTea.src,
      rating: 4.7,
      reviewCount: 52,
      reviewQuote: "Feels very homely.",
    },
    {
      id: "water6",
      name: "Thulasi Tea",
      description: "Holy basil infused herbal tea.",
      price: 20,
      image: thulasiTea.src,
      rating: 4.8,
      reviewCount: 48,
      reviewQuote: "Great for the cold.",
    },
    {
      id: "water7",
      name: "Hibiscus Tea",
      description: "Floral hibiscus water-based tea.",
      price: 20,
      image: hibiscusTea.src,
      rating: 4.6,
      reviewCount: 30,
      reviewQuote: "Unique floral taste.",
    },
  ],
  chillers: [
    {
      id: "chill1",
      name: "Iced Tea",
      description: "Refreshing chilled iced tea.",
      price: 60,
      image: icedTea.src,
      rating: 4.7,
      reviewCount: 42,
      reviewQuote: "Perfect for hot days.",
    },
    {
      id: "chill2",
      name: "Lemon Cooler",
      description: "Cool and tangy lemon refresher.",
      price: 50,
      image: lemonCooler.src,
      rating: 4.8,
      reviewCount: 38,
      reviewQuote: "Instant refresher.",
    },
    {
      id: "chill3",
      name: "Cold Black Coffee",
      description: "Chilled black coffee.",
      price: 60,
      image: coldBlackCoffee.src,
      rating: 4.6,
      reviewCount: 33,
      reviewQuote: "Strong and icy.",
    },
  ],
  fries: [
    {
      id: "fries1",
      name: "Classic French Fries",
      description: "Crispy golden french fries.",
      price: 60,
      image: classicFries.src,
      rating: 4.8,
      reviewCount: 90,
      reviewQuote: "Always crispy and hot.",
    },
    {
      id: "fries2",
      name: "Peri Peri French Fries",
      description: "Spicy peri peri seasoned fries.",
      price: 80,
      image: periPeriFries.src,
      rating: 4.8,
      reviewCount: 75,
      reviewQuote: "Perfect spice level.",
    },
    {
      id: "fries3",
      name: "Cheesy French Fries",
      description: "Fries loaded with melted cheese.",
      price: 80,
      image: cheesyFries.src,
      rating: 4.7,
      reviewCount: 68,
      reviewQuote: "Super cheesy and filling.",
    },
  ],
  samosa: [
    {
      id: "samosa1",
      name: "Aloo Samosa",
      description: "Classic potato filled samosa.",
      price: 15,
      image: alooSamosa.src,
      rating: 4.7,
      reviewCount: 60,
      reviewQuote: "Crispy and well stuffed.",
    },
    {
      id: "samosa2",
      name: "Mini Aloo Samosa",
      description: "Bite-sized potato samosas.",
      price: 20,
      image: miniAlooSamosa.src,
      rating: 4.7,
      reviewCount: 55,
      reviewQuote: "Perfect for sharing.",
    },
    {
      id: "samosa3",
      name: "Cheese Corn Samosa",
      description: "Cheesy corn filled samosa.",
      price: 40,
      image: cheeseCornSamosa.src,
      rating: 4.8,
      reviewCount: 50,
      reviewQuote: "Gooey and crunchy combo.",
    },
    {
      id: "samosa4",
      name: "Chicken Samosa",
      description: "Spiced chicken filled samosa.",
      price: 50,
      image: chickenSamosa.src,
      rating: 4.8,
      reviewCount: 58,
      reviewQuote: "Juicy and flavorful filling.",
    },
  ],
  puff: [
    {
      id: "puff1",
      name: "Veg Puff",
      description: "Flaky pastry with vegetable filling.",
      price: 30,
      image: vegPuff.src,
      rating: 4.7,
      reviewCount: 40,
      reviewQuote: "Layers are super flaky.",
    },
    {
      id: "puff2",
      name: "Egg Puff",
      description: "Puff pastry with egg filling.",
      price: 35,
      image: eggPuff.src,
      rating: 4.7,
      reviewCount: 38,
      reviewQuote: "Great with evening tea.",
    },
    {
      id: "puff3",
      name: "Chicken Puff",
      description: "Crispy puff with chicken filling.",
      price: 40,
      image: chickenPuff.src,
      rating: 4.8,
      reviewCount: 45,
      reviewQuote: "Stuffing is generous.",
    },
  ],
  "quick-bites": [
    {
      id: "qb1",
      name: "Cheese Corn Nuggets",
      description: "Crispy cheese and corn nuggets.",
      price: 80,
      image: cheeseCornNuggets.src,
      rating: 4.8,
      reviewCount: 55,
      reviewQuote: "Kids’ absolute favorite.",
    },
    {
      id: "qb2",
      name: "Chicken Nuggets",
      description: "Golden fried chicken nuggets.",
      price: 80,
      image: chickenNuggets.src,
      rating: 4.8,
      reviewCount: 60,
      reviewQuote: "Crispy outside, juicy inside.",
    },
    {
      id: "qb3",
      name: "Cheese Balls",
      description: "Crispy cheese balls.",
      price: 70,
      image: cheeseBalls.src,
      rating: 4.7,
      reviewCount: 50,
      reviewQuote: "Melts in the mouth.",
    },
    {
      id: "qb4",
      name: "Chicken Popcorn",
      description: "Bite-sized crispy chicken pieces.",
      price: 80,
      image: chickenPopcorn.src,
      rating: 4.8,
      reviewCount: 62,
      reviewQuote: "Addictive snacking item.",
    },
    {
      id: "qb5",
      name: "Veg Cutlet",
      description: "Spiced vegetable cutlet.",
      price: 40,
      image: vegCutlet.src,
      rating: 4.6,
      reviewCount: 35,
      reviewQuote: "Good with ketchup.",
    },
    {
      id: "qb6",
      name: "Chicken Cutlet",
      description: "Crispy chicken cutlet.",
      price: 50,
      image: chickenCutlet.src,
      rating: 4.7,
      reviewCount: 37,
      reviewQuote: "Nice crunchy crust.",
    },
    {
      id: "qb7",
      name: "Paneer Roll",
      description: "Paneer wrapped in a soft roll.",
      price: 70,
      image: paneerRoll.src,
      rating: 4.7,
      reviewCount: 42,
      reviewQuote: "Good as a light meal.",
    },
    {
      id: "qb8",
      name: "Chicken Roll",
      description: "Chicken wrapped in a soft roll.",
      price: 80,
      image: chickenRoll.src,
      rating: 4.8,
      reviewCount: 48,
      reviewQuote: "Very filling and tasty.",
    },
  ],
  maggi: [
    {
      id: "maggi1",
      name: "Plain Maggi",
      description: "Classic plain Maggi noodles.",
      price: 50,
      image: plainMaggi.src,
      rating: 4.7,
      reviewCount: 52,
      reviewQuote: "Simple and satisfying.",
    },
    {
      id: "maggi2",
      name: "Masala Maggi",
      description: "Spiced masala Maggi noodles.",
      price: 60,
      image: masalaMaggi.src,
      rating: 4.8,
      reviewCount: 60,
      reviewQuote: "Loaded with flavor.",
    },
    {
      id: "maggi3",
      name: "Peri Peri Maggi",
      description: "Maggi with peri peri seasoning.",
      price: 70,
      image: periPeriMaggi.src,
      rating: 4.8,
      reviewCount: 45,
      reviewQuote: "Great spicy twist.",
    },
    {
      id: "maggi4",
      name: "Cheese Maggi",
      description: "Cheesy Maggi noodles.",
      price: 80,
      image: cheeseMaggi.src,
      rating: 4.8,
      reviewCount: 58,
      reviewQuote: "Comfort bowl of noodles.",
    },
  ],
};

export default function PosPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("milk-tea");

  // --- INITIALIZE CART STATE (Copied from FoodProductListing) ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- LOCAL STORAGE EFFECTS ---
  useEffect(() => {
    const savedCart = localStorage.getItem("foodCart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // --- CART HANDLERS ---
  const getTotalCartItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getProductQuantity = (productId: string) => {
    const item = cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const addToCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return prevCart.filter((item) => item.productId !== productId);
    });
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId],
    );
  };

  // --- CONTEXT VALUE ---
  const cartContextValue = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    getProductQuantity,
    getTotalCartItems,
    setSelectedProduct,
    toggleFavorite,
  };

  return (
    // WRAP EVERYTHING IN THE PROVIDER
    <CartContext.Provider value={cartContextValue}>
      <div className="flex h-screen flex-col bg-gray-50">
        <Header />

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="flex h-[calc(100vh-64px-64px)] w-[80px] flex-col items-center overflow-y-auto border-r scroll-smooth bg-white">
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                icon={cat.icon}
                label={cat.label}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>

          {/* Grid of DishCard */}
          <div className="h-[calc(100vh-64px-64px)] flex-1 overflow-y-auto p-4 scroll-smooth">
            {(posData[activeCategory] ?? []).length > 0 ? (
              <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4">
                {posData[activeCategory].map((item) => (
                  <div key={item.id} className="flex h-[320px] flex-col">
                    <DishCard
                      {...item}
                      horizontal={false}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                No items available for &quot;
                {categories.find((c) => c.id === activeCategory)?.label}&quot;
              </div>
            )}
          </div>
        </div>

        <Footer />

        {/* Floating Cart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-16 right-6 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push("/cart")}
            className="relative rounded-full bg-[#D4AF37] p-4 text-white shadow-lg"
          >
            <ShoppingCart className="h-6 w-6" />
            {getTotalCartItems() > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
              >
                {getTotalCartItems()}
              </motion.div>
            )}
          </motion.button>
        </motion.div>

        {/* Product Popup */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000005e] p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    width={400}
                    height={300}
                    className="h-64 w-full rounded-t-2xl object-cover"
                  />
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  {selectedProduct.badge && (
                    <div className="absolute left-4 top-4 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-bold text-white">
                      {selectedProduct.badge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-[#D4AF37]">
                        {(
                          selectedProduct.discountedPrice || selectedProduct.price
                        ).toFixed(2)}
                      </span>
                      {selectedProduct.discountedPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {selectedProduct.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {selectedProduct.weight && (
                    <p className="mb-2 text-gray-600">
                      {selectedProduct.weight}
                    </p>
                  )}
                  <h2 className="mb-3 text-xl font-bold text-gray-800">
                    {selectedProduct.name}
                  </h2>

                  {(selectedProduct.rating) && (
                    <div className="mb-4 flex items-center space-x-2">
                      {selectedProduct.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">★</span>
                          <span className="font-medium">
                            {selectedProduct.rating}
                          </span>
                          {(selectedProduct.reviews ||
                            selectedProduct.reviewCount) && (
                            <span className="text-gray-500">
                              (
                              {selectedProduct.reviews ||
                                selectedProduct.reviewCount}
                              )
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <p className="mb-6 text-gray-700">
                    {selectedProduct.description}
                  </p>
                  {selectedProduct.reviewQuote && (
                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                      <p className="text-sm italic text-gray-600">
                        &quot;{selectedProduct.reviewQuote}&quot;
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {getProductQuantity(selectedProduct.id) === 0 ? (
                      <button
                        onClick={() => addToCart(selectedProduct.id)}
                        className="w-full rounded-lg bg-[#D4AF37] py-4 font-medium text-white hover:bg-[#e55a2b]"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg bg-[#D4AF37] p-3 text-white">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(selectedProduct.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#e55a2b]"
                        >
                          <Minus className="h-5 w-5" />
                        </motion.button>
                        <span className="text-xl font-bold">
                          {getProductQuantity(selectedProduct.id)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(selectedProduct.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#e55a2b]"
                        >
                          <Plus className="h-5 w-5" />
                        </motion.button>
                      </div>
                    )}

                    {getTotalCartItems() > 0 && (
                      <div className="flex space-x-3 mt-3">
                        <Button
                          variant="outline"
                          onClick={() => router.push("/cart")}
                          className="relative flex-1 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          View Cart
                          <span className="absolute -top-0 left-22 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white hover:bg-red-600">
                            {getTotalCartItems()}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Qty: {getProductQuantity(selectedProduct.id)}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

/* Sidebar pill */
type CategoryItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

function CategoryItem({ icon, label, active, onClick }: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="mb-6 flex w-full flex-col items-center focus:outline-none"
    >
      <div
        className={cn(
          "mt-4 mb-1 flex h-12 w-12 items-center justify-center rounded-full",
          active ? "bg-[#fff1c8]" : "bg-gray-100",
        )}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <span
        className={cn(
          "px-1 text-center text-[10px]",
          active ? "text-[#D4AF37]" : "text-gray-600",
        )}
      >
        {label}
      </span>
    </button>
  );
}