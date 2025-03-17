import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* About Content */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif text-[#3c4c30] mb-12 text-center">Meet Beth McGinty</h1>
            <div className="grid gap-12 md:grid-cols-2 items-start">
              <div className="relative aspect-square">
                <Image
                  src="/laura-2.jpg"
                  alt="Beth McGinty"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <div>
                <div className="space-y-4 text-[#5a5a5a]">
                  <p>
                    Meet Beth McGinty, Charleston&apos;s potted plant specialist with nearly 30 years of gardening expertise.
                    Based in the heart of South Carolina, Beth has dedicated her career to perfecting the art of
                    container gardening and cultivating stunning annual and perennial displays.
                  </p>
                  <p>
                    Beth&apos;s passion for potted plants stems from their versatility and accessibility. She believes
                    beautiful gardens aren&apos;t limited to those with sprawling yards—her container creations bring
                    nature&apos;s beauty to patios, balconies, and indoor spaces throughout Charleston.
                  </p>
                  <p>
                    With decades of experience navigating the unique growing conditions of the Lowcountry, Beth has
                    developed specialized knowledge of which annuals thrive in Charleston&apos;s hot, humid summers and which
                    perennials return with vigor year after year. Her carefully curated plant selections and artful
                    arrangements have adorned countless homes and businesses across the region.
                  </p>
                  <p>
                    Beyond her plant expertise, Beth&apos;s clients value her personalized approach and commitment to
                    sustainability. Whether you&apos;re a seasoned gardener or just beginning your plant journey, Beth brings
                    enthusiasm, patience, and a wealth of knowledge to every project.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    With over 15 years of experience in garden design and landscaping, I&apos;ve had the privilege of transforming countless outdoor spaces into beautiful, functional environments that reflect my clients&apos; unique visions.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    My approach combines artistic vision with practical expertise, ensuring that every garden I design is not only stunning but also sustainable and easy to maintain. I believe that a well-designed garden should be both a feast for the eyes and a sanctuary for the soul.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    I&apos;m passionate about creating gardens that evolve with the seasons, offering year-round interest and delight. Whether you&apos;re looking for a complete garden transformation or specific landscaping services, I&apos;m here to help bring your outdoor dreams to life.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 md:mt-24">
              <h2 className="text-3xl font-serif text-[#3c4c30] mb-6 text-center">Our Philosophy</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#f8f5f0] p-6 rounded-md">
                  <h3 className="text-xl font-serif text-[#3c4c30] mb-3">Southern Heritage</h3>
                  <p className="text-[#5a5a5a]">
                    We honor the rich gardening traditions of the South, from heirloom plants to classic garden
                    structures.
                  </p>
                </div>
                <div className="bg-[#f8f5f0] p-6 rounded-md">
                  <h3 className="text-xl font-serif text-[#3c4c30] mb-3">Sustainable Practices</h3>
                  <p className="text-[#5a5a5a]">
                    Our designs incorporate native plants, water conservation, and eco-friendly maintenance techniques.
                  </p>
                </div>
                <div className="bg-[#f8f5f0] p-6 rounded-md">
                  <h3 className="text-xl font-serif text-[#3c4c30] mb-3">Personal Touch</h3>
                  <p className="text-[#5a5a5a]">
                    Every garden we create reflects the personality and lifestyle of its owner, creating a unique
                    outdoor space.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button className="bg-[#738c65] hover:bg-[#5d7251] text-white">
                View Our Services <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

