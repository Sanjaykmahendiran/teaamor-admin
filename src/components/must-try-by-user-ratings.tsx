"use client";

import SectionTitle from "@/lib/section-title";
import DishCard from "@/lib/dish-card";

import Imagc from "@/app/assets/puff/chicken-puff.jpg";
import Imagc2 from "@/app/assets/puff/egg-puff.jpg";
import Imagc3 from "@/app/assets/puff/veg-puff.jpg";

const ratedDishes = [
  {
    id: "rated1",
    name: "Chicken Puff",
    description: "Flaky puff pastry filled with spicy chicken stuffing.",
    price: 35,
    image: Imagc.src,
    rating: 5,
    reviewCount: 128,
    reviewQuote: "Super crispy and so flavorful!",
  },
  {
    id: "rated2",
    name: "Egg Puff",
    description: "Classic bakery-style egg puff with masala filling.",
    price: 30,
    image: Imagc2.src,
    rating: 4.8,
    reviewCount: 95,
    reviewQuote: "Perfect tea-time snack!",
  },
  {
    id: "rated3",
    name: "Veg Puff",
    description: "Crispy puff loaded with mixed veggies and mild spices.",
    price: 25,
    image: Imagc3.src,
    rating: 4.7,
    reviewCount: 82,
    reviewQuote: "Light, tasty, and so fresh!",
  },
];

export default function MustTryByUserRatings() {
  return (
    <section className="mb-10 mt-4">
      <SectionTitle title="Must Try by User Ratings" />

      <div className="mt-1 flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {ratedDishes.map((dish) => (
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
