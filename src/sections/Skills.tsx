import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionHeading from '../components/SectionHeading'
import ThreeDCard from '../components/ThreeDCard'
import { skillGroups, skillDetailsMap } from '../data/portfolioData'
import { containerVariants, itemVariants } from '../animations/variants'

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Skills" title="A modern stack built for shipping ambitious ideas" description="The toolkit I use spans product development, infrastructure, and AI workflow design." />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={itemVariants}>
              <GlassCard className="p-7 h-full">
                <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
                  <Code2 size={18} />
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white">{group.title}</h3>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {group.items.map((item) => {
                    const detail = skillDetailsMap[item]
                    if (!detail) {
                      return (
                        <div
                          key={item}
                          className="flex items-center justify-center rounded-2xl border border-stone-200 bg-white/70 p-3 text-sm font-medium text-stone-700 dark:border-white/10 dark:bg-stone-900/60 dark:text-stone-300"
                        >
                          {item}
                        </div>
                      )
                    }
                    return (
                      <ThreeDCard
                        key={item}
                        name={item}
                        icon={detail.icon}
                        color={detail.color}
                        glowClass={detail.glowClass}
                      />
                    )
                  })}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
