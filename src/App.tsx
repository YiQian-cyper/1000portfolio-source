import type { CSSProperties } from 'react'
import { useState } from 'react'
import SplashScreen from '@/components/SplashScreen'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import Footer from '@/components/Footer'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const rootRef = useScrollProgress<HTMLDivElement>()

  return (
    <div ref={rootRef} style={{ '--p': 0 } as CSSProperties} className="relative">
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        <video
          src="videos/hero-bg.mp4"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <Navbar />
      <Hero />
      <About />
      <Products />
      <Footer />
    </div>
  )
}