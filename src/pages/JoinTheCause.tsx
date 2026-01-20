import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, BadgeCheck, HeartHandshake, HandCoins, Building2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function JoinTheCause() {
  const pageRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const contact = useMemo(
    () => ({
      name: 'Dr. Pradeep Kumar N',
      phone: '+91 9449549307',
      email: 'contact@qlinique.com', // replace with official email if you have
      address: 'Antharagange, Kolar District, Karnataka',
    }),
    []
  )

  useEffect(() => {
    if (!pageRef.current) return

    const ctx = gsap.context(() => {
      // Reveal blocks
      gsap.utils.toArray<HTMLElement>('.jc-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Kolam stroke draw (bold)
      const svg = svgRef.current
      if (svg) {
        const paths = Array.from(svg.querySelectorAll('path')) as SVGPathElement[]
        paths.forEach((p) => {
          const len = p.getTotalLength()
          p.style.strokeDasharray = `${len}`
          p.style.strokeDashoffset = `${len}`
          p.style.opacity = '1'
        })

        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 2.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.jc-hero',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="relative">
      {/* Sticky CTA (visible most of the time) */}
      <aside className="fixed z-40 bottom-4 right-4 w-[92vw] sm:w-[380px]">
        <div
          className="card p-4 sm:p-5 backdrop-blur"
          style={{
            background:
              'linear-gradient(180deg, rgba(243,239,232,0.92), rgba(236,231,222,0.92))',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                Join The Cause
              </p>
              <p className="text-sm font-extrabold" style={{ color: 'var(--text-heading)' }}>
                Help build affordable rural healthcare
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: 'rgba(156,90,60,0.10)',
                border: '1px solid rgba(156,90,60,0.25)',
                color: 'var(--primary)',
              }}
            >
              <BadgeCheck size={14} />
              80G / 12A
            </span>
          </div>

          <div className="mt-4 grid gap-2 text-sm">
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 rounded-2xl px-3 py-2 transition"
              style={{
                background: 'rgba(223,230,219,0.55)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-heading)',
              }}
            >
              <Phone size={16} />
              <span className="font-semibold">{contact.phone}</span>
              <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
                Call
              </span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 rounded-2xl px-3 py-2 transition"
              style={{
                background: 'rgba(223,230,219,0.45)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-heading)',
              }}
            >
              <Mail size={16} />
              <span className="font-semibold truncate">{contact.email}</span>
              <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
                Email
              </span>
            </a>

            <div
              className="flex items-start gap-2 rounded-2xl px-3 py-2"
              style={{
                background: 'rgba(223,230,219,0.35)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-heading)',
              }}
            >
              <MapPin size={16} className="mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold">Location</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {contact.address}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Prefer CSR / Foundation support? Contact us. We will share project plan, stage reports, and utilisation details.
          </p>
        </div>
      </aside>

      {/* HERO */}
      <section className="jc-hero section-alt relative overflow-hidden pt-24 pb-14">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full blur-3xl"
            style={{ background: 'rgba(156, 90, 60, 0.12)' }}
          />
          <div
            className="absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full blur-3xl"
            style={{ background: 'rgba(107, 124, 89, 0.16)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <div
              className="jc-reveal inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                background: 'rgba(243,239,232,0.75)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-heading)',
              }}
            >
              <Building2 size={14} style={{ color: 'var(--primary)' }} />
              Antharaganga Rural Hospital & Research Center
            </div>

            <h1
              className="jc-reveal mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-heading)' }}
            >
              Join The Cause. Build a rural charitable hospital where disability care is not optional — it’s the core.
            </h1>

            <p className="jc-reveal mt-4 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>
              This initiative is designed to deliver essential rural healthcare while building a structured center of excellence
              for mental and physical disability care across the lifespan.
            </p>

            <div className="jc-reveal mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition active:scale-[0.98]"
                style={{ background: 'var(--primary)', color: '#fff' }}
              >
                Call to Support
              </a>
              <a
                href="#why"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition active:scale-[0.98]"
                style={{
                  background: 'rgba(243,239,232,0.75)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--text-heading)',
                }}
              >
                See the plan
              </a>
            </div>

            <div className="jc-reveal mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { label: '80G / 12A', sub: 'Tax exemption supported', icon: <BadgeCheck size={18} /> },
                { label: 'Rural-first', sub: 'Designed for rural needs', icon: <HeartHandshake size={18} /> },
                { label: 'Funding', sub: 'Donations + CSR + Schemes', icon: <HandCoins size={18} /> },
              ].map((x) => (
                <div key={x.label} className="card p-4">
                  <div
                    className="h-10 w-10 rounded-2xl grid place-items-center"
                    style={{
                      background: 'rgba(223,230,219,0.6)',
                      border: '1px solid var(--surface-border)',
                      color: 'var(--primary)',
                    }}
                  >
                    {x.icon}
                  </div>
                  <p className="mt-3 text-sm font-extrabold" style={{ color: 'var(--text-heading)' }}>
                    {x.label}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {x.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Kolam motif */}
          <div className="lg:col-span-5 jc-reveal">
            <div className="card p-6 sm:p-8">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                A symbol of care rooted in community
              </p>
              <p className="mt-2 text-lg font-extrabold" style={{ color: 'var(--text-heading)' }}>
                Rural care. Disability dignity. Long-term rehabilitation.
              </p>

              <div className="mt-6">
                <svg
                  ref={svgRef}
                  viewBox="0 0 520 420"
                  className="w-full h-[260px] sm:h-[300px]"
                  fill="none"
                >
                  <path d="M80 210c40-110 120-110 160 0s120 110 160 0" stroke="rgba(47,62,52,0.58)" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M80 210c40 110 120 110 160 0s120-110 160 0" stroke="rgba(47,62,52,0.58)" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M110 110c30 40 60 40 90 0s60-40 90 0 60 40 90 0" stroke="rgba(156,90,60,0.62)" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M110 310c30-40 60-40 90 0s60 40 90 0 60-40 90 0" stroke="rgba(156,90,60,0.62)" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M60 210h400" stroke="rgba(107,124,89,0.50)" strokeWidth="4.5" strokeLinecap="round"/>
                </svg>
              </div>

              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                Your support accelerates construction, essential equipment, and affordable services for rural and disabled communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="jc-reveal max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text-heading)' }}>
              Why this hospital is different
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
              It is a charitable rural hospital where disability care, rehabilitation, and lifelong support are a core identity.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Free / subsidized care focus',
                desc: 'Free checkups for disabled people and highly affordable services for others, ensuring no one is denied care due to cost.',
              },
              {
                title: 'Community outreach backbone',
                desc: 'Village camps, early screening, and follow-ups help catch conditions early and prevent lifelong disability.',
              },
              {
                title: 'Sustainable charitable model',
                desc: 'Funds are used to build essential infrastructure, diagnostics, and rehabilitation services with accountability.',
              },
            ].map((x) => (
              <div key={x.title} className="card p-7 jc-reveal">
                <h3 className="text-lg font-extrabold" style={{ color: 'var(--text-heading)' }}>
                  {x.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {x.desc}
                </p>
                <div
                  className="mt-4 h-[2px] w-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(156,90,60,0.45), transparent)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE FUNDS GO */}
      <section className="section-alt py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="jc-reveal max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text-heading)' }}>
              Where your support goes
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
              Donations help accelerate construction, basic diagnostics, rehabilitation units, and outreach programs for rural communities.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 card p-7 jc-reveal">
              <h3 className="text-lg font-extrabold" style={{ color: 'var(--text-heading)' }}>
                Key funding buckets
              </h3>

              <div className="mt-5 grid gap-3">
                {[
                  { label: 'Construction and core infrastructure', value: 'Stage-wise execution' },
                  { label: 'Diagnostics and essential equipment', value: 'Lab / X-ray / Ultrasound' },
                  { label: 'Rehab and disability support units', value: 'Physio / OT / Speech' },
                  { label: 'Community outreach and mobile support', value: 'Camps + follow-ups' },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
                    style={{
                      background: 'rgba(223,230,219,0.45)',
                      border: '1px solid var(--surface-border)',
                    }}
                  >
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                      {b.label}
                    </span>
                    <span className="text-sm font-extrabold" style={{ color: 'var(--primary)' }}>
                      {b.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 card p-7 jc-reveal">
              <h3 className="text-lg font-extrabold" style={{ color: 'var(--text-heading)' }}>
                Contact to contribute
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                For individual donors, CSR partners, and foundations — contact us and we will share project plans and utilisation details.
              </p>

              <div className="mt-5 grid gap-2">
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="rounded-2xl px-4 py-3 flex items-center gap-2 transition"
                  style={{
                    background: 'rgba(223,230,219,0.55)',
                    border: '1px solid var(--surface-border)',
                    color: 'var(--text-heading)',
                  }}
                >
                  <Phone size={16} />
                  <span className="font-extrabold">{contact.phone}</span>
                  <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
                    {contact.name}
                  </span>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="rounded-2xl px-4 py-3 flex items-center gap-2 transition"
                  style={{
                    background: 'rgba(223,230,219,0.45)',
                    border: '1px solid var(--surface-border)',
                    color: 'var(--text-heading)',
                  }}
                >
                  <Mail size={16} />
                  <span className="font-extrabold truncate">{contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for sticky CTA */}
      <div className="h-28 sm:h-16" />
    </div>
  )
}
