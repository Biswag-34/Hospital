import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

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
      {/* Gradient overlay (prevents bright/empty look) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,18,32,0.65) 0%, rgba(11,18,32,0.75) 55%, rgba(11,18,32,0.85) 100%)',
        }}
      />

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
          <h1 className="font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight">
  Healing Closer to
  <span className="block sm:inline text-teal-300"> Home</span>
</h1>

            <p
              className={[
                'mt-4 sm:mt-5',
                'text-base sm:text-lg xl:text-xl',
                'text-slate-200',
                'leading-relaxed',
              ].join(' ')}
            >
              A charitable Healthcare Institution dedicated to <span className="text-teal-300">Rural</span> and <span className="text-teal-300">Disabled</span> communities.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  window.lenis?.scrollTo('#contact', { offset: -84 })
                }}
                className={[
                  'inline-flex items-center justify-center',
                  'rounded-full',
                  'bg-[var(--primary)] hover:bg-[var(--primary-hover)]',
                  'px-6 sm:px-7 py-3',
                  'text-sm sm:text-base font-semibold text-white',
                  'shadow-md hover:shadow-lg',
                  'transition active:scale-[0.98]',
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
                  'bg-transparent hover:bg-[#9c5a3c]/40',
                  'border border-white/30 hover:border-white/50',
                  'transition',
                ].join(' ')}
              >
                View Our Works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
