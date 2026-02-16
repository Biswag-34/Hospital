import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import '../styles/flipbutton.css' // ✅ add this

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
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* HERO IMAGE */}
      <picture className="absolute inset-0 z-0 block h-full w-full">
        <source media="(max-width: 640px)" srcSet="/bg2-mobile.png" />
        <source media="(max-width: 1024px)" srcSet="/bg2-tablet.png" />
        <img
          src="/bg2-desktop.png"
          alt="Antharaganga Hospital by RRHCF"
          className="h-full w-full object-cover-fit object-center"
          loading="eager"
          fetchPriority="high"
          draggable={false}
        />
      </picture>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(28,15,18,0.55) 0%, rgba(28,15,18,0.70) 55%, rgba(28,15,18,0.86) 100%)',
        }}
      />

      {/* Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 z-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 bg-[var(--calm-soft)]" />
      <div className="pointer-events-none absolute -bottom-48 -right-48 z-20 h-[560px] w-[560px] rounded-full blur-3xl opacity-35 bg-[var(--primary-soft)]" />

      {/* Content */}
      <div className="relative z-30 flex min-h-[100svh] items-center">
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
            <div className="rounded-3xl bg-black/10 p-5 sm:bg-transparent sm:p-0 backdrop-blur-[2px] sm:backdrop-blur-0">
              <h1 className="font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight">
                Healing Closer to
                <span className="block sm:inline text-[var(--calm)]"> Home</span>
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg xl:text-xl text-white/85 leading-relaxed">
                A charitable Healthcare Institution dedicated to{' '}
                <span className="font-semibold text-[var(--calm)]">Rural</span> and{' '}
                <span className="font-semibold text-[var(--calm)]">Disabled</span>{' '}
                communities.
              </p>

              {/* ✅ CTAs (same style as Header flip button) */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {/* Donate (go to join-the-cause page) */}
                <a
                  href="/join-the-cause"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/join-the-cause')
                  }}
                  className={[
                    'btn-flip md',
                    'inline-flex items-center justify-center',
                    'min-w-[150px] sm:min-w-[170px]',
                  ].join(' ')}
                  data-front="Join The Cause"
                  data-back="Donate"
                  aria-label="Donate"
                />

                {/* Our Projects (scroll to projects/services section) */}
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault()
                    window.lenis?.scrollTo('#services', { offset: -84 })
                  }}
                  className={[
                      'btn-flip md btn-flip--alt',
                      'inline-flex items-center justify-center',
                      'min-w-[150px] sm:min-w-[170px]',
                    ].join(' ')}
                  data-front="Our Works"
                  data-back="Explore"
                  aria-label="Our Projects"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
