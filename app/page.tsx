import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { NewsletterSignup } from "@/components/newsletter-signup"

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
              <Link href="/contact">
                <Button className="bg-white hover:bg-[#f8f5f0] text-[#3c4c30] text-lg px-8 py-6 rounded-md">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-4 bg-[#f8f5f0]">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif text-[#3c4c30] mb-6">
                  Lowcountry Gardens with a Caring Touch
                </h2>
                <p className="text-lg text-[#5a5a5a] mb-6 leading-relaxed">
                At Blooms by Beth, we believe flowers and gardens bring joy to everyday life. With 30 years of experience cultivating the rich soils of the Lowcountry, Beth and her team bring their passion for gardening to every project.
                </p>
                <p className="text-lg text-[#5a5a5a] mb-8 leading-relaxed">
                Whether featuring classic native perennials, cheerful annuals, or statement tropical and citrus specimens, our gardens are designed to surround your home with living beauty that lifts your spirits and delights the senses every day.
                </p>
                <div className="flex justify-center">
                  <Link href="/about">
                    <Button className="bg-[#738c65] hover:bg-[#5d7251] text-white">
                      About Beth <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/beth1.jpeg"
                    alt="Beth tending to a garden"
                    fill
                    className="object-cover rounded-md"
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
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#3c4c30] mb-4">Our Services</h2>
              <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
                From seasonal plantings to garden transformations, we offer a range of services to bring the
                joy of flowers to your outdoor space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              <ServiceCard
                title="Container Gardens"
                description="Elegant potted arrangements for porches, patios, and entryways."
                icon="FlowerIcon"
              />
              <ServiceCard
                title="Seasonal Plantings"
                description="Keep your garden vibrant year-round with carefully selected seasonal blooms."
                icon="Calendar"
              />
              <ServiceCard
                title="Garden Consultations"
                description="Garden consultations that help guide you through the design process."
                icon="Palette"
              />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <NewsletterSignup />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

