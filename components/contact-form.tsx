"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/app/actions"

type ErrorDetails = {
  [key: string]: string[];
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState<ErrorDetails>({})
  const [messageText, setMessageText] = useState("")
  const maxCharacters = 1000

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= maxCharacters) {
      setMessageText(text)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    try {
      setStatus("loading")
      setErrorMessage("")
      setValidationErrors({})
      
      // Get form data
      const form = e.currentTarget
      const formData = new FormData(form)
      
      try {
        // Submit the form data
        const response = await submitContactForm(formData)
        
        // Check the response
        if (response && response.success) {
          // Success response
          setStatus("success")
          form.reset()
          setMessageText("")
          console.log("Form submitted successfully")
        } else {
          // Error response
          console.error("Form submission error - unexpected response:", response)
          setStatus("error")
          setErrorMessage("Something went wrong. Please try again.")
        }
      } catch (submitError) {
        console.error("Form submission error:", submitError)
        setStatus("error")
        setErrorMessage("Failed to submit your message. Please try again.")
      }
    } catch (error) {
      console.error("Error in form handler:", error)
      setStatus("error")
      setErrorMessage("An error occurred. Please try again.")
    }
  }

  // Helper function to get field error message
  const getFieldError = (fieldName: string) => {
    if (validationErrors[fieldName] && validationErrors[fieldName].length > 0) {
      return validationErrors[fieldName][0];
    }
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-[#3c4c30]">
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            required
            placeholder="First name"
            className={`w-full ${getFieldError('firstName') ? 'border-red-500' : ''}`}
          />
          {getFieldError('firstName') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('firstName')}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-[#3c4c30]">
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            required
            placeholder="Last name"
            className={`w-full ${getFieldError('lastName') ? 'border-red-500' : ''}`}
          />
          {getFieldError('lastName') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('lastName')}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#3c4c30]">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your.email@example.com"
            className={`w-full ${getFieldError('email') ? 'border-red-500' : ''}`}
          />
          {getFieldError('email') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('email')}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-[#3c4c30]">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(555) 555-5555"
            className={`w-full ${getFieldError('phone') ? 'border-red-500' : ''}`}
          />
          {getFieldError('phone') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('phone')}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="street" className="text-sm font-medium text-[#3c4c30]">
          Street Address
        </label>
        <Input
          id="street"
          name="street"
          required
          placeholder="123 Main Street"
          className={`w-full ${getFieldError('street') ? 'border-red-500' : ''}`}
        />
        {getFieldError('street') && (
          <p className="text-red-500 text-xs mt-1">{getFieldError('street')}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-[#3c4c30]">
            City
          </label>
          <Input
            id="city"
            name="city"
            required
            placeholder="City"
            className={`w-full ${getFieldError('city') ? 'border-red-500' : ''}`}
          />
          {getFieldError('city') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('city')}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium text-[#3c4c30]">
            State
          </label>
          <Input
            id="state"
            name="state"
            required
            placeholder="State"
            className={`w-full ${getFieldError('state') ? 'border-red-500' : ''}`}
          />
          {getFieldError('state') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('state')}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="zip" className="text-sm font-medium text-[#3c4c30]">
            ZIP Code
          </label>
          <Input
            id="zip"
            name="zip"
            required
            placeholder="ZIP Code"
            className={`w-full ${getFieldError('zip') ? 'border-red-500' : ''}`}
          />
          {getFieldError('zip') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('zip')}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="propertyType" className="text-sm font-medium text-[#3c4c30]">
          Property Type
        </label>
        <select 
          id="propertyType" 
          name="propertyType" 
          required 
          className={`w-full border border-gray-300 rounded-md p-2 h-10 ${getFieldError('propertyType') ? 'border-red-500' : ''}`}
        >
          <option value="">Select a property type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Apartment/Condo">Apartment/Condo</option>
          <option value="Other">Other</option>
        </select>
        {getFieldError('propertyType') && (
          <p className="text-red-500 text-xs mt-1">{getFieldError('propertyType')}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="projectTimeframe" className="text-sm font-medium text-[#3c4c30]">
          Project Timeframe
        </label>
        <select 
          id="projectTimeframe" 
          name="projectTimeframe" 
          required 
          className={`w-full border border-gray-300 rounded-md p-2 h-10 ${getFieldError('projectTimeframe') ? 'border-red-500' : ''}`}
        >
          <option value="">Select a timeframe</option>
          <option value="Immediate">Immediate (within 1 week)</option>
          <option value="Short-term">Short-term (1-4 weeks)</option>
          <option value="Medium-term">Medium-term (1-3 months)</option>
          <option value="Long-term">Long-term (3+ months)</option>
          <option value="Flexible">Flexible</option>
        </select>
        {getFieldError('projectTimeframe') && (
          <p className="text-red-500 text-xs mt-1">{getFieldError('projectTimeframe')}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="budgetRange" className="text-sm font-medium text-[#3c4c30]">
          Budget Range
        </label>
        <select
          id="budgetRange"
          name="budgetRange"
          required
          className={`w-full border border-gray-300 rounded-md p-2 h-10 ${getFieldError('budgetRange') ? 'border-red-500' : ''}`}
        >
          <option value="">Select a budget range</option>
          <option value="Under $500">Under $500</option>
          <option value="$500 - $1,000">$500 – $1,000</option>
          <option value="$1,000 - $2,500">$1,000 – $2,500</option>
          <option value="$2,500 - $5,000">$2,500 – $5,000</option>
          <option value="$5,000+">$5,000+</option>
          <option value="Not sure">Not sure yet</option>
        </select>
        {getFieldError('budgetRange') && (
          <p className="text-red-500 text-xs mt-1">{getFieldError('budgetRange')}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="contactMethod" className="text-sm font-medium text-[#3c4c30]">
          Preferred Contact Method
        </label>
        <select 
          id="contactMethod" 
          name="contactMethod" 
          required 
          className={`w-full border border-gray-300 rounded-md p-2 h-10 ${getFieldError('contactMethod') ? 'border-red-500' : ''}`}
        >
          <option value="">Select a contact method</option>
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
          <option value="Text">Text</option>
          <option value="No preference">No preference</option>
        </select>
        {getFieldError('contactMethod') && (
          <p className="text-red-500 text-xs mt-1">{getFieldError('contactMethod')}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-[#3c4c30]">
          Message
        </label>
        <div className="relative">
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Tell us about your garden project..."
            className={`min-h-[150px] w-full ${getFieldError('message') ? 'border-red-500' : ''}`}
            value={messageText}
            onChange={handleMessageChange}
            maxLength={maxCharacters}
          />
          {getFieldError('message') && (
            <p className="text-red-500 text-xs mt-1">{getFieldError('message')}</p>
          )}
          <div className="text-xs text-gray-500 text-right mt-1">
            {messageText.length}/{maxCharacters}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#738c65] hover:bg-[#5d7251] text-white"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>

      {status === "success" && (
        <p className="text-[#738c65] text-center">Thank you for your message. We&apos;ll be in touch soon!</p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
    </form>
  )
} 