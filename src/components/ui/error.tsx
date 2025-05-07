import { Button } from "@/components/ui/button"

interface ErrorProps {
  title?: string
  message?: string
  actionText?: string
  onAction?: () => void
}

export function Error({
  title = "Something went wrong",
  message = "An error occurred. Please try again later.",
  actionText = "Try Again",
  onAction
}: ErrorProps) {
  return (
    <div className="flex h-[450px] w-full flex-col items-center justify-center gap-4 text-center">
      <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{message}</p>
      {onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionText}
        </Button>
      )}
    </div>
  )
}

export function ErrorCard({
  title = "Error",
  message = "Failed to load content",
  actionText,
  onAction
}: ErrorProps) {
  return (
    <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-lg border bg-card p-6 text-center">
      <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center text-xl">
        ⚠️
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
      {onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-2">
          {actionText}
        </Button>
      )}
    </div>
  )
}