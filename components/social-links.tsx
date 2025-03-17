import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <Link
        href="https://www.instagram.com/bloomsbybeth/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#738c65] hover:text-[#5d7251] transition-colors"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="h-5 w-5" />
      </Link>
      <Link
        href="https://www.facebook.com/bloomsbybeth.mcginty"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#738c65] hover:text-[#5d7251] transition-colors"
        aria-label="Follow us on Facebook"
      >
        <Facebook className="h-5 w-5" />
      </Link>
    </div>
  )
}

