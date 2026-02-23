import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Server, Smartphone, TestTube2, Container, Cloud } from 'lucide-react'

const categories = [
  {
    icon: Code2,
    title: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'React', 'Redux Toolkit', 'Redux Saga', 'Tailwind CSS', 'Next.js'],
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Prisma', 'REST APIs', 'WebSocket'],
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    skills: ['React Native', 'React Navigation', 'Firebase', 'Push Notifications', 'OTA Updates'],
  },
  {
    icon: TestTube2,
    title: 'Testing',
    skills: ['Jest', 'Cypress', 'React Testing Library', 'E2E Testing', 'Unit Testing'],
  },
  {
    icon: Container,
    title: 'DevOps',
    skills: ['Docker', 'Nginx', 'GitHub Actions', 'CI/CD', 'Linux', 'Shell Scripting'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Tools',
    skills: ['Google Cloud', 'Cloudflare', 'Git', 'Swagger', 'Postman', 'Figma'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="py-24 bg-surface/40 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-300 to-primary-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-primary-100/50 dark:border-slate-700/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/30 flex items-center justify-center">
                    <Icon size={20} className="text-primary-500 dark:text-primary-400" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary-50/80 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-primary-100/40 dark:border-slate-600/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
