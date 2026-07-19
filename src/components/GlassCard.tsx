import type { HTMLAttributes, ReactNode } from 'react'

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <div
      className={`rounded-[2rem] border border-stone-200/80 bg-white/70 backdrop-blur-2xl shadow-lg shadow-stone-200/40 dark:border-white/10 dark:bg-transparent dark:shadow-none transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
