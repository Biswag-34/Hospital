import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HeartHandshake,
  Activity,
  Stethoscope,
  Brain,
  Accessibility,
  Building2,
  CheckCircle2,
  Users,
  ShieldPlus,
  Syringe,
  Microscope,
  PhoneCall,
  BadgeIndianRupee,
  HandHeart,
  Landmark,
  Hospital,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const keyBadges = [
  {
    icon: <Landmark size={20} className="text-[var(--text-on-image)]" />,
    title: 'A Non-Profit, Charitable Venture',
    desc: 'The hospital stands as a long-term promise to rural families, persons with disabilities, and economically vulnerable communities.',
    bg: '/about/nonprofit.jpg',
    pos: 'center' as const,
  },
  {
    icon: <Accessibility size={20} className="text-[var(--text-on-image)]" />,
    title: 'Free Treatment for Disabled People',
    desc: 'Priority, dignity-first clinical support and structured disability care.',
    bg: '/about/d.JPG',
    pos: 'top' as const,
  },
  {
    icon: <BadgeIndianRupee size={20} className="text-[var(--text-on-image)]" />,
    title: 'Affordable Care for Everyone',
    desc: 'A partnered initiative of Raghavendra Shri Sai Rural Healthcare Foundation & Antaragange Vidya Samste',
    bg: '/about/affordable.jpg',
    pos: 'center' as const,
  },
]

const pillars = [
  {
    icon: <HeartHandshake size={18} className="text-[var(--primary)]" />,
    title: 'Charitable, Rural-First Care',
    desc: 'Antharagange Rural Hospital & Research Center was established with a singular purpose: to bridge the healthcare gap in rural and disabled communities.',
  },
  {
    icon: <Accessibility size={18} className="text-[var(--primary)]" />,
    title: 'Disability Care as Core Identity',
    desc: 'Structured lifelong support for mental and physical disabilities.',
  },
  {
    icon: <Users size={18} className="text-[var(--primary)]" />,
    title: 'Community Outreach Backbone',
    desc: 'Located in the rural heart of Kolar district, the hospital is designed not merely as a treatment facility, but as a community-centered healthcare ecosystem—where care, rehabilitation, prevention, and research work together.',
  },
]

const clinicalFoundation = [
  { icon: <Stethoscope size={22} className="text-[var(--calm)]" />, label: 'Outpatient (OPD) and inpatient (IPD) services' },
  { icon: <Syringe size={22} className="text-[var(--calm)]" />, label: 'Wound care and limb salvage programs' },
  { icon: <ShieldPlus size={22} className="text-[var(--calm)]" />, label: 'Chronic disease management' },
  { icon: <Microscope size={22} className="text-[var(--calm)]" />, label: 'Mother and child health services' },
]

const disabilityCore = [
  { icon: <Brain size={22} className="text-[var(--primary)]" />, label: 'Mental health services, including counseling and community psychiatry support' },
  { icon: <Activity size={22} className="text-[var(--primary)]" />, label: 'Disability rehabilitation and physiotherapy' },
  { icon: <Accessibility size={22} className="text-[var(--primary)]" />, label: 'De-addiction and substance abuse treatment' },
  { icon: <HeartHandshake size={22} className="text-[var(--primary)]" />, label: 'Caregiver training & family support programs' },
]

const timeline = [
  {
    phase: 'Stage-1 Completed',
    tag: 'Foundation + Basement',
    points: [
      'Basement built-up completed (3,500 sq. ft.)',
      'RCC foundation + basement structure ready for next build stages',
      'Prepared for Stage-2 execution (Ground + First Floor)',
    ],
    status: 'done',
  },
  {
    phase: 'Stage-2 Next',
    tag: 'Ground + First Floor',
    points: [
      'OPD, pharmacy, diagnostics, rehab/physio units',
      'Operation theatre + dialysis planning integration',
      'Ward layout + service integration',
    ],
    status: 'next',
  },
  {
    phase: 'Stage-3 Vision',
    tag: 'Second Floor + Training',
    points: [
      'Telemedicine and conference/training capability',
      'Residential support for staff (dorms/lounge)',
      'Long-term sustainability systems (water treatment, services)',
    ],
    status: 'future',
  },
]

const outreachItems = [
  'Mobile medical units',
  'Free rural and disability-focused health camps',
  'School health screening programs',
  'Training programs for rural healthcare workers',
  'Awareness initiatives on diabetes, wound care, hygiene, and prevention',
  'Pra-Chi- Prathama Chikitse',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ab-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.ab-stagger').forEach((wrap) => {
        const children = wrap.querySelectorAll('.ab-item')
        gsap.fromTo(
          children,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: wrap,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      const tItems = gsap.utils.toArray<HTMLElement>('.ab-timeline-item')
      gsap.fromTo(
        tItems,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.ab-timeline',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const card =
    'rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]'

  const imgCardBase = [
    'ab-reveal relative overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-soft)]',
    'min-h-[var(--imgcard-min-h)] sm:min-h-[var(--imgcard-min-h-sm)] lg:min-h-[var(--imgcard-min-h-lg)]',
  ].join(' ')

  const badgeBase = [
    'ab-item relative overflow-hidden rounded-3xl p-7 shadow-[var(--shadow-soft)]',
    'min-h-[var(--keybadge-min-h)] sm:min-h-[var(--keybadge-min-h-sm)]',
  ].join(' ')

  const chip =
    'ab-item flex items-center gap-3 rounded-2xl border border-[var(--chip-border-on-image)] bg-[var(--chip-bg-on-image)] px-4 py-3 backdrop-blur-[8px]'

  const bgPos = (pos: 'top' | 'center') => (pos === 'top' ? 'var(--img-pos-top)' : 'var(--img-pos-default)')

  const titleStyle: React.CSSProperties = {
    textShadow: '0 2px 12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.3)',
    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.2)',
    fontWeight: 800,
    letterSpacing: '-0.015em',
  }

  const bodyStyle: React.CSSProperties = {
    textShadow: '0 1px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.2)',
    fontWeight: 500,
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[var(--bg-section)] py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ab-reveal max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)] shadow-[var(--shadow-soft)]">
            <Building2 size={14} className="text-[var(--primary)]" />
            Antharaganga Rural Hospital & Research Center
          </p>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-3xl lg:text-4xl">
            A charitable healthcare institution dedicated to rural and disabled communities
          </h2>

          <p className="mt-4 leading-relaxed text-[var(--text-body)]">
            <span className="font-semibold text-[var(--calm)]">Antharagange</span> Rural Hospital & Research Center is a
            first-of-its-kind rural healthcare and research initiative, committed to delivering accessible, affordable,
            and compassionate medical care to underserved populations.
          </p>
        </div>

        {/* First three image cards - text at bottom */}
        <div className="ab-stagger mt-10 grid gap-6 md:grid-cols-3">
          {keyBadges.map((b) => (
            <div
              key={b.title}
              className={`${badgeBase} flex flex-col justify-end`}
              style={{
                backgroundImage: `url(${b.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: bgPos(b.pos),
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <div className="relative z-10 mt-auto pt-6 text-[var(--text-on-image)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm mb-4">
                  {b.icon}
                </div>

                <h3 className="text-xl font-extrabold" style={titleStyle}>
                  {b.title}
                </h3>

                <p className="mt-2 text-base leading-relaxed text-[var(--text-on-image-muted)]" style={bodyStyle}>
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="ab-reveal mt-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-[var(--text-heading)] sm:text-2xl">What we stand for</h3>
            <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
              Our model clusters healthcare delivery into clear pillars that rural families can understand and trust.
            </p>
          </div>
        </div>

        <div className="ab-stagger mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className={['ab-item p-7', card].join(' ')}>
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)]">
                {p.icon}
              </div>
              <h4 className="mt-4 text-lg font-bold text-[var(--text-heading)]">{p.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className={['ab-reveal p-8', card].join(' ')}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)]">
                <HandHeart size={18} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-extrabold text-[var(--text-heading)]">Vision</h3>
            </div>

            <p className="mt-4 leading-relaxed text-[var(--text-body)]">
              To build a sustainable rural hospital that ensures dignified, ethical, and high-quality healthcare for
              every individual—irrespective of geography, physical ability, or financial status.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--text-body)]">
              <CheckCircle2 size={16} className="text-[var(--calm)]" />
              Equity-led access, close to home
            </div>
          </div>

          <div className={['ab-reveal p-8', card].join(' ')}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)]">
                <Hospital size={18} className="text-[var(--calm)]" />
              </div>
              <h3 className="text-xl font-extrabold text-[var(--text-heading)]">Mission</h3>
            </div>

            <ul className="mt-4 space-y-3 text-sm text-[var(--text-body)]">
              {[
                'Provide affordable and subsidized healthcare to rural and disabled populations',
                'Address healthcare inequity through charitable service models',
                'Integrate treatment, rehabilitation, prevention, and research',
                'Strengthen rural healthcare through training and capacity building',
                'Develop a replicable rural hospital model for underserved regions',
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--primary)]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="ab-reveal relative overflow-hidden rounded-3xl bg-[var(--bg-dark)] p-8 text-[var(--bg-page)] shadow-[var(--shadow-strong)] lg:col-span-5">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">What makes us unique</p>
            <h3 className="mt-2 text-xl font-extrabold sm:text-2xl">Rural-first. Disability-first. Community-first.</h3>

            <div className="mt-6 grid gap-3">
              {[
                'A First-of-Its-Kind Rural Healthcare Model',
                'Socially driven, non-profit healthcare institution focused on long-term community impact',
                'Accessible care regardless of financial status',
                'Built specifically for underserved and remote populations',
                'Integrated rehabilitation and research model',
                'Continuity of care rather than episodic treatment',
                'Community-embedded approach with local participation',
              ].map((txt) => (
                <div key={txt} className="rounded-2xl border border-white/12 bg-white/6 p-4">
                  <p className="text-sm font-semibold text-white/92">{txt}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:col-span-7">
            {/* General Services card - heading top, chips bottom */}
            <div
              className={`${imgCardBase} flex flex-col`}
              style={{
                backgroundImage: "url('/about/general-services.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

              <div className="relative z-10 flex h-full flex-col">
                <div>
                  <h4 className="text-xl font-extrabold text-white" style={titleStyle}>
                    General Services (Foundation)
                  </h4>
                </div>
                
                <div className="mt-auto pt-6">
                  <div className="ab-stagger grid gap-3 sm:grid-cols-2">
                    {clinicalFoundation.map((x) => (
                      <div key={x.label} className={`${chip} bg-black/50 border-white/30`}>
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/20 backdrop-blur-sm">
                          {x.icon}
                        </span>
                        <span className="text-sm font-bold text-white" style={bodyStyle}>
                          {x.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Disability & Rehabilitation card - heading top, chips bottom */}
            <div
              className={`${imgCardBase} flex flex-col`}
              style={{
                backgroundImage: "url('/about/dc.JPG')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

              <div className="relative z-10 flex h-full flex-col">
                <div>
                  <h4 className="text-xl font-extrabold text-white" style={titleStyle}>
                    Disability & Rehabilitation (Core)
                  </h4>
                </div>
                
                <div className="mt-auto pt-6">
                  <div className="ab-stagger grid gap-3 sm:grid-cols-2">
                    {disabilityCore.map((x) => (
                      <div key={x.label} className={`${chip} bg-black/50 border-white/30`}>
                        <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/20 backdrop-blur-sm">
                          {x.icon}
                        </span>
                        <span className="text-sm font-bold text-white" style={bodyStyle}>
                          {x.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ab-reveal mt-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-[var(--text-heading)] sm:text-3xl">Our Build Journey</h3>
              <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
                A phased approach enables essential services first, followed by expansion into surgery, dialysis,
                telemedicine, and training capacity.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-3 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold text-[var(--text-muted)]">Current Status</p>
              <p className="text-sm font-extrabold text-[var(--text-heading)]">Stage-1 Completed</p>
            </div>
          </div>

          <div className="ab-timeline mt-8 grid gap-6 lg:grid-cols-3">
            {timeline.map((t) => {
              const badge =
                t.status === 'done'
                  ? 'bg-[var(--calm-soft)] text-[var(--calm)] border-[var(--calm)]/25'
                  : t.status === 'next'
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]/25'
                    : 'bg-[var(--surface-muted)] text-[var(--text-muted)] border-[var(--surface-border)]'

              return (
                <div key={t.phase} className={['ab-timeline-item p-7', card].join(' ')}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-muted)]">{t.tag}</p>
                      <h4 className="text-lg font-extrabold text-[var(--text-heading)]">{t.phase}</h4>
                    </div>

                    <span className={['rounded-full px-3 py-1 text-xs font-semibold border', badge].join(' ')}>
                      {t.status === 'done' ? 'Completed' : t.status === 'next' ? 'Next' : 'Planned'}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm text-[var(--text-body)]">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 text-[var(--calm)]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-12">
          {/* Community Outreach card - heading/para top, points middle-bottom */}
          <div
            className={[
              'ab-reveal relative overflow-hidden rounded-3xl p-8 shadow-[var(--shadow-soft)]',
              'lg:col-span-7',
              'min-h-[440px] sm:min-h-[360px]',
              'flex flex-col',
            ].join(' ')}
            style={{
              backgroundImage: "url('/about/community-outreach.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Stronger overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />

            <div className="relative z-10 flex h-full flex-col">
              {/* Heading and paragraph at top */}
              <div>
                <h3 className="text-2xl font-extrabold text-white" style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 0, 0, 0.5)',
                  fontWeight: 800,
                  letterSpacing: '-0.015em',
                }}>
                  Community Outreach
                </h3>

                <p className="mt-3 text-lg leading-relaxed text-white" style={{ 
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.4)',
                  fontWeight: 500,
                }}>
                  Our model depends on camps, early screening, and consistent follow-up, especially for disability care and
                  rural access.
                </p>
              </div>
              
              {/* Points in middle to bottom */}
              <div className="mt-auto pt-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {outreachItems.map((x) => (
                    <div
                      key={x}
                      className="text-white/70 rounded-2xl border border-white/20 border-2 bg-rgba(251, 251, 251, 0.01) px-1 py-2 text-base font-bold text-[var(--text-heading)] backdrop-blur-[3px]"
                    >
                      {x}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ab-reveal lg:col-span-5 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-8 text-[var(--bg-page)] shadow-[var(--shadow-strong)]">
            <h3 className="text-2xl font-extrabold">Need help or want to support?</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              <span className="font-bold">Raghavendra Shri Sai Rural Healthcare Foundation</span>, a non-profit
              organization with over a decade of experience in rural healthcare, committed to ethical care, accessibility,
              and long-term community health outcomes.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-sm font-semibold">Core Focus</p>
                <p className="mt-1 text-xs text-white/80">Mental & physical disability care across the lifespan.</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="text-sm font-semibold">Contact</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <PhoneCall size={16} className="text-white" />
                  <span className="font-semibold">+91 94495 49307</span>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-7 inline-flex w-full justify-center rounded-full bg-[var(--bg-page)] px-6 py-3 font-semibold text-[var(--primary)]
                         transition hover:opacity-95 active:scale-[0.98]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}