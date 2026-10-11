import { ChevronRight } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const PANEL = 'rounded-t-[2rem] sm:rounded-t-[2.75rem]'

export default function About() {
  const { ref, reveal } = useReveal<HTMLElement>(0.1)

  return (
    <section
      id="about"
      ref={ref}
      style={{ opacity: 'calc(var(--p) * 1.6 - 0.5)' }}
      className={`relative z-20 w-full min-h-screen bg-[#f0eded] shadow-[0_-30px_60px_-12px_rgba(0,0,0,0.45)] ${PANEL}`}
    >
      <div className="pixel-edge-a absolute inset-x-0 -top-[9px] h-[9px] bg-[#f0eded]" aria-hidden />
      <div className="pixel-edge-b absolute inset-x-0 -top-[5px] h-[5px] bg-[#f0eded]" aria-hidden />
      <div className="pixel-edge-c absolute inset-x-0 -top-[3px] h-[3px] bg-[#f0eded]" aria-hidden />

      <div
        className={`about-clip-band absolute left-0 right-0 top-0 aspect-video overflow-hidden sm:bottom-0 sm:aspect-auto ${PANEL}`}
      >
        <video
          src="videos/about-bg.mp4"
          poster="videos/about-bg.jpg"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="about-clip-zoom h-full w-full object-cover will-change-transform"
        />
      </div>

      <div
        className="relative flex flex-col min-h-screen px-4 sm:px-6 lg:px-10 pt-28 pb-10 sm:pb-16 justify-between"
        style={{ transform: 'translateY(calc((1 - var(--p)) * 40px)) scale(calc(1 + (1 - var(--p)) * 0.05))' }}
      >
        <div className="flex flex-col items-start">
          <p
            className={`max-w-xs sm:max-w-sm text-xs sm:text-sm text-black/80 leading-relaxed opacity-0 ${
              reveal
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            A game designer focused on level and systems design — turning rough ideas into playable
            experiences that teach themselves.
          </p>

          <a
            href="#contact"
            className={`group mt-6 inline-flex items-center bg-white rounded-xl shadow-sm opacity-0 ${
              reveal
            }`}
            style={{ animationDelay: '0.25s' }}
          >
            <span className="w-11 h-11 m-0.5 rounded-lg bg-black flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
            <span className="px-5 py-3 text-sm font-jetbrains font-medium text-black">
              Get in touch
            </span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <h2
            className={`max-w-md text-2xl sm:text-3xl lg:text-4xl font-medium text-black leading-snug opacity-0 ${
              reveal
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            Meet <span className="font-bold">Pan Bokun</span>. Built to{' '}
            <span className="text-black/40">connect mechanics</span> and shape real play
          </h2>

          <p
            className={`max-w-lg md:text-right text-xl sm:text-2xl lg:text-3xl font-medium text-black leading-snug opacity-0 ${
              reveal
            }`}
            style={{ animationDelay: '0.55s' }}
          >
            Turn a rough idea into <span className="text-black/40">playable moments</span> that grow
            into <span className="font-bold">real player stories</span>
          </p>
        </div>
      </div>
    </section>
  )
}