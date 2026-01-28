import { useMemo, useRef } from 'react'
import DoctorCard, { type Doctor } from './DoctorCard'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

import { ChevronLeft, ChevronRight } from 'lucide-react'

const doctors: Doctor[] = [
  { name: 'Nagaraj C V', spec: 'President RRHCF', img: '/assets/doctors/doc1.jpg' },
  { name: 'Mahendar U S', spec: 'Vice President RRHCF', img: '/assets/doctors/doc2.jpg' },
  { name: 'Dr Pradeep Kumar N', spec: 'EC Member RRHCF', img: '/assets/doctors/doc3.jpg' },
  { name: 'Dr Srikanth', spec: 'Treasurer RRHCF', img: '/assets/doctors/doc4.jpg' },
  { name: 'C V Prakash', spec: 'RRHCF', img: '/assets/doctors/doc5.jpg' },
]

export default function Doctors() {
  const swiperRef = useRef<SwiperType | null>(null)

  // Each slide = 3 cards (desktop), 2 cards (tablet), 1 card (mobile)
  const slides = useMemo(() => {
    const chunked: Doctor[][] = []
    for (let i = 0; i < doctors.length; i += 3) chunked.push(doctors.slice(i, i + 3))
    return chunked
  }, [])

  const canLoop = slides.length > 1

  return (
    <section id="doctors" className="section py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-heading)]">
              Our Leadership
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-muted)]">
             Raghavendra Shri Sai Rural Healthcare Foundation, A non-profit organization with over a decade of experience in rural healthcare, committed to ethical care, accessibility, and long-term community health outcomes.
            </p>
          </div>

          {/* Navigation buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="
                doc-prev group inline-flex h-11 w-11 items-center justify-center rounded-full
                border border-[var(--surface-border)]
                bg-[var(--surface)]
                shadow-sm transition
                hover:shadow-md active:scale-95
              "
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-[var(--text-body)] transition group-hover:-translate-x-0.5" />
            </button>
            <button
              className="
                doc-next group inline-flex h-11 w-11 items-center justify-center rounded-full
                border border-[var(--surface-border)]
                bg-[var(--surface)]
                shadow-sm transition
                hover:shadow-md active:scale-95
              "
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-[var(--text-body)] transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            navigation={{
              prevEl: '.doc-prev',
              nextEl: '.doc-next',
            }}
            centeredSlides
            loop={canLoop}
            speed={900}
            spaceBetween={24}
            slidesPerView={1}
            grabCursor
            autoplay={
              canLoop
                ? {
                    delay: 3200,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            className="doctor-swiper"
          >
            {slides.map((group, idx) => (
              <SwiperSlide key={idx}>
                {/* One frame: responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {group.map((d) => (
                    <DoctorCard key={d.name} {...d} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile nav buttons */}
          <div className="md:hidden mt-7 sm:mt-8 flex justify-center gap-4">
            <button
              className="
                doc-prev group inline-flex h-12 w-12 items-center justify-center rounded-full
                border border-[var(--surface-border)]
                bg-[var(--surface)]
                shadow-sm active:scale-95 transition
              "
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-[var(--text-body)] transition group-hover:-translate-x-0.5" />
            </button>
            <button
              className="
                doc-next group inline-flex h-12 w-12 items-center justify-center rounded-full
                border border-[var(--surface-border)]
                bg-[var(--surface)]
                shadow-sm active:scale-95 transition
              "
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-[var(--text-body)] transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Peek + blur + scale + cursor styling */}
      <style>{`
        .doctor-swiper { cursor: grab; }
        .doctor-swiper:active { cursor: grabbing; }

        .doctor-swiper .swiper-wrapper { align-items: stretch; }

        /* Side-slide preview effect */
        .doctor-swiper .swiper-slide {
          transition: transform 900ms ease, filter 900ms ease, opacity 900ms ease;
          opacity: 0.35;
          filter: blur(3px);
          transform: scale(0.92);
        }
        .doctor-swiper .swiper-slide.swiper-slide-active {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1);
        }

        /* Space for peeking */
        .doctor-swiper { padding-left: 18px; padding-right: 18px; }
        @media (min-width: 640px) {
          .doctor-swiper { padding-left: 34px; padding-right: 34px; }
        }
        @media (min-width: 768px) {
          .doctor-swiper { padding-left: 58px; padding-right: 58px; }
        }
        @media (min-width: 1024px) {
          .doctor-swiper { padding-left: 74px; padding-right: 74px; }
        }
      `}</style>
    </section>
  )
}
