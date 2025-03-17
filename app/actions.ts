"use server"

import { z } from "zod"
// Using the newer @neondatabase/serverless version
import { neon } from '@neondatabase/serverless'

// Configure the Neon client with direct connection string
const DATABASE_URL = process.env.DATABASE_URL || '';
console.log("Database URL exists:", !!DATABASE_URL);

// Fix type errors in the error handling
type DatabaseError = Error & {
  code?: string;
  detail?: string;
};

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendMessage(formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
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

export async function submitContactForm(formData: FormData) {
  // Extract form data
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    message: formData.get("message"),
  }

  console.log("Form data received:", rawFormData);

  try {
    // Validate form data
    const validatedData = contactSchema.parse(rawFormData)
    console.log("Form data validated successfully");
    
    // First try a basic connection
    try {
      // Create SQL executor using the neon function
      const sql = neon(DATABASE_URL);
      
      // Test the connection
      const now = await sql`SELECT NOW()`;
      console.log("Database connection test successful:", now);
      
      // Convert form data to strings explicitly
      const nameStr = String(validatedData.name);
      const emailStr = String(validatedData.email);
      const phoneStr = String(validatedData.phone || "");
      const addressStr = String(validatedData.address || "");
      const messageStr = String(validatedData.message);
      
      console.log("Attempting database insertion with values:", {
        name: nameStr,
        email: emailStr,
        phone: phoneStr,
      });
      
      // Insert using the sql tag template
      const result = await sql`
        INSERT INTO contacts (name, email, phone, address, message)
        VALUES (${nameStr}, ${emailStr}, ${phoneStr}, ${addressStr}, ${messageStr})
        RETURNING id
      `;
      
      console.log("Database insertion successful, result:", result);
      return { success: true, message: "Thank you for your message. We'll be in touch soon!" };
    } catch (error) {
      console.error("Database operation failed:", error);
      
      const dbError = error as DatabaseError;
      return { 
        success: false, 
        message: `Database error: ${dbError.message || 'Unknown error'}` 
      };
    }
  } catch (error) {
    console.error("Form submission error:", error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: "Please check your form inputs.", 
        errors: error.errors 
      }
    }
    
    // More detailed error message
    const err = error as Error;
    return { 
      success: false, 
      message: `Something went wrong: ${err.message || 'Unknown error'}` 
    }
  }
} 