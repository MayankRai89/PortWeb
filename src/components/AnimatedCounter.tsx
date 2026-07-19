import { useEffect, useState } from 'react'

type AnimatedCounterProps = {
  value: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ value, suffix = '', duration = 1600 }: AnimatedCounterProps) {
  const [displayedValue, setDisplayedValue] = useState(0)

  useEffect(() => {
    let animationFrame = 0
    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min(1, (time - startTime) / duration)
      setDisplayedValue(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [duration, value])

  return (
    <span>
      {displayedValue}
      {suffix}
    </span>
  )
}
