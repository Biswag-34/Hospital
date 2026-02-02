import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from "react-router-dom"


gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!contentRef.current) return

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 56 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[100svh] bg-cover bg-center"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      {/* Brand-tinted overlay (maroon + calm), avoids harsh navy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(28,15,18,0.55) 0%, rgba(28,15,18,0.70) 55%, rgba(28,15,18,0.86) 100%)',
        }}
      />

      {/* Soft calm glow (very subtle) */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 bg-[var(--calm-soft)]" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full blur-3xl opacity-35 bg-[var(--primary-soft)]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] items-center">
        <div
          ref={contentRef}
          className={[
            'mx-auto w-full max-w-7xl',
            'px-4 sm:px-6 lg:px-8',
            'py-28 sm:py-32 lg:py-36',
            'text-white',
          ].join(' ')}
        >
          <div className="max-w-xl lg:max-w-2xl">
            {/* Optional soft panel for readability (kept subtle) */}
            <div className="rounded-3xl bg-black/10 p-5 sm:bg-transparent sm:p-0 backdrop-blur-[2px] sm:backdrop-blur-0">
              <h1 className="font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight">
                Healing Closer to
                <span className="block sm:inline text-[var(--calm)]"> Home</span>
              </h1>

              <p
                className={[
                  'mt-4 sm:mt-5',
                  'text-base sm:text-lg xl:text-xl',
                  'text-white/85',
                  'leading-relaxed',
                ].join(' ')}
              >
                A charitable Healthcare Institution dedicated to{' '}
                <span className="font-semibold text-[var(--calm)]">Rural</span> and{' '}
                <span className="font-semibold text-[var(--calm)]">Disabled</span> communities.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                   href="/join-the-cause"
  onClick={(e) => {
    e.preventDefault()
    navigate("/join-the-cause")
  }}
                  className={[
                    'inline-flex items-center justify-center',
                    'rounded-full',
                    'bg-[var(--primary)] hover:bg-[var(--primary-hover)]',
                    'px-6 sm:px-7 py-3',
                    'text-sm sm:text-base font-semibold text-white',
                    'shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)]',
                    'transition active:scale-[0.98]',
                    'focus-visible:outline-none focus-visible:shadow-[var(--ring)]',
                  ].join(' ')}
                >
                  Join the Cause
                </a>

                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    window.lenis?.scrollTo('#services', { offset: -84 })
                  }}
                  className={[
                    'inline-flex items-center justify-center',
                    'rounded-full',
                    'px-6 sm:px-7 py-3',
                    'text-sm sm:text-base font-semibold',
                    'text-white/90 hover:text-white',
                    'bg-transparent hover:bg-[var(--primary-soft)]',
                    'border border-white/30 hover:border-white/50',
                    'transition',
                    'focus-visible:outline-none focus-visible:shadow-[var(--ring)]',
                  ].join(' ')}
                >
                  View Our Works
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
