import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Portfolio Gallery */}
        <section className="py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-serif font-light text-[#3c4c30] mb-4">Our Portfolio</h1>
              <p className="text-lg text-[#5a5a5a] max-w-2xl mx-auto">
                Each garden tells a unique story. We are glad to be able to share these with you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured Projects from the Home Page */}
              <Card className="overflow-hidden border-none shadow-sm">
                <div className="relative h-64">
                  <Image
                    src="/flower-box-1.jpg"
                    alt="Downtown Flower Box"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl text-[#3c4c30] mb-2">Downtown Flower Box</h3>
                  <p className="text-[#5a5a5a] mb-3">Vibrant and seasonal flower boxes</p>
                  <p className="text-sm text-[#738c65]">Charleston, SC</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-sm">
                <div className="relative h-64">
                  <Image
                    src="/hanging-basket-1.jpg"
                    alt="Hanging Baskets"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl text-[#3c4c30] mb-2">Hanging Baskets</h3>
                  <p className="text-[#5a5a5a] mb-3">Hanging baskets with seasonal blooms</p>
                  <p className="text-sm text-[#738c65]">Savannah, GA</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-sm">
                <div className="relative h-64">
                  <Image
                    src="/sullivans-beach-garden-1.jpg"
                    alt="Beach Garden"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl text-[#3c4c30] mb-2">Beach Garden</h3>
                  <p className="text-[#5a5a5a] mb-3">Sullivan&apos;s Island flowery getaway</p>
                  <p className="text-sm text-[#738c65]">Sullivan&apos;s Island, SC</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

