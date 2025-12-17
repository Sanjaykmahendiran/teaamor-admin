"use client";

import SectionTitle from "@/lib/section-title";
import DishCard from "@/lib/dish-card";
import Image from "next/image";

import ImagC from "@/app/assets/onboarding/1.png";
import ImagC1 from "@/app/assets/chillers/cold-black-coffee.jpg";
import ImagC2 from "@/app/assets/maggi/cheese-maggi.jpg";
import ImagC3 from "@/app/assets/maggi/masala-maggi.jpg";

const chefSpecials = [
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
];

export default function ChefSpecials() {
  return (
    <section className="mb-10 mt-4">
      <div className="mb-4 flex items-center">
        <SectionTitle title="Chef Specials" className="mb-0 mr-2" />
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-orange-500">
          <Image src={ImagC} alt="Chef" fill className="object-cover" />
        </div>
      </div>

      <div className="mt-1 flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {chefSpecials.map((dish) => (
          <div
            key={dish.id}
            className="snap-start flex-shrink-0 h-[320px] w-[calc(50%-0.5rem)] sm:w-64"
          >
            <div className="flex h-full flex-col">
              <DishCard {...dish} horizontal={false} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
