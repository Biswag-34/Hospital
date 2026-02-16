import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/flipbutton.css'

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

  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    lenisRef.current = (window as unknown as { lenis?: LenisInstance }).lenis ?? null
  }, [])

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 14)

      if (y > 120) setHidden(y > lastY && y - lastY > 6)
      else setHidden(false)

      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const smoothScrollTo = (target: string) => {
    const lenis = lenisRef.current
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -88 })
      return
    }
    const el = document.querySelector(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    closeMenu()

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

  // Scroll AFTER route change (external scroll only)
  useEffect(() => {
    const state = location.state as { scrollTo?: string }
    if (state?.scrollTo) {
      setTimeout(() => smoothScrollTo(state.scrollTo!), 80)
    }
  }, [location])

  const headerMode = useMemo(() => {
    if (isHome && !scrolled) return 'hero'
    return 'solid'
  }, [isHome, scrolled])

  const linkBase =
    'relative text-[13px] sm:text-sm md:text-[15px] font-semibold tracking-[0.01em] transition focus:outline-none focus-visible:shadow-[var(--ring)]'

  const linkHero = 'text-white/90 hover:text-white'
  const linkSolid = 'text-[var(--text-body)] hover:text-[var(--primary)]'

  // ✅ Route handler for Join The Cause (React Router safe)
  const goJoinCause = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    closeMenu()
    navigate('/join-the-cause')
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 will-change-transform',
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div
        className={[
          'relative',
          headerMode === 'solid'
            ? 'backdrop-blur-xl bg-[var(--surface-muted)]/92 border-b border-[var(--surface-border)] shadow-[var(--shadow-soft)]'
            : 'bg-transparent',
        ].join(' ')}
      >
        {headerMode === 'solid' && (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(106,46,58,0.10),rgba(106,46,58,0.00))]" />
        )}

        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-10 py-3 sm:py-3.5">
          {/* Brand */}
          <a
            href="/"
            onClick={(e) => handleNav(e, '#home')}
            className={[
              'group max-w-[70%] sm:max-w-none',
              'text-[14px] sm:text-[15px] md:text-base lg:text-[17px] font-extrabold tracking-tight leading-tight',
              headerMode === 'hero' ? 'text-white' : 'text-[var(--text-heading)]',
              'focus:outline-none focus-visible:shadow-[var(--ring)] rounded-md',
            ].join(' ')}
            aria-label="Go to home"
          >
            <span className="block truncate">
              Antharaganga Rural Hospital &amp; Research Center
            </span>
            <span
              className={[
                'block h-[2px] w-0 group-hover:w-full transition-all duration-300',
                headerMode === 'hero' ? 'bg-white/55' : 'bg-[var(--primary)]/45',
              ].join(' ')}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                className={[linkBase, headerMode === 'hero' ? linkHero : linkSolid].join(' ')}
              >
                <span>{item.label}</span>
              </a>
            ))}

            {/* ✅ Flip Button CTA */}
            <a
              href="/join-the-cause"
              onClick={goJoinCause}
              className={[
                'btn-flip md',
                'inline-flex items-center justify-center',
                // make sure it looks good even if CSS fails to load:
                'min-w-[160px] lg:min-w-[175px]',
              ].join(' ')}
              data-front="Join The Cause"
              data-back="Donate"
              aria-label="Join The Cause"
            />
          </nav>

          {/* Mobile toggle */}
          <button
            className={[
              'md:hidden rounded-xl px-3 py-2 transition',
              headerMode === 'hero' ? 'text-white' : 'text-[var(--text-heading)]',
              headerMode === 'solid'
                ? 'bg-[var(--surface)]/70 border border-[var(--surface-border)]'
                : 'bg-white/10 border border-white/15',
              'focus:outline-none focus-visible:shadow-[var(--ring)]',
            ].join(' ')}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--surface-border)] bg-[var(--surface-muted)]/98 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className={[
                    'rounded-xl px-4 py-3',
                    'text-[15px] font-semibold',
                    'text-[var(--text-heading)] hover:bg-[var(--surface)] transition',
                    'focus:outline-none focus-visible:shadow-[var(--ring)]',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 grid gap-3">
              {/* ✅ Mobile flip CTA */}
              <a
                href="/join-the-cause"
                onClick={goJoinCause}
                className={[
                  'btn-flip lg',
                  'w-full inline-flex items-center justify-center',
                ].join(' ')}
                data-front="Join The Cause"
                data-back="Donate"
                aria-label="Join The Cause"
              />

              <button
                type="button"
                onClick={closeMenu}
                className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-heading)] hover:bg-[var(--surface-muted)] transition focus:outline-none focus-visible:shadow-[var(--ring)]"
              >
                Close menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
