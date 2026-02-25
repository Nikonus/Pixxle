// app/editor/[id]/page.jsx (starting point)

'use client'

import { useRef, useState, useEffect } from 'react'
import { useCanvas } from '@/context/editor-context'
import { api } from '@/convex/_generated/api'
import { useConvexMutation } from 'convex/react'
import { Canvas } from 'fabric'

export default function EditorPage({ params }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const { canvasEditor, setCanvasEditor, activeTool } = useCanvas()
  const updateProject = useConvexMutation(api.projects.updateProject)

  // Initialize Fabric.js Canvas
  useEffect(() => {
    const initializeCanvas = async () => {
      if (!canvasRef.current || !project || canvasEditor) return
      
      setIsLoading(true)
      
      // Calculate viewport scale
      const viewportScale = calculateViewportScale()
      
      // Create Fabric Canvas
      const canvas = new Canvas(canvasRef.current, {
        width: project.width,
        height: project.height,
        backgroundColor: 'white',
        preserveObjectStacking: true,
        selection: true,
        allowTouchScrolling: true
      })
      
      // Set dimensions & zoom
      canvas.setDimensions({
        width: containerWidth * viewportScale,
        height: containerHeight * viewportScale
      }, { backstoreOnly: false })
      
      canvas.setZoom(viewportScale)
      setCanvasEditor(canvas)
      setIsLoading(false)
    }
    
    initializeCanvas()
  }, [project])
}