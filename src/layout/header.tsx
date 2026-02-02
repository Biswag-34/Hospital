import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

interface LenisInstance {
  scrollTo: (target: number | string | HTMLElement, options?: { offset?: number }) => void
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  const lenisRef = useRef<LenisInstance | null>(null)

  // ✅ React Router
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    lenisRef.current = (window as unknown as { lenis?: LenisInstance }).lenis ?? null
  }, [])

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 18)

      if (y > 120) setHidden(y > lastY && y - lastY > 6)
      else setHidden(false)

      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ✅ smooth scroll helper
  const smoothScrollTo = (target: string) => {
    const lenis = lenisRef.current
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -84 })
      return
    }

    const el = document.querySelector(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ✅ MAIN NAV LOGIC
  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault()
    setOpen(false)

    // HOME
    if (target === '#home') {
      if (isHome) {
        const lenis = lenisRef.current
        if (lenis?.scrollTo) lenis.scrollTo(0)
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
      }
      return
    }

    // OTHER SECTIONS
    if (isHome) {
      smoothScrollTo(target)
    } else {
      navigate('/', { state: { scrollTo: target } })
    }
  }

  // ✅ Handle scroll AFTER route change
  useEffect(() => {
    const state = location.state as { scrollTo?: string }
    if (state?.scrollTo) {
      setTimeout(() => {
        smoothScrollTo(state.scrollTo!)
      }, 80)
    }
  }, [location])

  return (
    <header
      className={[
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-xl bg-[var(--surface-muted)]/96 border-b border-[var(--surface-border)] shadow-[var(--shadow-soft)]'
          : 'bg-transparent',
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Brand = Home */}
        <a
          href="/"
          onClick={(e) => handleNav(e, '#home')}
          className={[
            'font-extrabold tracking-tight text-xl',
            scrolled ? 'text-[var(--text-heading)]' : 'text-white',
          ].join(' ')}
        >
          Antharaganga Hospital
          <span className={scrolled ? 'text-[var(--primary)]' : 'text-white/90'}>.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className={[
                'text-sm font-medium transition',
                scrolled ? 'text-[var(--text-body)] hover:text-[var(--primary)]' : 'text-white',
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}

          {/* Join The Cause (NORMAL NAV) */}
          <a
            href="/join-the-cause"
            onClick={() => setOpen(false)}
            className={[
              'ml-2 rounded-full px-5 py-2 text-sm font-semibold transition',
              scrolled
                ? 'bg-[var(--primary)] text-[var(--bg-page)] hover:bg-[var(--primary-hover)]'
                : 'bg-white/15 text-white border border-white/25',
            ].join(' ')}
          >
            Join The Cause
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={[
            'lg:hidden rounded-xl px-3 py-2 transition',
            scrolled ? 'text-[var(--text-heading)]' : 'text-white',
          ].join(' ')}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[var(--surface-muted)]/98 backdrop-blur-xl border-t border-[var(--surface-border)]">
          <div className="px-4 py-4 flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                className="py-3 text-[var(--text-heading)] font-medium"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/join-the-cause"
              className="mt-4 rounded-full px-5 py-3 font-semibold bg-[var(--primary)] text-[var(--bg-page)] text-center"
            >
              Join The Cause
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
