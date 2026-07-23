export default function Footer() {
  return (
    <footer className="border-t border-stone-200 px-6 py-8 text-sm text-stone-500 lg:px-8 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Mayank Rai. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#about" className="transition hover:text-amber-600 dark:hover:text-white">About</a>
          <a href="#projects" className="transition hover:text-amber-600 dark:hover:text-white">Projects</a>
          <a href="#contact" className="transition hover:text-amber-600 dark:hover:text-white">Contact</a>
          <a href="/Mayank_Rai_Resume.pdf" target="_blank" rel="noopener noreferrer" className="transition hover:text-amber-600 dark:hover:text-white">Resume</a>
        </div>
      </div>
    </footer>
  )
}
