import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TestimonialCard } from "@/components/testimonial-card"
import { ServiceCard } from "@/components/service-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="relative h-[80vh] overflow-hidden">
            <Image
              src="/hero-garden.jpg"
              alt="Beautiful Southern garden with blooming flowers and manicured hedges"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-4">Blooms by Beth</h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
                Bringing joy and beauty to your garden
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-4 bg-[#f8f5f0]">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif text-[#3c4c30] mb-6">
                  Lowcountry Gardens with a Modern Touch
                </h2>
                <p className="text-lg text-[#5a5a5a] mb-6 leading-relaxed">
                  At Blooms by Beth, we believe that a garden should tell a story—your story. With 30 years of
                  experience cultivating the rich soils of the Lowcountry, Beth brings her passion for gardening to
                  every project.
                </p>
                <p className="text-lg text-[#5a5a5a] mb-8 leading-relaxed">
                  From native perennials and annuals to execotic tropicals and citrus, we create gardens that honor our heritage while
                  embracing sustainable practices for the modern homeowner.
                </p>
                <Link href="/about">
                  <Button className="bg-[#738c65] hover:bg-[#5d7251] text-white">
                    About Beth <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 relative">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/laura-placeholder.jpg"
                    alt="Beth tending to a garden"
                    fill
                    className="object-cover rounded-md"
                    style={{ objectPosition: "20% 50%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded shadow-md w-48 hidden md:block">
                  <p className="font-serif text-[#3c4c30] italic">&quot;Every garden has its own story, and I&apos;m here to help you tell yours.&quot;</p>
                  <p className="text-right text-sm mt-2 text-[#738c65]">— Beth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#3c4c30] mb-4">Our Services</h2>
              <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
                From seasonal plantings to complete garden transformations, we offer a range of services to bring the
                joy of flowers to your outdoor space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="Garden Design"
                description="Custom garden designs that blend Southern tradition with your personal style."
                icon="Palette"
              />
              <ServiceCard
                title="Seasonal Plantings"
                description="Keep your garden vibrant year-round with carefully selected seasonal blooms."
                icon="Calendar"
              />
              <ServiceCard
                title="Garden Maintenance"
                description="Regular care to ensure your garden remains beautiful through every season."
                icon="Scissors"
              />
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 md:py-24 px-4 bg-[#f8f5f0]">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#3c4c30] mb-4">Featured Projects</h2>
              <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
                A glimpse into some of the team&apos;s ongoing work across the region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden border-none shadow-sm">
                  <div className="relative h-64">
                    <Image
                      src={
                        item === 1 
                          ? "/flower-box-1.jpg" 
                          : item === 2 
                            ? "/hanging-basket-1.jpg" 
                            : "/sullivans-beach-garden-1.jpg"
                      }
                      alt={`Featured garden project ${item}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif text-xl text-[#3c4c30]">
                      {["Downtown Flower Box", "Hanging Baskets", "Beach Garden"][item - 1]}
                    </h3>
                    <p className="text-[#5a5a5a] mt-2">
                      {
                        [
                          "Vibrant and seasonal flower boxes",
                          "Hanging baskets with seasonal blooms",
                          "Sullivan's Island flowery getaway",
                        ][item - 1]
                      }
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio">
                <Button className="bg-[#738c65] hover:bg-[#5d7251] text-white">View Portfolio</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#3c4c30] mb-4">What Our Clients Say</h2>
              <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
                The true measure of our work is the joy it brings to our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="Beth transformed our backyard from an overgrown mess into a Southern oasis. Her knowledge of native plants and eye for design is unmatched."
                author="Sarah Johnson"
                location="Charleston, SC"
              />
              <TestimonialCard
                quote="Working with Blooms by Beth was a delight from start to finish. Our garden is now the envy of the neighborhood and a joy to spend time in."
                author="Robert & Mary Davis"
                location="Savannah, GA"
              />
              <TestimonialCard
                quote="Beth's container arrangements for our front porch have brought us compliments all season long. She truly understands Southern style."
                author="Elizabeth Taylor"
                location="Athens, GA"
              />
              <TestimonialCard
                quote="Our vegetable garden is not only productive but beautiful too. Beth's design incorporated both function and Southern charm."
                author="James Wilson"
                location="Beaufort, SC"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

