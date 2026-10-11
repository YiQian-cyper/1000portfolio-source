import { Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import VideoLightbox from '@/components/VideoLightbox'

/**
 * The three work slots.
 *
 * To use your own clips: drop the files in `public/videos/` and reference them
 * as `videos/your-clip.mp4` (relative, so the exported single-file page keeps
 * working). Clicking a card opens the clip in the full-screen lightbox.
 */
type Work = {
  id: string
  tag: string
  title: string
  body: string
  video: string
  poster: string
}

const WORKS: Work[] = [
  {
    id: '01',
    tag: 'Zombie FPS',
    title: 'The Last Day',
    body: 'A survival zombie FPS where the level is the real threat. Sightlines, chokepoints and cover are placed so the fight keeps players moving instead of camping one corner.',
    video: 'videos/the-last-day.mp4',
    poster: 'videos/the-last-day.jpg',
  },
  {
    id: '02',
    tag: 'Horror RPG',
    title: 'Formula of the Fading Honeymoon',
    body: 'A story-driven horror RPG built around puzzle rooms. Maps, props and dialogue are arranged so clues read clearly on screen, and every solution is something the player has already seen.',
    video: 'videos/formula-of-the-fading-honeymoon.mp4',
    poster: 'videos/formula-of-the-fading-honeymoon.jpg',
  },
  {
    id: '03',
    tag: 'Digital Exhibition',
    title: 'Shan Hai Jing: Symbiosis Era',
    body: 'A digital exhibition hall for the Classic of Mountains and Seas. A walkable 3D space that turns mythic beasts into exhibits, laid out and lit so visitors move naturally from one creature to the next.',
    video: 'videos/shan-hai-jing.mp4',
    poster: 'videos/shan-hai-jing.jpg',
  },
]

function WorkVideo({
  src,
  poster,
  id,
  title,
  onOpen,
}: {
  src: string
  poster: string
  id: string
  title: string
  onOpen: () => void
}) {
  const [missing, setMissing] = useState(false)
  const [posterMissing, setPosterMissing] = useState(false)

  // If the clip cannot play (blocked network, unsupported codec or autoplay
  // refused) fall back to its poster frame so the card never looks broken.
  if (missing && posterMissing) {
    return (
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-black">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#141414]">
          <p className="font-bubbledot text-4xl text-white/25">{id}</p>
          <p className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/40">
            Video slot
          </p>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Play ${title}`}
      className="group/play relative aspect-video w-full shrink-0 cursor-pointer overflow-hidden rounded-xl bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EBE8EB]"
    >
      {missing ? (
        <img
          src={poster}
          alt=""
          onError={() => setPosterMissing(true)}
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setMissing(true)}
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      )}

      <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 className="h-4 w-4" />
      </span>
    </button>
  )
}

export default function Products() {
  const { ref, visible, reveal } = useReveal<HTMLElement>(0.1)
  const [openWork, setOpenWork] = useState<Work | null>(null)

  return (
    <section
      id="work"
      ref={ref}
      className="relative z-10 w-full bg-[#E8E5E9] px-2 pb-3 pt-2 sm:px-3 sm:pb-4 sm:pt-3 rounded-t-[2rem] sm:rounded-t-[2.75rem] shadow-[0_-30px_60px_-12px_rgba(0,0,0,0.45)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
        {WORKS.map((work, i) => (
          <article
            key={work.id}
            className={`group flex flex-col gap-3 rounded-2xl bg-[#EBE8EB] p-2 sm:p-3 opacity-0 ${
              visible ? 'animate-scale-in' : ''
            }`}
            style={{ animationDelay: `${0.1 + i * 0.15}s` }}
          >
            <WorkVideo
              src={work.video}
              poster={work.poster}
              id={work.id}
              title={work.title}
              onOpen={() => setOpenWork(work)}
            />

            <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-1 sm:px-3 sm:pb-3">
              <div
                className={`flex items-center justify-between gap-3 opacity-0 ${reveal}`}
                style={{ animationDelay: `${0.3 + i * 0.15}s` }}
              >
                <p className="font-bubbledot text-4xl sm:text-5xl text-black/80 tracking-tight">
                  {work.id}
                </p>
                <span className="font-jetbrains text-[10px] uppercase tracking-[0.18em] text-black/45">
                  {work.tag}
                </span>
              </div>

              <p
                className={`font-jetbrains text-base sm:text-lg font-medium text-black leading-snug opacity-0 ${reveal}`}
                style={{ animationDelay: `${0.38 + i * 0.15}s` }}
              >
                {work.title}
              </p>

              <p
                className={`font-jetbrains flex-1 text-sm sm:text-base text-black/65 leading-relaxed opacity-0 ${reveal}`}
                style={{ animationDelay: `${0.46 + i * 0.15}s` }}
              >
                {work.body}
              </p>

            </div>
          </article>
        ))}
      </div>

      {openWork && (
        <VideoLightbox
          key={openWork.id}
          src={openWork.video}
          title={openWork.title}
          onClose={() => setOpenWork(null)}
        />
      )}
    </section>
  )
}