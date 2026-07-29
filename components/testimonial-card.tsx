import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  location: string
}

export function TestimonialCard({ quote, author, location }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-sm bg-beige/50">
      <CardContent className="p-6">
        <Quote className="h-8 w-8 text-sage/30 mb-4" />
        <p className="text-lg text-muted-foreground">
          &quot;{quote}&quot;
        </p>
        <div>
          <p className="font-medium text-sage-dark">{author}</p>
          <p className="text-sm text-body">{location}</p>
        </div>
      </CardContent>
    </Card>
  )
}

