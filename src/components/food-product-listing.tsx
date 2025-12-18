"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import TodaysSpecial from "@/components/todays-special";
import TrendingByMostSales from "@/components/trending-by-most-sales";
import ChefSpecials from "@/components/chef-specials";
import MustTryByUserRatings from "@/components/must-try-by-user-ratings";
import OfferedByDiscount from "@/components/offered-by-discount";
import Favorites from "@/components/favorites";

export interface Product {
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
  discount?: string;
  badge?: string;
  reviewQuote?: string;
  horizontal?: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
}

export const CartContext = React.createContext<{
  cart: CartItem[];
  favorites: string[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
  getTotalCartItems: () => number;
  setSelectedProduct: (product: Product | null) => void;
  toggleFavorite: (productId: string) => void;
}>({
  cart: [],
  favorites: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getProductQuantity: () => 0,
  getTotalCartItems: () => 0,
  setSelectedProduct: () => {},
  toggleFavorite: () => {},
});

export default function FoodProductListing() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ));

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
    <CartContext.Provider value={cartContextValue}>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-6">
          <TodaysSpecial />
          <TrendingByMostSales />
          <ChefSpecials />
          <MustTryByUserRatings />
          <OfferedByDiscount />
          <Favorites />
        </div>

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
                    <p className="mb-2 text-gray-600">{selectedProduct.weight}</p>
                  )}
                  <h2 className="mb-3 text-xl font-bold text-gray-800">
                    {selectedProduct.name}
                  </h2>

                  {(selectedProduct.rating || selectedProduct.deliveryTime) && (
                    <div className="mb-4 flex items-center space-x-2">
                      {selectedProduct.rating && (
                        <div className="flex items-center space-x-1">
                          <div className="flex text-sm">
                            {renderStars(selectedProduct.rating)}
                          </div>
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
                      {selectedProduct.deliveryTime && (
                        <>
                          <span className="text-gray-500">|</span>
                          <span className="text-gray-500">
                            {selectedProduct.deliveryTime}
                          </span>
                        </>
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
                      <Button
                        onClick={() => addToCart(selectedProduct.id)}
                        className="w-full rounded-lg bg-[#D4AF37] py-6 font-medium text-white hover:bg-[#e55a2b]"
                      >
                        Add to Cart
                      </Button>
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
                      <div className="flex space-x-3">
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
