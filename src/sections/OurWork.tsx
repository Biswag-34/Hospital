import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import WorkCard, { type WorkItem } from './WorkCard'

gsap.registerPlugin(ScrollTrigger)

export default function OurWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  // ✅ single nav pair refs (left/right of card)
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  const workItems: WorkItem[] = useMemo(
    () => [
      {
        title: 'Charitable Clinics & Rural Health Camps',
        subtitle: 'Regular outreach for underserved communities',
        desc:
          'We conduct recurring camps and clinics to bring essential healthcare closer to rural and underdeveloped areas.',
        bullets: [
          'Periodic health camps in rural belts',
          'Basic diagnostics + consultation support',
          'Focus on access, awareness, and early care',
        ],
        image: '/assets/work/work1.jpg',
        tag: 'Community Care',
      },
      {
        title: 'PraChi – Prathama Chikitse',
        subtitle: 'First-aid training for emergencies',
        desc:
          'A unique program designed to train people to provide first aid during emergencies and strengthen community preparedness.',
        bullets: [
          'First-aid training for local stakeholders',
          'Practical guidance for real scenarios',
          'Scalable model across villages',
        ],
        image: '/assets/work/work2.jpg',
        tag: 'Training',
      },
      {
        title: 'Meenakshi Eye Camp & Cataract Care',
        subtitle: 'Free screening and cataract surgery support',
        desc:
          'A long-running initiative that supports eye screening and cataract interventions for those who otherwise cannot afford care.',
        bullets: [
          'Eye screening camps + cataract pathway',
          'Designed for high-impact rural outcomes',
          'Community-first approach and follow-up',
        ],
        image: '/assets/work/work3.jpg',
        tag: 'Vision Care',
      },
    ],
    []
  )

  const canLoop = workItems.length > 1

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.ow-header')
      if (!header) return

      gsap.fromTo(
        header,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-alt relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full blur-3xl opacity-50"
          style={{ background: 'rgba(156,90,60,0.10)' }}
        />
        <div
          className="absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full blur-3xl opacity-45"
          style={{ background: 'rgba(107,124,89,0.10)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="ow-header mb-10 sm:mb-12 text-center">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-heading)' }}
          >
            Our Work
          </h2>
          <p
            className="mt-3 text-sm sm:text-[15px] leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-body)' }}
          >
            Programs and progress that strengthen rural healthcare, disability care, prevention, and rehabilitation.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* ✅ ONE navigation pair (desktop+mobile same buttons) */}
          <button
            ref={prevRef}
            type="button"
            className="
              absolute left-0 top-1/2 -translate-y-1/2
              -translate-x-1/2
              h-11 w-11 lg:h-12 lg:w-12
              inline-flex items-center justify-center
              rounded-full border shadow-sm
              transition active:scale-95
              z-10
            "
            aria-label="Previous"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--surface-border)',
            }}
          >
            <ChevronLeft className="h-5 w-5" style={{ color: 'var(--text-heading)' }} />
          </button>

          <button
            ref={nextRef}
            type="button"
            className="
              absolute right-0 top-1/2 -translate-y-1/2
              translate-x-1/2
              h-11 w-11 lg:h-12 lg:w-12
              inline-flex items-center justify-center
              rounded-full border shadow-sm
              transition active:scale-95
              z-10
            "
            aria-label="Next"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--surface-border)',
            }}
          >
            <ChevronRight className="h-5 w-5" style={{ color: 'var(--text-heading)' }} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            onSwiper={(s) => (swiperRef.current = s)}
            // ✅ Safe navigation binding with refs
            onBeforeInit={(swiper) => {
              // Swiper expects navigation elements on params
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const nav = (swiper.params.navigation as any) || {}
              nav.prevEl = prevRef.current
              nav.nextEl = nextRef.current
              swiper.params.navigation = nav
            }}
            navigation
            loop={canLoop}
            centeredSlides
            slidesPerView={1}
            spaceBetween={18}
            speed={900}
            grabCursor
            autoplay={
              canLoop
                ? {
                    delay: 4200,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }
                : false
            }
            pagination={{
              clickable: true,
              bulletClass: 'ow-bullet',
              bulletActiveClass: 'ow-bullet-active',
            }}
            className="ourwork-swiper overflow-visible"
          >
            {workItems.map((item, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="h-full overflow-visible pt-4 pb-8 sm:pb-10">
                  <div className="mx-auto max-w-[520px] sm:max-w-[560px] lg:max-w-[600px]">
                    <WorkCard {...item} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .ourwork-swiper,
        .ourwork-swiper .swiper,
        .ourwork-swiper .swiper-wrapper,
        .ourwork-swiper .swiper-slide {
          overflow: visible !important;
        }
        .ourwork-swiper .swiper-slide { height: auto !important; }

        .ourwork-swiper { padding-left: 18px; padding-right: 18px; }
        @media (min-width: 640px) {
          .ourwork-swiper { padding-left: 36px; padding-right: 36px; }
        }
        @media (min-width: 1024px) {
          .ourwork-swiper { padding-left: 70px; padding-right: 70px; }
        }

        .ourwork-swiper .swiper-slide {
          transition: transform 900ms ease, filter 900ms ease, opacity 900ms ease;
          opacity: 0.35;
          filter: blur(3px);
          transform: scale(0.92);
        }
        .ourwork-swiper .swiper-slide.swiper-slide-active {
          opacity: 1;
          filter: blur(0);
          transform: scale(1);
        }

        .ourwork-swiper .swiper-pagination {
          position: relative;
          margin-top: 10px;
        }
        .ow-bullet {
          width: 8px;
          height: 8px;
          opacity: 1;
          border-radius: 9999px;
          margin: 0 5px !important;
          transition: all 300ms ease;
          background: rgba(47, 62, 52, 0.18);
        }
        .ow-bullet-active {
          width: 22px;
          background: rgba(156, 90, 60, 0.70);
        }
      `}</style>
    </section>
  )
}
