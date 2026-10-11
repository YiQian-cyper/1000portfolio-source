import { ChevronRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="sticky top-0 z-10 w-full h-screen flex flex-col">
      {/* sink to black so the next section can fade up out of the dark */}
      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 'calc(var(--p) * 2.2)' }}
      />

      <div className="relative px-4 sm:px-6 lg:px-10 pt-40 sm:pt-52 flex flex-col items-center text-center">
        <div
          className="will-change-transform"
          style={{
            opacity: 'calc(1 - var(--p) * 2.8)',
            transform: 'translateY(calc(var(--p) * -70px))',
          }}
        >
          <p
            className="font-jetbrains text-xs sm:text-sm tracking-[0.3em] uppercase text-white/70 mb-10 sm:mb-16 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            Game Design Portfolio
          </p>
        </div>

        <div
          className="will-change-transform"
          style={{
            opacity: 'calc(1 - var(--p) * 2.2)',
            transform: 'translateY(calc(var(--p) * -130px)) scale(calc(1 - var(--p) * 0.22))',
            filter: 'blur(calc(var(--p) * 22px))',
          }}
        >
          <h1
            className="font-bubbledot text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight opacity-0 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            PLAY. BREAK. REBUILD.
          </h1>
        </div>
      </div>

      <div
        className="relative mt-auto px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-8 will-change-transform"
        style={{
          opacity: 'calc(1 - var(--p) * 2.6)',
          transform: 'translateY(calc(var(--p) * -80px))',
          filter: 'blur(calc(var(--p) * 12px))',
        }}
      >
        <p
          className="font-jetbrains text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          Level design, systems and prototyping — built in Unreal Engine 5 and Unity, tuned through
          real playtests.
        </p>

        <a
          href="#work"
          className="group flex items-center bg-black rounded-xl opacity-0 animate-fade-up"
          style={{ animationDelay: '0.9s' }}
        >
          <span className="w-11 h-11 m-0.5 rounded-lg bg-[#F64302] flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <span className="px-5 py-3.5 text-base font-jetbrains font-medium text-white">
            View my work
          </span>
        </a>
      </div>
    </section>
  )
}