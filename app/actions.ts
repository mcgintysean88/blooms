"use server"

import { z } from "zod"
import { neon } from '@neondatabase/serverless'
import { revalidatePath } from "next/cache"

// Configure the Neon client with direct connection string
const DATABASE_URL = process.env.DATABASE_URL || '';
console.log("Database URL exists:", !!DATABASE_URL);

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

export async function sendMessage(formData: FormData) {
  const validatedFields = contactSchema.safeParse({
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

  if (!validatedFields.success) {
    return {
      error: "Invalid form data",
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  // TODO: Implement email sending logic here
  // For now, we'll just return a success message
  return {
    success: true,
    message: "Message sent successfully!",
  }
}

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const validatedData = newsletterSchema.parse({
      email: formData.get("email"),
    })

    // Create SQL executor using the neon function
    const sql = neon(DATABASE_URL);
    
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
  // Validate the form data
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
  });
  
  // If validation fails, throw an error
  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors;
    console.error("Validation errors:", errors);
    throw new Error("Validation failed");
  }
  
  // Extract validated data
  const validatedData = validationResult.data;

  try {
    // Create SQL executor using the neon function
    const sql = neon(DATABASE_URL);

    // Insert the data into the database using individual columns
    await sql`
      INSERT INTO contact_messages (
        first_name,
        last_name,
        email,
        phone,
        street,
        city,
        state,
        zip,
        property_type,
        project_timeframe,
        budget_range,
        contact_method,
        message,
        created_at
      ) VALUES (
        ${validatedData.firstName},
        ${validatedData.lastName},
        ${validatedData.email},
        ${validatedData.phone},
        ${validatedData.street},
        ${validatedData.city},
        ${validatedData.state},
        ${validatedData.zip},
        ${validatedData.propertyType},
        ${validatedData.projectTimeframe},
        ${validatedData.budgetRange},
        ${validatedData.contactMethod},
        ${validatedData.message},
        NOW()
      )
    `;

    // Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendApiKey && notificationEmail) {
      const emailBody = `
        <h2>New Contact Form Submission — Blooms by Beth</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          <tr><td><strong>Name</strong></td><td>${validatedData.firstName} ${validatedData.lastName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${validatedData.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${validatedData.phone}</td></tr>
          <tr><td><strong>Address</strong></td><td>${validatedData.street}, ${validatedData.city}, ${validatedData.state} ${validatedData.zip}</td></tr>
          <tr><td><strong>Property Type</strong></td><td>${validatedData.propertyType}</td></tr>
          <tr><td><strong>Timeframe</strong></td><td>${validatedData.projectTimeframe}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${validatedData.budgetRange}</td></tr>
          <tr><td><strong>Preferred Contact</strong></td><td>${validatedData.contactMethod}</td></tr>
          <tr><td><strong>Message</strong></td><td>${validatedData.message}</td></tr>
        </table>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Blooms by Beth <onboarding@resend.dev>",
          to: [notificationEmail],
          reply_to: validatedData.email,
          subject: `New Inquiry from ${validatedData.firstName} ${validatedData.lastName}`,
          html: emailBody,
        }),
      });
    }

    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save message to database");
  }
} 