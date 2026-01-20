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
    title: 'Government Subsidized Model',
    desc: 'Built to reduce rural healthcare burden through subsidized services.',
  },
  {
    icon: <Accessibility size={18} className="text-[var(--primary)]" />,
    title: 'Free Check-ups for Disabled People',
    desc: 'Priority, dignity-first clinical support and structured disability care.',
  },
  {
    icon: <BadgeIndianRupee size={18} className="text-[var(--accent)]" />,
    title: 'Affordable Care for Everyone',
    desc: 'Low-cost consultations and services for all rural families.',
  },
]

const pillars = [
  {
    icon: <HeartHandshake size={18} className="text-[var(--primary)]" />,
    title: 'Charitable, Rural-First Care',
    desc: 'Affordable, accessible healthcare designed for rural communities.',
  },
  {
    icon: <Accessibility size={18} className="text-[var(--primary)]" />,
    title: 'Disability Care as Core Identity',
    desc: 'Structured lifelong support for mental and physical disabilities.',
  },
  {
    icon: <Users size={18} className="text-[var(--primary)]" />,
    title: 'Community Outreach Backbone',
    desc: 'Screening camps, early intervention, and village-level follow-up.',
  },
]

const clinicalFoundation = [
  { icon: <Stethoscope size={18} className="text-[var(--secondary)]" />, label: 'General Medicine' },
  { icon: <Syringe size={18} className="text-[var(--secondary)]" />, label: 'Pediatrics & Immunization' },
  { icon: <ShieldPlus size={18} className="text-[var(--secondary)]" />, label: 'Emergency Stabilization' },
  { icon: <Microscope size={18} className="text-[var(--secondary)]" />, label: 'Lab, X-ray, Ultrasound' },
]

const disabilityCore = [
  { icon: <Brain size={18} className="text-[var(--primary)]" />, label: 'Child Development & Psychiatry' },
  { icon: <Activity size={18} className="text-[var(--primary)]" />, label: 'Physiotherapy, OT, Speech Therapy' },
  { icon: <Accessibility size={18} className="text-[var(--primary)]" />, label: 'Orthotics / Prosthetics Support' },
  { icon: <HeartHandshake size={18} className="text-[var(--primary)]" />, label: 'Family Counseling & Rehab Plans' },
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
  'Monthly village disability screening camps',
  'School screening for developmental delay',
  'Home-based rehab support for severe cases',
  'Referral pathways for higher medical assistance',
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
            Government subsidized rural healthcare that restores dignity, function, and hope.
          </h2>

          <p className="mt-4 text-[var(--text-body)] leading-relaxed">
            This hospital is designed as a government-subsidized, rural-first initiative: free check-ups for disabled people,
            and low-cost services for everyone else, ensuring quality healthcare is accessible without financial burden.
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
              To ensure that no rural child, adult, or elderly person lives with preventable disability, untreated mental illness,
              or lack of basic healthcare due to poverty or distance.
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
                'Provide free or highly subsidized comprehensive healthcare to rural populations.',
                'Deliver early identification, treatment, correction, and long-term rehabilitation for disabilities.',
                'Integrate medical care, surgery, therapy, rehabilitation, social support, and livelihood linkage.',
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
            <h3 className="text-xl sm:text-2xl font-extrabold">Care Model</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              A general rural hospital foundation that builds trust and continuity, combined with a dedicated disability care core.
              Free check-ups for disabled people, and subsidized care for others.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Foundation Layer</p>
                <p className="text-xs text-white/70 mt-1">
                  OPD/IPD + essential diagnostics + emergency stabilization.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-semibold">Core Identity</p>
                <p className="text-xs text-white/70 mt-1">
                  Mental health + disability correction + long-term rehabilitation.
                </p>
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
              This is a government-subsidized rural health initiative: free check-ups for disabled people and affordable care for all.
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
