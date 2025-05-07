import { useState } from "react"

interface Toast {
  id: string
  title: string
  description?: string
  type?: "default" | "success" | "error" | "warning"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (
    title: string,
    description?: string,
    type: Toast["type"] = "default"
  ) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, type }])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(id)
    }, 5000)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const success = (title: string, description?: string) => {
    addToast(title, description, "success")
  }

  const error = (title: string, description?: string) => {
    addToast(title, description, "error")
  }

  const warning = (title: string, description?: string) => {
    addToast(title, description, "warning")
  }

  return {
    toasts,
    addToast,
    dismissToast,
    success,
    error,
    warning,
  }
}