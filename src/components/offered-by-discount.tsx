"use client";

import { useRef } from "react";
import SectionTitle from "@/lib/section-title";
import DishCard from "@/lib/dish-card";

import ImagS from "@/app/assets/hot-milk/badam-milk.jpg";
import imagS1 from "@/app/assets/hot-milk/hot-chocolate.jpg";
import imagS2 from "@/app/assets/hot-milk/masala-milk.jpg";
import imagS3 from "@/app/assets/hot-milk/masala-milk.jpg";

const discountedDishes = [
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
];

export default function OfferedByDiscount() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-10">
      <SectionTitle title="Offered by Discount" />
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide snap-x"
      >
        {discountedDishes.map((dish) => (
          <div key={dish.id} className="flex-shrink-0 w-64 snap-start">
            <DishCard {...dish} />
          </div>
        ))}
      </div>
    </section>
  );
}
