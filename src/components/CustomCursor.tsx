import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

type Ripple = {
  id: number
  x: number
  y: number
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isVisible, setIsVisible] = useState(false)

  // Mouse Coordinates
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring physics for trailing ring
  const springConfig = { stiffness: 350, damping: 28 }
  const trailX = useSpring(cursorX, springConfig)
  const trailY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  // Detect Hover on Interactive Elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isClickable = target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')
      setIsHovered(!!isClickable)
    }

    window.addEventListener('mouseover', handleMouseOver)
    return () => window.removeEventListener('mouseover', handleMouseOver)
  }, [])

  // Detect Mouse Down for Ripple Generation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isVisible) return
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      }
      setRipples((prev) => [...prev, newRipple])
    }

    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [isVisible])

  if (!isVisible) return null

  const ringSize = isHovered ? 40 : 20

  return (
    <>
      {/* Click ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ x: ripple.x, y: ripple.y, translateX: '-50%', translateY: '-50%', scale: 0.1, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
          }}
          className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border-2 border-amber-500 bg-amber-500/5"
        />
      ))}

      {/* Trailing Outer Ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.08)' : 'rgba(245, 158, 11, 0.02)',
          borderColor: isHovered ? 'rgba(245, 158, 11, 0.7)' : 'rgba(245, 158, 11, 0.35)',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 30, mass: 0.5 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-solid"
      />

      {/* Inner Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? '#ea580c' : '#f59e0b',
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full"
      />
    </>
  )
}
