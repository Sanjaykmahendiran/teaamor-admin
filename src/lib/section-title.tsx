import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  className?: string
}

export default function SectionTitle({ title, className }: SectionTitleProps) {
  return <h2 className={cn("text-2xl font-bold text-gray-800 mb-4", className)}>{title}</h2>
}
