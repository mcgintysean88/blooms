"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-[#3c4c30] mb-4">Something went wrong</h2>
        <p className="text-[#5a5a5a] mb-6">
          We apologize for the inconvenience. Please try again or contact us if the problem persists.
        </p>
        <Button
          onClick={reset}
          className="bg-[#738c65] hover:bg-[#5a6e4d] text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  )
} 