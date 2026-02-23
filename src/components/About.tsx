import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart3, Users, Layers, Lightbulb } from 'lucide-react'

const stats = [
  { icon: BarChart3, value: '3.6L+', label: 'Transactions Handled Annually' },
  { icon: Users, value: '10K+', label: 'Monthly Active Users' },
  { icon: Layers, value: '5+', label: 'Production Platforms' },
  { icon: Lightbulb, value: '1', label: 'Patent Filed' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-24 bg-surface/40 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-accent-300 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-[240px_1fr] gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary-400 via-accent-300 to-mint-400 p-[3px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <span className="text-4xl font-extrabold bg-gradient-to-br from-primary-500 to-accent-400 bg-clip-text text-transparent select-none">
                    MP
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-mint-50 dark:bg-mint-950/50 text-mint-600 dark:text-mint-400 text-xs font-bold border border-mint-200 dark:border-mint-800">
                PayU
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-5 text-[15px] leading-relaxed"
          >
            <p className="text-lg leading-relaxed">
              Software Engineer at{' '}
              <span className="font-semibold text-primary-500 dark:text-primary-400">PayU Payments</span>, Bengaluru,
              focused on crafting scalable, user-centric web experiences for high-traffic fintech products.
            </p>
            <p>
              I work on core merchant- and customer-facing platforms including{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">Maximizer</span>,{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">Merchant Dashboard</span>,{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">Buyer Care</span>,{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">Insights Platform</span>, and{' '}
              <span className="font-medium text-slate-800 dark:text-slate-200">Merchant Onboarding</span>
              &mdash;streamlining payment and merchant workflows across these surfaces in a fast-paced, product-focused
              environment.
            </p>
            <p>
              One of my most impactful initiatives is leading the{' '}
              <span className="font-semibold text-primary-500 dark:text-primary-400">PayU Buyer Care</span> help center.
              It now handles over <span className="font-semibold text-slate-800 dark:text-white">3.6 lakh transactions annually</span>,
              serves more than <span className="font-semibold text-slate-800 dark:text-white">10,000 unique users every month</span>,
              and has enabled a massive reduction in support tickets by improving self-serve resolution and clarity of
              information.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                className="text-center p-5 md:p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-primary-100/60 dark:border-slate-700/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <Icon className="w-7 h-7 mx-auto mb-3 text-primary-400 dark:text-primary-500" />
                <div className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-tight">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
