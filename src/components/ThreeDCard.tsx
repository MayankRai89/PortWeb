import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { IconType } from 'react-icons'

type ThreeDCardProps = {
  name: string
  icon: IconType
  color: string
  glowClass: string
}

export default function ThreeDCard({ name, icon: Icon, color, glowClass }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Normalized cursor coordinates (-0.5 to 0.5) for card tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Pixel cursor coordinates relative to card top-left
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Interpolate angles (max 15 degrees tilt)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 350, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 350, damping: 25 })

  // Smooth springs for spotlight coordinates
  const spotlightX = useSpring(mouseX, { stiffness: 200, damping: 20 })
  const spotlightY = useSpring(mouseY, { stiffness: 200, damping: 20 })

  // Build the dynamic radial spotlight gradient following mouse in pixels
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([latestX, latestY]) => `radial-gradient(80px circle at ${latestX}px ${latestY}px, ${color} 0%, transparent 100%)`
  )

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top

    mouseX.set(relativeX)
    mouseY.set(relativeY)

    x.set((relativeX - width / 2) / width)
    y.set((relativeY - height / 2) / height)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: '800px' }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          boxShadow: isHovered 
            ? `0 12px 30px -10px ${glowClass}`
            : '0 4px 15px -10px rgba(0,0,0,0.05)',
        }}
        className="group relative flex items-center gap-3 rounded-2xl border border-stone-200 bg-white/70 p-4 transition-colors duration-300 dark:border-white/10 dark:bg-transparent cursor-pointer w-full overflow-hidden"
      >
        {/* Dynamic spot gradient following cursor */}
        <motion.div
          style={{ backgroundImage: spotlightBg }}
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-15 dark:group-hover:opacity-25"
        />

        {/* Foreground Content */}
        <div className="relative z-10 flex items-center gap-3 w-full" style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
          <motion.div
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(${isHovered ? '20px' : '0px'})`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 p-2 dark:bg-transparent"
          >
            <Icon 
              size={22} 
              style={{ 
                color,
                filter: isHovered ? `drop-shadow(0 0 6px ${color}bf)` : 'none',
                transition: 'filter 0.3s ease'
              }} 
            />
          </motion.div>
          
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            {name}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
