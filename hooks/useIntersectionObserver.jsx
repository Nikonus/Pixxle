'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState(null)
  const ref = useRef(null)
  const observerRef = useRef(null)

  const callback = useCallback((entries) => {
    const [firstEntry] = entries
    setIsIntersecting(firstEntry.isIntersecting)
    setEntry(firstEntry)
    
    if (triggerOnce && firstEntry.isIntersecting) {
      observerRef.current?.disconnect()
    }
  }, [triggerOnce])

  useEffect(() => {
    if (!ref.current) return

    observerRef.current = new IntersectionObserver(callback, {
      threshold,
      rootMargin
    })

    const currentRef = ref.current
    observerRef.current.observe(currentRef)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [callback, rootMargin, threshold])

  return {
    ref,
    isIntersecting,
    entry,
    observer: observerRef.current
  }
}