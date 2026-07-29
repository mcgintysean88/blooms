import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin } from "lucide-react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact Us | Blooms by Beth",
  description: "Get in touch with Blooms by Beth to discuss your garden project or schedule a consultation in the Charleston, SC area.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-sage-dark mb-4">Contact Us</h1>
            <p className="text-lg text-body max-w-2xl mx-auto mb-4">
              We&apos;d love to hear from you. Get in touch to discuss your garden project or schedule a consultation.
            </p>
            <p className="text-sm text-body max-w-2xl mx-auto italic">
              Please note: During planting season, our days are full and we spend most of our time getting our hands
              dirty. There may be a delay in our response, but we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <ContactForm />
          </div>

          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-serif text-sage-dark mb-8 text-center">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-sage-pale p-3 rounded-full">
                  <Mail className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-sage-dark">Email</h3>
                  <p className="text-body">plant@bloomsbybethchs.com</p>
                  <p className="text-sm text-body mt-1">
                    We spend our days planting and tending to gardens. We will do our best to respond to all inquiries as promptly as possible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sage-pale p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-sage-dark">Location</h3>
                  <p className="text-body">Mount Pleasant, South Carolina</p>
                  <p className="text-sm text-body mt-1">
                    Serving greater Charleston and the surrounding Lowcountry area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

