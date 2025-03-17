import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-[#3c4c30] mb-4">Contact Us</h1>
            <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto mb-4">
              We&apos;d love to hear from you. Get in touch to discuss your garden project or schedule a consultation.
            </p>
            <p className="text-sm text-[#5a5a5a] max-w-2xl mx-auto italic">
              Please note: During planting season, our days are full and we spend most of our time getting our hands
              dirty. There may be a delay in our response, but we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif text-[#3c4c30] mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#3c4c30] mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#f0f4eb] p-3 rounded-full">
                    <Mail className="h-5 w-5 text-[#738c65]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#3c4c30]">Email</h3>
                    <p className="text-[#5a5a5a]">plant@bloomsbybethchs.com</p>
                    <p className="text-sm text-[#5a5a5a] mt-1">
                      We spend our days planting and tending to gardens. We will do our best to respond to all inquiries as promptly as possible.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#f0f4eb] p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-[#738c65]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#3c4c30]">Location</h3>
                    <p className="text-[#5a5a5a]">Mount Pleasant, South Carolina</p>
                    <p className="text-sm text-[#5a5a5a] mt-1">
                      Serving greater Charleston and the surrounding Lowcountry area.
                    </p>
                  </div>
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

