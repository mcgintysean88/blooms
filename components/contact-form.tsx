"use client"

import { useState } from "react"
import { submitContactForm } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"

// Define a type that matches what our server action returns
type FormState = {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[];
}

const initialState: FormState = {
  success: false,
  message: "",
}

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitContactForm(formData)
      setState(result as FormState)
    } catch (error) {
      setState({
        success: false,
        message: "An unexpected error occurred. Please try again."
      })
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {state.success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
            {state.message}
          </div>
        )}
        
        {!state.success && state.message && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
            {state.message}
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-[#5a5a5a]">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            required
            className="w-full border-[#d1d5db] focus:border-[#738c65] focus:ring-[#738c65]"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-[#5a5a5a]">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border-[#d1d5db] focus:border-[#738c65] focus:ring-[#738c65]"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-[#5a5a5a]">
            Phone <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full border-[#d1d5db] focus:border-[#738c65] focus:ring-[#738c65]"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-[#5a5a5a]">
            Address <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="address"
            name="address"
            required
            rows={3}
            placeholder="Street address, City, State, ZIP"
            className="w-full border-[#d1d5db] focus:border-[#738c65] focus:ring-[#738c65]"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-[#5a5a5a]">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full border-[#d1d5db] focus:border-[#738c65] focus:ring-[#738c65]"
          />
        </div>
        
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#738c65] hover:bg-[#5a6e4d] text-white"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
} 