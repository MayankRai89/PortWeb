import { motion } from 'framer-motion'
import { Trophy, Sparkles } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import { containerVariants, itemVariants } from '../animations/variants'

export default function Experience() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Experience" title="Milestones across engineering, product, and innovation" description="A concise view of the path so far, from education to high-impact projects and recognition." />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8 h-full">
              <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
                <Trophy size={18} />
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Education & Certifications</h3>
              </div>
              <ul className="mt-6 space-y-4 text-stone-600 dark:text-stone-400">
                <li>• Strong academic foundation in computer science and problem solving</li>
                <li>• Certifications in modern web engineering and AI tooling</li>
                <li>• Active participation in hackathons and collaborative open-source work</li>
              </ul>
            </GlassCard>
          </motion.div>
          <motion.div variants={itemVariants}>
            <GlassCard className="p-8 h-full">
              <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
                <Sparkles size={18} />
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Recognition & community</h3>
              </div>
              <ul className="mt-6 space-y-4 text-stone-600 dark:text-stone-400">
                <li>• Open-source contributions and collaborative engineering values</li>
              </ul>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
