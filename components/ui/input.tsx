import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          // layout
          "h-9 w-full rounded-md px-3 py-1 text-sm",
          "transition-colors duration-150 outline-none",

          // colores base
          "bg-background text-text border border-border",
          "placeholder:text-text-subtle",

          // focus
          "focus-visible:border-primary",
          "focus-visible:ring-2 focus-visible:ring-ring/40",

          // error
          "aria-invalid:border-danger",
          "aria-invalid:ring-2 aria-invalid:ring-danger/30",

          // disabled
          "disabled:opacity-50 disabled:cursor-not-allowed"
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

export { Input }
