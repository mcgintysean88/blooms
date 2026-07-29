"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Flower } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")
    
    try {
      const formData = new FormData()
      formData.append("email", email)
      
      const result = await subscribeToNewsletter(formData)
      
      if (result.success) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
        setErrorMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address.")
    }
  }

  return (
    <div className="bg-beige rounded-lg p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Flower className="h-8 w-8 text-sage" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-sage-dark mb-4">Join Our Newsletter</h2>
        <p className="text-body mb-6">
          Stay connected with seasonal planting recommendations, gardening industry insights, and exclusive tips by signing up for our coming newsletter - inspiration delivered directly to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white"
          />
          <Button 
            type="submit" 
            className="bg-sage hover:bg-sage-hover text-white whitespace-nowrap"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        {status === "success" && (
          <p className="text-sage mt-4">Thank you for subscribing!</p>
        )}
        {status === "error" && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  )
} 