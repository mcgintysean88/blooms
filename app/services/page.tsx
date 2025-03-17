import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Services Overview */}
        <section className="py-20 md:py-32 px-4 bg-[#3c4c30] text-white">
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
                title="Garden Design"
                description="Custom garden designs that blend Southern tradition with your personal style. We consider your space, preferences, and lifestyle to create a garden that feels like an extension of your home."
                icon="Palette"
              />
              <ServiceCard
                title="Seasonal Plantings"
                description="Keep your garden vibrant year-round with carefully selected seasonal blooms. We select plants that thrive in each season, ensuring your garden is always at its best."
                icon="Calendar"
              />
              <ServiceCard
                title="Garden Maintenance"
                description="Regular care to ensure your garden remains beautiful through every season. Our maintenance services include pruning, weeding, fertilizing, and pest management."
                icon="Scissors"
              />
              <ServiceCard
                title="Container Gardens"
                description="Elegant potted arrangements for porches, patios, and entryways. Container gardens add color and texture to your outdoor spaces and can be changed seasonally."
                icon="FlowerIcon"
              />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24 px-4 bg-[#f8f5f0]">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-[#3c4c30] mb-6">Our Process</h2>
              <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
                We believe in a collaborative approach to garden design and maintenance.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-[#738c65] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-serif text-[#3c4c30] mb-3">Consultation</h3>
                <p className="text-[#5a5a5a]">
                  We begin with a thorough consultation to understand your vision, needs, and the unique characteristics
                  of your space.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-[#738c65] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-serif text-[#3c4c30] mb-3">Design</h3>
                <p className="text-[#5a5a5a]">
                  Based on our consultation, we create a detailed design plan that includes plant selections, layout,
                  and special features.
                </p>
              </div>
              <div className="bg-white p-6 rounded-md shadow-sm">
                <div className="w-12 h-12 bg-[#738c65] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-serif text-[#3c4c30] mb-3">Implementation</h3>
                <p className="text-[#5a5a5a]">
                  Our skilled team brings the design to life, handling everything from soil preparation to planting and
                  finishing touches.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button className="bg-[#738c65] hover:bg-[#5d7251] text-white">Schedule a Consultation</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

