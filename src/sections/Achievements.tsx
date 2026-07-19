import { motion } from 'framer-motion'
import GlassCard from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import AnimatedCounter from '../components/AnimatedCounter'
import { containerVariants, itemVariants } from '../animations/variants'

export default function Achievements() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <SectionHeading eyebrow="Achievements" title="A blend of technical depth and consistent growth" description="Numbers reflect the momentum behind the work, creativity, and commitment to learning." />
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {[
                  { label: 'Projects Completed', value: 18 },
                  { label: 'GitHub Repositories', value: 24 },
                  { label: 'Technologies Learned', value: 15 },
                  { label: 'LeetCode Problems Solved', value: 320 },
                ].map((item) => (
                  <motion.div key={item.label} variants={itemVariants} className="rounded-2xl border border-stone-200 bg-white/80 p-6 dark:border-white/10 dark:bg-transparent">
                    <div className="text-4xl font-semibold text-amber-600 dark:text-amber-400"><AnimatedCounter value={item.value} /></div>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
