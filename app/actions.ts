"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { sql } from "@/lib/db"
import { sendContactNotification } from "@/lib/email"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
  propertyType: z.string().min(1, "Property type is required"),
  projectTimeframe: z.string().min(1, "Project timeframe is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  contactMethod: z.string().min(1, "Contact method is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const validatedData = newsletterSchema.parse({
      email: formData.get("email"),
    })

    await sql`
      INSERT INTO subscribers (email, created_at)
      VALUES (${validatedData.email}, NOW())
      ON CONFLICT (email) DO NOTHING
    `
    return { success: true }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, error: "Failed to subscribe to newsletter" }
  }
}

export async function submitContactForm(formData: FormData) {
  const validationResult = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    street: formData.get("street"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    propertyType: formData.get("propertyType"),
    projectTimeframe: formData.get("projectTimeframe"),
    budgetRange: formData.get("budgetRange"),
    contactMethod: formData.get("contactMethod"),
    message: formData.get("message"),
  })

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors
    console.error("Validation errors:", errors)
    throw new Error("Validation failed")
  }

  const data = validationResult.data

  try {
    await sql`
      INSERT INTO contact_messages (
        first_name, last_name, email, phone,
        street, city, state, zip,
        property_type, project_timeframe, budget_range, contact_method,
        message, created_at
      ) VALUES (
        ${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone},
        ${data.street}, ${data.city}, ${data.state}, ${data.zip},
        ${data.propertyType}, ${data.projectTimeframe}, ${data.budgetRange}, ${data.contactMethod},
        ${data.message}, NOW()
      )
    `

    await sendContactNotification(data)

    revalidatePath("/contact")
    return { success: true }
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Failed to save message to database")
  }
}
