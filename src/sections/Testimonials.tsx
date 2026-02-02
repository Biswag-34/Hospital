import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Icons
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type Testimonial = {
  name: string
  text: string
  rating?: number
}

const testimonials: Testimonial[] = [
  { name: 'Ali R.', text: 'Amazing care and friendly staff!', rating: 5 },
  { name: 'Meera S.', text: 'Highly recommend this hospital. Doctors are very professional.', rating: 5 },
  { name: 'Deepak K.', text: 'Clean facility and smooth appointment process.', rating: 4 },
  { name: 'Sana M.', text: 'Very supportive staff and great consultation experience.', rating: 5 },
  { name: 'Rahul P.', text: 'Quick check-in, great communication, and friendly team.', rating: 4 },
  { name: 'Nisha D.', text: 'The service was seamless and the staff were extremely helpful.', rating: 5 },
]

function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const common = 'ts-ornament pointer-events-none absolute mix-blend-multiply'

  const pos =
    position === 'tl'
      ? 'top-0 left-0 -translate-x-8 -translate-y-8 sm:-translate-x-10 sm:-translate-y-10'
      : position === 'tr'
      ? 'top-0 right-0 translate-x-8 -translate-y-8 sm:translate-x-10 sm:-translate-y-10'
      : position === 'bl'
      ? 'bottom-0 left-0 -translate-x-8 translate-y-8 sm:-translate-x-10 sm:translate-y-10'
      : 'bottom-0 right-0 translate-x-8 translate-y-8 sm:translate-x-10 sm:translate-y-10'

  const rotate =
    position === 'tr' ? 'rotate-90' : position === 'br' ? 'rotate-180' : position === 'bl' ? '-rotate-90' : ''

  return (
    <div className={`${common} ${pos} ${rotate}`}>
      <svg
        className="h-[170px] w-[170px] sm:h-[210px] sm:w-[210px] lg:h-[240px] lg:w-[240px]"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className="ts-stroke" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="120" cy="120" r="90" stroke="var(--secondary)" strokeWidth="2.8" opacity="0.55" />
          <circle
            cx="120"
            cy="120"
            r="62"
            stroke="var(--primary)"
            strokeWidth="3.0"
            opacity="0.62"
            strokeDasharray="8 7"
          />

          <path d="M60 150C84 178 156 178 180 150" stroke="var(--primary)" strokeWidth="3.2" opacity="0.55" />
          <path d="M92 150C104 162 136 162 148 150" stroke="var(--secondary)" strokeWidth="2.6" opacity="0.55" />

          <path d="M30 86V30H86" stroke="var(--primary)" strokeWidth="3.4" opacity="0.7" />
          <path d="M154 30H210V86" stroke="var(--secondary)" strokeWidth="3.0" opacity="0.62" />

          {Array.from({ length: 6 }).map((_, i) => {
            const x = 60 + i * 18
            return (
              <path
                key={`v-${i}`}
                d={`M${x} 60V180`}
                stroke="var(--secondary)"
                strokeWidth="1.6"
                opacity="0.14"
              />
            )
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = 60 + i * 18
            return (
              <path
                key={`h-${i}`}
                d={`M60 ${y}H180`}
                stroke="var(--primary)"
                strokeWidth="1.6"
                opacity="0.12"
              />
            )
          })}

          <path d="M120 56V82" stroke="var(--primary)" strokeWidth="3.0" opacity="0.55" />
          <path d="M184 120H158" stroke="var(--secondary)" strokeWidth="3.0" opacity="0.52" />
        </g>
      </svg>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const header = sectionRef.current.querySelector('.ts-header')
    const ornamentStrokeEls = sectionRef.current.querySelectorAll<SVGGeometryElement>('.ts-ornament .ts-stroke > *')

    if (header) {
      gsap.fromTo(
        header,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    const shapes = Array.from(ornamentStrokeEls)

    shapes.forEach((el) => {
      const len = el.getTotalLength?.()
      if (!len || !Number.isFinite(len)) return
      el.style.strokeDasharray = `${len}`
      el.style.strokeDashoffset = `${len}`
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(shapes, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.out',
      stagger: 0.03,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-alt relative overflow-hidden bg-[var(--bg-section)] py-16 sm:py-20 lg:py-24"
    >
      {/* Corner ornaments */}
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      {/* Soft center washes (theme-driven) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80 bg-[var(--primary-soft)]" />
        <div className="absolute left-1/3 bottom-0 h-[520px] w-[520px] -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl opacity-70 bg-[var(--calm-soft)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="ts-header mb-8 text-center sm:mb-10">
          <p className="text-xs font-bold tracking-widest text-[var(--text-muted)]">
            TESTIMONIALS
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-heading)] sm:text-3xl lg:text-4xl">
            What Patients Say
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-[var(--primary-soft)]" />

          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
            Real experiences from people who trusted our care.
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          centeredSlides
          speed={900}
          autoplay={{
            delay: 3200,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'ts-bullet',
            bulletActiveClass: 'ts-bullet-active',
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 18 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 22 },
          }}
          className="testimonial-swiper overflow-visible"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="h-full overflow-visible pt-6 pb-8">
                <div className="ts-card relative card overflow-visible px-6 py-6">
                  {/* Quote badge */}
                  <div
                    className="absolute -top-4 -left-4 grid h-9 w-9 place-items-center rounded-2xl shadow-[var(--shadow-soft)] text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <span className="text-xl leading-none">“</span>
                  </div>

                  {/* Text (2-line clamp) */}
                  <p
                    className="text-[13.5px] leading-relaxed text-[var(--text-body)] sm:text-[14.5px]"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {t.text}
                  </p>

                  {/* Rating */}
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const active = idx < (t.rating ?? 5)
                      return (
                        <Star
                          key={idx}
                          size={14}
                          className={active ? 'fill-current' : ''}
                          style={{
                            color: active ? 'var(--primary)' : 'rgba(74, 55, 60, 0.22)',
                          }}
                        />
                      )
                    })}
                  </div>

                  {/* Name bottom-right */}
                  <div className="mt-5 flex justify-end">
                    <p className="text-[13px] font-semibold text-[var(--text-heading)]">
                      — {t.name}
                    </p>
                  </div>

                  {/* Accent line (theme-driven) */}
                  <div
                    className="mt-4 h-[2px] w-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, var(--primary-soft), transparent)',
                    }}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Scale / blur inactive slides + pagination styling */}
      <style>{`
        /* Ornaments visibility */
        .ts-ornament { opacity: 0.26; }
        @media (min-width: 640px) { .ts-ornament { opacity: 0.22; } }
        @media (min-width: 1024px) { .ts-ornament { opacity: 0.20; } }

        /* Cursor */
        .testimonial-swiper { cursor: grab; }
        .testimonial-swiper:active { cursor: grabbing; }

        /* Prevent clipping */
        .testimonial-swiper,
        .testimonial-swiper .swiper,
        .testimonial-swiper .swiper-wrapper,
        .testimonial-swiper .swiper-slide {
          overflow: visible !important;
        }
        .testimonial-swiper .swiper-slide { height: auto !important; }

        /* Scale + blur non-active slides (softer) */
        .testimonial-swiper .swiper-slide {
          transition: transform 800ms ease, filter 800ms ease, opacity 800ms ease;
          opacity: 0.58;
          filter: blur(1.6px);
          transform: scale(0.95);
        }
        .testimonial-swiper .swiper-slide-active {
          opacity: 1;
          filter: blur(0);
          transform: scale(1);
        }

        /* Pagination dots */
        .testimonial-swiper .swiper-pagination {
          position: relative;
          margin-top: 14px;
        }
        .ts-bullet {
          width: 8px;
          height: 8px;
          opacity: 1;
          border-radius: 9999px;
          margin: 0 5px !important;
          transition: all 300ms ease;
          background: rgba(74, 55, 60, 0.20);
        }
        .ts-bullet-active {
          width: 22px;
          background: var(--primary);
          opacity: 0.85;
        }
      `}</style>
    </section>
  )
}
