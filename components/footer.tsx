import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Flower, Mail } from "lucide-react"
import { SocialLinks } from "@/components/social-links"

export function Footer() {
  return (
    <footer className="bg-[#3c4c30] text-white">
      <div className="container mx-auto py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flower className="h-6 w-6" />
              <span className="font-serif text-xl">Blooms by Beth</span>
            </div>
            <p className="text-white/80 mb-6">
              Bringing Southern charm and timeless elegance to gardens across the Southeast since 1996.
            </p>
            <SocialLinks className="text-white/80" />
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>plant@bloomsbybethchs.com</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Beth
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
          <p>© {new Date().getFullYear()} Blooms by Beth. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

