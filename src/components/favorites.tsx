'use client'

import { useContext } from "react"
import SectionTitle from "@/lib/section-title"
import DishCard from "@/lib/dish-card"
import ImagF from "@/assets/chillers/cold-black-coffee.jpg"
import ImagF2 from "@/assets/chillers/iced-tea.jpg"
import ImagF3 from "@/assets/chillers/lemon-cooler.jpg"
import Imagf4 from "@/assets/cold-shake/cold-chocolate.jpg"
import { CartContext } from "@/components/food-product-listing"

// All dishes from all sections combined
const allDishes = [
  // Today's Special
  {
    id: "special1",
    name: "Seafood Paella",
    description: "Fresh seafood with saffron rice",
    price: 24.99,
    image: ImagF.src,
    deliveryTime: "25 mins",
    rating: 4.8,
    reviews: 15.2,
  },
  {
    id: "special2",
    name: "Truffle Pasta",
    description: "Handmade pasta with black truffle",
    price: 22.99,
    image: ImagF2.src,
    deliveryTime: "20 mins",
    rating: 4.7,
    reviews: 12.8,
  },
  {
    id: "special3",
    name: "Wagyu Steak",
    description: "Premium A5 Wagyu with seasonal vegetables",
    price: 49.99,
    image: ImagF3.src,
    deliveryTime: "30 mins",
    rating: 4.9,
    reviews: 8.5,
  },
  {
    id: "special4",
    name: "Lobster Bisque",
    description: "Creamy lobster soup with fresh herbs",
    price: 18.99,
    image: Imagf4.src,
    deliveryTime: "15 mins",
    rating: 4.6,
    reviews: 11.3,
  },
  // Trending
  {
    id: "trending1",
    name: "Classic Burger",
    description: "Angus beef with cheese and special sauce",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "#1 Seller",
    deliveryTime: "15 mins",
    rating: 4.9,
    reviews: 25.6,
  },
  {
    id: "trending2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "#2 Seller",
    deliveryTime: "20 mins",
    rating: 4.8,
    reviews: 18.4,
  },
  {
    id: "trending3",
    name: "Chicken Tikka Masala",
    description: "Tender chicken in a creamy tomato sauce",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "#3 Seller",
    deliveryTime: "25 mins",
    rating: 4.7,
    reviews: 22.1,
  },
  {
    id: "trending4",
    name: "Pad Thai",
    description: "Rice noodles with shrimp, tofu, and peanuts",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "#4 Seller",
    deliveryTime: "18 mins",
    rating: 4.6,
    reviews: 14.8,
  },
  // Chef Specials
  {
    id: "chef1",
    name: "Beef Wellington",
    description: "Tender filet mignon wrapped in puff pastry",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Chef's Pick",
    rating: 4.9,
    reviews: 12.5,
  },
  {
    id: "chef2",
    name: "Lobster Thermidor",
    description: "Lobster with creamy white wine sauce",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Chef's Pick",
    rating: 4.8,
    reviews: 9.2,
  },
  {
    id: "chef3",
    name: "Duck Confit",
    description: "Slow-cooked duck leg with crispy skin",
    price: 32.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Chef's Pick",
    rating: 4.7,
    reviews: 15.8,
  },
  // Must Try by User Ratings
  {
    id: "rated1",
    name: "Chocolate Soufflé",
    description: "Warm chocolate dessert with a molten center",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 5,
    reviewCount: 128,
    reviewQuote: "Best dessert I've ever had!",
  },
  {
    id: "rated2",
    name: "Sushi Platter",
    description: "Assortment of fresh nigiri and maki",
    price: 28.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 95,
    reviewQuote: "So fresh and delicious!",
  },
  {
    id: "rated3",
    name: "Mojito Cake",
    description: "Light and refreshing cake with mint and lime",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 82,
    reviewQuote: "Perfectly cooked and seasoned",
  },
  // Offered by Discount
  {
    id: "discount1",
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce",
    price: 26.99,
    discountedPrice: 21.59,
    image: "/placeholder.svg?height=300&width=300",
    badge: "20% OFF",
    deliveryTime: "22 mins",
    rating: 4.6,
    reviews: 13.7,
  },
  {
    id: "discount2",
    name: "Vegetable Curry",
    description: "Seasonal vegetables in aromatic curry",
    price: 18.99,
    discountedPrice: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "BUY 1 GET 1",
    deliveryTime: "18 mins",
    rating: 4.5,
    reviews: 16.2,
  },
  {
    id: "discount3",
    name: "Steak Frites",
    description: "Sirloin steak with crispy fries",
    price: 29.99,
    discountedPrice: 22.49,
    image: "/placeholder.svg?height=300&width=300",
    badge: "25% OFF",
    deliveryTime: "28 mins",
    rating: 4.7,
    reviews: 11.9,
  },
  {
    id: "discount4",
    name: "Pasta Primavera",
    description: "Pasta with fresh spring vegetables",
    price: 19.99,
    discountedPrice: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "20% OFF",
    deliveryTime: "16 mins",
    rating: 4.4,
    reviews: 8.6,
  },
]

export default function Favorites() {
  const { favorites } = useContext(CartContext)

  const favoriteDishes = allDishes.filter((dish) => favorites.includes(dish.id))

  return (
    <section className="mb-10">
      <SectionTitle title="Your Favorites" />

      {favoriteDishes.length === 0 ? (
        <div className="text-center py-8 bg-gray-100 rounded-lg">
          <p className="text-gray-500">You haven&apos;t added any favorites yet.</p>
          <p className="text-sm text-gray-400 mt-2">Click the heart icon on any dish to add it to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoriteDishes.map((dish) => (
            <DishCard key={dish.id} {...dish} />
          ))}
        </div>
      )}
    </section>
  )
}