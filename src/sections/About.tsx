import { motion } from 'framer-motion'
import { BrainCircuit } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import { timeline } from '../data/portfolioData'

export default function About() {
  return (
    <section id="about" className="px-6 py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl"
      >
        <SectionHeading eyebrow="About" title="Crafting ambitious products at the intersection of engineering and AI" description="My work is rooted in solving real problems with systems that are elegant, scalable, and product-ready." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard className="p-8">
            <p className="text-lg leading-8 text-stone-700 dark:text-stone-300">
              I started in software development because I loved turning ideas into tools that people could actually use. Over time that curiosity expanded into backend engineering, distributed systems, and AI-powered experiences that feel intuitive and dynamic.
            </p>
            <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-400">
              Today, I focus on building delightful products with a thoughtful blend of performance, architecture, and modern interfaces.
            </p>
          </GlassCard>
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400">
              <BrainCircuit size={22} />
              <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Journey in motion</h3>
            </div>
            <div className="mt-8 space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="rounded-2xl border border-stone-200/60 bg-stone-100/50 p-4 dark:border-white/10 dark:bg-transparent">
                  <div className="text-sm uppercase tracking-[0.3em] text-amber-500">{item.year}</div>
                  <div className="mt-2 text-lg font-semibold text-stone-900 dark:text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </section>
  )
}
