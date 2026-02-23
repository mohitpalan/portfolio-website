import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 dark:bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-accent-300 bg-clip-text text-transparent">
              MP
            </span>
            <p className="text-sm mt-1 text-slate-500">
              &copy; {new Date().getFullYear()} Mohit Palan. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:mohit.palan@gmail.com"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://github.com/mohitpalan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/in/mohitpalan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#"
        className="absolute right-6 -top-5 w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 hover:-translate-y-1 transition-all duration-300"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </a>
    </footer>
  )
}
