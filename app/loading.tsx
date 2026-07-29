import { Flower } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <Flower className="h-12 w-12 text-sage animate-spin duration-700" />
        <h2 className="mt-4 text-xl font-medium text-sage-dark">Loading...</h2>
      </div>
    </div>
  )
} 