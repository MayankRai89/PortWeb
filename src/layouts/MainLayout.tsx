import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import CustomCursor from '../components/CustomCursor'
import Header from '../sections/Header'
import '../styles/App.css'

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  // Normalized cursor coordinates starting at center (50%)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  // Smooth springs for tracking coordinates
  const springX = useSpring(glowX, { stiffness: 80, damping: 30 })
  const springY = useSpring(glowY, { stiffness: 80, damping: 30 })

  // Build the dynamic radial gradient string using CSS variables
  const backgroundStyle = useTransform(
    [springX, springY],
    ([latestX, latestY]) => `radial-gradient(circle at ${latestX}% ${latestY}%, var(--color-bg-glow) 0%, transparent 45%)`
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth) * 100
      const yPct = (e.clientY / window.innerHeight) * 100
      glowX.set(xPct)
      glowY.set(yPct)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [glowX, glowY])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-stone-100 text-stone-850 transition-colors duration-500 dark:bg-stone-950 dark:text-stone-100">
      {/* Dynamic Ambient Background Glow following the cursor */}
      <motion.div
        style={{ backgroundImage: backgroundStyle }}
        className="pointer-events-none fixed inset-0 z-0"
      />

      {/* Main layout backdrop gradient */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-stone-200/20 via-stone-100 to-stone-300/30 opacity-70 transition-opacity duration-500 dark:from-stone-950/40 dark:via-stone-950 dark:to-stone-900/40 dark:opacity-100" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        <CustomCursor />
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
          style={{ scaleX }}
        />
        <Header theme={theme} setTheme={setTheme} />
        {children}
      </div>
    </div>
  )
}
