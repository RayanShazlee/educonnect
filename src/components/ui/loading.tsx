import { cn } from "@/lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function Loading({ size = "md", className, ...props }: LoadingProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex h-[450px] w-full items-center justify-center">
      <Loading size="lg" className="text-primary" />
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="flex h-[200px] w-full items-center justify-center rounded-lg border bg-card text-card-foreground shadow-sm">
      <Loading className="text-muted-foreground" />
    </div>
  )
}