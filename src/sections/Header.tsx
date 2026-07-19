import type { Dispatch, SetStateAction } from 'react'

type HeaderProps = {
  theme: 'dark' | 'light'
  setTheme: Dispatch<SetStateAction<'dark' | 'light'>>
}

export default function Header({ theme, setTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/70 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-stone-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="text-lg font-semibold tracking-[0.25em] text-stone-900 transition-colors dark:text-stone-100">
          MAYANK
        </a>
        <nav className="hidden items-center gap-6 text-sm text-stone-600 md:flex dark:text-stone-400">
          <a href="#about" className="transition hover:text-amber-600 dark:hover:text-amber-400">About</a>
          <a href="#skills" className="transition hover:text-amber-600 dark:hover:text-amber-400">Skills</a>
          <a href="#projects" className="transition hover:text-amber-600 dark:hover:text-amber-400">Projects</a>
          <a href="#contact" className="transition hover:text-amber-600 dark:hover:text-amber-400">Contact</a>
        </nav>
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-200 dark:border-white/10 dark:bg-white/10 dark:text-stone-200 dark:hover:bg-white/20"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
