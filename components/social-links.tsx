import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function SocialLinks({ className = "text-sage hover:text-sage-hover" }: { className?: string }) {
  return (
    <div className="flex gap-4">
      <Link
        href="https://www.instagram.com/bloomsbybeth/"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors ${className}`}
        aria-label="Follow us on Instagram"
      >
        <Instagram className="h-5 w-5" />
      </Link>
      <Link
        href="https://www.facebook.com/bloomsbybeth.mcginty"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors ${className}`}
        aria-label="Follow us on Facebook"
      >
        <Facebook className="h-5 w-5" />
      </Link>
    </div>
  )
}

