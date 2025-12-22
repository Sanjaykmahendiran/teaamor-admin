"use client"
import useEmblaCarousel from "embla-carousel-react"
import { Card } from "@/components/ui/card"

export default function FinancialMetricsSlider() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })

  const metrics = [
    {
      title: "Sales this week",
      value: "$4471.38",
    },
    {
      title: "Earning this week",
      value: "$4579.20",
    },
    {
      title: "Your balance",
      value: "$31457.12",
    },
  ]

  return (
    <div className="w-full mt-4 mb-2">
  <div className="justify-between items-center mb-2">
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex -ml-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex-[0_0_45%] min-w-0 pl-2 pr-0 sm:flex-[0_0_60%] md:flex-[0_0_40%]"
          >
            <Card
              className="bg-white text-black rounded-md border-0 shadow-sm p-0"
            >
              <div className="px-4 py-2">
                <p className="text-sm font-normal mb-1 text-black/90">
                  {metric.title}
                </p>
                <p className="text-lg font-semibold">{metric.value}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  )
}
