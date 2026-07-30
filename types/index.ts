export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  zip: string
  propertyType: string
  projectTimeframe: string
  budgetRange: string
  contactMethod: string
  message: string
}

/** Per-field Zod messages, keyed by form field name. */
export type ContactFormFieldErrors = Partial<Record<keyof ContactFormData, string[]>>

export type ContactFormResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: ContactFormFieldErrors }

export interface ServiceItem {
  title: string
  description: string
  icon: string
}

export interface TestimonialItem {
  quote: string
  author: string
  location: string
}
