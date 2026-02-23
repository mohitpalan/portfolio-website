import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Smartphone, HeadphonesIcon, Shield } from 'lucide-react'

const projects = [
  {
    title: 'Finance Tracker',
    icon: Smartphone,
    description:
      'Full-stack personal finance app with smart SMS auto-import from 50+ bank formats, expense splitting with friends, budget tracking, recurring bill management, and group expenses. Features offline support, push notifications, and OTA updates.',
    tech: ['React Native', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'Firebase'],
    link: 'https://financetracker.web.mohitpalan.me',
    featured: true,
  },
  {
    title: 'PayU Buyer Care',
    icon: HeadphonesIcon,
    description:
      'End-to-end help center for PayU handling 3.6L+ transactions annually and serving 10K+ monthly users. Led discovery, implementation, and iteration—enabling a massive reduction in support tickets through improved self-serve resolution.',
    tech: ['React', 'Redux', 'Jest', 'Cypress'],
    featured: false,
  },
  {
    title: 'Smart Safety Device',
    icon: Shield,
    description:
      'Patent-pending Smart Pepper Spray Device (Application No. 202341000182) combining hardware with smart capabilities to enhance personal safety. From concept through to implementation and formal IP protection.',
    tech: ['IoT', 'Embedded Systems', 'Patent'],
    featured: false,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-mint-300 mx-auto rounded-full" />
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  project.featured
                    ? 'bg-gradient-to-br from-primary-50/80 via-white to-accent-50/50 dark:from-primary-950/30 dark:via-slate-800/60 dark:to-accent-950/20 border-primary-200/60 dark:border-primary-800/40'
                    : 'bg-white dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/40'
                }`}
              >
                {project.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-accent-400 to-mint-400" />
                )}

                <div className={`p-6 md:p-8 ${project.featured ? 'md:flex md:gap-8 md:items-start' : ''}`}>
                  <div className={project.featured ? 'md:flex-1' : ''}>
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          project.featured
                            ? 'bg-gradient-to-br from-primary-400 to-accent-400 text-white'
                            : 'bg-primary-50 dark:bg-slate-700 text-primary-500 dark:text-primary-400'
                        }`}
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{project.title}</h3>
                          {project.featured && (
                            <span className="px-2.5 py-0.5 rounded-full bg-mint-100 dark:bg-mint-900/30 text-mint-700 dark:text-mint-400 text-xs font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                      >
                        View Project <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
