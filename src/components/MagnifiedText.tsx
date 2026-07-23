import { useRef, useCallback, useEffect } from 'react'

type MagnifiedTextProps = {
  text: string
  className?: string
}

export default function MagnifiedText({ text, className = '' }: MagnifiedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  const rectsRef = useRef<{ el: HTMLElement; cx: number; cy: number }[]>([])
  const rafRef = useRef<number>(0)
  
  const buildCache = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const spans = container.querySelectorAll<HTMLElement>('.magnify-char')
    rectsRef.current = Array.from(spans).map((el) => {
      const r = el.getBoundingClientRect()
      return { el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
    })
  }, [])

  useEffect(() => {
    
    const id = requestAnimationFrame(buildCache)
    
    window.addEventListener('resize', buildCache, { passive: true })
    window.addEventListener('scroll', buildCache, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', buildCache)
      window.removeEventListener('scroll', buildCache)
    }
  }, [buildCache, text])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    const mx = e.clientX
    const my = e.clientY
    
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const maxDist = 90
      for (const { el, cx, cy } of rectsRef.current) {
        const dist = Math.hypot(mx - cx, my - cy)
        if (dist < maxDist) {
          const factor = 1 - dist / maxDist
          const scale = 1 + factor * 0.35
          const ty = -(factor * 6)
          el.style.transform = `scale(${scale}) translateY(${ty}px)`
          el.style.color = 'rgb(245,158,11)'
        } else {
          el.style.transform = ''
          el.style.color = ''
        }
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = 0
    const container = containerRef.current
    if (!container) return
    const spans = container.querySelectorAll<HTMLElement>('.magnify-char')
    spans.forEach((el) => {
      el.style.transform = ''
      el.style.color = ''
    })
  }, [])

  return (
    <span
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block select-none ${className}`}
    >
      {text.split(' ').map((word, wordIndex, wordsArr) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="magnify-char inline-block transition-transform transition-colors duration-300 ease-out origin-center will-change-transform"
            >
              {char}
            </span>
          ))}
          {wordIndex < wordsArr.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}
