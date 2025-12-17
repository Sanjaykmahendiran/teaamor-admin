"use client";

import { useRef } from "react";
import SectionTitle from "@/lib/section-title";
import DishCard from "@/lib/dish-card";

import Imagf1 from "@/app/assets/quick-bites/cheese-balls.jpg";
import Imagf2 from "@/app/assets/quick-bites/cheese-corn-nuggets.jpg";
import Imagf3 from "@/app/assets/quick-bites/chicken-nuggets.jpg";
import Imagf4 from "@/app/assets/samosa/cheese-corn-samosa.jpg";

const todaysSpecials = [
  {
    id: "special1",
    name: "Cheese Balls",
    description: "Crispy, golden cheese balls served hot with spicy mayo.",
    price: 89,
    image: Imagf1.src,
    deliveryTime: "10 mins",
    rating: 4.7,
    reviews: 1.2,
  },
  {
    id: "special2",
    name: "Cheese Corn Nuggets",
    description: "Crunchy bites loaded with melted cheese and sweet corn.",
    price: 99,
    image: Imagf2.src,
    deliveryTime: "12 mins",
    rating: 4.8,
    reviews: 2.5,
  },
  {
    id: "special3",
    name: "Chicken Nuggets",
    description: "Tender chicken nuggets fried to a golden crisp.",
    price: 119,
    image: Imagf3.src,
    deliveryTime: "15 mins",
    rating: 4.9,
    reviews: 3.1,
  },
  {
    id: "special4",
    name: "Cheese Corn Samosa",
    description: "A fusion samosa stuffed with cheese & sweet corn filling.",
    price: 79,
    image: Imagf4.src,
    deliveryTime: "8 mins",
    rating: 4.6,
    reviews: 1.8,
  },
];

export default function TodaysSpecial() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-10 mt-4">
      <SectionTitle title="Today's Special" />

      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide snap-x mt-4"
      >
        {todaysSpecials.map((dish) => (
          <div key={dish.id} className="flex-shrink-0 w-64 snap-start">
            <DishCard {...dish} />
          </div>
        ))}
      </div>
    </section>
  );
}
