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
        return <Palette className="h-10 w-10 text-sage" />
      case "Calendar":
        return <Calendar className="h-10 w-10 text-sage" />
      case "Scissors":
        return <Scissors className="h-10 w-10 text-sage" />
      case "FlowerIcon":
        return <FlowerIcon className="h-10 w-10 text-sage" />
      case "Sprout":
        return <Sprout className="h-10 w-10 text-sage" />
      case "Shovel":
        return <Shovel className="h-10 w-10 text-sage" />
      default:
        return <FlowerIcon className="h-10 w-10 text-sage" />
    }
  }

  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4">
          <IconComponent />
        </div>
        <h3 className="text-xl font-serif text-sage-dark mb-2">{title}</h3>
        <p className="text-body">{description}</p>
      </CardContent>
    </Card>
  )
}

