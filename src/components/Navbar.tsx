import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const openRef = useRef(false)
  const holdUntil = useRef(0)

  useEffect(() => {
    openRef.current = mobileOpen
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const viewport = window.innerHeight || 1

      setIsDark(y > viewport * 0.7)

      // tuck the bar away while scrolling down, bring it back on the way up
      const delta = y - lastY.current
      if (y < 120) setHidden(false)
      else if (delta > 4 && !openRef.current && Date.now() > holdUntil.current) setHidden(true)
      else if (delta < -4) setHidden(false)
      lastY.current = y

      // scroll spy: the last target whose top has passed the spy line wins.
      // The page bottoms out before the final block reaches that line, so pin
      // the last item once we are at the end of the page.
      let current = ''
      const atBottom = window.innerHeight + y >= document.body.scrollHeight - 4
      if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].label
      if (!atBottom) NAV_LINKS.forEach((link) => {
        const target = document.querySelector(link.href)
        if (target && target.getBoundingClientRect().top <= viewport * 0.45) {
          current = link.label
        }
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const goTo = (label: string, href: string) => {
    setActive(label)
    setMobileOpen(false)
    // keep the bar on screen while the programmatic scroll runs
    holdUntil.current = Date.now() + 1400
    setHidden(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  // The logo means "home": it returns to the very top (the hero) instead of the
  // About section. It reuses goTo's hold-lock so the bar cannot tuck itself away
  // mid-scroll, and it leaves the highlight to the scroll spy so the active item
  // keeps ticking back through the sections on the way up.
  const goHome = () => {
    setMobileOpen(false)
    holdUntil.current = Date.now() + 1400
    setHidden(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const logoFill = mobileOpen ? '#fff' : isDark ? '#000' : '#fff'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`relative z-50 px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !mobileOpen ? '-translate-y-[150%]' : 'translate-y-0'
        }`}
      >
        <button
          type="button"
          aria-label="Back to top"
          onClick={goHome}
          className="flex items-center"
        >
          <svg width="32" height="32" viewBox="0 0 256 256" className="transition-colors duration-300">
            <path
              fill={logoFill}
              d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z"
            />
          </svg>
        </button>

        <div className="hidden lg:flex items-center bg-white rounded-lg shadow-sm p-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => goTo(link.label, link.href)}
              className={`px-5 py-2.5 text-sm font-jetbrains font-medium rounded-lg transition-colors duration-300 ${
                active === link.label ? 'bg-black text-white' : 'text-black/70 hover:text-black'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="lg:hidden relative w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden"
          >
            <Menu
              className={`absolute w-5 h-5 transition-all duration-300 ease-out ${
                isDark ? 'text-black' : 'text-white'
              } ${mobileOpen ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'}`}
            />
            <X
              className={`absolute w-5 h-5 text-white transition-all duration-300 ease-out ${
                mobileOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/95" onClick={() => setMobileOpen(false)} />

        <div className="relative h-full flex flex-col justify-between pt-24 pb-10 px-6">
          <div className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.label}
                type="button"
                onClick={() => goTo(link.label, link.href)}
                style={{
                  transitionDelay: mobileOpen
                    ? `${150 + i * 70}ms`
                    : `${(NAV_LINKS.length - i) * 30}ms`,
                }}
                className={`flex items-center justify-between text-2xl font-jetbrains font-medium rounded-xl px-4 py-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileOpen ? 'translate-y-0' : 'translate-y-8'
                } ${active === link.label ? 'text-white bg-white/10' : 'text-white/60'}`}
              >
                <span>{link.label}</span>
                {active === link.label && <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white/30 text-xs text-center font-jetbrains">Game Design Portfolio</p>
          </div>
        </div>
      </div>
    </nav>
  )
}