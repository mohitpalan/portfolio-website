import { motion } from 'framer-motion'
import { ArrowDown, Briefcase, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      <div
        className="absolute top-20 -left-20 w-72 h-72 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl"
        style={{ animation: 'float 8s ease-in-out infinite' }}
      />
      <div
        className="absolute -bottom-10 -right-20 w-96 h-96 bg-accent-200/25 dark:bg-accent-900/15 rounded-full blur-3xl"
        style={{ animation: 'float-slow 10s ease-in-out infinite' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mint-200/20 dark:bg-mint-900/10 rounded-full blur-3xl"
        style={{ animation: 'pulse-soft 6s ease-in-out infinite' }}
      />

      <div
        className="absolute top-32 right-1/4 w-3 h-3 rounded-full bg-primary-300/60 dark:bg-primary-600/40"
        style={{ animation: 'float 5s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-40 left-1/4 w-2.5 h-2.5 rounded-full bg-accent-300/60 dark:bg-accent-600/40"
        style={{ animation: 'float-slow 7s ease-in-out infinite' }}
      />
      <div
        className="absolute top-1/3 left-20 w-2 h-2 rounded-full bg-mint-300/60 dark:bg-mint-600/40"
        style={{ animation: 'float 9s ease-in-out infinite' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/80 dark:bg-primary-950/40 border border-primary-200/60 dark:border-primary-800/40 text-primary-600 dark:text-primary-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
            Software Engineer at PayU
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-primary-500 via-accent-400 to-mint-400 bg-clip-text text-transparent">
            Mohit Palan
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Crafting scalable, user-centric web experiences
          <br className="hidden sm:block" />
          for high-traffic fintech products
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Briefcase size={18} />
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Mail size={18} />
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 hover:text-primary-400 transition-colors"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <ArrowDown size={18} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
