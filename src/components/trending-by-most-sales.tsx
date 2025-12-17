"use client";

import { useRef } from "react";
import SectionTitle from "@/lib/section-title";
import DishCard from "@/lib/dish-card";

import Imagf1 from "@/app/assets/samosa/aloo-samosa.jpg";
import Imagf2 from "@/app/assets/samosa/cheese-corn-samosa.jpg";
import Imagf3 from "@/app/assets/samosa/chicken-samosa.jpg";
import Imagf4 from "@/app/assets/samosa/miniu-aloo-samosa.jpg";

const trendingDishes = [
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
];

export default function TrendingByMostSales() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-10">
      <SectionTitle title="Trending by Most Sales" />

      <div
        ref={scrollRef}
        className="-mx-4 flex overflow-x-auto pb-4 scrollbar-hide snap-x space-x-4 px-4"
      >
        {trendingDishes.map((dish) => (
          <div key={dish.id} className="flex-shrink-0 w-64 snap-start">
            <DishCard {...dish} />
          </div>
        ))}
      </div>
    </section>
  );
}
