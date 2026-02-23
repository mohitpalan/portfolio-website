import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, GraduationCap, Award, Star } from 'lucide-react'

const timeline = [
  {
    type: 'work' as const,
    icon: Building2,
    title: 'Software Engineer',
    org: 'PayU Payments, Bengaluru',
    period: '2023 - Present',
    points: [
      'Building core merchant- and customer-facing platforms: Maximizer, Merchant Dashboard, Buyer Care, Insights Platform, Merchant Onboarding',
      'Led the PayU Buyer Care help center — 3.6L+ transactions/year, 10K+ monthly users, massive support ticket reduction',
      'Focus on reusable UI components, test coverage improvements, and CI/CD refinement',
    ],
    badges: [
      { icon: Star, text: 'Rising Star Award FY 23-24' },
      { icon: Award, text: 'Sustained Performance Recognition' },
    ],
  },
  {
    type: 'education' as const,
    icon: GraduationCap,
    title: 'Bachelor of Engineering',
    org: 'Ramaiah Institute of Technology',
    period: '2019 - 2023',
    points: [
      'Graduated with 8.5 GPA',
      'Participated in Google Cloud programs: Cloud Engineering and Data Science & Machine Learning',
      'Invented a patent-pending Smart Safety Enhancement system (Application No. 202341000182)',
    ],
    badges: [],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Experience & Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-mint-400 to-primary-400 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-300 via-accent-300 to-mint-300 dark:from-primary-700 dark:via-accent-700 dark:to-mint-700" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title + item.org}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative pl-16 md:pl-20"
                >
                  <div
                    className={`absolute left-3 md:left-5 w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-950 ${
                      item.type === 'work'
                        ? 'bg-gradient-to-br from-primary-400 to-accent-400 text-white'
                        : 'bg-gradient-to-br from-mint-400 to-primary-400 text-white'
                    }`}
                  >
                    <Icon size={14} />
                  </div>

                  <div className="pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-400 dark:text-primary-500">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">{item.title}</h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">{item.org}</p>

                    <ul className="space-y-2.5 mb-4">
                      {item.points.map((point, j) => (
                        <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary-300 dark:bg-primary-600 mt-2" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {item.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.badges.map((badge) => {
                          const BadgeIcon = badge.icon
                          return (
                            <span
                              key={badge.text}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-950/30 text-accent-600 dark:text-accent-400 text-xs font-semibold border border-accent-200/60 dark:border-accent-800/40"
                            >
                              <BadgeIcon size={12} />
                              {badge.text}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
