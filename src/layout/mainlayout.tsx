import type { ReactNode } from 'react'
import useLenis from '../hooks/useLenis'
import Header from './header'
import Footer from './footer'

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  // ✅ Global smooth scrolling + GSAP sync
  useLenis()

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)]">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className={[
          'sr-only focus:not-sr-only fixed top-2 left-2 z-[999]',
          'bg-[var(--surface)] text-[var(--text-heading)]',
          'px-3 py-2 rounded-xl shadow',
          'border border-[var(--surface-border)]',
        ].join(' ')}
      >
        Skip to content
      </a>

      <Header />

      {/* Main content wrapper */}
      <main id="main-content" className="relative overflow-hidden">
        {children}
      </main>

      <Footer />
    </div>
  )
}
