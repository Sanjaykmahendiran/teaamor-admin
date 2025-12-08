"use client"
import useEmblaCarousel from "embla-carousel-react"
import { Card } from "@/components/ui/card"

export default function TotalOrderSlider() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })

  const metrics = [
    {
      title: "Total Orders",
      value: "$2102.00",
      bgColor: "bg-[#c4b6d4]", // Exact green from image
    },
    {
      title: "Total Cancel",
      value: "$55.00",
      bgColor: "bg-[#e8999d]", // Exact purple from image
    },
    {
      title: "Total refund",
      value: "$34957.30",
      bgColor: "bg-[#44adc9]", // Exact amber/orange from image
    },
    {
      title: "Total Sales",
      value: "$412849.49",
      bgColor: "bg-[#ffc04a]", // Exact amber/orange from image
    },
  ]

  return (
    <div className="w-full mt-4 mb-6">
  <div className="justify-between items-center mb-2">
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex -ml-6 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex-[0_0_30%] min-w-0 pl-7 pr-0 sm:flex-[0_0_60%] md:flex-[0_0_40%]"
          >
            <Card
              className={`${metric.bgColor} text-white rounded-[10px] border-0 shadow-sm p-0`}
            >
              <div className="mx-auto py-2">
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