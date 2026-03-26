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
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="relative w-full mx-auto md:mx-0 max-w-md md:max-w-none aspect-square">
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
                    Meet Beth McGinty, a Charleston plant specialist with about 30 years of local gardening experience.
                    From South Carolina, Beth has spent her career growing beautiful gardens and planting flower pots.
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
                  <p>Beth is an active member of the Charleston Horticultural Society. She also actively supports 
                    Green Heart Charleston and the Charleston Parks Conservancy.</p>
                </div>
              </div>
            </div>


            <div className="mt-16 md:mt-20">
              <h2 className="text-3xl font-serif text-[#3c4c30] mb-6 text-center">Beth's Philosophies</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#f8f5f0] p-6 rounded-md">
                  <h3 className="text-xl font-serif text-[#3c4c30] mb-3 text-center">Southern Heritage</h3>
                  <p className="text-[#5a5a5a] text-center">
                    We honor the rich gardening traditions of the South, from heirloom plants to classic garden
                    structures.
                  </p>
                </div>
                <div className="bg-[#f8f5f0] p-6 rounded-md">
                  <h3 className="text-xl font-serif text-[#3c4c30] mb-3 text-center">Sustainable Practices</h3>
                  <p className="text-[#5a5a5a] text-center">
                    Our designs incorporate native plants, water conservation, and eco-friendly maintenance techniques.
                  </p>
                </div>
                <div className="bg-[#f8f5f0] p-6 rounded-md">
                  <h3 className="text-xl font-serif text-[#3c4c30] mb-3 text-center">Personal Touch</h3>
                  <p className="text-[#5a5a5a] text-center">
                    Every garden we create reflects the personality and lifestyle of its owner, creating a unique
                    outdoor space.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
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

