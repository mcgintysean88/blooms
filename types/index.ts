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
