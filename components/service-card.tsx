import { Card, CardContent } from "@/components/ui/card"
import { Calendar, FlowerIcon, Palette, Scissors, Shovel, Sprout } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "Palette":
        return <Palette className="h-10 w-10 text-[#738c65]" />
      case "Calendar":
        return <Calendar className="h-10 w-10 text-[#738c65]" />
      case "Scissors":
        return <Scissors className="h-10 w-10 text-[#738c65]" />
      case "FlowerIcon":
        return <FlowerIcon className="h-10 w-10 text-[#738c65]" />
      case "Sprout":
        return <Sprout className="h-10 w-10 text-[#738c65]" />
      case "Shovel":
        return <Shovel className="h-10 w-10 text-[#738c65]" />
      default:
        return <FlowerIcon className="h-10 w-10 text-[#738c65]" />
    }
  }

  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4">
          <IconComponent />
        </div>
        <h3 className="text-xl font-serif text-[#3c4c30] mb-2">{title}</h3>
        <p className="text-[#5a5a5a]">{description}</p>
      </CardContent>
    </Card>
  )
}

