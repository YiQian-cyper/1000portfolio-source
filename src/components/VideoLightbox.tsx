import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Volume2, VolumeX, X } from 'lucide-react'

const EXIT_MS = 260

type Props = {
  src: string
  title: string
  onClose: () => void
}

/**
 * Full-screen player for a work clip. The backdrop is blurred so the page
 * behind it stays recognisable but recedes, and closing plays the same
 * transition backwards before handing control back to the page - which is
 * scrolled to exactly where it was when the clip was opened.
 */
export default function VideoLightbox({ src, title, onClose }: Props) {
  const [shown, setShown] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const closingRef = useRef(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const close = () => {
    if (closingRef.current) return
    closingRef.current = true
    setShown(false)
    window.setTimeout(() => onCloseRef.current(), EXIT_MS)
  }

  useEffect(() => {
    const body = document.body
    const root = document.documentElement
    const previousOverflow = body.style.overflow
    const previousScrollBehavior = root.style.scrollBehavior
    const restoreY = window.scrollY

    // freeze the page while the clip is up so the reader comes back to the
    // same card instead of somewhere else on the page
    body.style.overflow = 'hidden'

    const raf = requestAnimationFrame(() => setShown(true))
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    return () => {
      cancelAnimationFrame(raf)
      body.style.overflow = previousOverflow
      // `html` opts into smooth scrolling; the return trip must be instant
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, restoreY)
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // `close` only touches refs and setState, so the first instance is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const control =
    'flex h-11 w-11 items-center justify-center rounded-lg bg-black/55 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/80 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-xl"
      />

      <div
        className={`group/video relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0'
        }`}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="block max-h-[78vh] w-full bg-black object-contain"
        />

        <div className="absolute right-3 top-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            className={control}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>

          <button type="button" onClick={close} aria-label="Close video" className={control}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}