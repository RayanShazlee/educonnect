'use client'

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { type Resume } from "@/lib/types"

interface ResumeExportProps {
  resume: Resume
}

export function ResumeExport({ resume }: ResumeExportProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportAsPDF = async () => {
    setIsExporting(true)
    try {
      // TODO: Implement PDF export
      console.log("Exporting as PDF:", resume)
    } catch (error) {
      console.error("Failed to export as PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsWord = async () => {
    setIsExporting(true)
    try {
      // TODO: Implement Word export
      console.log("Exporting as Word:", resume)
    } catch (error) {
      console.error("Failed to export as Word:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsHTML = async () => {
    setIsExporting(true)
    try {
      // TODO: Implement HTML export
      console.log("Exporting as HTML:", resume)
    } catch (error) {
      console.error("Failed to export as HTML:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportAsPDF}>
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsWord}>
          Export as Word
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsHTML}>
          Export as HTML
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}