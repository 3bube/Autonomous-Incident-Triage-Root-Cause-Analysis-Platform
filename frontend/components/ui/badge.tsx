import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Severity variants
        "severity-critical":
          "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
        "severity-high":
          "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30",
        "severity-medium":
          "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
        "severity-low":
          "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
        // Status variants
        "status-investigating":
          "bg-orange-500/20 text-orange-400 border-none hover:bg-orange-500/30",
        "status-monitoring":
          "bg-blue-500/20 text-blue-400 border-none hover:bg-blue-500/30",
        "status-mitigated":
          "bg-purple-500/20 text-purple-400 border-none hover:bg-purple-500/30",
        "status-resolved":
          "bg-green-500/20 text-green-400 border-none hover:bg-green-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
