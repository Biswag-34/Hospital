import { useEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

interface LenisInstance {
  scrollTo: (target: string, options?: { offset?: number }) => void
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  const lenisRef = useRef<LenisInstance | null>(null)

  useEffect(() => {
    lenisRef.current = (window as unknown as Record<string, LenisInstance>).lenis ?? null
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    setOpen(false)

    const lenis = lenisRef.current
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -84 })
      return
    }

    const el = document.querySelector(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /**
   * VISIBILITY FIX:
   * Scrolled header must be MORE DISTINCT than page background.
   * Use --bg-section / --surface-muted (darker cream) + maroon-tinted top gradient + stronger shadow.
   */
  const headerBase = scrolled
    ? [
        'backdrop-blur-xl',
        // darker cream than bg-page so header is visible
        'bg-[var(--bg-section)]/95',
        // subtle maroon tint overlay (helps separation even on cream pages)
        'bg-[linear-gradient(to_bottom,rgba(122,63,76,0.10),rgba(122,63,76,0.00))]',
        // stronger border line
        'border-b border-[var(--surface-border)]',
        // stronger shadow (still soft)
        'shadow-[0_12px_34px_rgba(122,63,76,0.14)]',
      ].join(' ')
    : 'bg-transparent'

  // Brand & links
  const brandText = scrolled
    ? 'text-[var(--text-heading)]'
    : 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.40)]'

  const linkBase = scrolled
    ? 'text-[var(--text-heading)]'
    : 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.40)]'

  const linkHover = scrolled
    ? 'hover:text-[var(--primary)]'
    : 'hover:text-white/90'

  // CTA
  const ctaBase = [
    'inline-flex items-center justify-center rounded-full',
    'px-4 xl:px-5 py-2',
    'text-sm font-semibold',
    'transition',
    'active:scale-[0.98]',
  ].join(' ')

  // On hero: keep “glass” so it works on images
  const ctaHero = [
    'bg-white/12 text-white',
    'border border-white/25',
    'backdrop-blur-md',
    'hover:bg-white/18',
    'shadow-[0_10px_26px_rgba(0,0,0,0.22)]',
  ].join(' ')

  // Scrolled: clear brand button with good contrast
  const ctaScrolled = [
    'bg-[var(--primary)] text-[var(--bg-page)]',
    'hover:bg-[var(--primary-hover)]',
    'shadow-[0_10px_26px_rgba(122,63,76,0.18)]',
    'focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25',
  ].join(' ')

  return (
    <header
      className={[
        'fixed top-0 left-0 w-full z-50',
        'transition-all duration-300',
        headerBase,
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className={['font-extrabold tracking-tight text-xl sm:text-xl', brandText].join(' ')}
        >
          Antharaganga Hospital
          <span className={scrolled ? 'text-[var(--primary)]' : 'text-white/90'}>.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={['font-medium transition text-sm xl:text-[15px]', linkBase, linkHover].join(' ')}
            >
              {item.label}
            </a>
          ))}

          <a
            href="/join-the-cause"
            className={['ml-2', ctaBase, scrolled ? ctaScrolled : ctaHero].join(' ')}
          >
            Join The Cause
          </a>
        </nav>

        {/* Tablet Nav */}
        <nav className="hidden md:flex lg:hidden items-center gap-5">
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={['font-medium transition text-sm', linkBase, linkHover].join(' ')}
            >
              {item.label}
            </a>
          ))}

          <a
            href="/join-the-cause"
            className={[ctaBase, scrolled ? ctaScrolled : ctaHero].join(' ')}
          >
            Join
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={[
            'md:hidden rounded-xl px-3 py-2 transition',
            scrolled
              ? 'text-[var(--text-heading)] hover:bg-[var(--surface-muted)]'
              : 'text-white hover:bg-white/12',
          ].join(' ')}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[var(--bg-section)]/97 backdrop-blur-xl border-t border-[var(--surface-border)] shadow-[0_18px_50px_rgba(122,63,76,0.14)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="py-3 border-b border-[var(--surface-border)] text-[var(--text-heading)] font-medium hover:text-[var(--primary)] transition"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/join-the-cause"
                className="mt-4 inline-flex justify-center rounded-full px-5 py-3 font-semibold bg-[var(--primary)] text-[var(--bg-page)] hover:bg-[var(--primary-hover)] shadow-[0_10px_26px_rgba(122,63,76,0.18)] transition active:scale-[0.98]"
              >
                Join The Cause
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
