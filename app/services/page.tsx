import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Garden Design & Landscaping Services | Blooms by Beth",
  description: "Explore Blooms by Beth's garden design and landscaping services for the Charleston area, from initial consultation through planting and installation.",
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Services Overview */}
        <section className="py-20 md:py-32 px-4 bg-sage-dark text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">Our Services</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                From initial design to ongoing maintenance, we offer comprehensive garden services tailored to your
                needs and vision.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <ServiceCard
                title="Container Gardens"
                description="Elegant potted arrangements for porches, patios, and entryways. Container gardens add color and texture to your outdoor spaces and can be changed seasonally."
                icon="FlowerIcon"
              />
              <ServiceCard
                title="Seasonal Plantings"
                description="Keep your garden vibrant year-round with carefully selected seasonal blooms. We select plants that thrive in each season, ensuring your garden is always at its best."
                icon="Calendar"
              />
              <ServiceCard
                title="Garden Consultations"
                description="Custom garden consultations that blend Southern tradition with your personal style. We consider your space, preferences, and lifestyle to create a garden that feels like an extension of your home."
                icon="Palette"
              />
              <ServiceCard
                title="Garden Maintenance"
                description="Regular care to ensure your garden remains beautiful through every season. Our maintenance services include pruning, weeding, and fertilizing."
                icon="Scissors"
              />
            </div>

            <div className="mt-16 pt-12 border-t border-white/20">
              <div className="text-center">
                <h2 className="text-2xl font-serif text-white mb-4">Services We Don't Provide</h2>
                <p className="text-white/80 max-w-3xl mx-auto">
                  We specialize in garden planting and flowers but do not handle large shrubs, trees, landscape design, or routine landscape maintenance. While we're happy to discuss these needs through a paid consultation, we typically refer clients to trusted partners for such services. This focused approach allows us to excel in our core specialties while ensuring all your outdoor needs are addressed by the appropriate experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 px-4 bg-beige">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-sage-dark mb-6">Our Process</h2>
              <p className="text-lg text-body max-w-2xl mx-auto">
                We believe in a collaborative approach to garden design and maintenance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="flex items-center mb-4 md:flex-row flex-col text-center md:text-left">
                  <div className="w-12 h-12 bg-sage text-white rounded-full flex items-center justify-center text-xl font-bold md:mr-4 mb-3 md:mb-0 mx-auto md:mx-0 flex-shrink-0">
                    1
                  </div>
                  <h3 className="text-xl font-serif text-sage-dark text-center md:text-left">Consultation</h3>
                </div>
                <p className="text-body text-center md:text-left">
                  We begin with a thorough consultation to understand your vision, needs, and the unique characteristics
                  of your space.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="flex items-center mb-4 md:flex-row flex-col text-center md:text-left">
                  <div className="w-12 h-12 bg-sage text-white rounded-full flex items-center justify-center text-xl font-bold md:mr-4 mb-3 md:mb-0 mx-auto md:mx-0 flex-shrink-0">
                    2
                  </div>
                  <h3 className="text-xl font-serif text-sage-dark text-center md:text-left">Design</h3>
                </div>
                <p className="text-body text-center md:text-left">
                  Based on our consultation, we create a detailed design plan that includes plant selections, layout,
                  and special features.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="flex items-center mb-4 md:flex-row flex-col text-center md:text-left">
                  <div className="w-12 h-12 bg-sage text-white rounded-full flex items-center justify-center text-xl font-bold md:mr-4 mb-3 md:mb-0 mx-auto md:mx-0 flex-shrink-0">
                    3
                  </div>
                  <h3 className="text-xl font-serif text-sage-dark text-center md:text-left">Implementation</h3>
                </div>
                <p className="text-body text-center md:text-left">
                  Our skilled team brings the design to life, handling everything from soil preparation to planting and
                  finishing touches.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/contact">
                <Button className="bg-sage hover:bg-sage-hover text-white">Schedule a Consultation</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

