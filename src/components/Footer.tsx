import { ChevronRight } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const PROCESS_STEPS = [
  {
    id: '01',
    title: 'Discover',
    body: 'Play the references, break them down, and write down what actually makes them work.',
  },
  {
    id: '02',
    title: 'Prototype',
    body: 'Rough grey boxes in engine within days, not months — playable before it is pretty.',
  },
  {
    id: '03',
    title: 'Playtest',
    body: 'Watch real players, mark where they get lost, and cut everything that does not hold up.',
  },
  {
    id: '04',
    title: 'Polish',
    body: 'Tune feel, feedback and readability until the level explains itself.',
  },
]

const LINKS = [
  { label: 'bp1911600024@outlook.com', href: 'mailto:bp1911600024@outlook.com' },
  { label: 'itch.io', href: 'https://yiqianthousands.itch.io' },
]

export default function Footer() {
  const { ref, reveal } = useReveal<HTMLElement>(0.1)

  return (
    <footer
      ref={ref}
      className="relative z-10 w-full bg-[#E8E5E9] px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14"
    >
      <div id="process" className="border-t border-black/10 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <h2
            className={`text-2xl sm:text-3xl font-medium text-black leading-snug opacity-0 ${
              reveal
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            How I <span className="text-black/40">work</span>
          </h2>

          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.id}
              className={`opacity-0 ${reveal}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <p className="font-bubbledot text-2xl text-black/80">{step.id}</p>
              <p className="font-jetbrains text-sm font-medium text-black mt-2">{step.title}</p>
              <p className="font-jetbrains text-xs text-black/60 leading-relaxed mt-2">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
          id="contact"
          className="border-t border-black/10 mt-12 sm:mt-16 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
        <div
          className={`opacity-0 ${reveal}`}
          style={{ animationDelay: '0.6s' }}
        >
          <p className="font-jetbrains text-xs tracking-[0.3em] uppercase text-black/50">
            Open to portfolio reviews
          </p>
          <p className="font-bubbledot text-3xl sm:text-4xl md:text-5xl text-black mt-4">
            LET US BUILD
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-3 opacity-0 ${
            reveal
          }`}
          style={{ animationDelay: '0.75s' }}
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(/^https?:/.test(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group inline-flex items-center gap-2 bg-white rounded-xl px-5 py-3 font-jetbrains text-sm font-medium text-black shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
            >
              {link.label}
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>

      <p className="font-jetbrains text-[11px] text-black/40 text-center mt-12">
        © 2026 Pan Bokun — Game Design Portfolio
      </p>
    </footer>
  )
}