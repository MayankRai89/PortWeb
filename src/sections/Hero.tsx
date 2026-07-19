import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Mail, Pause, Play, Sparkles } from 'lucide-react'
import { useRef, useState, useMemo } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import MagnifiedText from '../components/MagnifiedText'

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [showIcon, setShowIcon] = useState(false)
  let iconTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggle = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
    setShowIcon(true)
    if (iconTimeout.current) clearTimeout(iconTimeout.current)
    iconTimeout.current = setTimeout(() => setShowIcon(false), 900)
  }

  return (
    <div
      className="relative h-[420px] cursor-pointer overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-950 shadow-2xl shadow-stone-200/40 backdrop-blur-2xl dark:border-white/10 dark:shadow-amber-950/20"
      onClick={toggle}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.06),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(217,119,6,0.05),_transparent_35%)]" />

      {/* Full-frame video */}
      <video
        ref={videoRef}
        src="/mayankvideo.mp4"
        autoPlay
        playsInline
        className="h-[420px] w-[420px] object-contain"
      />

      {/* Play / Pause icon flash */}
      <AnimatePresence>
        {showIcon && (
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="rounded-full bg-black/50 p-4 backdrop-blur-sm">
              {playing ? (
                <Play className="text-white" size={28} fill="white" />
              ) : (
                <Pause className="text-white" size={28} fill="white" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type HeroProps = {
  heroRef: React.RefObject<HTMLDivElement | null>
}

export default function Hero({ heroRef }: HeroProps) {
  const socialLinks = useMemo(
    () => [
      { href: 'https://github.com', label: 'GitHub', icon: FaGithub },
      { href: 'https://linkedin.com', label: 'LinkedIn', icon: FaLinkedin },
      { href: 'https://leetcode.com', label: 'LeetCode', icon: SiLeetcode },
      { href: 'mailto:mayank@example.com', label: 'Email', icon: Mail },
    ],
    [],
  )

  return (
    <section ref={heroRef} className="relative overflow-hidden px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(245,158,11,0.12),_transparent_24%),radial-gradient(circle_at_80%_0%,_rgba(217,119,6,0.1),_transparent_30%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-400">
            <Sparkles size={14} /> Available for product engineering and AI systems
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            <MagnifiedText text="Hello, I'm " />
            <MagnifiedText text="Mayank Rai" className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent" />
          </h1>
          <div className="mt-6 text-2xl font-medium sm:text-3xl text-stone-700 dark:text-stone-300">
            <span className="mr-3">Full Stack Developer</span>
            <span className="text-amber-600 dark:text-amber-400">• Backend Engineer</span>
            <br />
            <span className="text-orange-600 dark:text-orange-400">• AI Enthusiast</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-400">
            I build resilient web applications, backend systems, and AI-powered experiences with a focus on performance, reliability, and a premium user experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 font-medium text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-400">
              Hire Me <ArrowRight className="transition group-hover:translate-x-1" size={18} />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-5 py-3 font-medium text-stone-700 backdrop-blur transition hover:bg-stone-200 dark:border-white/10 dark:bg-white/10 dark:text-stone-200 dark:hover:bg-white/20">
              Download Resume
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-stone-300 bg-white/80 p-3 text-stone-600 transition hover:-translate-y-1 hover:border-amber-500/40 hover:text-amber-600 dark:border-white/10 dark:bg-stone-900/70 dark:text-stone-300 dark:hover:border-amber-500/40 dark:hover:text-amber-400">
                <Icon size={18} />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <HeroVideo />
        </motion.div>
      </div>
    </section>
  )
}
