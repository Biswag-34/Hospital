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

  // Reuse Lenis if you created it globally; fallback to native
  const lenisRef = useRef<LenisInstance | null>(null)

  useEffect(() => {
    // If you stored lenis globally, reuse it (recommended)
    // Example in your global setup: (window as any).lenis = lenisInstance
    lenisRef.current = (window as unknown as Record<string, LenisInstance>).lenis ?? null
  }, [])

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 18)

      // Hide on scroll down, show on scroll up (after threshold)
      if (y > 120) {
        setHidden(y > lastY && y - lastY > 6)
      } else {
        setHidden(false)
      }

      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()

    // Close mobile menu
    setOpen(false)

    // Lenis smooth scroll if available, else fallback
    const lenis = lenisRef.current
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -84 })
      return
    }

    const el = document.querySelector(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Theme-driven UI behavior:
  // - top: transparent (over hero)
  // - scrolled: surface background (not pure white), subtle border and shadow
  const headerBase = scrolled
    ? 'bg-[var(--surface)]/92 backdrop-blur border-b border-[var(--surface-border)] shadow-sm'
    : 'bg-transparent'

  // Link colors adapt based on background
  const linkBase = scrolled ? 'text-[var(--text-body)]' : 'text-white'
  const linkHover = scrolled ? 'hover:text-[var(--primary)]' : 'hover:text-teal-200'

  return (
    <header
      className={[
        'fixed top-0 left-0 w-full z-50',
        'transition-all duration-300',
        headerBase,
        hidden ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div
        className={[
          'max-w-7xl mx-auto',
          'flex items-center justify-between',
          // Responsive padding/height rhythm
          'px-4 sm:px-6 lg:px-8',
          'py-3 sm:py-4',
        ].join(' ')}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className={[
            'font-extrabold tracking-tight',
            // Responsive font sizing
            'text-xl sm:text-xl',
            scrolled ? 'text-[var(--text-heading)]' : 'text-white',
          ].join(' ')}
        >
          Antharaganga Hospital 
          <span className={scrolled ? 'text-[var(--primary)]' : 'text-teal-200'}>.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={[
                'font-medium transition',
                'text-sm xl:text-[15px]',
                linkBase,
                linkHover,
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}

          {/* CTA */}
          <a
  href="/join-the-cause"
  className={[
    'ml-2 inline-flex items-center justify-center rounded-full',
    'px-4 xl:px-5 py-2',
    'text-sm font-semibold text-white',
    'bg-[var(--primary)] hover:bg-[var(--primary-hover)]',
    'shadow-sm hover:shadow-md transition',
    'active:scale-[0.98]',
  ].join(' ')}
>
  Join The Cause
</a>

        </nav>

        {/* Tablet Nav (md) - show fewer items */}
        <nav className="hidden md:flex lg:hidden items-center gap-5">
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={[
                'font-medium transition',
                'text-sm',
                linkBase,
                linkHover,
              ].join(' ')}
            >
              {item.label}
            </a>
          ))}
          <a
  href="/join-the-cause"
  className={[
    'inline-flex items-center justify-center rounded-full',
    'px-4 py-2',
    'text-sm font-semibold text-white',
    'bg-[var(--primary)] hover:bg-[var(--primary-hover)]',
    'shadow-sm transition active:scale-[0.98]',
  ].join(' ')}
>
  Join
</a>

        </nav>

        {/* Mobile Toggle */}
        <button
          className={[
            'md:hidden rounded-xl',
            'px-3 py-2',
            'transition',
            scrolled
              ? 'text-[var(--text-heading)] hover:bg-slate-100'
              : 'text-white hover:bg-white/10',
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
        <div
          className={[
            'md:hidden',
            'bg-[var(--surface)]/96 backdrop-blur',
            'border-t border-[var(--surface-border)]',
          ].join(' ')}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={[
                    'py-3',
                    'border-b border-[var(--surface-border)]',
                    'text-[var(--text-body)] font-medium',
                    'hover:text-[var(--primary)] transition',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              ))}

              <a
  href="/join-the-cause"
  className={[
    'mt-4 inline-flex justify-center rounded-full',
    'px-5 py-3',
    'text-white font-semibold',
    'bg-[var(--primary)] hover:bg-[var(--primary-hover)]',
    'shadow-sm hover:shadow-md transition',
    'active:scale-[0.98]',
  ].join(' ')}
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
