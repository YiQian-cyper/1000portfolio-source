import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element once it is meaningfully in view, and re-arms it as soon as
 * it has left the viewport completely. Sections therefore replay their entrance
 * on the way back up the page, and the entrance runs in the direction the user
 * is actually scrolling: from below while scrolling down, from above while
 * scrolling up.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null)
  const visibleRef = useRef(false)
  const [visible, setVisible] = useState(false)
  const [fromTop, setFromTop] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) {
          if (!visibleRef.current) {
            visibleRef.current = true
            setFromTop(entry.boundingClientRect.top < 0)
            setVisible(true)
          }
        } else if (entry.intersectionRatio === 0 && visibleRef.current) {
          visibleRef.current = false
          setVisible(false)
        }
      },
      { threshold: [0, threshold] },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return {
    ref,
    visible,
    fromTop,
    reveal: visible ? (fromTop ? 'animate-fade-down' : 'animate-fade-up') : '',
  }
}