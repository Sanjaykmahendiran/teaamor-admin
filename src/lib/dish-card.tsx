"use client";

import type React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Heart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CartContext, type Product } from "@/components/food-product-listing";

interface DishCardProps extends Product {
  className?: string;
  onFavoriteToggle?: (id: string) => void;
}

export default function DishCard(props: DishCardProps) {
  const {
    id,
    name,
    description,
    price,
    discountedPrice,
    image,
    rating,
    reviewCount,
    reviews,
    reviewQuote,
    badge,
    deliveryTime,
    weight,
    horizontal = false,
    className,
  } = props;

  const {
    addToCart,
    removeFromCart,
    getProductQuantity,
    setSelectedProduct,
    favorites,
    toggleFavorite,
  } = useContext(CartContext);

  const quantity = getProductQuantity(id);
  const isFavorite = favorites.includes(id);

  const handleCardClick = () => {
    setSelectedProduct({
      id,
      name,
      description,
      price,
      discountedPrice,
      image,
      rating,
      reviewCount,
      reviews,
      reviewQuote,
      badge,
      deliveryTime,
      weight,
      horizontal,
    });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
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

  /* ---------- HORIZONTAL CARD (unchanged) ---------- */

  if (horizontal) {
    return (
      <motion.div
        layout
        className={cn(
          "relative flex cursor-pointer rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg",
          className,
        )}
        whileHover={{ y: -2 }}
        onClick={handleCardClick}
      >
        {badge && (
          <div className="absolute left-2 top-2 z-10 rounded-full bg-[#917c3d] px-2 py-1 text-xs font-bold text-white">
            {badge}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteClick}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1 hover:bg-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isFavorite ? "fill-[#917c3d] text-[#917c3d]" : "text-gray-400",
            )}
          />
        </motion.button>

        <div className="relative h-32 w-32 flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="rounded-l-lg object-cover"
          />
        </div>

        <div className="flex-1 p-3">
          <div className="mb-2 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                {description}
              </p>

              <div className="mt-2 flex items-center">
                {discountedPrice ? (
                  <>
                    <span className="font-bold text-[#917c3d]">
                      {discountedPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-[#917c3d]">
                    {price.toFixed(2)}
                  </span>
                )}
              </div>

              {rating && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex text-sm">{renderStars(rating)}</div>
                    {(reviewCount || reviews) && (
                      <span className="ml-1 text-xs text-gray-500">
                        ({reviewCount || reviews})
                      </span>
                    )}
                  </div>
                  {reviewQuote && (
                    <p className="mt-1 text-xs italic text-gray-500">
                      &quot;{reviewQuote}&quot;
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex-1">
              {deliveryTime && (
                <span className="text-xs text-gray-500">{deliveryTime}</span>
              )}
            </div>

            <div onClick={(e) => e.stopPropagation()} className="ml-4">
              {quantity === 0 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(id)}
                  className="rounded-lg border-2 border-[#917c3d] px-4 py-2 text-sm font-medium text-[#917c3d] transition-colors hover:bg-[#917c3d] hover:text-white"
                >
                  ADD
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex min-w-[100px] items-center justify-between rounded-lg bg-[#917c3d] p-2 text-white"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(id)}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#e55a2b]"
                  >
                    <Minus className="h-3 w-3" />
                  </motion.button>
                  <span className="font-bold">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(id)}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#e55a2b]"
                  >
                    <Plus className="h-3 w-3" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ---------- VERTICAL CARD (fixed image + clamped text) ---------- */

  return (
    <motion.div
      layout
      className={cn(
        "relative flex flex-col cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md",
        className,
      )}
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
    >
      {badge && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-[#917c3d] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
          {badge}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFavoriteClick}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-5 w-5",
            isFavorite ? "fill-[#917c3d] text-[#917c3d]" : "text-gray-400",
          )}
        />
      </motion.button>

      {/* fixed, consistent image area */}
      <div className="relative h-32 w-full sm:h-40">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[15px] font-semibold text-gray-900">{name}</h3>

        {/* clamp description so all cards align */}
        <p className="mt-1 line-clamp-2 text-xs text-gray-600">
          {description}
        </p>

        {rating && (
          <div className="mt-2">
            <div className="flex items-center">
              <div className="flex text-xs leading-none">
                {renderStars(rating)}
              </div>
              {(reviewCount || reviews) && (
                <span className="ml-1 text-[11px] text-gray-500">
                  ({reviewCount || reviews})
                </span>
              )}
            </div>
            {reviewQuote && (
              <p className="mt-1 text-[11px] italic text-gray-500 truncate">
                &quot;{reviewQuote}&quot;
              </p>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="space-x-2 text-sm">
            {discountedPrice ? (
              <>
                <span className="font-semibold text-[#917c3d]">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-[#917c3d]">
                ₹{price.toFixed(2)}
              </span>
            )}
          </div>

          {deliveryTime && (
            <span className="text-[11px] text-gray-500">{deliveryTime}</span>
          )}
        </div>

        {weight && (
          <p className="mt-1 text-[11px] text-gray-500">{weight}</p>
        )}

        <div onClick={(e) => e.stopPropagation()} className="mt-3">
          {quantity === 0 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(id)}
              className="flex h-9 w-full items-center justify-center rounded-lg border border-[#917c3d] text-xs font-semibold text-[#917c3d] transition-colors hover:bg-[#917c3d] hover:text-white"
            >
              ADD
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex h-9 items-center justify-between rounded-lg bg-[#917c3d] px-2 text-white"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFromCart(id)}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#e55a2b]"
              >
                <Minus className="h-3.5 w-3.5" />
              </motion.button>
              <span className="text-sm font-semibold">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart(id)}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#e55a2b]"
              >
                <Plus className="h-3.5 w-3.5" />
              </motion.button>  
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 
