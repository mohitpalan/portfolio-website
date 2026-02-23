import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mohit.palan@gmail.com',
    href: 'mailto:mohit.palan@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'mohitpalan',
    href: 'https://github.com/mohitpalan',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Mohit Palan',
    href: 'https://linkedin.com/in/mohitpalan',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="py-24 bg-surface/40 dark:bg-slate-900/30">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-accent-300 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
            I'm always open to discussing new opportunities, interesting projects, or just having a conversation about
            tech. Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-primary-100/50 dark:border-slate-700/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <Icon className="w-6 h-6 mx-auto mb-3 text-primary-400 group-hover:text-primary-500 transition-colors" />
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  {link.label}
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1">
                  {link.value}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            )
          })}
        </div>

        <motion.a
          href="mailto:mohit.palan@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <Mail size={18} />
          Say Hello
        </motion.a>
      </div>
    </section>
  )
}
