import { useEffect, useRef, useState } from 'react'

type SplashScreenProps = {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0
    let maxRadius = 0

    const blockSize = 10
    const duration = 1800
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const ringBlocks = Array.from({ length: 360 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 360 + (Math.random() - 0.5) * 0.02,
      offsetFactor: 0.85 + Math.random() * 0.3,
    }))

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = Math.floor(window.innerWidth * dpr)
      height = Math.floor(window.innerHeight * dpr)
      canvas.width = width
      canvas.height = height
      centerX = width / 2
      centerY = height / 2
      maxRadius = Math.sqrt(width * width + height * height) / 2
    }

    resize()
    window.addEventListener('resize', resize)

    let startTime: number | null = null

    const draw = (now: number) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const currentRadius = easeOutCubic(progress) * maxRadius

      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(centerX, centerY, Math.max(currentRadius - blockSize * 2, 0), 0, Math.PI * 2)
      ctx.fill()

      ringBlocks.forEach(({ angle, offsetFactor }) => {
        const radius = currentRadius * offsetFactor
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        ctx.fillRect(x - blockSize / 2, y - blockSize / 2, blockSize, blockSize)
      })

      for (let i = 0; i < 180; i++) {
        const angle = (Math.PI * 2 * i) / 180 + (Math.random() - 0.5) * 0.05
        const radius = currentRadius * (0.92 + Math.random() * 0.12)
        const size = blockSize * 0.8
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        ctx.fillRect(x - size / 2, y - size / 2, size, size)
      }

      if (progress < 1) {
        raf = requestAnimationFrame(draw)
      } else {
        setFading(true)
      }
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    if (!fading) return
    const timer = window.setTimeout(onComplete, 400)
    return () => window.clearTimeout(timer)
  }, [fading, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-400 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: fading ? 'none' : 'auto' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}