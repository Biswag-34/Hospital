import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'framer-motion'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import { Link } from 'react-router-dom'
import { HeartPulse, Sparkles, Award, Star, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type Story = {
  id: number
  name: string
  title: string
  story: string
  condition: string
  image: string
  icon: React.ReactNode
}

const stories: Story[] = [
  {
    id: 1,
    name: 'Murali',
    title: 'From Patient to Caregiver: A Journey of Resilience',
    story:
      'Murali grew up in our institution and at 21 was diagnosed with Adolescent Idiopathic Scoliosis. After surgery and dedicated treatment, he not only recovered but now works at our Special School, giving back to the community that shaped him.',
    condition: 'Adolescent Idiopathic Scoliosis',
    image: '/beneficiaries/murali-1.jpeg',
    icon: <Award className="h-5 w-5" />,
  },
  {
    id: 2,
    name: 'Sharath Kumar',
    title: 'The Melody of Recovery: Singing Through Pain',
    story:
      'Diagnosed with vesical fistula and urethral stricture, Sharath endured immense pain. With our medical care and support, he underwent successful surgery and discovered his powerful singing voice during recovery.',
    condition: 'Vesical Fistula with Urethral Stricture',
    image: '/beneficiaries/sharath-1.jpeg',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: 3,
    name: 'Keerthana',
    title: 'A New Vision: From Darkness to Light',
    story:
      'Abandoned at a young age and admitted to our care at 6, Keerthana was diagnosed with blindness and hormonal imbalance. Through consistent medical treatment and love, she regained her vision and found new hope.',
    condition: 'Blindness with Hormonal Imbalance',
    image: '/beneficiaries/keerthana-1.jpeg',
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: 4,
    name: 'Seethamma',
    title: 'Rediscovering Life: Memory Restored',
    story:
      "Suffering from continuous epilepsy that required skull surgery, Mrs. Seethamma lost her memory and couldn't recognize her family. After major surgery and dedicated care, she regained her memory and reunited with her loved ones.",
    condition: 'Continuous Epilepsy with Skull Surgery',
    image: '/beneficiaries/seethamma-1.jpeg',
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    id: 5,
    name: 'Dhanush',
    title: 'A Journey from Tragedy to Hope',
    story:
      "Dhanush was a high school student who met with an unfortunate train accident during travel, resulting in severe foot injuries and fractures. He was first taken to a local hospital in Kolar and later referred to Bangalore for advanced treatment. After examination, doctors successfully operated with the support and care of the medical team. Now recovering well, Dhanush is pursuing his college education with renewed hope and confidence for the future.",
    condition: 'Severe Foot Injury & Fractures from Train Accident',
    image: '/beneficiaries/dhanush.jpg',
    icon: <HeartPulse className="h-5 w-5" />,
  },
]

function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const common = 'sc-ornament pointer-events-none absolute mix-blend-multiply'
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
        className="h-[160px] w-[160px] sm:h-[210px] sm:w-[210px] lg:h-[240px] lg:w-[240px]"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className="sc-stroke" strokeLinecap="round" strokeLinejoin="round">
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
        </g>
      </svg>
    </div>
  )
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!cardRef.current) return
    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mx', `${x}%`)
      card.style.setProperty('--my', `${y}%`)
    }

    card.addEventListener('mousemove', handleMouseMove)
    return () => card.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.article
      ref={cardRef}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      className="group relative h-full"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-[26px]"
          style={{
            background:
              'radial-gradient(760px circle at var(--mx) var(--my), color-mix(in srgb, var(--primary) 22%, transparent), transparent 45%)',
          }}
        />
      </div>

      {/* ✅ Background image card (visible image) */}
      <div
        className="sc-card relative mx-auto flex h-full w-full max-w-[860px] overflow-hidden rounded-[26px] border border-black/5 shadow-[var(--shadow-soft)]"
        style={{ backgroundImage: `url(${story.image})` }}
      >
        <div className="sc-content relative z-10 flex w-full flex-col px-6 pb-6 pt-6 sm:px-7 sm:pb-7 sm:pt-7">
          {/* Top line */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-[var(--shadow-soft)]"
              style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
              aria-hidden="true"
            >
              {story.icon}
            </div>

            <span className="inline-flex items-center rounded-full border border-white/35 bg-white/20 px-4 py-1.5 text-[12px] font-semibold text-white backdrop-blur-sm">
              {story.condition}
            </span>
          </div>

          {/* Title */}
          <div className="mt-5">
            <p className="text-[12px] font-semibold text-white/90">{story.name}</p>
            <h3 className="mt-1 text-[18px] font-extrabold text-white sm:text-[22px]">
              {story.title}
            </h3>
          </div>

          {/* Story */}
          <p className="mt-4 max-w-[72ch] text-[14.5px] leading-relaxed text-white/90">
            {story.story}
          </p>

          <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* CTA */}
          <Link
            to="/join-the-cause"
            className="sc-donate-strip mt-5 flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5"
            aria-label="Donate Now"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/15">
                <HeartPulse size={16} className="text-white" />
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-extrabold text-white">Donate Now</p>
                <p className="text-[11.5px] font-semibold text-white/85">Support a life-changing treatment</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/12 px-3.5 py-2 text-[12.5px] font-extrabold text-white">
              View <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* optional glows */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 z-0 h-28 w-28 rounded-full blur-3xl opacity-45"
          style={{ background: 'var(--primary-soft)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-10 z-0 h-32 w-32 rounded-full blur-3xl opacity-35"
          style={{ background: 'var(--calm-soft)' }}
        />
      </div>
    </motion.article>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.sc-header')
      const ornamentStrokeEls = sectionRef.current?.querySelectorAll<SVGGeometryElement>('.sc-ornament .sc-stroke > *')

      if (header) {
        gsap.fromTo(
          header,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
          }
        )
      }

      const shapes = Array.from(ornamentStrokeEls ?? [])
      shapes.forEach((el) => {
        const len = el.getTotalLength?.()
        if (!len || !Number.isFinite(len)) return
        el.style.strokeDasharray = `${len}`
        el.style.strokeDashoffset = `${len}`
      })

      gsap
        .timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        })
        .to(shapes, { strokeDashoffset: 0, duration: 2.0, ease: 'power2.out', stagger: 0.03 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSwiperClick = (sw: SwiperType) => {
    const clickedSlide = sw.clickedSlide as HTMLElement | undefined
    if (!clickedSlide) return
    if (clickedSlide.classList.contains('swiper-slide-active')) return

    if (clickedSlide.classList.contains('swiper-slide-prev')) {
      sw.slidePrev()
      return
    }
    if (clickedSlide.classList.contains('swiper-slide-next')) {
      sw.slideNext()
      return
    }

    const real = Number(clickedSlide.getAttribute('data-swiper-slide-index'))
    if (Number.isFinite(real)) sw.slideToLoop(real, 900)
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-alt relative overflow-hidden bg-[var(--bg-section)] py-14 sm:py-16 lg:py-20"
    >
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80 bg-[var(--primary-soft)]" />
        <div className="absolute left-1/3 bottom-0 h-[560px] w-[560px] -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl opacity-70 bg-[var(--calm-soft)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sc-header mb-6 text-center sm:mb-7">
          <p className="text-[11px] font-bold tracking-widest text-[var(--text-muted)] sm:text-xs">HEALING JOURNEYS</p>

          <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-heading)] sm:text-3xl lg:text-4xl">
            Healing Journeys That Inspire Hope
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-[var(--primary-soft)] sm:w-20" />

          <p className="mx-auto mt-3 max-w-3xl text-sm text-[var(--text-muted)] sm:mt-4 sm:text-base">
            A charitable healthcare institution dedicated to rural and disabled communities — where care becomes dignity,
            safety, and a second chance.
          </p>

          <p className="mt-4 text-xs font-semibold text-[var(--text-muted)] sm:mt-5">
            Tip: Click left card = Prev • Right card = Next • Drag smoothly
          </p>
        </div>

        <Swiper
          onSwiper={(sw) => {
            swiperRef.current = sw
            requestAnimationFrame(() => {
              sw.slideToLoop(0, 0)
              sw.update()
            })
          }}
          onClick={handleSwiperClick}
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 90,
            depth: 240,
            modifier: 1.15,
            slideShadows: false,
          }}
          touchEventsTarget="container"
          grabCursor
          simulateTouch
          followFinger
          threshold={12}
          shortSwipes
          longSwipes
          longSwipesRatio={0.25}
          longSwipesMs={220}
          resistance
          resistanceRatio={0.7}
          slidesPerGroup={1}
          centeredSlides
          slideToClickedSlide={false}
          loop
          speed={900}
          autoplay={{ delay: 6000, pauseOnMouseEnter: true, disableOnInteraction: false }}
          pagination={{ clickable: true, bulletClass: 'sc-bullet', bulletActiveClass: 'sc-bullet-active' }}
          slidesPerView={1}
          spaceBetween={70}
          breakpoints={{
            360: { slidesPerView: 1, spaceBetween: 18 },
            520: { slidesPerView: 1.05, spaceBetween: 32 },
            720: { slidesPerView: 1.35, spaceBetween: 52 },
            900: { slidesPerView: 2.05, spaceBetween: 70 },
            1180: { slidesPerView: 2.35, spaceBetween: 84 },
            1380: { slidesPerView: 3.05, spaceBetween: 96 },
          }}
          className="story-swiper"
        >
          {stories.map((story, idx) => (
            <SwiperSlide key={story.id} className="h-auto py-6">
              <div className="sc-slide-inner">
                <StoryCard story={story} index={idx} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 text-center sm:mt-12"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Antharaganga Vidya Samsthe • Charitable healthcare for rural & disabled communities
          </p>
        </motion.div>
      </div>

      <style>{`
        .sc-ornament { opacity: 0.22; }
        @media (min-width: 640px) { .sc-ornament { opacity: 0.20; } }
        @media (min-width: 1024px) { .sc-ornament { opacity: 0.18; } }

        .story-swiper,
        .story-swiper .swiper,
        .story-swiper .swiper-wrapper,
        .story-swiper .swiper-slide { overflow: visible !important; }
        .story-swiper .swiper-slide { height: auto !important; cursor: pointer; }

        .sc-slide-inner{
          transition: opacity 520ms ease, filter 520ms ease, transform 520ms ease;
          will-change: transform, opacity, filter;
          opacity: 0.18;
          filter: blur(6px);
          transform: translateY(14px) scale(0.94);
          pointer-events: auto;
        }

        .story-swiper .swiper-slide-active { z-index: 5; }
        .story-swiper .swiper-slide-active .sc-slide-inner{
          opacity: 1;
          filter: blur(0);
          transform: translateY(0) scale(1);
          cursor: grab;
        }

        .story-swiper .swiper-slide-prev .sc-slide-inner,
        .story-swiper .swiper-slide-next .sc-slide-inner{
          opacity: 0.42;
          filter: blur(4px);
          transform: translateY(10px) scale(0.97);
        }

        @media (max-width: 640px) {
          .sc-slide-inner{
            opacity: 0.10;
            filter: blur(10px);
            transform: translateY(16px) scale(0.92);
          }
          .story-swiper .swiper-slide-prev .sc-slide-inner,
          .story-swiper .swiper-slide-next .sc-slide-inner{
            opacity: 0.16;
            filter: blur(8px);
            transform: translateY(12px) scale(0.94);
          }
          .story-swiper .swiper-slide-active .sc-slide-inner{
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) scale(1);
          }
        }

        .story-swiper .swiper-pagination { position: relative; margin-top: 16px; }
        .sc-bullet {
          width: 8px; height: 8px; border-radius: 9999px;
          margin: 0 5px !important;
          background: rgba(74, 55, 60, 0.20);
          opacity: 1;
          transition: all 300ms ease;
        }
        .sc-bullet-active {
          width: 26px;
          background: var(--primary);
          opacity: 0.92;
        }

        /* ✅ Real visible background image */
        .sc-card{
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 416px; /* 20% smaller */
  position: relative;
  background-color: #000;
}

        /* ✅ Light overlay so image stays visible */
        .sc-card::after{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,0.18) 0%,
              rgba(0,0,0,0.28) 40%,
              rgba(0,0,0,0.62) 100%
            );
          pointer-events:none;
        }

        .sc-content{ position: relative; z-index: 2; }

        @media (max-width: 640px){
          .sc-card{ min-height: 448px; }
        }

        .sc-donate-strip { background: var(--primary); text-decoration: none; }
        .sc-donate-strip:hover { filter: brightness(1.03); }
        .sc-donate-strip:active { filter: brightness(0.98); }
      `}</style>
    </section>
  )
}
