import type { ReactNode } from 'react'
import MagnifiedText from './MagnifiedText'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
  children?: ReactNode
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  children,
}: SectionHeadingProps) {
  const alignmentClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignmentClass}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">
        <MagnifiedText text={eyebrow} />
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-stone-900 dark:text-white">
        <MagnifiedText text={title} />
      </h2>
      <p className="mt-4 text-base leading-7 text-stone-600 dark:text-stone-400 sm:text-lg">
        {description}
      </p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  )
}
