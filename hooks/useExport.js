'use client'
import { useState } from 'react'
import { useCanvas } from '@/context/CanvasContext'

export function useExport() {
  const [isExporting, setIsExporting] = useState(false)
  const { canvasEditor } = useCanvas()

  const exportImage = async (format = 'png') => {
    setIsExporting(true)
    try {
      const dataURL = canvasEditor.toDataURL({
        format,
        quality: 1,
        multiplier: 2
      })
      // Download logic
      const link = document.createElement('a')
      link.href = dataURL
      link.download = `edited-image.${format}`
      link.click()
    } finally {
      setIsExporting(false)
    }
  }

  return { exportImage, isExporting }
}