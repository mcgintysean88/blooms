import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A native <select> styled to match <Input />.
 *
 * Deliberately native rather than a Radix listbox: these fields submit through
 * FormData on the contact form, and native selects also give phones their own
 * picker UI. The wrapper is relative so the chevron can be absolutely placed
 * after `appearance-none` removes the browser's own arrow.
 *
 * A `required` select whose value is still "" matches :invalid, which is how the
 * placeholder option gets muted text like <Input />'s placeholder.
 */
const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 pr-8 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "invalid:text-muted-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
        />
      </div>
    )
  },
)
Select.displayName = "Select"

export { Select }
