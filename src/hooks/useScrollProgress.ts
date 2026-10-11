import { useEffect, useRef } from 'react'

/**
 * Watches the first viewport of scrolling and writes a 0 -> 1 progress value
 * onto the element as the `--p` custom property. Custom properties inherit, so
 * every section can read the same value and stay perfectly in sync. The value is
 * written straight to the DOM, so scrolling never triggers a React re-render.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(factor = 0.9) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let raf = 0

    const update = () => {
      raf = 0
      const viewport = window.innerHeight || 1
      const progress = Math.min(Math.max(window.scrollY / (viewport * factor), 0), 1)
      element.style.setProperty('--p', progress.toFixed(4))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [factor])

  return ref
}