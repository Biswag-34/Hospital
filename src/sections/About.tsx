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

/** ---------------------------
 *  VISUAL CLUSTERS / DATA
 * -------------------------- */

const keyBadges = [
  {
    icon: <Landmark size={18} className="text-[var(--secondary)]" />,
    title: 'A Non-Profit, Charitable Venture',
    desc: 'The hospital stands as a long-term promise to rural families, persons with disabilities, and economically vulnerable communities.',
  },
  {
    icon: <Accessibility size={18} className="text-[var(--primary)]" />,
    title: 'Free Check-ups for Disabled People',
    desc: 'Priority, dignity-first clinical support and structured disability care.',
  },
  {
    icon: <BadgeIndianRupee size={18} className="text-[var(--accent)]" />,
    title: 'Affordable Care for Everyone',
    desc: 'A partnered initiative of Raghavendra Shri Sai Rural Healthcare Foundation & Antaragange Vidya Samste',
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
  { icon: <Stethoscope size={18} className="text-[var(--secondary)]" />, label: 'Outpatient (OPD) and inpatient (IPD) services' },
  { icon: <Syringe size={18} className="text-[var(--secondary)]" />, label: 'Wound care and limb salvage programs' },
  { icon: <ShieldPlus size={18} className="text-[var(--secondary)]" />, label: 'Preventive health check-ups' },
  { icon: <Microscope size={18} className="text-[var(--secondary)]" />, label: 'Mother and child health services' },
]

const disabilityCore = [
  { icon: <Brain size={18} className="text-[var(--primary)]" />, label: 'Mental health services, including counseling and community psychiatry support' },
  { icon: <Activity size={18} className="text-[var(--primary)]" />, label: 'Disability rehabilitation and physiotherapy' },
  { icon: <Accessibility size={18} className="text-[var(--primary)]" />, label: 'Mother and child health services' },
  { icon: <HeartHandshake size={18} className="text-[var(--primary)]" />, label: 'Chronic disease management' },
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
]

/** ---------------------------
 *  COMPONENT
 * -------------------------- */

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Reveal blocks
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

      // Stagger for grids
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

      // Timeline items
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[var(--bg-section)]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="ab-reveal max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-lg font-bold text-[var(--text-muted)] border border-[var(--surface-border)]">
            <Building2 size={14} className="text-[var(--primary)]" />
            Antharaganga Rural Hospital & Research Center
          </p>

          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight">
            A charitable healthcare institution dedicated to rural and disabled communities
          </h2>

          <p className="mt-4 text-[var(--text-body)] leading-relaxed">
            <span className='text-green-500 text-xl'>Antharagange</span> Rural Hospital & Research Center is a first-of-its-kind rural healthcare and research initiative, committed to delivering accessible, affordable, and compassionate medical care to underserved populations.
          </p>
        </div>

        {/* KEY BADGES (big emphasis cluster) */}
        <div className="ab-stagger mt-10 grid gap-6 md:grid-cols-3">
          {keyBadges.map((b) => (
            <div key={b.title} className="ab-item card p-7">
              <div className="h-11 w-11 rounded-2xl bg-[var(--bg-section)] border border-[var(--surface-border)] grid place-items-center">
                {b.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--text-heading)]">{b.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-body)] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* PILLARS */}
        <div className="ab-reveal mt-14 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-heading)]">
              What we stand for
            </h3>
            <p className="mt-2 text-[var(--text-muted)] max-w-2xl">
              Our model clusters healthcare delivery into clear pillars that rural families can understand and trust.
            </p>
          </div>
        </div>

        <div className="ab-stagger mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="ab-item card p-7">
              <div className="h-11 w-11 rounded-2xl bg-[var(--bg-section)] border border-[var(--surface-border)] grid place-items-center">
                {p.icon}
              </div>
              <h4 className="mt-4 text-lg font-bold text-[var(--text-heading)]">{p.title}</h4>
              <p className="mt-2 text-sm text-[var(--text-body)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* VISION + MISSION (cluster) */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="ab-reveal card p-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[var(--bg-section)] border border-[var(--surface-border)] grid place-items-center">
                <HandHeart size={18} className="text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-extrabold text-[var(--text-heading)]">Vision</h3>
            </div>

            <p className="mt-4 text-[var(--text-body)] leading-relaxed">
              To build a sustainable rural hospital that ensures dignified, ethical, and high-quality healthcare for every individual—irrespective of geography, physical ability, or financial status.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--text-body)]">
              <CheckCircle2 size={16} className="text-[var(--primary)]" />
              Equity-led access, close to home
            </div>
          </div>

          <div className="ab-reveal card p-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[var(--bg-section)] border border-[var(--surface-border)] grid place-items-center">
                <Hospital size={18} className="text-[var(--secondary)]" />
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

        {/* CARE MODEL + SERVICES CLUSTER */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Left: Care Model (dark card) */}
          <div className="ab-reveal lg:col-span-5 rounded-3xl bg-[var(--bg-dark)] text-white p-8 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <h3 className="text-xl sm:text-2xl font-extrabold">WHAT MAKE US UNIQUE</h3>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">A First-of-Its-Kind Rural Healthcare Model</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Socially driven, non-profit healthcare institution focused on long-term community impact</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Charitable and non-profit driven</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Designed for rural-specific health challenges</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Integrated rehabilitation and research model</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Continuity of care rather than episodic treatment</p>
              </div>
            </div>
          </div>

          {/* Right: Services grouped */}
          <div className="lg:col-span-7 grid gap-6">
            <div className="ab-reveal card p-8">
              <h4 className="text-lg font-bold text-[var(--text-heading)]">
                General Services (Foundation)
              </h4>

              <div className="ab-stagger mt-5 grid gap-3 sm:grid-cols-2">
                {clinicalFoundation.map((x) => (
                  <div
                    key={x.label}
                    className="ab-item flex items-center gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)] px-4 py-3"
                  >
                    <span className="h-9 w-9 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] grid place-items-center">
                      {x.icon}
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-body)]">{x.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ab-reveal card p-8">
              <h4 className="text-lg font-bold text-[var(--text-heading)]">
                Disability & Rehabilitation (Core)
              </h4>

              <div className="ab-stagger mt-5 grid gap-3 sm:grid-cols-2">
                {disabilityCore.map((x) => (
                  <div
                    key={x.label}
                    className="ab-item flex items-center gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)] px-4 py-3"
                  >
                    <span className="h-9 w-9 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] grid place-items-center">
                      {x.icon}
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-body)]">{x.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BUILD JOURNEY / TIMELINE CLUSTER */}
        <div className="ab-reveal mt-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)]">
                Our Build Journey
              </h3>
              <p className="mt-2 text-[var(--text-muted)] max-w-2xl">
                A phased approach enables essential services first, followed by expansion into surgery, dialysis, telemedicine,
                and training capacity.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-3 shadow-sm">
              <p className="text-xs font-semibold text-[var(--text-muted)]">Current Status</p>
              <p className="text-sm font-bold text-[var(--text-heading)]">Stage-1 Completed</p>
            </div>
          </div>

          <div className="ab-timeline mt-8 grid gap-6 lg:grid-cols-3">
            {timeline.map((t) => (
              <div key={t.phase} className="ab-timeline-item card p-7">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)]">{t.tag}</p>
                    <h4 className="text-lg font-extrabold text-[var(--text-heading)]">{t.phase}</h4>
                  </div>

                  <span
                    className={[
                      'rounded-full px-3 py-1 text-xs font-semibold border',
                      t.status === 'done'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : t.status === 'next'
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200',
                    ].join(' ')}
                  >
                    {t.status === 'done' ? 'Completed' : t.status === 'next' ? 'Next' : 'Planned'}
                  </span>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-[var(--text-body)]">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-[var(--primary)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* OUTREACH + CTA CLUSTER */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12 items-stretch">
          <div className="ab-reveal lg:col-span-7 card p-8">
            <h3 className="text-2xl font-extrabold text-[var(--text-heading)]">Community Outreach</h3>
            <p className="mt-3 text-[var(--text-body)] leading-relaxed">
              Our model depends on camps, early screening, and consistent follow-up, especially for disability care and rural access.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outreachItems.map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border border-[var(--surface-border)] bg-[var(--bg-page)] px-4 py-3 text-sm text-[var(--text-body)]"
                >
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div className="ab-reveal lg:col-span-5 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white p-8 shadow-lg">
            <h3 className="text-2xl font-extrabold">Need help or want to support?</h3>
            <p className="mt-3 text-white/85 text-sm leading-relaxed">
             <span className="font-bold">Raghavendra Shri Sai Rural Healthcare Foundation</span>, A non-profit organization with over a decade of experience in rural healthcare, committed to ethical care, accessibility, and long-term community health outcomes.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                <p className="text-sm font-semibold">Core Focus</p>
                <p className="text-xs text-white/80 mt-1">Mental & physical disability care across the lifespan.</p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                <p className="text-sm font-semibold">Contact</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <PhoneCall size={16} className="text-white" />
                  <span className="font-semibold">+91 94495 49307</span>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-7 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-[var(--text-heading)] font-semibold hover:bg-slate-100 active:scale-[0.98] transition"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
