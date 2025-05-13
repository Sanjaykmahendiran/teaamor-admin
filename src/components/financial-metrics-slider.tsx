"use client"
import useEmblaCarousel from "embla-carousel-react"
import { Card } from "@/components/ui/card"

export default function FinancialMetricsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })

  const metrics = [
    {
      title: "Sales this week",
      value: "$4471.38",
      bgColor: "bg-[#48c29f]", // Exact green from image
    },
    {
      title: "Earning this week",
      value: "$4579.20",
      bgColor: "bg-[#9689e8]", // Exact purple from image
    },
    {
      title: "Your balance",
      value: "$31457.12",
      bgColor: "bg-[#fab54d]", // Exact amber/orange from image
    },
  ]

  return (
    <div className="w-full mt-4 mb-2">
  <div className="flex justify-between items-center mb-2">
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex -ml-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex-[0_0_45%] min-w-0 pl-4 pr-0 sm:flex-[0_0_60%] md:flex-[0_0_40%]"
          >
            <Card
              className={`${metric.bgColor} text-white rounded-md border-0 shadow-sm p-0`}
            >
              <div className="px-4 py-2">
                <p className="text-xs font-normal mb-1 text-white/90">
                  {metric.title}
                </p>
                <p className="text-sm font-semibold">{metric.value}</p>
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
